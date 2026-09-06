import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(request) {
  try {
    const { user_id } = await request.json();

    // 1. ดึงข้อมูลแนวหนังที่ผู้ใช้ชอบจาก Database
    const { data: prefs } = await supabase
      .from('user_preferences')
      .select('favorite_genres')
      .eq('user_id', user_id)
      .single();

    if (!prefs) {
      return NextResponse.json({ error: 'ไม่พบข้อมูลผู้ใช้' }, { status: 404 });
    }

    // 2. แปลง Array เป็น String เช่น "28,878" (Action, Sci-Fi)
    const genreString = prefs.favorite_genres.join(',');

    // 3. ยิง API ไปที่ TMDB พร้อมแนบเงื่อนไขแนวหนัง
    const tmdbRes = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=${genreString}&sort_by=popularity.desc&language=th-TH`
    );
    const tmdbData = await tmdbRes.json();

    // 4. ส่งผลลัพธ์กลับไปที่หน้าเว็บ
    return NextResponse.json({ recommendations: tmdbData.results });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}