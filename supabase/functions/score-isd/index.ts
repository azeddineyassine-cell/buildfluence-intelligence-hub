// deno-lint-ignore-file no-explicit-any
import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// =====================================================================
// SCORING_CONFIG — valeurs par défaut, à calibrer.
// Ne JAMAIS exposer ce bloc au client. Tout ajustement se fait ici
// via GitHub sans toucher au front.
// =====================================================================
const SCORING_CONFIG = {
  poidsPiliers: { p1: 0.25, p2: 0.25, p3: 0.25, p4: 0.25 },
  veille: {
    v1LargeurBornes: [
      { min: 0, max: 0, score: 0 },
      { min: 1, max: 1, score: 1 },
      { min: 2, max: 3, score: 2 },
      { min: 4, max: 5, score: 3 },
      { min: 6, max: 99, score: 4 },
    ],
    v2Outil: {
      'Aucun': 0,
      'Alertes manuelles (type Google Alerts)': 1,
      'Prestataire externe': 2,
      'Plateforme de veille dédiée': 3,
      'Cellule interne outillée': 4,
    } as Record<string, number>,
    v3Organisation: {
      'Aucune': 0,
      'Chacun fait sa veille': 1,
      'Référent informel': 2,
      'Externalisée': 3,
      'Cellule interne dédiée': 4,
      'Mixte': 4,
    } as Record<string, number>,
    v4Capitalisation: {
      'Aucune': 0,
      'Notes internes ponctuelles': 1,
      'Base de connaissance partagée': 2,
      'Newsletter ou magazine interne régulier': 3,
      'Diffusion externe (rayonnement)': 4,
    } as Record<string, number>,
  },
  seuilsNiveau: [
    { min: 0, max: 0.5, niveau: 'Embryonnaire' },
    { min: 0.5, max: 1.5, niveau: 'Réactif' },
    { min: 1.5, max: 2.5, niveau: 'Émergent' },
    { min: 2.5, max: 3.5, niveau: 'Structuré' },
    { min: 3.5, max: 4.01, niveau: 'Souverain' },
  ],
}

function clampInt(v: any): number | null {
  const n = Number(v)
  if (!Number.isFinite(n)) return null
  const i = Math.round(n)
  if (i < 0 || i > 4) return null
  return i
}

function avg(nums: number[]): number {
  if (!nums.length) return 0
  return nums.reduce((a, b) => a + b, 0) / nums.length
}

function mapV1Largeur(thematiques: string[]): number {
  const count = (thematiques || []).filter((x) => x && x !== 'Aucune').length
  for (const b of SCORING_CONFIG.veille.v1LargeurBornes) {
    if (count >= b.min && count <= b.max) return b.score
  }
  return 0
}

function mapOrdinal(map: Record<string, number>, v: string | undefined): number {
  if (!v) return 0
  return map[v] ?? 0
}

function computeNiveau(global: number): string {
  for (const s of SCORING_CONFIG.seuilsNiveau) {
    if (global >= s.min && global < s.max) return s.niveau
  }
  return 'Embryonnaire'
}

function round2(n: number) {
  return Math.round(n * 100) / 100
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const body = await req.json()

    const secteur = String(body.secteur ?? '').slice(0, 120) || null
    const type_organisation = String(body.type_organisation ?? '').slice(0, 120) || null
    const fonction = String(body.fonction ?? '').slice(0, 120) || null

    const q1 = clampInt(body.q1)
    const q2 = clampInt(body.q2)
    const q3 = clampInt(body.q3)
    const q4 = clampInt(body.q4)
    const q5 = clampInt(body.q5)
    const q6 = clampInt(body.q6)
    const q7 = clampInt(body.q7)
    const q8 = clampInt(body.q8)
    const q9 = clampInt(body.q9)
    const q10 = clampInt(body.q10)
    const q11 = clampInt(body.q11)
    const q12 = clampInt(body.q12)

    const veille_thematiques: string[] = Array.isArray(body.veille_thematiques) ? body.veille_thematiques.map((s: any) => String(s)) : []
    const veille_outil = body.veille_outil ? String(body.veille_outil) : null
    const veille_outil_precision = body.veille_outil_precision ? String(body.veille_outil_precision).slice(0, 500) : null
    const veille_organisation = body.veille_organisation ? String(body.veille_organisation) : null
    const veille_capitalisation = body.veille_capitalisation ? String(body.veille_capitalisation) : null

    const outil_donnee = Array.isArray(body.outil_donnee) ? body.outil_donnee.map((s: any) => String(s)) : []
    const outil_carto = Array.isArray(body.outil_carto) ? body.outil_carto.map((s: any) => String(s)) : []
    const outil_crise = Array.isArray(body.outil_crise) ? body.outil_crise.map((s: any) => String(s)) : []
    const outil_signaux = Array.isArray(body.outil_signaux) ? body.outil_signaux.map((s: any) => String(s)) : []
    const dd_realisation = body.dd_realisation ? String(body.dd_realisation) : null

    const approfondissement = Boolean(body.approfondissement)
    const appro = body.appro && typeof body.appro === 'object' ? body.appro : null

    const commentaire_ouvert = body.commentaire_ouvert ? String(body.commentaire_ouvert).slice(0, 4000) : null

    const contact_nom = String(body.contact_nom ?? '').trim().slice(0, 200)
    const contact_fonction = String(body.contact_fonction ?? '').trim().slice(0, 200)
    const contact_organisation = String(body.contact_organisation ?? '').trim().slice(0, 200)
    const contact_email = String(body.contact_email ?? '').trim().slice(0, 254)
    const contact_telephone = String(body.contact_telephone ?? '').trim().slice(0, 40) || null

    if (!contact_nom || !contact_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact_email)) {
      return new Response(JSON.stringify({ error: 'invalid_contact' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    // --- Scoring (serveur uniquement) ---
    const p1Vals = [q1, q2, q3].filter((v): v is number => v !== null)
    const p3Vals = [q4, q5, q6, q7, q8].filter((v): v is number => v !== null)
    const p4Vals = [q9, q10, q11, q12].filter((v): v is number => v !== null)

    const score_p1 = round2(avg(p1Vals))
    const score_p3 = round2(avg(p3Vals))
    const score_p4 = round2(avg(p4Vals))

    const v1 = mapV1Largeur(veille_thematiques)
    const v2 = mapOrdinal(SCORING_CONFIG.veille.v2Outil, veille_outil || undefined)
    const v3 = mapOrdinal(SCORING_CONFIG.veille.v3Organisation, veille_organisation || undefined)
    const v4 = mapOrdinal(SCORING_CONFIG.veille.v4Capitalisation, veille_capitalisation || undefined)
    const score_p2 = round2(avg([v1, v2, v3, v4]))

    const w = SCORING_CONFIG.poidsPiliers
    const score_global = round2(
      score_p1 * w.p1 + score_p2 * w.p2 + score_p3 * w.p3 + score_p4 * w.p4,
    )
    const niveau = computeNiveau(score_global)

    // --- Persistance ---
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
    const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const admin = createClient(SUPABASE_URL, SERVICE_ROLE)

    const { data: inserted, error: dbErr } = await admin
      .from('isd_responses')
      .insert({
        secteur, type_organisation, fonction,
        q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12,
        veille_thematiques, veille_outil, veille_outil_precision, veille_organisation, veille_capitalisation,
        outil_donnee, outil_carto, outil_crise, outil_signaux, dd_realisation,
        approfondissement, appro,
        commentaire_ouvert,
        contact_nom, contact_fonction, contact_organisation, contact_email, contact_telephone,
        score_p1, score_p2, score_p3, score_p4, score_global, niveau,
      })
      .select('id')
      .single()

    if (dbErr) {
      console.error('isd_responses insert error:', dbErr)
      return new Response(JSON.stringify({ error: 'db_error' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      })
    }

    // --- Notification interne (Resend) ---
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    const INTERNAL_TO = 'azeddine.yassine@buildfluence.ai'
    if (RESEND_API_KEY) {
      const NAVY = '#1F3A5F'
      const GOLD = '#C9A84C'
      const li = (k: string, v: any) => `<tr><td style="padding:4px 8px 4px 0;font-weight:600;vertical-align:top;">${k}</td><td style="padding:4px 0;">${v ?? '-'}</td></tr>`
      const list = (arr: string[]) => (arr && arr.length ? arr.join(', ') : '-')
      const html = `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;max-width:680px;margin:0 auto;background:#FAF6ED;color:${NAVY};padding:28px;">
          <div style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:${GOLD};margin-bottom:8px;">Buildfluence · Enquête ISD · État de la maturité en souveraineté décisionnelle au Maroc</div>
          <h2 style="margin:0 0 16px;font-size:20px;color:${NAVY};">Nouvelle réponse reçue</h2>

          <table style="width:100%;border-collapse:collapse;font-size:13px;">
            ${li('Secteur', secteur)}
            ${li("Type d'organisation", type_organisation)}
            ${li('Fonction', fonction)}
            ${li('Contact', `${contact_nom} · ${contact_email}${contact_telephone ? ' · ' + contact_telephone : ''}`)}
            ${li('Organisation', contact_organisation)}
          </table>

          <div style="margin-top:20px;padding:16px;background:#fff;border-left:3px solid ${GOLD};">
            <div style="font-weight:600;margin-bottom:8px;">Scores calculés</div>
            <div>P1 Souveraineté décisionnelle : <strong>${score_p1}</strong></div>
            <div>P2 Veille stratégique : <strong>${score_p2}</strong></div>
            <div>P3 Risk Management : <strong>${score_p3}</strong></div>
            <div>P4 Due Diligence & Intelligence d'affaires : <strong>${score_p4}</strong></div>
            <div style="margin-top:8px;">Indice global : <strong>${score_global}</strong> · Niveau atteint : <strong>${niveau}</strong></div>
          </div>

          <div style="margin-top:16px;padding:12px 16px;background:#fff;border-left:3px solid ${NAVY};font-size:12px;line-height:1.6;">
            <div style="font-weight:600;margin-bottom:6px;">Échelle des 5 niveaux</div>
            <div>0 Embryonnaire : aucun dispositif structuré, décisions à l'intuition et à la réaction.</div>
            <div>1 Réactif : actions ponctuelles, déclenchées après l'événement, sans outil ni processus.</div>
            <div>2 Émergent : premières démarches structurées, partielles et non systématiques.</div>
            <div>3 Structuré : processus formalisés, outillés et pilotés régulièrement.</div>
            <div>4 Souverain : dispositif intégré, proactif et anticipatif, créateur d'avantage stratégique.</div>
          </div>

          <div style="margin-top:16px;padding:12px 16px;background:#fff;border-left:3px solid ${GOLD};font-size:12px;line-height:1.7;">
            <div style="font-weight:600;margin-bottom:6px;">Détail Veille (P2)</div>
            <div><strong>Thématiques :</strong> ${list(veille_thematiques)}</div>
            <div><strong>Outil (V2) :</strong> ${veille_outil ?? '-'}${veille_outil_precision ? ' · précision : ' + veille_outil_precision : ''}</div>
            <div><strong>Organisation (V3) :</strong> ${veille_organisation ?? '-'}</div>
            <div><strong>Capitalisation (V4) :</strong> ${veille_capitalisation ?? '-'}</div>
          </div>

          <div style="margin-top:16px;padding:12px 16px;background:#fff;border-left:3px solid ${GOLD};font-size:12px;line-height:1.7;">
            <div style="font-weight:600;margin-bottom:6px;">Outillage capté</div>
            <div><strong>Données (Q2) :</strong> ${list(outil_donnee)}</div>
            <div><strong>Cartographie (Q5) :</strong> ${list(outil_carto)}</div>
            <div><strong>Crise (Q6) :</strong> ${list(outil_crise)}</div>
            <div><strong>Signaux faibles (Q7) :</strong> ${list(outil_signaux)}</div>
            <div><strong>Due diligences (Q9) :</strong> ${dd_realisation ?? '-'}</div>
          </div>

          ${commentaire_ouvert ? `<div style="margin-top:16px;padding:12px 16px;background:#fff;border-left:3px solid ${NAVY};font-size:12px;"><div style="font-weight:600;margin-bottom:6px;">Commentaire ouvert</div><div>${commentaire_ouvert.replace(/</g, '&lt;')}</div></div>` : ''}

          <p style="margin-top:20px;font-size:11px;color:${NAVY};opacity:0.6;">ID réponse : ${inserted?.id ?? '-'}</p>
        </div>`
      try {
        const r = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${RESEND_API_KEY}` },
          body: JSON.stringify({
            from: 'Buildfluence <noreply@buildfluence.ai>',
            to: [INTERNAL_TO],
            subject: `Buildfluence · Enquête ISD (souveraineté décisionnelle) : ${niveau} · ${score_global}`,
            html,
          }),
        })
        if (!r.ok) console.error('Resend ISD error:', await r.text())
      } catch (e) {
        console.error('Resend ISD send failed:', e)
      }
    }

    // Renvoi au client : résultats calculés uniquement (jamais SCORING_CONFIG).
    return new Response(
      JSON.stringify({
        ok: true,
        success: true,
        score_global,
        niveau,
        score_p1,
        score_p2,
        score_p3,
        score_p4,
        q11,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('score-isd error:', error)
    return new Response(JSON.stringify({ error: 'server_error' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
