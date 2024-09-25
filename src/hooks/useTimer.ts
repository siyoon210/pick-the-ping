import { useState, useEffect, useCallback } from 'react';

export const useTimer = (initialTime: number, onTimeUp: () => void) => {
  const [timer, setTimer] = useState(initialTime);
  const [isTimerPaused, setIsTimerPaused] = useState(true);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isTimerPaused && timer > 0) {
      if (startTime === null) {
        setStartTime(Date.now());
      }

      interval = setInterval(() => {
        const elapsedTime = (Date.now() - (startTime ?? Date.now())) / 1000;
        setTimer(() => Math.max(initialTime - elapsedTime, 0));
      }, 200);
    } else if (timer === 0) {
      onTimeUp();
    }

    return () => clearInterval(interval);
  }, [timer, isTimerPaused, onTimeUp, startTime, initialTime]);

  const pauseTimer = useCallback(() => setIsTimerPaused(true), []);
  const resumeTimer = useCallback(() => setIsTimerPaused(false), []);

  return { timer, pauseTimer, resumeTimer };
};