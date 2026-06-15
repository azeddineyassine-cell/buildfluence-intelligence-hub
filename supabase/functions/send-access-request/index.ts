import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SITE_URL = 'https://buildfluence.ai'
const LOGO_URL = `${SITE_URL}/Logo_Buildfluence_FondBleu.png`
const FROM = 'Buildfluence <noreply@buildfluence.ai>'
const NAVY = '#0D1B2A'
const GOLD = '#C9A84C'

function escapeHtml(s: string) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string))
}

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
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

function adminHtml(d: { name: string; email: string; phone: string; organization: string; message: string; langue: string; createdAt: string }) {
  const rows: [string, string][] = [
    ['Nom', d.name || '-'],
    ['Email', d.email || '-'],
    ['Téléphone', d.phone || '-'],
    ['Société / Organisation', d.organization || '-'],
    ['Langue', d.langue === 'en' ? 'EN' : 'FR'],
    ['Message', (d.message || '-').replace(/\n/g, '<br>')],
    ['Date', d.createdAt],
  ]
  const rowsHtml = rows
    .map(([k, v]) => `<tr><td style="padding:10px 14px;font-weight:600;color:${NAVY};border-bottom:1px solid #ECECEC;vertical-align:top;width:38%;font-size:13px;">${escapeHtml(k)}</td><td style="padding:10px 14px;color:${NAVY};border-bottom:1px solid #ECECEC;font-size:13px;">${v}</td></tr>`)
    .join('')
  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;max-width:640px;margin:0 auto;background:#ffffff;color:${NAVY};">
    <div style="padding:28px 32px 18px;border-bottom:2px solid ${GOLD};">
      <div style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:${GOLD};margin-bottom:8px;">Buildfluence · Demande d'Accès Premium</div>
      <h2 style="margin:0;font-size:20px;font-weight:700;color:${NAVY};">Nouvelle demande d'accès : ${escapeHtml(d.name)}</h2>
      <p style="margin:8px 0 0;font-size:13px;color:${NAVY};">Reçue le ${escapeHtml(d.createdAt)} via buildfluence.ai</p>
    </div>
    <div style="padding:8px 32px 28px;">
      <table style="width:100%;border-collapse:collapse;margin-top:12px;">${rowsHtml}</table>
      <p style="margin-top:24px;font-size:12px;color:${NAVY};opacity:0.6;">Cette demande a également été enregistrée dans la table access_requests.</p>
    </div>
    <div style="text-align:center;padding:16px;"><img src="${LOGO_URL}" alt="Buildfluence" width="120" style="opacity:0.8;"/></div>
  </div>`
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const body = await req.json()
    const name = String(body.name ?? '').trim().slice(0, 200)
    const email = String(body.email ?? '').trim().slice(0, 254)
    const phone = String(body.phone ?? '').trim().slice(0, 50)
    const organization = String(body.organization ?? '').trim().slice(0, 200)
    const message = String(body.message ?? '').trim().slice(0, 2000)
    const langue = body.langue === 'en' ? 'en' : 'fr'

    if (!name || !email || !isEmail(email)) {
      return new Response(JSON.stringify({ error: 'invalid_input' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    // 1) Persist to access_requests (never lose a request)
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
    const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const admin = createClient(SUPABASE_URL, SERVICE_ROLE)
    const { error: dbErr } = await admin
      .from('access_requests')
      .insert({ name, email, phone: phone || null, organization: organization || null, message: message || null, langue })
    if (dbErr) console.error('access_requests insert error:', dbErr)

    // 2) Send email notification (if Resend configured)
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL')
    let emailSent = false
    if (RESEND_API_KEY && ADMIN_EMAIL) {
      const createdAt = new Date().toLocaleString(langue === 'fr' ? 'fr-FR' : 'en-GB', { timeZone: 'Europe/Paris' })
      try {
        await sendResend(RESEND_API_KEY, {
          from: FROM,
          to: [ADMIN_EMAIL],
          reply_to: email,
          subject: `Buildfluence · Demande d'Accès Premium : ${name}${organization ? ' (' + organization + ')' : ''}`,
          html: adminHtml({ name, email, phone, organization, message, langue, createdAt }),
        })
        emailSent = true
      } catch (e) {
        console.error('Email send failed (request still saved):', e)
      }
    } else {
      console.warn('RESEND_API_KEY or ADMIN_EMAIL missing — request saved but no email sent.')
    }

    return new Response(JSON.stringify({ success: true, saved: !dbErr, emailSent }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('send-access-request error:', error)
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
