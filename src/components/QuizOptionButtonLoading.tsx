
export default function QuizOptionButtonLoading() {
  return (
    <button
      className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-md overflow-hidden transition-colors hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
      disabled={true}
    >
      <div className="w-[100px] h-[100px]"></div>
    </button>
  );
}