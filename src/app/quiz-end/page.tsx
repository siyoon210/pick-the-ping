import {Home, Trophy, Clock} from 'lucide-react'
import Link from 'next/link'
import RankingSubmitForm from "@/components/quiz-end/RankingSubmitForm";
import RankingList from "@/components/ranking/RankingList"

// todo 점수 암호화
// todo 점수 검증 (실제로 가능한 점수인지)
// todo XSS, SQL인젝션
export default function Page({searchParams}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const score = Number(searchParams.score);

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
            <p className="text-5xl font-bold text-primary mt-2">{score}</p>
          </div>

          <RankingSubmitForm score={score}/>
          <RankingList page={1} pageSize={3}/>
        </div>
      </div>
    </div>
  )
}