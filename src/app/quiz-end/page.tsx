import {Home} from 'lucide-react'
import Link from 'next/link'
import RankingSubmitForm from "@/components/quiz-end/RankingSubmitForm";
import RankingList from "@/components/ranking/RankingList"
import {redirect} from 'next/navigation';
import {getTotalScore} from "@/services/scoreService";
import {createSupabaseServerClient} from "@/utils/supabase/server";
import {validate} from "@/services/quizValidationService";
import {getRankingByQuizToken, getRankings} from "@/services/rankingService";
import {RANKING_PAGE_SIZE_UNDER_SUBMIT_FORM} from "@/constants/ranking_constant";

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

  const savedRanking = await getRankingByQuizToken(supabaseClient, quizToken);
  if (savedRanking) {
    redirect('/ranking');
  }

  const isValidQuiz = await validate(supabaseClient, quizToken);
  if (!isValidQuiz) {
    redirect('/ranking');
  }

  const page = 1;
  const orderByScore = true;
  const pageSize = RANKING_PAGE_SIZE_UNDER_SUBMIT_FORM;
  const rankings = await getRankings(supabaseClient, page, pageSize, orderByScore);

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
          <RankingList initialRankings={rankings}
                       initialPage={page}
                       pageSize={pageSize}
                       initialOrderByScore={orderByScore}/>
        </div>
      </div>
    </div>
  );
}