"use client";

import {useState} from "react";
import {useRouter} from 'next/navigation';

type ResultSubmitFormProps = {
  score: number;
};

export default function RankingSubmitForm({score}: ResultSubmitFormProps) {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendPostRequest()
  }

  const sendPostRequest = () => {
    fetch('/api/ranking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        score,
        name,
        message,
      }),
    }).then((res) => {
      console.log('submit success')
    }).catch((error) => {
      console.error('Error:', error)
    }).finally(() => {
      router.push('/')
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
          rows={2}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-primary/80 transition-colors"
      >
        등록하기
      </button>
    </form>)
}