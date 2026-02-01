-- Add attendance tracking columns to session_participants
ALTER TABLE public.session_participants 
ADD COLUMN IF NOT EXISTS attended boolean DEFAULT NULL,
ADD COLUMN IF NOT EXISTS marked_at timestamp with time zone DEFAULT NULL;

-- Create index for faster attendance queries
CREATE INDEX IF NOT EXISTS idx_session_participants_attended 
ON public.session_participants(session_id, attended);

-- Add RLS policy for hosts to update attendance
CREATE POLICY "Hosts can update attendance" 
ON public.session_participants 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.sessions 
    WHERE sessions.id = session_participants.session_id 
    AND sessions.host_id = auth.uid()
  )
);

-- Create trigger function to recalculate trust score when attendance is marked
CREATE OR REPLACE FUNCTION public.recalculate_trust_score_on_attendance()
RETURNS TRIGGER AS $$
DECLARE
  v_attendance_rate numeric;
  v_sessions_hosted integer;
  v_lessons_shared integer;
  v_new_trust_score integer;
BEGIN
  -- Only process when attended is set to false (no-show)
  IF NEW.attended = false AND (OLD.attended IS NULL OR OLD.attended = true) THEN
    -- Increment no_shows counter
    UPDATE public.profiles 
    SET no_shows = COALESCE(no_shows, 0) + 1
    WHERE user_id = NEW.user_id;
  END IF;
  
  -- Recalculate attendance rate for the user
  SELECT 
    CASE 
      WHEN COUNT(*) = 0 THEN 100
      ELSE (COUNT(*) FILTER (WHERE attended = true)::numeric / COUNT(*) FILTER (WHERE attended IS NOT NULL)::numeric) * 100
    END
  INTO v_attendance_rate
  FROM public.session_participants
  WHERE user_id = NEW.user_id AND attended IS NOT NULL;
  
  -- Get sessions hosted count
  SELECT COALESCE(sessions_as_host, 0) INTO v_sessions_hosted
  FROM public.profiles WHERE user_id = NEW.user_id;
  
  -- Get lessons shared count
  SELECT COUNT(*) INTO v_lessons_shared
  FROM public.session_reflections 
  WHERE user_id = NEW.user_id AND lesson_is_public = true;
  
  -- Calculate new trust score (using existing function logic)
  v_new_trust_score := public.calculate_trust_score(
    COALESCE(v_attendance_rate, 100),
    COALESCE(v_sessions_hosted, 0),
    COALESCE(v_lessons_shared, 0),
    50 -- default feedback score
  );
  
  -- Update profile with new values
  UPDATE public.profiles 
  SET 
    attendance_rate = COALESCE(v_attendance_rate, 100),
    trust_score = v_new_trust_score,
    updated_at = now()
  WHERE user_id = NEW.user_id;
  
  -- Set marked_at timestamp
  NEW.marked_at = now();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger
DROP TRIGGER IF EXISTS trigger_recalculate_trust_score ON public.session_participants;
CREATE TRIGGER trigger_recalculate_trust_score
BEFORE UPDATE OF attended ON public.session_participants
FOR EACH ROW
EXECUTE FUNCTION public.recalculate_trust_score_on_attendance();