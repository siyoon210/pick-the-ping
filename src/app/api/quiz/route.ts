import {NextResponse} from 'next/server';
import {getQuizzes} from "@/services/quizService";

export async function GET(): Promise<NextResponse<Quiz[]>> {
  const quizzes = await getQuizzes();
  return NextResponse.json(quizzes);
}