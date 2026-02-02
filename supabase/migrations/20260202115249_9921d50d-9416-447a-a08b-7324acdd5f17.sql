-- Create lounge_vibes table for daily prompts
CREATE TABLE public.lounge_vibes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  prompt TEXT NOT NULL,
  scheduled_date DATE NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create lounge_posts table
CREATE TABLE public.lounge_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  post_type TEXT NOT NULL CHECK (post_type IN ('reading', 'watching', 'thinking', 'reacting')),
  title TEXT NOT NULL,
  content TEXT,
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create lounge_threads table for replies
CREATE TABLE public.lounge_threads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_post_id UUID NOT NULL REFERENCES public.lounge_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create lounge_reactions table
CREATE TABLE public.lounge_reactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.lounge_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reaction_type TEXT NOT NULL CHECK (reaction_type IN ('seen', 'interesting', 'vibe')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(post_id, user_id, reaction_type)
);

-- Enable RLS on all tables
ALTER TABLE public.lounge_vibes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lounge_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lounge_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lounge_reactions ENABLE ROW LEVEL SECURITY;

-- Lounge vibes: Anyone can read
CREATE POLICY "Lounge vibes are public" ON public.lounge_vibes FOR SELECT USING (true);

-- Lounge posts: Anyone can read, authenticated can create their own
CREATE POLICY "Anyone can view lounge posts" ON public.lounge_posts FOR SELECT USING (true);
CREATE POLICY "Users can create their own posts" ON public.lounge_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own posts" ON public.lounge_posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own posts" ON public.lounge_posts FOR DELETE USING (auth.uid() = user_id);

-- Lounge threads: Anyone can read, authenticated can create
CREATE POLICY "Anyone can view threads" ON public.lounge_threads FOR SELECT USING (true);
CREATE POLICY "Users can create threads" ON public.lounge_threads FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own threads" ON public.lounge_threads FOR DELETE USING (auth.uid() = user_id);

-- Lounge reactions: Anyone can read, authenticated can manage their own
CREATE POLICY "Anyone can view reactions" ON public.lounge_reactions FOR SELECT USING (true);
CREATE POLICY "Users can add reactions" ON public.lounge_reactions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove their reactions" ON public.lounge_reactions FOR DELETE USING (auth.uid() = user_id);

-- Trigger for updated_at on lounge_posts
CREATE TRIGGER update_lounge_posts_updated_at
BEFORE UPDATE ON public.lounge_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for lounge tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.lounge_posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.lounge_threads;
ALTER PUBLICATION supabase_realtime ADD TABLE public.lounge_reactions;

-- Insert a default vibe for today
INSERT INTO public.lounge_vibes (prompt, scheduled_date)
VALUES ('What''s the most interesting thing you learned this week?', CURRENT_DATE);