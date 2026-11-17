import React from 'react';
import { 
  Home, 
  Sparkles, 
  BookOpen, 
  Lightbulb, 
  History, 
  Library, 
  Settings, 
  ShieldCheck, 
  User, 
  ChevronRight,
  X
} from 'lucide-react';
import { NavigationSection } from '../../types';

interface SidebarProps {
  currentSection: NavigationSection;
  onSelectSection: (section: NavigationSection) => void;
  isOpenMobile: boolean;
  onToggleMobile: () => void;
  onOpenEthicsModal: () => void;
  anonymizeData: boolean;
  studentCount?: number;
  strategyCount?: number;
  interventionCount?: number;
  catalogCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  onSelectSection,
  isOpenMobile,
  onToggleMobile,
  onOpenEthicsModal,
  anonymizeData,
  studentCount = 4,
  strategyCount = 3,
  interventionCount = 3,
  catalogCount = 8,
}) => {
  const navItems = [
    { 
      id: 'dashboard' as NavigationSection, 
      label: 'Inicio', 
      description: 'Panel general de control',
      icon: Home, 
      count: null 
    },
    { 
      id: 'classroom-analysis' as NavigationSection, 
      label: 'Nuevo análisis de aula', 
      description: 'Diagnóstico y situación',
      icon: Sparkles, 
      count: null, 
      highlight: true 
    },
    { 
      id: 'student-bitacora' as NavigationSection, 
      label: 'Bitácora de estudiantes', 
      description: 'Perfiles formativos y apoyos',
      icon: BookOpen, 
      count: studentCount 
    },
    { 
      id: 'strategy-results' as NavigationSection, 
      label: 'Estrategias didácticas', 
      description: 'Propuestas activas e IA',
      icon: Lightbulb, 
      count: strategyCount 
    },
    { 
      id: 'interventions-history' as NavigationSection, 
      label: 'Historial de intervenciones', 
      description: 'Resultados y seguimiento',
      icon: History, 
      count: interventionCount 
    },
    { 
      id: 'strategy-library' as NavigationSection, 
      label: 'Biblioteca de actividades', 
      description: 'Catálogo de dinámicas DUA',
      icon: Library, 
      count: catalogCount 
    },
    { 
      id: 'settings' as NavigationSection, 
      label: 'Configuración', 
      description: 'Perfil docente y privacidad',
      icon: Settings, 
      count: null 
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={onToggleMobile}
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-900 text-slate-200 border-r border-slate-800 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Area */}
        <div className="h-16 px-5 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500/15 border border-teal-400/30 flex items-center justify-center text-teal-300 font-bold text-sm tracking-tight shadow-2xs">
              AC
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                <span>AulaCopiloto AI</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                Copiloto del Docente · Primaria
              </p>
            </div>
          </div>
          
          <button 
            type="button" 
            onClick={onToggleMobile}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 lg:hidden cursor-pointer"
            aria-label="Cerrar menú"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ethical badge info banner */}
        <div className="px-4 py-3 mx-3 my-2.5 rounded-xl bg-slate-800/70 border border-slate-700/60 shrink-0">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-semibold text-slate-200">Acompañamiento Formativo</span>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                Datos cualitativos no etiquetantes. El docente aprueba cada intervención.
              </p>
              <button
                type="button"
                onClick={onOpenEthicsModal}
                className="mt-1.5 text-[11px] font-medium text-teal-400 hover:text-teal-300 inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Ver principios éticos</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation List - Explicit view switcher */}
        <div className="flex-1 px-3 py-2 space-y-1.5 overflow-y-auto">
          <div className="px-3 pt-1 pb-1.5 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            Módulos del Sistema
          </div>

          <nav className="space-y-1" aria-label="Navegación principal">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectSection(item.id);
                    if (isOpenMobile) onToggleMobile();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer group ${
                    isActive 
                      ? 'bg-slate-800 text-white border-l-4 border-teal-400 shadow-xs' 
                      : item.highlight
                      ? 'border-l-4 border-transparent text-indigo-200 hover:bg-indigo-950/40 hover:text-white'
                      : 'border-l-4 border-transparent text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive 
                        ? 'text-teal-400' 
                        : item.highlight 
                        ? 'text-indigo-400' 
                        : 'text-slate-400 group-hover:text-slate-200'
                    }`} />
                    <div className="truncate">
                      <div className={`truncate ${isActive ? 'font-semibold text-white' : ''}`}>
                        {item.label}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate font-normal">
                        {item.description}
                      </div>
                    </div>
                  </div>

                  {item.count !== null && item.count !== undefined && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-mono tabular-nums shrink-0 ${
                      isActive 
                        ? 'bg-teal-950 text-teal-200 border border-teal-800/80 font-bold' 
                        : 'bg-slate-800 text-slate-400 border border-slate-700/60'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Teacher Profile Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/70 shrink-0">
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-indigo-900/70 border border-indigo-700/60 flex items-center justify-center text-indigo-200 shrink-0 font-bold text-xs">
                MR
              </div>
              <div className="min-w-0 truncate">
                <div className="text-xs font-semibold text-slate-200 truncate">
                  {anonymizeData ? 'Docente D-104' : 'Profa. Mariana Restrepo'}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  I.E. Mogambo (3.° y 4.°)
                </div>
              </div>
            </div>
            
            <button
              type="button"
              onClick={() => onSelectSection('settings')}
              title="Ajustes de cuenta"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
                currentSection === 'settings' 
                  ? 'text-teal-400 bg-slate-800' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
