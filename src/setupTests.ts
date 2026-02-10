import '@testing-library/jest-dom';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

global.localStorage = localStorageMock as any;

// Mock geminiService to avoid import.meta issues in tests
jest.mock('@/services/geminiService', () => ({
  generateDevolutiva: jest.fn().mockResolvedValue({
    id: 'test-devolutiva',
    subjectName: 'Test User',
    date: '2024-01-15',
    discProfile: { d: 75, i: 45, s: 60, c: 50 },
    dominantProfile: 'D',
    healthIndexes: [],
    towerData: [],
    skills: [],
    pyramid: { base: [], middle: [], top: '' },
    burnoutRisk: false,
    generatedContent: {
      rapport: 'Test rapport',
      pizzaChartAnalysis: 'Test analysis',
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
  }),
}));
