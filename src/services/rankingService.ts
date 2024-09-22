import {SupabaseClient} from "@supabase/supabase-js";
import {validate} from "@/services/quizValidationService";

export async function getRankings(supabaseClient: SupabaseClient, page: number, pageSize: number, orderByScore: boolean): Promise<Ranking[]> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const {
    data,
    error
  } = orderByScore ? await selectRankingOrderByScore(supabaseClient, from, to) : await selectRankingOrderByCreatedAt(supabaseClient, from, to);

  if (data === null || error) {
    console.error("No data found from ranking. Error: ", JSON.stringify(error));
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

const selectRankingOrderByScore = async (supabaseClient: SupabaseClient, from: number, to: number): Promise<any> => {
  return supabaseClient
    .from("ranking")
    .select('*')
    .order('score', {ascending: false})
    .range(from, to);
};

const selectRankingOrderByCreatedAt = async (supabaseClient: SupabaseClient, from: number, to: number): Promise<any> => {
  return supabaseClient
    .from("ranking")
    .select('*')
    .order('created_at', {ascending: false})
    .range(from, to);
};

export async function insertRanking(supabaseClient: SupabaseClient, ranking: Ranking, quizToken: string): Promise<void> {
  console.log(`Inserting ranking: ${JSON.stringify(ranking)} / quizToken: ${quizToken}`);

  const isValidQuiz = await validate(supabaseClient, quizToken);
  if(!isValidQuiz) {
    return
  }

  const {error} = await supabaseClient
    .from('ranking')
    .insert([
      {
        score: ranking.score,
        name: ranking.name,
        message: ranking.message,
        quiz_token: quizToken
      }
    ]);

  if (error) {
    console.error("Error inserting ranking: ", JSON.stringify(error));
  }
}
