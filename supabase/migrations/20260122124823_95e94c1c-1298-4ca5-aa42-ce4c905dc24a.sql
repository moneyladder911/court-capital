-- Create enum types
CREATE TYPE public.crypto_role AS ENUM ('founder', 'trader', 'investor', 'vc', 'dev', 'marketer');
CREATE TYPE public.mindset_tag AS ENUM ('builder', 'competitor', 'strategist', 'investor');
CREATE TYPE public.sport_type AS ENUM ('padel', 'tennis', 'golf', 'gym', 'running', 'combat');
CREATE TYPE public.skill_level AS ENUM ('beginner', 'intermediate', 'advanced', 'pro');
CREATE TYPE public.connection_status AS ENUM ('pending', 'accepted', 'rejected');
CREATE TYPE public.event_type AS ENUM ('tournament', 'meetup', 'retreat', 'camp', 'casual');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  name TEXT NOT NULL,
  city TEXT,
  bio TEXT,
  avatar_url TEXT,
  crypto_role public.crypto_role DEFAULT 'founder',
  mindset public.mindset_tag DEFAULT 'builder',
  is_online BOOLEAN DEFAULT false,
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user sports table (many-to-many)
CREATE TABLE public.user_sports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  sport public.sport_type NOT NULL,
  skill_level INTEGER DEFAULT 5 CHECK (skill_level >= 1 AND skill_level <= 10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, sport)
);

-- Create connections table
CREATE TABLE public.connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status public.connection_status DEFAULT 'pending',
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(requester_id, receiver_id)
);

-- Create conversations table
CREATE TABLE public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create conversation participants
CREATE TABLE public.conversation_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  last_read_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(conversation_id, user_id)
);

-- Create messages table
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create sessions table (sport sessions)
CREATE TABLE public.sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  sport public.sport_type NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  max_participants INTEGER DEFAULT 4,
  skill_level public.skill_level DEFAULT 'intermediate',
  crypto_focus TEXT,
  is_live BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create session participants
CREATE TABLE public.session_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.sessions(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(session_id, user_id)
);

-- Create events table
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  event_type public.event_type DEFAULT 'meetup',
  sport public.sport_type,
  location TEXT NOT NULL,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  end_at TIMESTAMP WITH TIME ZONE,
  max_participants INTEGER,
  skill_level public.skill_level,
  is_vip BOOLEAN DEFAULT false,
  price DECIMAL(10, 2),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create event RSVPs
CREATE TABLE public.event_rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'going' CHECK (status IN ('going', 'maybe', 'waitlist')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- Create reputation/feedback table
CREATE TABLE public.feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  giver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  session_id UUID REFERENCES public.sessions(id) ON DELETE SET NULL,
  reliability_score INTEGER CHECK (reliability_score >= 1 AND reliability_score <= 5),
  energy_score INTEGER CHECK (energy_score >= 1 AND energy_score <= 5),
  skill_accuracy BOOLEAN DEFAULT true,
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(giver_id, receiver_id, session_id)
);

-- Create points/gamification table
CREATE TABLE public.user_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  total_points INTEGER DEFAULT 0,
  sessions_attended INTEGER DEFAULT 0,
  sessions_hosted INTEGER DEFAULT 0,
  connections_made INTEGER DEFAULT 0,
  events_attended INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create badges table
CREATE TABLE public.badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  points_required INTEGER DEFAULT 0,
  category TEXT
);

-- Create user badges (earned)
CREATE TABLE public.user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

-- Create groups/communities table
CREATE TABLE public.groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  city TEXT,
  sport public.sport_type,
  image_url TEXT,
  is_private BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create group members
CREATE TABLE public.group_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'moderator', 'member')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(group_id, user_id)
);

-- Insert default badges
INSERT INTO public.badges (name, description, icon, points_required, category) VALUES
  ('First Session', 'Attended your first session', '🎯', 0, 'milestone'),
  ('Reliable Networker', 'Achieved 90%+ reliability', '⭐', 100, 'reputation'),
  ('Session Host', 'Hosted 5 sessions', '🏆', 50, 'hosting'),
  ('Crypto Padel Champion', 'Won a padel tournament', '🥇', 200, 'achievement'),
  ('Founder Circle', 'Connected with 10 founders', '💎', 150, 'networking'),
  ('Early Adopter', 'Joined in the first month', '🚀', 0, 'special'),
  ('Streak Master', 'Maintained 7-day session streak', '🔥', 100, 'engagement'),
  ('VIP Member', 'Unlocked VIP status', '👑', 500, 'tier');

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_sports
CREATE POLICY "User sports viewable by everyone" ON public.user_sports FOR SELECT USING (true);
CREATE POLICY "Users can manage own sports" ON public.user_sports FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for connections
CREATE POLICY "Users can view own connections" ON public.connections FOR SELECT 
  USING (auth.uid() = requester_id OR auth.uid() = receiver_id);
CREATE POLICY "Users can create connection requests" ON public.connections FOR INSERT 
  WITH CHECK (auth.uid() = requester_id);
CREATE POLICY "Users can update connections they're part of" ON public.connections FOR UPDATE 
  USING (auth.uid() = requester_id OR auth.uid() = receiver_id);

-- RLS Policies for conversations
CREATE POLICY "Users can view conversations they're part of" ON public.conversations FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.conversation_participants WHERE conversation_id = id AND user_id = auth.uid()));
CREATE POLICY "Authenticated users can create conversations" ON public.conversations FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

-- RLS Policies for conversation participants
CREATE POLICY "Users can view participants of their conversations" ON public.conversation_participants FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.conversation_participants cp WHERE cp.conversation_id = conversation_id AND cp.user_id = auth.uid()));
CREATE POLICY "Users can add participants" ON public.conversation_participants FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

-- RLS Policies for messages
CREATE POLICY "Users can view messages in their conversations" ON public.messages FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.conversation_participants WHERE conversation_id = messages.conversation_id AND user_id = auth.uid()));
CREATE POLICY "Users can send messages to their conversations" ON public.messages FOR INSERT 
  WITH CHECK (auth.uid() = sender_id AND EXISTS (SELECT 1 FROM public.conversation_participants WHERE conversation_id = messages.conversation_id AND user_id = auth.uid()));

-- RLS Policies for sessions
CREATE POLICY "Sessions are viewable by everyone" ON public.sessions FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create sessions" ON public.sessions FOR INSERT WITH CHECK (auth.uid() = host_id);
CREATE POLICY "Hosts can update own sessions" ON public.sessions FOR UPDATE USING (auth.uid() = host_id);
CREATE POLICY "Hosts can delete own sessions" ON public.sessions FOR DELETE USING (auth.uid() = host_id);

-- RLS Policies for session participants
CREATE POLICY "Session participants viewable by everyone" ON public.session_participants FOR SELECT USING (true);
CREATE POLICY "Authenticated users can join sessions" ON public.session_participants FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can leave sessions" ON public.session_participants FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for events
CREATE POLICY "Events are viewable by everyone" ON public.events FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create events" ON public.events FOR INSERT WITH CHECK (auth.uid() = host_id);
CREATE POLICY "Hosts can update own events" ON public.events FOR UPDATE USING (auth.uid() = host_id);

-- RLS Policies for event RSVPs
CREATE POLICY "RSVPs viewable by everyone" ON public.event_rsvps FOR SELECT USING (true);
CREATE POLICY "Authenticated users can RSVP" ON public.event_rsvps FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own RSVP" ON public.event_rsvps FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can cancel own RSVP" ON public.event_rsvps FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for feedback
CREATE POLICY "Feedback viewable by involved users" ON public.feedback FOR SELECT 
  USING (auth.uid() = giver_id OR auth.uid() = receiver_id);
CREATE POLICY "Users can give feedback" ON public.feedback FOR INSERT WITH CHECK (auth.uid() = giver_id);

-- RLS Policies for user_points
CREATE POLICY "Points viewable by everyone" ON public.user_points FOR SELECT USING (true);
CREATE POLICY "Users can update own points" ON public.user_points FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for badges
CREATE POLICY "Badges viewable by everyone" ON public.badges FOR SELECT USING (true);

-- RLS Policies for user_badges
CREATE POLICY "User badges viewable by everyone" ON public.user_badges FOR SELECT USING (true);
CREATE POLICY "System can award badges" ON public.user_badges FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for groups
CREATE POLICY "Public groups viewable by everyone" ON public.groups FOR SELECT USING (is_private = false OR EXISTS (SELECT 1 FROM public.group_members WHERE group_id = id AND user_id = auth.uid()));
CREATE POLICY "Authenticated users can create groups" ON public.groups FOR INSERT WITH CHECK (auth.uid() = created_by);

-- RLS Policies for group members
CREATE POLICY "Group members viewable by group members" ON public.group_members FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.group_members gm WHERE gm.group_id = group_id AND gm.user_id = auth.uid()) OR EXISTS (SELECT 1 FROM public.groups g WHERE g.id = group_id AND g.is_private = false));
CREATE POLICY "Users can join groups" ON public.group_members FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can leave groups" ON public.group_members FOR DELETE USING (auth.uid() = user_id);

-- Enable realtime for messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_connections_updated_at BEFORE UPDATE ON public.connections FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON public.conversations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_user_points_updated_at BEFORE UPDATE ON public.user_points FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();