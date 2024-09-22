import {SupabaseClient} from "@supabase/supabase-js";
import {base64Decrypt} from "@/utils/encrypt";

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

export async function insertQuizLog(supabaseClient: SupabaseClient, quizToken: string, question: string, selectedOption: string): Promise<void> {
  const decryptSelectedOption = base64Decrypt(selectedOption);
  const {error} = await supabaseClient
    .from('quiz_log')
    .insert([
      {
        quiz_token: quizToken,
        question: question,
        selected_option: decryptSelectedOption,
      }
    ]);

  if (error) {
    console.error(`Failed to insert quiz_log. quizToken:${quizToken} / question:${question} / selectedOption:${decryptSelectedOption} Error: ${error}`);
  }
}