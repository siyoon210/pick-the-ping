type Quiz = {
  question: { nameKo: string, nameEn: string },
  options: { encryptedNameKo: string, encryptedNameEn: string, imageUrl: string }[]
}