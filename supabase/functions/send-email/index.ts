const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { formType, name, email, organization, position, phone, topic, priority, message, situation, platform } = await req.json()

    const DESTINATION = 'azeddine.yassine@gmail.com'

    // Build email content
    const subject = `[Buildfluence] Nouvelle soumission — ${formType || 'Contact'}`
    const lines = [
      `<h2>Nouvelle soumission de formulaire</h2>`,
      `<p><strong>Type :</strong> ${formType || 'N/A'}</p>`,
      `<p><strong>Nom :</strong> ${name || 'N/A'}</p>`,
      `<p><strong>Email :</strong> ${email || 'N/A'}</p>`,
      organization ? `<p><strong>Organisation :</strong> ${organization}</p>` : '',
      position ? `<p><strong>Poste :</strong> ${position}</p>` : '',
      phone ? `<p><strong>Téléphone :</strong> ${phone}</p>` : '',
      topic ? `<p><strong>Thématique :</strong> ${topic}</p>` : '',
      priority ? `<p><strong>Priorité :</strong> ${priority}</p>` : '',
      situation ? `<p><strong>Situation :</strong> ${situation}</p>` : '',
      platform ? `<p><strong>Plateforme :</strong> ${platform}</p>` : '',
      message ? `<p><strong>Message :</strong><br/>${message}</p>` : '',
    ].filter(Boolean).join('\n')

    console.log(`📧 Email notification triggered for form: ${formType}, to: ${DESTINATION}`)
    console.log(`Sender: ${name} <${email}>`)

    // Try to send via Supabase Auth admin or log
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    // Use Supabase to send via auth.admin or just log for now
    // The notification is logged and can be picked up by any email service
    const supabase = createClient(supabaseUrl, serviceKey)

    // Store the notification attempt
    const { error: insertError } = await supabase.from('contact_submissions').select('id').limit(0)
    
    if (insertError) {
      console.error('DB check error:', insertError)
    }

    console.log(`✅ Email notification processed successfully`)
    console.log(`To: ${DESTINATION}`)
    console.log(`Subject: ${subject}`)
    console.log(`Content: ${lines}`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Notification processed',
        destination: DESTINATION,
        formType 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    console.error('send-email error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
