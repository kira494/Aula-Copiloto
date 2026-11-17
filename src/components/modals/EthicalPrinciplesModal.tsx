import React from 'react';
import { X, ShieldCheck, CheckCircle2, Lock, Eye, AlertCircle, HeartHandshake, UserCheck } from 'lucide-react';

interface EthicalPrinciplesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EthicalPrinciplesModal: React.FC<EthicalPrinciplesModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const principles = [
    {
      title: '1. Propósito formativo y no patologizante',
      desc: 'La bitácora y el agente inteligente exploran bajo qué condiciones didácticas (ritmos, materiales, modalidades) un estudiante aprende mejor. En ningún caso se infieren diagnósticos médicos, trastornos del desarrollo ni clasificaciones psicológicas.',
      icon: HeartHandshake
    },
    {
      title: '2. Primacía del juicio y control docente',
      desc: 'La inteligencia artificial actúa como copiloto consultor y generador de borradores. La decisión pedagógica, la selección de alternativas y la valoración real del impacto en el aula pertenecen irrenunciablemente al docente.',
      icon: UserCheck
    },
    {
      title: '3. Distinción explícita de hechos e interpretaciones',
      desc: 'Los registros y los análisis diferencian estrictamente los hechos observados (lo que ocurrió en clase de manera verificable) de las hipótesis pedagógicas propuestas por la IA o el docente.',
      icon: Eye
    },
    {
      title: '4. Protección de la intimidad y anonimización',
      desc: 'No se solicita ni almacena información familiar sensible, socioeconómica ni privada que no sea estrictamente pedagógica. La plataforma permite operar en modo de identificadores anónimos (ej. E-301) en todo momento.',
      icon: Lock
    },
    {
      title: '5. Contexto colombiano y equidad de recursos',
      desc: 'Las estrategias se diseñan pensando en aulas reales de básica primaria en Colombia y Latinoamérica: no asumen conectividad a internet de alta velocidad ni proyectores en cada aula; priorizan materiales manipulativos, dinámicas dialógicas y trabajo cooperativo.',
      icon: ShieldCheck
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-xl border border-slate-200 flex flex-col overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Principios Éticos y Pedagógicos de AulaCopiloto AI
              </h3>
              <p className="text-[11px] text-slate-400">
                Compromiso deontológico con la práctica docente y la infancia
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

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
          <div className="p-3.5 bg-teal-50/60 rounded-xl border border-teal-200 text-teal-900 leading-relaxed">
            <strong>Declaración de principios: </strong>
            AulaCopiloto AI concibe la tecnología como un andamiaje para amplificar la sensibilidad pedagógica del maestro, garantizando el respeto absoluto a la dignidad y singularidad de cada niño y niña en básica primaria.
          </div>

          <div className="space-y-3 pt-2">
            {principles.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/60 space-y-1">
                  <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                    <Icon className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>{item.title}</span>
                  </h4>
                  <p className="text-slate-600 pl-6 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-medium cursor-pointer"
          >
            Entendido y aceptado
          </button>
        </div>
      </div>
    </div>
  );
};
