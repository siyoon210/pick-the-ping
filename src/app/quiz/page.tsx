import {Home} from 'lucide-react'
import Link from 'next/link'
import QuizSection from "@/components/QuizSection";

// todo 로딩
export default async function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 bg-black text-white flex justify-between items-center">
          <h1 className="text-xl font-semibold">Pick the Teenieping</h1>
          <Link href="/" className="text-white hover:text-white/80">
            <Home className="h-6 w-6" />
          </Link>
        </div>
        <QuizSection/>
      </div>
    </div>
  );
}