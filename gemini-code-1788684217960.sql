-- ตารางเก็บความชอบส่วนตัว (ตอนสมัคร)
CREATE TABLE user_preferences (
  user_id UUID PRIMARY KEY,
  favorite_genres INT[] NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ตารางเก็บสถานะหนัง (ดูแล้ว/อยากดู/ให้คะแนน)
CREATE TABLE user_movies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  movie_id INT NOT NULL,
  status VARCHAR(20) NOT NULL, -- 'watched' หรือ 'watchlist'
  rating INT,
  review TEXT,
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, movie_id)
);