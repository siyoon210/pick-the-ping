import {SupabaseClient} from "@supabase/supabase-js";
import {validate} from "@/services/quizValidationService";
import {MESSAGE_INPUT_LENGTH, NAME_INPUT_LENGTH} from "@/constants/ranking_constant";

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

export async function insertRanking(supabaseClient: SupabaseClient, totalScore: number, name: string, message: string, quizToken: string): Promise<void> {
  console.log(`Inserting ranking: ${totalScore}, ${name}, ${message} / quizToken: ${quizToken}`);

  const isValidQuiz = await validate(supabaseClient, quizToken);
  if (!isValidQuiz) {
    return
  }

  const {error} = await supabaseClient
    .from('ranking')
    .insert([
      {
        score: totalScore,
        name: name.slice(0, NAME_INPUT_LENGTH),
        message: message.slice(0, MESSAGE_INPUT_LENGTH),
        quiz_token: quizToken
      }
    ]);

  if (error) {
    console.error("Error inserting ranking: ", JSON.stringify(error));
  }
}

export async function getRankingByQuizToken(supabaseClient: SupabaseClient, quizToken: string): Promise<Ranking | null> {
  const {data} = await supabaseClient
    .from('ranking')
    .select('*')
    .eq('quiz_token', quizToken)

  if (data === null || data.length === 0) {
    return null
  }

  return {
    id: data[0].id,
    score: data[0].score,
    name: data[0].name,
    message: data[0].message,
    createdAt: data[0].created_at
  }
}
