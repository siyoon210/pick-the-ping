import Image from "next/image";
import QuizOptionResultDeco from "@/components/QuizOptionResultDeco";
import {base64Decrypt} from "@/utils/encrypt";

type QuizOptionButtonProps = {
  option: QuizOption;
  index: number;
  quizQuestion: QuizQuestion;
  selectedNameKo: string | null;
  setSelectedNameKo: (nameKo: string) => void;
  setScore: (prevScore: (prev: number) => number) => void;
  setNextQuiz: () => void;
};

const CORRECT_TIMEOUT = 250
const INCORRECT_TIMEOUT = 1800

export default function QuizOptionButton({
                                           option,
                                           index,
                                           quizQuestion,
                                           selectedNameKo,
                                           setSelectedNameKo,
                                           setScore,
                                           setNextQuiz,
                                         }: QuizOptionButtonProps) {
  const selectImage = (selectedOption: QuizOption) => {
    return () => {
      const selectedOptionNameKo = base64Decrypt(selectedOption.encryptedNameKo);
      if (selectedOptionNameKo === quizQuestion.nameKo) {
        setSelectedNameKo(selectedOptionNameKo)
        setScore((prevScore) => prevScore + 1)
        setTimeout(() => {
          setNextQuiz()
        }, CORRECT_TIMEOUT)
      } else {
        setSelectedNameKo(selectedOptionNameKo)
        setTimeout(() => {
          setNextQuiz()
        }, INCORRECT_TIMEOUT)
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
      <Image
        src={`${option.imageUrl}`}
        alt={`Quiz image ${index + 1}`}
        width={100}
        height={100}
        className="w-full h-full object-cover"
        priority
      />
      <QuizOptionResultDeco
        option={option}
        selectedNameKo={selectedNameKo}
        quizQuestion={quizQuestion}
      />
    </button>
  );
}