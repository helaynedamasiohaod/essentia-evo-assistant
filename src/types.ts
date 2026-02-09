export enum Screen {
  UPLOAD = 'UPLOAD',
  ANALYSIS = 'ANALYSIS',
  EDITOR = 'EDITOR',
  SLIDES = 'SLIDES',
  SCRIPT = 'SCRIPT',
  HISTORY = 'HISTORY',
}

export interface ReportFiles {
  disc: File | null;
  anchors: File | null;
  strengths: File | null;
  valuation: File | null;
}

export interface HealthIndex {
  name: string;
  value: string;
  diagnosis: string;
  impact: string;
  isAlert: boolean;
}

export interface TowerData {
  profile: 'D' | 'I' | 'S' | 'C';
  selfPerception: number; // Verde
  environmentDemand: number; // Azul
}

export interface Skill {
  name: string;
  type: 'expansion' | 'retraction';
}

export interface DevolutivaData {
  id: string;
  subjectName: string;
  date: string;
  discProfile: {
    d: number;
    i: number;
    s: number;
    c: number;
  };
  dominantProfile: 'D' | 'I' | 'S' | 'C';
  towerData: TowerData[];
  healthIndexes: HealthIndex[];
  skills: Skill[];
  pyramid: {
    base: string[]; // Anchors
    middle: string[]; // Strengths
    top: string; // DISC
  };
  burnoutRisk: boolean;
  generatedContent: {
    rapport: string;
    pizzaChartAnalysis: string;
    towerChartAnalysis: string;
    skillsAnalysis: string;
    healthIndexAnalysis: string;
    pyramidAnalysis: string;
    internalWarDiagnosis: string;
    smartTaskSuggestion: string;
    finalImpactQuestion: string;
    questions: {
      decrease: { profile: string; question: string }[];
      increase: { profile: string; question: string }[];
      expandSkill: { skill: string; question: string }[];
      retractSkill: { skill: string; question: string }[];
    };
  }
}

export interface SlideContent {
  title: string;
  content: string | React.ReactNode;
}

export interface ScriptItem {
  title: string;
  guidance: string;
  question: string;
}
