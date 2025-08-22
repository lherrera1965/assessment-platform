import { GoogleGenerativeAI } from '@google/generative-ai';
import { UserData, AnswerSet, EthicalDilemmaAnswer, EthicalDilemma } from '../types';
import { 
  calculateSituationalScoring,
  calculateHoganScoring,
  calculateDiscScoring,
  calculateCognitiveScoring,
  calculateEthicalScoring
} from './scoringEngine';

export interface AssessmentAnalysis {
  executiveSummary: string;
  leadershipProfile: string;
  cognitiveAssessment: string;
  personalityInsights: string;
  ethicalFramework: string;
  developmentRecommendations: string;
  strengths: string[];
  areasForGrowth: string[];
  careerSuggestions: string;
  analysisType: 'real' | 'mock';
}

export interface DetailedReport {
  modulo1_sintesis_ejecutiva: string;
  modulo2_liderazgo_situacional: {
    tarjetas: {
      precision_diagnostica: string;
      perfil_estilos: string;
    };
    analisis_narrativo: string;
  };
  modulo3_hogan: {
    tarjetas: string[];
    analisis_narrativo: string;
  };
  modulo4_disc: {
    tarjeta_perfil: string;
    caracteristicas: string[];
    analisis_narrativo: string;
  };
  modulo5_cognitivo: {
    tarjeta_iq: string;
    desglose_habilidades: string[];
    analisis_narrativo: string;
  };
  modulo6_etico: {
    tarjeta_integridad: string;
    analisis_narrativo: string;
  };
}

export interface CSVRow {
  id_assessment: string;
  fecha_assessment: string;
  nombre_evaluado: string;
  email_evaluado: string;
  puesto_evaluado: string;
  empresa_evaluado: string;
  liderazgo_precision_pct: number;
  liderazgo_estilo_preferente: string;
  hogan_riesgo_general: string;
  hogan_riesgo_principal_1: string;
  hogan_riesgo_principal_2: string;
  disc_perfil_primario: string;
  disc_score_d: number;
  disc_score_i: number;
  disc_score_s: number;
  disc_score_c: number;
  cognitivo_iq_estimado: number;
  cognitivo_percentil: number;
  etica_indice_integridad: number;
  etica_diagnostico: string;
}

// Función para obtener el perfil DISC primario
export const getPrimaryDiscProfile = (discAnswers: AnswerSet): string => {
  const scores = { D: 0, I: 0, S: 0, C: 0 };
  
  // Mapeo simplificado de respuestas a factores DISC
  Object.values(discAnswers).forEach(answer => {
    const value = answer.toLowerCase();
    if (value.includes('decisivo') || value.includes('directo') || value.includes('dominante') || value.includes('competitivo')) {
      scores.D++;
    } else if (value.includes('animado') || value.includes('sociable') || value.includes('entusiasta') || value.includes('comunicativo')) {
      scores.I++;
    } else if (value.includes('adaptable') || value.includes('paciente') || value.includes('estable') || value.includes('cooperador')) {
      scores.S++;
    } else if (value.includes('analitico') || value.includes('preciso') || value.includes('sistematico') || value.includes('cuidadoso')) {
      scores.C++;
    }
  });
  
  const maxScore = Math.max(scores.D, scores.I, scores.S, scores.C);
  return Object.keys(scores).find(key => scores[key as keyof typeof scores] === maxScore) || 'D';
};

// Función principal para generar análisis con IA
export const generateAssessmentAnalysis = async (
  userData: UserData,
  situationalAnswers: AnswerSet,
  hoganAnswers: AnswerSet,
  discAnswers: AnswerSet,
  cognitiveAnswers: AnswerSet,
  ethicalAnswers: Record<string, EthicalDilemmaAnswer>,
  ethicalDilemmas: EthicalDilemma[]
): Promise<AssessmentAnalysis> => {
  console.log('🤖 Iniciando análisis con IA...');
  
  // Verificar configuración de API
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.error('❌ VITE_GEMINI_API_KEY no está configurada');
    console.warn('⚠️ API key de Gemini no configurada, usando análisis mock');
    return generateMockAnalysisFromData(userData, situationalAnswers, hoganAnswers, discAnswers, cognitiveAnswers, ethicalAnswers);
  }

  try {
    console.log('🔑 API Key encontrada, inicializando Gemini...');
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Preparar datos para el análisis
    const primaryDiscProfile = getPrimaryDiscProfile(discAnswers);
    
    // Calcular estadísticas básicas
    const totalSituationalAnswers = Object.keys(situationalAnswers).length;
    const totalHoganAnswers = Object.keys(hoganAnswers).length;
    const totalDiscAnswers = Object.keys(discAnswers).length;
    const totalCognitiveAnswers = Object.keys(cognitiveAnswers).length;
    const totalEthicalAnswers = Object.keys(ethicalAnswers).length;

    console.log('📊 Estadísticas de respuestas:', {
      situacional: totalSituationalAnswers,
      hogan: totalHoganAnswers,
      disc: totalDiscAnswers,
      cognitivo: totalCognitiveAnswers,
      etico: totalEthicalAnswers
    });

    // Crear prompt estructurado para el análisis
    const prompt = `
SISTEMA EXPERTO EN PSICOMETRÍA ORGANIZACIONAL

DIRECTIVA: Genera un reporte de assessment integral siguiendo la estructura y principios establecidos.

ESTRUCTURA DEL REPORTE:
1. Síntesis Ejecutiva y Veredicto Estratégico (al inicio)
2. Análisis Detallado por Módulos (1-5)
3. Plan de Desarrollo Integral

DATOS DEL PARTICIPANTE:
- Nombre: ${userData.name}
- Cargo: ${userData.position}
- Empresa: ${userData.company}
- Departamento: ${userData.department}
- Fortalezas declaradas: ${userData.strengths}
- Áreas de oportunidad: ${userData.opportunities}
- Logros: ${userData.achievements}
- Metas: ${userData.goals}

DATOS PSICOMÉTRICOS RECOPILADOS:

MÓDULO 1 - LIDERAZGO SITUACIONAL (${totalSituationalAnswers} respuestas):
Propósito: Evaluar agilidad de liderazgo para adaptar enfoque a necesidades del equipo
${JSON.stringify(situationalAnswers, null, 2)}

MÓDULO 2 - PERFIL DE RIESGOS Y COMPETENCIAS HOGAN (${totalHoganAnswers} respuestas):
Propósito: Evaluar reputación profesional y predecir comportamiento bajo presión
${JSON.stringify(hoganAnswers, null, 2)}

MÓDULO 3 - PERFIL DE COMPORTAMIENTO PROFESIONAL DISC (${totalDiscAnswers} respuestas):
Propósito: Decodificar preferencias conductuales y estilo de comunicación
${JSON.stringify(discAnswers, null, 2)}
Perfil primario identificado: ${primaryDiscProfile}

MÓDULO 4 - EVALUACIÓN DE APTITUDES COGNITIVAS (${totalCognitiveAnswers} respuestas):
Propósito: Medir capacidad de procesamiento de información y resolución de problemas
${JSON.stringify(cognitiveAnswers, null, 2)}

MÓDULO 5 - DIAGNÓSTICO DE JUICIO ÉTICO (${totalEthicalAnswers} respuestas):
Propósito: Evaluar marco de toma de decisiones éticas para mitigar riesgos
${JSON.stringify(ethicalAnswers, null, 2)}

INSTRUCCIONES DE GENERACIÓN:

MÓDULO 6 - SÍNTESIS EJECUTIVA (Para colocar al inicio del reporte):
- Perfil Estratégico: Párrafo que construye la narrativa integrada del candidato
- Capital de Talento: Fortalezas como activos de negocio
- Factores de Riesgo: Debilidades y puntos ciegos como riesgos a mitigar
- Veredicto y Plan de Acción: Recomendación clara con plan de desarrollo

ANÁLISIS DETALLADO POR MÓDULOS:

1. LIDERAZGO SITUACIONAL: Diagnóstico de flexibilidad del líder. Conectar con perfil DISC para resaltar madurez profesional. Guía para aplicar fortalezas en desarrollo de talento.

2. PERFIL HOGAN: Describir estilo de trabajo habitual (Lado Brillante). Identificar 2-3 riesgos más altos (Lado Oscuro) y su impacto potencial. Si faltan datos, explicar el punto ciego.

3. PERFIL DISC: Identificar perfil primario y secundario. Describir "modus operandi", estilo de comunicación, motivadores y puntos de fricción con otros estilos.

4. APTITUDES COGNITIVAS: Contextualizar capacidad cognitiva en relación al rol. Analizar perfil cognitivo destacando fortalezas específicas y su implicación práctica.

5. JUICIO ÉTICO: Diagnosticar marco ético del individuo. Presentar análisis con estructura: proceso de razonamiento y resolución.

PLAN DE DESARROLLO INTEGRAL: Resumen final de recomendaciones accionables.

PRINCIPIOS DE REDACCIÓN:
- Lenguaje ejecutivo y estratégico
- Enfoque en aplicación práctica
- Integración de todos los módulos
- Recomendaciones específicas y accionables
- Formato profesional y consultivo

FORMATO DE RESPUESTA - JSON válido con esta estructura exacta:
{
  "executiveSummary": "...",
  "leadershipProfile": "...",
  "cognitiveAssessment": "...",
  "personalityInsights": "...",
  "ethicalFramework": "...",
  "developmentRecommendations": "...",
  "strengths": ["...", "...", "..."],
  "areasForGrowth": ["...", "...", "..."],
  "careerSuggestions": "...",
  "analysisType": "real"
}
`;

    console.log('📤 Enviando prompt a Gemini...');
    
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      console.log('📥 Respuesta recibida de Gemini:', text.substring(0, 200) + '...');

      // Limpiar la respuesta para extraer solo el JSON
      let cleanedText = text.trim();
      
      // Remover markdown code blocks si existen
      if (cleanedText.startsWith('```json')) {
        cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanedText.startsWith('```')) {
        cleanedText = cleanedText.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }

      try {
        const analysis = JSON.parse(cleanedText);
        console.log('✅ Análisis de IA parseado exitosamente');
        return {
          ...analysis,
          analysisType: 'real' as const
        };
      } catch (parseError) {
        console.error('❌ Error parseando respuesta de IA:', parseError);
        console.error('📄 Respuesta completa:', text);
        console.warn('⚠️ Fallback a análisis mock debido a error de parsing');
        return generateMockAnalysisFromData(userData, situationalAnswers, hoganAnswers, discAnswers, cognitiveAnswers, ethicalAnswers);
      }
      
    } catch (apiError: any) {
      console.error('❌ Error de API de Gemini:', apiError);
      console.warn('⚠️ Fallback a análisis mock debido a error de API');
      throw new Error('Gemini API error: ' + apiError.message);
    }

  } catch (error) {
    console.error('❌ Error completo en generateAssessmentAnalysis:', error);
    console.warn('⚠️ Fallback a análisis mock debido a error');
    throw error;
  }
};

// Función helper para generar análisis mock cuando falla la IA
const generateMockAnalysisFromData = (
  userData: UserData,
  situationalAnswers: AnswerSet,
  hoganAnswers: AnswerSet,
  discAnswers: AnswerSet,
  cognitiveAnswers: AnswerSet,
  ethicalAnswers: Record<string, EthicalDilemmaAnswer>
): AssessmentAnalysis => {
  return {
    executiveSummary: `⚠️ ANÁLISIS NO DISPONIBLE: No se cuenta con la información necesaria para generar un análisis personalizado de ${userData.name || 'este evaluado'}. Se requiere configuración del sistema de análisis de IA para obtener insights profesionales.`,
    leadershipProfile: `⚠️ PERFIL DE LIDERAZGO NO DISPONIBLE: No se puede determinar el perfil de liderazgo sin el sistema de análisis configurado. Los datos de respuestas están disponibles pero requieren procesamiento especializado.`,
    cognitiveAssessment: `⚠️ EVALUACIÓN COGNITIVA NO DISPONIBLE: No se puede calcular la capacidad cognitiva sin el sistema de análisis configurado. Se requiere procesamiento especializado de las respuestas.`,
    personalityInsights: `⚠️ INSIGHTS DE PERSONALIDAD NO DISPONIBLES: No se pueden generar insights de personalidad sin el sistema de análisis configurado. Los datos DISC requieren interpretación especializada.`,
    ethicalFramework: `⚠️ MARCO ÉTICO NO DISPONIBLE: No se puede evaluar el marco ético sin el sistema de análisis configurado. Las respuestas a dilemas éticos requieren análisis especializado.`,
    developmentRecommendations: `⚠️ RECOMENDACIONES NO DISPONIBLES: No se pueden generar recomendaciones de desarrollo sin análisis completo. Se requiere configuración del sistema de IA para obtener sugerencias personalizadas.`,
    strengths: [
      '⚠️ Fortalezas no identificadas - Sistema de análisis no disponible',
      '⚠️ Se requiere configuración de IA para análisis personalizado',
      '⚠️ Datos disponibles pero sin procesamiento especializado'
    ],
    areasForGrowth: [
      '⚠️ Áreas de crecimiento no identificadas - Sistema de análisis no disponible',
      '⚠️ Se requiere configuración de IA para recomendaciones',
      '⚠️ Análisis especializado necesario para insights precisos'
    ],
    careerSuggestions: `⚠️ SUGERENCIAS DE CARRERA NO DISPONIBLES: No se pueden generar sugerencias de carrera sin análisis completo del perfil. Se requiere configuración del sistema de análisis de IA.`,
    analysisType: 'mock' as const
  };
};

// Sistema Maestro de Análisis y Generación de Reportes
export const generateMasterAnalysis = (
  assessmentId: string,
  userData: UserData,
  situationalAnswers: AnswerSet,
  hoganAnswers: AnswerSet,
  discAnswers: AnswerSet,
  cognitiveAnswers: AnswerSet,
  ethicalAnswers: Record<string, EthicalDilemmaAnswer>
): { reporte_individual: DetailedReport; fila_csv: CSVRow } => {

  // USAR MOTOR DE CALIFICACIÓN PARA ANÁLISIS PRECISO
  
  // Convertir respuestas situacionales a array
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
  
  const situationalScoring = calculateSituationalScoring(situationalResponses);
  const precisionPct = situationalScoring.precisionDiagnosticaPct;

  const situationalStyles = Object.values(situationalAnswers);
  const dirigirCount = situationalStyles.filter(s => s === 'dirigir').length;
  const entrenarCount = situationalStyles.filter(s => s === 'entrenar').length;
  const apoyarCount = situationalStyles.filter(s => s === 'apoyar').length;
  const delegarCount = situationalStyles.filter(s => s === 'delegar').length;

  const estilosOrdenados = [
    { estilo: 'Directivo', count: dirigirCount },
    { estilo: 'Entrenador', count: entrenarCount },
    { estilo: 'Colaborativo', count: apoyarCount },
    { estilo: 'Delegativo', count: delegarCount }
  ].sort((a, b) => b.count - a.count);

  const estiloPreferente = estilosOrdenados[0].estilo;

  // Convertir respuestas Hogan a array numérico
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
  
  const hoganScoring = calculateHoganScoring(hoganResponses);
  const riskAreas = Object.entries(hoganScoring)
    .filter(([_, data]) => data.riesgo === 'Moderado' || data.riesgo === 'Alto')
    .map(([name, data]) => ({ name, score: data.score, level: data.riesgo.toUpperCase() }))
    .sort((a, b) => {
      if (a.level === 'ALTO' && b.level === 'MODERADO') return -1;
      if (a.level === 'MODERADO' && b.level === 'ALTO') return 1;
      return b.score - a.score;
    });

  const highRiskCount = Object.values(hoganScoring).filter(s => s.riesgo === 'Alto').length;
  const moderateRiskCount = Object.values(hoganScoring).filter(s => s.riesgo === 'Moderado').length;
  
  let generalRiskLevel = '';
  if (highRiskCount >= 3) generalRiskLevel = 'Alto';
  else if (highRiskCount >= 1 || moderateRiskCount >= 4) generalRiskLevel = 'Moderado';
  else if (moderateRiskCount >= 1) generalRiskLevel = 'Bajo-Moderado';
  else generalRiskLevel = 'Bajo';

  // Convertir respuestas DISC a formato requerido
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
  
  const discScoring = calculateDiscScoring(discResponses);
  const discPrimario = discScoring.perfilPrimario;

  // Convertir respuestas cognitivas a array
  const cognitiveResponses = Object.keys(cognitiveAnswers)
    .sort()
    .map(key => cognitiveAnswers[key]);
  
  const cognitiveScoring = calculateCognitiveScoring(cognitiveResponses);
  const estimatedIQ = cognitiveScoring.iqEstimado;
  const percentile = cognitiveScoring.percentil;

  // Convertir respuestas éticas a array
  const ethicalResponses = Object.keys(ethicalAnswers)
    .sort()
    .map(key => ethicalAnswers[key].mainAnswer || 'A');
  
  const ethicalScoring = calculateEthicalScoring(ethicalResponses);
  const integrityIndex = ethicalScoring.indiceIntegridad;
  
  let ethicalDiagnostic = '';
  if (integrityIndex >= 8.0) ethicalDiagnostic = ethicalScoring.diagnostico;
  else if (integrityIndex >= 6.0) ethicalDiagnostic = ethicalScoring.diagnostico;
  else if (integrityIndex >= 4.0) ethicalDiagnostic = ethicalScoring.diagnostico;
  else ethicalDiagnostic = ethicalScoring.diagnostico;

  // GENERAR REPORTE INDIVIDUAL
  const reporte_individual: DetailedReport = {
    modulo1_sintesis_ejecutiva: `SÍNTESIS EJECUTIVA Y VEREDICTO ESTRATÉGICO

${userData.name} presenta un perfil de liderazgo con ${precisionPct}% de precisión diagnóstica situacional y un estilo preferente ${estiloPreferente}. Su capacidad cognitiva estimada (IQ ${estimatedIQ}, Percentil ${percentile}) ${estimatedIQ >= 100 ? 'está dentro del rango esperado' : 'requiere consideración adicional'} para roles ejecutivos.

El análisis de riesgos Hogan indica un nivel ${generalRiskLevel} que ${generalRiskLevel === 'Alto' ? 'requiere intervención inmediata' : generalRiskLevel === 'Moderado' ? 'necesita supervisión adicional' : 'presenta un perfil favorable'}. Su perfil DISC ${discPrimario} sugiere un enfoque natural hacia ${primaryDiscFactor === 'D' ? 'resultados y acción rápida' : primaryDiscFactor === 'I' ? 'comunicación y relaciones' : primaryDiscFactor === 'S' ? 'colaboración y estabilidad' : 'precisión y análisis'}.

El índice de integridad ética de ${integrityIndex}/10 indica un marco ético ${ethicalDiagnostic.toLowerCase()} que ${integrityIndex >= 7 ? 'respalda la confianza en roles de alta responsabilidad' : 'requiere atención en el desarrollo de competencias éticas'}.`,

    modulo2_liderazgo_situacional: {
      tarjetas: {
        precision_diagnostica: `ÍNDICE DE PRECISIÓN DIAGNÓSTICA: ${precisionPct}%
Diagnóstico: ${precisionPct > 80 ? 'Muy Alta Precisión' : precisionPct >= 60 ? 'Precisión Sólida' : precisionPct >= 40 ? 'Precisión Moderada' : 'Área de Oportunidad'}`,
        perfil_estilos: `PERFIL DE ESTILOS PREFERENTES:
S1-Dirigir: ${dirigirCount} veces | S2-Entrenar: ${entrenarCount} veces
S3-Apoyar: ${apoyarCount} veces | S4-Delegar: ${delegarCount} veces
Estilo Preferente: ${estiloPreferente}`
      },
      analisis_narrativo: `El evaluado demuestra una capacidad ${precisionPct > 80 ? 'excepcional' : precisionPct >= 60 ? 'sólida' : precisionPct >= 40 ? 'moderada' : 'limitada'} para diagnosticar las necesidades del equipo y aplicar el estilo de liderazgo más efectivo. Su preferencia natural por el estilo ${estiloPreferente} indica una tendencia hacia ${estiloPreferente === 'Directivo' ? 'la instrucción directa y supervisión estructurada' : estiloPreferente === 'Entrenador' ? 'el coaching y desarrollo de competencias' : estiloPreferente === 'Colaborativo' ? 'la colaboración y facilitación de equipos' : 'la delegación y empoderamiento de colaboradores'}.`
    },

    modulo3_hogan: {
      tarjetas: riskAreas.length > 0 ? riskAreas.map(area => 
        `RIESGO ${area.level}: ${area.name}
Puntuación: ${area.score.toFixed(1)}/5.0
Impacto: ${area.level === 'ALTO' ? 'Requiere gestión activa inmediata' : 'Área que necesita atención y desarrollo'}`
      ) : ['PERFIL DE BAJO RIESGO: Todas las escalas muestran niveles saludables. No se identificaron áreas de riesgo significativo.'],
      analisis_narrativo: riskAreas.length > 0 ? 
        `El análisis del perfil de riesgos indica ${riskAreas.length} área${riskAreas.length > 1 ? 's' : ''} que requiere${riskAreas.length > 1 ? 'n' : ''} atención. El riesgo más significativo se encuentra en ${riskAreas[0]?.name}, lo que sugiere que bajo presión podría manifestar comportamientos que afecten el desempeño del equipo.` :
        `El evaluado presenta un perfil de riesgo muy favorable. Todas las escalas muestran niveles saludables, indicando alta probabilidad de mantener un desempeño efectivo incluso bajo presión.`
    },

    modulo4_disc: {
      tarjeta_perfil: `PERFIL DE COMPORTAMIENTO DISC
Perfil Primario: ${discPrimario} (${primaryDiscFactor})
Scores Finales: D:${discScores.D}, I:${discScores.I}, S:${discScores.S}, C:${discScores.C}`,
      caracteristicas: [
        `Enfoque: ${primaryDiscFactor === 'D' ? 'los resultados y la acción rápida' : primaryDiscFactor === 'I' ? 'la comunicación, la persuasión y las relaciones interpersonales' : primaryDiscFactor === 'S' ? 'la colaboración, la estabilidad y el apoyo a los demás' : 'la precisión, la calidad y el análisis basado en datos'}`,
        `Aporta al equipo: ${primaryDiscFactor === 'D' ? 'dirección, decisión y un alto sentido de urgencia' : primaryDiscFactor === 'I' ? 'entusiasmo, optimismo y la capacidad de generar cohesión' : primaryDiscFactor === 'S' ? 'lealtad, fiabilidad y un ritmo de trabajo constante' : 'orden, altos estándares y un enfoque metódico'}`,
        `Motivadores: ${primaryDiscFactor === 'D' ? 'el control, los retos y la competencia' : primaryDiscFactor === 'I' ? 'el reconocimiento, la interacción social y la variedad' : primaryDiscFactor === 'S' ? 'la seguridad, el aprecio y un entorno de trabajo predecible' : 'la exactitud, la lógica y los procedimientos claros'}`
      ],
      analisis_narrativo: `El perfil ${discPrimario} del evaluado se caracteriza por un enfoque natural hacia ${primaryDiscFactor === 'D' ? 'los resultados y la acción rápida' : primaryDiscFactor === 'I' ? 'la comunicación y las relaciones interpersonales' : primaryDiscFactor === 'S' ? 'la colaboración y la estabilidad' : 'la precisión y el análisis'}. En un entorno de equipo, su principal contribución es ${primaryDiscFactor === 'D' ? 'proporcionar dirección y decisión' : primaryDiscFactor === 'I' ? 'generar entusiasmo y cohesión' : primaryDiscFactor === 'S' ? 'ofrecer lealtad y fiabilidad' : 'mantener altos estándares y orden'}.`
    },

    modulo5_cognitivo: {
      tarjeta_iq: `EVALUACIÓN COGNITIVA
IQ Estimado: ${estimatedIQ}
Percentil: ${percentile}
Nivel: ${estimatedIQ >= 115 ? 'Superior' : estimatedIQ >= 100 ? 'Alto' : estimatedIQ >= 90 ? 'Promedio Alto' : 'Promedio'}`,
      desglose_habilidades: [
        `Aciertos totales: ${correctCognitive}/${totalCognitive} (${Math.round((correctCognitive/totalCognitive)*100)}%)`,
        `Razonamiento Lógico: Evaluado mediante secuencias numéricas`,
        `Comprensión Verbal: Evaluado mediante analogías y vocabulario`,
        `Habilidades Numéricas: Evaluado mediante cálculos y problemas matemáticos`,
        `Reconocimiento de Patrones: Evaluado mediante figuras geométricas`
      ],
      analisis_narrativo: `La capacidad cognitiva estimada de ${estimatedIQ} (Percentil ${percentile}) ${estimatedIQ >= 115 ? 'indica capacidades excepcionales que posicionan al evaluado en el rango superior de la población ejecutiva' : estimatedIQ >= 100 ? 'representa capacidades sólidas que superan el promedio poblacional' : estimatedIQ >= 90 ? 'muestra capacidades en el rango promedio alto, adecuadas para roles operativos' : 'está por debajo del benchmark ejecutivo típico y requiere consideración adicional'}. ${estimatedIQ >= 100 ? 'Excelente capacidad para liderar iniciativas complejas y análisis estratégico.' : 'Se recomienda apoyo adicional en análisis complejos y toma de decisiones estratégicas.'}`
    },

    modulo6_etico: {
      tarjeta_integridad: `${integrityIndex < 5 ? '⚠️ ALERTA ÉTICA' : 'ÍNDICE DE INTEGRIDAD'}
Puntuación: ${integrityIndex}/10
Diagnóstico: ${ethicalDiagnostic}
${integrityIndex < 5 ? 'REQUIERE ATENCIÓN INMEDIATA' : integrityIndex >= 7 ? 'Marco ético sólido' : 'Requiere desarrollo adicional'}`,
      analisis_narrativo: `El índice de integridad de ${integrityIndex}/10 indica un marco ético ${ethicalDiagnostic.toLowerCase()}. ${integrityIndex >= 7 ? 'El evaluado demuestra un sólido marco ético fundamentado en principios de responsabilidad y transparencia, con tendencia a elegir soluciones constructivas.' : integrityIndex >= 5 ? 'El evaluado muestra un enfoque ético en desarrollo que se beneficiaría de formación adicional y mentoring en toma de decisiones éticas.' : 'ALERTA CRÍTICA: Se identifican patrones preocupantes en el razonamiento ético que requieren atención inmediata y desarrollo ético intensivo.'}`
    }
  };

  // GENERAR FILA CSV
  const fila_csv: CSVRow = {
    id_assessment: assessmentId,
    fecha_assessment: new Date().toISOString().split('T')[0],
    nombre_evaluado: userData.name,
    email_evaluado: userData.email,
    puesto_evaluado: userData.position,
    empresa_evaluado: userData.company,
    liderazgo_precision_pct: precisionPct,
    liderazgo_estilo_preferente: estiloPreferente,
    hogan_riesgo_general: generalRiskLevel,
    hogan_riesgo_principal_1: riskAreas[0]?.name || 'N/A',
    hogan_riesgo_principal_2: riskAreas[1]?.name || 'N/A',
    disc_perfil_primario: discPrimario,
    disc_score_d: discScoring.scoreD,
    disc_score_i: discScoring.scoreI,
    disc_score_s: discScoring.scoreS,
    disc_score_c: discScoring.scoreC,
    cognitivo_iq_estimado: estimatedIQ,
    cognitivo_percentil: percentile,
    etica_indice_integridad: integrityIndex,
    etica_diagnostico: ethicalDiagnostic
  };

  return { reporte_individual, fila_csv };
};