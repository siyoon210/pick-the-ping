import {createSupabaseServerClient} from '@/utils/supabase/server';

export async function getImageUrlsByTeeniepingIds(): Promise<{ [key: number]: string[] }> {
  const supabaseClient = createSupabaseServerClient();
  const {data, error} = await supabaseClient.from("teenieping_image").select('*');
  if (data === null || error) {
    console.error("No data found from teenieping_image. Error: ", error);
    return [];
  }
  return data.reduce((acc, current) => {
    const {teenieping_id, image_url} = current;

    if (!acc[teenieping_id]) {
      acc[teenieping_id] = [];
    }

    acc[teenieping_id].push(image_url);

    return acc;
  }, {} as { [key: number]: string[] });
}