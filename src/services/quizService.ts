import {getRandomElement, getShuffledArray} from "@/utils/random";
import {getImageUrlsByTeeniepingIds} from "@/services/teeniepingImageService";
import {base64Encrypt} from "@/utils/encrypt";
import {getTeeniepings} from "@/services/teeniepingService";
import {SupabaseClient} from "@supabase/supabase-js";

const quizzesSize = 10;

export async function getQuizzes(supabaseClient: SupabaseClient): Promise<Quiz[]> {
  const teeniepings = await getTeeniepings(supabaseClient)
  const teeniepingImages = await getImageUrlsByTeeniepingIds(supabaseClient);

  const quizzes: Quiz[] = [];
  for (let i = 0; i < quizzesSize; i++) {
    const randomSelectedTeeniepings = getShuffledArray(teeniepings, 9);
    const randomSelectedTeenieping = getRandomElement(randomSelectedTeeniepings);

    const quiz: Quiz = {
      question: {nameKo: randomSelectedTeenieping.nameKo, nameEn: randomSelectedTeenieping.nameEn},
      options: randomSelectedTeeniepings.map((teenieping) => {
        const encryptedNameKo = base64Encrypt(teenieping.nameKo);
        const encryptedNameEn = base64Encrypt(teenieping.nameEn);
        const imageUrl = getRandomElement(teeniepingImages[teenieping.id]);
        return {encryptedNameKo, encryptedNameEn, imageUrl};
      }),
    };

    quizzes.push(quiz);
  }

  return quizzes;
}