import jsPDF from 'jspdf';
import { UserData, AnswerSet, EthicalDilemmaAnswer } from '../types';
import { AssessmentAnalysis } from './geminiService';

export const generateComprehensivePDF = async (
  userData: UserData,
  situationalAnswers: AnswerSet,
  hoganAnswers: AnswerSet,
  discAnswers: AnswerSet,
  cognitiveAnswers: AnswerSet,
  ethicalAnswers: Record<string, EthicalDilemmaAnswer>,
  analysis: AssessmentAnalysis
): Promise<string> => {
  const pdf = new jsPDF();
  let yPosition = 20;
  const pageHeight = pdf.internal.pageSize.height;
  const margin = 20;
  const lineHeight = 7;

  // Helper function to add text with word wrapping
  const addText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 10): number => {
    pdf.setFontSize(fontSize);
    const lines = pdf.splitTextToSize(text, maxWidth);
    pdf.text(lines, x, y);
    return y + (lines.length * lineHeight);
  };

  // Helper function to check if we need a new page
  const checkNewPage = (requiredSpace: number): number => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      pdf.addPage();
      return 20;
    }
    return yPosition;
  };

  // Title Page
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('REPORTE INTEGRAL DE EVALUACIÓN', margin, yPosition);
  yPosition += 15;

  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Análisis de Perfil Profesional', margin, yPosition);
  yPosition += 20;

  // Participant Information
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('INFORMACIÓN DEL PARTICIPANTE', margin, yPosition);
  yPosition += 10;

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  yPosition = addText(`Nombre: ${userData.name}`, margin, yPosition, 170);
  yPosition = addText(`Email: ${userData.email}`, margin, yPosition, 170);
  yPosition = addText(`Cargo: ${userData.position}`, margin, yPosition, 170);
  yPosition = addText(`Departamento: ${userData.department}`, margin, yPosition, 170);
  yPosition = addText(`Empresa: ${userData.company}`, margin, yPosition, 170);
  yPosition = addText(`Nivel Educativo: ${userData.educationLevel}`, margin, yPosition, 170);
  yPosition += 10;

  // Executive Summary
  yPosition = checkNewPage(30);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('RESUMEN EJECUTIVO', margin, yPosition);
  yPosition += 10;

  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  yPosition = addText(analysis.executiveSummary, margin, yPosition, 170, 11);
  yPosition += 15;

  // Leadership Profile
  yPosition = checkNewPage(30);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('PERFIL DE LIDERAZGO', margin, yPosition);
  yPosition += 10;

  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  yPosition = addText(analysis.leadershipProfile, margin, yPosition, 170, 11);
  yPosition += 15;

  // Cognitive Assessment
  yPosition = checkNewPage(30);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('EVALUACIÓN COGNITIVA', margin, yPosition);
  yPosition += 10;

  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  yPosition = addText(analysis.cognitiveAssessment, margin, yPosition, 170, 11);
  yPosition += 15;

  // Personality Insights
  yPosition = checkNewPage(30);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('INSIGHTS DE PERSONALIDAD', margin, yPosition);
  yPosition += 10;

  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  yPosition = addText(analysis.personalityInsights, margin, yPosition, 170, 11);
  yPosition += 15;

  // Ethical Framework
  yPosition = checkNewPage(30);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('MARCO ÉTICO', margin, yPosition);
  yPosition += 10;

  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  yPosition = addText(analysis.ethicalFramework, margin, yPosition, 170, 11);
  yPosition += 15;

  // Strengths
  yPosition = checkNewPage(40);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('FORTALEZAS CLAVE', margin, yPosition);
  yPosition += 10;

  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  analysis.strengths.forEach((strength, index) => {
    yPosition = checkNewPage(10);
    yPosition = addText(`• ${strength}`, margin, yPosition, 170, 11);
  });
  yPosition += 10;

  // Areas for Growth
  yPosition = checkNewPage(40);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('ÁREAS DE CRECIMIENTO', margin, yPosition);
  yPosition += 10;

  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  analysis.areasForGrowth.forEach((area, index) => {
    yPosition = checkNewPage(10);
    yPosition = addText(`• ${area}`, margin, yPosition, 170, 11);
  });
  yPosition += 15;

  // Development Recommendations
  yPosition = checkNewPage(30);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('RECOMENDACIONES DE DESARROLLO', margin, yPosition);
  yPosition += 10;

  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  yPosition = addText(analysis.developmentRecommendations, margin, yPosition, 170, 11);
  yPosition += 15;

  // Career Suggestions
  yPosition = checkNewPage(30);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('SUGERENCIAS DE CARRERA', margin, yPosition);
  yPosition += 10;

  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  yPosition = addText(analysis.careerSuggestions, margin, yPosition, 170, 11);
  yPosition += 20;

  // Assessment Details Section
  yPosition = checkNewPage(50);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('DETALLES DE EVALUACIÓN', margin, yPosition);
  yPosition += 15;

  // Situational Leadership Results
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Liderazgo Situacional', margin, yPosition);
  yPosition += 8;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  const situationalCount = Object.keys(situationalAnswers).length;
  yPosition = addText(`Preguntas respondidas: ${situationalCount}`, margin, yPosition, 170, 10);
  yPosition += 10;

  // Hogan Style Results
  yPosition = checkNewPage(20);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Estilo Hogan', margin, yPosition);
  yPosition += 8;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  const hoganCount = Object.keys(hoganAnswers).length;
  yPosition = addText(`Preguntas respondidas: ${hoganCount}`, margin, yPosition, 170, 10);
  yPosition += 10;

  // DISC Results
  yPosition = checkNewPage(20);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Perfil DISC', margin, yPosition);
  yPosition += 8;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  const discCount = Object.keys(discAnswers).length;
  yPosition = addText(`Preguntas respondidas: ${discCount}`, margin, yPosition, 170, 10);
  yPosition += 10;

  // Cognitive Results
  yPosition = checkNewPage(20);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Habilidades Cognitivas', margin, yPosition);
  yPosition += 8;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  const cognitiveCount = Object.keys(cognitiveAnswers).length;
  yPosition = addText(`Preguntas respondidas: ${cognitiveCount}`, margin, yPosition, 170, 10);
  yPosition += 10;

  // Ethical Dilemmas Results
  yPosition = checkNewPage(20);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Dilemas Éticos', margin, yPosition);
  yPosition += 8;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  const ethicalCount = Object.keys(ethicalAnswers).length;
  yPosition = addText(`Dilemas analizados: ${ethicalCount}`, margin, yPosition, 170, 10);
  yPosition += 15;

  // Footer
  yPosition = checkNewPage(30);
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'italic');
  pdf.text(`Reporte generado el ${new Date().toLocaleDateString('es-ES')}`, margin, yPosition);
  pdf.text('Powered by BoadMate.net - Análisis con IA', margin, yPosition + 5);

  // Return PDF as base64 string
  return pdf.output('datauristring');
};

export const downloadPDF = (pdfData: string, filename: string) => {
  const link = document.createElement('a');
  link.href = pdfData;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};