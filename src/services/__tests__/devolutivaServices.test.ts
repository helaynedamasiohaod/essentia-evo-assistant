import { DevolutivaAnalysisService } from '../devolutivaAnalysisService';
import { IndexCalculationService } from '../indexCalculationService';
import { CorrelationService } from '../correlationService';
import { DevolutivaData, DISCProfile } from '@/types/devolutiva';

/**
 * Test Suite: Devolutiva Backend Services
 * Tests for:
 * - DevolutivaAnalysisService (15-step orchestration)
 * - IndexCalculationService (9 indices calculation)
 * - CorrelationService (DISC correlations)
 */

describe('Devolutiva Backend Services', () => {
  // Mock DevolutivaData for testing
  const mockDevolutivaData: DevolutivaData = {
    id: 'test-001',
    subjectName: 'João Silva',
    date: new Date().toISOString(),
    discProfile: {
      d: 65,
      i: 55,
      s: 45,
      c: 35,
    },
    dominantProfile: 'D',
    healthIndexes: [],
    towerData: [
      {
        profile: 'D',
        selfPerception: 70,
        environmentDemand: 60,
      },
    ],
    skills: [
      { name: 'Leadership', type: 'core', proficiency: 85 },
      { name: 'Communication', type: 'core', proficiency: 75 },
      { name: 'Flexibility', type: 'expansion', proficiency: 45 },
    ],
    pyramid: {
      base: ['Integrity', 'Results'],
      middle: ['Growth', 'Relationships'],
      top: 'Making a Difference',
    },
    burnoutRisk: false,
    generatedContent: {
      rapport: '',
      pizzaChartAnalysis: '',
      towerChartAnalysis: '',
      skillsAnalysis: '',
      healthIndexAnalysis: '',
      pyramidAnalysis: '',
      internalWarDiagnosis: '',
      smartTaskSuggestion: '',
      finalImpactQuestion: '',
      questions: {
        decrease: [],
        increase: [],
        expandSkill: [],
        retractSkill: [],
      },
    },
  };

  describe('DevolutivaAnalysisService', () => {
    test('generateCompleteDevoluta should create 15 steps', async () => {
      const session = await DevolutivaAnalysisService.generateCompleteDevoluta(
        mockDevolutivaData,
      );

      expect(session.steps).toHaveLength(15);
      expect(session.isComplete).toBe(true);
      expect(session.id).toBe('test-001');
      expect(session.subjectName).toBe('João Silva');
    });

    test('should generate 4 phases correctly', async () => {
      const session = await DevolutivaAnalysisService.generateCompleteDevoluta(
        mockDevolutivaData,
      );

      const phases = {
        rapport: session.steps.filter((s) => s.phase === 'rapport'),
        indices: session.steps.filter((s) => s.phase === 'indices'),
        identity: session.steps.filter((s) => s.phase === 'identity'),
        transformation: session.steps.filter((s) => s.phase === 'transformation'),
      };

      expect(phases.rapport).toHaveLength(4); // Steps 1-4
      expect(phases.indices).toHaveLength(4); // Steps 5-8
      expect(phases.identity).toHaveLength(4); // Steps 9-12
      expect(phases.transformation).toHaveLength(3); // Steps 13-15
    });

    test('should include all expected step titles', async () => {
      const session = await DevolutivaAnalysisService.generateCompleteDevoluta(
        mockDevolutivaData,
      );

      const stepTitles = session.steps.map((s) => s.title);

      expect(stepTitles).toContain('Welcome & Journey Overview');
      expect(stepTitles).toContain('Your DISC Behavioral Profile');
      expect(stepTitles).toContain('Behavioral Health Indices Analysis');
      expect(stepTitles).toContain('Your Values Pyramid');
      expect(stepTitles).toContain('Development Recommendations');
      expect(stepTitles).toContain('Your SMART Task & First Action');
      expect(stepTitles).toContain('Action Plan & 90-Day Roadmap');
    });

    test('should have sequential step numbers', async () => {
      const session = await DevolutivaAnalysisService.generateCompleteDevoluta(
        mockDevolutivaData,
      );

      session.steps.forEach((step, index) => {
        expect(step.stepNumber).toBe(index + 1);
      });
    });

    test('should include visualization types', async () => {
      const session = await DevolutivaAnalysisService.generateCompleteDevoluta(
        mockDevolutivaData,
      );

      const hasCharts = session.steps.some((s) => s.visualization === 'chart');
      const hasNarratives = session.steps.some((s) => s.visualization === 'narrative');

      expect(hasCharts).toBe(true);
      expect(hasNarratives).toBe(true);
    });

    test('should generate non-empty content for each step', async () => {
      const session = await DevolutivaAnalysisService.generateCompleteDevoluta(
        mockDevolutivaData,
      );

      session.steps.forEach((step) => {
        expect(step.content).toBeTruthy();
        expect(step.content.length).toBeGreaterThan(0);
      });
    });
  });

  describe('IndexCalculationService', () => {
    test('calculateAllIndices should return 9 indices', () => {
      const indices = IndexCalculationService.calculateAllIndices(
        mockDevolutivaData.discProfile,
      );

      expect(indices).toHaveLength(9);
    });

    test('should calculate Assertividade correctly', () => {
      const indices = IndexCalculationService.calculateAllIndices(
        mockDevolutivaData.discProfile,
      );
      const assertiveness = indices.find((i) => i.name === 'Assertividade');

      // D=65, I=55: 65*0.7 + 55*0.3 = 45.5 + 16.5 = 62
      expect(assertiveness?.value).toBe('62%');
    });

    test('should calculate Paciência correctly', () => {
      const indices = IndexCalculationService.calculateAllIndices(
        mockDevolutivaData.discProfile,
      );
      const patience = indices.find((i) => i.name === 'Paciência');

      // S=45, C=35: 45*0.7 + 35*0.3 = 31.5 + 10.5 = 42
      expect(patience?.value).toBe('42%');
    });

    test('should calculate Conformidade correctly', () => {
      const indices = IndexCalculationService.calculateAllIndices(
        mockDevolutivaData.discProfile,
      );
      const conformity = indices.find((i) => i.name === 'Conformidade');

      // C=35, S=45: 35*0.8 + 45*0.2 = 28 + 9 = 37
      expect(conformity?.value).toBe('37%');
    });

    test('should set alert for low values', () => {
      const indices = IndexCalculationService.calculateAllIndices(
        mockDevolutivaData.discProfile,
      );

      const lowIndices = indices.filter((i) => parseInt(i.value.replace('%', ''), 10) < 30);
      const shouldHaveAlerts = lowIndices.length > 0;

      if (shouldHaveAlerts) {
        lowIndices.forEach((index) => {
          expect(index.isAlert).toBe(true);
        });
      }
    });

    test('calculateIndexByType should work for single index', () => {
      const score = IndexCalculationService.calculateIndexByType(
        'Liderança',
        mockDevolutivaData.discProfile,
      );

      // D=65, I=55, C=35: 65*0.6 + 55*0.3 + (100-35)*0.1 = 39 + 16.5 + 6.5 = 62
      expect(score).toBe(62);
    });

    test('generateIndexReport should include all indices', () => {
      const indices = IndexCalculationService.calculateAllIndices(
        mockDevolutivaData.discProfile,
      );
      const report = IndexCalculationService.generateIndexReport(indices);

      expect(report).toContain('Behavioral Health Indices Report');
      expect(report).toContain('Assertividade');
      expect(report).toContain('Paciência');
      expect(report).toContain('Conformidade');
      expect(report).toContain('Empatia');
      expect(report).toContain('Flexibilidade');
      expect(report).toContain('Criatividade');
      expect(report).toContain('Liderança');
      expect(report).toContain('Análise');
      expect(report).toContain('Colaboração');
    });

    test('calculateBurnoutRisk should work', () => {
      const indices = IndexCalculationService.calculateAllIndices(
        mockDevolutivaData.discProfile,
      );
      const hasRisk = IndexCalculationService.calculateBurnoutRisk(indices);

      expect(typeof hasRisk).toBe('boolean');
    });

    test('getGrowthRecommendations should provide recommendations', () => {
      const indices = IndexCalculationService.calculateAllIndices(
        mockDevolutivaData.discProfile,
      );
      const recommendations = IndexCalculationService.getGrowthRecommendations(indices);

      expect(recommendations.length).toBeGreaterThan(0);
      expect(recommendations[0]).toBeTruthy();
    });

    test('analyzePatterns should identify behavioral patterns', () => {
      const indices = IndexCalculationService.calculateAllIndices(
        mockDevolutivaData.discProfile,
      );
      const analysis = IndexCalculationService.analyzePatterns(indices);

      expect(analysis).toContain('Behavioral Patterns');
    });
  });

  describe('CorrelationService', () => {
    test('generateCompleteInsights should include all three correlation types', () => {
      const correlations = CorrelationService.generateCompleteInsights(mockDevolutivaData);

      expect(correlations.discWithAnchors).toBeDefined();
      expect(correlations.discWithStrengths).toBeDefined();
      expect(correlations.discWithLanguages).toBeDefined();
    });

    test('correlateDiscWithAnchors should return results', () => {
      const correlations = CorrelationService.correlateDiscWithAnchors(
        mockDevolutivaData.discProfile,
        'D',
      );

      expect(correlations.length).toBeGreaterThan(0);
      expect(correlations[0].metric).toBeTruthy();
      expect(correlations[0].score).toBeGreaterThanOrEqual(0);
      expect(correlations[0].score).toBeLessThanOrEqual(1);
    });

    test('correlateDiscWithStrengths should include leadership', () => {
      const correlations = CorrelationService.correlateDiscWithStrengths(
        mockDevolutivaData.discProfile,
        'D',
      );

      const hasLeadership = correlations.some((c) => c.metric.includes('Leadership'));
      expect(hasLeadership).toBe(true);
    });

    test('correlateDiscWithLanguages should have 5 elements', () => {
      const correlations = CorrelationService.correlateDiscWithLanguages(
        mockDevolutivaData.discProfile,
        'D',
      );

      expect(correlations.length).toBe(5);
    });

    test('correlateDiscWithLanguages should include all appreciation types', () => {
      const correlations = CorrelationService.correlateDiscWithLanguages(
        mockDevolutivaData.discProfile,
        'D',
      );

      const metrics = correlations.map((c) => c.metric);
      expect(metrics).toContain('Recognition Language Preference');
      expect(metrics).toContain('Quality Time Preference');
      expect(metrics).toContain('Tangible Reward Preference');
      expect(metrics).toContain('Emotional Support Preference');
      expect(metrics).toContain('Growth Opportunity Preference');
    });

    test('generateCorrelationSummary should include all sections', () => {
      const correlations = CorrelationService.generateCompleteInsights(mockDevolutivaData);
      const summary = CorrelationService.generateCorrelationSummary(correlations);

      expect(summary).toContain('DISC ↔ Career Anchors');
      expect(summary).toContain('DISC ↔ Strengths');
      expect(summary).toContain('DISC ↔ Appreciation Languages');
    });

    test('identifyIntegrationOpportunities should return insights', () => {
      const opportunities = CorrelationService.identifyIntegrationOpportunities(
        mockDevolutivaData,
      );

      expect(opportunities.length).toBeGreaterThan(0);
      expect(opportunities[0]).toBeTruthy();
    });

    test('should handle different profile types', () => {
      const profiles: Array<{ profile: DISCProfile; type: 'D' | 'I' | 'S' | 'C' }> = [
        { profile: { d: 80, i: 20, s: 20, c: 20 }, type: 'D' },
        { profile: { d: 20, i: 80, s: 20, c: 20 }, type: 'I' },
        { profile: { d: 20, i: 20, s: 80, c: 20 }, type: 'S' },
        { profile: { d: 20, i: 20, s: 20, c: 80 }, type: 'C' },
      ];

      profiles.forEach(({ profile, type }) => {
        const correlations = CorrelationService.generateCompleteInsights({
          ...mockDevolutivaData,
          discProfile: profile,
          dominantProfile: type,
        });

        expect(correlations.discWithAnchors.length).toBeGreaterThan(0);
        expect(correlations.discWithStrengths.length).toBeGreaterThan(0);
        expect(correlations.discWithLanguages.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Integration Tests', () => {
    test('Complete workflow: Analysis → Indices → Correlations', async () => {
      // Generate complete analysis
      const session = await DevolutivaAnalysisService.generateCompleteDevoluta(
        mockDevolutivaData,
      );

      // Calculate indices
      const indices = IndexCalculationService.calculateAllIndices(
        mockDevolutivaData.discProfile,
      );

      // Generate correlations
      const correlations = CorrelationService.generateCompleteInsights(mockDevolutivaData);

      // Verify integration
      expect(session.steps.length).toBe(15);
      expect(indices.length).toBe(9);
      expect(correlations).toBeDefined();
    });

    test('should handle edge case: balanced profile (25-25-25-25)', async () => {
      const balancedData: DevolutivaData = {
        ...mockDevolutivaData,
        discProfile: { d: 25, i: 25, s: 25, c: 25 },
        dominantProfile: 'D', // Just pick one
      };

      const session = await DevolutivaAnalysisService.generateCompleteDevoluta(balancedData);
      const indices = IndexCalculationService.calculateAllIndices(balancedData.discProfile);

      expect(session.steps.length).toBe(15);
      expect(indices.length).toBe(9);
    });

    test('should handle edge case: extreme profile (100-0-0-0)', () => {
      const extremeProfile: DISCProfile = { d: 100, i: 0, s: 0, c: 0 };

      const indices = IndexCalculationService.calculateAllIndices(extremeProfile);
      const correlations = CorrelationService.correlateDiscWithAnchors(extremeProfile, 'D');

      expect(indices.length).toBe(9);
      expect(correlations.length).toBeGreaterThan(0);
    });
  });
});
