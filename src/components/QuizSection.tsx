"use client";

import {Award, Clock} from "lucide-react";
import {useEffect, useState} from 'react';
import {base64Decrypt} from "@/utils/encrypt";
import QuizOptionButton from "@/components/QuizOptionButton";

const CORRECT_TIMEOUT = 300
const INCORRECT_TIMEOUT = 1800

export default function QuizSection() {
  const [timer, setTimer] = useState(10)
  const [isTimerPaused, setIsTimerPaused] = useState(true)
  const [score, setScore] = useState(0)
  const [selectedNameKo, setSelectedNameKo] = useState<string | null>(null)
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [quiz, setQuiz] = useState<Quiz>()

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isTimerPaused && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timer === 0) {
      console.log('타이머가 0초에 도달했습니다!');
    }

    return () => clearInterval(interval);
  }, [timer, isTimerPaused]);

  useEffect(() => {
    pauseTimerAndFetchQuizzes();
  }, []);

  const pauseTimerAndFetchQuizzes = () => {
    setIsTimerPaused(true)
    fetchQuizzes()
      .then(quizzes => {
        initQuiz(quizzes);
        setIsTimerPaused(false)
      });
  };

  const fetchQuizzes = async (): Promise<Quiz[]> => {
    try {
      console.log('Fetching quizzes.');
      const response = await fetch('/api/quiz');
      return await response.json();
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      return [];
    }
  };

  const initQuiz = (quizzes: Quiz[]) => {
    setQuiz(quizzes.shift())
    setSelectedNameKo(null)
    setQuizzes(quizzes)
  };

  const selectImage = (selectedOption: QuizOption) => {
    return () => {
      const selectedOptionNameKo = base64Decrypt(selectedOption.encryptedNameKo);
      if (selectedOptionNameKo === quiz?.question.nameKo) {
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
            selectedNameKo={selectedNameKo}
            quizQuestion={quiz.question}
            selectImage={selectImage}
          />
        ))}
      </div>
    </div>
  );
}