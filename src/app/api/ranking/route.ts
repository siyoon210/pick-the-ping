import {NextResponse} from 'next/server';
import {getRankings, insertRanking} from "@/services/rankingService";
import {createSupabaseServerClient} from "@/utils/supabase/server";
import {getTotalScore} from "@/services/scoreService";

export async function POST(request: Request) {
  const supabaseClient = createSupabaseServerClient();
  const body = await request.json();
  if (!body.quizToken) {
    return NextResponse.redirect('/ranking');
  }

  const totalScore = await getTotalScore(supabaseClient, body.quizToken);
  if (totalScore === 0) {
    return NextResponse.redirect('/ranking');
  }

  await insertRanking(supabaseClient, totalScore, body.name, body.message, body.quizToken);
  return new NextResponse(null, {status: 201});
}

export async function GET(request: Request): Promise<NextResponse<Ranking[]>> {
  const supabaseClient = createSupabaseServerClient();
  const {searchParams} = new URL(request.url);
  const page = Number(searchParams.get('page'));
  const pageSize = Number(searchParams.get('page-size'));
  const orderByScore = searchParams.get('order-by-score') === 'true';
  console.log(`requestUrl: ${request.url}, page: ${page}, page-size: ${pageSize}, order-by-score: ${orderByScore}`);

  const rankings = await getRankings(supabaseClient, page, pageSize, orderByScore);
  console.log('rankings:', rankings)
  return NextResponse.json(rankings)
}