import {SupabaseClient} from "@supabase/supabase-js";
import {QUIZZES_FETCH_SIZE} from "@/constants/quiz_constant";

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
    console.warn(`[Validation] Logs created_at validation failed for quizToken: ${quizToken}`);
    return false;
  }

  if (!(timerValidate(sortedQuizLogs))) {
    console.warn(`[Validation] Timer validation failed for quizToken: ${quizToken}`);
    return false;
  }

  if (!(timerValidateWithCreatedAt(sortedQuizLogs))) {
    console.warn(`[Validation] Timer validation With CreatedAt failed for quizToken: ${quizToken}`);
    // 실제로 오차가 발생할 수 있을것 같아 로그용으로만 참조한다.
  }

  return true;
}

/**
 * 발행시간사이에 퀴즈로그는 QUIZZES_FETCH_SIZE 만큼만 있어야 한다.
 */
const logsQuizzesSizeValidation = (sortedQuizLogs: any, sortedQuizPublishLogs: any) => {
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
 * 다음 로그의 timer 값은 이전 로그의 timer 값보다 작거나 같아야 한다.
 */
function timerValidate(sortedQuizLogs: any): boolean {
  for (let i = 1; i < sortedQuizLogs.length; i++) {
    const previousLog = sortedQuizLogs[i - 1];
    const currentLog = sortedQuizLogs[i];

    if (currentLog.timer > previousLog.timer) {
      return false;
    }
  }
  return true;
}

/**
 * created_at 으로 비교하여 timer 검증
 */
function timerValidateWithCreatedAt(sortedQuizLogs: any): boolean {
  for (let i = 1; i < sortedQuizLogs.length; i++) {
    const previousLog = sortedQuizLogs[i - 1];
    const currentLog = sortedQuizLogs[i];

    const previousTime = new Date(previousLog.created_at).getTime();
    const currentTime = new Date(currentLog.created_at).getTime();

    const timeDifferenceInMilliseconds = currentTime - previousTime;
    const timeDifferenceInSeconds = timeDifferenceInMilliseconds / 1000;

    if (previousLog.timer - timeDifferenceInSeconds > currentLog.timer) {
      return false;
    }
  }
  return true;
}
