import { StudentBitacora, ClassroomSituation, InterventionRecord, CatalogStrategy, GeneratedStrategyPayload } from '../types';

export const INITIAL_STUDENTS: StudentBitacora[] = [
  {
    id: 'est-001',
    internalCode: 'E-301',
    studentName: 'Samuel Calderón',
    grade: '3.° Primaria',
    schoolGroup: '3.° A',
    learningContext: {
      personalInterests: ['Dinosaurios', 'Mecánica y engranajes', 'Construcción con bloques', 'Animales marinos'],
      curiosityTopics: ['¿Cómo vuelan los aviones?', 'Fósiles y arqueología', 'Misterios de la selva amazónica'],
      facilitatingActivities: ['Retos con objetos manipulables', 'Dibujo de mapas y croquis', 'Tareas con movimiento por el aula'],
      workPreferences: ['Equipos pequeños (3 personas)', 'Roles prácticos con responsabilidades físicas'],
      favorableSupports: ['Instrucciones fraccionadas en 2 pasos máximo', 'Uso de temporizadores visuales de arena', 'Tarjetas de rol visibles sobre el pupitre']
    },
    attentionObservations: {
      bestFocusActivities: [
        'Construcción y conteo con bloques lógicos (foco sostenido de 22 min)',
        'Resolución de acertijos de pistas escondidas por el salón',
        'Modelado con plastilina o arcilla'
      ],
      distractionTriggers: [
        'Explicaciones orales continuas de más de 8 minutos sin apoyo gráfico',
        'Copiar textos largos del tablero al cuaderno',
        'Estar sentado en filas posteriores lejos del foco central'
      ],
      optimalClassMoments: ['Primeros 25 minutos de la mañana', 'Inmediatamente después de una pausa activa breve'],
      favorableEnvironmentConditions: ['Puesto cerca de la ventana con luz natural', 'Mesa de trabajo despejada de elementos distractores'],
      specificNotes: [
        {
          id: 'obs-001',
          date: '24 de Octubre, 2026',
          situation: 'Clase de Geometría (cuerpos geométricos). Se distraía girando la cartuchera tras 10 min de teoría.',
          activityConditions: 'Explicación frontal colectiva en el tablero.',
          studentResponse: 'Al entregarle una figura tridimensional de madera para identificar vértices, recuperó el foco inmediatamente.',
          teacherReflection: 'Samuel procesa la información principalmente por el canal háptico y kinestésico. Requiere andamiajes táctiles inmediatos.',
          type: 'hecho_observado'
        },
        {
          id: 'obs-002',
          date: '15 de Octubre, 2026',
          situation: 'Taller de lectura compartida.',
          activityConditions: 'Lectura por turnos en gran grupo.',
          studentResponse: 'Se ofreció voluntario para sostener las láminas ilustradas frente a sus compañeros con gran orgullo y concentración.',
          teacherReflection: 'Asignarle un rol motriz con sentido dentro del aula canaliza positivamente su necesidad de acción física.',
          type: 'reflexion_docente'
        }
      ]
    },
    activeParticipation: {
      habitualForms: ['Respuestas rápidas impulsivas cuando el tema le emociona', 'Acción directa antes que elaboración escrita'],
      responseToFormats: {
        individual: 'Foco intermitente si la tarea es puramente abstracta; alto si incluye dibujo.',
        collaborative: 'Muy colaborador cuando se le asigna rol de constructor o explorador.',
        ludic: 'Participación entusiasta y sostenida; acata reglas de juego si son transparentes.',
        handsOn: 'Su formato de mayor éxito; muestra persistencia y curiosidad.'
      },
      groupInteractions: 'Empático con sus pares; en ocasiones se impacienta si el equipo tarda en tomar decisiones de acción.',
      initiativeMoments: [
        'Propuso usar tapas de botellas para contar decenas en matemáticas.',
        'Organizó los materiales de su mesa voluntariamente al terminar el experimento.'
      ]
    },
    pedagogicalEvolution: [
      {
        date: 'Septiembre 2026',
        strategyApplied: 'Uso de tarjeta de rol de "Explorador de materiales"',
        observedResponse: 'Redujo levantamientos espontáneos del pupitre de 7 a 2 por sesión.',
        attentionChange: 'Aumento de 9 a 18 minutos de permanencia en la tarea asignada.',
        participationChange: 'Aportó en la verificación de conteo de su trío.',
        futureAdjustment: 'Incorporar señales visuales antes de pedirle que cambie de actividad.'
      }
    ],
    lastUpdated: '24 Octubre 2026'
  },
  {
    id: 'est-002',
    internalCode: 'E-302',
    studentName: 'Valentina Ríos',
    grade: '3.° Primaria',
    schoolGroup: '3.° A',
    learningContext: {
      personalInterests: ['Cuentos de hadas y mitos colombianos', 'Pintura con témperas', 'Cuidado de plantas y huerto'],
      curiosityTopics: ['¿De dónde vienen las mariposas?', 'Leyendas de los pueblos indígenas', 'La música de las aves'],
      facilitatingActivities: ['Lectura acompañada en voz baja', 'Creación de viñetas gráficas', 'Diálogos reflexivos en parejas'],
      workPreferences: ['Dúos con compañeras de confianza', 'Espacios tranquilos con bajo nivel de ruido ambiental'],
      favorableSupports: ['Tiempo previo para pensar antes de ser llamada a responder', 'Esquemas visuales con colores pastel', 'Validación afectiva discreta']
    },
    attentionObservations: {
      bestFocusActivities: [
        'Ilustración secuencial de un cuento escuchado (foco de más de 30 min)',
        'Clasificación de hojas recolectadas en el patio escolar',
        'Redacción libre guiada con palabras detonantes'
      ],
      distractionTriggers: [
        'Ruidos repentinos o gritos en el salón que le causan sobresalto',
        'Preguntas directas sorpresivas frente a todo el salón sin preparación',
        'Dinámicas competitivas con presión de tiempo acelerada'
      ],
      optimalClassMoments: ['Media mañana tras el refrigerio', 'Momentos de trabajo autónomo en parejas'],
      favorableEnvironmentConditions: ['Ubicación en zona intermedia del aula con compañera tranquila', 'Música instrumental suave de fondo'],
      specificNotes: [
        {
          id: 'obs-003',
          date: '21 de Octubre, 2026',
          situation: 'Debate grupal sobre el cuidado del agua.',
          activityConditions: 'Mesa redonda en gran grupo.',
          studentResponse: 'No levantó la mano en plenaria; al pedirle que compartiera su idea en dúo con Sofía, expuso una solución muy profunda sobre recolección de lluvia.',
          teacherReflection: 'La técnica Think-Pair-Share es el andamiaje ideal para proteger su seguridad emocional y permitir que emerja su rica capacidad reflexiva.',
          type: 'hecho_observado'
        }
      ]
    },
    activeParticipation: {
      habitualForms: ['Escucha atenta y profunda', 'Expresión escrita y gráfica rica en metáforas', 'Participación verbal serena en grupos pequeños'],
      responseToFormats: {
        individual: 'Muy alto compromiso y minuciosidad en el acabado de sus tareas.',
        collaborative: 'Excelente en parejas; en grupos de más de 4 personas tiende a replegarse y dejar hablar a los más extrovertidos.',
        ludic: 'Participa si el juego es cooperativo, no eliminatorio ni de velocidad.',
        handsOn: 'Alta destreza motriz fina y cuidado estético.'
      },
      groupInteractions: 'Respetuosa, atenta a las necesidades de los demás, mediadora natural en pequeños desacuerdos.',
      initiativeMoments: [
        'Creó un separador de libros temático para la biblioteca del salón.',
        'Ayudó a un compañero que tenía dificultad para trazar las figuras geométricas.'
      ]
    },
    pedagogicalEvolution: [
      {
        date: 'Octubre 2026',
        strategyApplied: 'Técnica Piensa-Compara en parejas-Comparte en grupo',
        observedResponse: 'Aceptó compartir en voz alta la conclusión de su pareja por primera vez en el bimestre.',
        attentionChange: 'Atención sostenida durante toda la rutina sin signos de ansiedad.',
        participationChange: 'De participación nula en plenaria a 1 intervención semanal voluntaria.',
        futureAdjustment: 'Continuar reforzando con tarjetas de roles donde asuma ser la "Portavoz de acuerdos".'
      }
    ],
    lastUpdated: '21 Octubre 2026'
  },
  {
    id: 'est-003',
    internalCode: 'E-401',
    studentName: 'Mateo González',
    grade: '4.° Primaria',
    schoolGroup: '4.° B',
    learningContext: {
      personalInterests: ['Astronomía y planetas', 'Acertijos lógicos y sudoku', 'Ajedrez escolar', 'Fútbol y táctica'],
      curiosityTopics: ['¿Qué hay dentro de un agujero negro?', 'Robótica espacial', 'Criptografía y códigos secretos'],
      facilitatingActivities: ['Problemas desafiantes con múltiples soluciones', 'Debates con argumentación basada en datos', 'Diseño de experimentos'],
      workPreferences: ['Equipos colaborativos con roles definidos', 'Oportunidades de asumir liderazgo o tutoría entre iguales'],
      favorableSupports: ['Retos de ampliación o "misiones estrella" cuando finaliza antes de tiempo', 'Preguntas metacognitivas abiertas', 'Pautas claras para no adelantar las respuestas de sus compañeros']
    },
    attentionObservations: {
      bestFocusActivities: [
        'Resolución de situaciones problema complejas (foco continuo de 35 min)',
        'Partidas de ajedrez o lógica matemática aplicada',
        'Investigación guiada con enciclopedias o láminas científicas'
      ],
      distractionTriggers: [
        'Repetición de ejercicios mecánicos que ya domina completamente',
        'Tiempos muertos prolongados esperando que el resto termine',
        'Actividades sin desafío cognitivo real'
      ],
      optimalClassMoments: ['Inicio de jornada', 'Talleres prácticos de resolución de problemas'],
      favorableEnvironmentConditions: ['Acceso al rincón de desafíos del aula', 'Pupitre organizado sin sobrecarga sensorial'],
      specificNotes: [
        {
          id: 'obs-004',
          date: '18 de Octubre, 2026',
          situation: 'Clase de fracciones equivalentes. Terminó los 5 ejercicios en 4 minutos.',
          activityConditions: 'Práctica individual guiada.',
          studentResponse: 'Comenzó a hablar con compañeros de atrás y a balancearse en la silla por falta de ocupación.',
          teacherReflection: 'Cuando se le asignó el rol de "Tutor pedagógico" para crear un acertijo de fracciones para el tablero, canalizó su capacidad con impecable madurez.',
          type: 'hecho_observado'
        }
      ]
    },
    activeParticipation: {
      habitualForms: ['Levanta la mano con frecuencia y argumenta con vocabulario preciso', 'Pregunta constantemente "¿Por qué ocurre esto?"'],
      responseToFormats: {
        individual: 'Muy rápido; requiere andamiajes de profundización para no descuidar la prolijidad.',
        collaborative: 'Líder positivo si se le orienta a escuchar y no imponer la respuesta.',
        ludic: 'Muy competitivo; aprende a gestionar la frustración en juegos de equipo.',
        handsOn: 'Disfruta montajes experimentales y registros en tablas.'
      },
      groupInteractions: 'Aceptado por sus compañeros; admiran sus conocimientos astronómicos y recurren a él para aclarar dudas.',
      initiativeMoments: [
        'Elaboró una maqueta del sistema solar en material reciclado para el salón.',
        'Propuso un sistema de puntuación para el torneo de lectura de velocidad comprensiva.'
      ]
    },
    pedagogicalEvolution: [
      {
        date: 'Septiembre 2026',
        strategyApplied: 'Caja de Misiones de Extensión Cognitiva',
        observedResponse: 'Eliminó las interrupciones por aburrimiento; resolvió 4 enigmas adicionales.',
        attentionChange: 'Foco constante durante los 45 minutos de la sesión.',
        participationChange: 'Explicó su método de resolución a la clase sin soberbia.',
        futureAdjustment: 'Estimular su redacción descriptiva, complementando su razonamiento lógico.'
      }
    ],
    lastUpdated: '18 Octubre 2026'
  },
  {
    id: 'est-004',
    internalCode: 'E-303',
    studentName: 'Lucía Morales',
    grade: '3.° Primaria',
    schoolGroup: '3.° A',
    learningContext: {
      personalInterests: ['Música folclórica y percusión', 'Cuentos con rimas y canciones', 'Cocina infantil'],
      curiosityTopics: ['Instrumentos musicales del Caribe', 'Recetas tradicionales de la abuela', 'Danza tradicional'],
      facilitatingActivities: ['Rimas mnemotécnicas', 'Tarjetas ilustradas de secuencia temporal', 'Respuestas corales rítmicas'],
      workPreferences: ['Tríos con dinámicas de roles', 'Trabajo en mesa circular'],
      favorableSupports: ['Instrucciones con apoyo gestual o rítmico', 'Listas de cotejo visuales con dibujos (paso 1, paso 2)', 'Pausas activas coordinadas']
    },
    attentionObservations: {
      bestFocusActivities: [
        'Dramatización y juego de roles con disfraces sencillos (foco de 25 min)',
        'Ejercicios de ortografía acompañados de palmoteos rítmicos',
        'Armado de rompecabezas secuenciales'
      ],
      distractionTriggers: [
        'Instrucciones compuestas con más de 3 órdenes consecutivas sin pausa',
        'Textos monocromáticos sin imágenes de apoyo',
        'Permanecer más de 15 minutos en silencio inmóvil'
      ],
      optimalClassMoments: ['Bloques que inician con una canción o rima activadora', 'Primeras horas de la mañana'],
      favorableEnvironmentConditions: ['Pupitre cerca del docente para contacto visual cercano', 'Cartelera de normas del día a la vista'],
      specificNotes: [
        {
          id: 'obs-005',
          date: '22 de Octubre, 2026',
          situation: 'Instrucciones para elaborar un texto descriptivo.',
          activityConditions: 'Docente dictó 4 pasos seguidos sin escribirlos.',
          studentResponse: 'Se quedó paralizada en el paso 1 mirando alrededor sin saber cómo continuar.',
          teacherReflection: 'La memoria de trabajo verbal de Lucía necesita apoyo en iconografía secuenciada en el tablero.',
          type: 'reflexion_docente'
        }
      ]
    },
    activeParticipation: {
      habitualForms: ['Expresión gestual rica y espontánea', 'Canto y repetición entusiasta'],
      responseToFormats: {
        individual: 'Requiere recordatorios amables para retomar tras distracciones breves.',
        collaborative: 'Aporta alegría y dinamismo; excelente en dramatizaciones.',
        ludic: 'Nivel óptimo de enganche y participación.',
        handsOn: 'Muy entusiasta en actividades que involucren pegar, recortar o clasificar.'
      },
      groupInteractions: 'Cariñosa, sociable, busca el contacto con pares.',
      initiativeMoments: ['Inventó una rima para recordar los signos de puntuación que toda la clase adoptó.']
    },
    pedagogicalEvolution: [
      {
        date: 'Octubre 2026',
        strategyApplied: 'Ruta visual de 3 pasos en el pupitre con pictogramas',
        observedResponse: 'Completó la ficha de trabajo de manera autónoma sin requerir rescate constante.',
        attentionChange: 'Atención sostenida en incrementos de 12 a 16 minutos.',
        participationChange: 'Pidió la palabra para leer su producto con voz clara.',
        futureAdjustment: 'Acompañar las tareas complejas con organizadores gráficos en forma de acordeón.'
      }
    ],
    lastUpdated: '22 Octubre 2026'
  },
  {
    id: 'est-005',
    internalCode: 'E-402',
    studentName: 'Tomás Benítez',
    grade: '4.° Primaria',
    schoolGroup: '4.° B',
    learningContext: {
      personalInterests: ['Cómics e historietas', 'Papiroflexia y origami', 'Fotografía de la naturaleza'],
      curiosityTopics: ['¿Cómo se crean los dibujos animados?', 'Insectos camuflados', 'Volcanes y terremotos'],
      facilitatingActivities: ['Mapas conceptuales visuales tipo Sketchnoting', 'Lectura de infografías', 'Creación de viñetas'],
      workPreferences: ['Trabajo individual concentrado con consulta puntual al docente', 'Parejas con roles de ilustrador / redactor'],
      favorableSupports: ['Permitirle tomar apuntes dibujando conceptos clave', 'Glosarios visuales', 'Consignas escritas en el tablero']
    },
    attentionObservations: {
      bestFocusActivities: [
        'Diseño de infografías en cartulina (foco de más de 40 min ininterrumpidos)',
        'Modelado de procesos con esquemas de flechas y colores',
        'Lectura silenciosa de historietas pedagógicas'
      ],
      distractionTriggers: [
        'Exposiciones orales sin soporte visual o láminas',
        'Dictados rápidos donde no alcanza a procesar la forma de las palabras',
        'Discusiones ruidosas desordenadas sin moderador'
      ],
      optimalClassMoments: ['Tardes tranquilas o bloques dobles de ciencias naturales'],
      favorableEnvironmentConditions: ['Esquina luminosa con buena visual al tablero principal'],
      specificNotes: [
        {
          id: 'obs-006',
          date: '19 de Octubre, 2026',
          situation: 'Clase de Ciencias Naturales (ciclo del agua).',
          activityConditions: 'Explicación magistral con lámina a color.',
          studentResponse: 'Creó en su cuaderno un cómic de 4 viñetas donde una gota de agua explicaba la evaporación.',
          teacherReflection: 'El pensamiento visual de Tomás es extraordinario. Validar sus bocetos como evidencia de aprendizaje fomenta su autoestima.',
          type: 'hecho_observado'
        }
      ]
    },
    activeParticipation: {
      habitualForms: ['Aporte de resúmenes gráficos para el salón', 'Respuestas reflexivas tras procesar la información visualmente'],
      responseToFormats: {
        individual: 'Máxima concentración y autonomía.',
        collaborative: 'Prefiere el rol de diseñador o sintetizador gráfico del equipo.',
        ludic: 'Participa con serenidad en juegos de mesa y memoria visual.',
        handsOn: 'Preciso en doblado de papel, recortado y rotulación.'
      },
      groupInteractions: 'Tranquilo, respetuoso, apreciado por sus dibujos para el periódico mural.',
      initiativeMoments: ['Diseñó el logotipo oficial del proyecto ambiental de 4.° grado.']
    },
    pedagogicalEvolution: [
      {
        date: 'Septiembre 2026',
        strategyApplied: 'Uso de Bitácora Visual de Ciencias (Sketchnote)',
        observedResponse: 'Mejoró la retención de conceptos clave de 60% a 92% en evaluaciones formativas.',
        attentionChange: 'Atención total durante las secuencias de observación y dibujo.',
        participationChange: 'Presentó su infografía a los estudiantes de 3.° grado con gran seguridad.',
        futureAdjustment: 'Incentivarle a acompañar sus dibujos con párrafos de síntesis explicativa.'
      }
    ],
    lastUpdated: '19 Octubre 2026'
  },
  {
    id: 'est-006',
    internalCode: 'E-304',
    studentName: 'Sofía Duarte',
    grade: '3.° Primaria',
    schoolGroup: '3.° A',
    learningContext: {
      personalInterests: ['Veterinaria y rescate animal', 'Jardinería escolar', 'Cuentos de aventuras'],
      curiosityTopics: ['¿Cómo se comunican los delfines?', 'Plantas medicinales colombianas', 'El ciclo de las estaciones'],
      facilitatingActivities: ['Cuidado de seres vivos y plantas', 'Experimentos sencillos con agua y tierra', 'Debates en círculo reflexivo'],
      workPreferences: ['Equipos heterogéneos', 'Actividades al aire libre o en el laboratorio escolar'],
      favorableSupports: ['Preguntas detonantes conectadas con la vida cotidiana', 'Bitácoras de registro de campo']
    },
    attentionObservations: {
      bestFocusActivities: [
        'Registro de crecimiento de semillas en la huerta escolar (foco de 30 min)',
        'Clasificación de seres vivos con tarjetas fotográficas reales',
        'Lectura dramatizada con títeres de dedo'
      ],
      distractionTriggers: ['Temas desconectados de su realidad inmediata o puramente memorísticos', 'Monotonía en la entonación de la clase'],
      optimalClassMoments: ['Media mañana', 'Clases con componente práctico o vivencial'],
      favorableEnvironmentConditions: ['Mesa de trabajo limpia, contacto cercano con el jardín interior'],
      specificNotes: [
        {
          id: 'obs-007',
          date: '17 de Octubre, 2026',
          situation: 'Clase de ecosistemas colombianos.',
          activityConditions: 'Lectura de texto informativo en el libro de texto.',
          studentResponse: 'Se desenganchó a las pocas líneas; al traer hojas reales para observar la nervadura con lupa, su nivel de indagación fue sobresaliente.',
          teacherReflection: 'El anclaje en el mundo natural es su motor de atención.',
          type: 'hecho_observado'
        }
      ]
    },
    activeParticipation: {
      habitualForms: ['Participación activa con ejemplos de sus mascotas o del entorno campestre'],
      responseToFormats: {
        individual: 'Buena dedicación si el tema le despierta empatía.',
        collaborative: 'Cálida, integradora de compañeros retraídos.',
        ludic: 'Disfruta juegos de simulación ecológica.',
        handsOn: 'Exploración sensorial cuidadosa y respetuosa.'
      },
      groupInteractions: 'Líder afectiva; promueve que todos en la mesa tengan materiales.',
      initiativeMoments: ['Propuso crear una estación de riego por goteo con botellas plásticas para las plantas del aula.']
    },
    pedagogicalEvolution: [
      {
        date: 'Octubre 2026',
        strategyApplied: 'Uso de Cuaderno de Campo de Pequeña Científica',
        observedResponse: 'Registró meticulosamente 5 observaciones semanales sin requerir recordatorios.',
        attentionChange: 'Foco constante en cada sesión de ciencias.',
        participationChange: 'Voluntaria recurrente para exponer las hipótesis de su equipo.',
        futureAdjustment: 'Conectar sus temas de interés con operaciones matemáticas de peso y medida.'
      }
    ],
    lastUpdated: '17 Octubre 2026'
  }
];

export const INITIAL_SITUATIONS: ClassroomSituation[] = [
  {
    id: 'sit-001',
    date: '27 de Octubre, 2026',
    grade: '3.° Primaria',
    subject: 'Matemáticas',
    topic: 'Comprensión y representación de fracciones con material concreto',
    studentCount: 28,
    durationMinutes: 45,
    learningGoal: 'Comprender el concepto de fracción como parte de un todo mediante manipulación de tiras fraccionarias y resolución de retos en parejas.',
    situationDescription: 'Durante la explicación de fracciones en el tablero, a los 8-10 minutos de clase, la mayoría de los estudiantes comienza a mirar hacia el patio, jugar con los borradores o hablar entre bancas. Solo 4 estudiantes (siempre los mismos) levantan la mano. Cuando pasamos al libro, varios quedan bloqueados sin saber qué hacer y expresan que "las fracciones son muy difíciles".',
    selectedDifficulties: [
      'Dificultad para mantener la atención',
      'Baja participación oral',
      'Distracción durante las explicaciones',
      'Dificultad para completar las tareas'
    ],
    groupCharacteristics: {
      interests: 'Retos de cocina, recetas, dinosaurios, acertijos y juegos de competencia amistosa en equipos.',
      highParticipationActivities: 'Manipulación de regletas, armado de figuras con tangram, dinámicas de roles.',
      priorKnowledgeLevel: 'Heterogéneo',
      learningPaces: 'Un tercio del grupo procesa muy rápido y se impacienta; otro tercio requiere apoyo visual y kinestésico constante.',
      resources: 'Regletas de Cuisenaire de plástico, papel silueta de colores, tijeras escolares, tablero acrílico, reloj de pared.',
      schoolContext: 'I.E. San Francisco Javier (Aula 302). Aula con ventilación natural, sin proyector permanente pero con excelente luz diurna.',
      previousStrategiesTested: 'Explicación paso a paso con círculos divididos en el tablero. Resultado: atención dispersa y frustración al transferir al cuaderno.',
      additionalNotes: 'Se desea priorizar una dinámica donde ningún estudiante se quede pasivo esperando su turno.'
    },
    selectedStudentIds: ['est-001', 'est-002', 'est-004'],
    status: 'estrategia_generada'
  },
  {
    id: 'sit-002',
    date: '25 de Octubre, 2026',
    grade: '4.° Primaria',
    subject: 'Lenguaje y Literatura',
    topic: 'Identificación de la idea principal y secundaria en textos narrativos',
    studentCount: 30,
    durationMinutes: 50,
    learningGoal: 'Identificar la idea principal en leyendas tradicionales colombianas utilizando subrayado selectivo y organizadores visuales en tríos.',
    situationDescription: 'Al leer la leyenda de "El Mohán", los estudiantes se entusiasman con el relato oral inicial, pero al pedirles trabajo individual sobre la lectura fotocopiada, la atención decae fuertemente. Escasa interacción académica entre pares; quienes terminan rápido interrumpen a los que aún leen con lentitud.',
    selectedDifficulties: [
      'Dificultad para mantener la atención',
      'Escasa interacción entre compañeros',
      'Dificultad para completar las tareas'
    ],
    groupCharacteristics: {
      interests: 'Mitos y leyendas locales, historietas de superhéroes, tecnología y creación plástica.',
      highParticipationActivities: 'Lectura dramatizada con voces moduladas, creación de cómics.',
      priorKnowledgeLevel: 'Medio',
      learningPaces: 'Gran variabilidad en velocidad lectora (entre 60 y 115 palabras por minuto).',
      resources: 'Textos impresos de leyendas, resaltadores de 2 colores, cartulina en cuartos.',
      schoolContext: 'Grupo numeroso (30 estudiantes). Mesas organizadas en herradura.',
      previousStrategiesTested: 'Lectura silenciosa individual con cuestionario tradicional de 5 preguntas. Resultado: 40% de tareas incompletas.',
      additionalNotes: 'Se necesita una estrategia que nivele las diferencias de velocidad lectora sin estigmatizar.'
    },
    selectedStudentIds: ['est-003', 'est-005'],
    status: 'analizada'
  },
  {
    id: 'sit-003',
    date: '20 de Octubre, 2026',
    grade: '3.° Primaria',
    subject: 'Ciencias Naturales',
    topic: 'Cadenas tróficas y roles ecológicos en los ecosistemas locales',
    studentCount: 27,
    durationMinutes: 40,
    learningGoal: 'Comprender las relaciones entre productores, consumidores y descomponedores a través de una red alimentaria viviente.',
    situationDescription: 'El grupo mostraba dispersión al clasificar animales en listas teóricas. Se diseñó la estrategia de la "Red Trófica de Ovillos de Lana" donde cada estudiante representaba un organismo y sostenía un hilo conductor.',
    selectedDifficulties: [
      'Dificultad para mantener la atención',
      'Desinterés por las actividades'
    ],
    groupCharacteristics: {
      interests: 'Animales de la selva y el océano, experimentos táctiles, salidas al patio.',
      highParticipationActivities: 'Dinámicas kinestésicas y juegos de simulación.',
      priorKnowledgeLevel: 'Medio',
      learningPaces: 'Dinámico y activo.',
      resources: 'Ovillos de lana de colores, solapines con fotos de animales autóctonos, tarjetas de rol.',
      schoolContext: 'Patio cubierto o salón con espacio central despejado.',
      previousStrategiesTested: 'Listas en el cuaderno copiadas del libro. Resultado: desconexión y memorización superficial.',
      additionalNotes: 'Estrategia ya aplicada con resultados sobresalientes documentados en el historial.'
    },
    selectedStudentIds: ['est-001', 'est-006'],
    status: 'aplicada'
  }
];

export const INITIAL_INTERVENTIONS: InterventionRecord[] = [
  {
    id: 'int-001',
    situationId: 'sit-003',
    date: '22 de Octubre, 2026',
    grade: '3.° Primaria (3.° A)',
    subject: 'Ciencias Naturales',
    topic: 'Redes tróficas vivientes',
    strategyName: 'La Red Trófica Conectada: Dinámica Kinestésica con Ovillo de Lana',
    targetGroupOrStudents: 'Grupo completo de 3.° A (27 estudiantes, con énfasis en Samuel C. y Sofía D.)',
    initialSituation: 'Dispersión tras 10 min de lectura pasiva; solo 4 estudiantes participaban al preguntar por productores y consumidores en el libro.',
    observedOutcome: 'Atención focalizada durante los 35 minutos completos de la dinámica. Al simular la desaparición del jaguar y sentir la tensión en el hilo de lana, los estudiantes explicaron espontáneamente el desequilibrio ecológico sin necesidad de dictar conceptos.',
    engagementMinutes: 32,
    participationPercentage: 96,
    teacherReflection: 'La analogía táctil del hilo de lana hizo tangible un concepto abstracto. Samuel C. permaneció 100% concentrado al sostener el rol de "Hongo descomponedor". La evidencia demuestra que en 3.° de primaria la comprensión conceptual se afianza primero en el cuerpo y los sentidos antes de formalizarse en el cuaderno.',
    recommendedAdjustments: 'Para la próxima sesión, asignar a un estudiante el rol de "Fotógrafo cronista" para registrar los momentos clave y plasmarlos en el periódico mural.',
    ratingAttention: 5,
    ratingParticipation: 5
  },
  {
    id: 'int-002',
    situationId: 'sit-prev-002',
    date: '16 de Octubre, 2026',
    grade: '4.° Primaria (4.° B)',
    subject: 'Matemáticas',
    topic: 'Problemas de multiplicación y división en el mercado escolar',
    strategyName: 'Estaciones de Compra y Venta con Billetes Didácticos y Roles Rotativos',
    targetGroupOrStudents: 'Equipos de 4 estudiantes (Énfasis en Mateo G. y Tomás B.)',
    initialSituation: 'Aburrimiento en resolución de guías mecánicas; Mateo terminaba en 5 minutos y distraía; otros 10 alumnos no pasaban del primer enunciado.',
    observedOutcome: 'Cada mesa asumió un puesto del mercado (frutería, papelería, panadería). Se establecieron roles: cajero, auditor, comprador y revisor. Disminuyeron las interrupciones en un 80% y todos los equipos completaron al menos 4 transacciones con comprobación matemática.',
    engagementMinutes: 40,
    participationPercentage: 90,
    teacherReflection: 'El rol de Auditor asignado a Mateo le permitió profundizar y revisar con empatía las cuentas de sus pares sin generar tensión. El contexto lúdico de mercado otorgó sentido inmediato a las operaciones.',
    recommendedAdjustments: 'Añadir tarjetas de "Desafíos imprevistos" (ej: inflación del 10% o descuentos especiales) para mantener la sorpresa en la última rotación.',
    ratingAttention: 4,
    ratingParticipation: 5
  },
  {
    id: 'int-003',
    situationId: 'sit-prev-001',
    date: '08 de Octubre, 2026',
    grade: '3.° Primaria (3.° A)',
    subject: 'Lenguaje',
    topic: 'Estructura del cuento fantástico: inicio, nudo y desenlace',
    strategyName: 'El Dado Mágico de Historias y la Ruleta de Emociones',
    targetGroupOrStudents: 'Tríos heterogéneos (Énfasis en Valentina R. y Lucía M.)',
    initialSituation: 'Silencio y miedo al ridículo al pedir narrar historias frente al grupo completo. Valentina no participaba y Lucía se dispersaba con facilidad.',
    observedOutcome: 'El dado con pictogramas redujo la carga de inventar desde cero. En tríos, cada niño lanzó un dado (personaje, lugar, conflicto) y construyeron un relato breve de 3 viñetas. Valentina fue la portavoz de su trío con visible serenidad.',
    engagementMinutes: 28,
    participationPercentage: 85,
    teacherReflection: 'La estructura lúdica con elementos al azar actúa como un andamiaje protector: el error no es personal, sino parte del juego. Valentina demostró que sí tiene una imaginación fecunda cuando el entorno la protege de la exposición precipitada.',
    recommendedAdjustments: 'Ofrecer opciones de entrega: grabación de audio en el celular docente o presentación con títeres para quienes aún tengan reparo en hablar ante el pleno.',
    ratingAttention: 4,
    ratingParticipation: 4
  }
];

export const INITIAL_CATALOG_STRATEGIES: CatalogStrategy[] = [
  {
    id: 'cat-001',
    title: 'Estaciones de Aprendizaje Cooperativo con Roles de Foco',
    focusTag: 'Atención & Trabajo Cooperativo',
    description: 'Rotación estructurada por 3 o 4 mesas con consignas visuales breves (7-8 min por estación) y roles interdependientes para cada integrante.',
    pedagogicalObjective: 'Fragmentar el tiempo de clase en bloques atencionales manejables fomentando la responsabilidad compartida.',
    gradeLevels: ['3.° Primaria', '4.° Primaria'],
    subjects: ['Matemáticas', 'Ciencias Naturales', 'Lenguaje'],
    estimatedDuration: 45,
    materials: ['Mesas organizadas', 'Tarjetas de rol', 'Sobres con pistas o consignas', 'Temporizador visual'],
    isCustomized: false,
    category: 'aprendizaje_cooperativo'
  },
  {
    id: 'cat-002',
    title: 'Rutina de Pensamiento "Veo - Pienso - Me Pregunto" con Andamiaje Táctil',
    focusTag: 'Atención Sostenida & Curiosidad',
    description: 'Estructura de indagación guiada en 3 fases diferenciadas con tarjetas de respuesta secuenciales para canalizar la atención sin saturación verbal.',
    pedagogicalObjective: 'Desarrollar el pensamiento crítico y la observación minuciosa antes de saltar a conclusiones precipitadas.',
    gradeLevels: ['3.° Primaria', '4.° Primaria'],
    subjects: ['Ciencias Sociales', 'Ciencias Naturales', 'Artes'],
    estimatedDuration: 35,
    materials: ['Estímulo visual detonante', 'Organizadores gráficos simples', 'Post-its o tarjetas tricolores'],
    isCustomized: false,
    category: 'atencion_sostenida'
  },
  {
    id: 'cat-003',
    title: 'Misión Gamificada por Niveles "El Enigma del Saber"',
    focusTag: 'Gamificación & Motivación Intrínseca',
    description: 'Desafío pedagógico estructurado en 3 niveles de dificultad creciente con narrativa de detectives y retroalimentación formativa inmediata.',
    pedagogicalObjective: 'Sostener el compromiso cognitivo alineando el nivel del reto con la zona de desarrollo próximo.',
    gradeLevels: ['3.° Primaria', '4.° Primaria'],
    subjects: ['Matemáticas', 'Lenguaje', 'Ciencias'],
    estimatedDuration: 40,
    materials: ['Sobres numerados Nivel 1, 2 y 3', 'Sellos o medidores de avance', 'Campanilla de aviso'],
    isCustomized: false,
    category: 'gamificacion'
  },
  {
    id: 'cat-004',
    title: 'Piensa - Escribe - Compara en Dúo - Comparte en Pleno (Think-Pair-Share)',
    focusTag: 'Participación Activa & Seguridad Emocional',
    description: 'Técnica de andamiaje secuencial que brinda tiempo de procesamiento individual y validación en parejas antes de la puesta en común pública.',
    pedagogicalObjective: 'Democratizar la participación oral protegiendo a estudiantes introvertidos o con ritmos más pausados.',
    gradeLevels: ['3.° Primaria', '4.° Primaria'],
    subjects: ['Todas las áreas'],
    estimatedDuration: 25,
    materials: ['Pizarras individuales borrables o cuartos de hoja', 'Marcadores'],
    isCustomized: false,
    category: 'participacion_activa'
  },
  {
    id: 'cat-005',
    title: 'La Red Trófica / Conexión Viviente con Hilos de Lana',
    focusTag: 'Movimiento & Modelado Kinestésico',
    description: 'Simulación corporal donde los estudiantes forman un círculo y se conectan mediante un hilo conductor para evidenciar interdependencias sistémicas.',
    pedagogicalObjective: 'Aterrizar conceptos abstractos complejos mediante una experiencia sensorial y kinestésica inolvidable.',
    gradeLevels: ['3.° Primaria', '4.° Primaria'],
    subjects: ['Ciencias Naturales', 'Ética y Convivencia'],
    estimatedDuration: 35,
    materials: ['Ovillo de lana grueso', 'Tarjetas con solapín para el pecho', 'Tijeras'],
    isCustomized: true,
    category: 'movimiento_practico'
  },
  {
    id: 'cat-006',
    title: 'Rally Matemático de Estimación y Medida en el Aula',
    focusTag: 'Resolución de Problemas & Práctica Táctil',
    description: 'Circuito de 5 estaciones de medición real en el aula (largo de mesas, peso de libros, capacidad de botellas) con registro en pasaporte de expedición.',
    pedagogicalObjective: 'Aplicar el razonamiento métrico en situaciones contextuales reales evitando la abstracción desmotivante.',
    gradeLevels: ['3.° Primaria', '4.° Primaria'],
    subjects: ['Matemáticas'],
    estimatedDuration: 45,
    materials: ['Cintas métricas', 'Reglas', 'Balanza escolar', 'Pasaportes de medida impresos'],
    isCustomized: false,
    category: 'resolucion_problemas'
  },
  {
    id: 'cat-007',
    title: 'Teatro de Sombras y Lectura Dramatizada en Siluetas',
    focusTag: 'Lectura Comprensiva & Expresión Artística',
    description: 'Recreación de escenas clave de un relato infantil mediante siluetas de cartulina proyectadas con linterna sobre una sábana blanca.',
    pedagogicalObjective: 'Mejorar la fluidez, entonación y comprensión inferencial a través de la interpretación estética.',
    gradeLevels: ['3.° Primaria', '4.° Primaria'],
    subjects: ['Lenguaje y Literatura', 'Artes'],
    estimatedDuration: 50,
    materials: ['Cartulina negra', 'Palillos de madera', 'Linterna potente o lámpara de mesa', 'Tela blanca'],
    isCustomized: false,
    category: 'lectura_comprension'
  },
  {
    id: 'cat-008',
    title: 'Semáforo de Metacognición y Salida de Clase (Exit Tickets)',
    focusTag: 'Autorregulación & Cierre Efectivo',
    description: 'Rutina de 5 minutos al finalizar la sesión con 3 tarjetas: Verde ("Lo que comprendí con claridad"), Amarillo ("Lo que me causó duda"), Rojo ("Lo que necesito volver a practicar").',
    pedagogicalObjective: 'Desarrollar la conciencia del propio aprendizaje y dotar al docente de retroalimentación inmediata para la siguiente clase.',
    gradeLevels: ['3.° Primaria', '4.° Primaria'],
    subjects: ['Todas las áreas'],
    estimatedDuration: 10,
    materials: ['Buzón de 3 ranuras o cartelera con bolsillos', 'Tickets de 3 colores'],
    isCustomized: false,
    category: 'atencion_sostenida'
  }
];

export const SAMPLE_STRATEGY_GENERATED: GeneratedStrategyPayload = {
  interpretation: {
    summary: 'En 3.° de Primaria durante la sesión de Matemáticas sobre representación de fracciones, se evidencia una saturación atencional hacia los 8-10 minutos provocada por la unidireccionalidad de la instrucción formal en el tablero, lo que restringe la participación activa a un grupo cerrado de 4 estudiantes e incrementa la frustración y la dispersión en el resto del grupo.',
    observedFacts: [
      'Pérdida de contacto visual y desenganche cognitivo a partir de los 8 a 10 minutos de explicación frontal.',
      'Participación oral reiterada en únicamente 4 de los 28 estudiantes del salón.',
      'Bloqueo e inseguridad al transferir las representaciones simbólicas al cuaderno de trabajo.',
      'Disponibilidad efectiva en el aula de regletas de Cuisenaire y papel de colores, materiales táctiles aún no articulados en la fase de apertura.'
    ],
    aiHypotheses: [
      'La abstracción numérica inicial de "numerador / denominador" excede el estadio de desarrollo psicocognitivo predominante en niños de 8 años si no está anclada a una experiencia física de partición tangible.',
      'La dinámica de gran grupo genera inhibición social en estudiantes con dudas (como Valentina R.), quienes temen exponerse frente a sus pares.',
      'La falta de un objetivo motriz o de rol práctico en estudiantes con alta energía (como Samuel C.) desvía su atención hacia conductas accesorias con útiles escolares.'
    ],
    opportunities: [
      'Transformar la sesión en un "Taller de Panadería de Retos Fraccionarios" donde cada mesa elabore y fraccione sus propias "recetas de cartulina".',
      'Articular las regletas y el papel silueta para que cada estudiante visualice la equivalencia antes de escribir cualquier número.',
      'Establecer la regla "Nadie puede responder en gran grupo sin haber acordado la respuesta con su compañero de pupitre", garantizando 100% de participación protegida.'
    ]
  },
  strategies: [
    {
      id: 'strat-101',
      name: 'El Laboratorio de las Tiras Fraccionarias: Retos Manipulativos en Dúos',
      focusTag: 'Manipulativo & Atención Sostenida',
      specificGoal: 'Comprender la relación entre la unidad y las partes (medios, cuartos y octavos) mediante el plegado físico de tiras de colores y resolución de desafíos emparejados.',
      pedagogicalRationale: 'Fundamentada en el principio Bruneriano de progresión E-I-S (Enactivo -> Icónico -> Simbólico): ningún símbolo abstracto se introduce sin previa manipulación física.',
      durationMinutes: 45,
      materials: [
        '5 tiras de papel silueta de diferente color por pareja (1 entero, medios, cuartos, octavos)',
        'Tijeras de punta roma',
        'Ficha de retos "El Enigma de la Tira Oculta"',
        'Reloj de arena de 5 minutos'
      ],
      groupOrganization: 'Parejas cooperativas solidarias asignadas estratégicamente (ej. un estudiante reflexivo junto a un estudiante dinámico).',
      stepByStep: [
        {
          phase: 'Fase 1: Activación Táctil y Provocación (8 min)',
          action: 'El docente entrega a cada pareja una tira larga color naranja y dice: "Esta es nuestra barra de chocolate entera. Sin usar regla, ¿cómo podemos doblarla exactamente en dos pedazos idénticos?". Los estudiantes doblan, recortan y comparan superponiendo las partes. Se valida la igualdad perfecta de área.'
        },
        {
          phase: 'Fase 2: Reto Escalonado de Equivalencias (22 min)',
          action: 'Plegado progresivo de las tiras de cuartos (amarillas) y octavos (azules). Se entrega el tablero de retos: "Reto 1: ¿Cuántas tiras amarillas cubren exactamente una tira naranja?". Los estudiantes prueban sobre la mesa antes de anotar en la tabla. El docente recorre las mesas guiando con preguntas socráticas.'
        },
        {
          phase: 'Fase 3: Plenaria con Pizarras y Cierre (15 min)',
          action: 'El docente muestra una tarjeta desafío. Cada pareja delibera 30 segundos en voz baja y levanta simultáneamente su mini-pizarra o tira correspondiente. Se celebra el razonamiento y se sintetiza en el tablero con la notación formal 1/2, 2/4, 4/8.'
        }
      ],
      teacherRole: 'Entrenador de razonamiento: evita decir "está bien" o "está mal"; pide demostración: "Demuéstrame con tus tiras sobre la mesa por qué dos cuartos equivalen a un medio".',
      studentParticipation: '100% de estudiantes con manos ocupadas en el material. La exigencia de acuerdo en pareja asegura que ambos participen activamente antes de levantar la respuesta.',
      contextualAdaptations: 'Para Samuel C. (E-301): permitirle ser el "Encargado de la comprobación geométrica" que superpone las tiras para verificar simetría. Para Valentina R. (E-302): las respuestas se validan primero en su dúo, sin llamarla sorpresivamente al tablero.',
      observableAttentionIndicators: [
        'Mirada y manipulación constante sobre las tiras de papel durante al menos 18 minutos consecutivos en la Fase 2.',
        'Conversaciones centradas estrictamente en la tarea ("mira, pon esta azul encima", "falta una para que sea igual").',
        'Reducción drástica de miradas hacia el patio o manipulación dispersa de lápices.'
      ],
      observableParticipationIndicators: [
        'El 100% de las parejas completa al menos 3 de los 4 retos de la ficha.',
        'Respuestas simultáneas de todas las bancas durante la Fase 3 con alta precisión.',
        'Estudiantes que no solían intervenir explican su solución a los pares de la mesa contigua.'
      ],
      potentialDifficultiesAndPlanB: [
        {
          risk: 'Cortes imprecisos con tijera que impidan comprobar la equivalencia exacta de área.',
          planB: 'El docente dispone de tiras precortadas de repuesto para entregar inmediatamente sin frustración.'
        },
        {
          risk: 'Un estudiante de la pareja asume todo el plegado y deja al otro mirando.',
          planB: 'Regla del "Pincel de Turnos": un estudiante dobla y el otro anota; en el siguiente reto intercambian funciones.'
        }
      ],
      isSavedInLibrary: true
    },
    {
      id: 'strat-102',
      name: 'La Pizzería Didáctica: Estaciones de Pedidos Fraccionarios con Roles de Equipo',
      focusTag: 'Lúdico & Trabajo en Equipo',
      specificGoal: 'Aplicar la resolución de problemas con fracciones en un contexto simulado de restaurante escolar con roles de cocina y despacho.',
      pedagogicalRationale: 'Teoría del aprendizaje situado (Lave & Wenger): el aprendizaje adquiere relevancia y perdura cuando se enmarca en una práctica social reconocible para los niños.',
      durationMinutes: 45,
      materials: [
        'Círculos de cartón o platos desechables divididos en sectores',
        'Comandas de pedidos de clientes ("Mesa 3 pide 3/4 de pizza con champiñones")',
        'Fichas de ingredientes de colores',
        'Insignias de rol: Chef Principal, Ayudante de Cocina, Supervisor de Calidad'
      ],
      groupOrganization: 'Tríos heterogéneos con funciones rotativas cada 12 minutos.',
      stepByStep: [
        {
          phase: 'Fase 1: Apertura de la Pizzería y Asignación de Roles (7 min)',
          action: 'Se contextualiza el reto: "El restaurante de 3.° A abrió sus puertas y hoy tenemos 5 pedidos especiales que deben entregarse exactos para no quebrar la pizzería". Se entregan los roles.'
        },
        {
          phase: 'Fase 2: Preparación y Auditoría de Comandas (25 min)',
          action: 'Los chefs montan los sectores de pizza solicitados. El ayudante coloca los ingredientes correspondientes a la fracción pedida. El supervisor de calidad toma la comanda y audita con una tarjeta de control antes de entregar al docente.'
        },
        {
          phase: 'Fase 3: Evaluación de la Jornada y Metacognición (13 min)',
          action: 'Revisión en asamblea rápida: "¿Qué pasó cuando la Mesa 4 pidió 2/4 y le entregamos 1/2? ¿El cliente quedó satisfecho o insatisfecho?". Reflexión sobre equivalencias.'
        }
      ],
      teacherRole: 'Inspector gastronómico: recorre las estaciones revisando las comandas terminadas y sellando las órdenes correctas.',
      studentParticipation: 'Altamente activa gracias al dinamismo de la metáfora gastronómica; la responsabilidad del supervisor exige comprobación mutua.',
      contextualAdaptations: 'Para Lucía M. (E-303): provisión de comandas con apoyo visual en colores vivos que indiquen la porción sombreada.',
      observableAttentionIndicators: [
        'Concentración sostenida en el ensamble de las piezas sin dispersión.',
        'Monitoreo activo del tiempo disponible en el reloj del salón.',
        'Compromiso con el rol asignado durante los 25 minutos de preparación.'
      ],
      observableParticipationIndicators: [
        'Intervenciones verbales directas argumentando sobre las porciones en cada equipo.',
        'Entrega oportuna de las 3 comandas mínimas por estación.',
        'Defensa de la equivalencia ante el inspector docente.'
      ],
      potentialDifficultiesAndPlanB: [
        {
          risk: 'Confusión entre porción de pizza (sector) e ingredientes individuales.',
          planB: 'El docente enfatiza: "Primero cortamos la masa (fracción de la unidad) y luego decoramos".'
        }
      ],
      isSavedInLibrary: false
    },
    {
      id: 'strat-103',
      name: 'Misión detectives: "El Caso de la Fracción Perdida"',
      focusTag: 'Gamificación & Desafío Progresivo',
      specificGoal: 'Identificar fracciones mayores, menores e iguales a la unidad resolviendo un misterio con pistas escalonadas.',
      pedagogicalRationale: 'Gamificación formativa basada en la teoría del Flujo de Csíkszentmihályi: mantener el balance óptimo entre reto y habilidad para evitar la apatía y el desborde.',
      durationMinutes: 40,
      materials: [
        '3 sobres lacrados con sellos de detective (Pista 1, Pista 2, Pista 3)',
        'Lupa de cartón decorativa por grupo',
        'Carnet de detective con medidor de pistas'
      ],
      groupOrganization: 'Equipos de 4 estudiantes con un "Descifrador", un "Portavoz", un "Cronometrador" y un "Escriba".',
      stepByStep: [
        {
          phase: 'Fase 1: La Carta del Detective Jefe (5 min)',
          action: 'Lectura dramática de la carta donde el detective jefe solicita ayuda para abrir la caja fuerte numérica antes de que el reloj marque las 10:00.'
        },
        {
          phase: 'Fase 2: Resolución de Sobres 1, 2 y 3 (25 min)',
          action: 'Sobre 1 (8 min): Encontrar las fracciones que son iguales a 1 entero. Sobre 2 (9 min): Descifrar qué fracción de la pista es mayor que 1/2. Sobre 3 (8 min): Resolver el código final combinando los resultados.'
        },
        {
          phase: 'Fase 3: Apertura de la Caja Fuerte y Registro (10 min)',
          action: 'Comprobación plenaria. Cada equipo que acertó el código recibe el diploma de "Investigador de Fracciones" y registra en su diario de matemáticas lo que aprendió hoy.'
        }
      ],
      teacherRole: 'Director de la Agencia de Detectives: ofrece pistas adicionales ("llamadas al cuartel general") únicamente a los equipos que justifiquen su necesidad.',
      studentParticipation: 'Alta motivación competitiva cooperativa; ningún estudiante se desentiende porque el sobre siguiente solo se desbloquea con el consenso de los 4 integrantes.',
      contextualAdaptations: 'Para Tomás B. (E-402): tarjetas de pistas con diagramas visuales en lugar de enunciados largos de texto.',
      observableAttentionIndicators: [
        'Foco absoluto en los sobres de pistas durante los 25 minutos del reto.',
        'Silencio productivo de deliberación en las mesas sin gritos ni desorden.',
        'Revisión minuciosa de cada respuesta antes de llamar al docente.'
      ],
      observableParticipationIndicators: [
        'Todos los miembros del equipo firman la hoja de resolución certificando que comprendieron el código.',
        'Rotación efectiva del material de la lupa y las tarjetas entre los miembros.',
        'Participación verbal de estudiantes que habitualmente no levantaban la mano en clases tradicionales.'
      ],
      potentialDifficultiesAndPlanB: [
        {
          risk: 'Un equipo se bloquea en la Pista 2 y se desmotiva.',
          planB: 'El docente entrega la "Pista Secreta de Emergencia" que reduce las opciones a 2 alternativas.'
        }
      ],
      isSavedInLibrary: false
    }
  ],
  practicalClassroomScript: {
    strategyId: 'strat-101',
    scenarioTitle: 'Así se vería en tu clase de 3.° A: Laboratorio de Tiras Fraccionarias',
    teacherScript: [
      {
        moment: 'Minuto 0 a 4 - El Arranque Impecable (Cero Dispersión)',
        teacherDialogue: '"¡Investigadores de 3.° A! Hoy no vamos a escribir en el cuaderno durante los primeros 25 minutos. Todos miren esta tira naranja que tengo en la mano. Representa una barra de chocolate gigante. En su mesa tienen exactamente una igual por pareja. Tienen 60 segundos con su compañero de puesto para doblarla a la mitad perfecta. ¡El tiempo corre en el reloj de arena ya!"',
        studentAction: 'Los 28 estudiantes toman la tira naranja simultáneamente con curiosidad. Se escuchan comentarios inmediatos: "¡Dobla por aquí!", "Fíjate que las esquinas coincidan". Cero dispersión hacia el patio o la cartuchera.'
      },
      {
        moment: 'Minuto 14 - Provocando el Conflicto Cognitivo',
        teacherDialogue: '"Ahora viene el reto de la Agencia. Tomen la tira amarilla. Doblen en cuatro partes iguales. Si cortamos esas cuatro partes... ¿cuántas tiritas amarillas creen que necesitamos para tapar exactamente la mitad de nuestro chocolate naranja? Samuel y Valentina, hagan la prueba física sobre la mesa y me avisan con el pulgar arriba cuando lo tengan comprobado."',
        studentAction: 'Samuel superpone físicamente dos tiras amarillas sobre la naranja con gran concentración. Valentina sonríe y asiente. Se valida la hipótesis de manera directa y tangible.'
      },
      {
        moment: 'Minuto 32 - Socialización Protegida sin Miedo al Error',
        teacherDialogue: '"Atención salón: a la cuenta de tres, todas las parejas van a levantar en el aire la tira que represente exactamente UN MEDIO. Uno, dos, tres... ¡Arriba tiras!".',
        studentAction: 'Las 14 parejas levantan su tira al unísono. El docente barre visualmente el salón en 4 segundos y constata 100% de aciertos. Los estudiantes se aplauden mutuamente.'
      }
    ],
    practicalTips: [
      'Prepara los paquetes de 5 tiras de colores engrapadas con un clip antes de ingresar al salón; repartirlos toma menos de 40 segundos.',
      'Si notas que Samuel se inquieta en el minuto 20, pídele que sea el "Comisario de Medidas" y pase por dos mesas vecinas a revisar con su regla si los dobleces son exactos.',
      'Para consolidar el aprendizaje, dedica los últimos 8 minutos a que cada niño pegue sus tiras escalonadas en el cuaderno formando el "Muro de Fracciones", escribiendo al lado: 1 = 2/2 = 4/4 = 8/8.'
    ]
  },
  evaluationRubric: {
    baselineObservation: 'Línea de base: Foco sostenido promedio de 9 minutos; 4 de 28 estudiantes participando activamente; frecuentes bloqueos y llamadas de atención.',
    evaluationCriteria: [
      {
        criterion: 'Tiempo de foco y manipulación sostenida (Atención)',
        observableMeasure: 'Minutos continuos que los estudiantes permanecen interactuando con el material concreto y la ficha de retos sin dispersión periférica.',
        ratingScale: '1 (Menos de 10 min) · 2 (10-18 min) · 3 (19-25 min) · 4 (Más de 25 min continuos)',
        expectedBenchmark: 'Nivel 3 o 4: Alcanzar 22 a 26 minutos de foco efectivo continuo'
      },
      {
        criterion: 'Porcentaje de estudiantes con aporte verbal activo (Participación)',
        observableMeasure: 'Proporción de estudiantes que expresan al menos 1 justificación matemática en su pareja o plenaria.',
        ratingScale: '1 (<25% del aula) · 2 (25-50%) · 3 (50-80%) · 4 (>80% de estudiantes)',
        expectedBenchmark: 'Nivel 4: Superar el 85% gracias a la deliberación previa en parejas'
      },
      {
        criterion: 'Comprensión transferida a la representación gráfica (Aprendizaje)',
        observableMeasure: 'Completitud y precisión del Muro de Fracciones pegado en el cuaderno de notas.',
        ratingScale: '1 (Incompleto o con errores graves) · 2 (Parcial) · 3 (Correcto con apoyo) · 4 (Autónomo y justificado)',
        expectedBenchmark: 'Nivel 3 o 4: Más del 80% de cuadernos con equivalencias correctas'
      },
      {
        criterion: 'Clima de aula y autorregulación (Convivencia pedagógica)',
        observableMeasure: 'Transiciones ordenadas y respeto del material sin intervenciones punitivas del docente.',
        ratingScale: '1 (Desorden frecuente) · 2 (Varios llamados de atención) · 3 (1 recordatorio suave) · 4 (Autorregulación óptima)',
        expectedBenchmark: 'Nivel 3 o 4: Máximo 1 toque de campana para recuperar la atención general'
      }
    ]
  }
};
