import {NextResponse} from 'next/server';
import {getRankings, insertRanking} from "@/services/rankingService";

export async function POST(request: Request) {
  const body = await request.json();
  console.log('Request body:', body);
  await insertRanking(body);
  return new NextResponse(null, {status: 201});
}

export async function GET(request: Request): Promise<NextResponse<Ranking[]>> {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page'));
  const pageSize = Number(searchParams.get('pageSize'));
  const orderByScore = searchParams.get('orderByScore') === 'true';
  console.log(`requestUrl: ${request.url}, page: ${page}, pageSize: ${pageSize}, orderByScore: ${orderByScore}`);

  const rankings = await getRankings(page, pageSize, orderByScore);
  console.log('rankings:', rankings)
  return NextResponse.json(rankings)
}