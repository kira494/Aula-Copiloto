import React from 'react';
import { 
  Sparkles, 
  Users, 
  BookOpen, 
  Lightbulb, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  FileText, 
  PlusCircle, 
  Calendar,
  Compass,
  AlertCircle,
  Eye,
  ChevronRight
} from 'lucide-react';
import { ClassroomSituation, NavigationSection, StudentBitacora } from '../../types';

interface TeacherDashboardProps {
  situations: ClassroomSituation[];
  students: StudentBitacora[];
  onSelectSection: (section: NavigationSection) => void;
  onSelectSituation: (situation: ClassroomSituation) => void;
  onOpenNewObservation: () => void;
  anonymizeData: boolean;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  situations,
  students,
  onSelectSection,
  onSelectSituation,
  onOpenNewObservation,
  anonymizeData,
}) => {
  const recentSituations = situations.slice(0, 3);

  const getStatusBadge = (status: ClassroomSituation['status']) => {
    switch (status) {
      case 'estrategia_generada':
        return { label: 'Estrategia lista', style: 'text-teal-700 bg-teal-50 border-teal-200' };
      case 'aplicada':
        return { label: 'Intervención evaluada', style: 'text-indigo-700 bg-indigo-50 border-indigo-200' };
      case 'analizada':
        return { label: 'Análisis completo', style: 'text-blue-700 bg-blue-50 border-blue-200' };
      default:
        return { label: 'Borrador', style: 'text-slate-600 bg-slate-100 border-slate-200' };
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Welcome Hero Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-sm relative overflow-hidden">
        {/* Subtle decorative geometry backdrop */}
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-40 -bottom-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-medium text-teal-300 mb-2">
            <Compass className="w-4 h-4" />
            <span>Copiloto Didáctico para Básica Primaria (3.° y 4.°)</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3 text-balance">
            ¡Hola, docente! ¿Qué está ocurriendo hoy en tu aula?
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed mb-6 max-w-xl">
            Describe la situación de tu grupo, consulta el contexto de tus estudiantes y diseña estrategias didácticas adaptadas a sus necesidades reales para potenciar la atención sostenida y la participación activa.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onSelectSection('classroom-analysis')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 active:bg-teal-600 text-slate-950 font-semibold text-xs transition-colors shadow-sm cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Analizar una situación de aula</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectSection('student-bitacora')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
            >
              <BookOpen className="w-4 h-4 text-slate-400" />
              <span>Consultar bitácora contextual</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Essential Metrics Strip (Tabular Figures) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Estudiantes registrados</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            {students.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5">
            <span>3.° y 4.° de Primaria</span>
            <span aria-hidden="true">·</span>
            <span>2 grupos</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Bitácoras actualizadas</span>
            <BookOpen className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-bold text-teal-700 font-mono tabular-nums">
            {students.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5">
            <span>100% con registro formativo</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Estrategias diseñadas</span>
            <Lightbulb className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-indigo-700 font-mono tabular-nums">
            {8 + situations.filter(s => s.status === 'estrategia_generada' || s.status === 'aplicada').length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5">
            <span>8 en biblioteca</span>
            <span aria-hidden="true">·</span>
            <span>{situations.filter(s => s.status === 'estrategia_generada' || s.status === 'aplicada').length} activas</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Intervenciones realizadas</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            {situations.filter(s => s.status === 'aplicada').length || 2}
          </div>
          <div className="text-[11px] text-emerald-700 mt-1 flex items-center gap-1.5">
            <span>Evaluadas con rúbrica</span>
          </div>
        </div>
      </div>

      {/* Retomar mi trabajo (Recent Classroom Situations) */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200/80 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Retomar mi trabajo
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Situaciones de aula analizadas recientemente y estado de las propuestas
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelectSection('classroom-analysis')}
            className="text-xs font-medium text-teal-700 hover:text-teal-800 inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Nuevo análisis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {recentSituations.map((sit) => {
            const badge = getStatusBadge(sit.status);
            return (
              <div 
                key={sit.id} 
                className="p-5 hover:bg-slate-50/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 min-w-0 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-slate-800">{sit.grade}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-600">{sit.subject}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums text-slate-400">{sit.date}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-medium text-teal-700">
                      {badge.label}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-slate-900 leading-snug">
                    {sit.topic}
                  </h4>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    <strong className="font-medium text-slate-700">Objetivo: </strong>
                    {sit.learningGoal}
                  </p>

                  <div className="text-[11px] text-slate-400 flex items-center gap-2 pt-0.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{sit.durationMinutes} min disponibles</span>
                    <span aria-hidden="true">·</span>
                    <span>{sit.studentCount} estudiantes</span>
                    <span aria-hidden="true">·</span>
                    <span>{sit.selectedDifficulties.length} focos detectados</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectSituation(sit);
                      onSelectSection('strategy-results');
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-teal-600" />
                    <span>Ver propuesta</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Acceso Rápido (3 Key Action Cards) */}
      <div>
        <div className="mb-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Acceso Rápido
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Registrar una observación */}
          <div 
            onClick={onOpenNewObservation}
            className="group bg-white p-5 rounded-xl border border-slate-200/80 hover:border-teal-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 mb-3 group-hover:bg-teal-100 transition-colors">
                <PlusCircle className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">
                Registrar una observación
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Documenta hechos concretos sobre la atención o participación de un estudiante sin etiquetar.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-medium text-teal-700">
              <span>Registrar ahora</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Card 2: Consultar una bitácora */}
          <div 
            onClick={() => onSelectSection('student-bitacora')}
            className="group bg-white p-5 rounded-xl border border-slate-200/80 hover:border-indigo-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 mb-3 group-hover:bg-indigo-100 transition-colors">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors">
                Consultar una bitácora
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Revisa los intereses, apoyos que favorecen y evolución pedagógica de cada estudiante.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-medium text-indigo-700">
              <span>Abrir bitácoras</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Card 3: Diseñar una nueva estrategia */}
          <div 
            onClick={() => onSelectSection('classroom-analysis')}
            className="group bg-white p-5 rounded-xl border border-slate-200/80 hover:border-violet-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-violet-50 border border-violet-200 flex items-center justify-center text-violet-700 mb-3 group-hover:bg-violet-100 transition-colors">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-semibold text-slate-900 group-hover:text-violet-700 transition-colors">
                Diseñar una nueva estrategia
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Ingresa una dificultad de clase y genera 3 alternativas didácticas adaptadas a tu grupo.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-medium text-violet-700">
              <span>Iniciar análisis</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Pedagogical Principle Callout (Unboxed text with subtle separator) */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 leading-relaxed">
          <span className="font-semibold text-slate-800">Marco de Trabajo AulaCopiloto: </span>
          Las bitácoras funcionan como registros formativos evolutivos para comprender las condiciones en las que cada estudiante aprende mejor. La inteligencia artificial actúa como asistente consultor; el docente es quien evalúa, decide y ajusta cada intervención.
        </div>
      </div>
    </div>
  );
};
