-- Create member tier enum
CREATE TYPE member_tier AS ENUM ('explorer', 'core', 'elite', 'inner_circle');

-- Add member_tier to profiles table
ALTER TABLE public.profiles 
ADD COLUMN member_tier member_tier DEFAULT 'explorer'::member_tier,
ADD COLUMN member_since timestamp with time zone DEFAULT now(),
ADD COLUMN is_trusted boolean DEFAULT false,
ADD COLUMN attendance_rate numeric DEFAULT 100,
ADD COLUMN sessions_as_host integer DEFAULT 0,
ADD COLUMN no_shows integer DEFAULT 0;

-- Create function to calculate and update member tier based on activity
CREATE OR REPLACE FUNCTION public.calculate_member_tier(
  p_total_points integer,
  p_sessions_attended integer,
  p_sessions_hosted integer,
  p_attendance_rate numeric,
  p_is_trusted boolean
)
RETURNS member_tier
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Inner Circle: 500+ points, 50+ sessions, 10+ hosted, 95%+ attendance, trusted
  IF p_total_points >= 500 AND p_sessions_attended >= 50 AND p_sessions_hosted >= 10 
     AND p_attendance_rate >= 95 AND p_is_trusted = true THEN
    RETURN 'inner_circle'::member_tier;
  -- Elite: 200+ points, 25+ sessions, 5+ hosted, 90%+ attendance
  ELSIF p_total_points >= 200 AND p_sessions_attended >= 25 AND p_sessions_hosted >= 5 
        AND p_attendance_rate >= 90 THEN
    RETURN 'elite'::member_tier;
  -- Core: 50+ points, 10+ sessions, 80%+ attendance
  ELSIF p_total_points >= 50 AND p_sessions_attended >= 10 AND p_attendance_rate >= 80 THEN
    RETURN 'core'::member_tier;
  -- Explorer: Default tier for new members
  ELSE
    RETURN 'explorer'::member_tier;
  END IF;
END;
$$;