

# CHAINPLAY Feature Enhancement Plan

## Overview
This plan covers 5 major feature areas that enhance the reputation system, session creation, matchmaking intelligence, lessons feed, and global UI polish. All changes follow the existing obsidian black and champagne gold theme with glassmorphism.

---

## 1. Profile and Reputation Logic Enhancement

### What We're Building
- **Trust Score** (0-100): A composite metric visible on profiles
- **Reputation Tier** (Member, Pioneer, Catalyst): Progression-based status
- **Soulbound Badges**: Non-transferable achievement badges
  - "Early Bird" - First 100 members or sessions before 7 AM
  - "Deal Maker" - Hosted 5+ sessions
  - "Alpha Sharer" - Shared 10+ public lessons

### Database Changes
Add columns to the existing `profiles` table:
- `trust_score` (integer, default 50)
- `reputation_tier` (new enum: member, pioneer, catalyst)

Create a database function to calculate trust score based on:
- Attendance rate contribution
- Sessions hosted contribution  
- Lessons shared contribution
- Feedback received

Insert new badge records in the existing `badges` table:
- "Early Bird", "Deal Maker", "Alpha Sharer" with appropriate icons and descriptions

### UI Components
- New `TrustScoreIndicator` component with animated circular progress
- New `ReputationTierBadge` component following existing badge patterns
- Updated `Profile.tsx` page showing trust score prominently and soulbound badges section

---

## 2. Session Intent Tags

### What We're Building
- Multi-select field on `/create-session` for Session Intent
- Intent options: #Fundraising, #Hiring, #AlphaOnly, #SocialNetworking
- Filter capability on the home/discover feed

### Database Changes
Add column to `sessions` table:
- `session_intent` (text array, nullable)

Create enum type:
- `session_intent_type`: fundraising, hiring, alpha_only, social_networking

### UI Components
- New `SessionIntentSelector` multi-select component for Create Session form
- New `SessionIntentBadge` component for displaying intent tags
- Enhanced `QuickFilters` component with intent filter pills
- Updated `SessionCard` to display intent badges

---

## 3. Matchmaking Intelligence Upgrade

### What We're Building
- Dual-axis matching: Energy Style + Crypto Focus alignment
- "Top Match" highlight card explaining connection reasoning
- Match score calculation based on weighted factors

### Implementation
- New `MatchScoreCalculator` utility for computing compatibility
- Match factors:
  - Energy Style alignment (40% weight)
  - Crypto Focus overlap (35% weight)
  - Location proximity (15% weight)
  - Skill level compatibility (10% weight)
- New `TopMatchCard` component with detailed "Why you match" explanations

### UI Updates
- Enhanced matchmaking page with featured "Top Match" section
- Match reason cards showing specific alignment points
- Visual indicators for Energy Style and Crypto Focus compatibility

---

## 4. Community Lessons Intelligence

### What We're Building
- Sport tagging on lessons (linking to the session's sport)
- "Trending Alpha" sidebar showing popular crypto tags from the last 7 days

### Database Changes
Add column to `session_reflections` table:
- `sport_tag` (sport_type enum, nullable)

### UI Components
- Sport tag selector in `PostSessionRitual` component
- `TrendingAlphaSidebar` component showing aggregated crypto mentions
- Sport filter chips on the Lessons page
- Updated `LessonCard` with sport badge display

---

## 5. Global UI Polish

### What We're Building
- Consistent glassmorphism across all new components
- Sticky "Create Session" FAB (floating action button) on mobile
- Theme consistency verification

### Implementation
- Update `CreateSessionButton` to be properly sticky with z-index handling
- Ensure it navigates to `/create-session` on click
- Add safe-area padding for mobile devices
- Apply existing design tokens consistently:
  - `glass-card` class for containers
  - `bg-gradient-gold` for accent elements
  - `shadow-gold` for elevated states

---

## Technical Implementation Details

### Database Migration (Single Migration)

```text
+----------------------------------------+
|          DATABASE CHANGES              |
+----------------------------------------+
| profiles table:                        |
|   + trust_score (int, default 50)      |
|   + reputation_tier (enum)             |
+----------------------------------------+
| sessions table:                        |
|   + session_intent (text[])            |
+----------------------------------------+
| session_reflections table:             |
|   + sport_tag (sport_type enum)        |
+----------------------------------------+
| New enum:                              |
|   reputation_tier_type                 |
+----------------------------------------+
| badges table: (data insert)            |
|   + Early Bird badge                   |
|   + Deal Maker badge                   |
|   + Alpha Sharer badge                 |
+----------------------------------------+
```

### New Components to Create

1. **src/components/TrustScoreIndicator.tsx** - Circular score display
2. **src/components/ReputationTierBadge.tsx** - Tier badge component
3. **src/components/SessionIntentSelector.tsx** - Multi-select for intents
4. **src/components/SessionIntentBadge.tsx** - Intent display badge
5. **src/components/TopMatchCard.tsx** - Featured match with reasoning
6. **src/components/TrendingAlphaSidebar.tsx** - Trending crypto tags
7. **src/lib/matchScoreCalculator.ts** - Match scoring utility

### Files to Modify

1. **src/pages/Profile.tsx** - Add trust score, reputation tier, soulbound badges
2. **src/pages/CreateSession.tsx** - Add session intent multi-select
3. **src/pages/Matchmaking.tsx** - Add top match card, enhanced matching display
4. **src/pages/Lessons.tsx** - Add sport filters, trending sidebar
5. **src/pages/Index.tsx** - Add intent filters to QuickFilters
6. **src/components/CreateSessionButton.tsx** - Make sticky, add navigation
7. **src/components/QuickFilters.tsx** - Add intent filter options
8. **src/components/SessionCard.tsx** - Display session intent badges
9. **src/components/LessonCard.tsx** - Display sport tags
10. **src/components/PostSessionRitual.tsx** - Add sport tag selection

### RLS Policies
No new RLS policies needed - using existing patterns:
- Profiles are viewable by everyone (existing)
- Sessions are viewable by everyone (existing)
- Session reflections public lessons are viewable by everyone (existing)

---

## Implementation Order

1. **Database migration** - Add all schema changes in one migration
2. **New badge components** - Trust Score, Reputation Tier, Session Intent badges
3. **Profile page updates** - Display new reputation elements
4. **Create Session updates** - Add intent selector
5. **Session Card updates** - Display intents
6. **QuickFilters updates** - Add intent filtering
7. **Matchmaking enhancements** - Top Match card, scoring logic
8. **Lessons enhancements** - Sport tags, trending sidebar
9. **Create Session Button** - Make sticky with navigation
10. **Final polish** - Theme consistency check

---

## Risk Mitigation

- **No changes to Auth schema** - All changes are additive to existing tables
- **Backward compatible** - All new columns have sensible defaults
- **Existing RLS preserved** - Leveraging current security policies
- **Incremental rollout** - Components can be added independently

