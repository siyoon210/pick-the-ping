"use client";

import {Award, Clock} from "lucide-react";
import {useEffect, useState} from 'react';
import QuizOptionButton from "@/components/QuizOptionButton";
import {useRouter} from 'next/navigation';
import {useTimer} from "@/hooks/useTimer";
import {QUIZ_LIMIT_TIME_SECONDS} from "@/constants/quiz_constant";
import QuizOptionButtonLoading from "@/components/QuizOptionButtonLoading";

const prefetchImages = (urls: string[]) => {
  urls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
};

export default function QuizSection() {
  const [score, setScore] = useState(0)
  const [selectedNameKo, setSelectedNameKo] = useState<string | null>(null)
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [quiz, setQuiz] = useState<Quiz>()
  const [quizToken, setQuizToken] = useState<string>("")
  const router = useRouter();
  const {timer, resumeTimer} = useTimer(QUIZ_LIMIT_TIME_SECONDS, () => router.push(`/quiz-end?quiz-token=${quizToken}`));

  useEffect(() => {
    const imageUrls = Array.from({ length: 108 }, (_, i) => `/img/teenieping/${i + 1}.webp`);
    prefetchImages(imageUrls);
    fetchQuizzes();
  }, []);

  const fetchQuizzes = () => {
    console.log('Fetching quizzes.');
    fetch(`/api/quiz?quiz-token=${quizToken}`)
      .then(response => response.json())
      .then(responseQuizzes => {
        setQuizToken(responseQuizzes.quizToken);
        initQuiz(responseQuizzes.quizzes);
        resumeTimer();
      })
      .catch(error => {
        console.error('Error fetching quizzes:', error);
        fetchQuizzes();
      });
  };

  const initQuiz = (quizzes: Quiz[]) => {
    setQuiz(quizzes.shift())
    setSelectedNameKo(null)
    setQuizzes(quizzes)
  };

  const setNextQuiz = () => {
    if (quizzes.length > 0) {
      initQuiz(quizzes)
    } else {
      fetchQuizzes()
    }
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Clock className="h-5 w-5 mr-2 text-primary"/>
          <span className="font-medium">{timer.toFixed(0)}초</span>
        </div>
        <div className="flex items-center">
          <Award className="h-5 w-5 mr-2 text-primary"/>
          <span className="font-medium">{score} 점</span>
        </div>
      </div>
      <div className="mb-4 text-center p-3 bg-gray-50 rounded-md">
        {quiz ? (
          <>
            <p className="text-lg font-semibold mb-1">{quiz.question.nameKo}</p>
            <p className="text-md text-gray-600">{quiz.question.nameEn}</p>
          </>
        ) : (
          <div className="h-14">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-300 mx-auto"></div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {quiz ? (
          quiz.options.map((option, index) => (
            <QuizOptionButton
              key={index}
              option={option}
              index={index}
              quizToken={quizToken}
              quizQuestion={quiz.question}
              timer={timer}
              selectedNameKo={selectedNameKo}
              setSelectedNameKo={setSelectedNameKo}
              setScore={setScore}
              setNextQuiz={setNextQuiz}
            />
          ))
        ) : (
          Array.from({length: 9}).map((_, index) => (
            <QuizOptionButtonLoading key={index}/>
          ))
        )}
      </div>
    </div>
  );
}