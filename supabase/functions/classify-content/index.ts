// deno-lint-ignore-file no-explicit-any
import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const THEMES = [
  "pouvoir d'achat",
  'emploi',
  'santé',
  'éducation',
  'logement',
  'sécurité',
  'infrastructures',
  'eau/énergie',
  'gouvernance',
  'justice',
  'égalité',
  'développement territorial',
  'diplomatie',
]

const PARTIES = ['PAM', 'RNI', 'PJD', 'USFP', 'Istiqlal', 'Autres']
const TONALITES = ['positive', 'neutre', 'négative']

const MODEL = 'google/gemini-2.5-flash'
const BATCH_SIZE = 200

function buildPrompt(title: string, text: string) {
  return [
    'Tu analyses un article de presse marocaine. Réponds STRICTEMENT en JSON, sans texte autour, sans balises de code.',
    '',
    'Schéma exigé :',
    '{',
    `  "theme": une valeur parmi ${JSON.stringify(THEMES)} ou null si aucune ne s'applique,`,
    `  "parties_mentionnees": tableau de valeurs parmi ${JSON.stringify(PARTIES)}, tableau vide si aucun parti n'est cité,`,
    `  "tonalite": une valeur parmi ${JSON.stringify(TONALITES)},`,
    '  "score_pertinence": nombre entre 0 et 1',
    '}',
    '',
    "parties_mentionnees est une extraction factuelle : liste uniquement les partis explicitement cités dans le texte. N'identifie et ne nomme aucune personnalité individuelle.",
    '',
    `TITRE : ${title ?? ''}`,
    `TEXTE : ${(text ?? '').slice(0, 6000)}`,
  ].join('\n')
}

function parseModelJson(content: string) {
  const cleaned = content.replace(/```json/gi, '').replace(/```/g, '').trim()
  const start = cleaned.indexOf('{')
  const end = cleaned.lastIndexOf('}')
  if (start === -1 || end === -1) throw new Error('no JSON object in model response')
  const parsed = JSON.parse(cleaned.slice(start, end + 1))

  const theme = THEMES.includes(parsed.theme) ? parsed.theme : null
  const parties = Array.isArray(parsed.parties_mentionnees)
    ? parsed.parties_mentionnees.filter((p: any) => PARTIES.includes(p))
    : []
  const tonalite = TONALITES.includes(parsed.tonalite) ? parsed.tonalite : null
  let score: number | null = Number(parsed.score_pertinence)
  if (!isFinite(score as number)) score = null
  else score = Math.min(1, Math.max(0, score as number))

  return { theme, parties, tonalite, score }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )
  const apiKey = Deno.env.get('LOVABLE_API_KEY')

  try {
    const { data: rows, error } = await supabase
      .from('raw_content')
      .select('id, title, raw_text')
      .eq('processed', false)
      .order('collected_at', { ascending: true })
      .limit(BATCH_SIZE)

    if (error) throw error

    let classified = 0
    let failed = 0

    for (const row of rows ?? []) {
      let result: { theme: string | null; parties: string[]; tonalite: string | null; score: number | null } = {
        theme: null,
        parties: [],
        tonalite: null,
        score: null,
      }

      try {
        if (!apiKey) throw new Error('missing LOVABLE_API_KEY')
        const res = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: MODEL,
            messages: [{ role: 'user', content: buildPrompt(row.title ?? '', row.raw_text ?? '') }],
          }),
          signal: AbortSignal.timeout(30000),
        })
        if (!res.ok) throw new Error(`gateway HTTP ${res.status}`)
        const json = await res.json()
        const content = json?.choices?.[0]?.message?.content ?? ''
        result = parseModelJson(content)
        classified++
      } catch (_e) {
        failed++
      }

      await supabase.from('content_analysis').insert({
        raw_content_id: row.id,
        theme: result.theme,
        parties_mentionnees: result.parties,
        tonalite: result.tonalite,
        score_pertinence: result.score,
      })

      // Marquer traité dans tous les cas, y compris en cas d'échec, pour éviter les reprises infinies.
      await supabase.from('raw_content').update({ processed: true }).eq('id', row.id)
    }

    return new Response(JSON.stringify({ picked: rows?.length ?? 0, classified, failed }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: String(e?.message ?? e) }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
