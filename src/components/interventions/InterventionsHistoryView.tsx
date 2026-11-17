import React, { useState } from 'react';
import { 
  History, 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Filter, 
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { InterventionRecord } from '../../types';

interface InterventionsHistoryViewProps {
  interventions: InterventionRecord[];
  onSelectIntervention: (record: InterventionRecord) => void;
  anonymizeData: boolean;
}

export const InterventionsHistoryView: React.FC<InterventionsHistoryViewProps> = ({
  interventions,
  onSelectIntervention,
  anonymizeData,
}) => {
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<'all' | '3.°' | '4.°'>('all');

  const filtered = interventions.filter(item => {
    if (selectedGradeFilter === 'all') return true;
    return item.grade.includes(selectedGradeFilter);
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-5">
        <div className="flex items-center gap-2 text-xs font-medium text-teal-700 mb-1">
          <History className="w-4 h-4" />
          <span>Seguimiento y Registro de Resultados</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Historial de intervenciones en el aula
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Consulta las estrategias aplicadas anteriormente, contrasta la línea de base con los resultados observados y revisa las reflexiones pedagógicas docentes.
        </p>
      </div>

      {/* Filter strip */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="font-medium">Filtrar por grado:</span>
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => setSelectedGradeFilter('all')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                selectedGradeFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos los grados
            </button>
            <button
              type="button"
              onClick={() => setSelectedGradeFilter('3.°')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                selectedGradeFilter === '3.°' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              3.° Primaria
            </button>
            <button
              type="button"
              onClick={() => setSelectedGradeFilter('4.°')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                selectedGradeFilter === '4.°' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              4.° Primaria
            </button>
          </div>
        </div>

        <div className="text-xs text-slate-500 font-mono tabular-nums">
          {filtered.length} intervenciones registradas
        </div>
      </div>

      {/* Timeline / Card List */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div 
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4 hover:border-slate-300 transition-colors"
          >
            {/* Top metadata */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900">{item.grade}</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-700">{item.subject}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums text-slate-400">{item.date}</span>
              </div>

              <div className="flex items-center gap-2 text-slate-600">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate max-w-xs">{item.targetGroupOrStudents}</span>
              </div>
            </div>

            {/* Strategy Title */}
            <div>
              <div className="text-xs font-semibold text-teal-700 mb-1">
                Estrategia aplicada:
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {item.strategyName}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Tema curricular: {item.topic}
              </p>
            </div>

            {/* Comparison: Baseline vs Observed Result */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Baseline */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h4 className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-slate-500" />
                  <span>Situación inicial (Línea de base)</span>
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {item.initialSituation}
                </p>
              </div>

              {/* Observed Result */}
              <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-200 space-y-1.5">
                <h4 className="font-semibold text-teal-950 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-teal-700" />
                  <span>Resultado observable en aula</span>
                </h4>
                <p className="text-teal-900 leading-relaxed">
                  {item.observedOutcome}
                </p>
              </div>
            </div>

            {/* Quantitative Observation Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-1 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Atención sostenida</span>
                <span className="font-semibold text-slate-900 font-mono tabular-nums text-sm">
                  {item.engagementMinutes} min
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Participación activa</span>
                <span className="font-semibold text-slate-900 font-mono tabular-nums text-sm">
                  {item.participationPercentage}% del grupo
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Foco de atención</span>
                <span className="font-semibold text-teal-700 font-mono tabular-nums text-sm">
                  {item.ratingAttention} / 5
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Involucramiento</span>
                <span className="font-semibold text-indigo-700 font-mono tabular-nums text-sm">
                  {item.ratingParticipation} / 5
                </span>
              </div>
            </div>

            {/* Teacher Reflection */}
            <div className="p-4 rounded-xl bg-indigo-50/40 border border-indigo-100 text-xs space-y-1.5">
              <h4 className="font-semibold text-indigo-950">
                Reflexión pedagógica del docente
              </h4>
              <p className="text-indigo-900 leading-relaxed">
                {item.teacherReflection}
              </p>
              <div className="text-[11px] text-slate-500 pt-1">
                <strong>Ajuste recomendado para futuras sesiones:</strong> {item.recommendedAdjustments}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer disclaimer */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-slate-800">Evaluación formativa cautelosa: </strong>
          Los cambios en la atención y la participación están multideterminados por el clima, la hora del día, la motivación intrínseca y la dinámica vincular. Las comparaciones deben orientar la reflexión profesional del docente sin atribuir causalidad automática a la intervención.
        </div>
      </div>
    </div>
  );
};
