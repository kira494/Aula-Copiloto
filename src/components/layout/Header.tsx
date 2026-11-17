import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Sparkles, 
  Shield, 
  HelpCircle,
  Plus,
  Home,
  BookOpen,
  Lightbulb,
  History,
  Library,
  Settings,
  Eye,
  EyeOff
} from 'lucide-react';
import { NavigationSection } from '../../types';

interface HeaderProps {
  currentSection: NavigationSection;
  onSelectSection: (section: NavigationSection) => void;
  onToggleMobileMenu: () => void;
  onOpenCopilot: () => void;
  onOpenEthicsModal: () => void;
  anonymizeData: boolean;
  onToggleAnonymize: () => void;
  onOpenNewObservation: () => void;
  onSearchGlobal?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSection,
  onSelectSection,
  onToggleMobileMenu,
  onOpenCopilot,
  onOpenEthicsModal,
  anonymizeData,
  onToggleAnonymize,
  onOpenNewObservation,
  onSearchGlobal,
}) => {
  const [searchVal, setSearchVal] = useState('');

  const getSectionMetadata = () => {
    switch (currentSection) {
      case 'dashboard':
        return { 
          parent: 'AulaCopiloto AI', 
          current: 'Panel del Docente', 
          icon: Home,
          tag: 'Vista principal'
        };
      case 'classroom-analysis':
        return { 
          parent: 'Diagnóstico de Aula', 
          current: 'Nuevo Análisis de Situación', 
          icon: Sparkles,
          tag: 'Formulario de clase'
        };
      case 'student-bitacora':
        return { 
          parent: 'Acompañamiento Formativo', 
          current: 'Bitácora Contextual de Estudiantes', 
          icon: BookOpen,
          tag: 'Seguimiento cualitativo'
        };
      case 'strategy-results':
        return { 
          parent: 'Intervención Didáctica', 
          current: 'Propuestas Didácticas con IA', 
          icon: Lightbulb,
          tag: '3 alternativas generadas'
        };
      case 'interventions-history':
        return { 
          parent: 'Seguimiento de Resultados', 
          current: 'Historial de Intervenciones', 
          icon: History,
          tag: 'Línea de tiempo'
        };
      case 'strategy-library':
        return { 
          parent: 'Recursos Didácticos', 
          current: 'Biblioteca de Actividades', 
          icon: Library,
          tag: 'Catálogo adaptable'
        };
      case 'settings':
        return { 
          parent: 'Preferencias del Sistema', 
          current: 'Configuración y Privacidad', 
          icon: Settings,
          tag: 'Perfil y ética'
        };
      default:
        return { 
          parent: 'AulaCopiloto AI', 
          current: 'Plataforma Pedagógica', 
          icon: Home,
          tag: 'Activo'
        };
    }
  };

  const meta = getSectionMetadata();
  const Icon = meta.icon;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchVal.trim()) return;
    if (onSearchGlobal) {
      onSearchGlobal(searchVal.trim());
    } else {
      // Intelligently route based on query
      const lower = searchVal.toLowerCase();
      if (lower.includes('estudiante') || lower.includes('samuel') || lower.includes('valentina') || lower.includes('mateo')) {
        onSelectSection('student-bitacora');
      } else if (lower.includes('estrategia') || lower.includes('fraccion') || lower.includes('estacion')) {
        onSelectSection('strategy-results');
      } else {
        onSelectSection('strategy-library');
      }
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
      {/* Left: Mobile trigger & Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="p-2 -ml-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 lg:hidden cursor-pointer"
          aria-label="Abrir menú"
        >
          <Menu className="w-5 h-5" />
        </button>

        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs truncate">
          <div className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4" />
          </div>
          <span className="text-slate-500 font-medium hidden sm:inline truncate">
            {meta.parent}
          </span>
          <span className="text-slate-300 hidden sm:inline" aria-hidden="true">/</span>
          <h1 className="text-sm font-bold text-slate-900 truncate">
            {meta.current}
          </h1>
          <span className="text-slate-400 font-normal hidden md:inline" aria-hidden="true">·</span>
          <span className="text-[11px] text-teal-700 font-medium hidden md:inline truncate">
            {meta.tag}
          </span>
        </nav>
      </div>

      {/* Center: Search input */}
      <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center flex-1 max-w-sm mx-4">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Buscar estudiante, tema o actividad..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors"
          />
        </div>
      </form>

      {/* Right: Actions, Privacy Mode & Copilot */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Anonymization Toggle */}
        <button
          type="button"
          onClick={onToggleAnonymize}
          title={anonymizeData ? "Modo anónimo activo (mostrando códigos E-301)" : "Modo normal (mostrando nombres formativos)"}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
            anonymizeData 
              ? 'bg-amber-50 text-amber-900 border-amber-300 shadow-2xs' 
              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          {anonymizeData ? (
            <EyeOff className="w-3.5 h-3.5 text-amber-600" />
          ) : (
            <Eye className="w-3.5 h-3.5 text-slate-500" />
          )}
          <span className="text-[11px]">
            {anonymizeData ? 'Modo Anónimo (E-301)' : 'Nombres Visibles'}
          </span>
        </button>

        {/* Quick New Observation Button */}
        <button
          type="button"
          onClick={onOpenNewObservation}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-900 shadow-2xs transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 text-slate-500" />
          <span>Nueva observación</span>
        </button>

        {/* Ethics modal trigger */}
        <button
          type="button"
          onClick={onOpenEthicsModal}
          title="Ver marco ético y de privacidad"
          className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Principios éticos"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Copilot Assistant Drawer Trigger */}
        <button
          type="button"
          onClick={onOpenCopilot}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-2xs transition-colors cursor-pointer whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
          <span>Copiloto AI</span>
        </button>
      </div>
    </header>
  );
};
