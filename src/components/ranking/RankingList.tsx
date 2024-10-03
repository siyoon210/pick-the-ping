"use client";

import React, {useEffect, useState} from "react";
import {ChevronLeft, ChevronRight, Clock, Trophy, CalendarDays} from "lucide-react";
import {timeoutPromise} from "@/utils/timeout";
import {RANKING_LOADING_MIN_MS} from "@/constants/ranking_constant";

type RankingListProps = {
  initialRankings: Ranking[];
  initialPage: number;
  initialOrderByScore: boolean;
  pageSize: number;
};

export default function RankingList({initialRankings, initialPage, pageSize, initialOrderByScore}: RankingListProps) {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [orderByScore, setOrderByScore] = useState(initialOrderByScore)
  const [rankings, setRankings] = useState<Ranking[]>(initialRankings)
  const [loading, setLoading] = useState(false)
  const [nextPageAvailable, setNextPageAvailable] = useState(true)

  const fetchRankings = async (page: number): Promise<Ranking[]> => {
    try {
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

  const updateRankings = async (newPage: number) => {
    setLoading(true);
    Promise.all([fetchRankings(newPage), timeoutPromise(RANKING_LOADING_MIN_MS)]).then(([rankings]) => {
      if (rankings.length > 0) {
        setRankings(rankings);
        setNextPageAvailable(true)
        setCurrentPage(newPage)
      } else {
        setNextPageAvailable(false)
      }
      setLoading(false);
    });
  }

  const prevRankingPage = async () => {
    const newPage = currentPage - 1;
    updateRankings(newPage);
  }

  const nextRankingPage = async () => {
    const newPage = currentPage + 1;
    updateRankings(newPage);
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const currentYear = new Date().getFullYear();
    const targetYear = date.getFullYear();

    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Seoul'
    };

    // 연도가 다를 때만 year 옵션 추가
    if (currentYear !== targetYear) {
      options.year = 'numeric';
    }

    return date.toLocaleDateString('ko-KR', options);
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400 mx-auto"></div>
        <p className="mt-4 text-gray-600">불러오는 중...</p>
      </div>
    )
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
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <CalendarDays className="h-3 w-3 mr-1"/>
              {formatDate(entry.createdAt)}
            </div>
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
          disabled={!nextPageAvailable}
          className="p-2 rounded-full bg-gray-200 disabled:opacity-50"
          aria-label="다음 페이지"
        >
          <ChevronRight className="h-5 w-5"/>
        </button>
      </div>
    </div>
  )
}