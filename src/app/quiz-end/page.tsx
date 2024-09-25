import {Home, Trophy, Clock} from 'lucide-react'
import Link from 'next/link'
import RankingSubmitForm from "@/components/quiz-end/RankingSubmitForm";
import RankingList from "@/components/ranking/RankingList"
import {redirect} from 'next/navigation';
import {getTotalScore} from "@/services/scoreService";
import {createSupabaseServerClient} from "@/utils/supabase/server";
import {validate} from "@/services/quizValidationService";

export default async function Page({searchParams}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const supabaseClient = createSupabaseServerClient();

  const quizToken = searchParams['quiz-token'] as string;
  if (!quizToken) {
    redirect('/ranking');
  }

  const totalScore = await getTotalScore(supabaseClient, quizToken);
  if (totalScore === 0) {
    redirect('/ranking');
  }

  const isValidQuiz = await validate(supabaseClient, quizToken);
  if (!isValidQuiz) {
    redirect('/ranking');
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 bg-black text-white flex justify-between items-center">
          <h1 className="text-xl font-semibold">게임 종료</h1>
          <Link href="/" className="text-white hover:text-white/80">
            <Home className="h-6 w-6"/>
          </Link>
        </div>
        <div className="p-4">
          <div className="text-center mb-6">
            <p className="text-3xl font-bold">최종 점수</p>
            <p className="text-5xl font-bold text-primary mt-2">{totalScore}</p>
          </div>

          <RankingSubmitForm quizToken={quizToken}/>
          <RankingList page={1} pageSize={3}/>
        </div>
      </div>
    </div>
  );
}