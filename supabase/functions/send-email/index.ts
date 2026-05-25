const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SITE_URL = 'https://buildfluence.ai'
const LOGO_URL = `${SITE_URL}/Logo_Buildfluence_FondBleu.png`
const FROM = 'Buildfluence <noreply@buildfluence.ai>'
const INFO_DEST = 'info@buildfluence.ai'

const NAVY = '#0D1B2A'
const PAPER = '#FAF6ED'
const GOLD = '#C9A84C'

function visitorEmailHtml(prenom: string, langue: string) {
  const isFr = langue !== 'en'
  const body = isFr
    ? `
        <p style="margin:0 0 18px;">Bonjour <strong>${escapeHtml(prenom)}</strong>,</p>
        <p style="margin:0 0 18px;">Merci sincèrement d'avoir pris le temps de nous contacter. C'est avec un réel plaisir que nous avons reçu votre demande d'échange stratégique.</p>
        <p style="margin:0 0 18px;">Votre démarche nous importe et nous y accordons toute l'attention qu'elle mérite. Un membre de l'équipe <span style="color:${GOLD};font-weight:600;">Buildfluence</span> vous contactera personnellement dans les 48 heures ouvrées pour échanger avec vous.</p>
        <p style="margin:0 0 28px;">En attendant, nous vous invitons à explorer notre univers sur <a href="${SITE_URL}" style="color:${GOLD};text-decoration:none;">buildfluence.ai</a>.</p>
        <p style="margin:0 0 4px;">À très bientôt,</p>
        <p style="margin:0;color:${GOLD};font-weight:600;">L'équipe Buildfluence</p>
      `
    : `
        <p style="margin:0 0 18px;">Hello <strong>${escapeHtml(prenom)}</strong>,</p>
        <p style="margin:0 0 18px;">Thank you sincerely for taking the time to reach out to us. It is with great pleasure that we received your strategic exchange request.</p>
        <p style="margin:0 0 18px;">Your approach matters to us and we will give it the full attention it deserves. A member of the <span style="color:${GOLD};font-weight:600;">Buildfluence</span> team will personally get back to you within 48 business hours.</p>
        <p style="margin:0 0 28px;">In the meantime, we invite you to explore our universe at <a href="${SITE_URL}" style="color:${GOLD};text-decoration:none;">buildfluence.ai</a>.</p>
        <p style="margin:0 0 4px;">Looking forward to connecting with you,</p>
        <p style="margin:0;color:${GOLD};font-weight:600;">The Buildfluence Team</p>
      `

  return `
  <!doctype html>
  <html><head><meta charset="utf-8"></head>
  <body style="margin:0;padding:0;background:${NAVY};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${NAVY};padding:40px 20px;">
      <tr><td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:${NAVY};">
          <tr><td align="center" style="padding:8px 0 28px;">
            <img src="${LOGO_URL}" alt="Buildfluence" width="160" style="display:block;border:0;outline:none;max-width:160px;height:auto;" />
          </td></tr>
          <tr><td style="border-top:1px solid ${GOLD};height:1px;line-height:1px;font-size:0;">&nbsp;</td></tr>
          <tr><td style="padding:36px 32px;color:${PAPER};font-size:15px;line-height:1.7;">
            ${body}
          </td></tr>
          <tr><td style="border-top:1px solid ${GOLD};height:1px;line-height:1px;font-size:0;">&nbsp;</td></tr>
          <tr><td align="center" style="padding:20px 0 0;color:${PAPER};opacity:0.6;font-size:11px;letter-spacing:0.08em;">
            <a href="${SITE_URL}" style="color:${PAPER};text-decoration:none;opacity:0.8;">buildfluence.ai</a>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body></html>`
}

function adminLeadHtml(d: { prenom: string; nom: string; email: string; organization?: string; position?: string; phone?: string; langue: string; message: string; topic?: string; priority?: string; createdAt: string }) {
  const langLabel = d.langue === 'en' ? 'EN' : 'FR'
  const fullName = `${d.prenom || ''} ${d.nom || ''}`.trim() || '—'
  const rows: [string, string][] = [
    ['Prénom', d.prenom || '—'],
    ['Nom', d.nom || '—'],
    ['Email', d.email || '—'],
    ['Organisation', d.organization || '—'],
    ['Poste / Fonction', d.position || '—'],
    ['Téléphone', d.phone || '—'],
    ['Langue', langLabel],
    ['Thématique', d.topic || '—'],
    ['Priorité', d.priority || '—'],
    ['Message', (d.message || '—').replace(/\n/g, '<br>')],
    ['Date', d.createdAt],
    ['Statut', 'Nouveau'],
  ]
  const rowsHtml = rows.map(([k, v]) => `<tr><td style="padding:10px 14px;font-weight:600;color:#0D1B2A;border-bottom:1px solid #ECECEC;vertical-align:top;width:38%;font-size:13px;">${escapeHtml(k)}</td><td style="padding:10px 14px;color:#1f2937;border-bottom:1px solid #ECECEC;font-size:13px;">${v}</td></tr>`).join('')
  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;max-width:640px;margin:0 auto;background:#ffffff;color:#0D1B2A;">
    <div style="background:#ffffff;padding:28px 32px 18px;border-bottom:2px solid ${GOLD};">
      <div style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:${GOLD};margin-bottom:8px;">Buildfluence · Nouveau lead</div>
      <h2 style="margin:0;font-size:20px;font-weight:700;color:#0D1B2A;">Demande d'échange stratégique : ${escapeHtml(fullName)}</h2>
      <p style="margin:8px 0 0;font-size:13px;color:#6B7280;">Reçue le ${escapeHtml(d.createdAt)} via buildfluence.ai</p>
    </div>
    <div style="background:#ffffff;padding:8px 32px 28px;">
      <table style="width:100%;border-collapse:collapse;margin-top:12px;">${rowsHtml}</table>
      <p style="margin-top:24px;font-size:12px;color:#94a3b8;">→ Connectez-vous au dashboard Buildfluence pour traiter cette demande.</p>
    </div>
  </div>`
}

function escapeHtml(s: string) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string))
}

async function sendResend(apiKey: string, payload: Record<string, unknown>) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify(payload),
  })
  const data = await res.json()
  if (!res.ok) {
    console.error('Resend error:', JSON.stringify(data))
    throw new Error(`Resend error [${res.status}]: ${JSON.stringify(data)}`)
  }
  return data
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY is not configured')

    const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL') || INFO_DEST
    const body = await req.json()
    const { formType } = body

    // === LEAD / Strategic Exchange — visitor accusé + admin notif ===
    if (formType === 'strategic_exchange' || formType === 'lead_strategic_exchange') {
      const prenom = (body.prenom || '').toString().trim()
      const nom = (body.nom || '').toString().trim()
      const email = (body.email || '').toString().trim()
      const message = (body.message || '').toString()
      const langue = body.langue === 'en' ? 'en' : 'fr'
      const createdAt = new Date().toLocaleString(langue === 'fr' ? 'fr-FR' : 'en-GB', { timeZone: 'Europe/Paris' })

      // Visitor confirmation
      if (email) {
        await sendResend(RESEND_API_KEY, {
          from: FROM,
          to: [email],
          subject: langue === 'fr'
            ? 'Buildfluence · Votre demande a bien été reçue'
            : 'Buildfluence · Your request has been received',
          html: visitorEmailHtml(prenom || (langue === 'fr' ? 'à vous' : 'there'), langue),
        })
      }

      // Internal notification
      await sendResend(RESEND_API_KEY, {
        from: FROM,
        to: [ADMIN_EMAIL],
        subject: `🔔 Nouveau lead Buildfluence · ${prenom} ${nom}`.trim(),
        html: adminLeadHtml({ prenom, nom, email, langue, message, createdAt }),
      })

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    // === Legacy generic notification (other forms) ===
    const { name, email, organization, position, phone, situation, topic, priority, message, platform } = body
    const subject = formType === 'contact'
      ? `Nouveau contact : ${name || 'Inconnu'}`
      : formType === 'newsletter'
      ? `Nouvelle inscription newsletter : ${name || email || 'Inconnu'}`
      : `[Buildfluence] Nouvelle soumission — ${formType || 'Formulaire'}`

    const fields: [string, string | null | undefined][] = [
      ['Type de formulaire', formType],
      ['Nom', name],
      ['Email', email],
      ['Organisation', organization],
      ['Poste / Fonction', position],
      ['Téléphone', phone],
      ['Enjeu stratégique', situation],
      ['Thématique', topic],
      ['Priorité', priority],
      ['Plateforme', platform],
      ['Message', message],
    ]
    const rows = fields.filter(([, v]) => v).map(([label, value]) =>
      `<tr><td style="padding:8px 12px;font-weight:600;vertical-align:top;border-bottom:1px solid #e5e7eb;color:#1e293b;">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#334155;">${value}</td></tr>`
    ).join('')

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:${NAVY};padding:24px 32px;border-radius:8px 8px 0 0;">
          <h2 style="color:${GOLD};margin:0;font-size:20px;">${subject}</h2>
        </div>
        <div style="background:#ffffff;padding:24px 32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;">${rows}</table>
          <p style="margin-top:24px;font-size:12px;color:#94a3b8;">Email envoyé automatiquement depuis buildfluence.ai</p>
        </div>
      </div>`

    const resendData = await sendResend(RESEND_API_KEY, {
      from: FROM,
      to: [INFO_DEST],
      subject,
      html,
    })

    return new Response(JSON.stringify({ success: true, id: resendData.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('send-email error:', error)
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
