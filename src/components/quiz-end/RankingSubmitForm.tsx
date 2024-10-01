"use client";

import React, {useState} from "react";
import {useRouter} from 'next/navigation';
import {Loader2} from 'lucide-react'
import {MESSAGE_INPUT_LENGTH, NAME_INPUT_LENGTH} from "@/constants/ranking_constant";

type ResultSubmitFormProps = {
  quizToken: string;
};

export default function RankingSubmitForm({quizToken}: ResultSubmitFormProps) {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    sendPostRequest()
  }

  const sendPostRequest = () => {
    fetch('/api/ranking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quizToken,
        name,
        message,
      }),
    }).then(() => {
      console.log('submit success')
    }).catch((error) => {
      console.error('Error:', error)
    }).finally(() => {
      setIsSubmitting(false)
      router.push('/ranking')
    })
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          이름
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          maxLength={NAME_INPUT_LENGTH}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          메시지
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          maxLength={MESSAGE_INPUT_LENGTH}
          rows={2}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-primary/80 transition-colors"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex justify-center items-center h-6">
            <Loader2 className="animate-spin h-5 w-5"/>
          </div>
        ) : (
          '등록하기'
        )}
      </button>
    </form>)
}