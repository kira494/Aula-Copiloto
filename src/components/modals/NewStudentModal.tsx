import React, { useState } from 'react';
import { X, UserPlus, CheckCircle2, Sparkles } from 'lucide-react';
import { StudentBitacora } from '../../types';

interface NewStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStudent: (newStudent: StudentBitacora) => void;
  existingCount: number;
}

export const NewStudentModal: React.FC<NewStudentModalProps> = ({
  isOpen,
  onClose,
  onAddStudent,
  existingCount,
}) => {
  if (!isOpen) return null;

  const nextCodeNumber = 301 + existingCount;
  const [studentName, setStudentName] = useState('');
  const [internalCode, setInternalCode] = useState(`E-${nextCodeNumber}`);
  const [grade, setGrade] = useState<'3.° Primaria' | '4.° Primaria'>('3.° Primaria');
  const [schoolGroup, setSchoolGroup] = useState('Grupo 3.° A - Sede Principal');
  const [interestsInput, setInterestsInput] = useState('Animales, cuentos ilustrados, retos en equipo');
  const [supportsInput, setSupportsInput] = useState('Apoyos visuales en el tablero, manipulación de material concreto');
  const [distractionsInput, setDistractionsInput] = useState('Explicaciones verbales continuas mayores a 10 minutos');
  const [initialObservation, setInitialObservation] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;

    const todayStr = new Date().toLocaleDateString('es-CO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const splitList = (text: string) =>
      text
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

    const newStudent: StudentBitacora = {
      id: `est-${Date.now()}`,
      internalCode: internalCode.trim() || `E-${nextCodeNumber}`,
      studentName: studentName.trim(),
      grade,
      schoolGroup: schoolGroup.trim() || `${grade} - I.E. Mogambo`,
      learningContext: {
        personalInterests: splitList(interestsInput).length > 0 ? splitList(interestsInput) : ['Juegos cooperativos'],
        curiosityTopics: ['Retos prácticos', 'Exploración del entorno'],
        facilitatingActivities: ['Actividades manipulativas', 'Trabajo en parejas con rol asignado'],
        workPreferences: ['Parejas colaborativas', 'Equipos pequeños de 3 o 4 integrantes'],
        favorableSupports: splitList(supportsInput).length > 0 ? splitList(supportsInput) : ['Instrucciones paso a paso'],
      },
      attentionObservations: {
        bestFocusActivities: ['Retos cortos cronometrados', 'Manipulación de tarjetas o fichas'],
        distractionTriggers: splitList(distractionsInput).length > 0 ? splitList(distractionsInput) : ['Inactividad prolongada'],
        optimalClassMoments: ['Primer bloque de la mañana', 'Inicio de actividades prácticas'],
        favorableEnvironmentConditions: ['Ubicación cercana al docente o material visual', 'Metas cortas visibles'],
        specificNotes: initialObservation.trim()
          ? [
              {
                id: `obs-init-${Date.now()}`,
                date: todayStr,
                situation: initialObservation.trim(),
                activityConditions: 'Observación inicial de ingreso a la bitácora',
                studentResponse: 'Muestra disposición favorable ante actividades dinámicas y estructuradas.',
                teacherReflection: 'Se incorpora a la bitácora contextual para personalizar futuros andamiajes didácticos.',
                type: 'hecho_observado',
              },
            ]
          : [],
      },
      activeParticipation: {
        habitualForms: ['Participación en pequeño grupo', 'Demostración práctica con materiales'],
        responseToFormats: {
          individual: 'Requiere acompañamiento gradual para sostener el ritmo.',
          collaborative: 'Participa con entusiasmo cuando tiene un rol claro dentro del equipo.',
          ludic: 'Alta motivación y compromiso ante dinámicas de reto o misión.',
          handsOn: 'Excelente enfoque cuando puede tocar, ordenar o construir objetos.',
        },
        groupInteractions: 'Se integra constructivamente con pares que validan sus ideas.',
        initiativeMoments: ['Cuando el tema conecta con sus intereses personales'],
      },
      pedagogicalEvolution: [],
      lastUpdated: todayStr,
    };

    onAddStudent(newStudent);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-slate-200 flex flex-col overflow-hidden animate-scale-in text-xs max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-teal-400" />
            <h3 className="text-sm font-bold text-white">
              Registrar Nuevo Estudiante en Bitácora
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
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-slate-700 font-medium mb-1">
                Nombre completo del estudiante *
              </label>
              <input
                type="text"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Ej. Camilo Andrés Mendoza"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Código interno
              </label>
              <input
                type="text"
                value={internalCode}
                onChange={(e) => setInternalCode(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Grado escolar *
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value as '3.° Primaria' | '4.° Primaria')}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 cursor-pointer"
              >
                <option value="3.° Primaria">3.° Primaria</option>
                <option value="4.° Primaria">4.° Primaria</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Grupo / Jornada
              </label>
              <input
                type="text"
                value={schoolGroup}
                onChange={(e) => setSchoolGroup(e.target.value)}
                placeholder="Ej. Grupo 3.° A - Mañana"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Intereses personales y motivadores (separados por coma) *
            </label>
            <input
              type="text"
              required
              value={interestsInput}
              onChange={(e) => setInterestsInput(e.target.value)}
              placeholder="Ej. Dinosaurios, fútbol, dibujo, acertijos"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Apoyos pedagógicos que favorecen su aprendizaje (separados por coma)
            </label>
            <input
              type="text"
              value={supportsInput}
              onChange={(e) => setSupportsInput(e.target.value)}
              placeholder="Ej. Material concreto, instrucciones cortas, rol práctico"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Condiciones que suelen dispersar su atención (separadas por coma)
            </label>
            <input
              type="text"
              value={distractionsInput}
              onChange={(e) => setDistractionsInput(e.target.value)}
              placeholder="Ej. Explicaciones largas sin apoyo visual, ruido ambiental"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Observación pedagógica inicial (opcional)
            </label>
            <textarea
              rows={2}
              value={initialObservation}
              onChange={(e) => setInitialObservation(e.target.value)}
              placeholder="Describe un hecho observado recientemente en el aula (sin juicios clínicos)..."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>

          {isSuccess && (
            <div className="p-2.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-900 flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>¡Estudiante registrado y guardado en la bitácora persistente!</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 font-medium cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-medium cursor-pointer shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Guardar en Bitácora</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
