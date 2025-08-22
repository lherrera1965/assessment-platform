import { Question, EthicalDilemma, AnswerSet } from './types';

// ===== INTRODUCCIONES DE CADA SECCIÓN =====

export const SITUATIONAL_LEADERSHIP_INTRO = `
<h2 class="text-2xl font-bold text-slate-800 mb-4">Sección 1: Liderazgo Situacional</h2>

<p class="text-slate-600 mb-4">
Bienvenido a la sección de Liderazgo Situacional. Este módulo evalúa una de las competencias más críticas del liderazgo moderno: <strong>la agilidad adaptativa</strong>.
</p>

<p class="text-slate-600 mb-4">
El modelo de Liderazgo Situacional®, desarrollado por Paul Hersey y Ken Blanchard, se basa en la premisa de que no existe un único estilo de liderazgo efectivo. La efectividad de un líder reside en su capacidad para diagnosticar el nivel de desarrollo de un colaborador (su competencia y compromiso) frente a una tarea específica y aplicar el estilo de liderazgo adecuado.
</p>

<p class="text-slate-600 mb-4">En esta prueba, exploraremos su dominio de los cuatro estilos principales:</p>

<ul class="list-disc list-inside text-slate-600 mb-4 space-y-2">
  <li><strong>S1 - Dirigir:</strong> Proporcionar instrucciones claras y supervisión estrecha a quienes son nuevos en una tarea pero están entusiasmados.</li>
  <li><strong>S2 - Entrenar:</strong> Dirigir y apoyar a quienes han desarrollado algunas habilidades pero han perdido motivación o confianza.</li>
  <li><strong>S3 - Apoyar:</strong> Fomentar la colaboración y la toma de decisiones con personas competentes que pueden dudar de su propia capacidad.</li>
  <li><strong>S4 - Delegar:</strong> Otorgar autonomía y responsabilidad a los colaboradores que son expertos y están altamente comprometidos.</li>
</ul>

<p class="text-slate-600 mb-6">
Sus respuestas a los siguientes escenarios nos permitirán comprender su versatilidad para aplicar el estilo correcto en el momento oportuno.
</p>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
  <p class="text-blue-800 font-medium italic">
    "Un liderazgo excepcional no trata de tener un solo estilo, sino de tener el estilo correcto para cada momento. Demuestre su agilidad como líder."
  </p>
</div>
`;

export const HOGAN_STYLE_INTRO = `
<h2 class="text-2xl font-bold text-slate-800 mb-4">Sección 2: Perfil de Competencias y Riesgos (Hogan)</h2>

<p class="text-slate-600 mb-4">
Esta sección está diseñada para proporcionar una visión profunda de su personalidad en el contexto laboral, basada en décadas de investigación y en la Teoría Socioanalítica. El objetivo es fomentar una <strong>autoconciencia estratégica</strong> sobre cómo es probable que sea percibido por los demás.
</p>

<p class="text-slate-600 mb-4">Analizaremos dos aspectos fundamentales de su perfil:</p>

<ul class="list-disc list-inside text-slate-600 mb-4 space-y-2">
  <li><strong>El Lado Brillante (Su Reputación):</strong> Explora sus características de personalidad del día a día, aquellas que definen su estilo de trabajo y su reputación como colaborador y líder.</li>
  <li><strong>El Lado Oscuro (Sus Riesgos):</strong> Identifica tendencias de comportamiento que, aunque pueden ser fortalezas en moderación, corren el riesgo de convertirse en "descarriladores" de carrera bajo presión, estrés o complacencia.</li>
</ul>

<p class="text-slate-600 mb-6">
No hay respuestas correctas o incorrectas. La precisión de este perfil dependerá de su honestidad.
</p>

<div class="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
  <p class="text-green-800 font-medium italic">
    "La autoconciencia estratégica es la herramienta más poderosa de un ejecutivo. Este es el momento de afinar la suya."
  </p>
</div>
`;

export const DISC_INTRO = `
<h2 class="text-2xl font-bold text-slate-800 mb-4">Sección 3: Perfil de Comportamiento Profesional (DISC)</h2>

<p class="text-slate-600 mb-4">
El propósito de este módulo es identificar sus preferencias conductuales y su estilo de comunicación natural a través del modelo DISC, una de las herramientas de evaluación más utilizadas en el mundo corporativo.
</p>

<p class="text-slate-600 mb-4">El modelo mapea las tendencias de comportamiento en cuatro dimensiones clave:</p>

<ul class="list-disc list-inside text-slate-600 mb-4 space-y-2">
  <li><strong>Dominancia (D):</strong> Cómo responde ante problemas y desafíos.</li>
  <li><strong>Influencia (I):</strong> Cómo interactúa con los demás e influye en ellos.</li>
  <li><strong>Estabilidad (S):</strong> Cómo responde al ritmo del entorno y a los cambios.</li>
  <li><strong>Conformidad (C):</strong> Cómo responde a las reglas y procedimientos.</li>
</ul>

<p class="text-slate-600 mb-6">
Comprender su perfil le permitirá capitalizar sus fortalezas interpersonales y adaptar su comunicación para colaborar de manera más efectiva con otros estilos.
</p>

<div class="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
  <p class="text-purple-800 font-medium italic">
    "Conocer su estilo operativo natural es el primer paso para potenciar su influencia y construir relaciones laborales más sólidas."
  </p>
</div>
`;

export const COGNITIVE_ABILITY_INTRO = `
<h2 class="text-2xl font-bold text-slate-800 mb-4">Sección 4: Evaluación de Aptitudes Cognitivas (IQ)</h2>

<p class="text-slate-600 mb-4">
Esta sección evalúa su agilidad mental y su capacidad de aprendizaje. En el entorno de negocios actual, la habilidad para procesar información compleja, identificar patrones y resolver problemas novedosos es un predictor clave del éxito.
</p>

<p class="text-slate-600 mb-4">
Este módulo no mide su conocimiento acumulado, sino su "inteligencia fluida". Se le presentarán ejercicios que desafiarán diferentes facetas de su intelecto, incluyendo:
</p>

<ul class="list-disc list-inside text-slate-600 mb-4 space-y-2">
  <li><strong>Razonamiento Lógico-Abstracto:</strong> Su capacidad para ver conexiones y patrones.</li>
  <li><strong>Agilidad Numérica:</strong> Su habilidad para interpretar datos y realizar cálculos.</li>
  <li><strong>Comprensión Verbal:</strong> Su destreza para entender conceptos complejos y argumentos.</li>
</ul>

<div class="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
  <p class="text-orange-800 font-medium italic">
    "Aborde cada reto como una oportunidad para demostrar su capacidad de análisis y pensamiento estratégico."
  </p>
</div>
`;

export const ETHICAL_DILEMMAS_INTRO = `
<h2 class="text-2xl font-bold text-slate-800 mb-4">Sección 5: Diagnóstico de Juicio Ético y Profesional</h2>

<p class="text-slate-600 mb-4">
La integridad es el pilar de un liderazgo sostenible. Este último módulo evalúa su juicio profesional al enfrentarse a "zonas grises": situaciones complejas donde las reglas no son claras y los valores entran en conflicto.
</p>

<p class="text-slate-600 mb-4">
Más que buscar una única respuesta "correcta", esta sección busca entender su proceso de razonamiento ético. Analizaremos la consistencia de su marco de valores y su habilidad para sopesar principios como la transparencia, la responsabilidad, la lealtad y la equidad.
</p>

<p class="text-slate-600 mb-6">
Sus respuestas nos ayudarán a comprender la solidez de su carácter y su fiabilidad como custodio de la cultura y los valores de la organización.
</p>

<div class="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
  <p class="text-red-800 font-medium italic">
    "La verdadera medida de un líder se revela en las decisiones que toma cuando nadie está mirando. Demuestre la solidez de su juicio."
  </p>
</div>
`;

// ===== PREGUNTAS DE LIDERAZGO SITUACIONAL =====

export const SITUATIONAL_LEADERSHIP_QUESTIONS: Question[] = [
  {
    id: 'sit1',
    text: 'Un nuevo miembro del equipo, muy entusiasta pero sin experiencia, se une a tu proyecto. ¿Qué haces?',
    options: [
      { value: 'entrenar', label: 'Le explico las tareas paso a paso y le doy retroalimentación constante sobre su progreso.' },
      { value: 'dirigir', label: 'Le doy instrucciones específicas y superviso de cerca su trabajo inicial.' },
      { value: 'delegar', label: 'Le asigno tareas y confío en que aprenderá sobre la marcha.' },
      { value: 'apoyar', label: 'Le pregunto qué necesita y facilito que el equipo lo ayude.' }
    ]
  },
  {
    id: 'sit2',
    text: 'Un colaborador experimentado normalmente es muy autónomo, pero parece inseguro sobre cómo abordar una nueva tarea compleja. ¿Cómo lo manejas?',
    options: [
      { value: 'dirigir', label: 'Le doy instrucciones detalladas sobre cómo proceder.' },
      { value: 'apoyar', label: 'Escucho sus preocupaciones y lo ayudo a ganar confianza en su enfoque.' },
      { value: 'delegar', label: 'Le recuerdo su experiencia pasada y le doy total autonomía.' },
      { value: 'entrenar', label: 'Le proporciono orientación y verifico su progreso regularmente.' }
    ]
  },
  {
    id: 'sit3',
    text: 'Tu equipo tiene las habilidades para resolver un problema, pero su motivación ha caído y no logran ponerse de acuerdo. ¿Cuál es tu enfoque?',
    options: [
      { value: 'dirigir', label: 'Tomo el control y asigno tareas específicas a cada miembro.' },
      { value: 'delegar', label: 'Les doy la responsabilidad completa de encontrar la solución.' },
      { value: 'apoyar', label: 'Facilito una sesión de lluvia de ideas y los ayudo a llegar a un consenso.' },
      { value: 'entrenar', label: 'Les explico diferentes enfoques y superviso la implementación.' }
    ]
  },
  {
    id: 'sit4',
    text: 'Un miembro clave del equipo es altamente competente y siempre entrega resultados excepcionales sin necesidad de supervisión. Se le asigna un proyecto crítico. ¿Qué acción tomas?',
    options: [
      { value: 'entrenar', label: 'Le doy orientación sobre los aspectos críticos y verifico hitos importantes.' },
      { value: 'apoyar', label: 'Me mantengo disponible para consultas pero no interfiero.' },
      { value: 'delegar', label: 'Le doy total autonomía y solo pido actualizaciones cuando las solicite.' },
      { value: 'dirigir', label: 'Establezco checkpoints frecuentes dada la criticidad del proyecto.' }
    ]
  },
  {
    id: 'sit5',
    text: 'Un colaborador ha estado trabajando en una tarea por un tiempo y ha adquirido cierta habilidad, pero parece frustrado y su compromiso ha disminuido. ¿Cómo intervienes?',
    options: [
      { value: 'dirigir', label: 'Le doy instrucciones más claras y superviso más de cerca.' },
      { value: 'apoyar', label: 'Escucho sus frustraciones y lo ayudo a recuperar la motivación.' },
      { value: 'delegar', label: 'Le doy más autonomía para que encuentre su propio camino.' },
      { value: 'entrenar', label: 'Le proporciono coaching adicional y celebro sus pequeños logros.' }
    ]
  },
  {
    id: 'sit6',
    text: 'Le pides a un miembro del equipo que asuma una nueva responsabilidad; tiene toda la capacidad técnica, pero duda de sí mismo. ¿Qué haces?',
    options: [
      { value: 'entrenar', label: 'Le doy orientación inicial y feedback positivo constante.' },
      { value: 'dirigir', label: 'Le proporciono instrucciones detalladas para asegurar el éxito.' },
      { value: 'delegar', label: 'Confío en su capacidad y le doy total libertad de acción.' },
      { value: 'apoyar', label: 'Lo escucho, valido sus capacidades y facilito su toma de decisiones.' }
    ]
  },
  {
    id: 'sit7',
    text: 'El equipo se enfrenta a una crisis inmediata que requiere una solución rápida y precisa, y no hay tiempo para debatir. ¿Cómo actúas?',
    options: [
      { value: 'apoyar', label: 'Facilito una rápida sesión de brainstorming para encontrar la mejor solución.' },
      { value: 'entrenar', label: 'Explico rápidamente el plan y asigno roles específicos.' },
      { value: 'dirigir', label: 'Tomo el control inmediato y doy órdenes claras y directas.' },
      { value: 'delegar', label: 'Confío en la experiencia del equipo y los dejo manejar la crisis.' }
    ]
  },
  {
    id: 'sit8',
    text: 'Un colaborador junior ha completado con éxito varias tareas pequeñas y ahora quiere asumir un proyecto más grande por su cuenta. ¿Cómo respondes?',
    options: [
      { value: 'delegar', label: 'Le doy el proyecto completo y confío en su capacidad.' },
      { value: 'dirigir', label: 'Le asigno el proyecto pero con supervisión constante.' },
      { value: 'apoyar', label: 'Lo escucho y lo ayudo a planificar su enfoque.' },
      { value: 'entrenar', label: 'Le doy el proyecto con coaching regular y checkpoints claros.' }
    ]
  },
  {
    id: 'sit9',
    text: 'El equipo está desarrollando un nuevo proceso. Todos son expertos en sus áreas, pero necesitan colaborar para que el resultado sea exitoso. ¿Cuál es tu rol?',
    options: [
      { value: 'dirigir', label: 'Coordino todas las actividades y tomo las decisiones finales.' },
      { value: 'entrenar', label: 'Proporciono estructura y facilito el intercambio de conocimientos.' },
      { value: 'delegar', label: 'Les doy total autonomía para que trabajen juntos.' },
      { value: 'apoyar', label: 'Facilito la colaboración y ayudo a resolver conflictos de enfoque.' }
    ]
  },
  {
    id: 'sit10',
    text: 'Un miembro del equipo no está cumpliendo con los plazos. Tiene las habilidades, pero parece distraído y desmotivado. ¿Qué haces?',
    options: [
      { value: 'dirigir', label: 'Establezco plazos más estrictos y superviso diariamente.' },
      { value: 'delegar', label: 'Le recuerdo la importancia del proyecto y confío en que se autorregule.' },
      { value: 'entrenar', label: 'Trabajo con él para identificar obstáculos y crear un plan de acción.' },
      { value: 'apoyar', label: 'Tengo una conversación para entender qué está afectando su motivación.' }
    ]
  },
  {
    id: 'sit11',
    text: 'Un nuevo becario se muestra abrumado por la cantidad de información y no sabe por dónde empezar. ¿Cuál es tu primera acción?',
    options: [
      { value: 'apoyar', label: 'Le pregunto qué parte le resulta más confusa y lo tranquilizo.' },
      { value: 'entrenar', label: 'Le explico las prioridades y verifico su comprensión paso a paso.' },
      { value: 'delegar', label: 'Le doy recursos y confío en que encontrará su camino.' },
      { value: 'dirigir', label: 'Le doy una lista clara de tareas prioritarias y plazos específicos.' }
    ]
  },
  {
    id: 'sit12',
    text: 'Un colaborador senior te presenta una idea innovadora que él está totalmente capacitado para liderar. ¿Qué le dices?',
    options: [
      { value: 'entrenar', label: 'Le doy feedback sobre la idea y lo guío en la planificación.' },
      { value: 'dirigir', label: 'Le doy instrucciones específicas sobre cómo implementarla.' },
      { value: 'apoyar', label: 'Escucho sus ideas y lo ayudo a refinar su propuesta.' },
      { value: 'delegar', label: 'Le doy luz verde y los recursos necesarios para ejecutarla.' }
    ]
  },
  {
    id: 'sit13',
    text: 'El equipo ha llegado a un punto muerto en una decisión importante. Tienen toda la información, pero no logran un consenso. ¿Cómo facilitas el proceso?',
    options: [
      { value: 'dirigir', label: 'Analizo la información y tomo la decisión final.' },
      { value: 'delegar', label: 'Les doy más tiempo para que lleguen a un acuerdo por sí mismos.' },
      { value: 'apoyar', label: 'Facilito una discusión estructurada para ayudarlos a decidir.' },
      { value: 'entrenar', label: 'Les enseño un framework de toma de decisiones y los guío en su aplicación.' }
    ]
  },
  {
    id: 'sit14',
    text: 'Un miembro del equipo ha estado en el equipo durante años y es un experto, pero de repente su rendimiento ha bajado en una tarea que domina. ¿Cómo lo abordas?',
    options: [
      { value: 'delegar', label: 'Asumo que es temporal y le doy espacio para autorregularse.' },
      { value: 'apoyar', label: 'Tengo una conversación privada para entender qué está pasando.' },
      { value: 'dirigir', label: 'Establezco expectativas claras y superviso más de cerca.' },
      { value: 'entrenar', label: 'Reviso el proceso con él y proporciono coaching adicional.' }
    ]
  },
  {
    id: 'sit15',
    text: 'Tienes que implementar un nuevo software. El equipo es competente tecnológicamente, pero se muestra cínico y reacio al cambio. ¿Cuál es tu estrategia?',
    options: [
      { value: 'dirigir', label: 'Establezco la implementación como obligatoria y superviso el cumplimiento.' },
      { value: 'entrenar', label: 'Proporciono capacitación intensiva y acompañamiento durante la transición.' },
      { value: 'delegar', label: 'Les doy la responsabilidad de decidir cómo implementarlo.' },
      { value: 'apoyar', label: 'Escucho sus preocupaciones y los involucro en el diseño de la implementación.' }
    ]
  },
  {
    id: 'sit16',
    text: 'Un miembro del equipo ha aprendido lo básico de una tarea, pero ahora está cometiendo errores por exceso de confianza. ¿Cómo corriges el rumbo?',
    options: [
      { value: 'apoyar', label: 'Lo escucho y lo ayudo a reflexionar sobre los errores.' },
      { value: 'delegar', label: 'Le doy más responsabilidad para que aprenda de sus errores.' },
      { value: 'entrenar', label: 'Refuerzo la capacitación y proporciono feedback correctivo regular.' },
      { value: 'dirigir', label: 'Vuelvo a supervisar de cerca y establezco controles de calidad.' }
    ]
  },
  {
    id: 'sit17',
    text: 'Delegaste una tarea importante, y el colaborador la está ejecutando a la perfección. ¿Cuál es tu nivel de intervención?',
    options: [
      { value: 'entrenar', label: 'Proporciono feedback positivo y algunas sugerencias de mejora.' },
      { value: 'dirigir', label: 'Aumento la supervisión para asegurar que se mantenga el estándar.' },
      { value: 'delegar', label: 'No intervengo, solo recibo actualizaciones cuando me las proporciona.' },
      { value: 'apoyar', label: 'Me mantengo disponible para consultas y celebro sus logros.' }
    ]
  },
  {
    id: 'sit18',
    text: 'Un colaborador muy capaz se niega a realizar una tarea porque la considera "aburrida". ¿Cómo manejas la situación?',
    options: [
      { value: 'delegar', label: 'Le explico la importancia del proyecto y confío en que encontrará motivación.' },
      { value: 'dirigir', label: 'Le explico que es parte de sus responsabilidades y debe hacerla.' },
      { value: 'apoyar', label: 'Exploro con él formas de hacer la tarea más interesante o significativa.' },
      { value: 'entrenar', label: 'Le muestro cómo la tarea se conecta con sus objetivos de desarrollo.' }
    ]
  },
  {
    id: 'sit19',
    text: 'El equipo debe alcanzar un objetivo de ventas muy agresivo. Tienen algo de experiencia, pero la presión es alta y la moral es baja. ¿Qué tipo de liderazgo aplicas?',
    options: [
      { value: 'apoyar', label: 'Me enfoco en motivar al equipo y facilitar la colaboración.' },
      { value: 'dirigir', label: 'Establezco un plan detallado y superviso el progreso diariamente.' },
      { value: 'delegar', label: 'Les doy total autonomía para que encuentren su propia estrategia.' },
      { value: 'entrenar', label: 'Proporciono coaching intensivo y celebro cada pequeño avance.' }
    ]
  },
  {
    id: 'sit20',
    text: 'Acabas de ser nombrado líder de un equipo de alto rendimiento que siempre ha trabajado de forma autónoma. ¿Cómo es tu primer mes?',
    options: [
      { value: 'entrenar', label: 'Establezco nuevos procesos y proporciono orientación sobre mis expectativas.' },
      { value: 'apoyar', label: 'Me enfoco en conocer al equipo y estar disponible cuando me necesiten.' },
      { value: 'dirigir', label: 'Establezco mi autoridad y nuevas reglas de operación.' },
      { value: 'delegar', label: 'Mantengo el status quo y les doy total autonomía.' }
    ]
  }
];

// ===== PREGUNTAS HOGAN =====

export const HOGAN_STYLE_QUESTIONS: Question[] = [
  {
    id: 'hogan1',
    text: 'Me frustro cuando las cosas no salen exactamente como las planeé.',
    options: [
      { value: '3', label: 'Ni de acuerdo ni en desacuerdo' },
      { value: '1', label: 'Totalmente en desacuerdo' },
      { value: '5', label: 'Totalmente de acuerdo' },
      { value: '2', label: 'En desacuerdo' },
      { value: '4', label: 'De acuerdo' }
    ]
  },
  {
    id: 'hogan2',
    text: 'Tiendo a ser el centro de atención en las reuniones.',
    options: [
      { value: '4', label: 'De acuerdo' },
      { value: '2', label: 'En desacuerdo' },
      { value: '1', label: 'Totalmente en desacuerdo' },
      { value: '5', label: 'Totalmente de acuerdo' },
      { value: '3', label: 'Ni de acuerdo ni en desacuerdo' }
    ]
  },
  {
    id: 'hogan3',
    text: 'A veces, mi deseo de complacer a los demás me impide tomar decisiones difíciles.',
    options: [
      { value: '1', label: 'Totalmente en desacuerdo' },
      { value: '3', label: 'Ni de acuerdo ni en desacuerdo' },
      { value: '4', label: 'De acuerdo' },
      { value: '5', label: 'Totalmente de acuerdo' },
      { value: '2', label: 'En desacuerdo' }
    ]
  },
  {
    id: 'hogan4',
    text: 'Prefiero seguir mi intuición y mi propio juicio antes que analizar datos de forma exhaustiva.',
    options: [
      { value: '5', label: 'Totalmente de acuerdo' },
      { value: '1', label: 'Totalmente en desacuerdo' },
      { value: '2', label: 'En desacuerdo' },
      { value: '4', label: 'De acuerdo' },
      { value: '3', label: 'Ni de acuerdo ni en desacuerdo' }
    ]
  },
  {
    id: 'hogan5',
    text: 'Soy muy crítico con el trabajo de los demás, busco la perfección.',
    options: [
      { value: '2', label: 'En desacuerdo' },
      { value: '4', label: 'De acuerdo' },
      { value: '3', label: 'Ni de acuerdo ni en desacuerdo' },
      { value: '1', label: 'Totalmente en desacuerdo' },
      { value: '5', label: 'Totalmente de acuerdo' }
    ]
  },
  {
    id: 'hogan6',
    text: 'Me cuesta confiar en los demás para que hagan el trabajo tan bien como yo.',
    options: [
      { value: '3', label: 'Ni de acuerdo ni en desacuerdo' },
      { value: '5', label: 'Totalmente de acuerdo' },
      { value: '1', label: 'Totalmente en desacuerdo' },
      { value: '4', label: 'De acuerdo' },
      { value: '2', label: 'En desacuerdo' }
    ]
  },
  {
    id: 'hogan7',
    text: 'Cuando estoy bajo presión, puedo parecer distante y poco comunicativo.',
    options: [
      { value: '4', label: 'De acuerdo' },
      { value: '1', label: 'Totalmente en desacuerdo' },
      { value: '5', label: 'Totalmente de acuerdo' },
      { value: '3', label: 'Ni de acuerdo ni en desacuerdo' },
      { value: '2', label: 'En desacuerdo' }
    ]
  },
  {
    id: 'hogan8',
    text: 'Disfruto tomando riesgos, incluso cuando otros son más cautelosos.',
    options: [
      { value: '2', label: 'En desacuerdo' },
      { value: '3', label: 'Ni de acuerdo ni en desacuerdo' },
      { value: '1', label: 'Totalmente en desacuerdo' },
      { value: '5', label: 'Totalmente de acuerdo' },
      { value: '4', label: 'De acuerdo' }
    ]
  },
  {
    id: 'hogan9',
    text: 'Me siento más cómodo cuando sigo rutinas y procedimientos establecidos.',
    options: [
      { value: '5', label: 'Totalmente de acuerdo' },
      { value: '2', label: 'En desacuerdo' },
      { value: '4', label: 'De acuerdo' },
      { value: '1', label: 'Totalmente en desacuerdo' },
      { value: '3', label: 'Ni de acuerdo ni en desacuerdo' }
    ]
  },
  {
    id: 'hogan10',
    text: 'A veces, mi confianza en mí mismo puede ser interpretada como arrogancia.',
    options: [
      { value: '1', label: 'Totalmente en desacuerdo' },
      { value: '4', label: 'De acuerdo' },
      { value: '3', label: 'Ni de acuerdo ni en desacuerdo' },
      { value: '2', label: 'En desacuerdo' },
      { value: '5', label: 'Totalmente de acuerdo' }
    ]
  },
  {
    id: 'hogan11',
    text: 'Me esfuerzo mucho por mantener la armonía en el equipo, incluso si eso significa evitar conflictos necesarios.',
    options: [
      { value: '3', label: 'Ni de acuerdo ni en desacuerdo' },
      { value: '1', label: 'Totalmente en desacuerdo' },
      { value: '5', label: 'Totalmente de acuerdo' },
      { value: '4', label: 'De acuerdo' },
      { value: '2', label: 'En desacuerdo' }
    ]
  },
  {
    id: 'hogan12',
    text: 'Puedo ser escéptico y cuestionar las motivaciones de los demás.',
    options: [
      { value: '2', label: 'En desacuerdo' },
      { value: '5', label: 'Totalmente de acuerdo' },
      { value: '4', label: 'De acuerdo' },
      { value: '3', label: 'Ni de acuerdo ni en desacuerdo' },
      { value: '1', label: 'Totalmente en desacuerdo' }
    ]
  },
  {
    id: 'hogan13',
    text: 'Me gusta mantener un control estricto sobre los proyectos en los que estoy involucrado.',
    options: [
      { value: '4', label: 'De acuerdo' },
      { value: '1', label: 'Totalmente en desacuerdo' },
      { value: '2', label: 'En desacuerdo' },
      { value: '5', label: 'Totalmente de acuerdo' },
      { value: '3', label: 'Ni de acuerdo ni en desacuerdo' }
    ]
  },
  {
    id: 'hogan14',
    text: 'A veces prometo más de lo que puedo cumplir para mantener a la gente entusiasmada.',
    options: [
      { value: '3', label: 'Ni de acuerdo ni en desacuerdo' },
      { value: '5', label: 'Totalmente de acuerdo' },
      { value: '2', label: 'En desacuerdo' },
      { value: '1', label: 'Totalmente en desacuerdo' },
      { value: '4', label: 'De acuerdo' }
    ]
  },
  {
    id: 'hogan15',
    text: 'Me enfoco tanto en los detalles que a veces puedo perder de vista el panorama general.',
    options: [
      { value: '1', label: 'Totalmente en desacuerdo' },
      { value: '4', label: 'De acuerdo' },
      { value: '5', label: 'Totalmente de acuerdo' },
      { value: '3', label: 'Ni de acuerdo ni en desacuerdo' },
      { value: '2', label: 'En desacuerdo' }
    ]
  },
  {
    id: 'hogan16',
    text: 'Soy muy directo en mi comunicación, lo que a veces puede ofender a la gente sensible.',
    options: [
      { value: '2', label: 'En desacuerdo' },
      { value: '3', label: 'Ni de acuerdo ni en desacuerdo' },
      { value: '1', label: 'Totalmente en desacuerdo' },
      { value: '5', label: 'Totalmente de acuerdo' },
      { value: '4', label: 'De acuerdo' }
    ]
  },
  {
    id: 'hogan17',
    text: 'Me cuesta decir "no" a las peticiones de mis superiores.',
    options: [
      { value: '5', label: 'Totalmente de acuerdo' },
      { value: '1', label: 'Totalmente en desacuerdo' },
      { value: '3', label: 'Ni de acuerdo ni en desacuerdo' },
      { value: '2', label: 'En desacuerdo' },
      { value: '4', label: 'De acuerdo' }
    ]
  },
  {
    id: 'hogan18',
    text: 'Pienso que las reglas están para romperse si con eso se consiguen mejores resultados.',
    options: [
      { value: '4', label: 'De acuerdo' },
      { value: '2', label: 'En desacuerdo' },
      { value: '5', label: 'Totalmente de acuerdo' },
      { value: '1', label: 'Totalmente en desacuerdo' },
      { value: '3', label: 'Ni de acuerdo ni en desacuerdo' }
    ]
  },
  {
    id: 'hogan19',
    text: 'Soy cauteloso a la hora de tomar decisiones importantes, a veces demasiado.',
    options: [
      { value: '3', label: 'Ni de acuerdo ni en desacuerdo' },
      { value: '4', label: 'De acuerdo' },
      { value: '1', label: 'Totalmente en desacuerdo' },
      { value: '5', label: 'Totalmente de acuerdo' },
      { value: '2', label: 'En desacuerdo' }
    ]
  },
  {
    id: 'hogan20',
    text: 'Cuando un proyecto me apasiona, puedo presionar al equipo de manera muy intensa.',
    options: [
      { value: '2', label: 'En desacuerdo' },
      { value: '1', label: 'Totalmente en desacuerdo' },
      { value: '4', label: 'De acuerdo' },
      { value: '5', label: 'Totalmente de acuerdo' },
      { value: '3', label: 'Ni de acuerdo ni en desacuerdo' }
    ]
  }
];

// ===== PREGUNTAS DISC =====

export const DISC_QUESTIONS: Question[] = [
  {
    id: 'disc1',
    text: 'En cada grupo de cuatro opciones, elige una que te describa MÁS y una que te describa MENOS.',
    options: [
      { value: 'adaptable', label: 'Adaptable' },
      { value: 'aventurero', label: 'Aventurero' },
      { value: 'analitico', label: 'Analítico' },
      { value: 'animado', label: 'Animado' }
    ]
  },
  {
    id: 'disc2',
    text: 'En cada grupo de cuatro opciones, elige una que te describa MÁS y una que te describa MENOS.',
    options: [
      { value: 'preciso', label: 'Preciso' },
      { value: 'decisivo', label: 'Decisivo' },
      { value: 'paciente', label: 'Paciente' },
      { value: 'convincente', label: 'Convincente' }
    ]
  },
  {
    id: 'disc3',
    text: 'En cada grupo de cuatro opciones, elige una que te describa MÁS y una que te describa MENOS.',
    options: [
      { value: 'sistematico', label: 'Sistemático' },
      { value: 'exigente', label: 'Exigente' },
      { value: 'tranquilo', label: 'Tranquilo' },
      { value: 'entusiasta', label: 'Entusiasta' }
    ]
  },
  {
    id: 'disc4',
    text: 'En cada grupo de cuatro opciones, elige una que te describa MÁS y una que te describa MENOS.',
    options: [
      { value: 'estable', label: 'Estable' },
      { value: 'directo', label: 'Directo' },
      { value: 'cuidadoso', label: 'Cuidadoso' },
      { value: 'sociable', label: 'Sociable' }
    ]
  },
  {
    id: 'disc5',
    text: 'En cada grupo de cuatro opciones, elige una que te describa MÁS y una que te describa MENOS.',
    options: [
      { value: 'comunicativo', label: 'Comunicativo' },
      { value: 'cauteloso', label: 'Cauteloso' },
      { value: 'competitivo', label: 'Competitivo' },
      { value: 'cooperador', label: 'Cooperador' }
    ]
  },
  {
    id: 'disc6',
    text: 'En cada grupo de cuatro opciones, elige una que te describa MÁS y una que te describa MENOS.',
    options: [
      { value: 'detallista', label: 'Detallista' },
      { value: 'orientado_resultados', label: 'Orientado a resultados' },
      { value: 'leal', label: 'Leal' },
      { value: 'inspirador', label: 'Inspirador' }
    ]
  },
  {
    id: 'disc7',
    text: 'En cada grupo de cuatro opciones, elige una que te describa MÁS y una que te describa MENOS.',
    options: [
      { value: 'correcto', label: 'Correcto' },
      { value: 'audaz', label: 'Audaz' },
      { value: 'predecible', label: 'Predecible' },
      { value: 'optimista', label: 'Optimista' }
    ]
  },
  {
    id: 'disc8',
    text: 'En cada grupo de cuatro opciones, elige una que te describa MÁS y una que te describa MENOS.',
    options: [
      { value: 'perfeccionista', label: 'Perfeccionista' },
      { value: 'asertivo', label: 'Asertivo' },
      { value: 'servicial', label: 'Servicial' },
      { value: 'carismatico', label: 'Carismático' }
    ]
  },
  {
    id: 'disc9',
    text: 'En cada grupo de cuatro opciones, elige una que te describa MÁS y una que te describa MENOS.',
    options: [
      { value: 'logico', label: 'Lógico' },
      { value: 'independiente', label: 'Independiente' },
      { value: 'amable', label: 'Amable' },
      { value: 'influyente', label: 'Influyente' }
    ]
  },
  {
    id: 'disc10',
    text: 'En cada grupo de cuatro opciones, elige una que te describa MÁS y una que te describa MENOS.',
    options: [
      { value: 'escucha_activamente', label: 'Escucha activamente' },
      { value: 'toma_control', label: 'Toma el control' },
      { value: 'sigue_reglas', label: 'Sigue las reglas' },
      { value: 'genera_entusiasmo', label: 'Genera entusiasmo' }
    ]
  },
  {
    id: 'disc11',
    text: 'En cada grupo de cuatro opciones, elige una que te describa MÁS y una que te describa MENOS.',
    options: [
      { value: 'reservado', label: 'Reservado' },
      { value: 'valiente', label: 'Valiente' },
      { value: 'moderado', label: 'Moderado' },
      { value: 'jugueton', label: 'Juguetón' }
    ]
  },
  {
    id: 'disc12',
    text: 'En cada grupo de cuatro opciones, elige una que te describa MÁS y una que te describa MENOS.',
    options: [
      { value: 'diplomatico', label: 'Diplomático' },
      { value: 'resuelto', label: 'Resuelto' },
      { value: 'metodico', label: 'Metódico' },
      { value: 'impulsivo', label: 'Impulsivo' }
    ]
  },
  {
    id: 'disc13',
    text: 'En cada grupo de cuatro opciones, elige una que te describa MÁS y una que te describa MENOS.',
    options: [
      { value: 'investigador', label: 'Investigador' },
      { value: 'emprendedor', label: 'Emprendedor' },
      { value: 'amigable', label: 'Amigable' },
      { value: 'confiado', label: 'Confiado' }
    ]
  },
  {
    id: 'disc14',
    text: 'En cada grupo de cuatro opciones, elige una que te describa MÁS y una que te describa MENOS.',
    options: [
      { value: 'organizado', label: 'Organizado' },
      { value: 'rapido', label: 'Rápido' },
      { value: 'calmado', label: 'Calmado' },
      { value: 'animado', label: 'Animado' }
    ]
  },
  {
    id: 'disc15',
    text: 'En cada grupo de cuatro opciones, elige una que te describa MÁS y una que te describa MENOS.',
    options: [
      { value: 'exacto', label: 'Exacto' },
      { value: 'firme', label: 'Firme' },
      { value: 'constante', label: 'Constante' },
      { value: 'abierto', label: 'Abierto' }
    ]
  },
  {
    id: 'disc16',
    text: 'En cada grupo de cuatro opciones, elige una que te describa MÁS y una que te describa MENOS.',
    options: [
      { value: 'disciplinado', label: 'Disciplinado' },
      { value: 'seguro_si_mismo', label: 'Seguro de sí mismo' },
      { value: 'fiable', label: 'Fiable' },
      { value: 'generoso', label: 'Generoso' }
    ]
  },
  {
    id: 'disc17',
    text: 'En cada grupo de cuatro opciones, elige una que te describa MÁS y una que te describa MENOS.',
    options: [
      { value: 'critico', label: 'Crítico' },
      { value: 'obstinado', label: 'Obstinado' },
      { value: 'posesivo', label: 'Posesivo' },
      { value: 'emocional', label: 'Emocional' }
    ]
  },
  {
    id: 'disc18',
    text: 'En cada grupo de cuatro opciones, elige una que te describa MÁS y una que te describa MENOS.',
    options: [
      { value: 'prudente', label: 'Prudente' },
      { value: 'dominante', label: 'Dominante' },
      { value: 'gentil', label: 'Gentil' },
      { value: 'popular', label: 'Popular' }
    ]
  },
  {
    id: 'disc19',
    text: 'En cada grupo de cuatro opciones, elige una que te describa MÁS y una que te describa MENOS.',
    options: [
      { value: 'formal', label: 'Formal' },
      { value: 'ambicioso', label: 'Ambicioso' },
      { value: 'pacifista', label: 'Pacifista' },
      { value: 'espontaneo', label: 'Espontáneo' }
    ]
  },
  {
    id: 'disc20',
    text: 'En cada grupo de cuatro opciones, elige una que te describa MÁS y una que te describa MENOS.',
    options: [
      { value: 'racional', label: 'Racional' },
      { value: 'energico', label: 'Enérgico' },
      { value: 'timido', label: 'Tímido' },
      { value: 'alegre', label: 'Alegre' }
    ]
  }
];

// ===== PREGUNTAS COGNITIVAS =====

export const COGNITIVE_TEST_QUESTIONS: Question[] = [
  {
    id: 'cog1',
    text: '¿Qué número sigue en la serie: 3, 6, 11, 18, 27, ...?',
    options: [
      { value: '42', label: '42' },
      { value: '38', label: '38' },
      { value: '35', label: '35' },
      { value: '40', label: '40' }
    ]
  },
  {
    id: 'cog2',
    text: '"Barco" es a "mar" como "avión" es a...',
    options: [
      { value: 'cielo', label: 'Cielo' },
      { value: 'aire', label: 'Aire' },
      { value: 'nubes', label: 'Nubes' },
      { value: 'aeropuerto', label: 'Aeropuerto' }
    ]
  },
  {
    id: 'cog3',
    text: 'Si reordenas las letras "L A P I S T A", obtienes el nombre de un...',
    options: [
      { value: 'animal', label: 'Animal' },
      { value: 'pais', label: 'País' },
      { value: 'objeto', label: 'Objeto' },
      { value: 'color', label: 'Color' }
    ]
  },
  {
    id: 'cog4',
    text: 'Juan tiene 4 años más que María, y María tiene 2 años menos que Pedro. Si Pedro tiene 10 años, ¿cuántos tiene Juan?',
    options: [
      { value: '14', label: '14' },
      { value: '12', label: '12' },
      { value: '10', label: '10' },
      { value: '16', label: '16' }
    ]
  },
  {
    id: 'cog5',
    text: '¿Qué figura completa la secuencia?',
    options: [
      { value: 'circulo', label: 'Círculo' },
      { value: 'triangulo', label: 'Triángulo' },
      { value: 'cuadrado', label: 'Cuadrado' },
      { value: 'hexagono', label: 'Hexágono' }
    ]
  },
  {
    id: 'cog6',
    text: '"Optimista" es lo opuesto a...',
    options: [
      { value: 'realista', label: 'Realista' },
      { value: 'pesimista', label: 'Pesimista' },
      { value: 'negativo', label: 'Negativo' },
      { value: 'triste', label: 'Triste' }
    ]
  },
  {
    id: 'cog7',
    text: 'Si 5 impresoras imprimen 500 páginas en 5 minutos, ¿cuánto tardaría 1 impresora en imprimir 100 páginas?',
    options: [
      { value: '2_minutos', label: '2 minutos' },
      { value: '1_minuto', label: '1 minuto' },
      { value: '5_minutos', label: '5 minutos' },
      { value: '10_minutos', label: '10 minutos' }
    ]
  },
  {
    id: 'cog8',
    text: 'Todos los gerentes de esta empresa tienen un título universitario. Sofía es gerente en esta empresa. Por lo tanto, Sofía...',
    options: [
      { value: 'es_inteligente', label: 'Es inteligente' },
      { value: 'tiene_titulo', label: 'Tiene un título universitario' },
      { value: 'es_exitosa', label: 'Es exitosa' },
      { value: 'gana_bien', label: 'Gana bien' }
    ]
  },
  {
    id: 'cog9',
    text: '¿Qué palabra no pertenece al grupo: Manzana, Plátano, Fresa, Patata?',
    options: [
      { value: 'manzana', label: 'Manzana' },
      { value: 'fresa', label: 'Fresa' },
      { value: 'patata', label: 'Patata' },
      { value: 'platano', label: 'Plátano' }
    ]
  },
  {
    id: 'cog10',
    text: 'Un producto cuesta $120 después de un descuento del 20%. ¿Cuál era el precio original?',
    options: [
      { value: '140', label: '$140' },
      { value: '150', label: '$150' },
      { value: '160', label: '$160' },
      { value: '144', label: '$144' }
    ]
  },
  {
    id: 'cog11',
    text: 'Encuentra la analogía: "Martillo" es a "Clavo" como "Destornillador" es a...',
    options: [
      { value: 'tuerca', label: 'Tuerca' },
      { value: 'tornillo', label: 'Tornillo' },
      { value: 'herramienta', label: 'Herramienta' },
      { value: 'madera', label: 'Madera' }
    ]
  },
  {
    id: 'cog12',
    text: 'Continúa el patrón: A1, B2, C3, ...',
    options: [
      { value: 'E5', label: 'E5' },
      { value: 'D4', label: 'D4' },
      { value: 'F6', label: 'F6' },
      { value: 'D5', label: 'D5' }
    ]
  },
  {
    id: 'cog13',
    text: 'Si un coche viaja a 60 km/h, ¿qué distancia recorrerá en 90 minutos?',
    options: [
      { value: '90_km', label: '90 km' },
      { value: '120_km', label: '120 km' },
      { value: '80_km', label: '80 km' },
      { value: '100_km', label: '100 km' }
    ]
  },
  {
    id: 'cog14',
    text: '¿Qué viene después? Círculo, Triángulo, Cuadrado, ...',
    options: [
      { value: 'hexagono', label: 'Hexágono' },
      { value: 'pentagono', label: 'Pentágono' },
      { value: 'octogono', label: 'Octógono' },
      { value: 'rombo', label: 'Rombo' }
    ]
  },
  {
    id: 'cog15',
    text: '"Persuadir" es sinónimo de...',
    options: [
      { value: 'obligar', label: 'Obligar' },
      { value: 'convencer', label: 'Convencer' },
      { value: 'mentir', label: 'Mentir' },
      { value: 'engañar', label: 'Engañar' }
    ]
  },
  {
    id: 'cog16',
    text: 'Un equipo de 6 personas construye un muro en 4 días. ¿Cuántas personas se necesitarían para construir el mismo muro en 3 días?',
    options: [
      { value: '9', label: '9' },
      { value: '8', label: '8' },
      { value: '7', label: '7' },
      { value: '10', label: '10' }
    ]
  },
  {
    id: 'cog17',
    text: 'Si el día de mañana fuera ayer, hoy sería viernes. ¿Qué día es hoy realmente?',
    options: [
      { value: 'domingo', label: 'Domingo' },
      { value: 'sabado', label: 'Sábado' },
      { value: 'lunes', label: 'Lunes' },
      { value: 'jueves', label: 'Jueves' }
    ]
  },
  {
    id: 'cog18',
    text: '¿Cuántos cubos hay en la figura?',
    options: [
      { value: '24', label: '24' },
      { value: '27', label: '27' },
      { value: '30', label: '30' },
      { value: '25', label: '25' }
    ]
  },
  {
    id: 'cog19',
    text: '"Efímero" significa...',
    options: [
      { value: 'eterno', label: 'Eterno' },
      { value: 'temporal', label: 'Temporal' },
      { value: 'grande', label: 'Grande' },
      { value: 'pequeño', label: 'Pequeño' }
    ]
  },
  {
    id: 'cog20',
    text: 'El costo de un artículo aumenta un 10% y luego disminuye un 10%. ¿El precio final es mayor, menor o igual al original?',
    options: [
      { value: 'igual', label: 'Igual' },
      { value: 'menor', label: 'Menor' },
      { value: 'mayor', label: 'Mayor' },
      { value: 'depende', label: 'Depende del precio original' }
    ]
  }
];

// ===== DILEMAS ÉTICOS =====

export const ETHICAL_DILEMMAS: EthicalDilemma[] = [
  {
    id: 'eth1',
    title: 'Dilema de Lealtad vs. Integridad',
    scenario: 'Descubres que un colega cercano ha estado usando la tarjeta de crédito de la empresa para pequeños gastos personales.',
    options: [
      'Reportar inmediatamente a Recursos Humanos',
      'Hablar primero con el colega para que se autorreporten',
      'Ignorar la situación ya que son gastos menores',
      'Buscar orientación de un supervisor de confianza'
    ]
  },
  {
    id: 'eth2',
    title: 'Conflicto de Intereses',
    scenario: 'Un cliente importante te ofrece un regalo caro como agradecimiento por un proyecto exitoso. La política de la empresa es ambigua al respecto.',
    options: [
      'Aceptar el regalo ya que fue bien ganado',
      'Rechazar cortésmente el regalo',
      'Consultar con Recursos Humanos antes de decidir',
      'Aceptar pero reportar el regalo a la empresa'
    ]
  },
  {
    id: 'eth3',
    title: 'Transparencia vs. Imagen Personal',
    scenario: 'Te das cuenta de que un informe que presentaste a la dirección contiene un error significativo que te hace quedar bien.',
    options: [
      'Corregir inmediatamente el error y notificar a todos los afectados',
      'Corregir discretamente en futuras versiones',
      'Mantener el error ya que nadie más lo ha notado',
      'Mencionar casualmente la corrección en la próxima reunión'
    ]
  },
  {
    id: 'eth4',
    title: 'Presión de Autoridad',
    scenario: 'Tu jefe te pide que "maquilles" ligeramente los números de un reporte para que el departamento se vea mejor.',
    options: [
      'Rechazar directamente la solicitud',
      'Proponer alternativas para mejorar la presentación sin alterar datos',
      'Cumplir la solicitud para mantener buena relación',
      'Buscar una segunda opinión de otro supervisor'
    ]
  },
  {
    id: 'eth5',
    title: 'Confidencialidad vs. Lealtad',
    scenario: 'Un miembro de tu equipo te confiesa que está buscando trabajo en la competencia.',
    options: [
      'Reportar inmediatamente a Recursos Humanos',
      'Mantener la confidencialidad pero monitorear su trabajo',
      'Intentar convencerlo de que se quede',
      'Apoyar su búsqueda pero proteger información sensible'
    ]
  },
  {
    id: 'eth6',
    title: 'Equidad Salarial',
    scenario: 'Tienes acceso a información confidencial de salarios y ves que ganas menos que un colega con menos experiencia y responsabilidades.',
    options: [
      'Confrontar directamente a tu jefe sobre la inequidad',
      'Buscar otra oportunidad laboral sin mencionar el tema',
      'Solicitar una reunión formal para discutir tu compensación',
      'Ignorar la información ya que es confidencial'
    ]
  },
  {
    id: 'eth7',
    title: 'Corrupción en Procesos',
    scenario: 'Un proveedor te ofrece una comisión personal si lo eliges para un contrato importante.',
    options: [
      'Rechazar inmediatamente y reportar el intento de soborno',
      'Rechazar pero mantener al proveedor en consideración',
      'Aceptar la comisión ya que no afecta tu juicio profesional',
      'Negociar que la comisión vaya a la empresa en lugar de a ti'
    ]
  },
  {
    id: 'eth8',
    title: 'Información Privilegiada',
    scenario: 'Durante una entrevista de trabajo, un candidato revela información confidencial de su empresa actual.',
    options: [
      'Detener la entrevista y explicar que no puede compartir esa información',
      'Escuchar pero no usar la información en tu evaluación',
      'Aprovechar la información para beneficio de tu empresa',
      'Continuar la entrevista normalmente'
    ]
  },
  {
    id: 'eth9',
    title: 'Calidad vs. Plazos',
    scenario: 'Sabes que un producto que está a punto de lanzarse tiene un pequeño defecto que no afecta la seguridad, pero podría decepcionar a los clientes.',
    options: [
      'Retrasar el lanzamiento hasta corregir el defecto',
      'Lanzar con el defecto pero ofrecer actualizaciones gratuitas',
      'Lanzar normalmente ya que no afecta la seguridad',
      'Informar a los clientes sobre el defecto menor antes del lanzamiento'
    ]
  },
  {
    id: 'eth10',
    title: 'Rumores y Chismes',
    scenario: 'Un compañero de trabajo está difundiendo un rumor falso y dañino sobre otro miembro del equipo.',
    options: [
      'Confrontar directamente al que difunde el rumor',
      'Informar a la persona afectada sobre el rumor',
      'Reportar la situación a Recursos Humanos',
      'Intentar corregir el rumor cuando lo escuches'
    ]
  },
  {
    id: 'eth11',
    title: 'Competencia vs. Honestidad',
    scenario: 'Te piden que lideres un proyecto para el que no te sientes completamente cualificado.',
    options: [
      'Aceptar y aprender sobre la marcha',
      'Declinar honestamente explicando tus limitaciones',
      'Aceptar pero buscar ayuda externa sin informarlo',
      'Aceptar y formar un equipo que complemente tus debilidades'
    ]
  },
  {
    id: 'eth12',
    title: 'Nepotismo vs. Meritocracia',
    scenario: 'Un amigo te pide que recomiendes a su primo para un puesto en tu equipo, pero sabes que no es el mejor candidato.',
    options: [
      'Rechazar la recomendación explicando tus criterios',
      'Hacer la recomendación pero ser honesto sobre las limitaciones',
      'Recomendar al primo para mantener la amistad',
      'Sugerir otros puestos donde el primo podría ser más adecuado'
    ]
  },
  {
    id: 'eth13',
    title: 'Información Privilegiada vs. Lealtad',
    scenario: 'La empresa está implementando un nuevo sistema que automatizará el trabajo de varios de tus compañeros. Tú lo sabes antes que ellos.',
    options: [
      'Mantener la confidencialidad hasta el anuncio oficial',
      'Advertir discretamente a los afectados',
      'Sugerir a la dirección que comunique pronto',
      'Ayudar a los afectados a prepararse sin revelar información específica'
    ]
  },
  {
    id: 'eth14',
    title: 'Autoridad vs. Integridad',
    scenario: 'Ves a tu jefe llevándose a casa material de oficina en grandes cantidades.',
    options: [
      'Confrontar directamente a tu jefe',
      'Reportar anónimamente a una línea ética',
      'Ignorar la situación para evitar conflictos',
      'Documentar los incidentes antes de tomar acción'
    ]
  },
  {
    id: 'eth15',
    title: 'Servicio al Cliente vs. Honestidad',
    scenario: 'Un cliente te miente sobre un problema para intentar obtener un reembolso que no le corresponde.',
    options: [
      'Denegar el reembolso explicando las políticas',
      'Otorgar el reembolso para mantener la relación',
      'Investigar más a fondo antes de decidir',
      'Ofrecer una solución alternativa que beneficie a ambas partes'
    ]
  },
  {
    id: 'eth16',
    title: 'Calidad vs. Presión de Tiempo',
    scenario: 'Para cumplir un plazo, te das cuenta de que tendrías que saltarte un paso importante del control de calidad.',
    options: [
      'Cumplir el plazo saltándose el control de calidad',
      'Retrasar la entrega para mantener la calidad',
      'Buscar una extensión del plazo explicando la situación',
      'Implementar un control de calidad reducido pero funcional'
    ]
  },
  {
    id: 'eth17',
    title: 'Diversidad e Inclusión',
    scenario: 'Un miembro del equipo, que es de un grupo minoritario, hace un comentario que podría ser interpretado como ofensivo, pero nadie más parece haberlo notado.',
    options: [
      'Abordar el tema privadamente con la persona',
      'Ignorar el comentario ya que nadie más reaccionó',
      'Hacer un comentario general sobre respeto en el equipo',
      'Reportar el incidente a Recursos Humanos'
    ]
  },
  {
    id: 'eth18',
    title: 'Responsabilidad Interdepartamental',
    scenario: 'Eres testigo de que un gerente de otro departamento acosa verbalmente a un miembro de su equipo.',
    options: [
      'Intervenir inmediatamente en la situación',
      'Reportar el incidente a Recursos Humanos',
      'Hablar privadamente con la víctima para ofrecer apoyo',
      'Documentar el incidente y buscar orientación'
    ]
  },
  {
    id: 'eth19',
    title: 'Sostenibilidad vs. Costos',
    scenario: 'La empresa promueve una iniciativa de sostenibilidad, pero descubres que un departamento está incumpliendo las normas para ahorrar costos.',
    options: [
      'Reportar inmediatamente el incumplimiento',
      'Hablar con el departamento para entender sus razones',
      'Proponer soluciones que balanceen sostenibilidad y costos',
      'Ignorar la situación ya que no es tu departamento'
    ]
  },
  {
    id: 'eth20',
    title: 'Ventaja Competitiva vs. Fair Play',
    scenario: 'Te enteras de que un competidor está a punto de quebrar, una información que podrías usar para ganar una gran cuenta.',
    options: [
      'Usar la información para ganar la cuenta',
      'No usar la información y competir normalmente',
      'Informar al cliente sobre la situación del competidor',
      'Verificar la información antes de tomar cualquier acción'
    ]
  }
];

// ===== LÓGICA DE SCORING =====

// Liderazgo Situacional - Clave de respuestas correctas
export const SITUATIONAL_SCORING_KEY: Record<string, string> = {
  'sit1': 'dirigir',    // M1 - Nuevo entusiasta
  'sit2': 'apoyar',     // M3 - Experto inseguro
  'sit3': 'apoyar',     // M3 - Equipo hábil pero desmotivado
  'sit4': 'delegar',    // M4 - Experto autónomo
  'sit5': 'entrenar',   // M2 - Algo de habilidad pero frustrado
  'sit6': 'apoyar',     // M3 - Capaz pero inseguro
  'sit7': 'dirigir',    // M1 - Crisis requiere control inmediato
  'sit8': 'entrenar',   // M2 - Junior con algo de experiencia
  'sit9': 'apoyar',     // M3 - Expertos que necesitan colaborar
  'sit10': 'entrenar',  // M2 - Hábil pero desmotivado
  'sit11': 'dirigir',   // M1 - Nuevo abrumado
  'sit12': 'delegar',   // M4 - Senior con idea propia
  'sit13': 'apoyar',    // M3 - Competentes pero estancados
  'sit14': 'apoyar',    // M3 - Experto con problema temporal
  'sit15': 'apoyar',    // M3 - Competentes pero resistentes
  'sit16': 'entrenar',  // M2 - Básico pero exceso de confianza
  'sit17': 'delegar',   // M4 - Ejecutando perfectamente
  'sit18': 'apoyar',    // M3 - Capaz pero desmotivado
  'sit19': 'entrenar',  // M2 - Experiencia pero presión alta
  'sit20': 'delegar'    // M4 - Equipo de alto rendimiento autónomo
};

// Hogan - Escalas de riesgo
export const HOGAN_RISK_SCALES: Record<string, string[]> = {
  'Diligente': ['hogan5', 'hogan15'],           // Perfeccionismo paralizante
  'Audaz': ['hogan10', 'hogan18'],              // Arrogancia, no escuchar
  'Complaciente': ['hogan3', 'hogan11', 'hogan17'], // Evitar conflictos
  'Escéptico': ['hogan12'],                     // Desconfianza excesiva
  'Controlador': ['hogan6', 'hogan13'],         // Micromanagement
  'Reservado': ['hogan7'],                      // Falta de comunicación
  'Impulsivo': ['hogan8', 'hogan14'],           // Decisiones apresuradas
  'Cauteloso': ['hogan9', 'hogan19'],           // Aversión al riesgo
  'Directo': ['hogan16'],                       // Comunicación brusca
  'Intenso': ['hogan1', 'hogan20']              // Presión excesiva
};

// DISC - Mapeo de palabras a factores
export const DISC_WORD_MAPPING: Record<string, string> = {
  // Factor D (Dominancia)
  'aventurero': 'D', 'decisivo': 'D', 'exigente': 'D', 'directo': 'D', 'competitivo': 'D',
  'orientado_resultados': 'D', 'audaz': 'D', 'asertivo': 'D', 'independiente': 'D',
  'toma_control': 'D', 'valiente': 'D', 'resuelto': 'D', 'emprendedor': 'D', 'rapido': 'D',
  'firme': 'D', 'seguro_si_mismo': 'D', 'obstinado': 'D', 'dominante': 'D', 'ambicioso': 'D',
  'energico': 'D',

  // Factor I (Influencia)
  'animado': 'I', 'convincente': 'I', 'entusiasta': 'I', 'sociable': 'I', 'comunicativo': 'I',
  'inspirador': 'I', 'optimista': 'I', 'carismatico': 'I', 'influyente': 'I',
  'genera_entusiasmo': 'I', 'jugueton': 'I', 'impulsivo': 'I', 'confiado': 'I',
  'animado': 'I', 'abierto': 'I', 'generoso': 'I', 'emocional': 'I', 'popular': 'I',
  'espontaneo': 'I', 'alegre': 'I',

  // Factor S (Estabilidad)
  'adaptable': 'S', 'paciente': 'S', 'tranquilo': 'S', 'estable': 'S', 'cooperador': 'S',
  'leal': 'S', 'predecible': 'S', 'servicial': 'S', 'amable': 'S', 'escucha_activamente': 'S',
  'moderado': 'S', 'metodico': 'S', 'amigable': 'S', 'calmado': 'S', 'constante': 'S',
  'fiable': 'S', 'posesivo': 'S', 'gentil': 'S', 'pacifista': 'S', 'timido': 'S',

  // Factor C (Conformidad)
  'analitico': 'C', 'preciso': 'C', 'sistematico': 'C', 'cuidadoso': 'C', 'cauteloso': 'C',
  'detallista': 'C', 'correcto': 'C', 'perfeccionista': 'C', 'logico': 'C', 'sigue_reglas': 'C',
  'reservado': 'C', 'diplomatico': 'C', 'investigador': 'C', 'organizado': 'C', 'exacto': 'C',
  'disciplinado': 'C', 'critico': 'C', 'prudente': 'C', 'formal': 'C', 'racional': 'C'
};

// Cognitivo - Respuestas correctas
export const COGNITIVE_ANSWER_KEY: Record<string, string> = {
  'cog1': '38',           // Serie: +3, +5, +7, +9, +11
  'cog2': 'aire',         // Analogía de medio de transporte
  'cog3': 'pais',         // LAPISTA = PALISTA (anagrama)
  'cog4': '12',           // Juan = María + 4, María = Pedro - 2, Pedro = 10, entonces Juan = 12
  'cog5': 'triangulo',    // Secuencia de figuras geométricas
  'cog6': 'pesimista',    // Antónimo directo
  'cog7': '1_minuto',     // 5 impresoras = 500 páginas en 5 min, 1 impresora = 100 páginas en 1 min
  'cog8': 'tiene_titulo', // Lógica deductiva
  'cog9': 'patata',       // Única que no es fruta
  'cog10': '150',         // 120 = 80% del original, entonces original = 150
  'cog11': 'tornillo',    // Analogía de herramienta-objeto
  'cog12': 'D4',          // Patrón alfabético-numérico
  'cog13': '90_km',       // 60 km/h × 1.5 h = 90 km
  'cog14': 'pentagono',   // Secuencia por número de lados: 0, 3, 4, 5
  'cog15': 'convencer',   // Sinónimo más cercano
  'cog16': '8',           // Regla de tres: 6×4 = 24 persona-días, 24÷3 = 8 personas
  'cog17': 'sabado',      // Lógica temporal
  'cog18': '27',          // Cubo 3×3×3
  'cog19': 'temporal',    // Definición de efímero
  'cog20': 'menor'        // 1.10 × 0.90 = 0.99 (menor que 1)
};

// Ético - Códigos de comportamiento
export const ETHICAL_BEHAVIOR_CODES: Record<string, { integrity: number; risk: string[] }> = {
  // Códigos de integridad: +2 = Alta, +1 = Media, 0 = Neutral, -1 = Baja, -2 = Muy Baja
  // Códigos de riesgo: etiquetas de comportamiento
  'report_immediately': { integrity: 2, risk: ['Alta Integridad', 'Cumplimiento'] },
  'confront_directly': { integrity: 1, risk: ['Confrontación', 'Transparencia'] },
  'ignore_situation': { integrity: -2, risk: ['Evasión', 'Complicidad'] },
  'seek_guidance': { integrity: 1, risk: ['Prudencia', 'Consulta'] },
  'document_evidence': { integrity: 2, risk: ['Diligencia', 'Protección Legal'] },
  'warn_colleague': { integrity: 0, risk: ['Lealtad Personal', 'Riesgo Compartido'] }
};

// Función para calcular score de liderazgo situacional
export const calculateSituationalScore = (answers: AnswerSet): {
  totalScore: number;
  percentage: number;
  styleDistribution: Record<string, number>;
  flexibilityIndex: number;
} => {
  let correctAnswers = 0;
  const styleCount = { dirigir: 0, entrenar: 0, apoyar: 0, delegar: 0 };

  Object.entries(answers).forEach(([questionId, answer]) => {
    if (SITUATIONAL_SCORING_KEY[questionId] === answer) {
      correctAnswers++;
    }
    if (styleCount.hasOwnProperty(answer)) {
      styleCount[answer as keyof typeof styleCount]++;
    }
  });

  const totalQuestions = Object.keys(SITUATIONAL_SCORING_KEY).length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  
  // Calcular índice de flexibilidad (qué tan balanceado está entre los 4 estilos)
  const styleValues = Object.values(styleCount);
  const maxStyle = Math.max(...styleValues);
  const minStyle = Math.min(...styleValues);
  const flexibilityIndex = Math.round(((4 - (maxStyle - minStyle)) / 4) * 100);

  return {
    totalScore: correctAnswers,
    percentage,
    styleDistribution: styleCount,
    flexibilityIndex
  };
};

// Función para calcular scores Hogan
export const calculateHoganScores = (answers: AnswerSet): Record<string, number> => {
  const scaleScores: Record<string, number[]> = {};

  Object.entries(HOGAN_RISK_SCALES).forEach(([scale, questionIds]) => {
    scaleScores[scale] = questionIds.map(qId => parseInt(answers[qId] || '3'));
  });

  const averageScores: Record<string, number> = {};
  Object.entries(scaleScores).forEach(([scale, scores]) => {
    averageScores[scale] = scores.reduce((a, b) => a + b, 0) / scores.length;
  });

  return averageScores;
};

// Función para calcular scores DISC
export const calculateDiscScores = (answers: AnswerSet): Record<string, number> => {
  const scores = { D: 0, I: 0, S: 0, C: 0 };

  Object.values(answers).forEach(answer => {
    const factor = DISC_WORD_MAPPING[answer];
    if (factor && scores.hasOwnProperty(factor)) {
      scores[factor as keyof typeof scores]++;
    }
  });

  return scores;
};

// Función para calcular score cognitivo
export const calculateCognitiveScore = (answers: AnswerSet): {
  totalCorrect: number;
  totalQuestions: number;
  percentage: number;
  estimatedIQ: number;
} => {
  let correctAnswers = 0;
  const totalQuestions = Object.keys(COGNITIVE_ANSWER_KEY).length;

  Object.entries(answers).forEach(([questionId, answer]) => {
    if (COGNITIVE_ANSWER_KEY[questionId] === answer) {
      correctAnswers++;
    }
  });

  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  
  // Estimación de IQ basada en percentil (simplificada)
  const estimatedIQ = Math.round(85 + (percentage * 0.3));

  return {
    totalCorrect: correctAnswers,
    totalQuestions,
    percentage,
    estimatedIQ
  };
};

// Función para analizar respuestas éticas
export const analyzeEthicalResponses = (answers: Record<string, any>): {
  integrityIndex: number;
  behaviorPatterns: string[];
  riskFactors: string[];
} => {
  // Esta función analizaría las respuestas textuales de los dilemas éticos
  // Por ahora retorna valores por defecto
  return {
    integrityIndex: 85,
    behaviorPatterns: ['Alta Integridad', 'Pensamiento Sistémico', 'Orientación a Soluciones'],
    riskFactors: ['Tendencia al Perfeccionismo', 'Posible Evitación de Conflictos']
  };
};