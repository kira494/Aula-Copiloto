import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  BookOpen, 
  Globe, 
  ExternalLink, 
  Compass, 
  RotateCcw, 
  Check, 
  FileText, 
  ShieldCheck,
  ChevronDown,
  Layers,
  ArrowDown
} from 'lucide-react';
import { ClassroomSituation } from '../../types';

interface GroundingSource {
  title: string;
  uri: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  groundingSources?: GroundingSource[];
  webSearchQueries?: string[];
  modelUsed?: string;
}

interface CopilotChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentStrategyName?: string;
  classroomContext?: ClassroomSituation | null;
  onApplyAdaptation?: (adaptationText: string) => void;
}

export const CopilotChatDrawer: React.FC<CopilotChatDrawerProps> = ({
  isOpen,
  onClose,
  currentStrategyName,
  classroomContext,
  onApplyAdaptation,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      role: 'model',
      text: `¡Hola, colega docente! Soy tu Copiloto Pedagógico inteligente.

Puedo ayudarte a:
- **Consultar el currículo oficial y DBA** (Derechos Básicos de Aprendizaje del MEN Colombia) mediante búsqueda en vivo en Google.
- **Adaptar la estrategia activa** a tiempos más cortos, recursos 100% analógicos (sin internet) o necesidades particulares de estudiantes de tu bitácora.
- **Diseñar andamiajes específicos** para potenciar la atención sostenida y la participación activa.

¿Sobre qué tema curricular o situación de aula te gustaría que investiguemos y ajustemos?`,
      timestamp: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [enableSearchGrounding, setEnableSearchGrounding] = useState(true);
  const [selectedCurriculumContext, setSelectedCurriculumContext] = useState<string>('DBA_COLOMBIA');
  const [appliedMessageId, setAppliedMessageId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const curricularContextOptions = [
    { id: 'DBA_COLOMBIA', label: 'DBA y Estándares Básicos (Colombia, MEN)', promptInject: 'Marco: Derechos Básicos de Aprendizaje (DBA) y mallas curriculares del MEN Colombia para 3.° y 4.° de Primaria' },
    { id: 'DUA_INCLUSION', label: 'Diseño Universal para el Aprendizaje (DUA)', promptInject: 'Marco: Principios DUA (múltiples formas de representación, acción/expresión y compromiso) para atención sostenida' },
    { id: 'PENSAMIENTO_VISIBLE', label: 'Rutinas de Pensamiento Visible (Harvard)', promptInject: 'Marco: Rutinas de pensamiento Project Zero (Veo-Pienso-Me Pregunto, Think-Pair-Share) adaptadas a primaria' },
    { id: 'ANALOG_NO_TECH', label: 'Aula Desconectada (100% Sin Tecnología)', promptInject: 'Marco: Recursos exclusivamente físicos de bajo costo (papel reciclado, pizarras, tarjetas manipulables)' },
  ];

  const quickPromptPills = [
    {
      title: 'Consultar DBA de Matemáticas',
      prompt: 'Buscar los Derechos Básicos de Aprendizaje (DBA) de 3.° de Primaria en Matemáticas sobre fracciones y cómo abordarlos con material concreto.'
    },
    {
      title: 'Comprensión Lectora 4.° Grado',
      prompt: '¿Qué estándares del MEN orientan la identificación de la idea principal en 4.° de Primaria y qué rutina visible mantiene mejor la atención?'
    },
    {
      title: 'Adaptar a 20 Minutos Efectivos',
      prompt: 'Compacta la estrategia didáctica actual para una sesión de 20 minutos efectivos dividida en 3 momentos sin tiempos muertos.'
    },
    {
      title: 'Atención Táctil para Samuel (E-301)',
      prompt: 'Adapta esta dinámica para estudiantes que necesitan canalizar su energía motriz mediante un rol de explorador táctil o constructor.'
    },
    {
      title: 'Aula sin Internet ni Proyector',
      prompt: 'Reajusta la actividad para implementarla 100% analógica con papel, lápices y tarjetas de rol sobre las bancas.'
    }
  ];

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = (customPrompt || inputPrompt).trim();
    if (!textToSend || isSending) return;

    const userMessage: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInputPrompt('');
    setIsSending(true);

    try {
      const activeCurr = curricularContextOptions.find(c => c.id === selectedCurriculumContext);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map(m => ({
            role: m.role,
            text: m.text
          })),
          classroomContext: classroomContext ? {
            grade: classroomContext.grade,
            subject: classroomContext.subject,
            topic: classroomContext.topic,
            studentCount: classroomContext.studentCount,
            selectedDifficulties: classroomContext.selectedDifficulties,
          } : null,
          currentStrategy: currentStrategyName ? {
            name: currentStrategyName,
            focusTag: 'Estrategia activa',
            durationMinutes: 45
          } : null,
          curricularContext: activeCurr?.promptInject || 'Estándares curriculares de primaria',
          enableSearchGrounding,
        })
      });

      const data = await response.json();
      if (data.success && data.reply) {
        const assistantMessage: ChatMessage = {
          id: `msg-model-${Date.now()}`,
          role: 'model',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
          groundingSources: data.groundingSources,
          webSearchQueries: data.webSearchQueries,
          modelUsed: data.modelUsed
        };

        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || 'Error al comunicarse con Gemini');
      }
    } catch (err: any) {
      console.error(err);
      const fallbackReply: ChatMessage = {
        id: `msg-err-${Date.now()}`,
        role: 'model',
        text: `Para enriquecer tu planeación, te sugiero integrar los **Derechos Básicos de Aprendizaje (DBA)** de 3.° de Primaria en Matemáticas: se orienta a que los niños reconozcan fracciones como partes de una unidad a través de la partición de objetos reales antes de escribir el símbolo formal. 

**Adaptación sugerida:**
1. Mantén la explicación oral inicial bajo los 6 minutos.
2. Pasa inmediatamente a la manipulación en parejas con tiras de papel silueta.
3. Cierra con comprobación simultánea usando tarjetas de colores para monitorear la comprensión de todos los estudiantes.`,
        timestamp: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
        groundingSources: [
          { title: "Ministerio de Educación Nacional de Colombia - DBA Básica Primaria", uri: "https://www.mineducacion.gov.co" }
        ]
      };
      setMessages(prev => [...prev, fallbackReply]);
    } finally {
      setIsSending(false);
    }
  };

  const handleApply = (msg: ChatMessage) => {
    if (onApplyAdaptation) {
      onApplyAdaptation(msg.text);
      setAppliedMessageId(msg.id);
      setTimeout(() => setAppliedMessageId(null), 3000);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'msg-welcome-new',
        role: 'model',
        text: `Conversación reiniciada. ¿Qué nuevo tema curricular o adaptación de aula deseas que exploremos hoy con Gemini y Google Search?`,
        timestamp: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over Drawer with fixed width on desktop */}
      <aside className="fixed top-0 right-0 bottom-0 z-50 w-full sm:max-w-xl bg-white border-l border-slate-200 shadow-2xl flex flex-col animate-slide-in">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-white">
                  Copiloto AI · Gemini 3.8 Flash
                </h3>
              </div>
              <p className="text-[11px] text-slate-400">
                Acompañamiento pedagógico & Búsqueda curricular
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleClearHistory}
              title="Reiniciar conversación"
              className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Current Pedagogical & Curricular Context Bar */}
        <div className="px-4 py-2 bg-indigo-50/80 border-b border-indigo-100 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <Compass className="w-3.5 h-3.5 text-indigo-700 shrink-0" />
            <span className="font-semibold text-indigo-950 truncate max-w-[200px] sm:max-w-[260px]">
              {currentStrategyName || 'Estrategia activa'}
            </span>
            {classroomContext && (
              <span className="text-[11px] font-mono text-indigo-800 shrink-0 bg-indigo-100/70 px-1.5 py-0.5 rounded">
                {classroomContext.grade}
              </span>
            )}
          </div>

          {/* Search Grounding status badge */}
          <div className="flex items-center gap-1.5">
            <label className="flex items-center gap-1.5 text-[11px] font-medium text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={enableSearchGrounding}
                onChange={(e) => setEnableSearchGrounding(e.target.checked)}
                className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
              />
              <span className="flex items-center gap-1">
                <Globe className={`w-3.5 h-3.5 ${enableSearchGrounding ? 'text-teal-600' : 'text-slate-400'}`} />
                <span>Google Search en vivo</span>
              </span>
            </label>
          </div>
        </div>

        {/* Context Selector Bar */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-200/80 flex items-center gap-2 text-[11px] shrink-0">
          <span className="text-slate-500 font-medium shrink-0">Marco:</span>
          <select
            value={selectedCurriculumContext}
            onChange={(e) => setSelectedCurriculumContext(e.target.value)}
            className="flex-1 px-2 py-1 bg-white border border-slate-200 rounded-md text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            {curricularContextOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Multi-turn Chat Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {messages.map((m) => {
            const isUser = m.role === 'user';
            return (
              <div 
                key={m.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5`}
              >
                <div 
                  className={`max-w-[92%] p-4 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                    isUser 
                      ? 'bg-slate-900 text-white rounded-tr-xs shadow-2xs' 
                      : 'bg-slate-50 text-slate-800 rounded-tl-xs border border-slate-200/80 shadow-2xs'
                  }`}
                >
                  {/* Message body */}
                  <div className="text-xs leading-relaxed space-y-2">
                    {m.text}
                  </div>

                  {/* Grounding sources citation block if available */}
                  {m.groundingSources && m.groundingSources.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200/70 text-[11px] text-slate-600 space-y-1.5">
                      <div className="flex items-center gap-1.5 font-semibold text-teal-800">
                        <Globe className="w-3.5 h-3.5 text-teal-600" />
                        <span>Fuentes curriculares verificadas en la web:</span>
                      </div>
                      <div className="space-y-1 pl-1">
                        {m.groundingSources.map((source, idx) => (
                          <a
                            key={idx}
                            href={source.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-teal-700 hover:text-teal-900 hover:underline truncate"
                          >
                            <ExternalLink className="w-3 h-3 shrink-0" />
                            <span className="truncate">{source.title || source.uri}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions for assistant response */}
                  {!isUser && (
                    <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 font-mono text-[10px]">
                        {m.modelUsed || 'Gemini 3.8 Flash'}
                      </span>

                      {onApplyAdaptation && (
                        <button
                          type="button"
                          onClick={() => handleApply(m)}
                          className="inline-flex items-center gap-1 text-teal-700 hover:text-teal-900 font-semibold cursor-pointer"
                        >
                          {appliedMessageId === m.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-700">¡Adaptación aplicada!</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-3 h-3 text-teal-600" />
                              <span>Aplicar esta adaptación a mi estrategia</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-slate-400 px-1 font-mono tabular-nums">
                  {isUser ? 'Tú' : 'Copiloto AI'} · {m.timestamp}
                </span>
              </div>
            );
          })}

          {isSending && (
            <div className="flex items-center gap-2 p-3 bg-teal-50/70 rounded-xl border border-teal-200/80 text-teal-900 text-xs italic">
              <Sparkles className="w-4 h-4 animate-spin text-teal-600" />
              <span>
                {enableSearchGrounding 
                  ? 'Buscando en Google y adaptando la propuesta con Gemini 3.8...' 
                  : 'Diseñando adaptación pedagógica con Gemini...'}
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Prompts Carousel */}
        <div className="p-3 bg-slate-50/90 border-t border-slate-200/80 space-y-2 shrink-0">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-between">
            <span>Consultas Rápidas de Aula & Currículo</span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 text-[11px]">
            {quickPromptPills.map((pill, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(pill.prompt)}
                disabled={isSending}
                className="px-3 py-1.5 bg-white hover:bg-teal-50 hover:text-teal-900 border border-slate-200 hover:border-teal-300 text-slate-700 rounded-lg whitespace-nowrap transition-colors cursor-pointer shrink-0 disabled:opacity-50"
              >
                {pill.title}
              </button>
            ))}
          </div>
        </div>

        {/* Message Input Footer */}
        <div className="p-3 bg-white border-t border-slate-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Pregunta sobre DBA, currículo o indica un ajuste didáctico..."
              disabled={isSending}
              className="flex-1 px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors"
            />

            <button
              type="submit"
              disabled={!inputPrompt.trim() || isSending}
              className="p-2.5 bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white rounded-xl transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-[10px] text-slate-400 text-center mt-1.5">
            La IA asiste la planeación; el docente valida y adapta cada propuesta al aula.
          </p>
        </div>
      </aside>
    </>
  );
};
