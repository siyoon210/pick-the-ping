import Image from "next/image";
import QuizOptionResultDeco from "@/components/QuizOptionResultDeco";
import {base64Decrypt} from "@/utils/encrypt";
import {timeoutPromise} from "@/utils/timeout";

type QuizOptionButtonProps = {
  option: QuizOption;
  index: number;
  quizQuestion: QuizQuestion;
  timer: number;
  quizToken: string;
  selectedNameKo: string | null;
  setSelectedNameKo: (nameKo: string) => void;
  setScore: (prevScore: (prev: number) => number) => void;
  setNextQuiz: () => void;
  loadedImages: { [key: string]: HTMLImageElement };
};

const CORRECT_TIMEOUT_MS = 250
const INCORRECT_TIMEOUT_MS = 2300

export default function QuizOptionButton({
                                           option,
                                           index,
                                           quizToken,
                                           quizQuestion,
                                           timer,
                                           selectedNameKo,
                                           setSelectedNameKo,
                                           setScore,
                                           setNextQuiz,
                                           loadedImages,
                                         }: QuizOptionButtonProps) {
  const postQuizLog = (selectedOption: QuizOption) => {
    const question = quizQuestion.nameKo;
    const selectedOptionNameKo = selectedOption.encryptedNameKo

    return fetch(`/api/quiz-log?quiz-token=${quizToken}&question=${encodeURIComponent(question)}&selected-option=${encodeURIComponent(selectedOptionNameKo)}&timer=${timer}`, {
      method: 'POST'
    })
  }

  const selectImage = (selectedOption: QuizOption) => {
    return () => {
      if (timer <= 0) {
        return Promise.resolve();
      }

      const selectedOptionNameKo = base64Decrypt(selectedOption.encryptedNameKo);
      if (selectedOptionNameKo === quizQuestion.nameKo) {
        setSelectedNameKo(selectedOptionNameKo)
        setScore((prevScore) => prevScore + 1)
        Promise.all([postQuizLog(selectedOption), timeoutPromise(CORRECT_TIMEOUT_MS)]).then(() => {
          setNextQuiz();
        });
      } else {
        setSelectedNameKo(selectedOptionNameKo)
        Promise.all([postQuizLog(selectedOption), timeoutPromise(INCORRECT_TIMEOUT_MS)]).then(() => {
          setNextQuiz();
        });
      }
    };
  }

  return (
    <button
      key={index}
      className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-md overflow-hidden transition-colors hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
      disabled={selectedNameKo !== null}
      onClick={selectImage(option)}
    >
      {loadedImages[option.imageUrl] ? (
        <img
          src={loadedImages[option.imageUrl].src}
          alt={`Quiz image ${index + 1}`}
          className="w-full h-full object-cover"
        />
      ) : (
        <Image
          src={option.imageUrl}
          alt={`Quiz image ${index + 1}`}
          width={100}
          height={100}
          className="w-full h-full object-cover"
          priority
        />
      )}
      <QuizOptionResultDeco
        option={option}
        selectedNameKo={selectedNameKo}
        quizQuestion={quizQuestion}
      />
    </button>
  );
}