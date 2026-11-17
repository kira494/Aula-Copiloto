import React, { useState } from 'react';
import { X, PlusCircle, CheckCircle2, User, Calendar, BookOpen } from 'lucide-react';
import { StudentBitacora, StudentObservation } from '../../types';

interface NewObservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: StudentBitacora[];
  onAddObservation: (studentId: string, observation: StudentObservation) => void;
  anonymizeData: boolean;
}

export const NewObservationModal: React.FC<NewObservationModalProps> = ({
  isOpen,
  onClose,
  students,
  onAddObservation,
  anonymizeData,
}) => {
  if (!isOpen) return null;

  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || '');
  const [obsDate, setObsDate] = useState(
    new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })
  );
  const [situation, setSituation] = useState('');
  const [conditions, setConditions] = useState('');
  const [studentResponse, setStudentResponse] = useState('');
  const [teacherReflection, setTeacherReflection] = useState('');
  const [obsType, setObsType] = useState<'hecho_observado' | 'reflexion_docente'>('hecho_observado');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!situation.trim() || !selectedStudentId) return;

    const newObs: StudentObservation = {
      id: `obs-quick-${Date.now()}`,
      date: obsDate,
      situation,
      activityConditions: conditions || 'Actividad general de clase',
      studentResponse: studentResponse || 'Registrada por el docente',
      teacherReflection,
      type: obsType,
    };

    onAddObservation(selectedStudentId, newObs);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-slate-200 flex flex-col overflow-hidden animate-scale-in text-xs">
        {/* Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-teal-400" />
            <h3 className="text-sm font-bold text-white">
              Registrar Observación de Aula
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Seleccionar Estudiante *
            </label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            >
              {students.map((st) => (
                <option key={st.id} value={st.id}>
                  {anonymizeData ? st.internalCode : st.studentName} ({st.grade} · {st.schoolGroup})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Fecha *
              </label>
              <input
                type="text"
                value={obsDate}
                onChange={(e) => setObsDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Tipo de registro
              </label>
              <select
                value={obsType}
                onChange={(e) => setObsType(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              >
                <option value="hecho_observado">Hecho concreto</option>
                <option value="reflexion_docente">Reflexión docente</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Situación observada *
            </label>
            <textarea
              rows={2}
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder="¿Qué ocurrió durante la clase de manera observable?"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 leading-relaxed"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Condiciones de la actividad
              </label>
              <input
                type="text"
                value={conditions}
                onChange={(e) => setConditions(e.target.value)}
                placeholder="Ej. Parejas, lectura oral..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Respuesta del estudiante
              </label>
              <input
                type="text"
                value={studentResponse}
                onChange={(e) => setStudentResponse(e.target.value)}
                placeholder="Ej. Foco de 20 min..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Reflexión pedagógica (opcional)
            </label>
            <textarea
              rows={2}
              value={teacherReflection}
              onChange={(e) => setTeacherReflection(e.target.value)}
              placeholder="¿Qué hipótesis o idea para la siguiente clase sugiere este hecho?"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white leading-relaxed"
            />
          </div>

          {isSuccess && (
            <div className="p-2.5 bg-teal-100 text-teal-900 rounded-lg flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-teal-700" />
              <span>Observación guardada en la bitácora del estudiante.</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white font-medium rounded-xl shadow-2xs cursor-pointer"
            >
              Guardar observación
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
