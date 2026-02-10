// ============================================
// DISC PROFILE TYPES
// ============================================
export interface DISCProfile {
  d: number;  // Dominância (0-100)
  i: number;  // Influência (0-100)
  s: number;  // Estabilidade (0-100)
  c: number;  // Conformidade (0-100)
}

export type DominantProfile = 'D' | 'I' | 'S' | 'C';

// ============================================
// HEALTH INDEXES (9 Índices de Saúde)
// ============================================
export interface HealthIndex {
  name: string;
  value: string;
  diagnosis: string;
  impact: string;
  isAlert: boolean;
}

// Índices específicos: AEM, APF, IPS, IDA, IPM, etc.
export type IndexType =
  | 'Assertividade'
  | 'Paciência'
  | 'Conformidade'
  | 'Empatia'
  | 'Flexibilidade'
  | 'Criatividade'
  | 'Liderança'
  | 'Análise'
  | 'Colaboração';

// ============================================
// TOWER DATA (Torre DISC)
// ============================================
export interface TowerData {
  profile: DominantProfile;
  selfPerception: number;    // Autopercepção (0-100)
  environmentDemand: number;  // Demanda do Ambiente (0-100)
}

// ============================================
// SKILLS & COMPETENCIES
// ============================================
export interface Skill {
  name: string;
  type: 'expansion' | 'retraction' | 'core';
  proficiency?: number;
}

export interface SkillsPyramid {
  base: string[];      // Fundamentos (2 itens)
  middle: string[];    // Desenvolvimento (2 itens)
  top: string;         // Ápice (1 item)
}

// ============================================
// GENERATED CONTENT (15 Passos)
// ============================================
export interface GeneratedQuestion {
  profile?: DominantProfile;
  skill?: string;
  question: string;
}

export interface GeneratedQuestions {
  decrease: GeneratedQuestion[];         // Moderação
  increase: GeneratedQuestion[];         // Desenvolvimento
  expandSkill: GeneratedQuestion[];      // Expansão
  retractSkill: GeneratedQuestion[];     // Retração
}

export interface GeneratedContent {
  rapport: string;
  pizzaChartAnalysis: string;
  towerChartAnalysis: string;
  skillsAnalysis: string;
  healthIndexAnalysis: string;
  pyramidAnalysis: string;
  internalWarDiagnosis: string;
  smartTaskSuggestion: string;
  finalImpactQuestion: string;
  questions: GeneratedQuestions;
}

// ============================================
// COMPLETE DEVOLUTIVA DATA STRUCTURE
// ============================================
export interface DevolutivaData {
  id: string;
  subjectName: string;
  date: string;
  discProfile: DISCProfile;
  dominantProfile: DominantProfile;
  healthIndexes: HealthIndex[];
  towerData: TowerData[];
  skills: Skill[];
  pyramid: SkillsPyramid;
  burnoutRisk: boolean;
  generatedContent: GeneratedContent;
}

// ============================================
// PDF EXTRACTION TYPES
// ============================================
export interface PDFExtractionResult {
  type: 'DISC' | 'ANCHORS' | 'STRENGTHS' | 'LANGUAGES';
  rawText: string;
  extractedData: Record<string, any>;
  confidence: number;
}

export interface PDFUploadData {
  discFile: File;
  anchorsFile: File;
  strengthsFile: File;
  languagesFile: File;
}

// ============================================
// 15-STEP DEVOLUTIVA PHASES
// ============================================
export type DevolutivPhase = 'rapport' | 'indices' | 'identity' | 'transformation';

export interface DevolutivaStep {
  phase: DevolutivPhase;
  stepNumber: number;
  title: string;
  description: string;
  content: string;
  visualization?: 'chart' | 'table' | 'narrative';
}

export interface DevolutivaSession {
  id: string;
  subjectName: string;
  steps: DevolutivaStep[];
  currentStep: number;
  isComplete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// CORRELATION ENGINE TYPES
// ============================================
export interface CorrelationResult {
  metric: string;
  score: number;  // 0-1
  insights: string[];
}

export interface Correlations {
  discWithAnchors: CorrelationResult[];
  discWithStrengths: CorrelationResult[];
  discWithLanguages: CorrelationResult[];
}

// ============================================
// SMART TASK TYPES (Tarefas SMART)
// ============================================
export interface SMARTTask {
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  timeBound: string;
  deadline: Date;
}

export interface SmartTaskSuggestion {
  action: string;
  deadline: string;
  metrics: string;
  celebration: string;
}

// ============================================
// BATCH PROCESSING TYPES
// ============================================
export interface BatchProcessResult {
  disc: PDFExtractionResult;
  anchors: PDFExtractionResult;
  strengths: PDFExtractionResult;
  languages: PDFExtractionResult;
  processedAt: Date;
}
