import Image from "next/image";
import QuizOptionResultDeco from "@/components/QuizOptionResultDeco";

type QuizOptionButtonProps = {
  option: QuizOption;
  index: number;
  selectedNameKo: string | null;
  quizQuestion: QuizQuestion;
  selectImage: (selectedOption: QuizOption) => () => void;
};

export default function QuizOptionButton({
                                           option,
                                           index,
                                           selectedNameKo,
                                           quizQuestion,
                                           selectImage,
                                         }: QuizOptionButtonProps) {
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