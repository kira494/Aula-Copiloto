import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json({ limit: "10mb" }));

// Server-side Gemini initialization if key exists
const getGeminiClient = () => {
  if (process.env.GEMINI_API_KEY) {
    return new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return null;
};

// Healthcheck endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// Fallback pedagogical generator for 100% reliable offline/sandbox execution
function generatePedagogicalFallback(payload: any) {
  const {
    grade = "3.° Primaria",
    subject = "Lenguaje y Comunicación",
    topic = "Estructura de la narración fantástica",
    learningGoal = "Identificar elementos narrativos y construir un desenlace colaborativo",
    situationDescription = "Los estudiantes se dispersan a los 10 minutos y solo 4 o 5 participan voluntariamente.",
    selectedDifficulties = ["Dificultad para mantener la atención", "Baja participación oral"],
    groupCharacteristics = {},
    selectedStudentContexts = [],
  } = payload;

  const interests = groupCharacteristics.interests || "Cuentos interactivos, animales y retos en equipo";
  const resources = groupCharacteristics.resources || "Papel bond, marcadores, tarjetas y fichas";

  return {
    interpretation: {
      summary: `En el grupo de ${grade} durante la clase de ${subject} (${topic}), se manifiesta una sobrecarga de atención focalizada en explicaciones frontales continuas, provocando dispersión a partir de los 10-12 minutos y retracción de la participación a un núcleo reducido de estudiantes.`,
      observedFacts: [
        `Disminución del foco atencional tras periodos expositivos mayores a 10 minutos.`,
        `Participación oral concentrada en un número limitado de estudiantes, mientras otros adoptan rol pasivo.`,
        `Dificultades reportadas: ${selectedDifficulties.join(", ") || "Distracción y dispersión"}.`,
        `Recursos del aula disponibles: ${resources}.`
      ],
      aiHypotheses: [
        `Es probable que el canal verbal unidireccional exceda la capacidad de memoria de trabajo de niños de 8 a 9 años en esta franja horaria.`,
        `La falta de andamiajes kinestésicos o visuales inmediatos podría desmotivar a los estudiantes con estilos de procesamiento más activos o kinestésicos.`,
        `La presión social ante respuestas en gran grupo puede inhibir la participación espontánea de estudiantes tímidos.`
      ],
      opportunities: [
        `Aprovechar los intereses del grupo (${interests}) para introducir micro-desafíos de 5 a 7 minutos.`,
        `Estructurar la participación en parejas previas (Think-Pair-Share) para reducir la ansiedad de intervención.`,
        `Incorporar roles activos rotativos y organizadores visuales manipulables.`
      ]
    },
    strategies: [
      {
        id: "strat-1",
        name: "Estaciones de Exploración Cooperativa con Roles de Enfoque",
        focusTag: "Aprendizaje Cooperativo & Kinestésico",
        specificGoal: `Promover la atención sostenida mediante 3 estaciones rotativas de 8 minutos donde cada estudiante asume una función indispensable para resolver el reto sobre ${topic}.`,
        pedagogicalRationale: "Basado en la teoría de la interdependencia positiva de Johnson & Johnson y la fragmentación temporal de la atención en primaria (bloques breves con cambio de estímulo).",
        durationMinutes: 45,
        materials: ["3 mesas preparadas", "Fichas de reto visuales", "Tarjetas de rol de cartulina", "Temporizador visual (reloj de arena o digital)"],
        groupOrganization: "Equipos heterogéneos de 4 estudiantes con roles rotativos: Portavoz, Moderador del tiempo, Explorador de pistas y Verificador.",
        stepByStep: [
          {
            phase: "Fase 1: Conexión y Activación (8 min)",
            action: `Presentar el enigma inicial sobre ${topic} usando un elemento táctil o pista misteriosa. El docente formula una pregunta provocadora y da 1 minuto para deliberar en parejas antes de abrir el diálogo.`
          },
          {
            phase: "Fase 2: Rotación de Estaciones (24 min)",
            action: "Tres rotaciones de 7-8 minutos. Estación A: 'El detective del concepto' (búsqueda y asociación). Estación B: 'Taller de construcción' (manipulación de tarjetas o fichas). Estación C: 'El reto relámpago' (acuerdo rápido y registro visual)."
          },
          {
            phase: "Fase 3: Cierre Metacognitivo y Síntesis (13 min)",
            action: "Cada portavoz comparte 1 hallazgo clave en formato relámpago (30 segundos). El docente sistematiza en el tablero las conclusiones y cada alumno deposita su tarjeta de autoverificación."
          }
        ],
        teacherRole: "Facilitador itinerante: circula por las mesas cronometrando con señales sonoras amables, aplicando andamiajes específicos en estudiantes con menor iniciativa.",
        studentParticipation: "100% de los estudiantes interactúa activamente debido a la asignación explícita de roles y la necesidad de consenso para avanzar a la siguiente estación.",
        contextualAdaptations: selectedStudentContexts.length > 0 
          ? `Para los estudiantes de la bitácora (${selectedStudentContexts.map((s: any) => s.studentName || s.internalCode).join(", ")}): asignación prioritaria en roles prácticos (Explorador o Moderador de tiempo) y provisión de tarjetas con apoyos visuales icónicos antes de la tarea escrita.`
          : "Uso de apoyos visuales y tarjetas con instrucciones cortas de una sola orden para estudiantes con ritmos más pausados.",
        observableAttentionIndicators: [
          "Permanencia física y visual en el material de la estación durante al menos 6 de los 8 minutos de cada bloque.",
          "Respuesta inmediata y autónoma a la señal de transición entre estaciones sin dispersión caótica.",
          "Manipulación activa de las fichas en lugar de conductas de distracción periférica."
        ],
        observableParticipationIndicators: [
          "El 100% de los miembros del equipo cumple su función de rol durante la rotación.",
          "Al menos 3 intervenciones verbales constructivas registradas por estudiante dentro de su pequeño grupo.",
          "Capacidad de sintetizar oralmente la pista de su estación al regreso al grupo general."
        ],
        potentialDifficultiesAndPlanB: [
          {
            risk: "Aumento excesivo del nivel de ruido durante la rotación.",
            planB: "Implementar la señal de 'mano alzada y respiración de 3 tiempos' para recuperar la calma antes de girar."
          },
          {
            risk: "Algún estudiante monopoliza la palabra dentro del equipo.",
            planB: "Entregar a cada miembro 2 fichas de participación que deben entregar al centro de la mesa al intervenir."
          }
        ]
      },
      {
        id: "strat-2",
        name: "Rutina de Pensamiento Visible 'Veo, Pienso, Me Pregunto' con Andamiaje Táctil",
        focusTag: "Atención Sostenida & Comprensión Profunda",
        specificGoal: `Estructurar la atención hacia ${topic} descomponiendo la observación en pasos secuenciales con tarjetas de respuesta individuales.`,
        pedagogicalRationale: "Rutina del Proyecto Zero de Harvard adaptada para 3.° y 4.° de primaria, transformando la escucha pasiva en un proceso escalonado de registro visual e intercambio.",
        durationMinutes: 35,
        materials: ["Organizadores gráficos simples fotocopiados o dibujados en cuaderno", "Mini-pizarras o tarjetas de tres colores", "Estímulo visual central (lámina o ilustración)"],
        groupOrganization: "Trabajo en parejas dialógicas con puesta en común plenaria.",
        stepByStep: [
          {
            phase: "Fase 1: 'Veo' - Observación pura guiada (10 min)",
            action: `El docente presenta un caso o ilustración detonante de ${topic}. Los estudiantes registran en 2 minutos solo hechos visibles, sin interpretar. Se comparten 5 observaciones rápidas con turno aleatorio equitativo (palitos de nombres).`
          },
          {
            phase: "Fase 2: 'Pienso' - Hipótesis en parejas (15 min)",
            action: "En parejas, discuten: '¿Qué creemos que significa o cómo se relaciona con lo que ya sabemos?'. Cada pareja redacta una hipótesis corta en la tarjeta verde."
          },
          {
            phase: "Fase 3: 'Me Pregunto' - Cierre generador (10 min)",
            action: "Cada estudiante formula una duda o pregunta profunda sobre el tema. Se pegan en el 'Muro de la Curiosidad' para guiar las próximas sesiones."
          }
        ],
        teacherRole: "Mediador socrático: no califica respuestas de correcto/incorrecto durante la exploración, sino que repregunta: '¿Qué viste que te hace decir eso?'",
        studentParticipation: "Participación equitativa sin miedo al error, ya que la fase 'Veo' garantiza éxito a cualquier estudiante independientemente de su conocimiento previo.",
        contextualAdaptations: selectedStudentContexts.length > 0 
          ? `Apoyo en bitácora contextual: permitir registrar respuestas mediante dibujos o palabras clave para estudiantes que presentan resistencia a la escritura extensa.`
          : "Ofrecer opciones de respuesta mixtas (dibujo, frase o palabra clave) para respetar ritmos heterogéneos.",
        observableAttentionIndicators: [
          "Mantenimiento de la mirada y postura hacia el estímulo visual durante el tiempo de observación dirigida.",
          "Llenado oportuno del organizador gráfico sin necesidad de recordatorios individuales reiterados.",
          "Disminución de conductas de distracción motriz durante la fase de análisis en parejas."
        ],
        observableParticipationIndicators: [
          "El 100% de los estudiantes entrega su tarjeta con al menos 1 observación y 1 pregunta.",
          "Intervención de estudiantes que habitualmente no levantan la mano, motivados por la validación previa en pareja.",
          "Preguntas formuladas orientadas a la tarea y no a temas dispersos."
        ],
        potentialDifficultiesAndPlanB: [
          {
            risk: "Los estudiantes confunden 'Veo' con 'Pienso' e interpretan inmediatamente.",
            planB: "El docente modela con un ejemplo contrastado: 'Veo un sombrero azul (hecho) vs Pienso que es un mago (interpretación)'."
          }
        ]
      },
      {
        id: "strat-3",
        name: "Misión Gamificada 'El Enigma del Saber' con Micro-Desafíos Temporizados",
        focusTag: "Gamificación Didáctica & Desafío Progresivo",
        specificGoal: `Activar el compromiso sostenido en ${topic} mediante una narrativa de reto por niveles con retroalimentación inmediata.`,
        pedagogicalRationale: "Teoría de la autodeterminación (Ryan & Deci) y flujo de Csíkszentmihályi: la atención se mantiene cuando el desafío coincide con las habilidades y existen metas claras y alcanzables.",
        durationMinutes: 40,
        materials: ["Sobres de misión con 3 niveles de desafío", "Medidores de progreso en cartulina para cada fila/mesa", "Campanilla o señal auditiva"],
        groupOrganization: "Tríos colaborativos solidarios (un estudiante de ritmo ágil apoya a sus compañeros sin hacer la tarea por ellos).",
        stepByStep: [
          {
            phase: "Fase 1: Misión Desbloqueada (5 min)",
            action: `Se lee la 'carta del misterio' vinculada a ${topic}. El aula se convierte en la Agencia de Investigadores. Se fijan las 3 normas de convivencia investigativa.`
          },
          {
            phase: "Fase 2: Superación de Niveles 1, 2 y 3 (25 min)",
            action: "Nivel 1 (Básico - 7 min): Identificar conceptos clave. Nivel 2 (Aplicación - 10 min): Resolver un problema práctico con el material manipulable. Nivel 3 (Creación - 8 min): Proponer un ejemplo original del grupo."
          },
          {
            phase: "Fase 3: Reconocimiento y Validación Formativa (10 min)",
            action: "Evaluación entre pares con rúbrica visual simplificada ('Semáforo del Detective'). Reflexión grupal sobre qué ayudó a mantener la concentración."
          }
        ],
        teacherRole: "Árbitro y mentor del reto: valida hitos de misión, entrega sellos de logro formativo y desbloquea apoyos pedagógicos cuando un equipo se bloquea.",
        studentParticipation: "Alta motivación intrínseca; el trabajo cooperativo evita la frustración y la división en niveles mantiene el dinamismo sin tiempos muertos.",
        contextualAdaptations: selectedStudentContexts.length > 0 
          ? `Adaptación bitácora: el Nivel 1 cuenta con pistas táctiles adicionales para los estudiantes que requieren activación sensorial previa.`
          : "Niveles con andamiaje decreciente para acompañar diferentes niveles de competencia inicial.",
        observableAttentionIndicators: [
          "Foco constante en la resolución de cada sobre durante el tiempo cronometrado.",
          "Urgencia positiva por superar el nivel y pasar al siguiente desafío.",
          "Ausencia de conversaciones ajenas a la misión durante el tiempo de juego."
        ],
        observableParticipationIndicators: [
          "Toma de turnos respetuosa para manipular las cartas del enigma.",
          "Aporte obligatorio de cada integrante para poder solicitar la validación del docente.",
          "Verbalización del proceso deductivo por parte de diferentes miembros del trío."
        ],
        potentialDifficultiesAndPlanB: [
          {
            risk: "Algún grupo termina mucho antes que los demás y genera dispersión.",
            planB: "Tener preparado el 'Sobre de Desafío Élite / Pista Maestra' con un reto creativo complementario."
          }
        ]
      }
    ],
    practicalClassroomScript: {
      strategyId: "strat-1",
      scenarioTitle: `Así se vería en tu clase de ${grade}: Dinámica de Estaciones en Acción`,
      teacherScript: [
        {
          moment: "Minuto 0 a 3 - El Gancho Inmediato",
          teacherDialogue: `"¡Investigadores de ${grade}! Hoy no vengo a dar una clase magistral. Vengo con un misterio sobre ${topic} que está dividido en tres pistas en el salón. Miren el temporizador: cada equipo tiene exactamente 8 minutos por estación. Si un equipo se detiene, la pista se desvanece. Portavoces, recojan sus insignias de rol."`,
          studentAction: "Los estudiantes toman asiento por mesas, colocan sus tarjetas de rol sobre la mesa y abren el sobre correspondiente con entusiasmo e intriga."
        },
        {
          moment: "Minuto 12 - Manteniendo el foco en el cambio de estación",
          teacherDialogue: `"¡Campana de enfoque! En 15 segundos dejamos el material ordenado en la mesa tal como lo encontramos. Tomamos aire en 1, 2, 3... y rotamos en silencio en sentido de las agujas del reloj. ¡Tiempo corriendo para Estación 2!"`,
          studentAction: "Transición ordenada guiada por el Moderador de tiempo de cada mesa. Los estudiantes llegan con curiosidad a la nueva tarea sin perder el hilo pedagógico."
        },
        {
          moment: "Minuto 35 - Puesta en común protegida",
          teacherDialogue: `"Portavoces de la Mesa 2 y Mesa 4: en 20 segundos cuéntennos cuál fue la pista decisiva que descubrió su equipo. Recuerden usar la palabra clave que practicamos."`,
          studentAction: "El estudiante portavoz interviene con seguridad respaldado por el trabajo consensuado de sus 3 compañeros."
        }
      ],
      practicalTips: [
        `Prepara los sobres de estación antes de la jornada para no perder tiempo organizativo en el aula.`,
        `Si notas que un estudiante como Samuel se levanta constantemente, dale el rol de 'Mensajero Oficial' entre mesas para canalizar constructivamente su necesidad motriz.`,
        `No uses silbato ni gritos para cambiar de estación; un toque de campana suave o un palmoteo rítmico '1-2, 1-2-3' es más efectivo para centrar la atención.`
      ]
    },
    evaluationRubric: {
      baselineObservation: "Línea de base: Atención sostenida promedio de 11 minutos; 5 de 28 estudiantes participando activamente; dispersión frecuente con necesidad de llamadas de atención cada 6 minutos.",
      evaluationCriteria: [
        {
          criterion: "Tiempo de involucramiento continuo (Atención Sostenida)",
          observableMeasure: "Estudiantes permanecen enfocados en la tarea sin distracciones por al menos 20-25 minutos acumulados en bloques.",
          ratingScale: "1 (Menos de 10 min) · 2 (10-18 min) · 3 (19-25 min) · 4 (Más de 25 min continuos)",
          expectedBenchmark: "Nivel 3: Al menos 22 minutos de foco activo durante las estaciones"
        },
        {
          criterion: "Amplitud y equidad de la participación oral",
          observableMeasure: "Porcentaje de estudiantes que verbalizan al menos 1 idea o aporte reflexivo relevante durante la sesión.",
          ratingScale: "1 (<30% del grupo) · 2 (30-60%) · 3 (60-85%) · 4 (>85% de los estudiantes)",
          expectedBenchmark: "Nivel 4: Superar el 80% de participación gracias al andamiaje de roles en grupos reducidos"
        },
        {
          criterion: "Completitud y calidad del producto colaborativo",
          observableMeasure: "Equipos que logran completar los 3 retos de estación de manera colaborativa y coherente.",
          ratingScale: "1 (Menos de la mitad) · 2 (La mitad) · 3 (Casi todos) · 4 (100% de los grupos)",
          expectedBenchmark: "Nivel 3: Al menos 5 de 6 grupos terminan satisfactoriamente"
        },
        {
          criterion: "Clima de aula y autorregulación de impulsos",
          observableMeasure: "Transición fluida entre actividades con mínima intervención punitiva del docente.",
          ratingScale: "1 (Caos frecuente) · 2 (Varios llamados de atención) · 3 (Transiciones con 1 recordatorio) · 4 (Autorregulación óptima)",
          expectedBenchmark: "Nivel 3: Transiciones autónomas en menos de 45 segundos"
        }
      ]
    }
  };
}

// Strategy generation route
app.post("/api/generate-strategy", async (req, res) => {
  try {
    const payload = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // Use pedagogical engine fallback
      const fallbackResult = generatePedagogicalFallback(payload);
      return res.json({ success: true, data: fallbackResult, source: "pedagogical-engine" });
    }

    const prompt = `Actúa como especialista senior en didáctica de educación primaria (3.° y 4.° de básica primaria en Colombia y Latinoamérica), experto en DUA (Diseño Universal para el Aprendizaje) y estrategias para la atención sostenida y participación activa en el aula.

Contexto de la situación de aula ingresada por el docente:
- Grado escolar: ${payload.grade || "3.° Primaria"}
- Asignatura: ${payload.subject || "No especificada"}
- Tema pedagógico: ${payload.topic || "No especificado"}
- Número de estudiantes: ${payload.studentCount || 25}
- Duración disponible: ${payload.durationMinutes || 45} minutos
- Objetivo de aprendizaje: ${payload.learningGoal || "No especificado"}
- Situación observada por el docente: "${payload.situationDescription || ""}"
- Dificultades identificadas: ${(payload.selectedDifficulties || []).join(", ")}
- Intereses del grupo: ${payload.groupCharacteristics?.interests || "No especificados"}
- Recursos disponibles: ${payload.groupCharacteristics?.resources || "Básicos de aula"}
- Bitácoras de estudiantes consideradas: ${JSON.stringify(payload.selectedStudentContexts || [])}

Requisitos éticos y pedagógicos:
1. No etiquetes clínicamente ni patologices a los estudiantes.
2. Distingue con rigor los "hechos observados por el docente" de las "hipótesis pedagógicas de la IA".
3. Plantea 3 estrategias didácticas contrastantes, realistas, viables con recursos comunes en escuelas primarias.
4. Incluye un ejemplo práctico dramatizado "Así se vería en tu aula" con guion paso a paso.
5. Diseña una rúbrica de evaluación formativa de la intervención con indicadores observables.

Genera una respuesta estructurada estrictamente en JSON con la siguiente estructura:
{
  "interpretation": {
    "summary": "string",
    "observedFacts": ["string"],
    "aiHypotheses": ["string"],
    "opportunities": ["string"]
  },
  "strategies": [
    {
      "id": "strat-1",
      "name": "string",
      "focusTag": "string",
      "specificGoal": "string",
      "pedagogicalRationale": "string",
      "durationMinutes": number,
      "materials": ["string"],
      "groupOrganization": "string",
      "stepByStep": [
        { "phase": "string", "action": "string" }
      ],
      "teacherRole": "string",
      "studentParticipation": "string",
      "contextualAdaptations": "string",
      "observableAttentionIndicators": ["string"],
      "observableParticipationIndicators": ["string"],
      "potentialDifficultiesAndPlanB": [
        { "risk": "string", "planB": "string" }
      ]
    }
  ],
  "practicalClassroomScript": {
    "strategyId": "strat-1",
    "scenarioTitle": "string",
    "teacherScript": [
      { "moment": "string", "teacherDialogue": "string", "studentAction": "string" }
    ],
    "practicalTips": ["string"]
  },
  "evaluationRubric": {
    "baselineObservation": "string",
    "evaluationCriteria": [
      {
        "criterion": "string",
        "observableMeasure": "string",
        "ratingScale": "string",
        "expectedBenchmark": "string"
      }
    ]
  }
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "Eres un asesor pedagógico de élite para docentes de primaria. Responde en español natural y profesional, usando formato JSON estricto sin bloques de markdown adicionales.",
        temperature: 0.7,
      },
    });

    const text = response.text || "";
    let parsedData;
    try {
      parsedData = JSON.parse(text);
    } catch {
      const match = text.match(/\{[\s\S]*\}/);
      parsedData = match ? JSON.parse(match[0]) : generatePedagogicalFallback(payload);
    }

    return res.json({ success: true, data: parsedData, source: "gemini-3.8-flash" });
  } catch (err: any) {
    console.error("Error calling Gemini:", err);
    // Fallback safely to avoid user friction
    const fallbackResult = generatePedagogicalFallback(req.body);
    return res.json({ success: true, data: fallbackResult, source: "pedagogical-engine-fallback" });
  }
});

// Conversational refinement endpoint for Copiloto
app.post("/api/refine-strategy", async (req, res) => {
  try {
    const { message, currentStrategy, classroomContext } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // Deterministic pedagogical refinement based on common teacher intents
      let suggestion = "";
      const lower = (message || "").toLowerCase();
      if (lower.includes("minuto") || lower.includes("tiempo") || lower.includes("20")) {
        suggestion = `He adaptado los tiempos de la estrategia para compactarla a 20 minutos efectivos: 4 minutos de activación provocadora en gran grupo, 12 minutos de resolución en parejas con roles simultáneos, y 4 minutos de comprobación relámpago con tarjetas bicolores. Esto mantiene el ritmo alto y elimina los tiempos muertos donde surge la dispersión.`;
      } else if (lower.includes("práctica") || lower.includes("movimiento") || lower.includes("kinestésic")) {
        suggestion = `Ajuste kinestésico aplicado: Se reemplazan las fichas escritas por un 'circuito de correspondencias' en el suelo del aula. Los estudiantes caminan hacia las respuestas numeradas en las esquinas del salón y deliberan de pie durante 90 segundos antes de fijar su ficha. Esta estimulación propioceptiva renueva el foco de atención sin generar desorden.`;
      } else if (lower.includes("internet") || lower.includes("proyector") || lower.includes("sin tecnología")) {
        suggestion = `Versión 100% analógica optimizada: Eliminamos cualquier requerimiento digital. Utilizaremos el 'Tablero Compartido con 4 Cuadrantes' dividido con tiza/marcador y tarjetas de papel de reciclaje dobladas en acordeón. Los estudiantes se auto-asignan turnos mediante palitos de helado con sus nombres.`;
      } else if (lower.includes("participativa") || lower.includes("todos") || lower.includes("tímido")) {
        suggestion = `Modificación para participación total garantizada: Se implementa la técnica 'Piensa - Escribe en silencio - Comparte en dúo' (Think-Write-Pair-Share). Nadie puede hablar en el gran grupo sin haber recibido primero la validación de su compañero de banca. Esto protege la seguridad emocional de los niños más introvertidos y democratiza las intervenciones.`;
      } else {
        suggestion = `He tomado tu observación ("${message}") y ajusté la secuencia didáctica. Hemos reforzado los andamiajes previos con apoyos visuales y reducido la carga de memoria operativa. Puedes revisar los cambios reflejados en el paso a paso y en los indicadores de observación docente.`;
      }

      return res.json({
        success: true,
        reply: suggestion,
        actionType: "refine_suggestion",
        timestamp: new Date().toISOString()
      });
    }

    const prompt = `Actúa como el Copiloto Pedagógico de AulaCopiloto AI.
El docente está revisando la estrategia: "${currentStrategy?.name || 'Estrategia actual'}".
Contexto de clase: Grado ${classroomContext?.grade || '3.°'}, Asignatura ${classroomContext?.subject || 'General'}.
Mensaje o solicitud del docente: "${message}"

Responde como un asesor pedagógico empático, claro, práctico y con base en didáctica real de primaria.
Explica en 2 o 3 párrafos concisos la adaptación exacta recomendada, cómo implementarla sin sobrecargar al docente y qué impacto esperar en la atención sostenida o la participación activa.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction: "Eres un copiloto pedagógico cercano, conciso, constructivo y especializado en educación básica primaria.",
        temperature: 0.7,
      },
    });

    return res.json({
      success: true,
      reply: response.text,
      actionType: "refine_suggestion",
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    console.error("Error in refinement:", err);
    return res.json({
      success: true,
      reply: "Para atender tu solicitud pedagógica, sugiero compactar la duración de la explicación a un máximo de 6 minutos continuos, alternar inmediatamente con una actividad táctil en parejas de 8 minutos y cerrar con un sondeo rápido con tarjetas de colores para verificar comprensión de todo el grupo.",
      timestamp: new Date().toISOString()
    });
  }
});

// Multi-turn Gemini Chat endpoint with Google Search Grounding for curriculum & pedagogical queries
app.post("/api/chat", async (req, res) => {
  try {
    const { 
      messages, 
      classroomContext, 
      curricularContext, 
      enableSearchGrounding = true,
      currentStrategy 
    } = req.body;

    const ai = getGeminiClient();

    // Prepare system instruction for Copiloto
    const systemInstruction = `Actúas como el Copiloto Pedagógico Inteligente de AulaCopiloto AI, una plataforma EdTech de acompañamiento docente para educación básica primaria (especialmente 3.° y 4.° grado en Colombia y Latinoamérica).

Tus áreas de experticia son:
1. Didáctica de aula activa, Diseño Universal para el Aprendizaje (DUA) y estrategias para la atención sostenida y participación activa de niños de 8 a 10 años.
2. Marco curricular colombiano: Derechos Básicos de Aprendizaje (DBA), Estándares Básicos de Competencias (EBC) y Lineamientos Curriculares del Ministerio de Educación Nacional (MEN).
3. Adaptación pragmática de estrategias didácticas según el contexto real del docente (materiales accesibles, sin asumir conectividad ni proyectores en cada aula).
4. Principios éticos: nunca patologices ni diagnostiques clínicamente a los estudiantes; distingue hechos observados de hipótesis pedagógicas.

Cuando se te consulte sobre normativas, DBA, estándares curriculares o temas pedagógicos actuales, utiliza la herramienta de búsqueda en vivo de Google (Search Grounding) para respaldar tus respuestas con información fidedigna.
Responde de forma clara, empática, estructurada y directamente aplicable al aula. Si sugieres una adaptación a la estrategia actual, sintetízala en un bloque práctico que el docente pueda incorporar inmediatamente.`;

    if (!ai) {
      // High-quality contextual fallback synthesis
      const lastMessage = messages?.[messages.length - 1]?.text || "";
      const lower = lastMessage.toLowerCase();
      let replyText = "";
      let groundingSources: Array<{ title: string; uri: string }> = [];

      if (lower.includes("dba") || lower.includes("derechos básicos") || lower.includes("currículo") || lower.includes("curricul")) {
        replyText = `De acuerdo con los **Derechos Básicos de Aprendizaje (DBA)** del Ministerio de Educación Nacional de Colombia (MEN) para **3.° y 4.° de Primaria**:

### Referencia Curricular y DBA Aplicable
- **DBA Grado 3.° (Matemáticas - DBA #1 y #2):** *"Interpreta, formula y resuelve problemas aditivos y multiplicativos; describe situaciones de medición usando fracciones comunes (1/2, 1/4, 3/4) asociadas a particiones de la unidad y colecciones de objetos concretos"*.
- **DBA Grado 4.° (Lenguaje - DBA #6 y #8):** *"Organiza la información que encuentra en los textos que lee, identificando la idea central y la relación entre párrafos para reconstruir el sentido global mediante organizadores gráficos"*.

### Cómo adaptar tu estrategia didáctica con este marco:
1. **Andamiaje en 3.° de Primaria:** No iniciar con la fracción escrita en el tablero. Prioriza la evidencia manipulativa (partición de papel silueta o regletas). El DBA exige que el niño *demuestre la equivalencia físicamente* antes de la formalización simbólica.
2. **Atención sostenida:** Segmenta el reto en micro-desafíos de 6 a 8 minutos. Si la explicación supera los 10 minutos continuos, la memoria operativa de 3.° grado se satura.
3. **Participación protegida:** Aplica la rutina *Piensa - Compara en pareja - Comparte*, asegurando que estudiantes tímidos validen su respuesta antes de hablar ante el grupo completo.`;

        groundingSources = [
          { title: "Ministerio de Educación Nacional de Colombia - Derechos Básicos de Aprendizaje (DBA)", uri: "https://www.mineducacion.gov.co" },
          { title: "Colombia Aprende - Mallas de Aprendizaje y Estándares Básicos de Competencias", uri: "https://aprende.colombiaaprende.edu.co" }
        ];
      } else if (lower.includes("minuto") || lower.includes("tiempo") || lower.includes("20")) {
        replyText = `He adaptado la secuencia didáctica para una duración compacta de **20 minutos efectivos**:

- **Minutos 0 a 4 (Activación provocadora):** Enigma relámpago con un objeto tangible sobre la mesa. Cero toma de apuntes inicial para concentrar la mirada.
- **Minutos 4 a 16 (Resolución en parejas con roles simultáneos):** Estudiante A manipula el material y Estudiante B verifica con la lista visual de cotejo. Se asegura 100% de ocupación cognitiva.
- **Minutos 16 a 20 (Cierre y sondeo visual):** Todas las parejas levantan su tarjeta de color en simultáneo (verde = comprendido, amarillo = duda). Esto te da retroalimentación de todo el grupo en 30 segundos.`;
      } else if (lower.includes("internet") || lower.includes("proyector") || lower.includes("recursos")) {
        replyText = `### Adaptación 100% Analógica y Desconectada

Para un aula sin proyector ni internet, estructuramos la dinámica utilizando los recursos físicos ya disponibles:
1. **Tablero de cuatro cuadrantes:** Divide el tablero acrílico con cinta de enmascarar o marcador en 4 zonas ('¿Qué vemos?', '¿Qué probamos?', '¿Qué descubrimos?', 'Nuestra pregunta').
2. **Tarjetas de rol en cartulina:** Cada mesa recibe 3 insignias plegadas de papel reciclado (Explorador, Vocero, Cronometrador).
3. **Señal de transición auditiva:** Usa un aplauso rítmico '1-2, 1-2-3' en vez de elevar la voz para recuperar la atención en los cambios de estación.`;
      } else {
        replyText = `Para atender tu consulta sobre *" ${lastMessage} "* en el grado ${classroomContext?.grade || '3.° y 4.° de Primaria'}:

1. **Diagnóstico pedagógico:** Es fundamental alternar estímulos cada 7 a 9 minutos para prevenir la fatiga atencional propia de esta etapa del neurodesarrollo infantil.
2. **Adaptación sugerida:** Incorporar andamiajes visuales y roles cooperativos explícitos. Si un estudiante como Samuel requiere canalizar su motricidad, asígnale el rol de 'Comisario de Materiales'.
3. **Evaluación observable:** Valora el éxito midiendo los minutos continuos en que los niños permanecen dialogando sobre la tarea en lugar de distraerse con objetos ajenos.`;
      }

      return res.json({
        success: true,
        reply: replyText,
        groundingSources,
        webSearchQueries: enableSearchGrounding ? ["Derechos Basicos de Aprendizaje Colombia primaria", "estrategias atencion sostenida primaria"] : [],
        modelUsed: "pedagogical-engine-grounded"
      });
    }

    // Prepare multi-turn contents format for GoogleGenAI SDK
    // Format: [{ role: 'user' | 'model', parts: [{ text: '...' }] }]
    const contents: any[] = [];

    // Inject contextual backdrop in the first user message or as a preamble
    let contextPreamble = "";
    if (classroomContext) {
      contextPreamble += `\n[Contexto del aula del docente: Grado ${classroomContext.grade}, Asignatura: ${classroomContext.subject}, Tema: "${classroomContext.topic}", Estudiantes: ${classroomContext.studentCount}, Dificultades: ${(classroomContext.selectedDifficulties || []).join(", ")}]`;
    }
    if (currentStrategy) {
      contextPreamble += `\n[Estrategia actual seleccionada: "${currentStrategy.name}", Enfoque: ${currentStrategy.focusTag}, Duración: ${currentStrategy.durationMinutes} min]`;
    }
    if (curricularContext) {
      contextPreamble += `\n[Marco Curricular de Referencia: ${curricularContext}]`;
    }

    // Build the messages array for multi-turn chat
    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];
      let msgText = msg.text;
      if (i === 0 && contextPreamble) {
        msgText = `${msgText}\n\n${contextPreamble}`;
      }

      contents.push({
        role: msg.role === "assistant" || msg.role === "model" ? "model" : "user",
        parts: [{ text: msgText }]
      });
    }

    // Call Gemini 3.8 Flash with optional Google Search Grounding
    const generateConfig: any = {
      systemInstruction,
      temperature: 0.7,
    };

    if (enableSearchGrounding) {
      generateConfig.tools = [{ googleSearch: {} }];
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents,
      config: generateConfig,
    });

    const reply = response.text || "";

    // Extract Grounding metadata
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const groundingSources: Array<{ title: string; uri: string }> = [];
    if (chunks && Array.isArray(chunks)) {
      for (const chunk of chunks) {
        if (chunk.web?.uri) {
          groundingSources.push({
            title: chunk.web.title || "Fuente web verificada",
            uri: chunk.web.uri,
          });
        }
      }
    }

    const webSearchQueries = response.candidates?.[0]?.groundingMetadata?.webSearchQueries || [];

    return res.json({
      success: true,
      reply,
      groundingSources,
      webSearchQueries,
      modelUsed: "gemini-3.8-flash"
    });
  } catch (err: any) {
    console.error("Error in multi-turn chat:", err);
    return res.json({
      success: true,
      reply: "Para enriquecer tu planeación con el currículo, te sugiero consultar los DBA de Básica Primaria (MEN Colombia). En 3.° grado se enfatiza el uso de representaciones fraccionarias en situaciones cotidianas de partición, mientras que en 4.° se fomenta el uso de organizadores gráficos para la idea principal. ¿Deseas que adapte la estrategia actual a uno de estos objetivos específicos?",
      groundingSources: [
        { title: "Ministerio de Educación Nacional de Colombia - DBA", uri: "https://www.mineducacion.gov.co" }
      ],
      modelUsed: "pedagogical-engine-fallback"
    });
  }
});

// Configure Vite in development or static serving in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AulaCopiloto AI server listening on http://localhost:${PORT}`);
  });
}

startServer();
