import {createSupabaseServerClient} from '@/utils/supabase/server';

export async function getTeeniepings(): Promise<Teenieping[]> {
  const supabaseClient = createSupabaseServerClient();
  const {data} = await supabaseClient.from("teenieping").select('*');
  if (data === null) {
    console.error("No data found from teenieping");
    return [];
  }
  return data.map((row: any) => {
    return {
      id: row.id,
      nameKo: row.name_ko,
      nameEn: row.name_en
    }
  });
}