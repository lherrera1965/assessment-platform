import { AssessmentData, AnswerSet, UserData, EthicalDilemmaAnswer, EthicalDilemma } from '../types';

export const generateAssessmentReport = (assessmentData: AssessmentData): string => {
  const report = `
# Reporte de Assessment - ${assessmentData.personalData.firstName} ${assessmentData.personalData.lastName}

## Información Personal
- **Nombre:** ${assessmentData.personalData.firstName} ${assessmentData.personalData.lastName}
- **Email:** ${assessmentData.personalData.email}
- **Teléfono:** ${assessmentData.personalData.phone}
- **Posición:** ${assessmentData.personalData.position}
- **Empresa:** ${assessmentData.personalData.company}

## Perfil Profesional
- **Experiencia:** ${assessmentData.professionalProfile.experience}
- **Industria:** ${assessmentData.professionalProfile.industry}
- **Tamaño de Equipo:** ${assessmentData.professionalProfile.teamSize}
- **Experiencia en Liderazgo:** ${assessmentData.professionalProfile.leadership ? 'Sí' : 'No'}

## Resultados de Liderazgo
${JSON.stringify(assessmentData.leadershipResults, null, 2)}

## Resultados de Dilemas Éticos
${JSON.stringify(assessmentData.ethicalResults, null, 2)}

## Información del Assessment
- **ID:** ${assessmentData.id}
- **Fecha de Creación:** ${new Date(assessmentData.createdAt).toLocaleDateString('es-ES')}
- **Fecha de Finalización:** ${assessmentData.completedAt ? new Date(assessmentData.completedAt).toLocaleDateString('es-ES') : 'En progreso'}
  `;

  return report.trim();
};

export const generatePDFContent = (assessmentData: AssessmentData): string => {
  // Esta función generará contenido listo para PDF
  return generateAssessmentReport(assessmentData);
};

export const calculateLeadershipScore = (results: any): number => {
  // Implementar lógica de cálculo de puntaje de liderazgo
  return 0;
};

export const calculateEthicalScore = (results: any): number => {
  // Implementar lógica de cálculo de puntaje ético
  return 0;
}

export const generateSituationalReport = async (answers: AnswerSet, userData: UserData): Promise<string> => {
  const report = `
# Reporte de Liderazgo Situacional

## Participante
- **Nombre:** ${userData.name}
- **Email:** ${userData.email}
- **Empresa:** ${userData.company}
- **Cargo:** ${userData.position}
  `;

  return report.trim();
};

export const generateHoganReport = async (answers: AnswerSet, userData: UserData): Promise<string> => {
  const report = `
# Reporte de Estilo Hogan

## Participante
- **Nombre:** ${userData.name}
- **Email:** ${userData.email}
- **Empresa:** ${userData.company}
- **Cargo:** ${userData.position}
  `;

  return report.trim();
};

export const generateDiscReport = async (answers: AnswerSet, userData: UserData): Promise<string> => {
  const report = `
# Reporte DISC

## Participante
- **Nombre:** ${userData.name}
- **Email:** ${userData.email}
- **Empresa:** ${userData.company}
- **Cargo:** ${userData.position}
  `;

  return report.trim();
};

export const generateCognitiveReport = async (answers: AnswerSet, userData: UserData): Promise<string> => {
  const report = `
# Reporte de Habilidades Cognitivas

## Participante
- **Nombre:** ${userData.name}
- **Email:** ${userData.email}
- **Empresa:** ${userData.company}
- **Cargo:** ${userData.position}
  `;

  return report.trim();
};

export const generateEthicalReport = async (answers: Record<string, EthicalDilemmaAnswer>, userData: UserData, dilemmas: EthicalDilemma[]): Promise<string> => {
  const report = `
# Reporte de Dilemas Éticos

## Participante
- **Nombre:** ${userData.name}
- **Email:** ${userData.email}
- **Empresa:** ${userData.company}
- **Cargo:** ${userData.position}
  `;

  return report.trim();
};