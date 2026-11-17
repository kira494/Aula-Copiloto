import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Plus, 
  Eye, 
  User, 
  Calendar, 
  Sparkles, 
  ChevronRight,
  ShieldAlert,
  ArrowUpDown
} from 'lucide-react';
import { StudentBitacora } from '../../types';

interface StudentBitacoraListProps {
  students: StudentBitacora[];
  onSelectStudent: (student: StudentBitacora) => void;
  onOpenNewObservation: () => void;
  onOpenNewStudent?: () => void;
  anonymizeData: boolean;
}

export const StudentBitacoraList: React.FC<StudentBitacoraListProps> = ({
  students,
  onSelectStudent,
  onOpenNewObservation,
  onOpenNewStudent,
  anonymizeData,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<'all' | '3.° Primaria' | '4.° Primaria'>('all');
  const [selectedInterestFilter, setSelectedInterestFilter] = useState<string>('all');

  // Extract unique interests for filtering
  const allInterests = Array.from(
    new Set(students.flatMap(s => s.learningContext.personalInterests))
  );

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.internalCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.learningContext.personalInterests.some(i => i.toLowerCase().includes(searchQuery.toLowerCase())) ||
      student.learningContext.curiosityTopics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesGrade = selectedGradeFilter === 'all' || student.grade === selectedGradeFilter;
    const matchesInterest = selectedInterestFilter === 'all' || student.learningContext.personalInterests.includes(selectedInterestFilter);

    return matchesSearch && matchesGrade && matchesInterest;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-teal-700 mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Registro Formativo Evolutivo · Persistencia Local Activa</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Bitácora contextual de estudiantes
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Espacio formativo para comprender las condiciones pedagógicas en las que cada estudiante aprende y participa. No constituye un expediente clínico ni un etiquetado diagnóstico.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-center shrink-0">
          {onOpenNewStudent && (
            <button
              type="button"
              onClick={onOpenNewStudent}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-medium text-xs transition-colors shadow-2xs cursor-pointer"
            >
              <User className="w-4 h-4 text-teal-600" />
              <span>Nuevo estudiante</span>
            </button>
          )}
          <button
            type="button"
            onClick={onOpenNewObservation}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white font-medium text-xs transition-colors shadow-2xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Registrar nueva observación</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Search box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por código, nombre o intereses..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors"
            />
          </div>

          {/* Grade filter */}
          <div>
            <select
              value={selectedGradeFilter}
              onChange={(e) => setSelectedGradeFilter(e.target.value as any)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors cursor-pointer"
            >
              <option value="all">Todos los grados (3.° y 4.°)</option>
              <option value="3.° Primaria">Solo 3.° Primaria</option>
              <option value="4.° Primaria">Solo 4.° Primaria</option>
            </select>
          </div>

          {/* Interest filter */}
          <div>
            <select
              value={selectedInterestFilter}
              onChange={(e) => setSelectedInterestFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors cursor-pointer"
            >
              <option value="all">Filtrar por interés o motivador</option>
              {allInterests.map(interest => (
                <option key={interest} value={interest}>{interest}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Counter & unboxed metadata */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <div className="flex items-center gap-2">
            <span>Mostrando {filteredStudents.length} de {students.length} bitácoras</span>
            <span aria-hidden="true">·</span>
            <span>Actualizadas al ciclo lectivo 2026</span>
          </div>
          {(selectedGradeFilter !== 'all' || selectedInterestFilter !== 'all' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedGradeFilter('all');
                setSelectedInterestFilter('all');
              }}
              className="text-xs text-teal-700 hover:text-teal-800 font-medium cursor-pointer"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Students Table / Grid */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                <th className="py-3 px-4">Estudiante / Código</th>
                <th className="py-3 px-4">Grado</th>
                <th className="py-3 px-4">Intereses y Motivadores</th>
                <th className="py-3 px-4">Modalidad Favorable</th>
                <th className="py-3 px-4">Última Observación</th>
                <th className="py-3 px-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredStudents.map((student) => {
                const latestNote = student.attentionObservations.specificNotes[0];
                return (
                  <tr 
                    key={student.id}
                    onClick={() => onSelectStudent(student)}
                    className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                  >
                    {/* Name / Code */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">
                        {anonymizeData ? student.internalCode : student.studentName}
                      </div>
                      <div className="text-[11px] font-mono tabular-nums text-slate-400">
                        {student.internalCode} · {student.schoolGroup}
                      </div>
                    </td>

                    {/* Grade */}
                    <td className="py-3.5 px-4 font-medium text-slate-700">
                      {student.grade}
                    </td>

                    {/* Interests */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="text-slate-600 truncate">
                        {student.learningContext.personalInterests.slice(0, 3).join(', ')}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate mt-0.5">
                        Curiosidad: {student.learningContext.curiosityTopics[0] || 'Varios'}
                      </div>
                    </td>

                    {/* Favorable modalities */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="text-slate-600 truncate">
                        {student.learningContext.facilitatingActivities[0]}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate mt-0.5">
                        {student.learningContext.workPreferences[0]}
                      </div>
                    </td>

                    {/* Latest Observation */}
                    <td className="py-3.5 px-4 max-w-sm">
                      {latestNote ? (
                        <div>
                          <div className="text-slate-600 line-clamp-1">
                            {latestNote.situation}
                          </div>
                          <div className="text-[11px] font-mono tabular-nums text-slate-400 mt-0.5">
                            {latestNote.date}
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-400">Sin notas recientes</span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectStudent(student);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-slate-700 font-medium text-xs transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Ficha</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="p-8 text-center text-xs text-slate-500">
            No se encontraron bitácoras que coincidan con los filtros aplicados.
          </div>
        )}
      </div>

      {/* Ethical Guidance Footer Note */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex items-start gap-3">
        <ShieldAlert className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 leading-relaxed">
          <strong className="text-slate-800">Principio formativo: </strong>
          La bitácora recopila hechos observados y respuestas a estímulos pedagógicos para descubrir qué condiciones favorecen la atención y la participación de cada estudiante. No contiene diagnósticos clínicos, juicios sobre capacidades fijas ni etiquetas personales.
        </div>
      </div>
    </div>
  );
};
