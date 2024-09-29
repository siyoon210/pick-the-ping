import Link from 'next/link'
import { Play, Trophy } from 'lucide-react'

export default async function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 bg-black text-white text-center">
          <h1 className="text-3xl font-bold">Pick the Teenieping</h1>
        </div>
        <div className="p-6 space-y-6">
          <p className="text-center text-gray-600">
            캐치! 티니핑 이미지 맞추기
          </p>
          <div className="space-y-4">
            <Link
              href={"/quiz"}
              className="flex items-center justify-center w-full bg-black hover:bg-primary/90 text-white py-3 px-4 rounded-md transition-colors"
            >
              <Play className="w-5 h-5 mr-2"/>
              게임 시작
            </Link>
            <Link
              href={"/ranking"}
              className="flex items-center justify-center w-full bg-gray-100 hover:bg-gray-100/90 text-secondary-foreground py-3 px-4 rounded-md transition-colors"
            >
              <Trophy className="w-5 h-5 mr-2"/>
              랭킹 보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}