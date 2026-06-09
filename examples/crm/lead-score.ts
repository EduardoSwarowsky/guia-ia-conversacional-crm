export interface RelationshipSignals {
  activeSessions: number;
  meaningfulInteractions: number;
  hasRelevantIntent: boolean;
  completedGoal: boolean;
  consentToContact: boolean;
  daysSinceLastInteraction: number;
}

export interface ScoreBreakdown {
  total: number;
  engagement: number;
  intent: number;
  outcome: number;
  consent: number;
  recency: number;
}

export function calculateRelationshipScore(
  signals: RelationshipSignals,
): ScoreBreakdown {
  const engagement = Math.min(
    signals.activeSessions * 4 + signals.meaningfulInteractions * 2,
    30,
  );
  const intent = signals.hasRelevantIntent ? 25 : 0;
  const outcome = signals.completedGoal ? 20 : 0;
  const consent = signals.consentToContact ? 10 : 0;
  const recency =
    signals.daysSinceLastInteraction <= 7
      ? 15
      : signals.daysSinceLastInteraction <= 30
        ? 8
        : 0;

  return {
    engagement,
    intent,
    outcome,
    consent,
    recency,
    total: Math.min(engagement + intent + outcome + consent + recency, 100),
  };
}
