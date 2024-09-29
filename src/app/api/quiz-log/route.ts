import {NextResponse} from 'next/server';
import {createSupabaseServerClient} from "@/utils/supabase/server";
import {insertQuizLog} from "@/services/quizLogService";

export async function POST(request: Request) {
  const supabaseClient = createSupabaseServerClient();

  const {searchParams} = new URL(request.url);
  const quizToken = searchParams.get('quiz-token');
  const question = searchParams.get('question');
  const selectedOption = searchParams.get('selected-option');
  const timer = searchParams.get('timer');

  if (!quizToken || !question || !selectedOption || !timer || isNaN(Number(timer))) {
    return new NextResponse(null, {status: 400});
  }

  await insertQuizLog(supabaseClient, quizToken, question, selectedOption, Number(timer));
  return new NextResponse(null, {status: 201});
}