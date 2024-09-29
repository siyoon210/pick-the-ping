import {Home} from 'lucide-react'
import Link from 'next/link'
import RankingList from "@/components/ranking/RankingList";
import {getRankings} from "@/services/rankingService";
import {createSupabaseServerClient} from "@/utils/supabase/server";
import {RANKING_PAGE_SIZE} from "@/constants/ranking_constant";

export default async function Page() {
  const supabaseClient = createSupabaseServerClient();
  const page = 1;
  const pageSize = RANKING_PAGE_SIZE;
  const orderByScore = true;
  const rankings = await getRankings(supabaseClient, page, pageSize, orderByScore);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 bg-black text-white flex justify-between items-center">
          <h1 className="text-xl font-semibold">랭킹</h1>
          <Link href="/" className="text-white hover:text-white/80">
            <Home className="h-6 w-6"/>
          </Link>
        </div>
        <div className="p-4">
          <RankingList initialRankings={rankings}
                       initialPage={page}
                       pageSize={pageSize}
                       initialOrderByScore={orderByScore}/>
        </div>
      </div>
    </div>
  );
}