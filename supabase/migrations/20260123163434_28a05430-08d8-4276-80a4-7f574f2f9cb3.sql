-- Add yoga and pilates to the sport_type enum
ALTER TYPE sport_type ADD VALUE IF NOT EXISTS 'yoga';
ALTER TYPE sport_type ADD VALUE IF NOT EXISTS 'pilates';