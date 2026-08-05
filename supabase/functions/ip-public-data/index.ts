import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Cache-Control': 'public, max-age=300, s-maxage=900'
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  if (req.method !== 'GET') return new Response(JSON.stringify({error:'method_not_allowed'}), {status:405,headers:{...cors,'Content-Type':'application/json'}});
  try {
    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {auth:{persistSession:false}});
    const [{data:kpis,error:kpiError},{data:ranking,error:rankError},{data:recent,error:recentError}] = await Promise.all([
      supabase.from('v_ip_kpis').select('*').single(),
      supabase.from('v_ip_actor_ranking').select('*').order('mention_count',{ascending:false}),
      supabase.from('v_ip_recent_mentions').select('*').order('published_at',{ascending:false}).limit(30)
    ]);
    const error = kpiError || rankError || recentError;
    if (error) throw error;
    return new Response(JSON.stringify({status:'ok',generated_at:new Date().toISOString(),methodology:{ibdn_available:false,ranking_basis:'validated_mention_count'},kpis,ranking,recent}), {headers:{...cors,'Content-Type':'application/json; charset=utf-8'}});
  } catch (e) {
    return new Response(JSON.stringify({status:'error',error:'public_data_unavailable'}), {status:503,headers:{...cors,'Content-Type':'application/json; charset=utf-8'}});
  }
});
