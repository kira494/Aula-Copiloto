import React, { useState } from 'react';
import { 
  Sparkles, 
  Clock, 
  Users, 
  Layers, 
  Lightbulb, 
  CheckCircle2, 
  Bookmark, 
  Share2, 
  RotateCcw, 
  Edit3, 
  Check, 
  Printer, 
  MessageSquare, 
  AlertTriangle, 
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  FileCheck2,
  Copy,
  BookOpen
} from 'lucide-react';
import { ClassroomSituation, GeneratedStrategyPayload, InterventionRecord, NavigationSection, StrategyOption } from '../../types';

interface StrategyResultsViewProps {
  situation: ClassroomSituation | null;
  generatedData: GeneratedStrategyPayload | null;
  onSelectSection: (section: NavigationSection) => void;
  onOpenCopilotWithContext: (strategyName: string) => void;
  onSaveStrategyToLibrary: (strategy: StrategyOption) => void;
  onRegisterIntervention: (record: InterventionRecord) => void;
  anonymizeData: boolean;
}

export const StrategyResultsView: React.FC<StrategyResultsViewProps> = ({
  situation,
  generatedData,
  onSelectSection,
  onOpenCopilotWithContext,
  onSaveStrategyToLibrary,
  onRegisterIntervention,
  anonymizeData,
}) => {
  if (!situation || !generatedData) {
    return (
      <div className="max-w-3xl mx-auto py-16 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center mx-auto">
          <Lightbulb className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">
          No hay una propuesta pedagógica activa seleccionada
        </h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          Para generar estrategias didácticas personalizadas, completa primero el análisis de una situación de aula o selecciona una guardada previamente.
        </p>
        <button
          type="button"
          onClick={() => onSelectSection('classroom-analysis')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-medium text-xs transition-colors cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Realizar análisis de aula</span>
        </button>
      </div>
    );
  }

  const { interpretation, strategies, practicalClassroomScript, evaluationRubric } = generatedData;

  // Selected active strategy (defaults to first option)
  const [selectedStrategyId, setSelectedStrategyId] = useState<string>(strategies[0]?.id || 'strat-1');
  const activeStrategy = strategies.find(s => s.id === selectedStrategyId) || strategies[0];

  // Copy notification state
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [registeredSuccess, setRegisteredSuccess] = useState(false);

  // Intervention log modal / form state
  const [showLogModal, setShowLogModal] = useState(false);
  const [observedMinutes, setObservedMinutes] = useState(30);
  const [participationRate, setParticipationRate] = useState(85);
  const [teacherReflectionNote, setTeacherReflectionNote] = useState(
    'La estrategia redujo notablemente los momentos de dispersión. Al incorporar roles claros, los estudiantes con mayor energía canalizaron su actividad hacia el reto cooperativo.'
  );

  const handleCopyClean = () => {
    const textToCopy = `AULACOPILOTO AI - PROPUESTA DIDÁCTICA
Grado: ${situation.grade} | Asignatura: ${situation.subject}
Tema: ${situation.topic}
Objetivo: ${situation.learningGoal}

ESTRATEGIA SELECCIONADA: ${activeStrategy.name} (${activeStrategy.focusTag})
Duración estimada: ${activeStrategy.durationMinutes} min
Organización: ${activeStrategy.groupOrganization}
Materiales: ${activeStrategy.materials.join(', ')}

SECUENCIA PASO A PASO:
${activeStrategy.stepByStep.map(s => `${s.phase}: ${s.action}`).join('\n\n')}

ROL DOCENTE: ${activeStrategy.teacherRole}
PARTICIPACIÓN ESPERADA: ${activeStrategy.studentParticipation}
ADAPTACIONES DE BITÁCORA: ${activeStrategy.contextualAdaptations}

INDICADORES OBSERVABLES:
- Atención: ${activeStrategy.observableAttentionIndicators.join('; ')}
- Participación: ${activeStrategy.observableParticipationIndicators.join('; ')}
`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToLib = () => {
    onSaveStrategyToLibrary(activeStrategy);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleConfirmInterventionLog = () => {
    const newRecord: InterventionRecord = {
      id: `int-${Date.now()}`,
      situationId: situation.id,
      date: new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' }),
      grade: situation.grade,
      subject: situation.subject,
      topic: situation.topic,
      strategyName: activeStrategy.name,
      targetGroupOrStudents: situation.selectedStudentIds.length > 0 
        ? `${situation.grade} (Foco en bitácoras seleccionadas)`
        : `${situation.grade} (Grupo completo)`,
      initialSituation: situation.situationDescription,
      observedOutcome: `Se alcanzaron ${observedMinutes} minutos de atención sostenida efectiva con una participación estimada del ${participationRate}% del aula.`,
      engagementMinutes: observedMinutes,
      participationPercentage: participationRate,
      teacherReflection: teacherReflectionNote,
      recommendedAdjustments: 'Mantener la estructura en 3 fases y tener preparadas tarjetas de ampliación para grupos ágiles.',
      ratingAttention: observedMinutes >= 25 ? 5 : 4,
      ratingParticipation: participationRate >= 80 ? 5 : 4,
    };

    onRegisterIntervention(newRecord);
    setShowLogModal(false);
    setRegisteredSuccess(true);
    setTimeout(() => setRegisteredSuccess(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center justify-between no-print">
        <button
          type="button"
          onClick={() => onSelectSection('classroom-analysis')}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al análisis de situación</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyClean}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors cursor-pointer shadow-2xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copied ? '¡Copiado!' : 'Copiar texto'}</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors cursor-pointer shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Imprimir propuesta</span>
          </button>
        </div>
      </div>

      {/* Top Contextual Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-900">{situation.grade}</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-700 font-medium">{situation.subject}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums text-slate-400">{situation.date}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-mono tabular-nums">{situation.durationMinutes} min disponibles</span>
            <span aria-hidden="true">·</span>
            <span>{situation.studentCount} estudiantes</span>
          </div>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            {situation.topic}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
            <strong className="font-semibold text-slate-700">Objetivo pedagógico: </strong>
            {situation.learningGoal}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-500">
          <span className="font-medium text-slate-700">Bitácoras consideradas:</span>
          {situation.selectedStudentIds.length > 0 ? (
            <span className="font-mono text-slate-700">
              {situation.selectedStudentIds.map(id => id.replace('est-00', 'E-30')).join(' · ')}
            </span>
          ) : (
            <span className="text-slate-600">Grupo completo (adaptación universal)</span>
          )}
        </div>
      </div>

      {/* ================= SECTION A: INTERPRETACIÓN PEDAGÓGICA ================= */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>A. Interpretación pedagógica de la situación</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Diferenciación rigurosa entre datos observados por el docente e hipótesis generadas por la IA
          </p>
        </div>

        {/* Síntesis */}
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/70 p-4 rounded-xl border border-slate-100">
          {interpretation.summary}
        </p>

        {/* 2-Column Split: Facts vs Hypotheses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Hechos observados */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <h4 className="font-semibold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-slate-700" />
              <span>Datos aportados por el docente (Hechos verificables)</span>
            </h4>
            <ul className="space-y-1.5 text-slate-600">
              {interpretation.observedFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-1.5" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Hipótesis de la IA */}
          <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-200/80 space-y-2">
            <h4 className="font-semibold text-indigo-950 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-indigo-700" />
              <span>Hipótesis pedagógicas de la IA (Para valoración docente)</span>
            </h4>
            <ul className="space-y-1.5 text-indigo-950">
              {interpretation.aiHypotheses.map((hyp, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                  <span>{hyp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Oportunidades de intervención */}
        <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-200/80 space-y-2 text-xs">
          <h4 className="font-semibold text-teal-950 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-teal-700" />
            <span>Oportunidades didácticas identificadas</span>
          </h4>
          <ul className="space-y-1.5 text-teal-900">
            {interpretation.opportunities.map((opp, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                <span>{opp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ================= SECTION B: ESTRATEGIAS RECOMENDADAS ================= */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              B. Tres alternativas didácticas con enfoques contrastantes
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Propuestas realistas para primaria con recursos accesibles y tiempos ajustados
            </p>
          </div>

          <div className="text-xs text-slate-500 font-mono tabular-nums">
            3 propuestas disponibles
          </div>
        </div>

        {/* Segmented strategy tabs selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {strategies.map((strat, index) => {
            const isSelected = strat.id === selectedStrategyId;
            return (
              <button
                key={strat.id}
                type="button"
                onClick={() => setSelectedStrategyId(strat.id)}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-teal-500 shadow-xs ring-2 ring-teal-500/20'
                    : 'bg-white/70 hover:bg-white border-slate-200/80 text-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                    <span className="font-semibold text-slate-700">Opción {index + 1}</span>
                    <span className="font-mono tabular-nums">{strat.durationMinutes} min</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                    {strat.name}
                  </h4>
                  <div className="text-[11px] text-teal-700 font-medium mt-1">
                    {strat.focusTag}
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between text-[11px]">
                  <span className={isSelected ? 'text-teal-800 font-semibold' : 'text-slate-400'}>
                    {isSelected ? 'Seleccionada' : 'Ver detalle'}
                  </span>
                  <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-teal-700' : 'text-slate-300'}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Card for Selected Strategy */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
          {/* Title & Goal */}
          <div className="border-b border-slate-100 pb-4">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold text-teal-700">
                {activeStrategy.focusTag}
              </span>
              <span className="text-xs text-slate-500 font-mono tabular-nums">
                Duración: {activeStrategy.durationMinutes} minutos
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {activeStrategy.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              <strong className="text-slate-800">Objetivo específico: </strong>
              {activeStrategy.specificGoal}
            </p>
          </div>

          {/* Justificación & Organización */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
              <h4 className="font-semibold text-slate-900">Justificación pedagógica</h4>
              <p className="text-slate-600 leading-relaxed">{activeStrategy.pedagogicalRationale}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
              <h4 className="font-semibold text-slate-900">Organización del grupo</h4>
              <p className="text-slate-600 leading-relaxed">{activeStrategy.groupOrganization}</p>
            </div>
          </div>

          {/* Materiales requeridos */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs">
            <h4 className="font-semibold text-slate-900 mb-2">
              Materiales necesarios (recursos accesibles de aula)
            </h4>
            <div className="flex flex-wrap gap-2">
              {activeStrategy.materials.map((mat, i) => (
                <span key={i} className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 rounded-md">
                  {mat}
                </span>
              ))}
            </div>
          </div>

          {/* Paso a paso en 3 fases */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Instrucciones paso a paso
            </h4>

            <div className="space-y-3">
              {activeStrategy.stepByStep.map((step, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-teal-800 font-semibold">
                    <span>{step.phase}</span>
                    <span className="font-mono tabular-nums text-slate-400 text-[11px]">Paso {i + 1} de 3</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {step.action}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Rol del docente & Participación de estudiantes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <h4 className="font-semibold text-slate-900">Papel del docente</h4>
              <p className="text-slate-600 leading-relaxed">{activeStrategy.teacherRole}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <h4 className="font-semibold text-slate-900">Forma de participación de los estudiantes</h4>
              <p className="text-slate-600 leading-relaxed">{activeStrategy.studentParticipation}</p>
            </div>
          </div>

          {/* Adaptaciones contextuales basadas en la bitácora */}
          <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 text-xs space-y-1.5">
            <h4 className="font-semibold text-teal-950 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-teal-700" />
              <span>Adaptaciones basadas en la bitácora contextual</span>
            </h4>
            <p className="text-teal-900 leading-relaxed">
              {activeStrategy.contextualAdaptations}
            </p>
          </div>

          {/* Indicadores observables de atención y participación */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
              <h4 className="font-semibold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Indicadores de Atención Sostenida</span>
              </h4>
              <ul className="space-y-1.5 text-slate-600">
                {activeStrategy.observableAttentionIndicators.map((ind, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-teal-600 font-bold">·</span>
                    <span>{ind}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
              <h4 className="font-semibold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <span>Indicadores de Participación Activa</span>
              </h4>
              <ul className="space-y-1.5 text-slate-600">
                {activeStrategy.observableParticipationIndicators.map((ind, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-indigo-600 font-bold">·</span>
                    <span>{ind}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Posibles dificultades y Plan B */}
          {activeStrategy.potentialDifficultiesAndPlanB.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/80 text-xs space-y-2">
              <h4 className="font-semibold text-amber-950 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Contingencias previstas y Plan B</span>
              </h4>
              <div className="space-y-2 text-amber-950">
                {activeStrategy.potentialDifficultiesAndPlanB.map((item, i) => (
                  <div key={i} className="space-y-0.5">
                    <strong className="block text-amber-900">Dificultad: {item.risk}</strong>
                    <p className="text-slate-700"><strong>Alternativa:</strong> {item.planB}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= SECTION C: EJEMPLO PRÁCTICO PERSONALIZADO ================= */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>C. Ejemplo práctico personalizado</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 mt-1">
            {practicalClassroomScript.scenarioTitle}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Guion textual dramatizado para aplicar directamente con tus estudiantes
          </p>
        </div>

        {/* Script dialogue boxes */}
        <div className="space-y-4">
          {practicalClassroomScript.teacherScript.map((scriptItem, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 text-xs space-y-2">
              <div className="font-semibold text-indigo-900 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                <span>{scriptItem.moment}</span>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 text-slate-800 italic leading-relaxed">
                {scriptItem.teacherDialogue}
              </div>

              <div className="text-slate-600 text-[11px] flex items-start gap-1.5">
                <strong className="text-slate-700 shrink-0">Respuesta esperada de los alumnos:</strong>
                <span>{scriptItem.studentAction}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Practical tips */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
          <h4 className="font-semibold text-slate-900">Recomendaciones prácticas del copiloto</h4>
          <ul className="space-y-1.5 text-slate-600">
            {practicalClassroomScript.practicalTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0 mt-1.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ================= SECTION D: EVALUACIÓN DE LA INTERVENCIÓN ================= */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800">
            <FileCheck2 className="w-4 h-4 text-teal-600" />
            <span>D. Evaluación formativa de la intervención</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 mt-1">
            Rúbrica de observación e indicadores de logro
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Compara con la situación inicial sin atribuir causalidad automática
          </p>
        </div>

        {/* Baseline quote */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
          <strong className="text-slate-900">Línea de base del aula: </strong>
          {evaluationRubric.baselineObservation}
        </div>

        {/* Criteria table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase">
                <th className="p-3">Criterio Observable</th>
                <th className="p-3">Medida en Aula</th>
                <th className="p-3">Escala Valorativa</th>
                <th className="p-3">Meta Esperada</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {evaluationRubric.evaluationCriteria.map((crit, i) => (
                <tr key={i} className="hover:bg-slate-50/50">
                  <td className="p-3 font-semibold text-slate-900 max-w-xs">{crit.criterion}</td>
                  <td className="p-3 text-slate-600 max-w-sm">{crit.observableMeasure}</td>
                  <td className="p-3 text-slate-500 font-mono text-[11px]">{crit.ratingScale}</td>
                  <td className="p-3 font-medium text-teal-800 max-w-xs">{crit.expectedBenchmark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= SECTION E: ACCIONES DISPONIBLES ================= */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-sm space-y-4 no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-semibold text-white">
              E. Acciones sobre la propuesta didáctica
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Tú decides cómo implementar o guardar esta estrategia
            </p>
          </div>
          <span className="text-xs text-teal-400 font-medium">Control docente total</span>
        </div>

        {savedSuccess && (
          <div className="p-3 rounded-lg bg-teal-950/70 border border-teal-800 text-teal-200 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-400" />
            <span>¡Estrategia guardada en tu Biblioteca de Actividades!</span>
          </div>
        )}

        {registeredSuccess && (
          <div className="p-3 rounded-lg bg-indigo-950/70 border border-indigo-800 text-indigo-200 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            <span>¡Intervención registrada en tu Historial de Seguimiento!</span>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 pt-2">
          {/* Action 1: Personalizar con Copiloto */}
          <button
            type="button"
            onClick={() => onOpenCopilotWithContext(activeStrategy.name)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Personalizar propuesta con Copiloto</span>
          </button>

          {/* Action 2: Guardar en biblioteca */}
          <button
            type="button"
            onClick={handleSaveToLib}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-medium transition-colors cursor-pointer"
          >
            <Bookmark className="w-4 h-4 text-slate-400" />
            <span>Guardar en mi biblioteca</span>
          </button>

          {/* Action 3: Registrar intervención */}
          <button
            type="button"
            onClick={() => setShowLogModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-slate-950" />
            <span>Registrar intervención en el aula</span>
          </button>

          {/* Action 4: Regenerar alternativas */}
          <button
            type="button"
            onClick={() => onSelectSection('classroom-analysis')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-slate-400" />
            <span>Reajustar datos del análisis</span>
          </button>
        </div>
      </div>

      {/* MODAL: REGISTRAR INTERVENCIÓN FORMAL */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-slate-200 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Registrar aplicación de intervención
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Estrategia: {activeStrategy.name}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowLogModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Tiempo de atención sostenida observado (minutos)
                </label>
                <input
                  type="number"
                  min="5"
                  max="90"
                  value={observedMinutes}
                  onChange={(e) => setObservedMinutes(parseInt(e.target.value) || 20)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono tabular-nums focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Proporción estimada de estudiantes con participación activa (%)
                </label>
                <input
                  type="number"
                  min="10"
                  max="100"
                  value={participationRate}
                  onChange={(e) => setParticipationRate(parseInt(e.target.value) || 75)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono tabular-nums focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Reflexión del docente y observaciones formativas
                </label>
                <textarea
                  rows={3}
                  value={teacherReflectionNote}
                  onChange={(e) => setTeacherReflectionNote(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 leading-relaxed"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowLogModal(false)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmInterventionLog}
                className="px-5 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-medium shadow-2xs cursor-pointer"
              >
                Guardar en historial
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
