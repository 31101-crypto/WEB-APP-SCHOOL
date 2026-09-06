'use client';

import { useState } from 'react';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // สมมติว่า User Login แล้ว และนี่คือ ID ของเขา
  const mockUserId = '123e4567-e89b-12d3-a456-426614174000'; 

  const fetchRecommendations = async () => {
    setLoading(true);
    const res = await fetch('/api/recommendations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: mockUserId }),
    });
    
    const data = await res.json();
    setMovies(data.recommendations || []);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">🎬 My Movie Tracker</h1>
        <p className="text-gray-400 mb-8">ค้นหา บันทึก และรับคำแนะนำหนังที่ตรงใจคุณ</p>

        <button 
          onClick={fetchRecommendations}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-all mb-8"
        >
          {loading ? 'กำลังค้นหา...' : '✨ สร้างคำแนะนำหนังสำหรับฉัน'}
        </button>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg truncate">{movie.title}</h3>
                <p className="text-yellow-400 text-sm mt-1">⭐ {movie.vote_average.toFixed(1)} / 10</p>
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-sm py-1 rounded">✅ ดูแล้ว</button>
                  <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-sm py-1 rounded">📌 อยากดู</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}