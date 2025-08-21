import { GoogleGenerativeAI } from '@google/generative-ai';
import { UserData, AnswerSet, EthicalDilemmaAnswer, EthicalDilemma } from '../types';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI: GoogleGenerativeAI | null = null;

if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY);
}

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
}

export const generateAssessmentAnalysis = async (
  userData: UserData,
  situationalAnswers: AnswerSet,
  hoganAnswers: AnswerSet,
  discAnswers: AnswerSet,
  cognitiveAnswers: AnswerSet,
  ethicalAnswers: Record<string, EthicalDilemmaAnswer>,
  ethicalDilemmas: EthicalDilemma[]
): Promise<AssessmentAnalysis> => {
  if (!genAI) {
    console.warn('Gemini API not configured, returning mock analysis');
    return generateMockAnalysis(userData);
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
Actúa como un psicólogo organizacional experto y analiza los siguientes resultados de evaluación profesional. Genera un análisis completo y profesional en español.

DATOS DEL PARTICIPANTE:
- Nombre: ${userData.name}
- Cargo: ${userData.position}
- Departamento: ${userData.department}
- Empresa: ${userData.company}
- Nivel educativo: ${userData.educationLevel}

PERFIL PROFESIONAL:
- Fortalezas: ${userData.strengths}
- Áreas de oportunidad: ${userData.opportunities}
- Logros principales: ${userData.achievements}
- Metas: ${userData.goals}

RESULTADOS DE EVALUACIONES:
1. Liderazgo Situacional: ${JSON.stringify(situationalAnswers)}
2. Estilo Hogan: ${JSON.stringify(hoganAnswers)}
3. Perfil DISC: ${JSON.stringify(discAnswers)}
4. Habilidades Cognitivas: ${JSON.stringify(cognitiveAnswers)}
5. Dilemas Éticos: ${JSON.stringify(ethicalAnswers)}

Por favor, proporciona un análisis estructurado que incluya:

1. RESUMEN EJECUTIVO (2-3 párrafos): Síntesis general del perfil profesional
2. PERFIL DE LIDERAZGO: Estilo de liderazgo predominante y características
3. EVALUACIÓN COGNITIVA: Fortalezas y patrones de pensamiento
4. INSIGHTS DE PERSONALIDAD: Características DISC y Hogan más relevantes
5. MARCO ÉTICO: Enfoque hacia la toma de decisiones éticas
6. RECOMENDACIONES DE DESARROLLO: 5-7 sugerencias específicas y accionables
7. FORTALEZAS CLAVE: Lista de 5-6 fortalezas principales
8. ÁREAS DE CRECIMIENTO: Lista de 4-5 áreas para desarrollar
9. SUGERENCIAS DE CARRERA: Direcciones profesionales recomendadas

Mantén un tono profesional, constructivo y orientado al desarrollo. Evita juicios negativos y enfócate en oportunidades de crecimiento.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysisText = response.text();

    return parseGeminiResponse(analysisText);
  } catch (error) {
    console.error('Error generating AI analysis:', error);
    return generateMockAnalysis(userData);
  }
};

const parseGeminiResponse = (text: string): AssessmentAnalysis => {
  // Parse the structured response from Gemini
  const sections = text.split(/\d+\.\s+/);
  
  return {
    executiveSummary: extractSection(text, 'RESUMEN EJECUTIVO') || 'Análisis ejecutivo no disponible.',
    leadershipProfile: extractSection(text, 'PERFIL DE LIDERAZGO') || 'Perfil de liderazgo no disponible.',
    cognitiveAssessment: extractSection(text, 'EVALUACIÓN COGNITIVA') || 'Evaluación cognitiva no disponible.',
    personalityInsights: extractSection(text, 'INSIGHTS DE PERSONALIDAD') || 'Insights de personalidad no disponibles.',
    ethicalFramework: extractSection(text, 'MARCO ÉTICO') || 'Marco ético no disponible.',
    developmentRecommendations: extractSection(text, 'RECOMENDACIONES DE DESARROLLO') || 'Recomendaciones no disponibles.',
    strengths: extractList(text, 'FORTALEZAS CLAVE') || ['Fortalezas no identificadas'],
    areasForGrowth: extractList(text, 'ÁREAS DE CRECIMIENTO') || ['Áreas de crecimiento no identificadas'],
    careerSuggestions: extractSection(text, 'SUGERENCIAS DE CARRERA') || 'Sugerencias de carrera no disponibles.'
  };
};

const extractSection = (text: string, sectionName: string): string => {
  const regex = new RegExp(`${sectionName}[:\\s]*([\\s\\S]*?)(?=\\d+\\.|$)`, 'i');
  const match = text.match(regex);
  return match ? match[1].trim() : '';
};

const extractList = (text: string, sectionName: string): string[] => {
  const section = extractSection(text, sectionName);
  if (!section) return [];
  
  const items = section.split(/[-•*]\s+/).filter(item => item.trim().length > 0);
  return items.map(item => item.trim()).slice(0, 6); // Limit to 6 items
};

const generateMockAnalysis = (userData: UserData): AssessmentAnalysis => {
  return {
    executiveSummary: `${userData.name} demuestra un perfil profesional sólido con experiencia en ${userData.department}. Su enfoque hacia el desarrollo profesional y las metas claras indican un potencial significativo para roles de mayor responsabilidad.`,
    leadershipProfile: 'Perfil de liderazgo equilibrado con tendencia hacia el liderazgo colaborativo y orientado a resultados.',
    cognitiveAssessment: 'Demuestra habilidades analíticas sólidas y capacidad de resolución de problemas complejos.',
    personalityInsights: 'Personalidad equilibrada con fortalezas en comunicación y trabajo en equipo.',
    ethicalFramework: 'Marco ético sólido con enfoque en la integridad y la responsabilidad profesional.',
    developmentRecommendations: 'Se recomienda enfocarse en el desarrollo de habilidades de liderazgo estratégico y comunicación ejecutiva.',
    strengths: ['Orientación a resultados', 'Trabajo en equipo', 'Comunicación efectiva', 'Pensamiento analítico', 'Adaptabilidad'],
    areasForGrowth: ['Liderazgo estratégico', 'Gestión del cambio', 'Comunicación ejecutiva', 'Toma de decisiones complejas'],
    careerSuggestions: 'Excelente candidato para roles de gestión media y alta, con potencial para posiciones de liderazgo estratégico.'
  };
};