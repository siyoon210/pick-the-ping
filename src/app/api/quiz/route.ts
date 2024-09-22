import {NextResponse} from 'next/server';
import {getQuizzes} from "@/services/quizService";
import {createSupabaseServerClient} from "@/utils/supabase/server";

export async function GET(): Promise<NextResponse<Quiz[]>> {
  const supabaseClient = createSupabaseServerClient();
  const quizzes = await getQuizzes(supabaseClient);
  return NextResponse.json(quizzes);
}