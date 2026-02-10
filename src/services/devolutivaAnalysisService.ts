import {
  DevolutivaData,
  DevolutivaSession,
  DevolutivaStep,
  GeneratedContent,
  GeneratedQuestions,
  DISCProfile,
  HealthIndex,
  TowerData,
  SkillsPyramid,
  Skill,
} from '@/types/devolutiva';

/**
 * DevolutivaAnalysisService
 * Orchestrates the complete 15-step devolutiva workflow divided into 4 phases:
 * Phase 1 (Steps 1-4): Rapport & Initial Understanding
 * Phase 2 (Steps 5-8): Behavioral Indices & Health Analysis
 * Phase 3 (Steps 9-12): Identity & Values Discovery
 * Phase 4 (Steps 13-15): Transformation & Action Planning
 */
export class DevolutivaAnalysisService {
  /**
   * Generate complete devolutiva with all 15 steps
   * Main orchestrator that coordinates all phases
   */
  static async generateCompleteDevoluta(devolutivaData: DevolutivaData): Promise<DevolutivaSession> {
    console.log('🚀 Starting complete devolutiva generation...');

    const session: DevolutivaSession = {
      id: devolutivaData.id,
      subjectName: devolutivaData.subjectName,
      steps: [],
      currentStep: 0,
      isComplete: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Phase 1: Rapport & Initial Understanding (Steps 1-4)
    const phase1Steps = this.generatePhase1Rapport(devolutivaData);
    session.steps.push(...phase1Steps);

    // Phase 2: Behavioral Indices & Health Analysis (Steps 5-8)
    const phase2Steps = this.generatePhase2Indices(devolutivaData);
    session.steps.push(...phase2Steps);

    // Phase 3: Identity & Values Discovery (Steps 9-12)
    const phase3Steps = this.generatePhase3Identity(devolutivaData);
    session.steps.push(...phase3Steps);

    // Phase 4: Transformation & Action Planning (Steps 13-15)
    const phase4Steps = this.generatePhase4Transformation(devolutivaData);
    session.steps.push(...phase4Steps);

    session.isComplete = true;
    session.updatedAt = new Date();

    console.log(`✅ Devolutiva generation complete with ${session.steps.length} steps`);
    return session;
  }

  /**
   * Phase 1: Rapport & Initial Understanding (Steps 1-4)
   * Goal: Create psychological safety and introduce core concepts
   */
  private static generatePhase1Rapport(devolutivaData: DevolutivaData): DevolutivaStep[] {
    const steps: DevolutivaStep[] = [];

    // Step 1: Welcome & Context Setting
    steps.push({
      phase: 'rapport',
      stepNumber: 1,
      title: 'Welcome & Journey Overview',
      description:
        'Establish psychological safety and explain the 15-step devolutiva journey',
      content: this.generateWelcomeContent(devolutivaData),
      visualization: 'narrative',
    });

    // Step 2: DISC Profile Overview
    steps.push({
      phase: 'rapport',
      stepNumber: 2,
      title: 'Your DISC Behavioral Profile',
      description: 'Present DISC profile in accessible, empowering language',
      content: this.generateDISCOverviewContent(devolutivaData),
      visualization: 'chart',
    });

    // Step 3: Tower Analysis (Self vs. Environment)
    steps.push({
      phase: 'rapport',
      stepNumber: 3,
      title: 'Self-Perception vs. Environmental Demand',
      description: 'Explain the tower model and gaps between autopercepção and environment',
      content: this.generateTowerAnalysisContent(devolutivaData),
      visualization: 'chart',
    });

    // Step 4: Initial Insights
    steps.push({
      phase: 'rapport',
      stepNumber: 4,
      title: 'Initial Insights & Key Discoveries',
      description: 'Synthesize phase 1 learnings and prepare for deeper analysis',
      content: this.generateInitialInsightsContent(devolutivaData),
      visualization: 'narrative',
    });

    return steps;
  }

  /**
   * Phase 2: Behavioral Indices & Health Analysis (Steps 5-8)
   * Goal: Analyze 9 health indices and assess overall wellbeing
   */
  private static generatePhase2Indices(devolutivaData: DevolutivaData): DevolutivaStep[] {
    const steps: DevolutivaStep[] = [];

    // Step 5: Health Indices Review (9 Índices de Saúde)
    steps.push({
      phase: 'indices',
      stepNumber: 5,
      title: 'Behavioral Health Indices Analysis',
      description: 'Deep dive into 9 health indices with interpretations',
      content: this.generateHealthIndicesContent(devolutivaData),
      visualization: 'chart',
    });

    // Step 6: Burnout Risk Assessment
    steps.push({
      phase: 'indices',
      stepNumber: 6,
      title: 'Burnout Risk & Stress Patterns',
      description: 'Assess burnout risk based on indices and identify stress patterns',
      content: this.generateBurnoutAssessmentContent(devolutivaData),
      visualization: 'chart',
    });

    // Step 7: Strengths & Competencies
    steps.push({
      phase: 'indices',
      stepNumber: 7,
      title: 'Your Key Strengths & Competencies',
      description: 'Identify and celebrate core competencies and strengths',
      content: this.generateStrengthsContent(devolutivaData),
      visualization: 'table',
    });

    // Step 8: Career Anchors Alignment
    steps.push({
      phase: 'indices',
      stepNumber: 8,
      title: 'Career Anchors & Professional Alignment',
      description: 'Connect DISC profile to career anchor alignment',
      content: this.generateAnchorsContent(devolutivaData),
      visualization: 'narrative',
    });

    return steps;
  }

  /**
   * Phase 3: Identity & Values Discovery (Steps 9-12)
   * Goal: Explore identity, values, and internal dynamics
   */
  private static generatePhase3Identity(devolutivaData: DevolutivaData): DevolutivaStep[] {
    const steps: DevolutivaStep[] = [];

    // Step 9: Values Pyramid
    steps.push({
      phase: 'identity',
      stepNumber: 9,
      title: 'Your Values Pyramid',
      description: 'Build and explore your personal values hierarchy',
      content: this.generatePyramidContent(devolutivaData),
      visualization: 'chart',
    });

    // Step 10: Internal War / Conflicting Forces
    steps.push({
      phase: 'identity',
      stepNumber: 10,
      title: 'Internal War: Conflicting Forces',
      description: 'Identify and resolve internal conflicts and contradictions',
      content: this.generateInternalWarContent(devolutivaData),
      visualization: 'narrative',
    });

    // Step 11: Appreciation Languages (Linguagens de Valorização)
    steps.push({
      phase: 'identity',
      stepNumber: 11,
      title: 'Your Appreciation Languages',
      description: 'Understand how you like to be recognized and appreciated',
      content: this.generateLanguagesContent(devolutivaData),
      visualization: 'narrative',
    });

    // Step 12: Identity Summary & Synthesis
    steps.push({
      phase: 'identity',
      stepNumber: 12,
      title: 'Identity Summary & Integrated Self',
      description: 'Synthesize all identity insights into integrated self-understanding',
      content: this.generateIdentitySummaryContent(devolutivaData),
      visualization: 'narrative',
    });

    return steps;
  }

  /**
   * Phase 4: Transformation & Action Planning (Steps 13-15)
   * Goal: Create actionable development plan
   */
  private static generatePhase4Transformation(devolutivaData: DevolutivaData): DevolutivaStep[] {
    const steps: DevolutivaStep[] = [];

    // Step 13: Development Recommendations
    steps.push({
      phase: 'transformation',
      stepNumber: 13,
      title: 'Development Recommendations',
      description: 'Personalized recommendations for growth and development',
      content: this.generateRecommendationsContent(devolutivaData),
      visualization: 'narrative',
    });

    // Step 14: SMART Task Definition
    steps.push({
      phase: 'transformation',
      stepNumber: 14,
      title: 'Your SMART Task & First Action',
      description: 'Define specific, measurable, achievable, relevant, time-bound next step',
      content: this.generateSMARTTaskContent(devolutivaData),
      visualization: 'narrative',
    });

    // Step 15: Action Plan & 90-Day Roadmap
    steps.push({
      phase: 'transformation',
      stepNumber: 15,
      title: 'Action Plan & 90-Day Roadmap',
      description: 'Create comprehensive 90-day action plan for sustainable change',
      content: this.generateActionPlanContent(devolutivaData),
      visualization: 'table',
    });

    return steps;
  }

  // ============================================
  // Content Generation Helpers
  // ============================================

  private static generateWelcomeContent(data: DevolutivaData): string {
    return `
# Welcome to Your Devolutiva Journey, ${data.subjectName}!

This 15-step journey is designed to help you understand yourself more deeply and create meaningful change.

## What to Expect
- **Understanding**: Deep insights into your behavioral patterns and values
- **Clarity**: Clear picture of where you are and where you want to go
- **Action**: Concrete, personalized recommendations for growth

## The 4 Phases
1. **Rapport** (Steps 1-4): Build foundation and introduce key concepts
2. **Indices** (Steps 5-8): Deep analysis of behavioral health and strengths
3. **Identity** (Steps 9-12): Explore your values, identity, and appreciation languages
4. **Transformation** (Steps 13-15): Create actionable development plan

Let's begin this transformative journey together.
`;
  }

  private static generateDISCOverviewContent(data: DevolutivaData): string {
    const profile = data.discProfile;
    const dominant = data.dominantProfile;

    return `
# Your DISC Behavioral Profile

## Profile Scores
- **Dominância (D)**: ${profile.d}% - Drive, assertiveness, results-orientation
- **Influência (I)**: ${profile.i}% - Sociability, optimism, persuasion
- **Estabilidade (S)**: ${profile.s}% - Patience, stability, loyalty
- **Conformidade (C)**: ${profile.c}% - Accuracy, rules, quality

## Your Dominant Profile: ${dominant}

Your primary behavioral style emphasizes:
${this.getProfileInterpretation(dominant, profile)}

## What This Means
Your DISC profile is your natural behavioral lens - how you typically approach situations, make decisions, and interact with others. It's not about limitations, but about understanding your defaults so you can adapt when needed.
`;
  }

  private static generateTowerAnalysisContent(data: DevolutivaData): string {
    return `
# Tower Analysis: Self-Perception vs. Environmental Demand

## The Tower Model
The tower shows the gap between:
- **Autopercepção (Self)**: How you see yourself
- **Demanda do Ambiente (Environment)**: What the environment demands

## Your Towers
${data.towerData
  .map(
    (tower) => `
### ${tower.profile} Profile
- Self-Perception: ${tower.selfPerception}%
- Environmental Demand: ${tower.environmentDemand}%
- Gap: ${Math.abs(tower.selfPerception - tower.environmentDemand)}%
- Direction: ${tower.selfPerception > tower.environmentDemand ? 'Over-adapted to self' : 'Under-adapted to environment'}
`,
  )
  .join('\n')}

## Implications
A large gap suggests stress points where you're either suppressing your natural style or over-expressing it.
`;
  }

  private static generateInitialInsightsContent(data: DevolutivaData): string {
    return `
# Initial Insights from Phase 1

## Key Discoveries
1. Your dominant DISC profile provides your primary behavioral lens
2. The gaps between self-perception and environment reveal adaptation stress points
3. These insights form the foundation for deeper analysis

## What's Next
In the next phase, we'll dive deep into 9 behavioral health indices to understand your overall wellbeing and stress patterns.

## Reflection Questions
- What surprised you about your DISC profile?
- Do the gaps resonate with your experience?
- What would change if you more fully expressed your natural style?
`;
  }

  private static generateHealthIndicesContent(data: DevolutivaData): string {
    return `
# Your 9 Behavioral Health Indices

## Index Overview
${data.healthIndexes
  .map(
    (index) => `
### ${index.name}
- **Value**: ${index.value}
- **Diagnosis**: ${index.diagnosis}
- **Impact**: ${index.impact}
- **Alert**: ${index.isAlert ? '🚨 Requires attention' : '✅ Healthy'}
`,
  )
  .join('\n')}

## Overall Assessment
These nine indices provide a comprehensive view of your behavioral health across different dimensions.
`;
  }

  private static generateBurnoutAssessmentContent(data: DevolutivaData): string {
    return `
# Burnout Risk Assessment

## Your Burnout Risk Level
${data.burnoutRisk ? '🚨 **HIGH RISK** - Immediate attention recommended' : '✅ **LOW RISK** - Healthy patterns detected'}

## Key Factors
Based on your health indices, burnout risk is driven by:
- Stress level (Estabilidade index)
- Recovery capacity (Paciência index)
- Work-life balance indicators
- Support system strength

## Recommendations
${this.generateBurnoutRecommendations(data)}
`;
  }

  private static generateStrengthsContent(data: DevolutivaData): string {
    return `
# Your Key Strengths & Competencies

## Core Strengths
${data.skills
  .filter((s) => s.type === 'core')
  .map((s) => `- **${s.name}**: ${s.proficiency || 'Strong competency'}`)
  .join('\n')}

## Expandable Skills
${data.skills
  .filter((s) => s.type === 'expansion')
  .map((s) => `- **${s.name}**: Growth opportunity`)
  .join('\n')}

## Development Considerations
${data.skills
  .filter((s) => s.type === 'retraction')
  .map((s) => `- **${s.name}**: Opportunity to moderate`)
  .join('\n')}

## Leveraging Your Strengths
The most successful people don't try to fix all weaknesses - they double down on strengths while managing blind spots.
`;
  }

  private static generateAnchorsContent(data: DevolutivaData): string {
    return `
# Career Anchors & Professional Alignment

Your career anchors reveal what truly matters to you professionally.

## How Your DISC Aligns with Career Anchors
- Your ${data.dominantProfile} profile naturally aligns with certain anchor types
- Understanding this alignment helps you make career decisions that feel authentic

## Your Skill Pyramid
### Foundation (Must-Haves)
${data.pyramid.base.map((s) => `- ${s}`).join('\n')}

### Development (Growing Edge)
${data.pyramid.middle.map((s) => `- ${s}`).join('\n')}

### Apex (Unique Contribution)
- ${data.pyramid.top}

## Career Alignment Insight
When your work aligns with your anchors, engagement and satisfaction naturally increase.
`;
  }

  private static generatePyramidContent(data: DevolutivaData): string {
    return `
# Your Values Pyramid

## Foundation (Core Values)
${data.pyramid.base.map((s) => `- ${s}`).join('\n')}

These are non-negotiable core values that define who you are.

## Middle Tier (Important Values)
${data.pyramid.middle.map((s) => `- ${s}`).join('\n')}

These values are important and guide your decisions.

## Apex (Ultimate Value / Purpose)
- **${data.pyramid.top}}**

This is your overarching purpose - the one thing that ties everything together.

## Living Your Pyramid
Alignment occurs when your daily life reflects your pyramid structure.
`;
  }

  private static generateInternalWarContent(data: DevolutivaData): string {
    return `
# Internal War: Conflicting Forces

## Understanding Internal Conflicts
Internal war occurs when different parts of your personality have contradictory needs or values.

## Your Profile's Internal Tensions
Based on your ${data.dominantProfile} profile:
${this.generateInternalConflicts(data.dominantProfile)}

## Integration Strategy
Rather than eliminating conflicts, the goal is integration - honoring all parts of yourself.

## Reflection
- What competing values create tension in your life?
- How can you honor both instead of choosing one?
`;
  }

  private static generateLanguagesContent(data: DevolutivaData): string {
    return `
# Your Appreciation Languages

Everyone has different ways they like to be recognized and appreciated.

## The Five Languages
1. **Recognition** - Public acknowledgment of contributions
2. **Quality Time** - Undivided attention and presence
3. **Tangible Rewards** - Concrete benefits and compensation
4. **Emotional Support** - Empathy and understanding
5. **Growth Opportunities** - Learning and development

## Your Dominant Languages
These are how you most feel valued and appreciated in work and relationships.

## Application
Understanding your appreciation languages helps you:
- Communicate what you need
- Design work environments that engage you
- Build deeper relationships
`;
  }

  private static generateIdentitySummaryContent(data: DevolutivaData): string {
    return `
# Identity Summary: Your Integrated Self

## Integration Across Phases
Through phases 1-3, you've explored:
- Your behavioral patterns (DISC)
- Your health and wellbeing (Indices)
- Your values and identity (Pyramid, Languages, Anchors)

## Your Unique Identity
${data.subjectName}, your integrated self is characterized by:
- **Behavioral Style**: ${data.dominantProfile} profile
- **Core Values**: ${data.pyramid.base.join(', ')}
- **Ultimate Purpose**: ${data.pyramid.top}
- **Key Strengths**: ${data.skills
    .filter((s) => s.type === 'core')
    .slice(0, 3)
    .map((s) => s.name)
    .join(', ')}

## Ready for Transformation
With clear self-understanding, you're now ready to create intentional change aligned with your authentic self.
`;
  }

  private static generateRecommendationsContent(data: DevolutivaData): string {
    return `
# Development Recommendations

## Personalized Growth Areas
Based on your complete assessment, here are priority development areas:

### 1. Leverage Your Natural Strengths
Focus on expanding what you do best. Success begets confidence.

### 2. Address Critical Gaps
These are the weak points that limit your effectiveness:
${data.healthIndexes
  .filter((h) => h.isAlert)
  .map((h) => `- ${h.name}: ${h.diagnosis}`)
  .join('\n')}

### 3. Develop Adaptability
Your ability to adapt your ${data.dominantProfile} style when needed is a superpower.

## 90-Day Focus Areas
1. **Month 1**: Foundation - Understand and accept current state
2. **Month 2**: Build - Develop new habits and practices
3. **Month 3**: Integrate**: Make changes sustainable and automatic

## Success Indicators
- Increased self-awareness
- Reduced internal conflict
- Greater alignment between values and actions
- Improved wellbeing scores
`;
  }

  private static generateSMARTTaskContent(data: DevolutivaData): string {
    return `
# Your SMART Task: First Concrete Action

## The SMART Framework
- **S**pecific: Clear and well-defined
- **M**easurable: You can track progress
- **A**chievable: Realistic and possible
- **R**elevant: Aligned with your values and goals
- **T**ime-bound: Has a clear deadline

## Your First SMART Task
Based on your assessment, here's your recommended first action:

**[Generated based on profile and identified priorities]**

## Implementation Steps
1. Write it down and make it visible
2. Identify one person to share it with for accountability
3. Schedule your first step
4. Set a weekly review cadence

## The Power of One Task
Transformation often starts with one small, right action. This task is designed to be achievable while moving you toward your goals.
`;
  }

  private static generateActionPlanContent(data: DevolutivaData): string {
    return `
# Your 90-Day Action Plan

## Phase Overview
### Month 1: Foundation (Week 1-4)
- Weeks 1-2: Build awareness and acceptance
- Weeks 3-4: Identify triggers and patterns

### Month 2: Building (Week 5-8)
- Weeks 5-6: Develop new practices
- Weeks 7-8: Increase consistency

### Month 3: Integration (Week 9-12)
- Weeks 9-10: Deepen new habits
- Weeks 11-12: Prepare for sustained change

## Weekly Cadence
- **Weekly Review** (15 min): Reflect on progress and adjustments
- **Monthly Deep Dive** (1 hour): Assess and realign
- **Quarterly Evolution** (2 hours): Plan next quarter

## Success Metrics
- Increased self-awareness score
- Improved health index scores
- Greater alignment with values
- Positive feedback from others

## Moving Forward
This 15-step journey completes, but your development continues. Use these insights to make choices aligned with your authentic self.

**Next Steps:**
1. Schedule your first weekly review
2. Share your insights with trusted friend or mentor
3. Post your SMART task somewhere visible
4. Begin this week

---

*Your devolutiva is complete. Your transformation begins now.*
`;
  }

  // ============================================
  // Helper Methods for Interpretations
  // ============================================

  private static getProfileInterpretation(profile: string, scores: DISCProfile): string {
    const interpretations: Record<string, string> = {
      D: `
**Dominância** (${scores.d}%): You are driven, decisive, and results-oriented. You lead, challenge the status quo, and push toward goals. Others see you as confident and ambitious. Key challenge: Remember that not everything is a battle or race.`,

      I: `
**Influência** (${scores.i}%): You are sociable, enthusiastic, and persuasive. You inspire others and create connections. People enjoy your optimism and energy. Key challenge: Ensure follow-through matches your enthusiasm.`,

      S: `
**Estabilidade** (${scores.s}%): You are patient, reliable, and supportive. You create stability and are someone others can count on. You're a good listener and team player. Key challenge: Stand up for your own needs, not just others'.`,

      C: `
**Conformidade** (${scores.c}%): You are accurate, thoughtful, and quality-focused. You follow guidelines carefully and ensure work meets high standards. Others trust your judgment. Key challenge: Don't let perfectionism paralyze progress.`,
    };

    return interpretations[profile] || 'Your profile combines multiple strengths.';
  }

  private static generateBurnoutRecommendations(data: DevolutivaData): string {
    if (data.burnoutRisk) {
      return `
1. **Immediate**: Schedule time off or reduce intensity
2. **Short-term**: Identify one stressor to eliminate this month
3. **Medium-term**: Build recovery practices into your weekly routine
4. **Long-term**: Realign work with values and boundaries
`;
    }
    return `
1. **Maintain**: Keep current practices that support wellbeing
2. **Strengthen**: Deepen your recovery and support systems
3. **Expand**: Share your practices with others facing similar challenges
`;
  }

  private static generateInternalConflicts(profile: string): string {
    const conflicts: Record<string, string> = {
      D: `
- **Speed vs. Quality**: Your drive for results can conflict with taking time for quality
- **Independence vs. Collaboration**: You lead, but sometimes resist input from others
- **Change vs. Stability**: You push forward, but may destabilize teams needing predictability`,

      I: `
- **Enthusiasm vs. Depth**: Your enthusiasm can outpace your ability to follow through
- **Optimism vs. Realism**: Your positive outlook may minimize real challenges
- **Connection vs. Focus**: Your sociability can distract from deep work`,

      S: `
- **Support vs. Self-advocacy**: You support others well, but may neglect your own needs
- **Loyalty vs. Growth**: Your loyalty to relationships can limit growth opportunities
- **Stability vs. Innovation**: Your preference for stability can resist necessary change`,

      C: `
- **Quality vs. Perfectionism**: Your quality focus can become perfectionism that blocks progress
- **Accuracy vs. Decisiveness**: Your need for complete information can slow decisions
- **Standards vs. Acceptance**: Your high standards can create judgment of self and others`,
    };

    return conflicts[profile] || 'Your profile may experience some internal tensions worth exploring.';
  }
}
