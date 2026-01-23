-- Create energy style enum for mental/play style
CREATE TYPE energy_style AS ENUM ('competitive', 'social', 'strategic', 'learning');

-- Create availability pattern enum
CREATE TYPE availability_pattern AS ENUM ('early_bird', 'lunch_warrior', 'after_work', 'night_owl', 'weekends', 'flexible');

-- Add new profile depth fields
ALTER TABLE public.profiles
ADD COLUMN crypto_focus text[] DEFAULT '{}',
ADD COLUMN energy_style energy_style DEFAULT 'social'::energy_style,
ADD COLUMN availability availability_pattern[] DEFAULT '{}',
ADD COLUMN looking_for text[] DEFAULT '{}';

-- Create index for crypto focus searches
CREATE INDEX idx_profiles_crypto_focus ON public.profiles USING GIN(crypto_focus);
CREATE INDEX idx_profiles_energy_style ON public.profiles(energy_style);
CREATE INDEX idx_profiles_availability ON public.profiles USING GIN(availability);