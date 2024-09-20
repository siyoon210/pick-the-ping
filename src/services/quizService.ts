import {getRandomElement, getShuffledArray} from "@/utils/random";
import {getImageUrlsByTeeniepingIds} from "@/services/teeniepingImageService";
import {base64Encrypt} from "@/utils/encrypt";
import {getTeeniepings} from "@/services/teeniepingService";

export async function getQuizzes(quizSize = 10): Promise<Quiz[]> {
  const teeniepings = await getTeeniepings()
  const teeniepingImages = await getImageUrlsByTeeniepingIds();

  const quizzes: Quiz[] = [];
  for (let i = 0; i < quizSize; i++) {
    const randomSelectedTeeniepings = getShuffledArray(teeniepings, 9);
    const randomSelectedTeenieping = getRandomElement(randomSelectedTeeniepings);

    const quiz: Quiz = {
      question: { nameKo: randomSelectedTeenieping.nameKo, nameEn: randomSelectedTeenieping.nameEn },
      options: randomSelectedTeeniepings.map((teenieping) => {
        const encryptedNameKo = base64Encrypt(teenieping.nameKo);
        const encryptedNameEn = base64Encrypt(teenieping.nameEn);
        const imageUrl = getRandomElement(teeniepingImages[teenieping.id]);
        return { encryptedNameKo, encryptedNameEn, imageUrl };
      }),
    };

    quizzes.push(quiz);
  }

  return quizzes;
}