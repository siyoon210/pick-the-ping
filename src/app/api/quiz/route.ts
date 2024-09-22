import {NextResponse} from 'next/server';
import {getQuizzes} from "@/services/quizService";
import {createSupabaseServerClient} from "@/utils/supabase/server";
import {generateRandomToken} from "@/utils/token";
import {insertQuizPublishLog} from "@/services/quizLogService";

export async function GET(request: Request): Promise<NextResponse<Quiz[]>> {
  const supabaseClient = createSupabaseServerClient();

  const quizzes = await getQuizzes(supabaseClient);

  const { searchParams } = new URL(request.url);
  const quizToken = searchParams.get('quiz-token') || generateRandomToken();
  await insertQuizPublishLog(supabaseClient, quizToken, quizzes);

  return NextResponse.json(quizzes);
}