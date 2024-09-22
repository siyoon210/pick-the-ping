import {SupabaseClient} from "@supabase/supabase-js";

export async function getTotalScore(supabaseClient: SupabaseClient, quizToken: string): Promise<number> {
  const {data, error} = await supabaseClient
    .from('quiz_log')
    .select('*')
    .eq('quiz_token', quizToken);

  if (data === null) {
    return 0;
  }

  if (error) {
    console.error(`Error fetching quiz_log: ${JSON.stringify(error)} / quiz_token": ${quizToken}`);
    return 0;
  }

  console.log(`Total score: ${JSON.stringify(data)}`);
  return data.reduce((acc: number, row: any) => {
    if (row.question === row.selected_option) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);
}