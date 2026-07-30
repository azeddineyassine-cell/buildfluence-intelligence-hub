// deno-lint-ignore-file no-explicit-any
import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const apiKey = Deno.env.get('YOUTUBE_API_KEY')
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'YOUTUBE_API_KEY is not configured' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 },
    )
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  try {
    const { data: sources, error } = await supabase
      .from('sources')
      .select('id, name, url')
      .eq('active', true)
      .eq('type', 'youtube')

    if (error) throw error

    let inserted = 0
    const failures: any[] = []

    for (const source of sources ?? []) {
      try {
        const endpoint = new URL('https://www.googleapis.com/youtube/v3/search')
        endpoint.searchParams.set('part', 'snippet')
        endpoint.searchParams.set('q', source.url)
        endpoint.searchParams.set('type', 'video')
        endpoint.searchParams.set('order', 'date')
        endpoint.searchParams.set('maxResults', '25')
        endpoint.searchParams.set('regionCode', 'MA')
        endpoint.searchParams.set('key', apiKey)

        const res = await fetch(endpoint.toString(), { signal: AbortSignal.timeout(20000) })
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`)
        const payload = await res.json()

        for (const item of payload.items ?? []) {
          const videoId = item?.id?.videoId
          if (!videoId) continue
          const url = `https://www.youtube.com/watch?v=${videoId}`
          const snippet = item.snippet ?? {}
          let publishedAt: string | null = null
          if (snippet.publishedAt) {
            const d = new Date(snippet.publishedAt)
            if (!isNaN(d.getTime())) publishedAt = d.toISOString()
          }

          const { error: insertError } = await supabase
            .from('raw_content')
            .upsert(
              {
                source_id: source.id,
                title: snippet.title ?? null,
                url,
                published_at: publishedAt,
                raw_text: snippet.description ?? null,
                processed: false,
              },
              { onConflict: 'url', ignoreDuplicates: true },
            )
          if (insertError) {
            failures.push({ source: source.name, url, error: insertError.message })
          } else {
            inserted++
          }
        }
      } catch (e: any) {
        failures.push({ source: source.name, error: String(e?.message ?? e) })
      }
    }

    return new Response(
      JSON.stringify({ sources: sources?.length ?? 0, items_upserted: inserted, failures }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 },
    )
  } catch (e: any) {
    return new Response(JSON.stringify({ error: String(e?.message ?? e) }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
