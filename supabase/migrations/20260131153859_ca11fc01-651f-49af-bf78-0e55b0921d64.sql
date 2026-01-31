-- Create reputation tier enum
CREATE TYPE reputation_tier_type AS ENUM ('member', 'pioneer', 'catalyst');

-- Add trust_score and reputation_tier to profiles table
ALTER TABLE public.profiles 
ADD COLUMN trust_score integer DEFAULT 50,
ADD COLUMN reputation_tier reputation_tier_type DEFAULT 'member';

-- Add session_intent to sessions table (text array for flexibility)
ALTER TABLE public.sessions 
ADD COLUMN session_intent text[] DEFAULT '{}';

-- Add sport_tag to session_reflections table
ALTER TABLE public.session_reflections 
ADD COLUMN sport_tag sport_type;

-- Insert soulbound badges into badges table
INSERT INTO public.badges (name, description, icon, category, points_required) VALUES
('Early Bird', 'First 100 members or attended sessions before 7 AM', '🌅', 'soulbound', 0),
('Deal Maker', 'Hosted 5+ sessions bringing the community together', '🤝', 'soulbound', 0),
('Alpha Sharer', 'Shared 10+ public lessons with the community', '💡', 'soulbound', 0);

-- Create function to calculate trust score
CREATE OR REPLACE FUNCTION public.calculate_trust_score(
  p_attendance_rate numeric,
  p_sessions_hosted integer,
  p_lessons_shared integer,
  p_feedback_score numeric
)
RETURNS integer
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  score integer;
BEGIN
  -- Attendance rate contributes 30% (0-30 points)
  score := FLOOR(COALESCE(p_attendance_rate, 50) * 0.3);
  
  -- Sessions hosted contributes 25% (0-25 points, capped at 10 sessions)
  score := score + LEAST(COALESCE(p_sessions_hosted, 0) * 2.5, 25)::integer;
  
  -- Lessons shared contributes 25% (0-25 points, capped at 10 lessons)
  score := score + LEAST(COALESCE(p_lessons_shared, 0) * 2.5, 25)::integer;
  
  -- Feedback score contributes 20% (0-20 points)
  score := score + FLOOR(COALESCE(p_feedback_score, 50) * 0.2);
  
  -- Ensure score is within 0-100 range
  RETURN GREATEST(0, LEAST(100, score));
END;
$function$;

-- Create function to determine reputation tier based on trust score and activity
CREATE OR REPLACE FUNCTION public.get_reputation_tier(
  p_trust_score integer,
  p_sessions_hosted integer,
  p_is_trusted boolean
)
RETURNS reputation_tier_type
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Catalyst: 80+ trust score, 10+ sessions hosted, is_trusted
  IF p_trust_score >= 80 AND p_sessions_hosted >= 10 AND p_is_trusted = true THEN
    RETURN 'catalyst'::reputation_tier_type;
  -- Pioneer: 60+ trust score, 5+ sessions hosted
  ELSIF p_trust_score >= 60 AND p_sessions_hosted >= 5 THEN
    RETURN 'pioneer'::reputation_tier_type;
  -- Member: Default tier
  ELSE
    RETURN 'member'::reputation_tier_type;
  END IF;
END;
$function$;