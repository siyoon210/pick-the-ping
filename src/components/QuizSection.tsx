"use client";

import {Award, Clock} from "lucide-react";
import {useEffect, useState} from 'react';
import QuizOptionButton from "@/components/QuizOptionButton";
import {useRouter} from 'next/navigation';
import {useTimer} from "@/hooks/useTimer";

const INIT_TIME = 60

export default function QuizSection() {
  const [score, setScore] = useState(0)
  const [selectedNameKo, setSelectedNameKo] = useState<string | null>(null)
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [quiz, setQuiz] = useState<Quiz>()
  const router = useRouter();
  const {timer, setIsTimerPaused} = useTimer(INIT_TIME, () => router.push(`/quiz-end?score=${score}`));

  useEffect(() => {
    pauseTimerAndFetchQuizzes();
  }, []);

  const pauseTimerAndFetchQuizzes = () => {
    setIsTimerPaused(true);
    console.log('Fetching quizzes.');
    fetch('/api/quiz')
      .then(response => response.json())
      .then(responseQuizzes => {
        initQuiz(responseQuizzes);
        setIsTimerPaused(false);
      })
      .catch(error => {
        console.error('Error fetching quizzes:', error);
        pauseTimerAndFetchQuizzes();
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
      pauseTimerAndFetchQuizzes()
    }
  }

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Clock className="h-5 w-5 mr-2 text-primary"/>
          <span className="font-medium">{timer}초</span>
        </div>
        <div className="flex items-center">
          <Award className="h-5 w-5 mr-2 text-primary"/>
          <span className="font-medium">{score} 점</span>
        </div>
      </div>
      <div className="mb-4 text-center p-3 bg-gray-50 rounded-md">
        <p className="text-lg font-semibold mb-1">{quiz.question.nameKo}</p>
        <p className="text-md text-gray-600">{quiz.question.nameEn}</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {quiz.options.map((option, index) => (
          <QuizOptionButton
            key={index}
            option={option}
            index={index}
            quizQuestion={quiz.question}
            selectedNameKo={selectedNameKo}
            setSelectedNameKo={setSelectedNameKo}
            setScore={setScore}
            setNextQuiz={setNextQuiz}
          />
        ))}
      </div>
    </div>
  );
}