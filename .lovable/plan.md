

# CHAINPLAY Next-Level Enhancement Plan

Based on thorough analysis of your codebase, here are 5 high-impact improvement areas that will elevate the app significantly.

---

## 1. Profile Edit Flow (Currently Missing)

**The Problem**: The Profile page has "Edit Profile" and "Settings" buttons but they don't do anything. Users can't update their crypto focus, energy style, sports, or bio.

**The Solution**: Create a comprehensive Profile Edit experience:
- Edit personal info (name, bio, city, avatar upload)
- Set/update Energy Style (Competitive, Social, Strategic, Learning)
- Configure Crypto Focus areas (DeFi, AI, VC, Trading, etc.)
- Manage sports with skill levels (1-10 slider per sport)
- Set availability patterns (Early Bird, After Work, Weekends, etc.)

**New Files**:
- `src/pages/ProfileEdit.tsx` - Full-page edit experience
- `src/components/EnergyStyleSelector.tsx` - Radio-style selector
- `src/components/CryptoFocusSelector.tsx` - Multi-select chips
- `src/components/SportSkillEditor.tsx` - Add/remove sports with skill sliders
- `src/components/AvailabilitySelector.tsx` - Time pattern picker

---

## 2. Live Database Integration (Critical Gap)

**The Problem**: Most pages use mock data. Sessions, profiles, events, and groups aren't connected to the database, meaning nothing persists.

**The Solution**: Connect key features to real data:
- Home feed shows real sessions from database
- Profile page fetches actual user data
- Create Session saves to database
- Connections page uses real connection requests
- Leaderboard pulls from user_points table

**Key Hooks to Create**:
- `useProfile(userId)` - Fetch/update profile data
- `useSessions(filters)` - Query sessions with intent/sport/location filters
- `useLeaderboard(filter, timeframe)` - Aggregated rankings

---

## 3. No-Show Penalty System (Reputation Enhancement)

**The Problem**: Trust Score exists but there's no mechanism to track attendance or penalize no-shows. The `no_shows` field in profiles isn't being used.

**The Solution**: Implement attendance confirmation flow:
- Host marks attendees after session ends
- No-shows increment `no_shows` counter
- Trust Score recalculates (deducts points for no-shows)
- Reliability percentage affects matching priority
- Repeat offenders get visual warning badges

**Components**:
- `src/components/AttendanceConfirmation.tsx` - Host marks who showed up
- `src/components/NoShowWarning.tsx` - Badge displayed on unreliable profiles
- Database trigger: Auto-recalculate trust_score after attendance update

---

## 4. "Founders Message" Manifesto Page

**The Problem**: The app lacks a landing/vision page that communicates the elite community ethos. New members don't understand the culture.

**The Solution**: Create an inspirational manifesto page:
- Hero section with the CHAINPLAY vision
- Core principles: "We show up", "We connect through action", "We build together"
- How the tier system works (Explorer to Inner Circle)
- Community guidelines and expectations
- Call-to-action to complete profile

**New File**:
- `src/pages/Manifesto.tsx` - Full-page branded experience with animations

---

## 5. Session Confirmation Flow (End-to-End)

**The Problem**: Users can browse sessions but there's no join confirmation, reminders, or post-session flow.

**The Solution**: Complete session lifecycle:
- Join session confirmation dialog with calendar add
- Push notification reminder (uses existing notification hook)
- Session starts: "You're live" banner with participants
- Session ends: Triggers Post-Session Ritual automatically
- Host receives attendance list to confirm

**Components**:
- `src/components/JoinSessionDialog.tsx` - Confirm + add to calendar
- `src/components/SessionReminder.tsx` - 1-hour before notification trigger
- `src/components/ActiveSessionBanner.tsx` - Shows during live session

---

## Technical Details

### Database Changes Needed

```text
+----------------------------------------+
| New Tables / Columns                   |
+----------------------------------------+
| session_participants:                  |
|   + attended (boolean, null until      |
|     host confirms)                     |
|   + marked_at (timestamp)              |
+----------------------------------------+
| profiles:                              |
|   (no new columns - existing fields    |
|   will be properly utilized)           |
+----------------------------------------+
```

### Priority Implementation Order

1. **Profile Edit Flow** - Highest impact, users can't currently set their key attributes
2. **Live Database Integration** - Makes the app functional with real data
3. **Session Confirmation Flow** - Completes the core user journey
4. **No-Show Penalty System** - Enforces community standards
5. **Founders Message Page** - Sets the tone for new members

---

## Files Overview

**New Pages**:
- `src/pages/ProfileEdit.tsx`
- `src/pages/Manifesto.tsx`

**New Components**:
- `src/components/EnergyStyleSelector.tsx`
- `src/components/CryptoFocusSelector.tsx`
- `src/components/SportSkillEditor.tsx`
- `src/components/AvailabilitySelector.tsx`
- `src/components/JoinSessionDialog.tsx`
- `src/components/AttendanceConfirmation.tsx`
- `src/components/NoShowWarning.tsx`

**New Hooks**:
- `src/hooks/useProfile.ts`
- `src/hooks/useSessions.ts`
- `src/hooks/useLeaderboard.ts`
- `src/hooks/useSessionParticipation.ts`

**Modified Files**:
- `src/App.tsx` - Add routes for ProfileEdit, Manifesto
- `src/pages/Profile.tsx` - Wire up Edit button, fetch real data
- `src/pages/Index.tsx` - Connect to real sessions
- `src/components/SessionCard.tsx` - Add join functionality
- `src/pages/Leaderboard.tsx` - Use real aggregated data

---

## Expected Outcome

After implementation:
- Users can fully customize their profiles with energy/crypto preferences
- Home feed shows real, filterable sessions
- Session lifecycle is complete from discovery to post-session ritual
- Reputation system has teeth with no-show penalties
- New members understand the community through the manifesto

