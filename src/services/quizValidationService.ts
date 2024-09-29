import {SupabaseClient} from "@supabase/supabase-js";
import {QUIZ_LIMIT_TIME_SECONDS, QUIZZES_FETCH_SIZE} from "@/constants/quiz_constant";

export async function validate(supabaseClient: SupabaseClient, quizToken: string) {
  const {data: quizLogs} = await supabaseClient
    .from('quiz_log')
    .select('*')
    .eq('quiz_token', quizToken);

  if (quizLogs === null || quizLogs.length === 0) {
    return true;
  }

  const {data: quizPublishLogs} = await supabaseClient
    .from('quiz_publish_log')
    .select('*')
    .eq('quiz_token', quizToken);

  if (quizPublishLogs === null || quizPublishLogs.length === 0) {
    console.warn(`[Validation] No quiz publish log found for quizToken: ${quizToken}`);
    return false;
  }

  const sortedQuizLogs = quizLogs.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  const sortedQuizPublishLogs = quizPublishLogs.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

  if (!(logsQuizzesSizeValidation(sortedQuizLogs, sortedQuizPublishLogs))) {
    console.warn(`[Validation] QuizLogs size validation failed for quizToken: ${quizToken}`);
    return false;
  }

  if (!(logsQuizzesSizeBetweenPublishValidation(sortedQuizLogs, sortedQuizPublishLogs))) {
    console.warn(`[Validation] QuizLogs size between publish validation failed for quizToken: ${quizToken}`);
    return false;
  }

  if (!(quizPeriodValidation(sortedQuizLogs, sortedQuizPublishLogs))) {
    console.warn(`[Validation] Quiz period validation failed for quizToken: ${quizToken}`);
    // 실제로 오차가 발생할 수 있을것 같아 로그용으로만 참조한다.
  }

  if (!(timerValidate(sortedQuizLogs))) {
    console.warn(`[Validation] Timer validation failed for quizToken: ${quizToken}`);
    // 실제로 오차가 발생할 수 있을것 같아 로그용으로만 참조한다.
  }

  if (!(timerSequenceValidate(sortedQuizLogs))) {
    console.warn(`[Validation] Timer sequence validation failed for quizToken: ${quizToken}`);
    return false;
  }

  return true;
}

/**
 * 발행한 퀴즈 숫자보다 많은 문제를 풀면 안된다.
 */
const logsQuizzesSizeValidation = (sortedQuizLogs: any[], sortedQuizPublishLogs: any[]) => {
  return sortedQuizLogs.length <= sortedQuizPublishLogs.length * QUIZZES_FETCH_SIZE;
}

/**
 * 발행시간사이에 퀴즈로그는 QUIZZES_FETCH_SIZE 만큼만 있어야 한다.
 */
const logsQuizzesSizeBetweenPublishValidation = (sortedQuizLogs: any[], sortedQuizPublishLogs: any[]) => {
  for (let i = 0; i < sortedQuizPublishLogs.length - 1; i++) {
    const startPublishLog = new Date(sortedQuizPublishLogs[i].created_at);
    const endPublishLog = new Date(sortedQuizPublishLogs[i + 1].created_at);

    const quizLogsBetweenPublish = sortedQuizLogs.filter((log: { created_at: string }) => {
      const logTime = new Date(log.created_at);
      return logTime >= startPublishLog && logTime < endPublishLog;
    });

    if (quizLogsBetweenPublish.length !== QUIZZES_FETCH_SIZE) {
      return false;
    }
  }

  return true;
}

/**
 * 퀴즈 시작시간과 끝시간을 비교하여 QUIZ_LIMIT_TIME_SECONDS 10% 오차 이내로 풀어야 한다.
 */
const quizPeriodValidation = (sortedQuizLogs: any[], sortedQuizPublishLogs: any[]) => {
  const startTime = new Date(sortedQuizPublishLogs[0].created_at).getTime();
  const endTime = new Date(sortedQuizLogs[sortedQuizLogs.length - 1].created_at).getTime();
  const timeDifferenceInMilliseconds = endTime - startTime;
  const timeDifferenceInSeconds = timeDifferenceInMilliseconds / 1000;
  return timeDifferenceInSeconds <= QUIZ_LIMIT_TIME_SECONDS * 1.1; // 10% 오차 허용
}

/**
 * timer 값은 0보다 같거나 커야한다.
 */
function timerValidate(sortedQuizLogs: any[]): boolean {
  for (let i = 0; i < sortedQuizLogs.length; i++) {
    if (sortedQuizLogs[i].timer < 0) {
      return false;
    }
  }
  return true;
}

/**
 * 다음 로그의 timer 값은 이전 로그의 timer 값보다 작아야 한다.
 */
function timerSequenceValidate(sortedQuizLogs: any[]): boolean {
  for (let i = 1; i < sortedQuizLogs.length; i++) {
    const previousLog = sortedQuizLogs[i - 1];
    const currentLog = sortedQuizLogs[i];

    if (currentLog.timer > previousLog.timer) {
      return false;
    }
  }
  return true;
}
