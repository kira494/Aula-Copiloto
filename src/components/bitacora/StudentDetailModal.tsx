import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Heart, 
  Eye, 
  Activity, 
  TrendingUp, 
  PlusCircle, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  FileText,
  User,
  AlertCircle
} from 'lucide-react';
import { StudentBitacora, StudentObservation } from '../../types';

interface StudentDetailModalProps {
  student: StudentBitacora | null;
  onClose: () => void;
  onAddObservation: (studentId: string, newObservation: StudentObservation) => void;
  anonymizeData: boolean;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  student,
  onClose,
  onAddObservation,
  anonymizeData,
}) => {
  if (!student) return null;

  type TabKey = 'context' | 'attention' | 'participation' | 'evolution' | 'new_observation';
  const [activeTab, setActiveTab] = useState<TabKey>('context');

  // New Observation Form State
  const [obsDate, setObsDate] = useState(
    new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })
  );
  const [obsSituation, setObsSituation] = useState('');
  const [obsConditions, setObsConditions] = useState('');
  const [obsStudentResponse, setObsStudentResponse] = useState('');
  const [obsTeacherReflection, setObsTeacherReflection] = useState('');
  const [obsType, setObsType] = useState<'hecho_observado' | 'reflexion_docente'>('hecho_observado');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSubmitObservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!obsSituation.trim()) return;

    const newObs: StudentObservation = {
      id: `obs-${Date.now()}`,
      date: obsDate,
      situation: obsSituation,
      activityConditions: obsConditions || 'Clase regular de aula',
      studentResponse: obsStudentResponse || 'Respuesta documentada por el docente',
      teacherReflection: obsTeacherReflection,
      type: obsType,
    };

    onAddObservation(student.id, newObs);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setActiveTab('attention');
      setObsSituation('');
      setObsConditions('');
      setObsStudentResponse('');
      setObsTeacherReflection('');
    }, 1200);
  };

  const tabs = [
    { key: 'context' as TabKey, label: '1. Contexto de aprendizaje', icon: Heart },
    { key: 'attention' as TabKey, label: '2. Observaciones de atención', icon: Eye },
    { key: 'participation' as TabKey, label: '3. Participación activa', icon: Activity },
    { key: 'evolution' as TabKey, label: '4. Evolución pedagógica', icon: TrendingUp },
    { key: 'new_observation' as TabKey, label: '+ Nueva observación', icon: PlusCircle, highlight: true },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-4xl max-h-[92vh] rounded-2xl shadow-xl border border-slate-200 flex flex-col overflow-hidden animate-scale-in">
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 font-semibold text-xs">
              {student.internalCode}
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>{anonymizeData ? student.internalCode : student.studentName}</span>
                <span className="text-xs text-teal-300 font-normal">
                  ({student.grade} · {student.schoolGroup})
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Ficha formativa contextual · Última actualización: <span className="font-mono tabular-nums">{student.lastUpdated}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation (Segmented style) */}
        <div className="px-6 pt-3 border-b border-slate-200 bg-slate-50/60 overflow-x-auto flex gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-teal-600 text-teal-800 bg-white shadow-2xs rounded-t-lg'
                    : tab.highlight
                    ? 'border-transparent text-indigo-700 hover:text-indigo-900'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 rounded-t-lg'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: CONTEXTO DE APRENDIZAJE */}
          {activeTab === 'context' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Intereses personales */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                  <h4 className="text-xs font-semibold text-slate-900 flex items-center gap-1.5 mb-2">
                    <Heart className="w-3.5 h-3.5 text-teal-600" />
                    <span>Intereses personales relevantes para actividades</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {student.learningContext.personalInterests.map((interest, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                        <span>{interest}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Temas que despiertan curiosidad */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                  <h4 className="text-xs font-semibold text-slate-900 flex items-center gap-1.5 mb-2">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Temas que despiertan su curiosidad espontánea</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {student.learningContext.curiosityTopics.map((topic, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actividades que facilitan su participación */}
              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
                <h4 className="text-xs font-semibold text-slate-900 mb-2">
                  Actividades que facilitan su participación
                </h4>
                <div className="space-y-2 text-xs text-slate-700">
                  {student.learningContext.facilitatingActivities.map((act, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Preferencias de trabajo */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                  <h4 className="text-xs font-semibold text-slate-900 mb-2">
                    Preferencias de trabajo observadas
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {student.learningContext.workPreferences.map((pref, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                        <span>{pref}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recursos o apoyos que favorecen su aprendizaje */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                  <h4 className="text-xs font-semibold text-slate-900 mb-2">
                    Recursos o apoyos que favorecen su aprendizaje
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {student.learningContext.favorableSupports.map((sup, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                        <span>{sup}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: OBSERVACIONES SOBRE LA ATENCIÓN */}
          {activeTab === 'attention' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Actividades con mejor foco */}
                <div className="bg-teal-50/50 p-4 rounded-xl border border-teal-200/80">
                  <h4 className="text-xs font-semibold text-teal-950 mb-2">
                    Actividades en las que mantiene mejor la atención
                  </h4>
                  <ul className="space-y-2 text-xs text-teal-900">
                    {student.attentionObservations.bestFocusActivities.map((act, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Situaciones en las que suele distraerse */}
                <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200/80">
                  <h4 className="text-xs font-semibold text-amber-950 mb-2">
                    Situaciones en las que suele distraerse
                  </h4>
                  <ul className="space-y-2 text-xs text-amber-900">
                    {student.attentionObservations.distractionTriggers.map((trig, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{trig}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Momentos y condiciones */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                  <h4 className="font-semibold text-slate-900 mb-1.5">
                    Momentos óptimos de la jornada
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    {student.attentionObservations.optimalClassMoments.join(' · ')}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                  <h4 className="font-semibold text-slate-900 mb-1.5">
                    Condiciones del entorno que favorecen la concentración
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    {student.attentionObservations.favorableEnvironmentConditions.join(' · ')}
                  </p>
                </div>
              </div>

              {/* Registro de observaciones concretas */}
              <div>
                <h4 className="text-xs font-semibold text-slate-900 mb-3">
                  Observaciones concretas registradas por el docente
                </h4>
                <div className="space-y-3">
                  {student.attentionObservations.specificNotes.map((note) => (
                    <div key={note.id} className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs text-xs space-y-2">
                      <div className="flex items-center justify-between text-slate-500">
                        <span className="font-semibold text-slate-800 font-mono tabular-nums">{note.date}</span>
                        <span className="text-[11px] font-medium text-slate-500">
                          {note.type === 'hecho_observado' ? 'Hecho Observado' : 'Reflexión Docente'}
                        </span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">
                        <strong className="text-slate-900 font-medium">Situación: </strong>
                        {note.situation}
                      </p>
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-slate-600 text-[11px]">
                        <strong>Condiciones:</strong> {note.activityConditions} · <strong>Respuesta:</strong> {note.studentResponse}
                      </div>
                      {note.teacherReflection && (
                        <p className="text-teal-900 bg-teal-50/50 p-2.5 rounded-lg border border-teal-100 text-[11px] leading-relaxed">
                          <strong className="text-teal-950 font-medium">Reflexión pedagógica: </strong>
                          {note.teacherReflection}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PARTICIPACIÓN ACTIVA */}
          {activeTab === 'participation' && (
            <div className="space-y-6">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <h4 className="text-xs font-semibold text-slate-900 mb-2">
                  Formas habituales de participación
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {student.activeParticipation.habitualForms.map((form, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0" />
                      <span>{form}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Respuesta según modalidad */}
              <div>
                <h4 className="text-xs font-semibold text-slate-900 mb-3">
                  Respuesta observada ante diferentes modalidades
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                    <span className="font-semibold text-slate-800 block mb-1">Individual</span>
                    <p className="text-slate-600 leading-relaxed">{student.activeParticipation.responseToFormats.individual}</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                    <span className="font-semibold text-slate-800 block mb-1">Colaborativa (Equipos)</span>
                    <p className="text-slate-600 leading-relaxed">{student.activeParticipation.responseToFormats.collaborative}</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                    <span className="font-semibold text-slate-800 block mb-1">Lúdica y Juegos</span>
                    <p className="text-slate-600 leading-relaxed">{student.activeParticipation.responseToFormats.ludic}</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                    <span className="font-semibold text-slate-800 block mb-1">Práctica y Táctil</span>
                    <p className="text-slate-600 leading-relaxed">{student.activeParticipation.responseToFormats.handsOn}</p>
                  </div>
                </div>
              </div>

              {/* Iniciativa e Interacción */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                  <h4 className="font-semibold text-slate-900 mb-2">Interacciones con el grupo</h4>
                  <p className="text-slate-600 leading-relaxed">{student.activeParticipation.groupInteractions}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                  <h4 className="font-semibold text-slate-900 mb-2">Oportunidades de iniciativa destacadas</h4>
                  <ul className="space-y-1.5 text-slate-700">
                    {student.activeParticipation.initiativeMoments.map((init, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-teal-600 font-bold">·</span>
                        <span>{init}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: EVOLUCIÓN PEDAGÓGICA */}
          {activeTab === 'evolution' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-500 mb-2">
                Registro cronológico de intervenciones implementadas y transformaciones en la atención o participación:
              </div>

              <div className="space-y-4">
                {student.pedagogicalEvolution.map((evo, i) => (
                  <div key={i} className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-3 text-xs">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <div className="font-semibold text-slate-900 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-teal-600" />
                        <span>Estrategia: {evo.strategyApplied}</span>
                      </div>
                      <span className="font-mono tabular-nums text-slate-400 text-[11px]">{evo.date}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-600">
                      <div>
                        <strong className="text-slate-800 block mb-0.5">Respuesta observada:</strong>
                        <p>{evo.observedResponse}</p>
                      </div>
                      <div>
                        <strong className="text-slate-800 block mb-0.5">Cambio en la atención:</strong>
                        <p>{evo.attentionChange}</p>
                      </div>
                    </div>

                    <div className="p-3 bg-teal-50/50 rounded-lg border border-teal-100 text-teal-900 text-[11px] leading-relaxed">
                      <strong>Ajuste recomendado para futuras actividades: </strong>
                      {evo.futureAdjustment}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CREAR NUEVA OBSERVACIÓN */}
          {activeTab === 'new_observation' && (
            <form onSubmit={handleSubmitObservation} className="space-y-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h4 className="font-semibold text-slate-900">
                    Registrar nueva observación formativa
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    Para {anonymizeData ? student.internalCode : student.studentName}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">
                      Fecha de observación *
                    </label>
                    <input
                      type="text"
                      value={obsDate}
                      onChange={(e) => setObsDate(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-medium mb-1">
                      Enfoque del registro *
                    </label>
                    <select
                      value={obsType}
                      onChange={(e) => setObsType(e.target.value as any)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                    >
                      <option value="hecho_observado">Hecho concreto observado (descriptivo)</option>
                      <option value="reflexion_docente">Reflexión pedagógica del docente (analítico)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    Situación observada (hechos concretos) *
                  </label>
                  <textarea
                    rows={2}
                    value={obsSituation}
                    onChange={(e) => setObsSituation(e.target.value)}
                    placeholder="Describe qué ocurrió exactamente durante la sesión..."
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">
                      Condiciones de la actividad
                    </label>
                    <input
                      type="text"
                      value={obsConditions}
                      onChange={(e) => setObsConditions(e.target.value)}
                      placeholder="Ej. Explicación colectiva, trabajo en parejas, juego de mesa..."
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-medium mb-1">
                      Respuesta del estudiante
                    </label>
                    <input
                      type="text"
                      value={obsStudentResponse}
                      onChange={(e) => setObsStudentResponse(e.target.value)}
                      placeholder="Ej. Foco sostenido durante 18 min, iniciativa verbal espontánea..."
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    Reflexión pedagógica docente (hipótesis o ajuste a futuro)
                  </label>
                  <textarea
                    rows={2}
                    value={obsTeacherReflection}
                    onChange={(e) => setObsTeacherReflection(e.target.value)}
                    placeholder="¿Qué significado pedagógico tiene esto para futuras clases?"
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>

                {saveSuccess && (
                  <div className="p-3 bg-teal-100 border border-teal-300 text-teal-900 rounded-lg flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-700" />
                    <span>¡Bitácora actualizada exitosamente!</span>
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white font-medium rounded-xl transition-colors shadow-2xs cursor-pointer"
                  >
                    Actualizar bitácora
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Modal Bottom Ethical Bar */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
            <span>Datos cualitativos formativos protegidos institucionalmente</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:bg-white text-slate-700 font-medium transition-colors cursor-pointer"
          >
            Cerrar ficha
          </button>
        </div>
      </div>
    </div>
  );
};
