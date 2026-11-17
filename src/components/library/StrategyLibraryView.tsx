import React, { useState } from 'react';
import { 
  Library, 
  Search, 
  Sparkles, 
  Clock, 
  BookOpen, 
  Check, 
  ArrowRight, 
  Filter, 
  Layers,
  Award,
  Zap,
  Users
} from 'lucide-react';
import { CatalogStrategy, NavigationSection } from '../../types';

interface StrategyLibraryViewProps {
  strategies: CatalogStrategy[];
  onAdaptStrategy: (strategy: CatalogStrategy) => void;
  onSelectSection: (section: NavigationSection) => void;
}

export const StrategyLibraryView: React.FC<StrategyLibraryViewProps> = ({
  strategies,
  onAdaptStrategy,
  onSelectSection,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDuration, setSelectedDuration] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Todas las áreas' },
    { id: 'atencion_sostenida', label: 'Atención sostenida' },
    { id: 'participacion_activa', label: 'Participación activa' },
    { id: 'aprendizaje_cooperativo', label: 'Aprendizaje colaborativo' },
    { id: 'gamificacion', label: 'Gamificación' },
    { id: 'movimiento_practico', label: 'Movimiento y práctica' },
    { id: 'resolucion_problemas', label: 'Resolución de problemas' },
    { id: 'lectura_comprension', label: 'Lectura y comprensión' },
  ];

  const filtered = strategies.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.focusTag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.materials.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDuration = 
      selectedDuration === 'all' ||
      (selectedDuration === 'short' && item.estimatedDuration <= 30) ||
      (selectedDuration === 'medium' && item.estimatedDuration > 30 && item.estimatedDuration <= 45) ||
      (selectedDuration === 'long' && item.estimatedDuration > 45);

    return matchesCat && matchesSearch && matchesDuration;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-5">
        <div className="flex items-center gap-2 text-xs font-medium text-teal-700 mb-1">
          <Library className="w-4 h-4" />
          <span>Catálogo de Recursos Didácticos</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Biblioteca de estrategias didácticas
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Explora dinámicas probadas y adaptables. Puedes seleccionar cualquier estrategia general y personalizarla con el contexto específico de tus estudiantes de 3.° o 4.° grado.
        </p>
      </div>

      {/* Filter and Category Bar */}
      <div className="space-y-3">
        {/* Search & Duration Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="sm:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, materiales o enfoque..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors"
            />
          </div>

          <div>
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors cursor-pointer"
            >
              <option value="all">Cualquier duración</option>
              <option value="short">Corta (≤ 30 minutos)</option>
              <option value="medium">Media (31 a 45 minutos)</option>
              <option value="long">Extensa (&gt; 45 minutos)</option>
            </select>
          </div>
        </div>

        {/* Category Pills (Functional Segmented Buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Strategies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-2xl border p-5 shadow-2xs flex flex-col justify-between transition-all hover:shadow-xs ${
              item.isCustomized ? 'border-teal-300 ring-1 ring-teal-500/20' : 'border-slate-200/80 hover:border-slate-300'
            }`}
          >
            <div className="space-y-3">
              {/* Type Badge & Duration */}
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className={`text-[11px] font-semibold ${
                  item.isCustomized ? 'text-teal-700' : 'text-slate-600'
                }`}>
                  {item.isCustomized ? 'Personalizada con IA' : 'Catálogo General'}
                </span>

                <span className="flex items-center gap-1 font-mono tabular-nums text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{item.estimatedDuration} min</span>
                </span>
              </div>

              {/* Title & Focus */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <div className="text-[11px] text-teal-700 font-medium mt-1">
                  {item.focusTag}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {item.description}
              </p>

              {/* Objective */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-700">
                <strong className="text-slate-900">Objetivo: </strong>
                {item.pedagogicalObjective}
              </div>

              {/* Materials */}
              <div className="text-[11px] text-slate-500">
                <span className="font-medium text-slate-700">Materiales: </span>
                {item.materials.slice(0, 3).join(', ')}
              </div>
            </div>

            {/* Action Bottom */}
            <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                {item.gradeLevels.join(', ')}
              </span>

              <button
                type="button"
                onClick={() => onAdaptStrategy(item)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-900 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>Adaptar a mi grupo</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500 space-y-2">
          <p>No se encontraron estrategias didácticas con los criterios seleccionados.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setSelectedDuration('all');
            }}
            className="text-teal-700 font-medium hover:underline cursor-pointer"
          >
            Restablecer filtros
          </button>
        </div>
      )}
    </div>
  );
};
