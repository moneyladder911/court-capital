-- Create table for post-session reflections and lessons
CREATE TABLE public.session_reflections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES public.sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  
  -- Ratings given to other participants (stored as JSONB array)
  participant_ratings JSONB DEFAULT '[]'::jsonb,
  
  -- Private reflection
  reflection_text TEXT,
  
  -- Public lesson (optional, shareable)
  lesson_text TEXT,
  lesson_is_public BOOLEAN DEFAULT false,
  
  -- Emotional closure - mood after session
  post_mood TEXT CHECK (post_mood IN ('energized', 'challenged', 'inspired', 'tired', 'grateful', 'focused')),
  
  -- Engagement metrics for lessons
  upvotes_count INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Ensure one reflection per user per session
  UNIQUE(session_id, user_id)
);

-- Create table for lesson upvotes
CREATE TABLE public.lesson_upvotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reflection_id UUID REFERENCES public.session_reflections(id) ON DELETE CASCADE NOT NULL,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- One upvote per user per lesson
  UNIQUE(reflection_id, user_id)
);

-- Enable RLS
ALTER TABLE public.session_reflections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_upvotes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for session_reflections
CREATE POLICY "Users can create their own reflections"
ON public.session_reflections
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reflections"
ON public.session_reflections
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can view own reflections"
ON public.session_reflections
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Public lessons are viewable by everyone"
ON public.session_reflections
FOR SELECT
USING (lesson_is_public = true AND lesson_text IS NOT NULL);

-- RLS Policies for lesson_upvotes
CREATE POLICY "Users can upvote lessons"
ON public.lesson_upvotes
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their upvotes"
ON public.lesson_upvotes
FOR DELETE
USING (auth.uid() = user_id);

CREATE POLICY "Upvotes are viewable by everyone"
ON public.lesson_upvotes
FOR SELECT
USING (true);

-- Create indexes for performance
CREATE INDEX idx_reflections_session ON public.session_reflections(session_id);
CREATE INDEX idx_reflections_user ON public.session_reflections(user_id);
CREATE INDEX idx_reflections_public_lessons ON public.session_reflections(lesson_is_public) WHERE lesson_is_public = true;
CREATE INDEX idx_reflections_upvotes ON public.session_reflections(upvotes_count DESC);
CREATE INDEX idx_upvotes_reflection ON public.lesson_upvotes(reflection_id);

-- Trigger to update upvotes_count
CREATE OR REPLACE FUNCTION public.update_lesson_upvotes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.session_reflections 
    SET upvotes_count = upvotes_count + 1 
    WHERE id = NEW.reflection_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.session_reflections 
    SET upvotes_count = upvotes_count - 1 
    WHERE id = OLD.reflection_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_upvotes_count
AFTER INSERT OR DELETE ON public.lesson_upvotes
FOR EACH ROW
EXECUTE FUNCTION public.update_lesson_upvotes_count();

-- Trigger for updated_at
CREATE TRIGGER update_session_reflections_updated_at
BEFORE UPDATE ON public.session_reflections
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();