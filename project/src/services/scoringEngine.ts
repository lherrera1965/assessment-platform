// Motor de Calificación y Ponderación Psicométrica
// Sistema de cálculo de scores para los 5 módulos de assessment

export interface SituationalScoring {
  precisionDiagnosticaPct: number;
}

export interface HoganScoring {
  [key: string]: {
    score: number;
    riesgo: 'Bajo' | 'Moderado' | 'Alto';
  };
}

export interface DiscScoring {
  scoreD: number;
  scoreI: number;
  scoreS: number;
  scoreC: number;
  perfilPrimario: string;
}

export interface CognitiveScoring {
  aciertos: number;
  totalPreguntas: number;
  iqEstimado: number;
  percentil: number;
}

export interface EthicalScoring {
  indiceIntegridad: number;
  diagnostico: string;
  competenciasClave: string[];
}

// MÓDULO 1: LIDERAZGO SITUACIONAL
export const calculateSituationalScoring = (responses: string[]): SituationalScoring => {
  // Clave de respuestas ideales
  const correctAnswers = [
    'S1', 'S3', 'S3', 'S4', 'S2', 'S3', 'S1', 'S2', 'S3', 'S3', // Q1-Q10
    'S1', 'S4', 'S3', 'S3', 'S3', 'S2', 'S4', 'S3', 'S2', 'S4'  // Q11-Q20
  ];

  let aciertos = 0;
  for (let i = 0; i < Math.min(responses.length, correctAnswers.length); i++) {
    if (responses[i] === correctAnswers[i]) {
      aciertos++;
    }
  }

  const precisionDiagnosticaPct = Math.round((aciertos / correctAnswers.length) * 100);

  return { precisionDiagnosticaPct };
};

// MÓDULO 2: PERFIL DE RIESGOS (HOGAN)
export const calculateHoganScoring = (responses: number[]): HoganScoring => {
  // Mapeo de preguntas a escalas de riesgo (índices base 0)
  const scaleMapping = {
    'excitable': [0, 19],           // Preguntas 1, 20
    'esceptico': [11],              // Pregunta 12
    'cauteloso': [18],              // Pregunta 19
    'reservado': [6],               // Pregunta 7
    'ocioso': [1],                  // Pregunta 2
    'audaz': [9, 15],               // Preguntas 10, 16
    'travieso': [7, 17],            // Preguntas 8, 18
    'vistoso': [2, 13],             // Preguntas 3, 14
    'imaginativo': [3, 8],          // Preguntas 4, 9
    'diligente': [4, 12, 14],       // Preguntas 5, 13, 15
    'complaciente': [5, 10, 16]     // Preguntas 6, 11, 17
  };

  const result: HoganScoring = {};

  Object.entries(scaleMapping).forEach(([scaleName, questionIndices]) => {
    // Calcular promedio de las preguntas asignadas a esta escala
    const scores = questionIndices.map(index => responses[index] || 3); // Default 3 si no hay respuesta
    const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;

    // Determinar nivel de riesgo
    let riesgo: 'Bajo' | 'Moderado' | 'Alto';
    if (average >= 4.0) {
      riesgo = 'Alto';
    } else if (average >= 3.0) {
      riesgo = 'Moderado';
    } else {
      riesgo = 'Bajo';
    }

    result[scaleName] = {
      score: Math.round(average * 10) / 10, // Redondear a 1 decimal
      riesgo
    };
  });

  return result;
};

// MÓDULO 3: PERFIL DE COMPORTAMIENTO (DISC)
export const calculateDiscScoring = (responses: Array<{mas: string, menos: string}>): DiscScoring => {
  // Clave de mapeo explícita (índices base 0)
  const factorMapping = [
    // Q1-Q10: a(D), b(I), c(S), d(C)
    { a: 'D', b: 'I', c: 'S', d: 'C' }, // Q1
    { a: 'D', b: 'I', c: 'S', d: 'C' }, // Q2
    { a: 'D', b: 'I', c: 'S', d: 'C' }, // Q3
    { a: 'D', b: 'I', c: 'S', d: 'C' }, // Q4
    { a: 'D', b: 'I', c: 'S', d: 'C' }, // Q5
    { a: 'D', b: 'I', c: 'S', d: 'C' }, // Q6
    { a: 'D', b: 'I', c: 'S', d: 'C' }, // Q7
    { a: 'D', b: 'I', c: 'S', d: 'C' }, // Q8
    { a: 'D', b: 'I', c: 'S', d: 'C' }, // Q9
    { a: 'D', b: 'I', c: 'S', d: 'C' }, // Q10
    // Q11-Q20: a(C), b(D), c(S), d(I)
    { a: 'C', b: 'D', c: 'S', d: 'I' }, // Q11
    { a: 'S', b: 'D', c: 'C', d: 'I' }, // Q12
    { a: 'C', b: 'D', c: 'S', d: 'I' }, // Q13
    { a: 'C', b: 'D', c: 'S', d: 'I' }, // Q14
    { a: 'C', b: 'D', c: 'S', d: 'I' }, // Q15
    { a: 'C', b: 'D', c: 'S', d: 'I' }, // Q16
    { a: 'C', b: 'D', c: 'S', d: 'I' }, // Q17
    { a: 'C', b: 'D', c: 'S', d: 'I' }, // Q18
    { a: 'C', b: 'D', c: 'S', d: 'I' }, // Q19
    { a: 'C', b: 'D', c: 'S', d: 'I' }  // Q20
  ];

  // Inicializar contadores
  const scores = { D: 0, I: 0, S: 0, C: 0 };

  // Procesar cada respuesta
  responses.forEach((response, index) => {
    if (index < factorMapping.length) {
      const mapping = factorMapping[index];
      
      // Sumar +1 al factor de la palabra "Más"
      if (response.mas && mapping[response.mas as keyof typeof mapping]) {
        const factor = mapping[response.mas as keyof typeof mapping] as keyof typeof scores;
        scores[factor] += 1;
      }
      
      // Restar -1 al factor de la palabra "Menos"
      if (response.menos && mapping[response.menos as keyof typeof mapping]) {
        const factor = mapping[response.menos as keyof typeof mapping] as keyof typeof scores;
        scores[factor] -= 1;
      }
    }
  });

  // Determinar perfil primario (factor con mayor puntuación)
  const perfiles = { D: 'Dominante', I: 'Influyente', S: 'Estable', C: 'Conforme' };
  const factorPrimario = Object.entries(scores).reduce((max, current) => 
    current[1] > max[1] ? current : max
  )[0] as keyof typeof scores;

  return {
    scoreD: scores.D,
    scoreI: scores.I,
    scoreS: scores.S,
    scoreC: scores.C,
    perfilPrimario: perfiles[factorPrimario]
  };
};

// MÓDULO 4: APTITUDES COGNITIVAS (IQ)
export const calculateCognitiveScoring = (responses: string[]): CognitiveScoring => {
  // Clave de respuestas correctas
  const correctAnswers = [
    '38',                           // Q1
    'aire',                         // Q2
    'capital',                      // Q3
    '12',                          // Q4
    'triangulo',                   // Q5
    'pesimista',                   // Q6
    '5_minutos',                   // Q7
    'tiene_titulo',                // Q8
    'patata',                      // Q9
    '150',                         // Q10
    'tornillo',                    // Q11
    'D4',                          // Q12
    '90_km',                       // Q13
    'pentagono',                   // Q14
    'convencer',                   // Q15
    '8',                           // Q16
    'jueves',                      // Q17
    '27',                          // Q18
    'temporal',                    // Q19
    'menor'                        // Q20
  ];

  // Calcular aciertos
  let aciertos = 0;
  for (let i = 0; i < Math.min(responses.length, correctAnswers.length); i++) {
    if (responses[i]?.toLowerCase() === correctAnswers[i].toLowerCase()) {
      aciertos++;
    }
  }

  // Tabla de baremos (conversión)
  const conversionTable: Record<number, { iq: number; percentil: number }> = {
    20: { iq: 130, percentil: 98 },
    19: { iq: 125, percentil: 95 },
    18: { iq: 125, percentil: 95 },
    17: { iq: 120, percentil: 91 },
    16: { iq: 120, percentil: 91 },
    15: { iq: 115, percentil: 84 },
    14: { iq: 115, percentil: 84 },
    13: { iq: 110, percentil: 75 },
    12: { iq: 110, percentil: 75 },
    11: { iq: 110, percentil: 75 },
    10: { iq: 100, percentil: 50 },
    9: { iq: 100, percentil: 50 },
    8: { iq: 90, percentil: 25 },
    7: { iq: 90, percentil: 25 },
    6: { iq: 90, percentil: 25 },
    5: { iq: 85, percentil: 16 },
    4: { iq: 85, percentil: 16 },
    3: { iq: 79, percentil: 9 },
    2: { iq: 79, percentil: 9 },
    1: { iq: 70, percentil: 2 },
    0: { iq: 70, percentil: 2 }
  };

  const result = conversionTable[aciertos] || { iq: 70, percentil: 2 };

  return {
    aciertos,
    totalPreguntas: correctAnswers.length,
    iqEstimado: result.iq,
    percentil: result.percentil
  };
};

// MÓDULO 5: JUICIO ÉTICO
export const calculateEthicalScoring = (responses: string[]): EthicalScoring => {
  // Clave de puntuación de dilemas
  const dilemmaScoring: Record<string, Record<string, number>> = {
    'dilema1': { 'A': -1, 'B': 2, 'C': 1, 'D': 1 },      // Competencia
    'dilema2': { 'A': 2, 'B': 1, 'C': -2, 'D': 1 },      // Nepotismo
    'dilema3': { 'A': 2, 'B': -2, 'C': 1, 'D': -1 },     // Info. Privilegiada
    'dilema4': { 'A': -1, 'B': 2, 'C': -2, 'D': 1 },     // Autoridad
    'dilema5': { 'A': 1, 'B': -2, 'C': 1, 'D': 2 },      // Cliente
    'dilema6': { 'A': -2, 'B': 1, 'C': 2, 'D': -1 },     // Calidad
    'dilema7': { 'A': 2, 'B': -2, 'C': 1, 'D': 1 },      // Inclusión
    'dilema8': { 'A': -1, 'B': 2, 'C': 1, 'D': 1 },      // Responsabilidad
    'dilema9': { 'A': 1, 'B': 2, 'C': 1, 'D': -2 },      // Sostenibilidad
    'dilema10': { 'A': -1, 'B': 2, 'C': -2, 'D': 1 }     // Fair Play
  };

  // Etiquetas de competencias por opción
  const competencyLabels: Record<string, Record<string, string[]>> = {
    'dilema1': { 
      'A': ['Evasión'], 'B': ['Transparencia', 'Responsabilidad'], 
      'C': ['Solución Parcial'], 'D': ['Solución Parcial'] 
    },
    'dilema2': { 
      'A': ['Equidad', 'Integridad'], 'B': ['Transparencia Parcial'], 
      'C': ['Conflicto de Interés'], 'D': ['Solución Evasiva'] 
    },
    'dilema3': { 
      'A': ['Cumplimiento', 'Confidencialidad'], 'B': ['Ruptura de Confidencialidad'], 
      'C': ['Proactividad Ética'], 'D': ['Riesgo Ético'] 
    },
    'dilema4': { 
      'A': ['Alto Riesgo'], 'B': ['Coraje Moral', 'Cumplimiento'], 
      'C': ['Evasión', 'Complicidad Pasiva'], 'D': ['Prudencia', 'Responsabilidad'] 
    },
    'dilema5': { 
      'A': ['Cumplimiento de Reglas'], 'B': ['Baja Integridad'], 
      'C': ['Diligencia'], 'D': ['Integridad', 'Solución Constructiva'] 
    },
    'dilema6': { 
      'A': ['Baja Integridad', 'Riesgo'], 'B': ['Responsabilidad'], 
      'C': ['Transparencia', 'Responsabilidad'], 'D': ['Pragmatismo Riesgoso'] 
    },
    'dilema7': { 
      'A': ['Coraje Moral', 'Constructivo'], 'B': ['Evasión', 'Pasividad'], 
      'C': ['Acción Indirecta'], 'D': ['Cumplimiento Formal'] 
    },
    'dilema8': { 
      'A': ['Alto Riesgo Personal'], 'B': ['Responsabilidad', 'Cumplimiento'], 
      'C': ['Apoyo Interpersonal'], 'D': ['Prudencia'] 
    },
    'dilema9': { 
      'A': ['Cumplimiento'], 'B': ['Proactividad', 'Solución Constructiva'], 
      'C': ['Enfoque de Negocio'], 'D': ['Evasión', 'Complicidad Pasiva'] 
    },
    'dilema10': { 
      'A': ['Ética Cuestionable'], 'B': ['Integridad', 'Fair Play'], 
      'C': ['Comportamiento Anticompetitivo'], 'D': ['Diligencia'] 
    }
  };

  let totalPoints = 0;
  const competencyCount: Record<string, number> = {};

  // Procesar cada respuesta
  responses.forEach((response, index) => {
    const dilemmaKey = `dilema${index + 1}`;
    const scoring = dilemmaScoring[dilemmaKey];
    const labels = competencyLabels[dilemmaKey];

    if (scoring && labels && response) {
      const points = scoring[response.toUpperCase()] || 0;
      totalPoints += points;

      // Contar competencias
      const competencies = labels[response.toUpperCase()] || [];
      competencies.forEach(comp => {
        competencyCount[comp] = (competencyCount[comp] || 0) + 1;
      });
    }
  });

  // Calcular índice de integridad
  const indiceIntegridad = Math.round(((totalPoints + 30) / 60) * 10 * 10) / 10;

  // Determinar diagnóstico
  let diagnostico: string;
  if (indiceIntegridad >= 8.0) {
    diagnostico = 'Juicio Ético Sólido';
  } else if (indiceIntegridad >= 6.0) {
    diagnostico = 'Marco Ético Moderado';
  } else if (indiceIntegridad >= 4.0) {
    diagnostico = 'Requiere Desarrollo Ético';
  } else {
    diagnostico = 'Área Crítica - Intervención Requerida';
  }

  // Identificar las 3 competencias más frecuentes
  const competenciasClave = Object.entries(competencyCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([comp]) => comp);

  return {
    indiceIntegridad,
    diagnostico,
    competenciasClave
  };
};