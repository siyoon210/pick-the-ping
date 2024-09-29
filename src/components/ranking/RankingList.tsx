"use client";

import React, {useEffect, useState} from "react";
import {ChevronLeft, ChevronRight, Clock, Trophy} from "lucide-react";

type RankingListProps = {
  initialRankings: Ranking[];
  initialPage: number;
  initialOrderByScore: boolean;
  pageSize: number;
};

// todo 로딩
export default function RankingList({initialRankings, initialPage, pageSize, initialOrderByScore}: RankingListProps) {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [orderByScore, setOrderByScore] = useState(initialOrderByScore)
  const [rankings, setRankings] = useState<Ranking[]>(initialRankings)

  const fetchRankings = async (page: number): Promise<Ranking[]> => {
    try {
      console.log('Fetching rankings.');
      const response = await fetch(`/api/ranking?page=${page}&page-size=${pageSize}&order-by-score=${orderByScore}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching rankings:', error);
      return [];
    }
  };

  useEffect(() => {
    setCurrentPage(() => {
      updateRankings(1);
      return 1;
    });
  }, [orderByScore]);

  const updateRankings = async (currentPage: number) => {
    fetchRankings(currentPage)
      .then(rankings => {
        setRankings(rankings);
      });
  }

  const prevRankingPage = async () => {
    setCurrentPage(prevPage => {
      const newPage = prevPage - 1;
      updateRankings(newPage);
      return newPage;
    });
  }

  const nextRankingPage = async () => {
    setCurrentPage(prevPage => {
      const newPage = prevPage + 1;
      updateRankings(newPage);
      return newPage;
    });
  }
  if (rankings.length === 0) {
    return <></>
  }

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">{orderByScore ? '점수순' : '최신순'}</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setOrderByScore(true)}
            className={`px-3 py-1 rounded-md ${orderByScore ? 'bg-black text-white' : 'bg-gray-200'}`}
          >
            <Trophy className="h-4 w-4"/>
          </button>
          <button
            onClick={() => setOrderByScore(false)}
            className={`px-3 py-1 rounded-md ${!orderByScore ? 'bg-black text-white' : 'bg-gray-200'}`}
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
      <div className="mt-6 flex justify-center items-center space-x-4">
        <button
          onClick={() => prevRankingPage()}
          disabled={currentPage === 1}
          className="p-2 rounded-full bg-gray-200 disabled:opacity-50"
          aria-label="이전 페이지"
        >
          <ChevronLeft className="h-5 w-5"/>
        </button>
        <span className="text-sm">
              페이지 {currentPage}
            </span>
        <button
          onClick={() => nextRankingPage()}
          className="p-2 rounded-full bg-gray-200 disabled:opacity-50"
          aria-label="다음 페이지"
        >
          <ChevronRight className="h-5 w-5"/>
        </button>
      </div>
    </div>
  )
}