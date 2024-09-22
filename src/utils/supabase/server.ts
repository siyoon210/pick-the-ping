import { createClient } from '@supabase/supabase-js';

export const createSupabaseServerClient = () => {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,  // 세션 유지 안 함 (서버 사이드용)
      },
    }
  );
};