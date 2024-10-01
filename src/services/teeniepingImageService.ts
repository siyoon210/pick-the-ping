import {SupabaseClient} from "@supabase/supabase-js";

export async function getImageUrlsByTeeniepingIds(supabaseClient: SupabaseClient): Promise<{ [key: number]: string[] }> {
  const {data, error} = await supabaseClient.from("teenieping_image").select('*').limit(400);
  if (data === null || error) {
    console.error("No data found from teenieping_image. Error: ", JSON.stringify(error));
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