const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured')
    }

    const body = await req.json()
    const { formType, name, email, organization, position, phone, situation, topic, priority, message, platform } = body

    const DESTINATION = 'azeddine.yassine@gmail.com'

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

    const rows = fields
      .filter(([, v]) => v)
      .map(([label, value]) =>
        `<tr><td style="padding:8px 12px;font-weight:600;vertical-align:top;border-bottom:1px solid #e5e7eb;color:#1e293b;">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#334155;">${value}</td></tr>`
      )
      .join('')

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#0c1b3a;padding:24px 32px;border-radius:8px 8px 0 0;">
          <h2 style="color:#c9a84c;margin:0;font-size:20px;">${subject}</h2>
        </div>
        <div style="background:#ffffff;padding:24px 32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            ${rows}
          </table>
          <p style="margin-top:24px;font-size:12px;color:#94a3b8;">Email envoyé automatiquement depuis buildfluence.ai</p>
        </div>
      </div>`

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Buildfluence <info@buildfluence.ai>',
        to: [DESTINATION],
        subject,
        html,
      }),
    })

    const resendData = await resendResponse.json()

    if (!resendResponse.ok) {
      console.error('Resend API error:', JSON.stringify(resendData))
      throw new Error(`Resend error [${resendResponse.status}]: ${JSON.stringify(resendData)}`)
    }

    console.log(`✅ Email sent via Resend — ${subject} — id: ${resendData.id}`)

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent', id: resendData.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    console.error('send-email error:', error)
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : String(error) }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
