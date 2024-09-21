import { useState, useEffect } from 'react';

export const useTimer = (initialTime: number, onTimeUp: () => void) => {
  const [timer, setTimer] = useState(initialTime);
  const [isTimerPaused, setIsTimerPaused] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isTimerPaused && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timer === 0) {
      onTimeUp();
    }

    return () => clearInterval(interval);
  }, [timer, isTimerPaused, onTimeUp]);

  return { timer, setTimer, isTimerPaused, setIsTimerPaused };
};