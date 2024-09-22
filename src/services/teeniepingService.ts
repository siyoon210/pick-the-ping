import {SupabaseClient} from "@supabase/supabase-js";

export async function getTeeniepings(supabaseClient: SupabaseClient): Promise<Teenieping[]> {
  const {data, error} = await supabaseClient.from("teenieping").select('*');
  if (data === null || error) {
    console.error("No data found from teenieping. Error: ", JSON.stringify(error));
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