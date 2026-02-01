/*
  # Create Lounge Social Feed Tables

  1. New Tables
    - `lounge_posts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `post_type` (enum: reading, watching, thinking, reacting)
      - `title` (text, required)
      - `content` (text, optional, max context)
      - `link` (text, optional URL)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `lounge_reactions`
      - `id` (uuid, primary key)
      - `post_id` (uuid, foreign key to lounge_posts)
      - `user_id` (uuid, foreign key to auth.users)
      - `reaction_type` (enum: seen, interesting, vibe)
      - `created_at` (timestamp)
    
    - `lounge_threads`
      - `id` (uuid, primary key)
      - `parent_post_id` (uuid, foreign key to lounge_posts)
      - `user_id` (uuid, foreign key to auth.users)
      - `content` (text, required)
      - `created_at` (timestamp)
    
    - `lounge_vibes`
      - `id` (uuid, primary key)
      - `prompt` (text, the vibe question/prompt)
      - `created_at` (timestamp)
      - `scheduled_date` (date, when this vibe should appear)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read all posts
    - Add policies for users to create/update/delete only their own content
    - Add policies for reactions by authenticated users only
*/

CREATE TYPE post_type_enum AS ENUM ('reading', 'watching', 'thinking', 'reacting');
CREATE TYPE reaction_type_enum AS ENUM ('seen', 'interesting', 'vibe');

CREATE TABLE IF NOT EXISTS lounge_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  post_type post_type_enum NOT NULL,
  title text NOT NULL,
  content text,
  link text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS lounge_reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES lounge_posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reaction_type reaction_type_enum NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(post_id, user_id, reaction_type)
);

CREATE TABLE IF NOT EXISTS lounge_threads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_post_id uuid NOT NULL REFERENCES lounge_posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS lounge_vibes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt text NOT NULL,
  created_at timestamptz DEFAULT now(),
  scheduled_date date NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_lounge_posts_user_id ON lounge_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_lounge_posts_created_at ON lounge_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_lounge_posts_type ON lounge_posts(post_type);
CREATE INDEX IF NOT EXISTS idx_lounge_reactions_post_id ON lounge_reactions(post_id);
CREATE INDEX IF NOT EXISTS idx_lounge_reactions_user_id ON lounge_reactions(user_id);
CREATE INDEX IF NOT EXISTS idx_lounge_threads_parent_post_id ON lounge_threads(parent_post_id);
CREATE INDEX IF NOT EXISTS idx_lounge_vibes_scheduled_date ON lounge_vibes(scheduled_date);

-- Enable RLS
ALTER TABLE lounge_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE lounge_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE lounge_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lounge_vibes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for lounge_posts
CREATE POLICY "Anyone can view lounge posts"
  ON lounge_posts
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create lounge posts"
  ON lounge_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own lounge posts"
  ON lounge_posts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own lounge posts"
  ON lounge_posts
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for lounge_reactions
CREATE POLICY "Anyone can view lounge reactions"
  ON lounge_reactions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can add reactions"
  ON lounge_reactions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove own reactions"
  ON lounge_reactions
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for lounge_threads
CREATE POLICY "Anyone can view lounge threads"
  ON lounge_threads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create threads"
  ON lounge_threads
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own threads"
  ON lounge_threads
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for lounge_vibes (read-only for users)
CREATE POLICY "Anyone can view lounge vibes"
  ON lounge_vibes
  FOR SELECT
  TO authenticated
  USING (true);

INSERT INTO lounge_vibes (prompt, scheduled_date) VALUES
  ('What''s your biggest market mistake?', CURRENT_DATE),
  ('What are you reading this weekend?', CURRENT_DATE + 1),
  ('Best trade you never made?', CURRENT_DATE + 2),
  ('What keeps you up at night (crypto-wise)?', CURRENT_DATE + 3),
  ('Hottest take on DeFi right now?', CURRENT_DATE + 4),
  ('What project are you most bullish on?', CURRENT_DATE + 5),
  ('Web3 moment that changed your mind?', CURRENT_DATE + 6);
