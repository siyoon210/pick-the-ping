import {createSupabaseServerClient} from '@/utils/supabase/server';

export async function getTeeniepings(): Promise<Teenieping[]> {
  const supabaseClient = createSupabaseServerClient();
  const {data, error} = await supabaseClient.from("teenieping").select('*');
  if (data === null || error) {
    console.error("No data found from teenieping. Error: ", error);
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