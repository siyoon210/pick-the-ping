import {createSupabaseServerClient} from '@/utils/supabase/server';

export async function getRankings(page: number, pageSize: number, orderByScore: boolean): Promise<Ranking[]> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const {
    data,
    error
  } = orderByScore ? await selectRankingOrderByScore(from, to) : await selectRankingOrderByCreatedAt(from, to);

  if (data === null || error) {
    console.error("No data found from ranking. Error: ", error);
    return [];
  }
  return data.map((row: any) => {
    return {
      id: row.id,
      score: row.score,
      name: row.name,
      message: row.message,
      createdAt: row.created_at
    }
  });
}

const selectRankingOrderByScore = async (from: number, to: number): Promise<any> => {
  const supabaseClient = createSupabaseServerClient();
  return supabaseClient
    .from("ranking")
    .select('*')
    .order('score', {ascending: false})
    .range(from, to);
};

const selectRankingOrderByCreatedAt = async (from: number, to: number): Promise<any> => {
  const supabaseClient = createSupabaseServerClient();
  return supabaseClient
    .from("ranking")
    .select('*')
    .order('created_at', {ascending: false})
    .range(from, to);
};

export async function insertRanking(ranking: Ranking): Promise<void> {
  console.log("Inserting ranking: ", ranking);
  const supabaseClient = createSupabaseServerClient();
  const {data, error} = await supabaseClient
    .from('ranking')
    .insert([
      {
        score: ranking.score,
        name: ranking.name,
        message: ranking.message,
      }
    ]);

  if (error) {
    console.error("Error inserting ranking: ", error);
  }
}
