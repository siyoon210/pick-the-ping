type Quiz = {
  question: QuizQuestion,
  options: QuizOption[]
}

type QuizQuestion = {
  nameKo: string,
  nameEn: string
}

type QuizOption = {
  encryptedNameKo: string,
  encryptedNameEn: string,
  imageUrl: string
}