import {getQuizzes} from "@/services/quizService";
import { Home, Clock, Award } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default async function Page() {
  const quizzes = await getQuizzes();
  const quiz = quizzes[0];

  // const [timer, setTimer] = useState(60)
  // const [score, setScore] = useState(0)
  // const [keyword, setKeyword] = useState({ ko: '사과', en: 'Apple' })
  //
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0))
  //   }, 1000)
  //
  //   return () => clearInterval(interval)
  // }, [])
  //
  // const handleImageClick = () => {
  //   setScore((prevScore) => prevScore + 1)
  // }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 bg-primary text-primary-foreground flex justify-between items-center">
          <h1 className="text-xl font-semibold">Pick the Teenieping</h1>
          <Link href="/" className="text-primary-foreground hover:text-primary-foreground/80">
            <Home className="h-6 w-6" />
          </Link>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              <span className="font-medium">{60}초</span>
            </div>
            <div className="flex items-center">
              <Award className="h-5 w-5 mr-2 text-primary" />
              <span className="font-medium">{0} 점</span>
            </div>
          </div>
          <div className="mb-4 text-center p-3 bg-gray-50 rounded-md">
            <p className="text-lg font-semibold mb-1">{quiz.question.nameKo}</p>
            <p className="text-md text-gray-600">{quiz.question.nameEn}</p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {quiz.options.map((option, index) => (
              <button
                key={index}
                className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-md overflow-hidden transition-colors hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                // onClick={handleImageClick}
              >
                <Image
                  src={`${option.imageUrl}`}
                  alt={`Quiz image ${index + 1}`}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}