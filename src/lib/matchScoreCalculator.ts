export interface ProfileMatchData {
  energyStyle?: string | null;
  cryptoFocus?: string[] | null;
  city?: string | null;
  skillLevel?: number | null;
}

export interface MatchResult {
  score: number;
  reasons: MatchReason[];
}

export interface MatchReason {
  type: "energy" | "crypto" | "location" | "skill";
  text: string;
  weight: number;
}

const WEIGHTS = {
  energy: 40,
  crypto: 35,
  location: 15,
  skill: 10,
};

/**
 * Calculate match score between two profiles
 */
export function calculateMatchScore(
  userProfile: ProfileMatchData,
  candidateProfile: ProfileMatchData
): MatchResult {
  const reasons: MatchReason[] = [];
  let totalScore = 0;

  // Energy Style alignment (40%)
  if (userProfile.energyStyle && candidateProfile.energyStyle) {
    if (userProfile.energyStyle === candidateProfile.energyStyle) {
      totalScore += WEIGHTS.energy;
      reasons.push({
        type: "energy",
        text: `Both prefer ${formatEnergyStyle(userProfile.energyStyle)} energy`,
        weight: WEIGHTS.energy,
      });
    } else if (areComplementaryEnergies(userProfile.energyStyle, candidateProfile.energyStyle)) {
      // Complementary energies get partial score
      const partialScore = WEIGHTS.energy * 0.6;
      totalScore += partialScore;
      reasons.push({
        type: "energy",
        text: `Complementary energy: ${formatEnergyStyle(userProfile.energyStyle)} & ${formatEnergyStyle(candidateProfile.energyStyle)}`,
        weight: partialScore,
      });
    }
  }

  // Crypto Focus overlap (35%)
  if (userProfile.cryptoFocus?.length && candidateProfile.cryptoFocus?.length) {
    const userSet = new Set(userProfile.cryptoFocus.map((f) => f.toLowerCase()));
    const candidateSet = new Set(candidateProfile.cryptoFocus.map((f) => f.toLowerCase()));
    const overlap = [...userSet].filter((f) => candidateSet.has(f));

    if (overlap.length > 0) {
      const overlapRatio = overlap.length / Math.max(userSet.size, candidateSet.size);
      const cryptoScore = WEIGHTS.crypto * overlapRatio;
      totalScore += cryptoScore;
      reasons.push({
        type: "crypto",
        text: `Shared interests: ${overlap.slice(0, 3).map(capitalize).join(", ")}`,
        weight: cryptoScore,
      });
    }
  }

  // Location proximity (15%)
  if (userProfile.city && candidateProfile.city) {
    if (userProfile.city.toLowerCase() === candidateProfile.city.toLowerCase()) {
      totalScore += WEIGHTS.location;
      reasons.push({
        type: "location",
        text: `Both based in ${capitalize(userProfile.city)}`,
        weight: WEIGHTS.location,
      });
    }
  }

  // Skill level compatibility (10%)
  if (userProfile.skillLevel && candidateProfile.skillLevel) {
    const diff = Math.abs(userProfile.skillLevel - candidateProfile.skillLevel);
    if (diff <= 1) {
      totalScore += WEIGHTS.skill;
      reasons.push({
        type: "skill",
        text: "Similar skill levels for balanced competition",
        weight: WEIGHTS.skill,
      });
    } else if (diff === 2) {
      const partialScore = WEIGHTS.skill * 0.5;
      totalScore += partialScore;
      reasons.push({
        type: "skill",
        text: "Compatible skill range for growth",
        weight: partialScore,
      });
    }
  }

  return {
    score: Math.round(totalScore),
    reasons: reasons.sort((a, b) => b.weight - a.weight),
  };
}

/**
 * Find top matches from a list of candidates
 */
export function findTopMatches(
  userProfile: ProfileMatchData,
  candidates: (ProfileMatchData & { id: string; name: string })[]
): (ProfileMatchData & { id: string; name: string; matchScore: number; matchReasons: MatchReason[] })[] {
  return candidates
    .map((candidate) => {
      const { score, reasons } = calculateMatchScore(userProfile, candidate);
      return {
        ...candidate,
        matchScore: score,
        matchReasons: reasons,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}

// Helper functions
function formatEnergyStyle(style: string): string {
  const styles: Record<string, string> = {
    competitive: "Competitive",
    social: "Social",
    strategic: "Strategic",
    learning: "Learning",
  };
  return styles[style.toLowerCase()] || capitalize(style);
}

function areComplementaryEnergies(a: string, b: string): boolean {
  const complementary: Record<string, string[]> = {
    competitive: ["strategic"],
    social: ["learning"],
    strategic: ["competitive"],
    learning: ["social"],
  };
  return complementary[a.toLowerCase()]?.includes(b.toLowerCase()) || false;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
