import { Question, EthicalDilemma } from './types';

export const SITUATIONAL_LEADERSHIP_QUESTIONS: Question[] = [
  {
    id: 'sit_1',
    text: 'Un miembro de su equipo está luchando con una tarea nueva y compleja. ¿Cuál sería su enfoque?',
    options: [
      { value: 'directing', label: 'Dar instrucciones específicas y supervisar de cerca' },
      { value: 'coaching', label: 'Explicar las decisiones y solicitar sugerencias' },
      { value: 'supporting', label: 'Facilitar y apoyar los esfuerzos del empleado' },
      { value: 'delegating', label: 'Delegar la responsabilidad de las decisiones' }
    ]
  },
  {
    id: 'sit_2',
    text: 'Su equipo tiene experiencia pero parece desmotivado con el proyecto actual. ¿Qué haría?',
    options: [
      { value: 'supporting', label: 'Escuchar y apoyar, facilitando la resolución de problemas' },
      { value: 'coaching', label: 'Proporcionar dirección y apoyo emocional' },
      { value: 'directing', label: 'Establecer objetivos claros y dar instrucciones específicas' },
      { value: 'delegating', label: 'Permitir que el equipo tome sus propias decisiones' }
    ]
  },
  {
    id: 'sit_3',
    text: 'Un empleado competente y motivado quiere asumir más responsabilidades. Su respuesta sería:',
    options: [
      { value: 'delegating', label: 'Asignar la tarea y permitir autonomía completa' },
      { value: 'supporting', label: 'Ofrecer apoyo cuando sea necesario' },
      { value: 'coaching', label: 'Proporcionar orientación y retroalimentación regular' },
      { value: 'directing', label: 'Dar instrucciones detalladas sobre cómo proceder' }
    ]
  },
  {
    id: 'sit_4',
    text: 'Un nuevo empleado muestra entusiasmo pero carece de las habilidades necesarias. ¿Cómo lo manejaría?',
    options: [
      { value: 'coaching', label: 'Enseñar habilidades mientras mantiene la motivación' },
      { value: 'directing', label: 'Proporcionar instrucciones claras y supervisión constante' },
      { value: 'supporting', label: 'Ofrecer aliento y apoyo emocional' },
      { value: 'delegating', label: 'Asignar tareas y confiar en su capacidad de aprender' }
    ]
  },
  {
    id: 'sit_5',
    text: 'Durante una crisis, su equipo experimentado parece paralizado. ¿Cuál sería su enfoque inmediato?',
    options: [
      { value: 'directing', label: 'Tomar control directo y dar órdenes específicas' },
      { value: 'coaching', label: 'Explicar la situación y buscar input del equipo' },
      { value: 'supporting', label: 'Facilitar la discusión del equipo sobre soluciones' },
      { value: 'delegating', label: 'Confiar en que el equipo encuentre la solución' }
    ]
  },
  {
    id: 'sit_6',
    text: 'Un empleado con habilidades moderadas está perdiendo confianza después de algunos errores. ¿Qué haría?',
    options: [
      { value: 'coaching', label: 'Proporcionar orientación específica y apoyo emocional' },
      { value: 'supporting', label: 'Enfocarse en reconstruir la confianza y motivación' },
      { value: 'directing', label: 'Volver a entrenar con instrucciones paso a paso' },
      { value: 'delegating', label: 'Darle espacio para que recupere la confianza solo' }
    ]
  },
  {
    id: 'sit_7',
    text: 'Su equipo tiene las habilidades pero está dividido sobre la mejor aproximación al proyecto. Su respuesta:',
    options: [
      { value: 'supporting', label: 'Facilitar la discusión para llegar a consenso' },
      { value: 'coaching', label: 'Guiar la discusión hacia la mejor solución' },
      { value: 'directing', label: 'Decidir la aproximación y comunicarla claramente' },
      { value: 'delegating', label: 'Permitir que resuelvan las diferencias internamente' }
    ]
  },
  {
    id: 'sit_8',
    text: 'Un empleado experimentado comienza a mostrar signos de aburrimiento y desinterés. ¿Cómo respondería?',
    options: [
      { value: 'delegating', label: 'Ofrecer nuevos desafíos y mayor autonomía' },
      { value: 'supporting', label: 'Discutir sus preocupaciones y ofrecer apoyo' },
      { value: 'coaching', label: 'Trabajar juntos para encontrar nuevas motivaciones' },
      { value: 'directing', label: 'Establecer nuevas metas y expectativas claras' }
    ]
  },
  {
    id: 'sit_9',
    text: 'Al implementar un nuevo proceso, algunos miembros del equipo se resisten al cambio. Su enfoque sería:',
    options: [
      { value: 'coaching', label: 'Explicar los beneficios y abordar las preocupaciones' },
      { value: 'directing', label: 'Implementar el cambio con instrucciones claras' },
      { value: 'supporting', label: 'Facilitar discusiones sobre cómo adaptarse' },
      { value: 'delegating', label: 'Permitir que el equipo adapte el proceso a su manera' }
    ]
  },
  {
    id: 'sit_10',
    text: 'Un miembro del equipo altamente competente solicita retroalimentación constante. ¿Qué haría?',
    options: [
      { value: 'supporting', label: 'Proporcionar la retroalimentación solicitada y apoyo' },
      { value: 'coaching', label: 'Ayudarle a desarrollar auto-evaluación' },
      { value: 'delegating', label: 'Gradualmente reducir la frecuencia de retroalimentación' },
      { value: 'directing', label: 'Establecer horarios específicos para retroalimentación' }
    ]
  },
  {
    id: 'sit_11',
    text: 'Su equipo está trabajando en un proyecto familiar pero con un plazo muy ajustado. Su estrategia sería:',
    options: [
      { value: 'supporting', label: 'Ofrecer recursos adicionales y eliminar obstáculos' },
      { value: 'delegating', label: 'Confiar en su experiencia y permitir autonomía total' },
      { value: 'coaching', label: 'Revisar el progreso regularmente y ofrecer orientación' },
      { value: 'directing', label: 'Establecer hitos claros y supervisar de cerca' }
    ]
  },
  {
    id: 'sit_12',
    text: 'Un empleado nuevo muestra habilidades técnicas sólidas pero duda de sus decisiones. ¿Cómo lo apoyaría?',
    options: [
      { value: 'coaching', label: 'Guiar su proceso de toma de decisiones' },
      { value: 'supporting', label: 'Reforzar su confianza y validar sus decisiones' },
      { value: 'directing', label: 'Proporcionar criterios claros para la toma de decisiones' },
      { value: 'delegating', label: 'Permitir que tome decisiones y aprenda de los resultados' }
    ]
  },
  {
    id: 'sit_13',
    text: 'Durante una reorganización, su equipo experimentado está ansioso sobre los cambios. Su enfoque:',
    options: [
      { value: 'supporting', label: 'Escuchar sus preocupaciones y ofrecer tranquilidad' },
      { value: 'coaching', label: 'Explicar los cambios y trabajar juntos en la adaptación' },
      { value: 'directing', label: 'Comunicar claramente las nuevas expectativas y roles' },
      { value: 'delegating', label: 'Confiar en que se adapten usando su experiencia' }
    ]
  },
  {
    id: 'sit_14',
    text: 'Un miembro del equipo competente pero perfeccionista está retrasando las entregas. ¿Qué haría?',
    options: [
      { value: 'coaching', label: 'Trabajar juntos para equilibrar calidad y tiempos' },
      { value: 'directing', label: 'Establecer límites de tiempo claros y no negociables' },
      { value: 'supporting', label: 'Ayudarle a manejar la ansiedad por la perfección' },
      { value: 'delegating', label: 'Confiar en que encuentre el equilibrio adecuado' }
    ]
  },
  {
    id: 'sit_15',
    text: 'Su equipo tiene las habilidades necesarias pero carece de confianza para un proyecto desafiante. Su respuesta:',
    options: [
      { value: 'supporting', label: 'Construir confianza a través del aliento y apoyo' },
      { value: 'coaching', label: 'Proporcionar orientación mientras construye confianza' },
      { value: 'directing', label: 'Dividir el proyecto en pasos manejables' },
      { value: 'delegating', label: 'Asignar el proyecto y expresar confianza en sus habilidades' }
    ]
  },
  {
    id: 'sit_16',
    text: 'Un empleado experimentado comienza a cuestionar constantemente las decisiones del equipo. ¿Cómo manejaría esto?',
    options: [
      { value: 'supporting', label: 'Facilitar una discusión abierta sobre las preocupaciones' },
      { value: 'directing', label: 'Establecer límites claros sobre el comportamiento apropiado' },
      { value: 'coaching', label: 'Trabajar con él para canalizar constructivamente sus preocupaciones' },
      { value: 'delegating', label: 'Darle más responsabilidad en la toma de decisiones' }
    ]
  },
  {
    id: 'sit_17',
    text: 'Al introducir nueva tecnología, algunos miembros del equipo se adaptan rápidamente mientras otros luchan. Su enfoque:',
    options: [
      { value: 'coaching', label: 'Proporcionar entrenamiento personalizado según las necesidades' },
      { value: 'directing', label: 'Establecer un programa de entrenamiento estructurado para todos' },
      { value: 'supporting', label: 'Crear grupos de apoyo entre pares' },
      { value: 'delegating', label: 'Permitir que los que se adaptan rápido ayuden a otros' }
    ]
  },
  {
    id: 'sit_18',
    text: 'Un miembro del equipo altamente motivado pero con habilidades limitadas solicita un proyecto complejo. ¿Qué haría?',
    options: [
      { value: 'coaching', label: 'Asignar el proyecto con mentoría intensiva' },
      { value: 'directing', label: 'Proporcionar entrenamiento específico antes de asignar el proyecto' },
      { value: 'supporting', label: 'Ofrecer un proyecto menos complejo pero igualmente motivador' },
      { value: 'delegating', label: 'Asignar el proyecto y confiar en su motivación para aprender' }
    ]
  },
  {
    id: 'sit_19',
    text: 'Su equipo está funcionando bien independientemente pero necesita coordinarse mejor entre sí. Su estrategia:',
    options: [
      { value: 'supporting', label: 'Facilitar reuniones regulares de coordinación' },
      { value: 'coaching', label: 'Enseñar habilidades de colaboración y comunicación' },
      { value: 'directing', label: 'Establecer procesos claros de comunicación y coordinación' },
      { value: 'delegating', label: 'Permitir que desarrollen sus propios métodos de coordinación' }
    ]
  },
  {
    id: 'sit_20',
    text: 'Un empleado competente está pasando por problemas personales que afectan su rendimiento. ¿Cómo respondería?',
    options: [
      { value: 'supporting', label: 'Ofrecer flexibilidad y apoyo emocional' },
      { value: 'coaching', label: 'Trabajar juntos para mantener el rendimiento durante la crisis' },
      { value: 'directing', label: 'Establecer expectativas claras pero ajustadas temporalmente' },
      { value: 'delegating', label: 'Darle espacio para manejar sus asuntos mientras mantiene responsabilidades' }
    ]
  },
  {
    id: 'sit_21',
    text: 'Al formar un nuevo equipo con miembros de diferentes departamentos, su primer enfoque sería:',
    options: [
      { value: 'directing', label: 'Establecer roles, responsabilidades y procesos claros' },
      { value: 'coaching', label: 'Facilitar sesiones de conocimiento mutuo y establecimiento de objetivos' },
      { value: 'supporting', label: 'Crear oportunidades para que se conozcan y construyan confianza' },
      { value: 'delegating', label: 'Permitir que se organicen naturalmente basándose en sus fortalezas' }
    ]
  },
  {
    id: 'sit_22',
    text: 'Un miembro experimentado del equipo está entrenando a un nuevo empleado pero usando métodos obsoletos. ¿Qué haría?',
    options: [
      { value: 'coaching', label: 'Trabajar con el mentor para actualizar sus métodos de entrenamiento' },
      { value: 'directing', label: 'Proporcionar nuevos materiales y métodos de entrenamiento' },
      { value: 'supporting', label: 'Facilitar una discusión sobre mejores prácticas de mentoría' },
      { value: 'delegating', label: 'Confiar en que el mentor se adapte con el tiempo' }
    ]
  },
  {
    id: 'sit_23',
    text: 'Su equipo está dividido sobre la priorización de tareas en un proyecto complejo. Su respuesta sería:',
    options: [
      { value: 'directing', label: 'Establecer las prioridades basándose en objetivos estratégicos' },
      { value: 'coaching', label: 'Guiar al equipo a través de un proceso de priorización' },
      { value: 'supporting', label: 'Facilitar una discusión para llegar a consenso' },
      { value: 'delegating', label: 'Permitir que el equipo resuelva las prioridades internamente' }
    ]
  },
  {
    id: 'sit_24',
    text: 'Un empleado altamente competente solicita constantemente nuevos desafíos y se aburre fácilmente. ¿Cómo lo manejaría?',
    options: [
      { value: 'delegating', label: 'Asignar proyectos complejos con autonomía completa' },
      { value: 'coaching', label: 'Trabajar juntos para identificar oportunidades de crecimiento' },
      { value: 'supporting', label: 'Proporcionar variedad en las asignaciones y reconocimiento' },
      { value: 'directing', label: 'Establecer objetivos progresivamente más desafiantes' }
    ]
  },
  {
    id: 'sit_25',
    text: 'Durante un período de alta presión, algunos miembros del equipo están sobrepasados mientras otros parecen subutilizados. Su enfoque:',
    options: [
      { value: 'directing', label: 'Redistribuir las cargas de trabajo de manera equitativa' },
      { value: 'coaching', label: 'Trabajar con el equipo para optimizar la distribución de tareas' },
      { value: 'supporting', label: 'Facilitar la colaboración y el apoyo mutuo' },
      { value: 'delegating', label: 'Permitir que el equipo se auto-organice para manejar la carga' }
    ]
  },
  {
    id: 'sit_26',
    text: 'Un miembro del equipo con buenas habilidades técnicas tiene dificultades con la comunicación interpersonal. ¿Qué haría?',
    options: [
      { value: 'coaching', label: 'Proporcionar entrenamiento específico en habilidades de comunicación' },
      { value: 'supporting', label: 'Crear oportunidades de práctica en un ambiente de apoyo' },
      { value: 'directing', label: 'Establecer expectativas claras sobre comunicación profesional' },
      { value: 'delegating', label: 'Asignar tareas que aprovechen sus fortalezas técnicas' }
    ]
  },
  {
    id: 'sit_27',
    text: 'Su equipo ha completado exitosamente varios proyectos y ahora enfrenta uno significativamente más complejo. Su estrategia:',
    options: [
      { value: 'coaching', label: 'Proporcionar orientación adicional dada la complejidad aumentada' },
      { value: 'supporting', label: 'Ofrecer recursos adicionales y apoyo moral' },
      { value: 'delegating', label: 'Confiar en su experiencia previa para manejar la complejidad' },
      { value: 'directing', label: 'Establecer estructura y supervisión adicional debido a la complejidad' }
    ]
  },
  {
    id: 'sit_28',
    text: 'Un empleado nuevo muestra gran potencial pero comete errores por exceso de confianza. ¿Cómo lo abordaría?',
    options: [
      { value: 'coaching', label: 'Proporcionar retroalimentación regular y orientación sobre juicio' },
      { value: 'directing', label: 'Establecer procesos de revisión y aprobación más estrictos' },
      { value: 'supporting', label: 'Balancear el aliento con recordatorios sobre precaución' },
      { value: 'delegating', label: 'Permitir que aprenda de sus errores naturalmente' }
    ]
  },
  {
    id: 'sit_29',
    text: 'Su equipo experimentado está trabajando en un proyecto rutinario pero crítico para la empresa. Su enfoque sería:',
    options: [
      { value: 'delegating', label: 'Asignar el proyecto y permitir autonomía completa' },
      { value: 'supporting', label: 'Estar disponible para apoyo pero no interferir' },
      { value: 'coaching', label: 'Revisar el progreso regularmente y ofrecer orientación' },
      { value: 'directing', label: 'Supervisar de cerca dada la importancia crítica' }
    ]
  },
  {
    id: 'sit_30',
    text: 'Al implementar cambios organizacionales, algunos miembros del equipo abrazan el cambio mientras otros se resisten. Su respuesta:',
    options: [
      { value: 'coaching', label: 'Trabajar individualmente con cada miembro según su nivel de aceptación' },
      { value: 'directing', label: 'Comunicar claramente las expectativas y consecuencias del cambio' },
      { value: 'supporting', label: 'Crear un ambiente de apoyo para facilitar la transición' },
      { value: 'delegating', label: 'Permitir que los que abrazan el cambio influyan en los demás' }
    ]
  },
  {
    id: 'sit_31',
    text: 'Un miembro del equipo altamente competente comienza a mostrar signos de agotamiento (burnout). ¿Qué haría?',
    options: [
      { value: 'supporting', label: 'Ofrecer apoyo emocional y ajustar la carga de trabajo' },
      { value: 'coaching', label: 'Trabajar juntos para identificar causas y soluciones' },
      { value: 'directing', label: 'Implementar cambios inmediatos en sus responsabilidades' },
      { value: 'delegating', label: 'Darle autonomía para manejar su situación y carga de trabajo' }
    ]
  },
  {
    id: 'sit_32',
    text: 'Su equipo necesita adoptar nuevas herramientas tecnológicas. Algunos miembros son entusiastas de la tecnología, otros son reacios. Su enfoque:',
    options: [
      { value: 'coaching', label: 'Proporcionar entrenamiento personalizado basado en el nivel de comodidad' },
      { value: 'directing', label: 'Implementar un programa de entrenamiento estructurado para todos' },
      { value: 'supporting', label: 'Crear sistemas de apoyo entre pares' },
      { value: 'delegating', label: 'Permitir que los entusiastas lideren la adopción' }
    ]
  },
  {
    id: 'sit_33',
    text: 'Un empleado con habilidades sólidas está luchando con la confianza después de recibir críticas de un cliente. Su respuesta:',
    options: [
      { value: 'supporting', label: 'Enfocarse en reconstruir la confianza y proporcionar aliento' },
      { value: 'coaching', label: 'Analizar la situación juntos y desarrollar estrategias de mejora' },
      { value: 'directing', label: 'Proporcionar orientación específica sobre manejo de clientes' },
      { value: 'delegating', label: 'Asignar un proyecto exitoso para restaurar la confianza' }
    ]
  },
  {
    id: 'sit_34',
    text: 'Su equipo está compuesto por miembros con diferentes niveles de experiencia trabajando en el mismo proyecto. Su estrategia sería:',
    options: [
      { value: 'coaching', label: 'Proporcionar orientación diferenciada basada en el nivel de experiencia' },
      { value: 'directing', label: 'Establecer procesos claros que funcionen para todos los niveles' },
      { value: 'supporting', label: 'Facilitar la mentoría entre pares y el apoyo mutuo' },
      { value: 'delegating', label: 'Asignar roles basados en fortalezas individuales' }
    ]
  },
  {
    id: 'sit_35',
    text: 'Un miembro experimentado del equipo está cuestionando la dirección del proyecto basándose en su experiencia pasada. ¿Cómo respondería?',
    options: [
      { value: 'supporting', label: 'Facilitar una discusión abierta sobre sus preocupaciones' },
      { value: 'coaching', label: 'Explorar juntos cómo su experiencia puede informar el proyecto actual' },
      { value: 'directing', label: 'Explicar claramente la rationale detrás de la dirección actual' },
      { value: 'delegating', label: 'Darle más responsabilidad en la planificación del proyecto' }
    ]
  },
  {
    id: 'sit_36',
    text: 'Durante una fase crítica del proyecto, un miembro clave del equipo debe ausentarse por razones familiares. Su enfoque inmediato:',
    options: [
      { value: 'directing', label: 'Reorganizar inmediatamente las responsabilidades y supervisar de cerca' },
      { value: 'coaching', label: 'Trabajar con el equipo para redistribuir tareas y proporcionar orientación' },
      { value: 'supporting', label: 'Facilitar que el equipo se apoye mutuamente durante la transición' },
      { value: 'delegating', label: 'Confiar en que el equipo se reorganice efectivamente' }
    ]
  },
  {
    id: 'sit_37',
    text: 'Su equipo ha desarrollado una dinámica de trabajo efectiva, pero necesita integrar a un nuevo miembro senior. ¿Qué haría?',
    options: [
      { value: 'coaching', label: 'Facilitar la integración mientras se mantiene la dinámica existente' },
      { value: 'supporting', label: 'Crear oportunidades para que el nuevo miembro se integre naturalmente' },
      { value: 'directing', label: 'Establecer claramente cómo el nuevo miembro encaja en la estructura' },
      { value: 'delegating', label: 'Permitir que el equipo y el nuevo miembro encuentren su equilibrio' }
    ]
  },
  {
    id: 'sit_38',
    text: 'Un empleado competente está consistentemente perdiendo fechas límite debido a perfeccionismo. Su respuesta sería:',
    options: [
      { value: 'coaching', label: 'Trabajar juntos para establecer estándares realistas de calidad vs. tiempo' },
      { value: 'directing', label: 'Establecer límites de tiempo firmes y criterios de "suficientemente bueno"' },
      { value: 'supporting', label: 'Ayudar a manejar la ansiedad relacionada con la imperfección' },
      { value: 'delegating', label: 'Darle proyectos donde la perfección sea menos crítica' }
    ]
  },
  {
    id: 'sit_39',
    text: 'Su equipo está funcionando bien pero necesita mejorar su innovación y creatividad. Su estrategia sería:',
    options: [
      { value: 'supporting', label: 'Crear un ambiente que fomente la experimentación y el riesgo calculado' },
      { value: 'coaching', label: 'Facilitar sesiones de brainstorming y enseñar técnicas creativas' },
      { value: 'delegating', label: 'Dar libertad completa para explorar nuevas aproximaciones' },
      { value: 'directing', label: 'Establecer objetivos específicos de innovación y métricas' }
    ]
  },
  {
    id: 'sit_40',
    text: 'Al final de un proyecto exitoso, su equipo está celebrando pero ya necesita enfocarse en el siguiente desafío. Su enfoque:',
    options: [
      { value: 'supporting', label: 'Permitir la celebración mientras gradualmente introduce el nuevo proyecto' },
      { value: 'coaching', label: 'Usar las lecciones del proyecto exitoso para preparar el siguiente' },
      { value: 'directing', label: 'Establecer claramente las expectativas y cronograma del nuevo proyecto' },
      { value: 'delegating', label: 'Confiar en que el momentum del éxito los lleve al siguiente proyecto' }
    ]
  }
];

export const HOGAN_STYLE_QUESTIONS: Question[] = [
  {
    id: 'hogan_1',
    text: 'Cuando me enfrento a un desafío, mi primera reacción es:',
    options: [
      { value: 'cautious', label: 'Analizar todas las opciones posibles antes de actuar.' },
      { value: 'bold', label: 'Tomar una decisión rápida basada en mi intuición.' },
      { value: 'colorful', label: 'Buscar la opinión y el consejo de mis colegas.' },
      { value: 'diligent', label: 'Dividir el problema en partes más pequeñas y abordarlas una por una.' }
    ]
  },
  {
    id: 'hogan_2',
    text: 'Me siento más energizado en el trabajo cuando:',
    options: [
      { value: 'colorful', label: 'Estoy interactuando y colaborando con muchas personas.' },
      { value: 'cautious', label: 'Estoy concentrado en una tarea compleja sin interrupciones.' },
      { value: 'bold', label: 'Estoy compitiendo por alcanzar un objetivo ambicioso.' },
      { value: 'dutiful', label: 'Estoy ayudando a otros a tener éxito.' }
    ]
  },
  {
    id: 'hogan_3',
    text: 'En un entorno de equipo, tiendo a ser la persona que:',
    options: [
      { value: 'dutiful', label: 'Asegura que todos se sientan incluidos y escuchados.' },
      { value: 'bold', label: 'Mantiene al equipo enfocado en los objetivos y los plazos.' },
      { value: 'imaginative', label: 'Aporta ideas nuevas y desafía el status quo.' },
      { value: 'diligent', label: 'Organiza el trabajo y se asegura de que los procesos se sigan correctamente.' }
    ]
  },
  {
    id: 'hogan_4',
    text: 'A la hora de tomar decisiones importantes, confío más en:',
    options: [
      { value: 'cautious', label: 'Los datos, la evidencia y el análisis lógico.' },
      { value: 'bold', label: 'Mi experiencia pasada y mi intuición.' },
      { value: 'colorful', label: 'El consenso y la opinión del equipo.' },
      { value: 'dutiful', label: 'Los principios y valores establecidos.' }
    ]
  },
  {
    id: 'hogan_5',
    text: 'Cuando recibo retroalimentación crítica, yo:',
    options: [
      { value: 'dutiful', label: 'La agradezco y la veo como una oportunidad para mejorar.' },
      { value: 'cautious', label: 'La analizo cuidadosamente para ver si es válida.' },
      { value: 'colorful', label: 'A veces me siento a la defensiva, pero intento escuchar.' },
      { value: 'sensitive', label: 'Tiende a afectarme personalmente durante un tiempo.' }
    ]
  },
  {
    id: 'hogan_6',
    text: '¿Qué frase describe mejor su actitud hacia las reglas y procedimientos?',
    options: [
      { value: 'diligent', label: 'Son esenciales para la eficiencia y deben seguirse de cerca.' },
      { value: 'cautious', label: 'Son una guía útil, pero la flexibilidad es clave para el éxito.' },
      { value: 'imaginative', label: 'A veces pueden obstaculizar la innovación y la creatividad.' },
      { value: 'bold', label: 'Prefiero crear mis propios sistemas para hacer las cosas.' }
    ]
  },
  {
    id: 'hogan_7',
    text: 'Prefiero un ambiente de trabajo que sea:',
    options: [
      { value: 'diligent', label: 'Predecible, estable y organizado.' },
      { value: 'bold', label: 'Dinámico, de ritmo rápido y lleno de cambios.' },
      { value: 'dutiful', label: 'Colaborativo, armonioso y centrado en el equipo.' },
      { value: 'imaginative', label: 'Competitivo, orientado a resultados y ambicioso.' }
    ]
  },
  {
    id: 'hogan_8',
    text: 'Cuando un proyecto no sale como esperaba, mi reacción es:',
    options: [
      { value: 'cautious', label: 'Analizar qué salió mal para no repetir los errores.' },
      { value: 'bold', label: 'Buscar una solución alternativa rápidamente.' },
      { value: 'colorful', label: 'No preocuparme demasiado; los contratiempos ocurren.' },
      { value: 'sensitive', label: 'Sentirme frustrado y decepcionado conmigo mismo.' }
    ]
  },
  {
    id: 'hogan_9',
    text: 'Soy más eficaz cuando:',
    options: [
      { value: 'diligent', label: 'Tengo un plan claro y detallado que seguir.' },
      { value: 'imaginative', label: 'Tengo la libertad de improvisar y adaptar mi enfoque.' },
      { value: 'dutiful', label: 'Trabajo en estrecha colaboración con otros.' },
      { value: 'bold', label: 'Tengo un objetivo claro y la autonomía para alcanzarlo.' }
    ]
  },
  {
    id: 'hogan_10',
    text: 'En las reuniones, soy el que probablemente:',
    options: [
      { value: 'diligent', label: 'Toma notas detalladas y se asegura de que se siga la agenda.' },
      { value: 'dutiful', label: 'Se asegura de que todas las voces sean escuchadas.' },
      { value: 'imaginative', label: 'Desafía las ideas y propone alternativas audaces.' },
      { value: 'bold', label: 'Habla sobre los resultados y los próximos pasos.' }
    ]
  },
  {
    id: 'hogan_11',
    text: 'Mi actitud hacia el riesgo es:',
    options: [
      { value: 'cautious', label: 'Prefiero evitarlo; la seguridad es importante.' },
      { value: 'diligent', label: 'Estoy dispuesto a tomar riesgos calculados si la recompensa es alta.' },
      { value: 'imaginative', label: 'Los riesgos son necesarios para la innovación y el crecimiento.' },
      { value: 'bold', label: 'Me entusiasma la idea de tomar riesgos audaces.' }
    ]
  },
  {
    id: 'hogan_12',
    text: 'Cuando se trata de mi red de contactos profesionales:',
    options: [
      { value: 'colorful', label: 'Disfruto conociendo gente nueva y ampliando mi red constantemente.' },
      { value: 'cautious', label: 'Prefiero mantener un círculo pequeño de contactos de confianza.' },
      { value: 'bold', label: 'Construyo relaciones estratégicamente, pensando en objetivos a largo plazo.' },
      { value: 'dutiful', label: 'Mi red se construye de forma natural a través de mi trabajo.' }
    ]
  },
  {
    id: 'hogan_13',
    text: '¿Cuál de estas afirmaciones le describe mejor?',
    options: [
      { value: 'dutiful', label: 'Soy diplomático y siempre intento no herir los sentimientos de los demás.' },
      { value: 'bold', label: 'Soy directo y digo lo que pienso, aunque a veces sea difícil.' },
      { value: 'cautious', label: 'Soy reservado y no comparto mis opiniones a menos que sea necesario.' },
      { value: 'diligent', label: 'Soy analítico y baso mis argumentos en hechos, no en emociones.' }
    ]
  },
  {
    id: 'hogan_14',
    text: 'Me motiva más:',
    options: [
      { value: 'bold', label: 'El reconocimiento público y la oportunidad de liderar.' },
      { value: 'cautious', label: 'La oportunidad de aprender algo nuevo y resolver problemas complejos.' },
      { value: 'diligent', label: 'La estabilidad, la seguridad y un ambiente de trabajo predecible.' },
      { value: 'dutiful', label: 'Ayudar a mi equipo y a la organización a alcanzar sus metas.' }
    ]
  },
  {
    id: 'hogan_15',
    text: 'Bajo presión, tiendo a volverme:',
    options: [
      { value: 'diligent', label: 'Más centrado, tranquilo y eficiente.' },
      { value: 'sensitive', label: 'Algo ansioso, pero sigo funcionando bien.' },
      { value: 'bold', label: 'Decisivo y directo, a veces incluso un poco impaciente.' },
      { value: 'colorful', label: 'Más colaborador, buscando el apoyo de los demás.' }
    ]
  },
  {
    id: 'hogan_16',
    text: 'Prefiero las tareas que:',
    options: [
      { value: 'diligent', label: 'Tienen un principio y un fin claros y bien definidos.' },
      { value: 'imaginative', label: 'Son abiertas y me permiten explorar diferentes posibilidades.' },
      { value: 'colorful', label: 'Me permiten interactuar con clientes o colegas.' },
      { value: 'cautious', label: 'Me permiten organizar y mejorar los sistemas existentes.' }
    ]
  },
  {
    id: 'hogan_17',
    text: 'Cuando lidero un proyecto, pongo más énfasis en:',
    options: [
      { value: 'diligent', label: 'El plan, el cronograma y el presupuesto.' },
      { value: 'imaginative', label: 'La visión, la innovación y la imagen general.' },
      { value: 'dutiful', label: 'La gente, la moral del equipo y la colaboración.' },
      { value: 'bold', label: 'Los resultados, la eficiencia y el cumplimiento de los objetivos.' }
    ]
  },
  {
    id: 'hogan_18',
    text: 'Considero que el conflicto en un equipo es:',
    options: [
      { value: 'dutiful', label: 'Algo que debe evitarse a toda costa para mantener la armonía.' },
      { value: 'cautious', label: 'Destructivo si es personal, pero útil si se trata de ideas.' },
      { value: 'colorful', label: 'Una parte natural y a veces necesaria del trabajo en equipo.' },
      { value: 'imaginative', label: 'Una oportunidad para que surjan las mejores ideas.' }
    ]
  },
  {
    id: 'hogan_19',
    text: 'Mi estilo de comunicación es generalmente:',
    options: [
      { value: 'colorful', label: 'Entusiasta e inspirador.' },
      { value: 'cautious', label: 'Tranquilo, reflexivo y basado en hechos.' },
      { value: 'dutiful', label: 'Cálido, empático y alentador.' },
      { value: 'bold', label: 'Claro, conciso y directo al grano.' }
    ]
  },
  {
    id: 'hogan_20',
    text: 'Cuando aprendo algo nuevo, prefiero:',
    options: [
      { value: 'diligent', label: 'Un curso estructurado con un experto.' },
      { value: 'imaginative', label: 'Experimentar y aprender haciendo.' },
      { value: 'cautious', label: 'Leer libros y artículos por mi cuenta.' },
      { value: 'colorful', label: 'Discutirlo con otros y aprender de sus experiencias.' }
    ]
  },
  {
    id: 'hogan_21',
    text: 'La gente probablemente me describiría como:',
    options: [
      { value: 'diligent', label: 'Fiable y metódico.' },
      { value: 'imaginative', label: 'Creativo y visionario.' },
      { value: 'dutiful', label: 'Amigable y accesible.' },
      { value: 'bold', label: 'Ambicioso y orientado a la acción.' }
    ]
  },
  {
    id: 'hogan_22',
    text: '¿Qué es más importante para usted en el trabajo?',
    options: [
      { value: 'bold', label: 'Lograr resultados y avanzar en mi carrera.' },
      { value: 'colorful', label: 'Tener buenas relaciones con mis compañeros.' },
      { value: 'cautious', label: 'Tener un trabajo interesante que me desafíe intelectualmente.' },
      { value: 'diligent', label: 'Tener seguridad laboral y un entorno de trabajo estable.' }
    ]
  },
  {
    id: 'hogan_23',
    text: 'Cuando me uno a un grupo nuevo, tiendo a:',
    options: [
      { value: 'colorful', label: 'Presentarme y hablar con tantas personas como sea posible.' },
      { value: 'cautious', label: 'Observar primero y hablar cuando me siento cómodo.' },
      { value: 'dutiful', label: 'Buscar a una o dos personas con las que conectar.' },
      { value: 'bold', label: 'Centrarme en la tarea o el propósito del grupo.' }
    ]
  },
  {
    id: 'hogan_24',
    text: 'Me resulta fácil:',
    options: [
      { value: 'diligent', label: 'Mantener la calma en situaciones de alta presión.' },
      { value: 'imaginative', label: 'Pensar en ideas originales y fuera de lo común.' },
      { value: 'cautious', label: 'Organizar planes y proyectos complejos.' },
      { value: 'dutiful', label: 'Entender los sentimientos y perspectivas de los demás.' }
    ]
  },
  {
    id: 'hogan_25',
    text: 'Es más probable que me irrite:',
    options: [
      { value: 'diligent', label: 'La ineficiencia y la falta de planificación.' },
      { value: 'imaginative', label: 'La gente que se resiste a nuevas ideas.' },
      { value: 'dutiful', label: 'La falta de armonía y los conflictos interpersonales.' },
      { value: 'bold', label: 'La falta de ambición o la complacencia.' }
    ]
  },
  {
    id: 'hogan_26',
    text: 'Si tuviera que elegir, preferiría ser conocido como alguien que es:',
    options: [
      { value: 'dutiful', label: 'Justo y coherente.' },
      { value: 'imaginative', label: 'Innovador y audaz.' },
      { value: 'colorful', label: 'Compasivo y solidario.' },
      { value: 'bold', label: 'Eficaz y decidido.' }
    ]
  },
  {
    id: 'hogan_27',
    text: 'Cuando planifico mi día, yo:',
    options: [
      { value: 'diligent', label: 'Hago una lista detallada de tareas y la sigo rigurosamente.' },
      { value: 'imaginative', label: 'Tengo una idea general de lo que necesito hacer, pero dejo espacio para la espontaneidad.' },
      { value: 'dutiful', label: 'Priorizo las tareas que involucran a otras personas.' },
      { value: 'bold', label: 'Me centro primero en la tarea más grande y desafiante.' }
    ]
  },
  {
    id: 'hogan_28',
    text: 'Me siento satisfecho cuando:',
    options: [
      { value: 'diligent', label: 'Completo una tarea a la perfección, sin errores.' },
      { value: 'bold', label: 'Supero a un competidor o alcanzo una meta difícil.' },
      { value: 'cautious', label: 'Aprendo una nueva habilidad o resuelvo un enigma.' },
      { value: 'dutiful', label: 'He ayudado a un colega a resolver un problema.' }
    ]
  },
  {
    id: 'hogan_29',
    text: 'Mi opinión sobre la multitarea es que:',
    options: [
      { value: 'colorful', label: 'Es una habilidad esencial y la practico a menudo.' },
      { value: 'cautious', label: 'Prefiero centrarme en una cosa a la vez para garantizar la calidad.' },
      { value: 'diligent', label: 'Es inevitable, pero trato de minimizarla.' },
      { value: 'bold', label: 'Me gusta la energía de hacer varias cosas a la vez.' }
    ]
  },
  {
    id: 'hogan_30',
    text: 'Cuando me presentan información nueva, mi tendencia es a:',
    options: [
      { value: 'dutiful', label: 'Aceptarla si viene de una fuente fiable.' },
      { value: 'cautious', label: 'Ser escéptico y cuestionarla.' },
      { value: 'diligent', label: 'Conectarla con lo que ya sé.' },
      { value: 'bold', label: 'Pensar inmediatamente en cómo podría aplicarla.' }
    ]
  },
  {
    id: 'hogan_31',
    text: '¿Qué describe mejor su relación con la atención al detalle?',
    options: [
      { value: 'diligent', label: 'Soy meticuloso; los detalles son cruciales.' },
      { value: 'imaginative', label: 'Me centro en la visión general; los detalles pueden ser delegados.' },
      { value: 'cautious', label: 'Presto atención a los detalles si son importantes para el resultado final.' },
      { value: 'colorful', label: 'Puedo ser bueno con los detalles, pero no es mi actividad favorita.' }
    ]
  },
  {
    id: 'hogan_32',
    text: 'En una discusión, mi objetivo es:',
    options: [
      { value: 'bold', label: 'Ganar el argumento y demostrar que tengo razón.' },
      { value: 'cautious', label: 'Encontrar la mejor solución posible, sin importar de quién venga la idea.' },
      { value: 'dutiful', label: 'Asegurarme de que todos se sientan escuchados y respetados.' },
      { value: 'diligent', label: 'Llegar a una conclusión lógica basada en la evidencia.' }
    ]
  },
  {
    id: 'hogan_33',
    text: 'Cuando hablo en público:',
    options: [
      { value: 'colorful', label: 'Me siento cómodo y disfruto de la oportunidad.' },
      { value: 'diligent', label: 'Me preparo mucho para sentirme seguro.' },
      { value: 'sensitive', label: 'Me siento bastante nervioso.' },
      { value: 'cautious', label: 'Prefiero que otros tomen la palabra.' }
    ]
  },
  {
    id: 'hogan_34',
    text: '¿Con qué afirmación se identifica más?',
    options: [
      { value: 'bold', label: 'Es mejor pedir perdón que pedir permiso.' },
      { value: 'cautious', label: 'Es mejor ir a lo seguro.' },
      { value: 'dutiful', label: 'Es importante seguir las reglas establecidas.' },
      { value: 'imaginative', label: 'Las reglas están para romperse si es necesario.' }
    ]
  },
  {
    id: 'hogan_35',
    text: 'Ante la ambigüedad y la incertidumbre, me siento:',
    options: [
      { value: 'diligent', label: 'Incómodo y prefiero tener claridad.' },
      { value: 'imaginative', label: 'Estimulado, lo veo como una oportunidad.' },
      { value: 'dutiful', label: 'Neutral, lo acepto como parte del trabajo.' },
      { value: 'cautious', label: 'Cauteloso y procedo con cuidado.' }
    ]
  },
  {
    id: 'hogan_36',
    text: 'Cuando se trata de tomar la iniciativa:',
    options: [
      { value: 'bold', label: 'Suelo ser el primero en ofrecerme voluntario o tomar el mando.' },
      { value: 'dutiful', label: 'Tomo la iniciativa si veo que nadie más lo hace.' },
      { value: 'cautious', label: 'Prefiero que me asignen tareas claras.' },
      { value: 'diligent', label: 'Tomo la iniciativa en áreas donde me siento muy competente.' }
    ]
  },
  {
    id: 'hogan_37',
    text: '¿Cuál es su enfoque para el equilibrio entre el trabajo y la vida personal?',
    options: [
      { value: 'bold', label: 'El trabajo es una prioridad y a menudo ocupa gran parte de mi tiempo.' },
      { value: 'diligent', label: 'Intento mantener una separación clara entre el trabajo y mi vida personal.' },
      { value: 'colorful', label: 'Mi trabajo y mi vida personal están bastante integrados.' },
      { value: 'dutiful', label: 'Doy prioridad a mi vida personal y me aseguro de que el trabajo no la invada.' }
    ]
  },
  {
    id: 'hogan_38',
    text: 'Cuando otras personas están estresadas a mi alrededor, yo:',
    options: [
      { value: 'sensitive', label: 'Tiende a afectarme y me estreso también.' },
      { value: 'dutiful', label: 'Intento calmarlas y ofrecerles mi apoyo.' },
      { value: 'cautious', label: 'Me mantengo concentrado en mi propio trabajo y no me involucro.' },
      { value: 'diligent', label: 'Permanezco tranquilo y actúo como una influencia estabilizadora.' }
    ]
  },
  {
    id: 'hogan_39',
    text: 'Disfruto más del trabajo cuando:',
    options: [
      { value: 'colorful', label: 'Hay un ambiente social y divertido.' },
      { value: 'bold', label: 'Hay un enfoque intenso en la consecución de objetivos.' },
      { value: 'diligent', label: 'Hay un ambiente tranquilo y ordenado.' },
      { value: 'cautious', label: 'Hay un espíritu de curiosidad y aprendizaje.' }
    ]
  },
  {
    id: 'hogan_40',
    text: 'Al final de un largo día de trabajo, prefiero:',
    options: [
      { value: 'cautious', label: 'Relajarme a solas o con un círculo muy cercano.' },
      { value: 'colorful', label: 'Salir y socializar con amigos o colegas.' },
      { value: 'bold', label: 'Hacer algo productivo como ejercicio o un hobby.' },
      { value: 'imaginative', label: 'Leer o aprender algo nuevo.' }
    ]
  }
];

export const DISC_QUESTIONS: Question[] = [
  {
    id: 'disc_1', 
    text: 'Normalmente, me considero:',
    options: [
      { value: 'D', label: 'Directo' },
      { value: 'I', label: 'Entusiasta' },
      { value: 'S', label: 'Paciente' },
      { value: 'C', label: 'Preciso' }
    ]
  },
  {
    id: 'disc_2',
    text: 'En un equipo, tiendo a ser:',
    options: [
      { value: 'D', label: 'Decisivo' },
      { value: 'I', label: 'Inspirador' },
      { value: 'S', label: 'Colaborador' },
      { value: 'C', label: 'Sistemático' }
    ]
  },
  {
    id: 'disc_3',
    text: 'Mi enfoque principal es en:',
    options: [
      { value: 'D', label: 'Los resultados' },
      { value: 'I', label: 'Las personas' },
      { value: 'S', label: 'La armonía' },
      { value: 'C', label: 'Los procedimientos' }
    ]
  },
  {
    id: 'disc_4',
    text: 'Me motiva:',
    options: [
      { value: 'D', label: 'El desafío' },
      { value: 'I', label: 'El reconocimiento' },
      { value: 'S', label: 'La seguridad' },
      { value: 'C', label: 'La certeza' }
    ]
  },
  {
    id: 'disc_5',
    text: 'Bajo presión, me vuelvo:',
    options: [
      { value: 'D', label: 'Demandante' },
      { value: 'I', label: 'Desorganizado' },
      { value: 'S', label: 'Complaciente' },
      { value: 'C', label: 'Crítico' }
    ]
  },
  {
    id: 'disc_6',
    text: 'La gente me describiría como:',
    options: [
      { value: 'D', label: 'Audaz' },
      { value: 'I', label: 'Sociable' },
      { value: 'S', label: 'Amable' },
      { value: 'C', label: 'Cuidadoso' }
    ]
  },
  {
    id: 'disc_7',
    text: 'Prefiero un entorno que es:',
    options: [
      { value: 'D', label: 'Competitivo' },
      { value: 'I', label: 'Animado' },
      { value: 'S', label: 'Estable' },
      { value: 'C', label: 'Ordenado' }
    ]
  },
  {
    id: 'disc_8',
    text: 'A la hora de tomar decisiones, soy:',
    options: [
      { value: 'D', label: 'Rápido' },
      { value: 'I', label: 'Intuitivo' },
      { value: 'S', label: 'Deliberado' },
      { value: 'C', label: 'Analítico' }
    ]
  },
  {
    id: 'disc_9',
    text: 'Valoro más:',
    options: [
      { value: 'D', label: 'El control' },
      { value: 'I', label: 'La influencia' },
      { value: 'S', label: 'La cooperación' },
      { value: 'C', label: 'La calidad' }
    ]
  },
  {
    id: 'disc_10',
    text: 'Mi mayor temor es:',
    options: [
      { value: 'D', label: 'Que se aprovechen de mí' },
      { value: 'I', label: 'El rechazo social' },
      { value: 'S', label: 'La pérdida de estabilidad' },
      { value: 'C', label: 'La crítica a mi trabajo' }
    ]
  },
  {
    id: 'disc_11',
    text: 'Me siento más cómodo cuando:',
    options: [
      { value: 'D', label: 'Estoy al mando' },
      { value: 'I', label: 'Estoy persuadiendo' },
      { value: 'S', label: 'Estoy apoyando' },
      { value: 'C', label: 'Estoy organizando' }
    ]
  },
  {
    id: 'disc_12',
    text: 'Mi estilo de comunicación es:',
    options: [
      { value: 'D', label: 'Directo y al grano' },
      { value: 'I', label: 'Hablador y expresivo' },
      { value: 'S', label: 'Cálido y que sabe escuchar' },
      { value: 'C', label: 'Formal y basado en hechos' }
    ]
  },
  {
    id: 'disc_13',
    text: 'Cuando me enfrento a un conflicto, tiendo a:',
    options: [
      { value: 'D', label: 'Afrontarlo directamente' },
      { value: 'I', label: 'Intentar suavizar las cosas' },
      { value: 'S', label: 'Evitarlo si es posible' },
      { value: 'C', label: 'Buscar una solución lógica' }
    ]
  },
  {
    id: 'disc_14',
    text: 'Soy una persona que:',
    options: [
      { value: 'D', label: 'Toma la iniciativa' },
      { value: 'I', label: 'Genera entusiasmo' },
      { value: 'S', label: 'Proporciona estabilidad' },
      { value: 'C', label: 'Asegura la precisión' }
    ]
  },
  {
    id: 'disc_15',
    text: 'Ante las reglas, yo:',
    options: [
      { value: 'D', label: 'Las desafío si es necesario' },
      { value: 'I', label: 'Soy flexible con ellas' },
      { value: 'S', label: 'Prefiero que existan' },
      { value: 'C', label: 'Las sigo meticulosamente' }
    ]
  },
  {
    id: 'disc_16',
    text: 'Describo mi ritmo como:',
    options: [
      { value: 'D', label: 'Rápido y decisivo' },
      { value: 'I', label: 'Enérgico y espontáneo' },
      { value: 'S', label: 'Metódico y constante' },
      { value: 'C', label: 'Cauteloso y sistemático' }
    ]
  },
  {
    id: 'disc_17',
    text: 'En un proyecto, me enfoco en:',
    options: [
      { value: 'D', label: 'El objetivo final' },
      { value: 'I', label: 'La gente involucrada' },
      { value: 'S', label: 'El proceso paso a paso' },
      { value: 'C', label: 'Los detalles y estándares' }
    ]
  },
  {
    id: 'disc_18',
    text: 'Soy naturalmente:',
    options: [
      { value: 'D', label: 'Seguro de mí mismo' },
      { value: 'I', label: 'Optimista' },
      { value: 'S', label: 'Tranquilo' },
      { value: 'C', label: 'Perfeccionista' }
    ]
  },
  {
    id: 'disc_19',
    text: 'Me irrita:',
    options: [
      { value: 'D', label: 'La indecisión' },
      { value: 'I', label: 'El pesimismo' },
      { value: 'S', label: 'La impaciencia' },
      { value: 'C', label: 'El desorden' }
    ]
  },
  {
    id: 'disc_20',
    text: 'Cuando lidero, prefiero:',
    options: [
      { value: 'D', label: 'Dar órdenes' },
      { value: 'I', label: 'Motivar e inspirar' },
      { value: 'S', label: 'Liderar con el ejemplo' },
      { value: 'C', label: 'Establecer directrices claras' }
    ]
  },
  {
    id: 'disc_21',
    text: 'A los demás les parezco:',
    options: [
      { value: 'D', label: 'Exigente' },
      { value: 'I', label: 'Convincente' },
      { value: 'S', label: 'Leal' },
      { value: 'C', label: 'Concienzudo' }
    ]
  },
  {
    id: 'disc_22',
    text: 'Mi forma de trabajar es:',
    options: [
      { value: 'D', label: 'Independiente' },
      { value: 'I', label: 'Colaborativa' },
      { value: 'S', label: 'En equipo' },
      { value: 'C', label: 'Individual y precisa' }
    ]
  },
  {
    id: 'disc_23',
    text: 'Ante el cambio, yo:',
    options: [
      { value: 'D', label: 'Lo inicio' },
      { value: 'I', label: 'Lo acepto con entusiasmo' },
      { value: 'S', label: 'Me resisto al principio' },
      { value: 'C', label: 'Necesito un plan para ello' }
    ]
  },
  {
    id: 'disc_24',
    text: 'Busco:',
    options: [
      { value: 'D', label: 'Poder y autoridad' },
      { value: 'I', label: 'Popularidad y aprobación' },
      { value: 'S', label: 'Aceptación y seguridad' },
      { value: 'C', label: 'Precisión y orden' }
    ]
  },
  {
    id: 'disc_25',
    text: 'En una conversación, tiendo a:',
    options: [
      { value: 'D', label: 'Hablar más que escuchar' },
      { value: 'I', label: 'Ser el centro de atención' },
      { value: 'S', label: 'Escuchar más que hablar' },
      { value: 'C', label: 'Hacer preguntas específicas' }
    ]
  },
  {
    id: 'disc_26',
    text: 'Soy bueno para:',
    options: [
      { value: 'D', label: 'Resolver problemas difíciles' },
      { value: 'I', label: 'Hacer contactos' },
      { value: 'S', label: 'Seguir instrucciones' },
      { value: 'C', label: 'Encontrar errores' }
    ]
  },
  {
    id: 'disc_27',
    text: 'Necesito que los demás sean:',
    options: [
      { value: 'D', label: 'Competentes' },
      { value: 'I', label: 'Amigables' },
      { value: 'S', label: 'Cooperativos' },
      { value: 'C', label: 'Fiables' }
    ]
  },
  {
    id: 'disc_28',
    text: 'Mi lema podría ser:',
    options: [
      { value: 'D', label: '"Simplemente hazlo"' },
      { value: 'I', label: '"Divirtámonos"' },
      { value: 'S', label: '"Llevémonos bien"' },
      { value: 'C', label: '"Hazlo bien"' }
    ]
  },
  {
    id: 'disc_29',
    text: 'Me describen como una persona de:',
    options: [
      { value: 'D', label: 'Voluntad fuerte' },
      { value: 'I', label: 'Mente abierta' },
      { value: 'S', label: 'Buen corazón' },
      { value: 'C', label: 'Mente analítica' }
    ]
  },
  {
    id: 'disc_30',
    text: 'Cuando me relaciono con otros, soy:',
    options: [
      { value: 'D', label: 'Asertivo' },
      { value: 'I', label: 'Encantador' },
      { value: 'S', label: 'Discreto' },
      { value: 'C', label: 'Diplomático' }
    ]
  },
  {
    id: 'disc_31',
    text: 'Tiende a ser:',
    options: [
      { value: 'D', label: 'Escéptico' },
      { value: 'I', label: 'Confiado' },
      { value: 'S', label: 'Apacible' },
      { value: 'C', label: 'Lógico' }
    ]
  },
  {
    id: 'disc_32',
    text: 'En mi escritorio, es probable que encuentres:',
    options: [
      { value: 'D', label: 'Solo lo esencial' },
      { value: 'I', label: 'Fotos e inspiración' },
      { value: 'S', label: 'Recuerdos y objetos personales' },
      { value: 'C', label: 'Todo perfectamente organizado' }
    ]
  },
  {
    id: 'disc_33',
    text: 'Tiendo a centrarme en:',
    options: [
      { value: 'D', label: 'El "qué"' },
      { value: 'I', label: 'El "quién"' },
      { value: 'S', label: 'El "cómo"' },
      { value: 'C', label: 'El "porqué"' }
    ]
  },
  {
    id: 'disc_34',
    text: 'Cuando hablo, mi tono es:',
    options: [
      { value: 'D', label: 'Fuerte y seguro' },
      { value: 'I', label: 'Animado y rápido' },
      { value: 'S', label: 'Suave y tranquilo' },
      { value: 'C', label: 'Controlado y deliberado' }
    ]
  },
  {
    id: 'disc_35',
    text: 'Soy más efectivo en roles que requieren:',
    options: [
      { value: 'D', label: 'Liderazgo' },
      { value: 'I', label: 'Persuasión' },
      { value: 'S', label: 'Apoyo' },
      { value: 'C', label: 'Análisis' }
    ]
  },
  {
    id: 'disc_36',
    text: 'Aporto al equipo:',
    options: [
      { value: 'D', label: 'Dirección' },
      { value: 'I', label: 'Energía' },
      { value: 'S', label: 'Estabilidad' },
      { value: 'C', label: 'Estándares altos' }
    ]
  },
  {
    id: 'disc_37',
    text: 'Mi forma de pensar es:',
    options: [
      { value: 'D', label: 'Pragmática' },
      { value: 'I', label: 'Imaginativa' },
      { value: 'S', label: 'Considerada' },
      { value: 'C', label: 'Objetiva' }
    ]
  },
  {
    id: 'disc_38',
    text: 'Cuando escucho una idea nueva:',
    options: [
      { value: 'D', label: 'Pienso en cómo lograrla' },
      { value: 'I', label: 'Me emociono con las posibilidades' },
      { value: 'S', label: 'Pienso en cómo afectará a la gente' },
      { value: 'C', label: 'Pienso en los posibles problemas' }
    ]
  },
  {
    id: 'disc_39',
    text: 'La palabra que mejor me describe es:',
    options: [
      { value: 'D', label: 'Impulsor' },
      { value: 'I', label: 'Promotor' },
      { value: 'S', label: 'Conciliador' },
      { value: 'C', label: 'Planificador' }
    ]
  },
  {
    id: 'disc_40',
    text: 'En general, soy una persona:',
    options: [
      { value: 'D', label: 'Orientada a la tarea' },
      { value: 'I', label: 'Orientada a las personas' },
      { value: 'S', label: 'Orientada al equipo' },
      { value: 'C', label: 'Orientada a los detalles' }
    ]
  }
];

export const COGNITIVE_TEST_QUESTIONS: Question[] = [
  {
    id: 'cog_1', 
    text: 'LÍDER es a EQUIPO como DIRECTOR es a:',
    options: [
      { value: 'orquesta', label: 'Orquesta' },
      { value: 'pelicula', label: 'Película' },
      { value: 'actor', label: 'Actor' },
      { value: 'guion', label: 'Guion' }
    ]
  },
  {
    id: 'cog_2',
    text: '¿Qué número sigue en la secuencia? 2, 5, 11, 23, ___',
    options: [
      { value: '46', label: '46' },
      { value: '47', label: '47' },
      { value: '44', label: '44' },
      { value: '51', label: '51' }
    ]
  },
  {
    id: 'cog_3',
    text: 'Todos los gerentes de esta empresa han completado un curso de liderazgo. María es gerente en esta empresa. Por lo tanto:',
    options: [
      { value: 'buena_lider', label: 'María es una buena líder.' },
      { value: 'todos_gerentes', label: 'Todos los que completan el curso de liderazgo se convierten en gerentes.' },
      { value: 'maria_curso', label: 'María ha completado un curso de liderazgo.' },
      { value: 'algunos_no', label: 'Algunos gerentes no han completado el curso.' }
    ]
  },
  {
    id: 'cog_4',
    text: 'Un producto cuesta $120. Si se le aplica un descuento del 20% y luego se le añade un impuesto del 10% sobre el precio descontado, ¿cuál es el precio final?',
    options: [
      { value: '108', label: '$108.00' },
      { value: '105.60', label: '$105.60' },
      { value: '96', label: '$96.00' },
      { value: '118.80', label: '$118.80' }
    ]
  },
  {
    id: 'cog_5',
    text: 'Observe la secuencia de figuras. Una figura rota 90 grados en el sentido de las agujas del reloj en cada paso. Si en el paso 1 la figura es una flecha apuntando hacia ARRIBA (↑), ¿hacia dónde apuntará en el paso 4?',
    options: [
      { value: 'arriba', label: 'Arriba (↑)' },
      { value: 'abajo', label: 'Abajo (↓)' },
      { value: 'izquierda', label: 'Izquierda (←)' },
      { value: 'derecha', label: 'Derecha (→)' }
    ]
  },
  {
    id: 'cog_6',
    text: 'INNOVAR es a CREAR como OPTIMIZAR es a:',
    options: [
      { value: 'destruir', label: 'Destruir' },
      { value: 'mantener', label: 'Mantener' },
      { value: 'mejorar', label: 'Mejorar' },
      { value: 'ignorar', label: 'Ignorar' }
    ]
  },
  {
    id: 'cog_7',
    text: 'Si llueve, el suelo se moja. El suelo no está mojado. Por lo tanto:',
    options: [
      { value: 'no_llovido', label: 'No ha llovido.' },
      { value: 'llovio_seco', label: 'Ha llovido, pero el suelo se secó.' },
      { value: 'va_llover', label: 'Está a punto de llover.' },
      { value: 'limpio_suelo', label: 'Alguien limpió el suelo.' }
    ]
  },
  {
    id: 'cog_8',
    text: '¿Qué número sigue en la secuencia? 90, 83, 76, 69, ___',
    options: [
      { value: '62', label: '62' },
      { value: '63', label: '63' },
      { value: '61', label: '61' },
      { value: '60', label: '60' }
    ]
  },
  {
    id: 'cog_9',
    text: 'Lea el siguiente párrafo: "La implementación de la nueva estrategia de marketing digital resultó en un aumento del 25% en el tráfico web. Sin embargo, la tasa de conversión de visitantes a clientes solo aumentó un 5%. El equipo de análisis sugiere que, aunque la estrategia atrae a más gente, el mensaje podría no estar alineado con los visitantes que tienen una intención de compra real." ¿Qué se puede concluir del texto?',
    options: [
      { value: 'fracaso_total', label: 'La estrategia de marketing fue un fracaso total.' },
      { value: 'exito_audiencia', label: 'La estrategia tuvo éxito en atraer audiencia pero no en generar ventas proporcionales.' },
      { value: 'equipo_no_sabe', label: 'El equipo de análisis no sabe por qué la conversión es baja.' },
      { value: 'mas_dinero', label: 'Se necesita invertir más dinero en la misma estrategia.' }
    ]
  },
  {
    id: 'cog_10',
    text: 'Tres impresoras trabajando juntas pueden completar un trabajo en 60 minutos. ¿Cuántos minutos tardarían dos de esas impresoras en hacer el mismo trabajo?',
    options: [
      { value: '40', label: '40' },
      { value: '80', label: '80' },
      { value: '90', label: '90' },
      { value: '120', label: '120' }
    ]
  },
  {
    id: 'cog_11',
    text: 'Lea el párrafo anterior de nuevo. ¿Cuál sería el siguiente paso más lógico para el equipo?',
    options: [
      { value: 'cancelar_estrategia', label: 'Cancelar toda la estrategia de marketing digital.' },
      { value: 'mas_vendedores', label: 'Contratar a más vendedores.' },
      { value: 'mas_presupuesto', label: 'Aumentar el presupuesto para atraer aún más tráfico.' },
      { value: 'revisar_mensaje', label: 'Revisar y ajustar el mensaje de la campaña para atraer a un público más cualificado.' }
    ]
  },
  {
    id: 'cog_12',
    text: 'Observe una serie de cajas. La primera tiene 1 punto, la segunda tiene 3 puntos, la tercera tiene 6 puntos, la cuarta tiene 10 puntos. ¿Cuántos puntos tendrá la quinta caja?',
    options: [
      { value: '12', label: '12' },
      { value: '14', label: '14' },
      { value: '15', label: '15' },
      { value: '16', label: '16' }
    ]
  },
  {
    id: 'cog_13',
    text: 'MÉDICO es a HOSPITAL como CHEF es a:',
    options: [
      { value: 'cocina', label: 'Cocina' },
      { value: 'restaurante', label: 'Restaurante' },
      { value: 'comida', label: 'Comida' },
      { value: 'receta', label: 'Receta' }
    ]
  },
  {
    id: 'cog_14',
    text: 'En una empresa de 200 empleados, el 60% trabaja en ventas, el 25% en marketing y el resto en administración. ¿Cuántos empleados trabajan en administración?',
    options: [
      { value: '30', label: '30' },
      { value: '25', label: '25' },
      { value: '35', label: '35' },
      { value: '40', label: '40' }
    ]
  },
  {
    id: 'cog_15',
    text: 'Todos los proyectos exitosos requieren una planificación cuidadosa. Este proyecto no tuvo una planificación cuidadosa. Por lo tanto:',
    options: [
      { value: 'no_exitoso', label: 'Este proyecto no fue exitoso.' },
      { value: 'podria_exitoso', label: 'Este proyecto podría haber sido exitoso de todas formas.' },
      { value: 'necesita_planificacion', label: 'Este proyecto necesita más planificación.' },
      { value: 'todos_fallan', label: 'Todos los proyectos sin planificación fallan.' }
    ]
  },
  {
    id: 'cog_16',
    text: '¿Qué número sigue en la secuencia? 1, 4, 9, 16, 25, ___',
    options: [
      { value: '36', label: '36' },
      { value: '35', label: '35' },
      { value: '30', label: '30' },
      { value: '49', label: '49' }
    ]
  },
  {
    id: 'cog_17',
    text: 'Una startup tecnológica lanzó su aplicación hace 6 meses. Inicialmente tuvo 10,000 descargas en el primer mes, pero las descargas han disminuido un 15% cada mes desde entonces. Los ingresos por usuario han aumentado un 20% mensual debido a mejores funciones premium. ¿Qué indica esta información?',
    options: [
      { value: 'app_fracaso', label: 'La aplicación es un fracaso porque las descargas están bajando.' },
      { value: 'modelo_maduro', label: 'El modelo de negocio está madurando hacia la monetización de usuarios existentes.' },
      { value: 'necesita_marketing', label: 'Necesitan invertir más en marketing para aumentar descargas.' },
      { value: 'usuarios_insatisfechos', label: 'Los usuarios están insatisfechos con las nuevas funciones.' }
    ]
  },
  {
    id: 'cog_18',
    text: 'Un cubo tiene 6 caras. Si cada cara se divide en 4 secciones iguales, ¿cuántas secciones hay en total?',
    options: [
      { value: '24', label: '24' },
      { value: '20', label: '20' },
      { value: '18', label: '18' },
      { value: '16', label: '16' }
    ]
  },
  {
    id: 'cog_19',
    text: 'OPTIMISTA es a PESIMISTA como PROACTIVO es a:',
    options: [
      { value: 'reactivo', label: 'Reactivo' },
      { value: 'pasivo', label: 'Pasivo' },
      { value: 'negativo', label: 'Negativo' },
      { value: 'inactivo', label: 'Inactivo' }
    ]
  },
  {
    id: 'cog_20',
    text: 'Basándose en el caso de la startup del ejercicio anterior, ¿cuál sería la estrategia más lógica para los próximos 6 meses?',
    options: [
      { value: 'solo_adquisicion', label: 'Enfocarse únicamente en adquirir nuevos usuarios.' },
      { value: 'equilibrio_estrategico', label: 'Equilibrar la retención y monetización de usuarios existentes con la adquisición moderada de nuevos usuarios.' },
      { value: 'eliminar_premium', label: 'Eliminar las funciones premium para atraer más usuarios.' },
      { value: 'cambiar_modelo', label: 'Cambiar completamente el modelo de negocio.' }
    ]
  }
];

export const ETHICAL_DILEMMAS: EthicalDilemma[] = [
  {
    id: 'ethical_1', 
    scenario: 'Descubre un archivo en un servidor compartido, accesible por error, que contiene los salarios de todos los empleados de su departamento, incluido el de su jefe. Sabe que algunos compañeros sienten que están mal pagados.',
    mainQuestion: '¿Qué haría en esta situación?',
    followUpQuestions: [
      '¿Qué riesgos ve en su acción elegida y cómo los mitigaría?',
      '¿Su respuesta cambiaría si la información fuera sobre próximos despidos en lugar de salarios? ¿Por qué?'
    ]
  },
  {
    id: 'ethical_2',
    scenario: 'En una reunión importante con la alta dirección, su jefe presenta una idea suya como si fuera propia y recibe grandes elogios. Su jefe tiene una influencia significativa en su carrera.',
    mainQuestion: '¿Qué haría en esta situación?',
    followUpQuestions: [
      '¿Cómo equilibraría la necesidad de recibir crédito por su trabajo con el riesgo de dañar su relación con su jefe?',
      '¿Qué haría para asegurarse de que esto no vuelva a suceder en el futuro?'
    ]
  },
  {
    id: 'ethical_3',
    scenario: 'La empresa está eligiendo un nuevo proveedor. Uno de los finalistas es una pequeña empresa propiedad de un buen amigo suyo. Su recomendación tiene mucho peso en la decisión final. Cree objetivamente que la empresa de su amigo es una buena opción, pero no necesariamente la mejor ni la más barata.',
    mainQuestion: '¿Qué haría en esta situación?',
    followUpQuestions: [
      '¿Cómo gestionaría la transparencia en esta situación con su equipo directivo?',
      '¿Qué principios éticos guían su enfoque en esta situación?'
    ]
  },
  {
    id: 'ethical_4',
    scenario: 'Ve a un compañero de alto rendimiento haciendo un comentario inapropiado y ofensivo a un miembro más junior del equipo. El miembro junior parece visiblemente incómodo pero no dice nada. Sabe que reportarlo podría iniciar un proceso complicado de RRHH y afectar la dinámica del equipo.',
    mainQuestion: '¿Qué haría en esta situación?',
    followUpQuestions: [
      '¿Cuál es su responsabilidad principal en esta situación: hacia el miembro junior, hacia el equipo o hacia la empresa?',
      'Si decidiera intervenir, ¿cómo lo haría para maximizar un resultado positivo y minimizar las consecuencias negativas?'
    ]
  },
  {
    id: 'ethical_5',
    scenario: 'Está a punto de cumplir una fecha límite crucial para un cliente importante. Se da cuenta de que hay un error de calidad menor en el producto/servicio. Corregirlo significaría no cumplir con la fecha de entrega, lo que molestaría al cliente. Ignorarlo podría dañar la reputación de la empresa a largo plazo si se descubre.',
    mainQuestion: '¿Qué haría en esta situación?',
    followUpQuestions: [
      '¿Qué factores son los más importantes para usted al tomar esta decisión?',
      '¿Cómo comunicaría su decisión al cliente y a su equipo?'
    ]
  }
];

// Intro texts for each assessment
export const SITUATIONAL_LEADERSHIP_INTRO = `
<p>La <strong>Evaluación de Liderazgo Situacional</strong> está diseñada para identificar su estilo natural de liderazgo y cómo adapta su enfoque según las diferentes situaciones y necesidades de su equipo.</p>

<p>Esta evaluación se basa en el modelo de Liderazgo Situacional desarrollado por Ken Blanchard y Paul Hersey, que identifica cuatro estilos principales:</p>

<ul>
  <li><strong>Dirigir (S1):</strong> Alto en dirección, bajo en apoyo - Para empleados nuevos o sin experiencia</li>
  <li><strong>Entrenar (S2):</strong> Alto en dirección y apoyo - Para empleados con alguna competencia pero baja confianza</li>
  <li><strong>Apoyar (S3):</strong> Bajo en dirección, alto en apoyo - Para empleados competentes pero con motivación variable</li>
  <li><strong>Delegar (S4):</strong> Bajo en dirección y apoyo - Para empleados altamente competentes y motivados</li>
</ul>

<p><strong>Instrucciones:</strong> Para cada situación presentada, seleccione la respuesta que mejor represente cómo actuaría naturalmente. No hay respuestas correctas o incorrectas; buscamos entender su estilo auténtico de liderazgo.</p>

<p><em>Tiempo estimado: 15-20 minutos</em></p>
`;

export const HOGAN_STYLE_INTRO = `
<p>La <strong>Evaluación de Estilo de Liderazgo Hogan</strong> explora las características fundamentales de su personalidad en el contexto profesional y cómo estas influyen en su estilo de liderazgo y trabajo en equipo.</p>

<p>Esta evaluación examina siete dimensiones clave de la personalidad profesional:</p>

<ul>
  <li><strong>Audaz (Bold):</strong> Confianza, asertividad y disposición a tomar riesgos</li>
  <li><strong>Cauteloso (Cautious):</strong> Prudencia, análisis cuidadoso y gestión de riesgos</li>
  <li><strong>Colorido (Colorful):</strong> Sociabilidad, optimismo y habilidades interpersonales</li>
  <li><strong>Diligente (Diligent):</strong> Organización, atención al detalle y seguimiento de procesos</li>
  <li><strong>Servicial (Dutiful):</strong> Lealtad, cooperación y orientación al servicio</li>
  <li><strong>Imaginativo (Imaginative):</strong> Creatividad, innovación y pensamiento estratégico</li>
  <li><strong>Sensible (Sensitive):</strong> Reactividad emocional y sensibilidad interpersonal</li>
</ul>

<p><strong>Instrucciones:</strong> Responda cada pregunta basándose en cómo se comporta típicamente en situaciones de trabajo. Sea honesto y seleccione la opción que mejor lo describa, incluso si no es la respuesta "ideal".</p>

<p><em>Tiempo estimado: 20-25 minutos</em></p>
`;

export const DISC_INTRO = `
<p>La <strong>Evaluación de Perfil DISC</strong> identifica su estilo de comportamiento predominante y cómo interactúa con otros en el entorno laboral.</p>

<p>El modelo DISC evalúa cuatro estilos principales de comportamiento:</p>

<ul>
  <li><strong>Dominancia (D):</strong> Orientado a resultados, directo, decidido y competitivo</li>
  <li><strong>Influencia (I):</strong> Sociable, optimista, persuasivo y orientado a las personas</li>
  <li><strong>Estabilidad (S):</strong> Paciente, leal, colaborativo y orientado al equipo</li>
  <li><strong>Cumplimiento (C):</strong> Analítico, preciso, sistemático y orientado a la calidad</li>
</ul>

<p>Cada persona tiene una combinación única de estos estilos, con uno o dos que tienden a ser dominantes.</p>

<p><strong>Instrucciones:</strong> Para cada afirmación, seleccione la opción que mejor lo describa en la mayoría de las situaciones laborales. Responda instintivamente, basándose en su comportamiento natural.</p>

<p><em>Tiempo estimado: 15-20 minutos</em></p>
`;

export const COGNITIVE_ABILITY_INTRO = `
<p>La <strong>Evaluación de Habilidades Cognitivas</strong> mide diferentes aspectos de su capacidad intelectual y de resolución de problemas en contextos profesionales.</p>

<p>Esta evaluación examina cinco áreas clave:</p>

<ul>
  <li><strong>Razonamiento Verbal:</strong> Comprensión de conceptos expresados en palabras y analogías</li>
  <li><strong>Razonamiento Numérico:</strong> Habilidad para trabajar con números, patrones y cálculos</li>
  <li><strong>Razonamiento Lógico:</strong> Capacidad para analizar argumentos y llegar a conclusiones válidas</li>
  <li><strong>Comprensión Lectora:</strong> Análisis e interpretación de información escrita compleja</li>
  <li><strong>Razonamiento Espacial:</strong> Visualización y manipulación mental de objetos y patrones</li>
</ul>

<p><strong>Instrucciones:</strong> Lea cada pregunta cuidadosamente y seleccione la mejor respuesta. Algunas preguntas pueden requerir cálculos o análisis detallado. Tómese el tiempo necesario para pensar, pero confíe en su primera impresión.</p>

<p><em>Tiempo estimado: 25-30 minutos</em></p>
`;

export const ETHICS_INTRO = `
<p>La <strong>Evaluación de Ética y Valores Profesionales</strong> explora cómo aborda dilemas éticos complejos en el entorno laboral y qué principios guían su toma de decisiones.</p>

<p>Esta sección presenta escenarios realistas que pueden ocurrir en cualquier organización, donde:</p>

<ul>
  <li>No hay una respuesta "correcta" única</li>
  <li>Múltiples valores pueden estar en conflicto</li>
  <li>Las decisiones tienen consecuencias para diferentes stakeholders</li>
  <li>Se requiere equilibrar intereses personales, del equipo y organizacionales</li>
</ul>

<p><strong>Áreas de Evaluación:</strong></p>
<ul>
  <li><strong>Integridad:</strong> Honestidad y coherencia entre valores y acciones</li>
  <li><strong>Transparencia:</strong> Apertura en la comunicación y toma de decisiones</li>
  <li><strong>Responsabilidad:</strong> Compromiso con las consecuencias de las decisiones</li>
  <li><strong>Justicia:</strong> Equidad en el trato hacia todos los involucrados</li>
  <li><strong>Respeto:</strong> Consideración por los derechos y dignidad de otros</li>
</ul>

<p><strong>Instrucciones:</strong> Para cada escenario, responda las tres preguntas con honestidad y detalle. No hay respuestas correctas o incorrectas; buscamos entender su proceso de razonamiento ético y los valores que guían sus decisiones.</p>

<p><em>Tiempo estimado: 20-25 minutos</em></p>
`;