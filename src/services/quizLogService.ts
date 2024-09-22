import {SupabaseClient} from "@supabase/supabase-js";

export async function insertQuizPublishLog(supabaseClient: SupabaseClient, quizToken: string, quizzes: Quiz[]): Promise<void> {
  const {error} = await supabaseClient
    .from('quiz_publish_log')
    .insert([
      {
        quiz_token: quizToken,
        response: quizzes,
      }
    ]);

  if (error) {
    console.error("Failed to insert quiz_publish_log. Error: ", error);
  }
}