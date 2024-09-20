import {CheckCircle, XCircle} from "lucide-react";
import {base64Decrypt} from "@/utils/encrypt";

type QuizOptionResultDecoProps = {
  option: QuizOption;
  selectedNameKo: string | null;
  quizQuestion: QuizQuestion;
};

export default function QuizOptionResultDeco({
                                               option,
                                               selectedNameKo,
                                               quizQuestion,
                                             }: QuizOptionResultDecoProps) {
  const optionNameKo = base64Decrypt(option.encryptedNameKo);
  const isCorrectAnswer = optionNameKo === quizQuestion.nameKo;
  const isWrongAnswer = selectedNameKo === optionNameKo && !isCorrectAnswer;

  if (selectedNameKo !== null) {
    if (isCorrectAnswer) {
      return (
        <>
          <div
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm font-medium"></div>
          <CheckCircle className="absolute top-2 right-2 h-6 w-6 text-green-500"/>
        </>
      );
    }

    if (isWrongAnswer) {
      return (
        <>
          <div
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm font-medium">
            {optionNameKo}
          </div>
          <XCircle className="absolute top-2 right-2 h-6 w-6 text-red-500"/>
        </>
      );
    }
  }
}