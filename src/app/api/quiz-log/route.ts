import {NextResponse} from 'next/server';
import {getQuizzes} from "@/services/quizService";
import {createSupabaseServerClient} from "@/utils/supabase/server";
import {generateRandomToken} from "@/utils/token";
import {insertQuizLog, insertQuizPublishLog} from "@/services/quizLogService";

export async function POST(request: Request) {
  const supabaseClient = createSupabaseServerClient();

  const {searchParams} = new URL(request.url);
  const quizToken = searchParams.get('quiz-token');
  const question = searchParams.get('question');
  const selectedOption = searchParams.get('selected-option');

  if (!quizToken || !question || !selectedOption) {
    return new NextResponse(null, {status: 400});
  }

  await insertQuizLog(supabaseClient, quizToken, question, selectedOption);
  return new NextResponse(null, {status: 201});
}