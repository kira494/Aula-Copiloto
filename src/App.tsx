import React, { useState, useEffect } from 'react';
import { 
  NavigationSection, 
  StudentBitacora, 
  ClassroomSituation, 
  InterventionRecord, 
  CatalogStrategy, 
  GeneratedStrategyPayload, 
  StudentObservation,
  StrategyOption 
} from './types';
import { 
  INITIAL_STUDENTS, 
  INITIAL_SITUATIONS, 
  INITIAL_INTERVENTIONS, 
  INITIAL_CATALOG_STRATEGIES, 
  SAMPLE_STRATEGY_GENERATED 
} from './data/mockData';

// Components
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { TeacherDashboard } from './components/dashboard/TeacherDashboard';
import { ClassroomAnalysisForm } from './components/classroom/ClassroomAnalysisForm';
import { StudentBitacoraList } from './components/bitacora/StudentBitacoraList';
import { StudentDetailModal } from './components/bitacora/StudentDetailModal';
import { StrategyResultsView } from './components/strategy/StrategyResultsView';
import { InterventionsHistoryView } from './components/interventions/InterventionsHistoryView';
import { StrategyLibraryView } from './components/library/StrategyLibraryView';
import { CopilotChatDrawer } from './components/copilot/CopilotChatDrawer';
import { SettingsView } from './components/settings/SettingsView';
import { EthicalPrinciplesModal } from './components/modals/EthicalPrinciplesModal';
import { NewObservationModal } from './components/modals/NewObservationModal';
import { NewStudentModal } from './components/modals/NewStudentModal';

const STORAGE_KEYS = {
  STUDENTS: 'aulacopiloto_students_v1',
  SITUATIONS: 'aulacopiloto_situations_v1',
  INTERVENTIONS: 'aulacopiloto_interventions_v1',
  CATALOG: 'aulacopiloto_catalog_v1',
  ACTIVE_SITUATION: 'aulacopiloto_active_situation_v1',
  ACTIVE_GENERATED: 'aulacopiloto_active_generated_v1',
  ANONYMIZE: 'aulacopiloto_anonymize_v1',
};

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export default function App() {
  // Navigation State
  const [currentSection, setCurrentSection] = useState<NavigationSection>('dashboard');
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  // App Data with localStorage initialization
  const [students, setStudents] = useState<StudentBitacora[]>(() =>
    loadFromStorage(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS)
  );
  const [situations, setSituations] = useState<ClassroomSituation[]>(() =>
    loadFromStorage(STORAGE_KEYS.SITUATIONS, INITIAL_SITUATIONS)
  );
  const [interventions, setInterventions] = useState<InterventionRecord[]>(() =>
    loadFromStorage(STORAGE_KEYS.INTERVENTIONS, INITIAL_INTERVENTIONS)
  );
  const [catalogStrategies, setCatalogStrategies] = useState<CatalogStrategy[]>(() =>
    loadFromStorage(STORAGE_KEYS.CATALOG, INITIAL_CATALOG_STRATEGIES)
  );

  // Active Strategy and Situation
  const [activeSituation, setActiveSituation] = useState<ClassroomSituation | null>(() =>
    loadFromStorage(STORAGE_KEYS.ACTIVE_SITUATION, INITIAL_SITUATIONS[0])
  );
  const [activeGeneratedData, setActiveGeneratedData] = useState<GeneratedStrategyPayload | null>(() =>
    loadFromStorage(STORAGE_KEYS.ACTIVE_GENERATED, SAMPLE_STRATEGY_GENERATED)
  );

  // Modal States
  const [selectedStudentForModal, setSelectedStudentForModal] = useState<StudentBitacora | null>(null);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [copilotContextStrategy, setCopilotContextStrategy] = useState<string>('El Laboratorio de las Tiras Fraccionarias');
  const [isEthicsModalOpen, setIsEthicsModalOpen] = useState(false);
  const [isNewObservationModalOpen, setIsNewObservationModalOpen] = useState(false);
  const [isNewStudentModalOpen, setIsNewStudentModalOpen] = useState(false);

  // Anonymization Mode (E-301 vs Full Name)
  const [anonymizeData, setAnonymizeData] = useState<boolean>(() =>
    loadFromStorage(STORAGE_KEYS.ANONYMIZE, false)
  );

  // Sync changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
    } catch {}
  }, [students]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SITUATIONS, JSON.stringify(situations));
    } catch {}
  }, [situations]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INTERVENTIONS, JSON.stringify(interventions));
    } catch {}
  }, [interventions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CATALOG, JSON.stringify(catalogStrategies));
    } catch {}
  }, [catalogStrategies]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_SITUATION, JSON.stringify(activeSituation));
    } catch {}
  }, [activeSituation]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_GENERATED, JSON.stringify(activeGeneratedData));
    } catch {}
  }, [activeGeneratedData]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ANONYMIZE, JSON.stringify(anonymizeData));
    } catch {}
  }, [anonymizeData]);

  // Handlers
  const handleAddStudent = (newStudent: StudentBitacora) => {
    setStudents(prev => [newStudent, ...prev]);
    setAdaptationToast(`Estudiante ${newStudent.internalCode} agregado y guardado en la bitácora.`);
    setTimeout(() => setAdaptationToast(null), 3500);
  };

  const handleAddObservation = (studentId: string, newObs: StudentObservation) => {
    setStudents(prev => prev.map(st => {
      if (st.id === studentId) {
        return {
          ...st,
          lastUpdated: new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' }),
          attentionObservations: {
            ...st.attentionObservations,
            specificNotes: [newObs, ...st.attentionObservations.specificNotes]
          }
        };
      }
      return st;
    }));

    if (selectedStudentForModal && selectedStudentForModal.id === studentId) {
      setSelectedStudentForModal(prev => prev ? {
        ...prev,
        lastUpdated: new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' }),
        attentionObservations: {
          ...prev.attentionObservations,
          specificNotes: [newObs, ...prev.attentionObservations.specificNotes]
        }
      } : null);
    }
  };

  const handleSaveSituation = (situation: ClassroomSituation) => {
    setSituations(prev => [situation, ...prev]);
    setActiveSituation(situation);
    setCurrentSection('dashboard');
  };

  const handleGenerateSuccess = (situation: ClassroomSituation, generatedData: GeneratedStrategyPayload) => {
    setSituations(prev => [situation, ...prev]);
    setActiveSituation(situation);
    setActiveGeneratedData(generatedData);
    setCopilotContextStrategy(generatedData.strategies[0]?.name || 'Estrategia personalizada');
    setCurrentSection('strategy-results');
  };

  const handleSaveStrategyToLibrary = (strategy: StrategyOption) => {
    const newCatalogItem: CatalogStrategy = {
      id: `cat-${Date.now()}`,
      title: strategy.name,
      focusTag: strategy.focusTag,
      description: strategy.pedagogicalRationale,
      pedagogicalObjective: strategy.specificGoal,
      gradeLevels: [activeSituation?.grade || '3.° Primaria'],
      subjects: [activeSituation?.subject || 'General'],
      estimatedDuration: strategy.durationMinutes,
      materials: strategy.materials,
      isCustomized: true,
      category: 'atencion_sostenida'
    };

    setCatalogStrategies(prev => [newCatalogItem, ...prev]);
  };

  const handleRegisterIntervention = (record: InterventionRecord) => {
    setInterventions(prev => [record, ...prev]);
    if (activeSituation) {
      setSituations(prev => prev.map(s => s.id === activeSituation.id ? { ...s, status: 'aplicada' } : s));
    }
  };

  const handleAdaptStrategy = (_catStrategy: CatalogStrategy) => {
    setCurrentSection('classroom-analysis');
  };

  const [adaptationToast, setAdaptationToast] = useState<string | null>(null);

  const handleApplyAdaptation = (adaptationText: string) => {
    if (!activeGeneratedData) return;

    setActiveGeneratedData(prev => {
      if (!prev) return prev;
      const updatedStrategies = prev.strategies.map((strat, i) => {
        if (i === 0 || strat.name === copilotContextStrategy) {
          return {
            ...strat,
            contextualAdaptations: `${strat.contextualAdaptations} | Adaptación curricular Gemini: ${adaptationText.slice(0, 260)}...`,
          };
        }
        return strat;
      });

      return {
        ...prev,
        strategies: updatedStrategies
      };
    });

    setAdaptationToast('¡Adaptación pedagógica de Gemini integrada a la propuesta de aula!');
    setTimeout(() => setAdaptationToast(null), 4000);
  };

  const handleResetAllData = () => {
    try {
      Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
    } catch {}
    setStudents(INITIAL_STUDENTS);
    setSituations(INITIAL_SITUATIONS);
    setInterventions(INITIAL_INTERVENTIONS);
    setCatalogStrategies(INITIAL_CATALOG_STRATEGIES);
    setActiveSituation(INITIAL_SITUATIONS[0]);
    setActiveGeneratedData(SAMPLE_STRATEGY_GENERATED);
    setAnonymizeData(false);
    setAdaptationToast('Datos restaurados al estado demostrativo original.');
    setTimeout(() => setAdaptationToast(null), 3500);
  };

  const handleOpenCopilotWithContext = (strategyName: string) => {
    setCopilotContextStrategy(strategyName);
    setIsCopilotOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col lg:flex-row antialiased">
      {/* Dynamic Toast Notification for AI Adaptations */}
      {adaptationToast && (
        <div className="fixed top-20 right-6 z-50 bg-teal-900 text-teal-100 px-4 py-2.5 rounded-xl shadow-lg border border-teal-700 text-xs flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-teal-400" />
          <span>{adaptationToast}</span>
        </div>
      )}

      {/* Navigation Sidebar */}
      <Sidebar
        currentSection={currentSection}
        onSelectSection={(sec) => {
          setCurrentSection(sec);
          window.scrollTo(0, 0);
        }}
        isOpenMobile={isOpenMobile}
        onToggleMobile={() => setIsOpenMobile(prev => !prev)}
        onOpenEthicsModal={() => setIsEthicsModalOpen(true)}
        anonymizeData={anonymizeData}
        studentCount={students.length}
        strategyCount={activeGeneratedData ? activeGeneratedData.strategies.length : 3}
        interventionCount={interventions.length}
        catalogCount={catalogStrategies.length}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0 min-h-screen">
        {/* Global Header */}
        <Header
          currentSection={currentSection}
          onSelectSection={(sec) => {
            setCurrentSection(sec);
            window.scrollTo(0, 0);
          }}
          onToggleMobileMenu={() => setIsOpenMobile(true)}
          onOpenCopilot={() => setIsCopilotOpen(true)}
          onOpenEthicsModal={() => setIsEthicsModalOpen(true)}
          anonymizeData={anonymizeData}
          onToggleAnonymize={() => setAnonymizeData(prev => !prev)}
          onOpenNewObservation={() => setIsNewObservationModalOpen(true)}
          onSearchGlobal={(query) => {
            const lower = query.toLowerCase();
            if (lower.includes('estudiante') || lower.includes('samuel') || lower.includes('valentina') || lower.includes('mateo')) {
              setCurrentSection('student-bitacora');
            } else if (lower.includes('estrategia') || lower.includes('fraccion') || lower.includes('estacion')) {
              setCurrentSection('strategy-results');
            } else {
              setCurrentSection('strategy-library');
            }
            window.scrollTo(0, 0);
          }}
        />

        {/* Primary Viewport Content Area: Strictly isolated per view */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {currentSection === 'dashboard' && (
            <div key="dashboard" className="view-screen">
              <TeacherDashboard
                situations={situations}
                students={students}
                onSelectSection={(sec) => {
                  setCurrentSection(sec);
                  window.scrollTo(0, 0);
                }}
                onSelectSituation={(sit) => {
                  setActiveSituation(sit);
                  if (sit.generatedStrategyData) {
                    setActiveGeneratedData(sit.generatedStrategyData);
                  }
                  setCurrentSection('strategy-results');
                  window.scrollTo(0, 0);
                }}
                onOpenNewObservation={() => setIsNewObservationModalOpen(true)}
                anonymizeData={anonymizeData}
              />
            </div>
          )}

          {currentSection === 'classroom-analysis' && (
            <div key="classroom-analysis" className="view-screen">
              <ClassroomAnalysisForm
                students={students}
                onSaveSituation={handleSaveSituation}
                onGenerateSuccess={handleGenerateSuccess}
                anonymizeData={anonymizeData}
              />
            </div>
          )}

          {currentSection === 'student-bitacora' && (
            <div key="student-bitacora" className="view-screen">
              <StudentBitacoraList
                students={students}
                onSelectStudent={(st) => setSelectedStudentForModal(st)}
                onOpenNewObservation={() => setIsNewObservationModalOpen(true)}
                onOpenNewStudent={() => setIsNewStudentModalOpen(true)}
                anonymizeData={anonymizeData}
              />
            </div>
          )}

          {currentSection === 'strategy-results' && (
            <div key="strategy-results" className="view-screen">
              <StrategyResultsView
                situation={activeSituation}
                generatedData={activeGeneratedData}
                onSelectSection={(sec) => {
                  setCurrentSection(sec);
                  window.scrollTo(0, 0);
                }}
                onOpenCopilotWithContext={handleOpenCopilotWithContext}
                onSaveStrategyToLibrary={handleSaveStrategyToLibrary}
                onRegisterIntervention={handleRegisterIntervention}
                anonymizeData={anonymizeData}
              />
            </div>
          )}

          {currentSection === 'interventions-history' && (
            <div key="interventions-history" className="view-screen">
              <InterventionsHistoryView
                interventions={interventions}
                onSelectIntervention={() => {
                  setCurrentSection('interventions-history');
                }}
                anonymizeData={anonymizeData}
              />
            </div>
          )}

          {currentSection === 'strategy-library' && (
            <div key="strategy-library" className="view-screen">
              <StrategyLibraryView
                strategies={catalogStrategies}
                onAdaptStrategy={handleAdaptStrategy}
                onSelectSection={(sec) => {
                  setCurrentSection(sec);
                  window.scrollTo(0, 0);
                }}
              />
            </div>
          )}

          {currentSection === 'settings' && (
            <div key="settings" className="view-screen">
              <SettingsView
                anonymizeData={anonymizeData}
                onToggleAnonymize={() => setAnonymizeData(prev => !prev)}
                onOpenEthicsModal={() => setIsEthicsModalOpen(true)}
                onResetAllData={handleResetAllData}
              />
            </div>
          )}
        </main>
      </div>

      {/* Slide-out Copilot Conversational Drawer */}
      <CopilotChatDrawer
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        currentStrategyName={copilotContextStrategy}
        classroomContext={activeSituation}
        onApplyAdaptation={handleApplyAdaptation}
      />

      {/* Student Formative Detail Modal */}
      <StudentDetailModal
        student={selectedStudentForModal}
        onClose={() => setSelectedStudentForModal(null)}
        onAddObservation={handleAddObservation}
        anonymizeData={anonymizeData}
      />

      {/* Ethical Principles & Deontology Modal */}
      <EthicalPrinciplesModal
        isOpen={isEthicsModalOpen}
        onClose={() => setIsEthicsModalOpen(false)}
      />

      {/* Quick New Observation Modal */}
      <NewObservationModal
        isOpen={isNewObservationModalOpen}
        onClose={() => setIsNewObservationModalOpen(false)}
        students={students}
        onAddObservation={handleAddObservation}
        anonymizeData={anonymizeData}
      />

      {/* Create New Student Modal */}
      <NewStudentModal
        isOpen={isNewStudentModalOpen}
        onClose={() => setIsNewStudentModalOpen(false)}
        onAddStudent={handleAddStudent}
        existingCount={students.length}
      />
    </div>
  );
}

