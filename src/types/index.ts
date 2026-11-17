export type NavigationSection = 
  | 'dashboard' 
  | 'classroom-analysis' 
  | 'student-bitacora' 
  | 'strategy-results' 
  | 'interventions-history' 
  | 'strategy-library' 
  | 'settings';

export interface StudentObservation {
  id: string;
  date: string;
  situation: string;
  activityConditions: string;
  studentResponse: string;
  teacherReflection: string;
  type: 'hecho_observado' | 'reflexion_docente';
}

export interface StudentEvolutionStep {
  date: string;
  strategyApplied: string;
  observedResponse: string;
  attentionChange: string;
  participationChange: string;
  futureAdjustment: string;
}

export interface StudentBitacora {
  id: string;
  internalCode: string;
  studentName: string;
  grade: '3.° Primaria' | '4.° Primaria';
  schoolGroup: string;
  learningContext: {
    personalInterests: string[];
    curiosityTopics: string[];
    facilitatingActivities: string[];
    workPreferences: string[];
    favorableSupports: string[];
  };
  attentionObservations: {
    bestFocusActivities: string[];
    distractionTriggers: string[];
    optimalClassMoments: string[];
    favorableEnvironmentConditions: string[];
    specificNotes: StudentObservation[];
  };
  activeParticipation: {
    habitualForms: string[];
    responseToFormats: {
      individual: string;
      collaborative: string;
      ludic: string;
      handsOn: string;
    };
    groupInteractions: string;
    initiativeMoments: string[];
  };
  pedagogicalEvolution: StudentEvolutionStep[];
  lastUpdated: string;
}

export interface ClassroomSituation {
  id: string;
  date: string;
  grade: '3.° Primaria' | '4.° Primaria';
  subject: string;
  topic: string;
  studentCount: number;
  durationMinutes: number;
  learningGoal: string;
  situationDescription: string;
  selectedDifficulties: string[];
  groupCharacteristics: {
    interests: string;
    highParticipationActivities: string;
    priorKnowledgeLevel: 'Bajo' | 'Heterogéneo' | 'Medio' | 'Consolidado';
    learningPaces: string;
    resources: string;
    schoolContext: string;
    previousStrategiesTested: string;
    additionalNotes: string;
  };
  selectedStudentIds: string[];
  status: 'borrador' | 'analizada' | 'estrategia_generada' | 'aplicada';
  generatedStrategyData?: GeneratedStrategyPayload;
}

export interface StepInstruction {
  phase: string;
  action: string;
}

export interface PotentialDifficulty {
  risk: string;
  planB: string;
}

export interface StrategyOption {
  id: string;
  name: string;
  focusTag: string;
  specificGoal: string;
  pedagogicalRationale: string;
  durationMinutes: number;
  materials: string[];
  groupOrganization: string;
  stepByStep: StepInstruction[];
  teacherRole: string;
  studentParticipation: string;
  contextualAdaptations: string;
  observableAttentionIndicators: string[];
  observableParticipationIndicators: string[];
  potentialDifficultiesAndPlanB: PotentialDifficulty[];
  isSavedInLibrary?: boolean;
}

export interface TeacherScriptItem {
  moment: string;
  teacherDialogue: string;
  studentAction: string;
}

export interface PracticalClassroomScript {
  strategyId: string;
  scenarioTitle: string;
  teacherScript: TeacherScriptItem[];
  practicalTips: string[];
}

export interface EvaluationCriterion {
  criterion: string;
  observableMeasure: string;
  ratingScale: string;
  expectedBenchmark: string;
}

export interface EvaluationRubric {
  baselineObservation: string;
  evaluationCriteria: EvaluationCriterion[];
}

export interface PedagogicalInterpretation {
  summary: string;
  observedFacts: string[];
  aiHypotheses: string[];
  opportunities: string[];
}

export interface GeneratedStrategyPayload {
  interpretation: PedagogicalInterpretation;
  strategies: StrategyOption[];
  practicalClassroomScript: PracticalClassroomScript;
  evaluationRubric: EvaluationRubric;
}

export interface InterventionRecord {
  id: string;
  situationId: string;
  date: string;
  grade: string;
  subject: string;
  topic: string;
  strategyName: string;
  targetGroupOrStudents: string;
  initialSituation: string;
  observedOutcome: string;
  engagementMinutes: number;
  participationPercentage: number;
  teacherReflection: string;
  recommendedAdjustments: string;
  ratingAttention: 1 | 2 | 3 | 4 | 5;
  ratingParticipation: 1 | 2 | 3 | 4 | 5;
}

export interface CatalogStrategy {
  id: string;
  title: string;
  focusTag: string;
  description: string;
  pedagogicalObjective: string;
  gradeLevels: string[];
  subjects: string[];
  estimatedDuration: number;
  materials: string[];
  isCustomized: boolean;
  category: 
    | 'atencion_sostenida'
    | 'participacion_activa'
    | 'aprendizaje_cooperativo'
    | 'gamificacion'
    | 'resolucion_problemas'
    | 'movimiento_practico'
    | 'lectura_comprension';
}
