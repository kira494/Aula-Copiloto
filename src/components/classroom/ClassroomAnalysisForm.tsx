import React, { useState } from 'react';
import { 
  Sparkles, 
  Save, 
  BookOpen, 
  Check, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Users, 
  Info,
  ChevronDown,
  RotateCcw,
  ShieldCheck,
  Eye,
  X
} from 'lucide-react';
import { ClassroomSituation, GeneratedStrategyPayload, StudentBitacora } from '../../types';

interface ClassroomAnalysisFormProps {
  students: StudentBitacora[];
  onSaveSituation: (situation: ClassroomSituation) => void;
  onGenerateSuccess: (situation: ClassroomSituation, generatedData: GeneratedStrategyPayload) => void;
  anonymizeData: boolean;
}

export const ClassroomAnalysisForm: React.FC<ClassroomAnalysisFormProps> = ({
  students,
  onSaveSituation,
  onGenerateSuccess,
  anonymizeData,
}) => {
  // Section A: General Info
  const [grade, setGrade] = useState<'3.° Primaria' | '4.° Primaria'>('3.° Primaria');
  const [subject, setSubject] = useState('Matemáticas');
  const [topic, setTopic] = useState('Comprensión y representación de fracciones con material concreto');
  const [studentCount, setStudentCount] = useState(28);
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [learningGoal, setLearningGoal] = useState('Comprender el concepto de fracción como parte de la unidad mediante manipulación de tiras fraccionarias y resolución de retos en parejas.');

  // Section B: Observed Situation
  const [situationDescription, setSituationDescription] = useState(
    'Durante la explicación frontal en el tablero, a los 8-10 minutos de clase, la mayoría de los estudiantes comienza a distraerse, mirar hacia el patio o manipular lápices. Solo 4 estudiantes (los mismos de siempre) levantan la mano voluntariamente. Cuando pasamos al libro de texto, varios quedan bloqueados y manifiestan frustración.'
  );

  const problemOptions = [
    'Dificultad para mantener la atención',
    'Baja participación oral',
    'Escasa interacción entre compañeros',
    'Desinterés por las actividades',
    'Distracción durante las explicaciones',
    'Dificultad para completar las tareas',
    'Otra situación',
  ];
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([
    'Dificultad para mantener la atención',
    'Baja participación oral',
    'Distracción durante las explicaciones',
    'Dificultad para completar las tareas'
  ]);

  // Section C: Group Characteristics
  const [interests, setInterests] = useState('Dinosaurios, cocina, retos con animales, acertijos y juegos de detectives.');
  const [highParticipationActivities, setHighParticipationActivities] = useState('Construcciones con bloques lógicos, recortar figuras, dinámicas de roles en grupos pequeños.');
  const [priorKnowledgeLevel, setPriorKnowledgeLevel] = useState<'Bajo' | 'Heterogéneo' | 'Medio' | 'Consolidado'>('Heterogéneo');
  const [learningPaces, setLearningPaces] = useState('Un grupo de 6 estudiantes procesa rápidamente y se impacienta; otros 8 requieren andamiaje visual y kinestésico constante.');
  const [resources, setResources] = useState('Tiras de papel de colores, tijeras, marcadores, tablero acrílico, regla escolar y reloj de pared (sin proyector ni computadores).');
  const [schoolContext, setSchoolContext] = useState('I.E. Mogambo. Aula 302, buena ventilación y luz diurna, clima cálido.');
  const [previousStrategiesTested, setPreviousStrategiesTested] = useState('Explicación en el tablero con gráficos circulares dibujados. Resultado: atención dispersa y frustración al copiar.');
  const [additionalNotes, setAdditionalNotes] = useState('Se prioriza una dinámica donde ningún estudiante quede en rol pasivo.');

  // Section D: Contextual Bitácora Consultation
  const [targetMode, setTargetMode] = useState<'full_group' | 'specific_students'>('specific_students');
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>(['est-001', 'est-002', 'est-004']);
  const [previewStudentId, setPreviewStudentId] = useState<string | null>(null);

  // Status & loading
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);

  const toggleDifficulty = (item: string) => {
    setSelectedDifficulties(prev => 
      prev.includes(item) ? prev.filter(d => d !== item) : [...prev, item]
    );
  };

  const toggleStudent = (id: string) => {
    setSelectedStudentIds(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  // Get selected students contexts
  const selectedStudentsData = students.filter(s => selectedStudentIds.includes(s.id));

  // Handler for saving observation draft
  const handleSaveDraft = () => {
    const newSituation: ClassroomSituation = {
      id: `sit-${Date.now()}`,
      date: new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' }),
      grade,
      subject,
      topic,
      studentCount,
      durationMinutes,
      learningGoal,
      situationDescription,
      selectedDifficulties,
      groupCharacteristics: {
        interests,
        highParticipationActivities,
        priorKnowledgeLevel,
        learningPaces,
        resources,
        schoolContext,
        previousStrategiesTested,
        additionalNotes
      },
      selectedStudentIds: targetMode === 'full_group' ? [] : selectedStudentIds,
      status: 'analizada'
    };

    onSaveSituation(newSituation);
  };

  // Handler for AI Strategy Generation
  const handleGenerateStrategy = async () => {
    setIsGenerating(true);
    setGenerateError(null);

    const payload = {
      grade,
      subject,
      topic,
      studentCount,
      durationMinutes,
      learningGoal,
      situationDescription,
      selectedDifficulties,
      groupCharacteristics: {
        interests,
        highParticipationActivities,
        priorKnowledgeLevel,
        learningPaces,
        resources,
        schoolContext,
        previousStrategiesTested,
        additionalNotes
      },
      selectedStudentContexts: targetMode === 'full_group' 
        ? [{ mode: 'Grupo Completo', notes: 'Considerando heterogeneidad general' }]
        : selectedStudentsData.map(s => ({
            id: s.id,
            internalCode: s.internalCode,
            studentName: anonymizeData ? s.internalCode : s.studentName,
            grade: s.grade,
            interests: s.learningContext.personalInterests,
            facilitatingActivities: s.learningContext.facilitatingActivities,
            favorableSupports: s.learningContext.favorableSupports,
            attentionHighlights: s.attentionObservations.bestFocusActivities,
            distractionTriggers: s.attentionObservations.distractionTriggers
          }))
    };

    try {
      const response = await fetch('/api/generate-strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (data.success && data.data) {
        const situationRecord: ClassroomSituation = {
          id: `sit-${Date.now()}`,
          date: new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' }),
          grade,
          subject,
          topic,
          studentCount,
          durationMinutes,
          learningGoal,
          situationDescription,
          selectedDifficulties,
          groupCharacteristics: {
            interests,
            highParticipationActivities,
            priorKnowledgeLevel,
            learningPaces,
            resources,
            schoolContext,
            previousStrategiesTested,
            additionalNotes
          },
          selectedStudentIds: targetMode === 'full_group' ? [] : selectedStudentIds,
          status: 'estrategia_generada',
          generatedStrategyData: data.data
        };

        onGenerateSuccess(situationRecord, data.data);
      } else {
        throw new Error(data.error || 'Error al procesar la propuesta');
      }
    } catch (err: any) {
      console.error(err);
      setGenerateError('No se pudo conectar con el servicio pedagógico. Intenta de nuevo.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header Info */}
      <div className="border-b border-slate-200/80 pb-5">
        <div className="flex items-center gap-2 text-xs font-medium text-teal-700 mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Diagnóstico Pedagógico y Diseño de Estrategias</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Análisis de una situación de aula
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Documenta con precisión qué ocurre en tu grupo para recibir 3 propuestas didácticas adaptadas al contexto de tus estudiantes de 3.° o 4.° grado.
        </p>
      </div>

      {/* Form Container */}
      <div className="space-y-6">
        {/* ================= SECTION A: INFORMACIÓN GENERAL ================= */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                A. Información general de la clase
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Datos curriculares y encuadre temporal de la sesión
              </p>
            </div>
            <span className="text-[11px] font-mono tabular-nums text-slate-400">Paso 1 de 5</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Grado escolar */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Grado escolar *
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors"
              >
                <option value="3.° Primaria">3.° de Primaria (8-9 años)</option>
                <option value="4.° Primaria">4.° de Primaria (9-10 años)</option>
              </select>
            </div>

            {/* Asignatura */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Asignatura o área *
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Ej. Matemáticas, Lenguaje..."
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors"
              />
            </div>

            {/* Número de estudiantes */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Estudiantes en aula *
              </label>
              <input
                type="number"
                min="5"
                max="50"
                value={studentCount}
                onChange={(e) => setStudentCount(parseInt(e.target.value) || 25)}
                className="w-full px-3 py-2 text-xs font-mono tabular-nums bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Tema */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Tema que se está enseñando *
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ej. Fracciones equivalentes, Fábula y moraleja, Redes tróficas..."
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors"
              />
            </div>

            {/* Duración */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Duración disponible *
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="15"
                  max="120"
                  step="5"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(parseInt(e.target.value) || 45)}
                  className="w-full pl-3 pr-12 py-2 text-xs font-mono tabular-nums bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                  min
                </span>
              </div>
            </div>
          </div>

          {/* Objetivo de aprendizaje */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-slate-700">
                Objetivo pedagógico de aprendizaje *
              </label>
              <button
                type="button"
                onClick={() => {
                  if (subject.toLowerCase().includes('mat') || topic.toLowerCase().includes('frac')) {
                    setLearningGoal('Comprender el concepto de fracción como relación parte-todo mediante particiones de objetos concretos y tiras fraccionarias, asociándolo a situaciones de reparto equitativo según el DBA #1 y #2 de Matemáticas 3.° MEN.');
                  } else if (subject.toLowerCase().includes('leng') || topic.toLowerCase().includes('lect')) {
                    setLearningGoal('Identificar la idea principal en textos narrativos y organizarla en secuencias visuales de inicio, nudo y desenlace según el DBA #6 y #8 de Lenguaje 4.° MEN.');
                  } else {
                    setLearningGoal(`Comprender y relacionar los conceptos centrales de ${topic || 'la sesión'} a través de experiencias prácticas, favoreciendo la atención focalizada y la participación activa en ${grade}.`);
                  }
                }}
                className="text-[11px] font-semibold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1 cursor-pointer"
                title="Alinear con Derechos Básicos de Aprendizaje del Ministerio de Educación Nacional"
              >
                <Sparkles className="w-3 h-3 text-teal-600" />
                <span>Alinear con DBA (MEN Colombia)</span>
              </button>
            </div>
            <textarea
              rows={2}
              value={learningGoal}
              onChange={(e) => setLearningGoal(e.target.value)}
              placeholder="¿Qué esperas que los estudiantes comprendan, elaboren o demuestren al finalizar la clase?"
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors leading-relaxed"
            />
          </div>
        </div>

        {/* ================= SECTION B: SITUACIÓN OBSERVADA ================= */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                B. Situación observada en el aula
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Hechos concretos que afectan la atención sostenida o la participación activa
              </p>
            </div>
            <span className="text-[11px] font-mono tabular-nums text-slate-400">Paso 2 de 5</span>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Descripción en tus propias palabras *
            </label>
            <p className="text-[11px] text-slate-400 mb-2 leading-relaxed">
              Describe qué está sucediendo durante la clase. ¿En qué momento los estudiantes pierden la atención? ¿Cómo participan? ¿Qué dificultades has observado y en qué condiciones aparecen?
            </p>
            <textarea
              rows={4}
              value={situationDescription}
              onChange={(e) => setSituationDescription(e.target.value)}
              placeholder="Describe lo observado con la mayor precisión posible sin emitir juicios clínicos..."
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-2">
              Dificultades principales observadas (selección múltiple) *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {problemOptions.map((opt) => {
                const isSelected = selectedDifficulties.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggleDifficulty(opt)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium border text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-teal-50/70 border-teal-300 text-teal-900'
                        : 'bg-slate-50/50 border-slate-200 text-slate-700 hover:bg-slate-100/70'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-teal-600 border-teal-600 text-white' : 'border-slate-300 bg-white'
                    }`}>
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                    <span className="truncate">{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= SECTION C: CARACTERÍSTICAS DEL GRUPO ================= */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                C. Características y contexto del grupo
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Factores motivacionales, ritmos y recursos reales disponibles
              </p>
            </div>
            <span className="text-[11px] font-mono tabular-nums text-slate-400">Paso 3 de 5</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Intereses y temas motivadores del grupo
              </label>
              <input
                type="text"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="Ej. Dinosaurios, fútbol, recetas, historietas, música..."
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Actividades con mayor participación previa
              </label>
              <input
                type="text"
                value={highParticipationActivities}
                onChange={(e) => setHighParticipationActivities(e.target.value)}
                placeholder="Ej. Dinámicas con tarjetas, plastilina, dramatización..."
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Nivel de conocimientos previos
              </label>
              <select
                value={priorKnowledgeLevel}
                onChange={(e) => setPriorKnowledgeLevel(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors"
              >
                <option value="Heterogéneo">Heterogéneo (Gran diversidad en el aula)</option>
                <option value="Bajo">Bajo (Requiere activación de prerrequisitos)</option>
                <option value="Medio">Medio (Conceptos básicos presentes)</option>
                <option value="Consolidado">Consolidado (Listos para profundización)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Ritmos de aprendizaje observados
              </label>
              <input
                type="text"
                value={learningPaces}
                onChange={(e) => setLearningPaces(e.target.value)}
                placeholder="Ej. Algunos terminan rápido y se aburren, otros necesitan apoyo continuo"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Recursos disponibles en el aula *
              </label>
              <input
                type="text"
                value={resources}
                onChange={(e) => setResources(e.target.value)}
                placeholder="Ej. Papel de colores, tijeras, marcadores, tablero (sin internet/pantallas)"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Contexto escolar relevante
              </label>
              <input
                type="text"
                value={schoolContext}
                onChange={(e) => setSchoolContext(e.target.value)}
                placeholder="Ej. Buena luz diurna, clima cálido, aula espaciosa..."
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Estrategias que ya has probado y sus resultados
            </label>
            <textarea
              rows={2}
              value={previousStrategiesTested}
              onChange={(e) => setPreviousStrategiesTested(e.target.value)}
              placeholder="¿Qué intentaste antes en situaciones similares y cómo respondieron los niños?"
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors leading-relaxed"
            />
          </div>
        </div>

        {/* ================= SECTION D: BITÁCORA CONTEXTUAL ================= */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                D. Consulta de la bitácora contextual del estudiante
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Integra la información formativa previa para personalizar las adaptaciones didácticas
              </p>
            </div>
            <span className="text-[11px] font-mono tabular-nums text-slate-400">Paso 4 de 5</span>
          </div>

          {/* Mode Selector */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setTargetMode('specific_students')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                targetMode === 'specific_students'
                  ? 'bg-teal-50 border-teal-300 text-teal-900 shadow-2xs'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              Seleccionar estudiantes específicos ({selectedStudentIds.length})
            </button>

            <button
              type="button"
              onClick={() => setTargetMode('full_group')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                targetMode === 'full_group'
                  ? 'bg-teal-50 border-teal-300 text-teal-900 shadow-2xs'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              Analizar al grupo completo
            </button>
          </div>

          {targetMode === 'specific_students' && (
            <div className="space-y-4">
              <p className="text-[11px] text-slate-500">
                Selecciona a los estudiantes que manifiestan mayor reto de atención o participación en esta temática para que el copiloto diseñe roles y andamiajes específicos para ellos:
              </p>

              {/* Student checkboxes list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {students.map((student) => {
                  const isChecked = selectedStudentIds.includes(student.id);
                  return (
                    <div
                      key={student.id}
                      className={`p-3 rounded-xl border transition-all text-xs flex flex-col justify-between ${
                        isChecked 
                          ? 'bg-teal-50/40 border-teal-300 shadow-2xs' 
                          : 'bg-slate-50/50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <label className="flex items-center gap-2 cursor-pointer min-w-0">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleStudent(student.id)}
                            className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
                          />
                          <div className="min-w-0">
                            <span className="font-semibold text-slate-900 block truncate">
                              {anonymizeData ? student.internalCode : student.studentName}
                            </span>
                            <span className="text-[11px] text-slate-500 block truncate font-mono">
                              {student.grade} · {student.internalCode}
                            </span>
                          </div>
                        </label>

                        <button
                          type="button"
                          onClick={() => setPreviewStudentId(previewStudentId === student.id ? null : student.id)}
                          title="Vista previa contextual"
                          className="p-1 text-slate-400 hover:text-teal-700 rounded cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="mt-2 text-[11px] text-slate-500 line-clamp-2">
                        <strong className="text-slate-700">Intereses:</strong> {student.learningContext.personalInterests.slice(0, 2).join(', ')}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Student Context Preview Drawer/Box if selected */}
              {previewStudentId && (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2 relative animate-fade-in">
                  <button
                    type="button"
                    onClick={() => setPreviewStudentId(null)}
                    className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  {(() => {
                    const st = students.find(s => s.id === previewStudentId);
                    if (!st) return null;
                    return (
                      <>
                        <div className="font-semibold text-slate-900 flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-teal-600" />
                          <span>Vista previa de bitácora: {anonymizeData ? st.internalCode : st.studentName}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600 pt-1">
                          <div>
                            <span className="font-medium text-slate-700">Mayor foco en: </span>
                            {st.attentionObservations.bestFocusActivities[0] || 'Actividades prácticas'}
                          </div>
                          <div>
                            <span className="font-medium text-slate-700">Apoyos que favorecen: </span>
                            {st.learningContext.favorableSupports[0] || 'Instrucciones cortas'}
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500 italic pt-1">
                          Nota del docente: Puedes deseleccionar este estudiante en cualquier momento si deseas que la propuesta se enfoque en otros perfiles.
                        </p>
                      </>
                    );
                  })()}
                </div>
              )}
            </div>
          )}

          {/* Teacher control assurance */}
          <div className="bg-teal-50/60 p-3.5 rounded-lg border border-teal-200/80 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <div className="text-xs text-teal-900 leading-relaxed">
              <span className="font-semibold">Control docente garantizado: </span>
              La información contextual de las bitácoras se utiliza exclusivamente para adaptar las dinámicas y no para clasificar estudiantes. Puedes modificar o excluir cualquier dato antes de ejecutar la propuesta.
            </div>
          </div>
        </div>

        {/* ================= SECTION E: GENERACIÓN DE PROPUESTA ================= */}
        <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-semibold text-white">
                E. Resumen contextual y generación con IA
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Verifica los parámetros antes de solicitar las 3 estrategias didácticas
              </p>
            </div>
            <span className="text-[11px] font-mono tabular-nums text-slate-400">Paso 5 de 5</span>
          </div>

          {/* Quick summary grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-1 text-xs">
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
              <span className="text-slate-400 text-[11px] block">Grado & Grupo</span>
              <span className="font-semibold text-slate-200 mt-0.5 block truncate">{grade}</span>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
              <span className="text-slate-400 text-[11px] block">Duración disponible</span>
              <span className="font-semibold text-slate-200 mt-0.5 block font-mono tabular-nums">{durationMinutes} minutos</span>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
              <span className="text-slate-400 text-[11px] block">Focos de atención</span>
              <span className="font-semibold text-slate-200 mt-0.5 block font-mono tabular-nums">{selectedDifficulties.length} seleccionados</span>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
              <span className="text-slate-400 text-[11px] block">Bitácoras integradas</span>
              <span className="font-semibold text-teal-400 mt-0.5 block font-mono tabular-nums">
                {targetMode === 'full_group' ? 'Grupo Completo' : `${selectedStudentsData.length} estudiantes`}
              </span>
            </div>
          </div>

          {generateError && (
            <div className="p-3 rounded-lg bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{generateError}</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={isGenerating}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Guardar observación para después</span>
            </button>

            <button
              type="button"
              onClick={handleGenerateStrategy}
              disabled={isGenerating}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 active:bg-teal-600 text-slate-950 text-xs font-semibold shadow-sm transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>
                {isGenerating ? 'Generando estrategias contextualizadas...' : 'Generar estrategias personalizadas con IA'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
