"use client";

import {useEffect, useState} from "react";
import {Clock, Trophy} from "lucide-react";

type RankingListProps = {
  page: number;
  pageSize: number;
};

// todo 로딩
// todo 페이징
export default function RankingList({page, pageSize}: RankingListProps) {
  const [showScoreRanking, setShowScoreRanking] = useState(false)
  const [rankings, setRankings] = useState<Ranking[]>([])

  const fetchRankings = async (): Promise<Ranking[]> => {
    try {
      console.log('Fetching rankings.');
      const response = await fetch(`/api/ranking?page=${page}&pageSize=${pageSize}&orderByScore=${showScoreRanking}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching rankings:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchRankings()
      .then(rankings => {
        setRankings(rankings);
      });
  }, [showScoreRanking]);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">{showScoreRanking ? '점수순' : '최신순'}</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowScoreRanking(true)}
            className={`px-3 py-1 rounded-md ${showScoreRanking ? 'bg-black text-white' : 'bg-gray-200'}`}
          >
            <Trophy className="h-4 w-4"/>
          </button>
          <button
            onClick={() => setShowScoreRanking(false)}
            className={`px-3 py-1 rounded-md ${!showScoreRanking ? 'bg-black text-white' : 'bg-gray-200'}`}
          >
            <Clock className="h-4 w-4"/>
          </button>
        </div>
      </div>
      <ul className="space-y-2">
        {rankings.map((entry, index) => (
          <li key={index} className="bg-gray-50 p-3 rounded-md">
            <div className="flex justify-between items-center">
              <span className="font-semibold">{entry.name}</span>
              <span className="text-primary font-bold">{entry.score}점</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{entry.message}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}