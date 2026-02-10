import {
  Correlations,
  CorrelationResult,
  DevolutivaData,
  DominantProfile,
  DISCProfile,
} from '@/types/devolutiva';

/**
 * CorrelationService
 * Analyzes correlations between DISC profile and other dimensions:
 * - DISC ↔ Career Anchors
 * - DISC ↔ Strengths
 * - DISC ↔ Appreciation Languages
 */
export class CorrelationService {
  /**
   * Generate complete correlation analysis
   */
  static generateCompleteInsights(devolutivaData: DevolutivaData): Correlations {
    return {
      discWithAnchors: this.correlateDiscWithAnchors(
        devolutivaData.discProfile,
        devolutivaData.dominantProfile,
      ),
      discWithStrengths: this.correlateDiscWithStrengths(
        devolutivaData.discProfile,
        devolutivaData.dominantProfile,
      ),
      discWithLanguages: this.correlateDiscWithLanguages(
        devolutivaData.discProfile,
        devolutivaData.dominantProfile,
      ),
    };
  }

  /**
   * Correlate DISC profile with Career Anchors
   * Shows alignment between behavioral style and career motivations
   */
  static correlateDiscWithAnchors(
    profile: DISCProfile,
    dominantProfile: DominantProfile,
  ): CorrelationResult[] {
    const correlations: CorrelationResult[] = [];

    // D (Dominância) correlations
    correlations.push({
      metric: 'D Profile → Entrepreneurial Anchor',
      score: profile.d > 60 ? 0.9 : profile.d > 40 ? 0.7 : 0.4,
      insights: [
        'Your dominância drives entrepreneurial spirit',
        'Natural fit for roles requiring risk-taking and innovation',
        'Challenge: May struggle with conformity in structured roles',
      ],
    });

    // I (Influência) correlations
    correlations.push({
      metric: 'I Profile → Service/Helping Anchor',
      score: profile.i > 60 ? 0.85 : profile.i > 40 ? 0.65 : 0.35,
      insights: [
        'Your influência supports helping and connecting with others',
        'Natural fit for client-facing or team-centric roles',
        'Challenge: May avoid purely technical or solitary work',
      ],
    });

    // S (Estabilidade) correlations
    correlations.push({
      metric: 'S Profile → Security/Lifestyle Anchor',
      score: profile.s > 60 ? 0.9 : profile.s > 40 ? 0.7 : 0.4,
      insights: [
        'Your estabilidade values steady growth and work-life balance',
        'Natural fit for organizations with clear expectations',
        'Challenge: May resist rapid change or high-risk ventures',
      ],
    });

    // C (Conformidade) correlations
    correlations.push({
      metric: 'C Profile → Technical/Expertise Anchor',
      score: profile.c > 60 ? 0.9 : profile.c > 40 ? 0.75 : 0.45,
      insights: [
        'Your conformidade drives expertise and mastery',
        'Natural fit for technical, analytical, or specialist roles',
        'Challenge: May become too narrowly focused on expertise',
      ],
    });

    // Overall anchor fit
    const avgAnchorScore =
      (profile.d > 60 ? 0.9 : profile.d > 40 ? 0.7 : 0.4) +
      (profile.i > 60 ? 0.85 : profile.i > 40 ? 0.65 : 0.35) +
      (profile.s > 60 ? 0.9 : profile.s > 40 ? 0.7 : 0.4) +
      (profile.c > 60 ? 0.9 : profile.c > 40 ? 0.75 : 0.45);

    correlations.push({
      metric: 'Overall Anchor Alignment',
      score: Math.round((avgAnchorScore / 4) * 100) / 100,
      insights: [
        this.getAnchorAlignmentInsight(dominantProfile),
        'Look for roles that allow you to express your natural style',
        'Consider hybrid roles that balance your multiple strengths',
      ],
    });

    return correlations;
  }

  /**
   * Correlate DISC profile with Strengths
   * Shows which competencies are strengthened by your behavioral style
   */
  static correlateDiscWithStrengths(
    profile: DISCProfile,
    dominantProfile: DominantProfile,
  ): CorrelationResult[] {
    const correlations: CorrelationResult[] = [];

    // Leadership strengths
    correlations.push({
      metric: 'Leadership Competency',
      score: (profile.d * 0.6 + profile.i * 0.3 + profile.s * 0.05 + profile.c * 0.05) / 100,
      insights: [
        'Your profile naturally supports leadership capabilities',
        `${dominantProfile} profiles typically excel at: ${this.getLeadershipStrengths(dominantProfile)}`,
        'Development focus: Balance your natural style with complementary approaches',
      ],
    });

    // Communication strengths
    correlations.push({
      metric: 'Communication Competency',
      score: (profile.i * 0.5 + profile.d * 0.2 + profile.s * 0.2 + profile.c * 0.1) / 100,
      insights: [
        'Your influência and interaction style create communication strengths',
        `${dominantProfile} communicates by: ${this.getCommunicationStyle(dominantProfile)}`,
        'Challenge: Adapt your style to different audiences',
      ],
    });

    // Problem-solving strengths
    correlations.push({
      metric: 'Problem-Solving Competency',
      score: (profile.c * 0.5 + profile.d * 0.3 + profile.i * 0.1 + profile.s * 0.1) / 100,
      insights: [
        'Your analytical approach supports systematic problem-solving',
        `${dominantProfile} solves problems by: ${this.getProblemSolvingApproach(dominantProfile)}`,
        'Strength: Combine your analysis with team input for best results',
      ],
    });

    // Teamwork strengths
    correlations.push({
      metric: 'Teamwork Competency',
      score: (profile.i * 0.4 + profile.s * 0.4 + profile.c * 0.1 + profile.d * 0.1) / 100,
      insights: [
        'Your collaboration capacity depends on your I and S scores',
        `${dominantProfile} contributes to teams by: ${this.getTeamContribution(dominantProfile)}`,
        'Development: Strengthen appreciation for diverse team roles',
      ],
    });

    return correlations;
  }

  /**
   * Correlate DISC profile with Appreciation Languages
   * Shows how your behavioral style prefers to receive recognition
   */
  static correlateDiscWithLanguages(
    profile: DISCProfile,
    dominantProfile: DominantProfile,
  ): CorrelationResult[] {
    const correlations: CorrelationResult[] = [];

    // Recognition preferences
    correlations.push({
      metric: 'Recognition Language Preference',
      score: this.getRecognitionScore(profile),
      insights: [
        'How you prefer to be recognized and appreciated',
        `${dominantProfile} prefers: ${this.getRecognitionPreference(dominantProfile)}`,
        'Share these preferences with manager and colleagues',
      ],
    });

    // Quality time preferences
    correlations.push({
      metric: 'Quality Time Preference',
      score: this.getQualityTimeScore(profile),
      insights: [
        'How you prefer to spend meaningful time with others',
        `${dominantProfile} prefers: ${this.getQualityTimePreference(dominantProfile)}`,
        'Challenge: Balance your time preferences with team needs',
      ],
    });

    // Tangible reward preferences
    correlations.push({
      metric: 'Tangible Reward Preference',
      score: this.getTangibleRewardScore(profile),
      insights: [
        'How motivated you are by concrete rewards and benefits',
        `${dominantProfile} is motivated by: ${this.getTangibleRewardMotivation(dominantProfile)}`,
        'Consider how to align rewards with your values',
      ],
    });

    // Support and empathy preferences
    correlations.push({
      metric: 'Emotional Support Preference',
      score: this.getEmotionalSupportScore(profile),
      insights: [
        'How much emotional support and empathy you need',
        `${dominantProfile} values: ${this.getEmotionalSupportValue(dominantProfile)}`,
        'Be explicit about your support needs with your team',
      ],
    });

    // Growth opportunity preferences
    correlations.push({
      metric: 'Growth Opportunity Preference',
      score: this.getGrowthOpportunityScore(profile),
      insights: [
        'How motivated you are by learning and development',
        `${dominantProfile} grows through: ${this.getGrowthOpportunitiesPreference(dominantProfile)}`,
        'Seek roles that provide continuous learning aligned with your style',
      ],
    });

    return correlations;
  }

  /**
   * Generate actionable insights from all correlations
   */
  static generateCorrelationSummary(correlations: Correlations): string {
    let summary = '# Correlation Analysis Summary\n\n';

    summary += '## DISC ↔ Career Anchors\n';
    correlations.discWithAnchors.forEach((corr) => {
      summary += `**${corr.metric}**: ${(corr.score * 100).toFixed(0)}%\n`;
      corr.insights.forEach((insight) => {
        summary += `- ${insight}\n`;
      });
    });
    summary += '\n';

    summary += '## DISC ↔ Strengths\n';
    correlations.discWithStrengths.forEach((corr) => {
      summary += `**${corr.metric}**: ${(corr.score * 100).toFixed(0)}%\n`;
      corr.insights.forEach((insight) => {
        summary += `- ${insight}\n`;
      });
    });
    summary += '\n';

    summary += '## DISC ↔ Appreciation Languages\n';
    correlations.discWithLanguages.forEach((corr) => {
      summary += `**${corr.metric}**: ${(corr.score * 100).toFixed(0)}%\n`;
      corr.insights.forEach((insight) => {
        summary += `- ${insight}\n`;
      });
    });

    return summary;
  }

  // ============================================
  // Helper Methods
  // ============================================

  private static getAnchorAlignmentInsight(profile: DominantProfile): string {
    const insights: Record<DominantProfile, string> = {
      D: 'D profile naturally seeks entrepreneurial and challenge-driven roles',
      I: 'I profile naturally seeks people-focused and influencing roles',
      S: 'S profile naturally seeks stability and team-oriented roles',
      C: 'C profile naturally seeks expertise and quality-focused roles',
    };
    return insights[profile];
  }

  private static getLeadershipStrengths(profile: DominantProfile): string {
    const strengths: Record<DominantProfile, string> = {
      D: 'decisive action, bold vision, driving results',
      I: 'inspiring others, creating enthusiasm, building coalitions',
      S: 'supporting team members, steady guidance, loyalty',
      C: 'strategic planning, quality standards, analytical direction',
    };
    return strengths[profile];
  }

  private static getCommunicationStyle(profile: DominantProfile): string {
    const styles: Record<DominantProfile, string> = {
      D: 'direct, concise, results-focused',
      I: 'engaging, enthusiastic, story-driven',
      S: 'gentle, listening-focused, supportive',
      C: 'precise, detailed, data-driven',
    };
    return styles[profile];
  }

  private static getProblemSolvingApproach(profile: DominantProfile): string {
    const approaches: Record<DominantProfile, string> = {
      D: 'quick decision-making, cutting through complexity',
      I: 'involving others, collaborative brainstorming',
      S: 'step-by-step analysis, risk-minimization',
      C: 'thorough investigation, systematic evaluation',
    };
    return approaches[profile];
  }

  private static getTeamContribution(profile: DominantProfile): string {
    const contributions: Record<DominantProfile, string> = {
      D: 'driving progress and challenging status quo',
      I: 'creating energy and connecting people',
      S: 'providing stability and supporting teammates',
      C: 'ensuring quality and attention to detail',
    };
    return contributions[profile];
  }

  private static getRecognitionPreference(profile: DominantProfile): string {
    const prefs: Record<DominantProfile, string> = {
      D: 'public recognition of achievements and results',
      I: 'enthusiastic acknowledgment and celebration with others',
      S: 'quiet appreciation and personal thanks',
      C: 'specific feedback on quality and accuracy',
    };
    return prefs[profile];
  }

  private static getRecognitionScore(profile: DISCProfile): number {
    // Higher for D and I (want visible recognition)
    return (profile.d * 0.5 + profile.i * 0.5) / 100;
  }

  private static getQualityTimePreference(profile: DominantProfile): string {
    const prefs: Record<DominantProfile, string> = {
      D: 'active, strategic conversations about goals',
      I: 'social events and group activities',
      S: 'one-on-one connection and support',
      C: 'focused work sessions and intellectual discussion',
    };
    return prefs[profile];
  }

  private static getQualityTimeScore(profile: DISCProfile): number {
    // Higher for I and S (value connection)
    return (profile.i * 0.5 + profile.s * 0.5) / 100;
  }

  private static getTangibleRewardMotivation(profile: DominantProfile): string {
    const motivations: Record<DominantProfile, string> = {
      D: 'bonus, advancement, tangible success markers',
      I: 'benefits that enable experiences with others',
      S: 'stable compensation, job security',
      C: 'fair compensation matching effort and quality',
    };
    return motivations[profile];
  }

  private static getTangibleRewardScore(profile: DISCProfile): number {
    // Higher for D (drives results for reward)
    return profile.d / 100;
  }

  private static getEmotionalSupportValue(profile: DominantProfile): string {
    const values: Record<DominantProfile, string> = {
      D: 'minimal but appreciates direct support',
      I: 'high - emotional connection and encouragement',
      S: 'high - steady reassurance and validation',
      C: 'moderate - prefers practical support',
    };
    return values[profile];
  }

  private static getEmotionalSupportScore(profile: DISCProfile): number {
    // Higher for I and S (need emotional support)
    return Math.max(profile.i, profile.s) / 100;
  }

  private static getGrowthOpportunitiesPreference(profile: DominantProfile): string {
    const prefs: Record<DominantProfile, string> = {
      D: 'challenging projects and leadership roles',
      I: 'people skills and influence development',
      S: 'mastery and deep expertise',
      C: 'technical skills and professional certification',
    };
    return prefs[profile];
  }

  private static getGrowthOpportunityScore(profile: DISCProfile): number {
    // Higher for D and I (seek growth and new challenges)
    return (profile.d * 0.5 + profile.i * 0.5) / 100;
  }

  /**
   * Identify integration opportunities across all dimensions
   */
  static identifyIntegrationOpportunities(devolutivaData: DevolutivaData): string[] {
    const opportunities: string[] = [];
    const profile = devolutivaData.discProfile;

    // Check for high D + high S (rare but powerful combination)
    if (profile.d > 60 && profile.s > 60) {
      opportunities.push(
        'You combine decisive action with stability - ideal for transformational leadership that brings people along',
      );
    }

    // Check for high I + high C (rare but powerful)
    if (profile.i > 60 && profile.c > 60) {
      opportunities.push(
        'You combine influence with accuracy - perfect for roles requiring both persuasion and technical credibility',
      );
    }

    // Check for balanced profile
    if (
      profile.d > 40 &&
      profile.i > 40 &&
      profile.s > 40 &&
      profile.c > 40
    ) {
      opportunities.push(
        'Your balanced profile allows you to adapt across different situations and roles',
      );
    }

    // Career anchor + Strengths alignment
    if (devolutivaData.skills.filter((s) => s.type === 'core').length >= 3) {
      opportunities.push(
        'Multiple core strengths suggest diverse opportunities - focus on roles integrating your top 2-3 strengths',
      );
    }

    return opportunities.length > 0
      ? opportunities
      : [
          'Review your DISC profile and career anchors to identify integration opportunities',
        ];
  }
}
