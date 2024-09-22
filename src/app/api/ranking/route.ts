import {NextResponse} from 'next/server';
import {getRankings, insertRanking} from "@/services/rankingService";
import {createSupabaseServerClient} from "@/utils/supabase/server";

export async function POST(request: Request) {
  const supabaseClient = createSupabaseServerClient();

  const {searchParams} = new URL(request.url);
  const quizToken = searchParams.get('quiz-token');

  if (!quizToken) {
    return NextResponse.redirect('/ranking');
  }

  const body = await request.json();
  await insertRanking(supabaseClient, body, quizToken);
  return new NextResponse(null, {status: 201});
}

export async function GET(request: Request): Promise<NextResponse<Ranking[]>> {
  const supabaseClient = createSupabaseServerClient();
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page'));
  const pageSize = Number(searchParams.get('pageSize'));
  const orderByScore = searchParams.get('orderByScore') === 'true';
  console.log(`requestUrl: ${request.url}, page: ${page}, pageSize: ${pageSize}, orderByScore: ${orderByScore}`);

  const rankings = await getRankings(supabaseClient, page, pageSize, orderByScore);
  console.log('rankings:', rankings)
  return NextResponse.json(rankings)
}