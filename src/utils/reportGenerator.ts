import { UserData, AnswerSet, EthicalDilemmaAnswer } from '../types';
import { AssessmentAnalysis } from '../services/geminiService';
import { 
  calculateSituationalScoring,
  calculateHoganScoring,
  calculateDiscScoring,
  calculateCognitiveScoring,
  calculateEthicalScoring
} from '../services/scoringEngine';

// Helper function to convert string answers to numbers
const convertToNumber = (answer: string): number => {
  if (typeof answer === 'number') return answer;
  if (typeof answer === 'string') {
    switch(answer.toLowerCase()) {
      case 'totalmente en desacuerdo': return 1;
      case 'en desacuerdo': return 2;
      case 'neutral': return 3;
      case 'de acuerdo': return 4;
      case 'totalmente de acuerdo': return 5;
      default: return parseInt(answer) || 3;
    }
  }
  return 3; // Default fallback
};

// Función para generar síntesis ejecutiva
export const generateExecutiveSynthesis = (
  userData: UserData,
  situationalAnswers: AnswerSet,
  hoganAnswers: AnswerSet,
  discAnswers: AnswerSet,
  cognitiveAnswers: AnswerSet,
  ethicalAnswers: Record<string, EthicalDilemmaAnswer>,
  analysis: AssessmentAnalysis
): string => {
  // Determinar veredicto estratégico basado en el análisis
  const tieneAnalisisReal = analysis.analysisType === 'real';
  const veredictoRecomendacion = tieneAnalisisReal 
    ? "Se recomienda proceder con confianza en el desarrollo de este talento"
    : "Se requiere evaluación adicional para veredicto definitivo";

  return `
**ANÁLISIS INTEGRAL - SÍNTESIS EJECUTIVA**

**CANDIDATO:** ${userData.name}
**POSICIÓN ACTUAL:** ${userData.position} | **ORGANIZACIÓN:** ${userData.company}
**FECHA DE EVALUACIÓN:** ${new Date().toLocaleDateString('es-ES')}
${tieneAnalisisReal ? '' : '\n⚠️ ANÁLISIS BÁSICO - No personalizado por IA'}

-------------------------------------------
| PERFIL ESTRATÉGICO                      |
|-----------------------------------------|
| Evaluación Integral Completada         |
-------------------------------------------

**1. PERFIL ESTRATÉGICO**

${analysis.executiveSummary}

${analysis.leadershipProfile}

**2. CAPITAL DE TALENTO (FORTALEZAS COMO ACTIVOS DE NEGOCIO)**

${analysis.strengths.map(strength => `• ${strength}`).join('\n')}

**APLICACIÓN ESTRATÉGICA:**

${analysis.personalityInsights}

**3. FACTORES DE RIESGO Y PUNTOS CIEGOS**

${analysis.areasForGrowth.map(area => `• ${area}`).join('\n')}

**MITIGACIÓN DE RIESGOS:**

${analysis.ethicalFramework}

**4. VEREDICTO Y PLAN DE ACCIÓN ESTRATÉGICO**

**RECOMENDACIÓN EJECUTIVA:** ${veredictoRecomendacion}

**PLAN DE DESARROLLO DE ALTO NIVEL:**

${analysis.developmentRecommendations}

**TRAYECTORIA PROFESIONAL SUGERIDA:**

${analysis.careerSuggestions}

**EVALUACIÓN COGNITIVA:**

${analysis.cognitiveAssessment}

**CONCLUSIÓN ESTRATÉGICA:**

Este análisis integral proporciona una radiografía completa del perfil de talento evaluado.

Identifica tanto el potencial estratégico como los factores de riesgo que requieren atención para maximizar el retorno de inversión en el desarrollo de este colaborador.

${tieneAnalisisReal 
  ? 'Análisis personalizado generado por IA - Válido para decisiones estratégicas'
  : 'Análisis básico - Se recomienda evaluación adicional para decisiones críticas'
}
  `.trim();
};

// Función para generar reporte situacional profesional
export const generateSituationalReport = (
  situationalAnswers: AnswerSet,
  userData: UserData
): string => {
  // Clave de respuestas correctas para análisis de patrones
  const correctAnswers: Record<string, string> = {
    'sit1': 'dirigir', 'sit2': 'apoyar', 'sit3': 'apoyar', 'sit4': 'delegar', 'sit5': 'entrenar',
    'sit6': 'apoyar', 'sit7': 'dirigir', 'sit8': 'entrenar', 'sit9': 'apoyar', 'sit10': 'apoyar',
    'sit11': 'dirigir', 'sit12': 'delegar', 'sit13': 'apoyar', 'sit14': 'apoyar', 'sit15': 'apoyar',
    'sit16': 'entrenar', 'sit17': 'delegar', 'sit18': 'apoyar', 'sit19': 'entrenar', 'sit20': 'delegar'
  };

  // Usar motor de calificación para cálculo preciso
  const situationalResponses = Object.keys(situationalAnswers)
    .sort()
    .map(key => {
      const answer = situationalAnswers[key];
      // Convertir respuestas a formato S1, S2, S3, S4
      switch(answer) {
        case 'dirigir': return 'S1';
        case 'entrenar': return 'S2';
        case 'apoyar': return 'S3';
        case 'delegar': return 'S4';
        default: return 'S1';
      }
    });
  
  const scoring = calculateSituationalScoring(situationalResponses);
  const precisionScore = scoring.precisionDiagnosticaPct;

  // Determinar diagnóstico según score
  let diagnostico = '';
  let nivelPrecision = '';
  
  if (precisionScore > 80) {
    diagnostico = 'Muy Alta Precisión';
    nivelPrecision = 'excepcional para diagnosticar las necesidades del equipo y aplicar el estilo más efectivo';
  } else if (precisionScore >= 60) {
    diagnostico = 'Precisión Sólida';
    nivelPrecision = 'sólida para identificar situaciones y aplicar estilos apropiados, con oportunidades de refinamiento';
  } else if (precisionScore >= 40) {
    diagnostico = 'Precisión Moderada';
    nivelPrecision = 'moderada que requiere desarrollo en diagnóstico situacional y flexibilidad de estilos';
  } else {
    diagnostico = 'Área de Oportunidad';
    nivelPrecision = 'que representa un área crítica de desarrollo en liderazgo situacional';
  }

  // Calcular Perfil de Estilos Preferentes
  const styles = Object.values(situationalAnswers);
  const dirigirCount = styles.filter(s => s === 'dirigir').length;
  const entrenarCount = styles.filter(s => s === 'entrenar').length;
  const apoyarCount = styles.filter(s => s === 'apoyar').length;
  const delegarCount = styles.filter(s => s === 'delegar').length;

  // ANÁLISIS DE PATRONES DE ERROR
  const incorrectAnswers = Object.entries(situationalAnswers).filter(([questionId, answer]) => 
    correctAnswers[questionId] !== answer
  );

  // Análisis de patrones en respuestas incorrectas
  const incorrectStyles = incorrectAnswers.map(([, answer]) => answer);
  const incorrectDirigirCount = incorrectStyles.filter(s => s === 'dirigir').length;
  const incorrectEntrenarCount = incorrectStyles.filter(s => s === 'entrenar').length;
  const incorrectApoyarCount = incorrectStyles.filter(s => s === 'apoyar').length;
  const incorrectDelegarCount = incorrectStyles.filter(s => s === 'delegar').length;

  // Detectar patrones de sobreuso (más de 3 errores con el mismo estilo)
  const patternInsights: string[] = [];
  
  if (incorrectDirigirCount > 3) {
    patternInsights.push('Tiende a sobreutilizar el estilo Directivo (S1-Dirigir) en situaciones que requerían más apoyo, entrenamiento o delegación.');
  }
  if (incorrectEntrenarCount > 3) {
    patternInsights.push('Tiende a sobreutilizar el estilo de Entrenamiento (S2-Entrenar) en situaciones que requerían dirección, apoyo o delegación.');
  }
  if (incorrectApoyarCount > 3) {
    patternInsights.push('Tiende a sobreutilizar el estilo de Apoyo (S3-Apoyar) en situaciones que requerían dirección, entrenamiento o delegación.');
  }
  if (incorrectDelegarCount > 3) {
    patternInsights.push('Tiende a sobreutilizar el estilo de Delegación (S4-Delegar) en situaciones que requerían más dirección, entrenamiento o apoyo.');
  }

  // Detectar patrones de evitación (no usar un estilo cuando era correcto)
  const correctStylesNeeded = Object.values(correctAnswers);
  const correctDirigirNeeded = correctStylesNeeded.filter(s => s === 'dirigir').length;
  const correctEntrenarNeeded = correctStylesNeeded.filter(s => s === 'entrenar').length;
  const correctApoyarNeeded = correctStylesNeeded.filter(s => s === 'apoyar').length;
  const correctDelegarNeeded = correctStylesNeeded.filter(s => s === 'delegar').length;

  if (dirigirCount === 0 && correctDirigirNeeded > 0) {
    patternInsights.push('Muestra una evitación del estilo Directivo (S1-Dirigir), lo que podría limitar su capacidad de proporcionar estructura y dirección clara cuando el equipo la necesita.');
  }
  if (entrenarCount === 0 && correctEntrenarNeeded > 0) {
    patternInsights.push('Muestra una evitación del estilo de Entrenamiento (S2-Entrenar), lo que podría limitar el desarrollo de competencias en su equipo.');
  }
  if (apoyarCount === 0 && correctApoyarNeeded > 0) {
    patternInsights.push('Muestra una evitación del estilo de Apoyo (S3-Apoyar), lo que podría limitar la colaboración y el empoderamiento del equipo.');
  }
  if (delegarCount === 0 && correctDelegarNeeded > 0) {
    patternInsights.push('Muestra una evitación del estilo de Delegación (S4-Delegar), lo que podría limitar la autonomía y el crecimiento de su equipo.');
  }

  // Determinar estilos preferentes (los 1-2 más altos)
  const estilosOrdenados = [
    { estilo: 'S1 - Dirigir', count: dirigirCount, descripcion: 'la instrucción directa y supervisión estructurada' },
    { estilo: 'S2 - Entrenar', count: entrenarCount, descripcion: 'el coaching y desarrollo de competencias' },
    { estilo: 'S3 - Apoyar', count: apoyarCount, descripcion: 'la colaboración y facilitación de equipos' },
    { estilo: 'S4 - Delegar', count: delegarCount, descripcion: 'la delegación y empoderamiento de colaboradores' }
  ].sort((a, b) => b.count - a.count);

  const estilosPrimarios = estilosOrdenados.filter(e => e.count === estilosOrdenados[0].count);
  const descripcionPreferencias = estilosPrimarios.length === 1 
    ? estilosPrimarios[0].descripcion
    : estilosPrimarios.map(e => e.descripcion).join(' y ');

  return `
**MÓDULO 1: ANÁLISIS DE LIDERAZGO SITUACIONAL**

**A. PRESENTACIÓN DE DATOS**

-------------------------------------------
| ÍNDICE DE PRECISIÓN DIAGNÓSTICA        |
|-----------------------------------------|
| Puntuación: ${precisionScore}%          |
| Diagnóstico: ${diagnostico}            |
-------------------------------------------

**PERFIL DE ESTILOS PREFERENTES (TENDENCIA NATURAL):**

• **S1 - Dirigir:** ${dirigirCount} veces
• **S2 - Entrenar:** ${entrenarCount} veces  
• **S3 - Apoyar:** ${apoyarCount} veces
• **S4 - Delegar:** ${delegarCount} veces

**B. INTERPRETACIÓN NARRATIVA**

El Índice de Precisión Diagnóstica mide la capacidad del evaluado para identificar correctamente la necesidad de su equipo y aplicar el estilo de liderazgo más efectivo.

Un resultado de **${precisionScore}%** indica una capacidad ${nivelPrecision}.

El análisis de sus respuestas muestra una preferencia natural por los estilos **${estilosOrdenados.slice(0, 2).map(e => e.estilo).join(' y ')}**.

Esto sugiere que, instintivamente, tiende a liderar a través de ${descripcionPreferencias}.

Es importante que continúe desarrollando su flexibilidad para aplicar también los estilos menos preferentes cuando la situación lo requiera.

${patternInsights.length > 0 ? `
**C. ANÁLISIS DE PATRONES DE ERROR**

El análisis de las respuestas incorrectas revela los siguientes patrones de comportamiento que requieren atención:

${patternInsights.map(insight => `• ${insight}`).join('\n')}

**IMPLICACIONES PARA EL DESARROLLO:**

Estos patrones sugieren áreas específicas donde el evaluado puede beneficiarse de un desarrollo dirigido.

La conciencia de estas tendencias es el primer paso para desarrollar una mayor flexibilidad situacional.
` : ''}

**RECOMENDACIONES DE DESARROLLO:**

${precisionScore > 80 ? 
  '• Aprovechar su excelente diagnóstico situacional para mentorear a otros líderes\n• Asumir roles de liderazgo complejo que requieran alta adaptabilidad\n• Desarrollar programas de formación en liderazgo situacional\n• Liderar equipos diversos con diferentes niveles de madurez' :
  precisionScore >= 60 ?
  '• Continuar practicando el diagnóstico de madurez del colaborador\n• Desarrollar mayor flexibilidad en estilos menos utilizados\n• Participar en programas avanzados de liderazgo situacional\n• Buscar feedback regular sobre efectividad de estilos aplicados' :
  precisionScore >= 40 ?
  '• Programa intensivo de desarrollo en liderazgo situacional\n• Práctica supervisada en diagnóstico de necesidades del equipo\n• Formación específica en estilos menos desarrollados\n• Evaluación de progreso cada 3 meses' :
  '• ACCIÓN INMEDIATA: Formación intensiva en liderazgo situacional\n• SUPERVISIÓN: Apoyo continuo en decisiones de liderazgo\n• DESARROLLO: Programa estructurado de 6 meses mínimo\n• REEVALUACIÓN: Completa después del programa de desarrollo'
}

  `.trim();
};

// Función para generar reporte Hogan profesional
export const generateHoganReport = (
  hoganAnswers: AnswerSet,
  userData: UserData
): string => {
  // Usar motor de calificación para análisis preciso
  const hoganResponses = Object.keys(hoganAnswers)
    .sort()
    .map(key => {
      const answer = hoganAnswers[key];
      if (typeof answer === 'string') {
        switch(answer.toLowerCase()) {
          case 'totalmente en desacuerdo': return 1;
          case 'en desacuerdo': return 2;
          case 'neutral': return 3;
          case 'de acuerdo': return 4;
          case 'totalmente de acuerdo': return 5;
          default: return parseInt(answer) || 3;
        }
      }
      return parseInt(answer) || 3;
    });
  
  const scoring = calculateHoganScoring(hoganResponses);

  // Pares de preguntas contradictorias para el Índice de Consistencia
  const contradictoryPairs = [
    { pair1: 'hog3', pair2: 'hog7', description: 'Necesidad de atención vs. Distanciamiento social' },
    { pair1: 'hog8', pair2: 'hog19', description: 'Toma de riesgos vs. Aversión al riesgo' },
    { pair1: 'hog10', pair2: 'hog6', description: 'Arrogancia vs. Complacencia excesiva' },
    { pair1: 'hog14', pair2: 'hog2', description: 'Comportamiento dramático vs. Resistencia pasiva' }
  ];

  // Convertir respuestas a números y calcular promedios por escala
  const scaleDescriptions = {
    'excitable': 'Volatilidad emocional bajo presión, cambios de humor impredecibles',
    'esceptico': 'Desconfianza excesiva, cinismo que puede afectar la colaboración',
    'cauteloso': 'Aversión extrema al riesgo, resistencia al cambio y nuevas iniciativas',
    'reservado': 'Distanciamiento social, dificultad para conectar con el equipo',
    'ocioso': 'Resistencia pasiva, falta de compromiso con objetivos organizacionales',
    'audaz': 'Arrogancia, reacio a admitir errores y dificultad para escuchar feedback',
    'travieso': 'Toma de riesgos imprudente, tendencia a romper reglas',
    'vistoso': 'Necesidad excesiva de atención, comportamiento dramático',
    'imaginativo': 'Ideas excéntricas, desconexión de la realidad práctica',
    'diligente': 'Perfeccionismo y microgestión que puede ralentizar al equipo',
    'complaciente': 'Complacencia excesiva, dificultad para tomar decisiones difíciles'
  };

  const riskAreas: Array<{name: string, score: number, level: string, description: string}> = [];
  const allScales: Array<{name: string, score: number, level: string, description: string}> = [];

  Object.entries(scoring).forEach(([scaleName, scaleData]) => {
    const description = scaleDescriptions[scaleName as keyof typeof scaleDescriptions] || 'Descripción no disponible';
    
    allScales.push({
      name: scaleName,
      score: scaleData.score,
      level: scaleData.riesgo.toUpperCase(),
      description
    });

    if (scaleData.riesgo === 'Moderado' || scaleData.riesgo === 'Alto') {
      riskAreas.push({
        name: scaleName,
        score: scaleData.score,
        level: scaleData.riesgo.toUpperCase(),
        description
      });
    }
  });

  // Calcular Índice de Consistencia
  let inconsistencyCount = 0;
  const inconsistencyDetails: string[] = [];

  contradictoryPairs.forEach(pair => {
    const score1 = convertToNumber(hoganAnswers[pair.pair1]);
    const score2 = convertToNumber(hoganAnswers[pair.pair2]);
    
    // Si ambas respuestas son altas (4 o 5), es una inconsistencia
    if (score1 >= 4 && score2 >= 4) {
      inconsistencyCount++;
      inconsistencyDetails.push(`• ${pair.description}: Puntuaciones altas en ambas (${score1} y ${score2})`);
    }
  });

  const consistencyIndex = Math.max(0, 10 - (inconsistencyCount * 2.5)); // Escala 0-10
  const hasInconsistencies = inconsistencyCount >= 2;

  // Ordenar por nivel de riesgo (ALTO primero)
  riskAreas.sort((a, b) => {
    if (a.level === 'ALTO' && b.level === 'MODERADO') return -1;
    if (a.level === 'MODERADO' && b.level === 'ALTO') return 1;
    return b.score - a.score;
  });

  // Ordenar todas las escalas por puntuación (mayor a menor)
  allScales.sort((a, b) => b.score - a.score);

  // Generar tabla de puntuaciones individuales
  let scoresTable = `PUNTUACIONES INDIVIDUALES POR DIMENSIÓN:

${allScales.map(scale => 
  `• ${scale.name}: ${scale.score.toFixed(1)}/5.0 (${scale.level})`
).join('\n')}

INTERPRETACIÓN DE NIVELES:
• BAJO (1.0-2.9): Comportamiento saludable bajo presión
• MODERADO (3.0-3.9): Área que requiere atención y desarrollo
• ALTO (4.0-5.0): Riesgo significativo que necesita gestión activa

`;

  // Generar tarjetas de riesgo
  let riskCards = '';
  if (riskAreas.length === 0) {
    riskCards = `-------------------------------------------
| PERFIL DE BAJO RIESGO                   |
|-----------------------------------------|
| Todas las escalas muestran niveles     |
| saludables. No se identificaron áreas  |
| de riesgo significativo.                |
-------------------------------------------`;
  } else {
    riskCards = riskAreas.map(area => 
      `-------------------------------------------
| RIESGO ${area.level}: ${area.name.padEnd(25)} |
|-----------------------------------------|
| Puntuación Promedio: ${area.score.toFixed(1)} / 5.0${' '.repeat(12)} |
| Impacto Potencial: ${area.description.padEnd(25)} |
-------------------------------------------`
    ).join('\n');
  }

  // Análisis narrativo
  const highestRisk = riskAreas.find(area => area.level === 'ALTO') || riskAreas[0];
  let narrativeAnalysis = '';
  
  if (riskAreas.length === 0) {
    narrativeAnalysis = `${userData.name} presenta un perfil de riesgo muy favorable. Todas las escalas de riesgo muestran niveles saludables, lo que sugiere una alta probabilidad de mantener un desempeño efectivo incluso bajo presión. Este perfil indica estabilidad emocional, capacidad de autorregulación y un enfoque equilibrado del liderazgo.`;
  } else {
    narrativeAnalysis = `El análisis del perfil de riesgos de ${userData.name} indica que, aunque en condiciones normales su desempeño puede ser sólido, bajo presión existen ${riskAreas.length} área${riskAreas.length > 1 ? 's' : ''} principal${riskAreas.length > 1 ? 'es' : ''} que requiere${riskAreas.length > 1 ? 'n' : ''} atención.

${highestRisk ? `El riesgo más significativo se encuentra en la escala ${highestRisk.name}. Esto sugiere que en momentos de estrés, podría manifestar ${highestRisk.description.toLowerCase()}. Es crucial que el evaluado desarrolle estrategias de autogestión para mitigar estas tendencias y asegurar que no afecten negativamente a su equipo y a los resultados.` : ''}`;
  }

  // Determinar nivel de riesgo general
  const highRiskCount = allScales.filter(s => s.level === 'ALTO').length;
  const moderateRiskCount = allScales.filter(s => s.level === 'MODERADO').length;
  
  let generalRiskLevel = '';
  if (highRiskCount >= 3) {
    generalRiskLevel = 'ALTO - Requiere intervención inmediata';
  } else if (highRiskCount >= 1 || moderateRiskCount >= 4) {
    generalRiskLevel = 'MODERADO - Requiere desarrollo y supervisión';
  } else if (moderateRiskCount >= 1) {
    generalRiskLevel = 'BAJO-MODERADO - Monitoreo recomendado';
  } else {
    generalRiskLevel = 'BAJO - Perfil favorable';
  }

  return `
**MÓDULO 2: PERFIL DE COMPETENCIAS Y RIESGOS (HOGAN)**

**A. ÍNDICE DE CONSISTENCIA**

-------------------------------------------
| CONSISTENCIA DE RESPUESTAS              |
|-----------------------------------------|
| Índice: ${consistencyIndex.toFixed(1)} / 10.0 |
| Inconsistencias detectadas: ${inconsistencyCount} |
-------------------------------------------

${hasInconsistencies ? `
**⚠️ ADVERTENCIA DE VALIDEZ:**

Se ha detectado un nivel de inconsistencia en las respuestas que podría afectar la validez de este perfil.

Se recomienda interpretar los resultados con cautela.

**DETALLES DE INCONSISTENCIAS:**

${inconsistencyDetails.join('\n')}

**IMPLICACIONES:**

Las inconsistencias pueden indicar falta de autoconocimiento, respuestas apresuradas o deseabilidad social.

Se sugiere una entrevista complementaria para clarificar el perfil.

` : `
**✓ PERFIL CONSISTENTE:**

Las respuestas muestran un patrón coherente, lo que indica un buen nivel de autoconocimiento y validez en los resultados obtenidos.

`}

**B. PRESENTACIÓN DE DATOS**

**PUNTUACIONES INDIVIDUALES POR DIMENSIÓN:**

${allScales.map(scale => 
  `• **${scale.name}:** ${scale.score.toFixed(1)}/5.0 (${scale.level})`
).join('\n')}

**INTERPRETACIÓN DE NIVELES:**
• **BAJO (1.0-2.9):** Comportamiento saludable bajo presión
• **MODERADO (3.0-3.9):** Área que requiere atención y desarrollo
• **ALTO (4.0-5.0):** Riesgo significativo que necesita gestión activa

**ÁREAS DE RIESGO IDENTIFICADAS:**

${riskCards}

-------------------------------------------
| NIVEL DE RIESGO GENERAL                 |
|-----------------------------------------|
| Evaluación: ${generalRiskLevel}         |
-------------------------------------------

**C. INTERPRETACIÓN NARRATIVA**

${narrativeAnalysis}

${hasInconsistencies ? `
**NOTA IMPORTANTE SOBRE VALIDEZ:**

Debido a las inconsistencias detectadas, este perfil debe interpretarse como una aproximación inicial.

**Se recomienda:**
• Revisión con el evaluado de las respuestas contradictorias
• Entrevista complementaria para validar resultados
• Posible re-evaluación en condiciones más controladas

` : ''}

**RECOMENDACIONES DE DESARROLLO:**

${riskAreas.length === 0 ? 
  '• Mantener el equilibrio actual y servir como modelo para otros\n• Considerar roles de mentoring en gestión del estrés\n• Aprovechar la estabilidad para liderar en situaciones de crisis' :
  riskAreas.map(area => 
    `• ${area.name}: ${area.level === 'ALTO' ? 'Programa de desarrollo intensivo requerido' : 'Formación y práctica supervisada recomendada'}`
  ).join('\n')
}

  `.trim();
};

// Función para generar reporte DISC profesional
export const generateDiscReport = (
  discAnswers: AnswerSet,
  userData: UserData
): string => {
  // Usar motor de calificación para análisis preciso
  const discResponses = Object.keys(discAnswers)
    .sort()
    .map(key => {
      const answer = discAnswers[key];
      const answerStr = answer.toLowerCase();
      
      let mas = '', menos = '';
      if (answerStr.includes('mas:') && answerStr.includes('menos:')) {
        const parts = answerStr.split(',');
        mas = parts[0].replace('mas:', '').trim();
        menos = parts[1].replace('menos:', '').trim();
      }
      
      return { mas, menos };
    });
  
  const scoring = calculateDiscScoring(discResponses);

  // Diccionario de perfiles DISC
  const profileDictionary = {
    'D': {
      name: 'Dominante',
      enfoque: 'los resultados y la acción rápida',
      aporta: 'dirección, decisión y un alto sentido de urgencia',
      motivadores: 'el control, los retos y la competencia',
      riesgos: 'ser impaciente, directo en exceso o poco sensible a los demás'
    },
    'I': {
      name: 'Influyente',
      enfoque: 'la comunicación, la persuasión y las relaciones interpersonales',
      aporta: 'entusiasmo, optimismo y la capacidad de generar cohesión',
      motivadores: 'el reconocimiento, la interacción social y la variedad',
      riesgos: 'la falta de atención al detalle, la desorganización o evitar conflictos'
    },
    'S': {
      name: 'Estable',
      enfoque: 'la colaboración, la estabilidad y el apoyo a los demás',
      aporta: 'lealtad, fiabilidad y un ritmo de trabajo constante',
      motivadores: 'la seguridad, el aprecio y un entorno de trabajo predecible',
      riesgos: 'la resistencia al cambio, la indecisión o la dificultad para manejar múltiples prioridades'
    },
    'C': {
      name: 'Conforme',
      enfoque: 'la precisión, la calidad y el análisis basado en datos',
      aporta: 'orden, altos estándares y un enfoque metódico',
      motivadores: 'la exactitud, la lógica y los procedimientos claros',
      riesgos: 'el perfeccionismo excesivo, ser demasiado crítico o la parálisis por análisis'
    }
  };

  // Determinar perfil primario desde el scoring
  const primaryFactorMap = {
    'Dominante': 'D',
    'Influyente': 'I', 
    'Estable': 'S',
    'Conforme': 'C'
  };
  
  const primaryFactor = primaryFactorMap[scoring.perfilPrimario as keyof typeof primaryFactorMap] || 'D';
  const primaryProfile = profileDictionary[primaryFactor as keyof typeof profileDictionary];

  return `
**MÓDULO 3: PERFIL DE COMPORTAMIENTO PROFESIONAL (DISC)**

-------------------------------------------
| PERFIL DE COMPORTAMIENTO (DISC)         |
|-----------------------------------------|
| Perfil Primario: ${scoring.perfilPrimario} (${primaryFactor}) |
| Scores Finales: D:${scoring.scoreD}, I:${scoring.scoreI}, S:${scoring.scoreS}, C:${scoring.scoreC} |
-------------------------------------------

**CARACTERÍSTICAS DEL PERFIL '${primaryProfile.name}':**

• **Enfoque:** ${primaryProfile.enfoque}

• **Aporta al equipo:** ${primaryProfile.aporta}

• **Motivadores:** ${primaryProfile.motivadores}

• **Riesgos Potenciales:** ${primaryProfile.riesgos}

**INTERPRETACIÓN NARRATIVA**

El análisis de comportamiento del evaluado identifica un perfil primario **'${primaryProfile.name}'**.

Este estilo se caracteriza por un enfoque natural hacia ${primaryProfile.enfoque}.

En un entorno de equipo, su principal contribución es ${primaryProfile.aporta}, y se siente más motivado por ${primaryProfile.motivadores}.

Un área a vigilar, asociada con este perfil, es la tendencia a ${primaryProfile.riesgos}.

**METODOLOGÍA APLICADA:**

Este análisis utiliza la puntuación ipsativa estándar DISC, donde cada respuesta "MÁS" suma +1 punto al factor correspondiente y cada "MENOS" resta -1 punto.

Los scores finales reflejan las preferencias comportamentales relativas del evaluado, siendo el factor con mayor puntuación el perfil primario dominante.

  `.trim();
};

// Función para generar reporte cognitivo profesional
export const generateCognitiveReport = (
  cognitiveAnswers: AnswerSet,
  userData: UserData
): string => {
  // Clave de respuestas correctas
  const correctAnswers: Record<string, string> = {
    'cog1': '38', 'cog2': 'aire', 'cog3': 'pais', 'cog4': '12', 'cog5': 'triangulo',
    'cog6': 'pesimista', 'cog7': '1_minuto', 'cog8': 'tiene_titulo', 'cog9': 'patata',
    'cog10': '150', 'cog11': 'tornillo', 'cog12': 'D4', 'cog13': '90_km',
    'cog14': 'pentagono', 'cog15': 'convencer', 'cog16': '8', 'cog17': 'sabado',
    'cog18': '27', 'cog19': 'temporal', 'cog20': 'menor'
  };

  // Usar motor de calificación para análisis preciso
  const cognitiveResponses = Object.keys(cognitiveAnswers)
    .sort()
    .map(key => cognitiveAnswers[key]);
  
  const scoring = calculateCognitiveScoring(cognitiveResponses);
  const estimatedIQ = scoring.iqEstimado;
  const percentile = scoring.percentil;
  const correctCount = scoring.aciertos;
  const totalQuestions = scoring.totalPreguntas;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  // Análisis por categorías cognitivas
  const razonamientoLogico = ['cog1', 'cog4', 'cog16', 'cog18'].filter(id => 
    cognitiveAnswers[id] && correctAnswers[id] === cognitiveAnswers[id]
  ).length;

  const comprensionVerbal = ['cog2', 'cog3', 'cog6', 'cog9', 'cog15'].filter(id => 
    cognitiveAnswers[id] && correctAnswers[id] === cognitiveAnswers[id]
  ).length;

  const habilidadesNumericas = ['cog7', 'cog10', 'cog13', 'cog20'].filter(id => 
    cognitiveAnswers[id] && correctAnswers[id] === cognitiveAnswers[id]
  ).length;

  const reconocimientoPatrones = ['cog5', 'cog11', 'cog12', 'cog14'].filter(id => 
    cognitiveAnswers[id] && correctAnswers[id] === cognitiveAnswers[id]
  ).length;

  const pensamientoAbstracto = ['cog8', 'cog17', 'cog19'].filter(id => 
    cognitiveAnswers[id] && correctAnswers[id] === cognitiveAnswers[id]
  ).length;

  // Determinar nivel cognitivo
  let nivelCognitivo = '';
  let descripcionNivel = '';
  let implicacionesLiderazgo = '';
  let recomendacionesDesarrollo = '';
  let veredictoEjecutivo = '';

  if (estimatedIQ >= 115) {
    nivelCognitivo = 'SUPERIOR';
    descripcionNivel = `${userData.name} demuestra capacidades cognitivas excepcionales (IQ ${estimatedIQ}, Percentil ${percentile}) que lo posicionan en el rango superior de la población ejecutiva.`;
    implicacionesLiderazgo = 'Excelente capacidad para liderar iniciativas complejas, análisis estratégico y resolución de problemas multifacéticos.';
    veredictoEjecutivo = 'APTO PARA ROLES EJECUTIVOS DE ALTA COMPLEJIDAD';
    recomendacionesDesarrollo = '• Asumir roles de liderazgo estratégico\n• Liderar proyectos de transformación\n• Mentorear a otros en resolución de problemas\n• Participar en comités ejecutivos';
  } else if (estimatedIQ >= 100) {
    nivelCognitivo = 'ALTO';
    descripcionNivel = `${userData.name} presenta capacidades cognitivas sólidas (IQ ${estimatedIQ}, Percentil ${percentile}) que superan el promedio poblacional y permiten manejar complejidad moderada.`;
    implicacionesLiderazgo = 'Muy buena capacidad para roles de liderazgo medio y senior, con potencial para crecimiento estratégico.';
    veredictoEjecutivo = 'APTO PARA ROLES DE LIDERAZGO MEDIO CON DESARROLLO';
    recomendacionesDesarrollo = '• Desarrollar pensamiento sistémico\n• Asumir proyectos de mayor complejidad\n• Fortalecer análisis estratégico\n• Participar en programas de liderazgo avanzado';
  } else if (estimatedIQ >= 90) {
    nivelCognitivo = 'PROMEDIO ALTO';
    descripcionNivel = `${userData.name} muestra capacidades cognitivas en el rango promedio alto (IQ ${estimatedIQ}, Percentil ${percentile}), adecuadas para roles operativos con apoyo en análisis complejos.`;
    implicacionesLiderazgo = 'Buena capacidad para roles de supervisión y liderazgo de equipos, con oportunidades de crecimiento.';
    veredictoEjecutivo = 'REQUIERE APOYO PARA ROLES EJECUTIVOS COMPLEJOS';
    recomendacionesDesarrollo = '• Fortalecer habilidades analíticas\n• Practicar resolución de problemas estructurados\n• Desarrollar pensamiento crítico\n• Participar en programas de desarrollo cognitivo';
  } else {
    nivelCognitivo = 'PROMEDIO';
    descripcionNivel = `${userData.name} presenta capacidades cognitivas en el rango promedio (IQ ${estimatedIQ}, Percentil ${percentile}), que están POR DEBAJO DEL BENCHMARK EJECUTIVO estándar.`;
    implicacionesLiderazgo = 'Adecuado para roles de liderazgo operativo con apoyo en análisis complejos.';
    veredictoEjecutivo = 'NO RECOMENDADO PARA ROLES EJECUTIVOS SIN DESARROLLO INTENSIVO';
    recomendacionesDesarrollo = '• Desarrollar habilidades de análisis\n• Practicar resolución de problemas paso a paso\n• Fortalecer razonamiento lógico\n• Buscar mentoring en toma de decisiones';
  }

  return `
**MÓDULO 4: EVALUACIÓN DE APTITUDES COGNITIVAS**

-------------------------------------------
| EVALUACIÓN COGNITIVA                    |
|-----------------------------------------|
| IQ ESTIMADO: ${estimatedIQ}             |
| PERCENTIL: ${percentile}                |
| NIVEL COGNITIVO: ${nivelCognitivo}      |
-------------------------------------------

**VEREDICTO EJECUTIVO:** ${veredictoEjecutivo}

**PUNTUACIÓN DETALLADA:** ${correctCount}/${totalQuestions} respuestas correctas (${percentage}%)

**ANÁLISIS POR CATEGORÍAS:**
• Razonamiento Lógico: ${razonamientoLogico}/4 (${Math.round((razonamientoLogico/4)*100)}%)
• Comprensión Verbal: ${comprensionVerbal}/5 (${Math.round((comprensionVerbal/5)*100)}%)
• Habilidades Numéricas: ${habilidadesNumericas}/4 (${Math.round((habilidadesNumericas/4)*100)}%)
• Reconocimiento de Patrones: ${reconocimientoPatrones}/4 (${Math.round((reconocimientoPatrones/4)*100)}%)
• Pensamiento Abstracto: ${pensamientoAbstracto}/3 (${Math.round((pensamientoAbstracto/3)*100)}%)

**DIAGNÓSTICO COGNITIVO ESTRATÉGICO:**

${descripcionNivel}

**IMPLICACIONES PARA ROLES EJECUTIVOS:**

${implicacionesLiderazgo}

**ACTIVOS COGNITIVOS (FORTALEZAS RELATIVAS):**

${razonamientoLogico >= 3 ? '• Excelente razonamiento lógico y secuencial\n' : ''}${comprensionVerbal >= 4 ? '• Comprensión verbal superior\n' : ''}${habilidadesNumericas >= 3 ? '• Sólidas habilidades numéricas\n' : ''}${reconocimientoPatrones >= 3 ? '• Excelente reconocimiento de patrones\n' : ''}${pensamientoAbstracto >= 2 ? '• Buen pensamiento abstracto\n' : ''}

**FACTORES DE RIESGO COGNITIVO:**

${razonamientoLogico < 2 ? '• Fortalecer razonamiento lógico\n' : ''}${comprensionVerbal < 3 ? '• Desarrollar comprensión verbal\n' : ''}${habilidadesNumericas < 2 ? '• Mejorar habilidades numéricas\n' : ''}${reconocimientoPatrones < 2 ? '• Practicar reconocimiento de patrones\n' : ''}${pensamientoAbstracto < 2 ? '• Desarrollar pensamiento abstracto\n' : ''}

**PLAN DE DESARROLLO COGNITIVO:**

${recomendacionesDesarrollo}

**APLICACIÓN ESTRATÉGICA POR COMPETENCIA:**
• Análisis Estratégico: ${estimatedIQ >= 115 ? 'FORTALEZA ESTRATÉGICA' : estimatedIQ >= 100 ? 'COMPETENCIA MODERADA' : 'ÁREA DE RIESGO CRÍTICO'}
• Resolución de Problemas Complejos: ${estimatedIQ >= 115 ? 'FORTALEZA ESTRATÉGICA' : estimatedIQ >= 100 ? 'COMPETENCIA MODERADA' : 'ÁREA DE RIESGO CRÍTICO'}
• Toma de Decisiones Bajo Presión: ${estimatedIQ >= 115 ? 'FORTALEZA ESTRATÉGICA' : estimatedIQ >= 100 ? 'COMPETENCIA MODERADA' : 'ÁREA DE RIESGO CRÍTICO'}
• Planificación Estratégica: ${estimatedIQ >= 115 ? 'FORTALEZA ESTRATÉGICA' : estimatedIQ >= 100 ? 'COMPETENCIA MODERADA' : 'ÁREA DE RIESGO CRÍTICO'}

**RECOMENDACIÓN ESTRATÉGICA FINAL:**

${estimatedIQ >= 115 ? 'EXCELENTE candidato para roles ejecutivos de alta complejidad' : 
  estimatedIQ >= 100 ? 'BUEN candidato para roles de liderazgo medio con programa de desarrollo continuo' :
  estimatedIQ >= 90 ? 'CANDIDATO MODERADO para roles operativos con apoyo analítico intensivo' :
  'NO RECOMENDADO para roles ejecutivos sin programa de desarrollo cognitivo intensivo y apoyo continuo'}

  `.trim();
};

// Función para generar reporte ético profesional
export const generateEthicalReport = (
  ethicalAnswers: Record<string, EthicalDilemmaAnswer>,
  userData: UserData
): string => {
  // Usar motor de calificación para análisis preciso
  const ethicalResponses = Object.keys(ethicalAnswers)
    .sort()
    .map(key => ethicalAnswers[key].mainAnswer || 'A');
  
  const scoring = calculateEthicalScoring(ethicalResponses);
  const integrityIndex = scoring.indiceIntegridad;
  const topCompetencies = scoring.competenciasClave;
  const totalDilemmas = Object.keys(ethicalAnswers).length;
  
  // Generar diagnóstico basado en competencias
  const diagnostico = scoring.diagnostico;
  
  // Generar perfil basado en competencias más frecuentes
  const hasPositiveCompetencies = topCompetencies.some(comp => 
    ['Transparencia', 'Responsabilidad', 'Integridad', 'Solución Constructiva', 'Coraje Moral', 'Cumplimiento'].includes(comp)
  );
  
  const hasNegativeCompetencies = topCompetencies.some(comp => 
    ['Evasión', 'Baja Integridad', 'Complicidad Pasiva', 'Conflicto de Interés'].includes(comp)
  );
  
  let perfilEtico = '';
  if (hasPositiveCompetencies && integrityIndex >= 7.0) {
    perfilEtico = `El análisis de sus respuestas indica un marco ético robusto, fundamentado en principios de ${topCompetencies.slice(0,2).join(' y ')}. El evaluado tiende a elegir soluciones constructivas que abordan el problema de raíz, en lugar de evadir el conflicto o simplemente seguir las reglas de forma pasiva. Demuestra un fuerte sentido de la propiedad sobre las consecuencias de sus acciones.`;
  } else if (hasNegativeCompetencies || integrityIndex < 4.0) {
    perfilEtico = `ALERTA CRÍTICA: El análisis revela patrones preocupantes en el razonamiento ético, con tendencias hacia ${topCompetencies.slice(0,2).join(' y ')}. El Índice de Integridad de ${integrityIndex}/10 representa una bandera roja significativa que requiere atención inmediata y desarrollo ético intensivo.`;
  } else {
    perfilEtico = `El evaluado muestra un enfoque ético mixto, con competencias identificadas en ${topCompetencies.slice(0,2).join(' y ')}. El Índice de Integridad de ${integrityIndex}/10 sugiere un marco ético en desarrollo que se beneficiaría de formación adicional y mentoring.`;
  }

  // Determinar nivel de riesgo
  let nivelRiesgo = '';
  let veredictoEtico = '';
  
  if (integrityIndex >= 8.0) {
    nivelRiesgo = 'BAJO';
    veredictoEtico = 'APTO PARA ROLES DE ALTA RESPONSABILIDAD ÉTICA';
  } else if (integrityIndex >= 6.0) {
    nivelRiesgo = 'MODERADO';
    veredictoEtico = 'APTO CON SUPERVISIÓN ÉTICA ADICIONAL';
  } else if (integrityIndex >= 4.0) {
    nivelRiesgo = 'ALTO';
    veredictoEtico = 'REQUIERE DESARROLLO ÉTICO INTENSIVO';
  } else {
    nivelRiesgo = 'CRÍTICO';
    veredictoEtico = 'NO RECOMENDADO PARA ROLES DE LIDERAZGO SIN INTERVENCIÓN';
  }

  return `
**MÓDULO 5: DIAGNÓSTICO DE INTEGRIDAD Y JUICIO PROFESIONAL**

-------------------------------------------
| ÍNDICE DE INTEGRIDAD                    |
|-----------------------------------------|
| Puntuación: ${integrityIndex} / 10.0    |
| Diagnóstico: ${diagnostico}             |
-------------------------------------------

**NIVEL DE RIESGO ÉTICO:** ${nivelRiesgo}

**VEREDICTO ÉTICO:** ${veredictoEtico}

**DILEMAS ANALIZADOS:** ${totalDilemmas}

**PUNTUACIÓN TOTAL:** ${totalPoints} puntos (Rango: -20 a +20)

**COMPETENCIAS ÉTICAS MÁS FRECUENTES:**

${topCompetencies.map((comp, index) => `${index + 1}. ${comp}`).join('\n')}

**PERFIL DE COMPORTAMIENTO ÉTICO:**

${perfilEtico}

**ANÁLISIS DETALLADO POR DILEMA:**

${Object.entries(ethicalAnswers).map(([_, answer], index) => 
  `• Dilema ${index + 1}: Opción ${answer.mainAnswer || 'Sin respuesta'}`
).join('\n')}

**RECOMENDACIONES ESTRATÉGICAS:**

${integrityIndex >= 8.0 ? 
  '• Aprovechar fortalezas éticas para mentorear a otros\n• Asumir roles de liderazgo en iniciativas de integridad\n• Participar en comités de ética organizacional\n• Desarrollar políticas éticas para la organización' :
  integrityIndex >= 6.0 ?
  '• Continuar desarrollo de marco ético personal\n• Participar en programas de formación ética\n• Buscar mentoring en toma de decisiones complejas\n• Practicar análisis de dilemas éticos' :
  integrityIndex >= 4.0 ?
  '• Programa intensivo de desarrollo ético requerido\n• Supervisión adicional en decisiones críticas\n• Formación en principios de integridad empresarial\n• Evaluación de progreso cada 3 meses' :
  '• ACCIÓN INMEDIATA: Suspender consideración para roles de liderazgo\n• PROGRAMA CRÍTICO: Desarrollo ético intensivo y supervisado\n• REEVALUACIÓN: Completa después de 6 meses de formación\n• MONITOREO: Continuo de decisiones y comportamiento ético'
}

**METODOLOGÍA APLICADA:**

Este análisis utiliza el motor de calificación psicométrica estándar basado en 10 dilemas éticos profesionales. Cada respuesta se evalúa según criterios de integridad, transparencia, responsabilidad y cumplimiento ético. El Índice de Integridad se calcula mediante la fórmula: ((Puntos + 30) / 60) * 10, proporcionando una medida objetiva del juicio ético profesional.

  `.trim();
};