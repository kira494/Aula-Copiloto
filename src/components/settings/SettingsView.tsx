import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  School, 
  User, 
  HelpCircle, 
  CheckCircle2, 
  Save,
  Info,
  FileText,
  Database,
  RotateCcw
} from 'lucide-react';

interface SettingsViewProps {
  anonymizeData: boolean;
  onToggleAnonymize: () => void;
  onOpenEthicsModal: () => void;
  onResetAllData?: () => void;
}

const TEACHER_PROFILE_STORAGE_KEY = 'aulacopiloto_teacher_profile_v1';

export const SettingsView: React.FC<SettingsViewProps> = ({
  anonymizeData,
  onToggleAnonymize,
  onOpenEthicsModal,
  onResetAllData,
}) => {
  const [teacherName, setTeacherName] = useState('Mariana Restrepo Gómez');
  const [institution, setInstitution] = useState('Institución Educativa Mogambo');
  const [city, setCity] = useState('Montería, Córdoba - Colombia');
  const [gradesAssigned, setGradesAssigned] = useState('3.° A y 4.° B de Básica Primaria');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(TEACHER_PROFILE_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.teacherName) setTeacherName(parsed.teacherName);
        if (parsed.institution) setInstitution(parsed.institution);
        if (parsed.city) setCity(parsed.city);
        if (parsed.gradesAssigned) setGradesAssigned(parsed.gradesAssigned);
      }
    } catch {
      // Ignore storage read errors
    }
  }, []);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem(
        TEACHER_PROFILE_STORAGE_KEY,
        JSON.stringify({ teacherName, institution, city, gradesAssigned })
      );
    } catch {
      // Ignore storage write errors
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-5">
        <div className="flex items-center gap-2 text-xs font-medium text-teal-700 mb-1">
          <Settings className="w-4 h-4" />
          <span>Configuración del Sistema y Principios Éticos</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Configuración y Privacidad Pedagógica
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Ajusta los parámetros de tu perfil docente, gestiona los controles de privacidad, verifica el almacenamiento persistente en navegador y consulta los compromisos deontológicos de AulaCopiloto AI.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-teal-600" />
          <span>Ajustes del perfil docente guardados persistentemente en este navegador.</span>
        </div>
      )}

      {/* Privacy and Ethics Controls Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-5">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>Privacidad y Protección de Datos Formativos</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Cumplimiento con la protección de identidad de menores en educación primaria
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenEthicsModal}
            className="text-xs text-teal-700 hover:text-teal-800 font-medium inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Ver decálogo ético</span>
            <HelpCircle className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Anonymization Mode Switch */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-slate-900 flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-slate-600" />
              <span>Modo de Identificadores Anónimos (Recomendado)</span>
            </div>
            <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
              Sustituye los nombres en pantalla por códigos internos (ej. E-301 en lugar de Samuel Calderón) para presentaciones o consultas colaborativas seguras.
            </p>
          </div>

          <button
            type="button"
            onClick={onToggleAnonymize}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap ${
              anonymizeData
                ? 'bg-teal-600 border-teal-600 text-white shadow-2xs'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {anonymizeData ? '✓ Modo Anónimo Activo' : 'Activar Modo Anónimo'}
          </button>
        </div>

        {/* Ethical principles highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-white border border-slate-200/80 space-y-1">
            <strong className="text-slate-800">Cero etiquetas diagnósticas:</strong>
            <p className="text-slate-600 leading-relaxed">
              La plataforma no infiere patologías, trastornos ni condiciones clínicas. Se limita a describir condiciones didácticas favorables.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-white border border-slate-200/80 space-y-1">
            <strong className="text-slate-800">Control docente irrenunciable:</strong>
            <p className="text-slate-600 leading-relaxed">
              La IA solo sugiere hipótesis didácticas; la decisión pedagógica y su ejecución recae siempre en el juicio profesional del docente.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-white border border-slate-200/80 space-y-1">
            <strong className="text-slate-800">No compartición automática:</strong>
            <p className="text-slate-600 leading-relaxed">
              Las bitácoras pertenecen al docente y a su contexto de aula; no se comparten automáticamente ni se comercializan.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-white border border-slate-200/80 space-y-1">
            <strong className="text-slate-800">Distinción hechos vs interpretaciones:</strong>
            <p className="text-slate-600 leading-relaxed">
              Los registros separan claramente los hechos observados en la sesión de las hipótesis interpretativas del docente.
            </p>
          </div>
        </div>
      </div>

      {/* Local Storage Persistence Management Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Database className="w-4 h-4 text-teal-600" />
              <span>Persistencia Local de Datos (LocalStorage)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Todas las bitácoras, observaciones, situaciones, estrategias e intervenciones se conservan automáticamente al recargar la página.
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-md bg-teal-50 text-teal-800 border border-teal-200 text-[11px] font-semibold">
            Sincronización Activa
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
          <div className="space-y-1">
            <p className="font-semibold text-slate-800">Restaurar datos demostrativos originales</p>
            <p className="text-slate-500 max-w-lg leading-relaxed">
              Si deseas reiniciar la aplicación a su estado original de fábrica (borrando las pruebas locales creadas en el navegador), utiliza este control.
            </p>
          </div>

          {onResetAllData && (
            <div className="flex items-center gap-2 shrink-0">
              {!resetConfirm ? (
                <button
                  type="button"
                  onClick={() => setResetConfirm(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-medium cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restaurar datos iniciales</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onResetAllData();
                      setResetConfirm(false);
                    }}
                    className="px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold cursor-pointer"
                  >
                    Confirmar reinicio
                  </button>
                  <button
                    type="button"
                    onClick={() => setResetConfirm(false)}
                    className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 cursor-pointer"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Teacher Profile Form */}
      <form onSubmit={handleSaveSettings} className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-600" />
            <span>Perfil Institucional del Docente</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Datos institucionales asociados a la generación contextual
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Nombre del Docente *
            </label>
            <input
              type="text"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Institución Educativa *
            </label>
            <input
              type="text"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Ciudad / Región
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Grados a Cargo
            </label>
            <input
              type="text"
              value={gradesAssigned}
              onChange={(e) => setGradesAssigned(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-100">
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-medium transition-colors cursor-pointer shadow-2xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Guardar cambios</span>
          </button>
        </div>
      </form>
    </div>
  );
};

