// deno-lint-ignore-file no-explicit-any
import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function pick(block: string, tags: string[]): string | null {
  for (const tag of tags) {
    const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, 'i')
    const m = block.match(re)
    if (m) return clean(m[1])
    const selfClosing = block.match(new RegExp(`<${tag}[^>]*href=["']([^"']+)["'][^>]*/?>`, 'i'))
    if (selfClosing) return clean(selfClosing[1])
  }
  return null
}

function clean(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim()
}

function parseFeed(xml: string) {
  const blocks = [
    ...xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi),
    ...xml.matchAll(/<entry(?:\s[^>]*)?>([\s\S]*?)<\/entry>/gi),
  ].map((m) => m[1])

  return blocks.map((block) => {
    const title = pick(block, ['title'])
    const url = pick(block, ['link', 'guid', 'id'])
    const dateRaw = pick(block, ['pubDate', 'published', 'updated', 'dc:date'])
    const rawText = pick(block, ['content:encoded', 'content', 'description', 'summary'])
    let publishedAt: string | null = null
    if (dateRaw) {
      const d = new Date(dateRaw)
      if (!isNaN(d.getTime())) publishedAt = d.toISOString()
    }
    return { title, url, publishedAt, rawText }
  })
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  try {
    const { data: sources, error } = await supabase
      .from('sources')
      .select('id, name, url')
      .eq('active', true)
      .eq('type', 'rss')

    if (error) throw error

    let inserted = 0
    let skipped = 0
    const failures: any[] = []

    for (const source of sources ?? []) {
      try {
        const res = await fetch(source.url, {
          headers: { 'User-Agent': 'BuildfluenceCollector/1.0' },
          signal: AbortSignal.timeout(20000),
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const xml = await res.text()
        const items = parseFeed(xml)

        for (const item of items) {
          if (!item.url) continue
          const { error: insertError } = await supabase
            .from('raw_content')
            .upsert(
              {
                source_id: source.id,
                title: item.title,
                url: item.url,
                published_at: item.publishedAt,
                raw_text: item.rawText,
                processed: false,
              },
              { onConflict: 'url', ignoreDuplicates: true },
            )
          if (insertError) {
            failures.push({ source: source.name, url: item.url, error: insertError.message })
          } else {
            inserted++
          }
        }
        skipped += items.filter((i) => !i.url).length
      } catch (e: any) {
        failures.push({ source: source.name, error: String(e?.message ?? e) })
      }
    }

    return new Response(
      JSON.stringify({
        sources: sources?.length ?? 0,
        items_upserted: inserted,
        items_without_url: skipped,
        failures,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 },
    )
  } catch (e: any) {
    return new Response(JSON.stringify({ error: String(e?.message ?? e) }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
