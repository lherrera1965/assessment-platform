import { jsPDF } from 'jspdf';
import { UserData, AnswerSet, EthicalDilemmaAnswer } from '../types';
import { AssessmentAnalysis } from './geminiService';
import { 
  calculateSituationalScoring,
  calculateHoganScoring,
  calculateDiscScoring,
  calculateCognitiveScoring,
  calculateEthicalScoring
} from './scoringEngine';

// Función para descargar PDFs
export const downloadPDF = (base64Data: string, filename: string) => {
  try {
    let cleanBase64 = base64Data;
    if (base64Data.includes(',')) {
      cleanBase64 = base64Data.split(',')[1];
    }
    
    const byteCharacters = atob(cleanBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error al descargar PDF:', error);
    throw new Error('No se pudo descargar el archivo PDF');
  }
};

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
  
  try {
    // CONFIGURACIÓN PROFESIONAL
    pdf.setFont('helvetica');
    let yPosition = 20;
    const pageHeight = pdf.internal.pageSize.height;
    const pageWidth = pdf.internal.pageSize.width;
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    const lineHeight = 6;
    
    // COLORES CORPORATIVOS
    const colors = {
      primary: [30, 64, 175],      // Azul corporativo
      secondary: [100, 116, 139],   // Gris azulado
      success: [5, 150, 105],       // Verde
      warning: [217, 119, 6],       // Naranja
      danger: [220, 38, 38],        // Rojo
      light: [248, 250, 252],       // Gris claro
      dark: [15, 23, 42]            // Gris oscuro
    };

    // FUNCIONES HELPER
    const checkPageBreak = (requiredSpace: number = 30) => {
      if (yPosition + requiredSpace > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
        return true;
      }
      return false;
    };

    const addText = (text: string, x: number, y: number, options: any = {}) => {
      const fontSize = options.fontSize || 10;
      const color = options.color || [0, 0, 0];
      const align = options.align || 'left';
      const maxWidth = options.maxWidth || contentWidth;
      
      pdf.setFontSize(fontSize);
      pdf.setTextColor(color[0], color[1], color[2]);
      
      if (options.bold) pdf.setFont('helvetica', 'bold');
      else pdf.setFont('helvetica', 'normal');
      
      const lines = pdf.splitTextToSize(text, maxWidth);
      
      if (align === 'center') {
        lines.forEach((line: string, index: number) => {
          pdf.text(line, pageWidth / 2, y + (index * lineHeight), { align: 'center' });
        });
      } else {
        pdf.text(lines, x, y);
      }
      
      return lines.length * lineHeight;
    };

    const addSection = (title: string, content: string, options: any = {}) => {
      checkPageBreak(40);
      
      // Título de sección
      const titleHeight = addText(title, margin, yPosition, {
        fontSize: 14,
        bold: true,
        color: colors.primary
      });
      yPosition += titleHeight + 8;
      
      // Línea separadora
      pdf.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2]);
      pdf.setLineWidth(0.5);
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 10;
      
      // Contenido
      const contentHeight = addText(content, margin, yPosition, {
        fontSize: 10,
        maxWidth: contentWidth
      });
      yPosition += contentHeight + 15;
    };

    const addScoreCard = (title: string, score: string, subtitle: string, color: number[], x: number, y: number, width: number = 80, height: number = 50) => {
      // Fondo
      pdf.setFillColor(color[0], color[1], color[2], 0.1);
      pdf.rect(x, y, width, height, 'F');
      
      // Borde
      pdf.setDrawColor(color[0], color[1], color[2]);
      pdf.setLineWidth(1);
      pdf.rect(x, y, width, height, 'S');
      
      // Título
      addText(title, x + 5, y + 12, {
        fontSize: 9,
        color: color,
        bold: true,
        maxWidth: width - 10
      });
      
      // Score principal
      addText(score, x + 5, y + 28, {
        fontSize: 20,
        bold: true,
        color: colors.dark
      });
      
      // Subtítulo
      addText(subtitle, x + 5, y + 42, {
        fontSize: 8,
        color: colors.secondary,
        maxWidth: width - 10
      });
    };

    const addBarChart = (data: Array<{label: string, value: number, maxValue: number, color?: number[]}>, x: number, y: number, width: number, height: number) => {
      const barHeight = (height - (data.length * 5)) / data.length;
      
      data.forEach((item, index) => {
        const barY = y + (index * (barHeight + 5));
        const barWidth = item.maxValue > 0 ? (item.value / item.maxValue) * (width - 80) : 0;
        const barColor = item.color || colors.primary;
        
        // Etiqueta
        addText(item.label, x, barY + (barHeight / 2) + 2, {
          fontSize: 9,
          color: colors.dark
        });
        
        // Barra de fondo
        pdf.setFillColor(240, 240, 240);
        pdf.rect(x + 80, barY, width - 80, barHeight, 'F');
        
        // Barra de valor
        pdf.setFillColor(barColor[0], barColor[1], barColor[2]);
        pdf.rect(x + 80, barY, barWidth, barHeight, 'F');
        
        // Valor
        if (barWidth > 15) {
          addText(item.value.toString(), x + 85, barY + (barHeight / 2) + 2, {
            fontSize: 8,
            color: [255, 255, 255]
          });
        } else {
          addText(item.value.toString(), x + 85 + barWidth + 5, barY + (barHeight / 2) + 2, {
            fontSize: 8,
            color: colors.dark
          });
        }
      });
    };

    // CÁLCULOS PSICOMÉTRICOS PRECISOS
    const situationalResponses = Object.keys(situationalAnswers)
      .sort()
      .map(key => {
        const answer = situationalAnswers[key];
        switch(answer) {
          case 'dirigir': return 'S1';
          case 'entrenar': return 'S2';
          case 'apoyar': return 'S3';
          case 'delegar': return 'S4';
          default: return 'S1';
        }
      });
    
    const situationalScoring = calculateSituationalScoring(situationalResponses);
    
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
    
    const cognitiveResponses = Object.keys(cognitiveAnswers)
      .sort()
      .map(key => cognitiveAnswers[key]);
    
    const cognitiveScoring = calculateCognitiveScoring(cognitiveResponses);
    
    const ethicalResponses = Object.keys(ethicalAnswers)
      .sort()
      .map(key => ethicalAnswers[key].mainAnswer || 'A');
    
    const ethicalScoring = calculateEthicalScoring(ethicalResponses);

    // ==================== PORTADA ====================
    // Fondo corporativo
    pdf.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    pdf.rect(0, 0, pageWidth, 100, 'F');
    
    // Logo/Marca (simulado)
    pdf.setFillColor(255, 255, 255, 0.2);
    pdf.rect(margin, 20, 40, 40, 'F');
    addText('LOGO', margin + 15, 45, {
      fontSize: 12,
      color: [255, 255, 255],
      bold: true
    });
    
    // Título principal
    addText('REPORTE PSICOMÉTRICO INTEGRAL', pageWidth / 2, 40, {
      fontSize: 24,
      bold: true,
      color: [255, 255, 255],
      align: 'center'
    });
    
    addText('EVALUACIÓN DE COMPETENCIAS EJECUTIVAS', pageWidth / 2, 55, {
      fontSize: 14,
      color: [255, 255, 255],
      align: 'center'
    });
    
    // Información del evaluado
    yPosition = 120;
    addText(`EVALUADO: ${userData.name}`, pageWidth / 2, yPosition, {
      fontSize: 16,
      bold: true,
      align: 'center'
    });
    
    yPosition += 15;
    addText(`${userData.position} | ${userData.company}`, pageWidth / 2, yPosition, {
      fontSize: 12,
      color: colors.secondary,
      align: 'center'
    });
    
    yPosition += 30;
    addText(`Fecha de Evaluación: ${new Date().toLocaleDateString('es-ES')}`, pageWidth / 2, yPosition, {
      fontSize: 11,
      align: 'center'
    });
    
    // Información técnica
    yPosition += 40;
    const technicalInfo = `
METODOLOGÍA: Batería psicométrica estandarizada
INSTRUMENTOS: 5 módulos de evaluación científica
ANÁLISIS: ${analysis.analysisType === 'real' ? 'IA + Algoritmos psicométricos' : 'Algoritmos psicométricos estándar'}
VALIDEZ: Baremos internacionales aplicados
    `.trim();
    
    addText(technicalInfo, pageWidth / 2, yPosition, {
      fontSize: 9,
      color: colors.secondary,
      align: 'center'
    });
    
    // Disclaimer
    yPosition = pageHeight - 60;
    addText('CONFIDENCIAL - DOCUMENTO TÉCNICO PROFESIONAL', pageWidth / 2, yPosition, {
      fontSize: 8,
      color: colors.secondary,
      align: 'center'
    });
    
    addText('Este reporte contiene información psicométrica sensible y debe ser interpretado por profesionales calificados', pageWidth / 2, yPosition + 10, {
      fontSize: 8,
      color: colors.secondary,
      align: 'center'
    });

    // ==================== RESUMEN EJECUTIVO ====================
    pdf.addPage();
    yPosition = margin;
    
    addText('RESUMEN EJECUTIVO', pageWidth / 2, yPosition, {
      fontSize: 18,
      bold: true,
      color: colors.primary,
      align: 'center'
    });
    yPosition += 25;
    
    // Scorecard principal
    const overallScore = Math.round((
      (situationalScoring.precisionDiagnosticaPct / 100) * 20 +
      (cognitiveScoring.iqEstimado / 130) * 30 +
      (ethicalScoring.indiceIntegridad / 10) * 25 +
      (Object.values(hoganScoring).filter(s => s.riesgo === 'Bajo').length / 11) * 25
    ));
    
    const scoreColor = overallScore >= 70 ? colors.success : overallScore >= 50 ? colors.warning : colors.danger;
    const scoreLevel = overallScore >= 70 ? 'ALTO POTENCIAL' : overallScore >= 50 ? 'POTENCIAL MODERADO' : 'REQUIERE DESARROLLO';
    
    addScoreCard('ÍNDICE GENERAL', `${overallScore}/100`, scoreLevel, scoreColor, margin, yPosition, 120, 60);
    
    // Scorecards específicos
    addScoreCard('LIDERAZGO', `${situationalScoring.precisionDiagnosticaPct}%`, 'Precisión Diagnóstica', 
      situationalScoring.precisionDiagnosticaPct >= 70 ? colors.success : colors.warning, margin + 130, yPosition, 80, 60);
    
    addScoreCard('COGNITIVO', `IQ ${cognitiveScoring.iqEstimado}`, `Percentil ${cognitiveScoring.percentil}`, 
      cognitiveScoring.iqEstimado >= 100 ? colors.success : colors.danger, margin + 220, yPosition, 80, 60);
    
    addScoreCard('INTEGRIDAD', `${ethicalScoring.indiceIntegridad}/10`, ethicalScoring.diagnostico.split(' ')[0], 
      ethicalScoring.indiceIntegridad >= 7 ? colors.success : colors.danger, margin + 310, yPosition, 80, 60);
    
    yPosition += 80;
    
    // Análisis ejecutivo
    const executiveAnalysis = analysis.analysisType === 'real' ? 
      analysis.executiveSummary : 
      `ANÁLISIS TÉCNICO ESTÁNDAR: ${userData.name} presenta un perfil con ${situationalScoring.precisionDiagnosticaPct}% de precisión en liderazgo situacional, capacidad cognitiva estimada IQ ${cognitiveScoring.iqEstimado} (Percentil ${cognitiveScoring.percentil}), e índice de integridad ${ethicalScoring.indiceIntegridad}/10. ${analysis.analysisType === 'mock' ? '⚠️ Para análisis personalizado completo, se requiere configuración de IA.' : ''}`;
    
    addSection('SÍNTESIS PROFESIONAL', executiveAnalysis);

    // ==================== MÓDULO 1: LIDERAZGO SITUACIONAL ====================
    pdf.addPage();
    yPosition = margin;
    
    addSection('MÓDULO 1: LIDERAZGO SITUACIONAL', 
      'Evaluación de la capacidad para adaptar el estilo de liderazgo según las necesidades del equipo y la situación específica.');
    
    // Gráfico de estilos
    const situationalStyles = Object.values(situationalAnswers);
    const dirigirCount = situationalStyles.filter(s => s === 'dirigir').length;
    const entrenarCount = situationalStyles.filter(s => s === 'entrenar').length;
    const apoyarCount = situationalStyles.filter(s => s === 'apoyar').length;
    const delegarCount = situationalStyles.filter(s => s === 'delegar').length;
    const total = situationalStyles.length;
    
    const leadershipData = [
      { label: 'S1 - Dirigir', value: dirigirCount, maxValue: total, color: colors.danger },
      { label: 'S2 - Entrenar', value: entrenarCount, maxValue: total, color: colors.warning },
      { label: 'S3 - Apoyar', value: apoyarCount, maxValue: total, color: colors.success },
      { label: 'S4 - Delegar', value: delegarCount, maxValue: total, color: colors.primary }
    ];
    
    addText('DISTRIBUCIÓN DE ESTILOS DE LIDERAZGO', margin, yPosition, {
      fontSize: 12,
      bold: true
    });
    yPosition += 20;
    
    addBarChart(leadershipData, margin, yPosition, contentWidth, 80);
    yPosition += 100;
    
    // Análisis técnico
    const flexibilidad = 4 - [dirigirCount, entrenarCount, apoyarCount, delegarCount].filter(count => count === 0).length;
    const diagnostico = situationalScoring.precisionDiagnosticaPct >= 80 ? 'EXCELENTE' : 
                      situationalScoring.precisionDiagnosticaPct >= 60 ? 'COMPETENTE' : 
                      situationalScoring.precisionDiagnosticaPct >= 40 ? 'EN DESARROLLO' : 'CRÍTICO';
    
    const technicalAnalysis = `
RESULTADOS CUANTITATIVOS:
• Precisión Diagnóstica: ${situationalScoring.precisionDiagnosticaPct}% (${diagnostico})
• Flexibilidad de Estilos: ${flexibilidad}/4 estilos utilizados
• Estilo Predominante: ${leadershipData.sort((a,b) => b.value - a.value)[0].label}

INTERPRETACIÓN TÉCNICA:
La precisión diagnóstica mide la capacidad del evaluado para identificar correctamente el nivel de desarrollo del colaborador y aplicar el estilo de liderazgo más efectivo según el modelo Hersey-Blanchard.

Un resultado de ${situationalScoring.precisionDiagnosticaPct}% indica ${diagnostico === 'EXCELENTE' ? 'una capacidad excepcional para el diagnóstico situacional' : diagnostico === 'COMPETENTE' ? 'una capacidad sólida con oportunidades de refinamiento' : diagnostico === 'EN DESARROLLO' ? 'necesidad de desarrollo en diagnóstico situacional' : 'un área crítica que requiere intervención inmediata'}.

RECOMENDACIONES TÉCNICAS:
${diagnostico === 'EXCELENTE' ? '• Aprovechar expertise para mentorear otros líderes\n• Asumir roles de liderazgo complejo' : 
  diagnostico === 'COMPETENTE' ? '• Continuar desarrollo en estilos menos utilizados\n• Práctica supervisada en diagnóstico' :
  diagnostico === 'EN DESARROLLO' ? '• Programa estructurado de desarrollo\n• Formación intensiva en modelo situacional' :
  '• ACCIÓN INMEDIATA: Formación intensiva requerida\n• SUPERVISIÓN: Apoyo continuo en decisiones de liderazgo'}
    `.trim();
    
    addText(technicalAnalysis, margin, yPosition, {
      fontSize: 10,
      maxWidth: contentWidth
    });

    // ==================== MÓDULO 2: PERFIL HOGAN ====================
    pdf.addPage();
    yPosition = margin;
    
    addSection('MÓDULO 2: PERFIL DE RIESGOS PROFESIONALES (HOGAN)', 
      'Evaluación de factores de riesgo que pueden emerger bajo presión y afectar el desempeño ejecutivo.');
    
    // Análisis de riesgos
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
    if (highRiskCount >= 3) generalRiskLevel = 'ALTO RIESGO';
    else if (highRiskCount >= 1 || moderateRiskCount >= 4) generalRiskLevel = 'RIESGO MODERADO';
    else if (moderateRiskCount >= 1) generalRiskLevel = 'BAJO RIESGO';
    else generalRiskLevel = 'PERFIL FAVORABLE';
    
    const riskColor = generalRiskLevel === 'ALTO RIESGO' ? colors.danger : 
                     generalRiskLevel === 'RIESGO MODERADO' ? colors.warning : colors.success;
    
    addScoreCard('NIVEL DE RIESGO', generalRiskLevel, `${riskAreas.length} áreas identificadas`, riskColor, margin, yPosition, 150, 60);
    yPosition += 80;
    
    if (riskAreas.length > 0) {
      addText('FACTORES DE RIESGO IDENTIFICADOS', margin, yPosition, {
        fontSize: 12,
        bold: true
      });
      yPosition += 20;
      
      riskAreas.slice(0, 5).forEach((area, index) => {
        const riskText = `${index + 1}. ${area.name.toUpperCase()}: Puntuación ${area.score.toFixed(1)}/5.0 (${area.level})`;
        addText(riskText, margin, yPosition, {
          fontSize: 10,
          color: area.level === 'ALTO' ? colors.danger : colors.warning
        });
        yPosition += 15;
      });
    } else {
      addText('✓ PERFIL DE BAJO RIESGO: No se identificaron factores de riesgo significativos', margin, yPosition, {
        fontSize: 11,
        color: colors.success,
        bold: true
      });
      yPosition += 20;
    }
    
    yPosition += 10;
    const hoganAnalysis = `
METODOLOGÍA HOGAN:
El inventario Hogan evalúa 11 dimensiones de riesgo que pueden emerger bajo presión, estrés o cuando las defensas están bajas. Utiliza una escala de 1-5 donde puntuaciones ≥3.0 indican áreas de atención.

INTERPRETACIÓN CLÍNICA:
${riskAreas.length === 0 ? 
  'El perfil indica estabilidad emocional y autorregulación efectiva bajo presión. Esta es una fortaleza significativa para roles de liderazgo.' :
  `Se identificaron ${riskAreas.length} factores de riesgo que requieren gestión proactiva. ${riskAreas[0] ? `El factor más significativo es ${riskAreas[0].name}, que puede manifestarse como comportamientos contraproductivos bajo estrés.` : ''}`
}

IMPLICACIONES PARA EL DESARROLLO:
${generalRiskLevel === 'PERFIL FAVORABLE' ? 
  '• Aprovechar estabilidad para roles de alta presión\n• Servir como modelo de autorregulación' :
  '• Desarrollo de estrategias de autogestión\n• Supervisión adicional en situaciones de alta presión\n• Programa de coaching ejecutivo recomendado'
}
    `.trim();
    
    addText(hoganAnalysis, margin, yPosition, {
      fontSize: 10,
      maxWidth: contentWidth
    });

    // ==================== MÓDULO 3: PERFIL DISC ====================
    pdf.addPage();
    yPosition = margin;
    
    addSection('MÓDULO 3: PERFIL DE COMPORTAMIENTO PROFESIONAL (DISC)', 
      'Análisis del estilo de comportamiento natural y preferencias de comunicación en el entorno laboral.');
    
    // Gráfico radar DISC (simplificado como barras)
    const discData = [
      { label: 'D - Dominancia', value: Math.abs(discScoring.scoreD), maxValue: 10, color: colors.danger },
      { label: 'I - Influencia', value: Math.abs(discScoring.scoreI), maxValue: 10, color: colors.warning },
      { label: 'S - Estabilidad', value: Math.abs(discScoring.scoreS), maxValue: 10, color: colors.success },
      { label: 'C - Cumplimiento', value: Math.abs(discScoring.scoreC), maxValue: 10, color: colors.primary }
    ];
    
    addText('PERFIL DE COMPORTAMIENTO DISC', margin, yPosition, {
      fontSize: 12,
      bold: true
    });
    yPosition += 20;
    
    addBarChart(discData, margin, yPosition, contentWidth, 80);
    yPosition += 100;
    
    const discAnalysis = `
PERFIL IDENTIFICADO: ${discScoring.perfilPrimario}
Puntuaciones: D=${discScoring.scoreD}, I=${discScoring.scoreI}, S=${discScoring.scoreS}, C=${discScoring.scoreC}

CARACTERÍSTICAS DEL PERFIL:
${discScoring.perfilPrimario === 'Dominante' ? 
  '• Orientado a resultados y acción rápida\n• Aporta dirección y sentido de urgencia\n• Motivado por control y desafíos\n• Riesgo: Impaciencia y poca sensibilidad' :
  discScoring.perfilPrimario === 'Influyente' ?
  '• Enfocado en comunicación y relaciones\n• Aporta entusiasmo y cohesión de equipo\n• Motivado por reconocimiento e interacción\n• Riesgo: Falta de atención al detalle' :
  discScoring.perfilPrimario === 'Estable' ?
  '• Orientado a colaboración y estabilidad\n• Aporta lealtad y ritmo constante\n• Motivado por seguridad y aprecio\n• Riesgo: Resistencia al cambio' :
  '• Enfocado en precisión y calidad\n• Aporta orden y altos estándares\n• Motivado por exactitud y lógica\n• Riesgo: Perfeccionismo excesivo'
}

APLICACIÓN PRÁCTICA:
Este perfil sugiere un estilo de comunicación ${discScoring.perfilPrimario === 'Dominante' ? 'directo y orientado a resultados' : discScoring.perfilPrimario === 'Influyente' ? 'expresivo y persuasivo' : discScoring.perfilPrimario === 'Estable' ? 'colaborativo y paciente' : 'analítico y detallado'}. 

Para maximizar efectividad, se recomienda ${discScoring.perfilPrimario === 'Dominante' ? 'desarrollar paciencia y habilidades interpersonales' : discScoring.perfilPrimario === 'Influyente' ? 'fortalecer atención al detalle y seguimiento' : discScoring.perfilPrimario === 'Estable' ? 'desarrollar adaptabilidad al cambio' : 'equilibrar perfeccionismo con pragmatismo'}.
    `.trim();
    
    addText(discAnalysis, margin, yPosition, {
      fontSize: 10,
      maxWidth: contentWidth
    });

    // ==================== MÓDULO 4: EVALUACIÓN COGNITIVA ====================
    pdf.addPage();
    yPosition = margin;
    
    addSection('MÓDULO 4: EVALUACIÓN DE APTITUDES COGNITIVAS', 
      'Medición de la capacidad intelectual general y habilidades cognitivas específicas relevantes para el desempeño ejecutivo.');
    
    // Scorecard cognitivo
    const iqColor = cognitiveScoring.iqEstimado >= 115 ? colors.success : 
                   cognitiveScoring.iqEstimado >= 100 ? colors.warning : colors.danger;
    const iqLevel = cognitiveScoring.iqEstimado >= 115 ? 'SUPERIOR' : 
                   cognitiveScoring.iqEstimado >= 100 ? 'PROMEDIO ALTO' : 'REQUIERE DESARROLLO';
    
    addScoreCard('COEFICIENTE INTELECTUAL', `${cognitiveScoring.iqEstimado}`, `Percentil ${cognitiveScoring.percentil}`, iqColor, margin, yPosition, 120, 60);
    addScoreCard('PRECISIÓN', `${cognitiveScoring.aciertos}/${cognitiveScoring.totalPreguntas}`, `${Math.round((cognitiveScoring.aciertos/cognitiveScoring.totalPreguntas)*100)}% correctas`, iqColor, margin + 130, yPosition, 100, 60);
    
    yPosition += 80;
    
    const cognitiveAnalysis = `
RESULTADOS PSICOMÉTRICOS:
• IQ Estimado: ${cognitiveScoring.iqEstimado} (Percentil ${cognitiveScoring.percentil})
• Nivel Cognitivo: ${iqLevel}
• Precisión: ${cognitiveScoring.aciertos}/${cognitiveScoring.totalPreguntas} respuestas correctas (${Math.round((cognitiveScoring.aciertos/cognitiveScoring.totalPreguntas)*100)}%)

INTERPRETACIÓN TÉCNICA:
El coeficiente intelectual estimado de ${cognitiveScoring.iqEstimado} sitúa al evaluado en el ${cognitiveScoring.percentil}° percentil de la población general. 

${cognitiveScoring.iqEstimado >= 115 ? 
  'Este resultado indica capacidades cognitivas superiores, ideales para roles ejecutivos complejos que requieren análisis estratégico, resolución de problemas multifacéticos y toma de decisiones bajo presión.' :
  cognitiveScoring.iqEstimado >= 100 ?
  'Este resultado indica capacidades cognitivas sólidas, apropiadas para roles de liderazgo medio con potencial de desarrollo hacia posiciones más estratégicas.' :
  'Este resultado está por debajo del benchmark típico para roles ejecutivos senior. Se recomienda apoyo adicional en análisis complejos y desarrollo de habilidades cognitivas.'
}

BENCHMARK EJECUTIVO:
• Roles C-Level: IQ 115+ (Percentil 84+)
• Gerencia Senior: IQ 110+ (Percentil 75+)
• Supervisión: IQ 100+ (Percentil 50+)

RECOMENDACIONES DE DESARROLLO:
${cognitiveScoring.iqEstimado >= 115 ?
  '• Aprovechar fortalezas cognitivas para liderazgo estratégico\n• Asumir proyectos de alta complejidad\n• Mentorear en resolución de problemas' :
  cognitiveScoring.iqEstimado >= 100 ?
  '• Desarrollar pensamiento sistémico\n• Fortalecer análisis estratégico\n• Participar en programas de liderazgo avanzado' :
  '• CRÍTICO: Programa intensivo de desarrollo cognitivo\n• Apoyo continuo en análisis complejos\n• Mentoring en toma de decisiones estratégicas'
}
    `.trim();
    
    addText(cognitiveAnalysis, margin, yPosition, {
      fontSize: 10,
      maxWidth: contentWidth
    });

    // ==================== MÓDULO 5: INTEGRIDAD ÉTICA ====================
    pdf.addPage();
    yPosition = margin;
    
    addSection('MÓDULO 5: EVALUACIÓN DE INTEGRIDAD Y JUICIO ÉTICO', 
      'Análisis del marco ético personal y capacidad de toma de decisiones en situaciones de dilema moral profesional.');
    
    // Scorecard ético
    const ethicalColor = ethicalScoring.indiceIntegridad >= 7 ? colors.success : 
                        ethicalScoring.indiceIntegridad >= 5 ? colors.warning : colors.danger;
    const ethicalLevel = ethicalScoring.indiceIntegridad >= 7 ? 'SÓLIDO' : 
                        ethicalScoring.indiceIntegridad >= 5 ? 'MODERADO' : 'CRÍTICO';
    
    addScoreCard('ÍNDICE DE INTEGRIDAD', `${ethicalScoring.indiceIntegridad}/10`, ethicalLevel, ethicalColor, margin, yPosition, 120, 60);
    
    const riskLevel = ethicalScoring.indiceIntegridad >= 7 ? 'BAJO' : 
                     ethicalScoring.indiceIntegridad >= 5 ? 'MODERADO' : 'ALTO';
    addScoreCard('RIESGO ÉTICO', riskLevel, ethicalScoring.diagnostico, ethicalColor, margin + 130, yPosition, 120, 60);
    
    yPosition += 80;
    
    const ethicalAnalysis = `
RESULTADOS CUANTITATIVOS:
• Índice de Integridad: ${ethicalScoring.indiceIntegridad}/10 (${ethicalLevel})
• Diagnóstico: ${ethicalScoring.diagnostico}
• Competencias Clave: ${ethicalScoring.competenciasClave.join(', ')}

METODOLOGÍA DE EVALUACIÓN:
Se presentaron 10 dilemas éticos profesionales basados en situaciones reales del entorno corporativo. Cada respuesta fue evaluada según criterios de integridad, transparencia, responsabilidad y cumplimiento ético.

INTERPRETACIÓN CLÍNICA:
${ethicalScoring.indiceIntegridad >= 7 ?
  'El evaluado demuestra un marco ético sólido y consistente. Sus respuestas indican una tendencia hacia soluciones constructivas que abordan los problemas de raíz, priorizando la integridad sobre la conveniencia.' :
  ethicalScoring.indiceIntegridad >= 5 ?
  'El evaluado muestra un marco ético en desarrollo. Aunque demuestra conciencia ética básica, se beneficiaría de formación adicional en toma de decisiones éticas complejas.' :
  '⚠️ ALERTA CRÍTICA: Se identifican patrones preocupantes en el razonamiento ético que requieren atención inmediata. Este es un factor de riesgo significativo para roles de liderazgo.'
}

IMPLICACIONES PARA ROLES EJECUTIVOS:
${ethicalScoring.indiceIntegridad >= 7 ?
  '✓ APTO para roles de alta responsabilidad ética\n✓ Puede servir como modelo de integridad\n✓ Candidato para comités de ética organizacional' :
  ethicalScoring.indiceIntegridad >= 5 ?
  '⚠️ APTO con supervisión ética adicional\n⚠️ Requiere desarrollo en toma de decisiones éticas\n⚠️ Monitoreo recomendado en decisiones críticas' :
  '❌ NO RECOMENDADO para roles de liderazgo sin intervención\n❌ Requiere programa intensivo de desarrollo ético\n❌ Supervisión continua necesaria'
}

PLAN DE ACCIÓN:
${ethicalScoring.indiceIntegridad >= 7 ?
  '• Aprovechar fortalezas éticas para mentorear otros\n• Liderar iniciativas de integridad organizacional\n• Participar en desarrollo de políticas éticas' :
  ethicalScoring.indiceIntegridad >= 5 ?
  '• Programa de formación ética estructurado\n• Mentoring en toma de decisiones complejas\n• Evaluación de progreso trimestral' :
  '• ACCIÓN INMEDIATA: Suspender consideración para roles críticos\n• PROGRAMA INTENSIVO: Desarrollo ético supervisado\n• REEVALUACIÓN: Completa después de 6 meses'
}
    `.trim();
    
    addText(ethicalAnalysis, margin, yPosition, {
      fontSize: 10,
      maxWidth: contentWidth
    });

    // ==================== CONCLUSIONES Y RECOMENDACIONES ====================
    pdf.addPage();
    yPosition = margin;
    
    addSection('CONCLUSIONES Y RECOMENDACIONES ESTRATÉGICAS', 
      'Síntesis integral de resultados y plan de desarrollo personalizado basado en evidencia psicométrica.');
    
    // Matriz de competencias
    addText('MATRIZ DE COMPETENCIAS EJECUTIVAS', margin, yPosition, {
      fontSize: 12,
      bold: true
    });
    yPosition += 20;
    
    const competencyMatrix = [
      { 
        competency: 'Liderazgo Situacional', 
        score: situationalScoring.precisionDiagnosticaPct,
        level: situationalScoring.precisionDiagnosticaPct >= 70 ? 'FORTALEZA' : situationalScoring.precisionDiagnosticaPct >= 50 ? 'COMPETENTE' : 'DESARROLLO',
        color: situationalScoring.precisionDiagnosticaPct >= 70 ? colors.success : situationalScoring.precisionDiagnosticaPct >= 50 ? colors.warning : colors.danger
      },
      { 
        competency: 'Capacidad Cognitiva', 
        score: Math.round((cognitiveScoring.iqEstimado / 130) * 100),
        level: cognitiveScoring.iqEstimado >= 115 ? 'FORTALEZA' : cognitiveScoring.iqEstimado >= 100 ? 'COMPETENTE' : 'DESARROLLO',
        color: cognitiveScoring.iqEstimado >= 115 ? colors.success : cognitiveScoring.iqEstimado >= 100 ? colors.warning : colors.danger
      },
      { 
        competency: 'Integridad Ética', 
        score: ethicalScoring.indiceIntegridad * 10,
        level: ethicalScoring.indiceIntegridad >= 7 ? 'FORTALEZA' : ethicalScoring.indiceIntegridad >= 5 ? 'COMPETENTE' : 'DESARROLLO',
        color: ethicalScoring.indiceIntegridad >= 7 ? colors.success : ethicalScoring.indiceIntegridad >= 5 ? colors.warning : colors.danger
      },
      { 
        competency: 'Estabilidad Emocional', 
        score: Math.round((Object.values(hoganScoring).filter(s => s.riesgo === 'Bajo').length / 11) * 100),
        level: generalRiskLevel === 'PERFIL FAVORABLE' ? 'FORTALEZA' : generalRiskLevel.includes('MODERADO') ? 'COMPETENTE' : 'DESARROLLO',
        color: generalRiskLevel === 'PERFIL FAVORABLE' ? colors.success : generalRiskLevel.includes('MODERADO') ? colors.warning : colors.danger
      }
    ];
    
    competencyMatrix.forEach((comp, index) => {
      const y = yPosition + (index * 15);
      addText(`${comp.competency}: ${comp.score}% - ${comp.level}`, margin, y, {
        fontSize: 10,
        color: comp.color
      });
    });
    
    yPosition += 80;
    
    // Recomendaciones finales
    const finalRecommendations = `
VEREDICTO EJECUTIVO:
${overallScore >= 70 ? 
  '✓ CANDIDATO DE ALTO POTENCIAL: Perfil ejecutivo sólido con fortalezas identificadas para roles de liderazgo senior.' :
  overallScore >= 50 ?
  '⚠️ CANDIDATO CON POTENCIAL MODERADO: Perfil competente que requiere desarrollo específico antes de asumir roles ejecutivos críticos.' :
  '❌ CANDIDATO REQUIERE DESARROLLO INTENSIVO: Múltiples áreas críticas identificadas que necesitan intervención antes de considerar roles de liderazgo.'
}

PLAN DE DESARROLLO PRIORITARIO:
${situationalScoring.precisionDiagnosticaPct < 50 ? '1. CRÍTICO: Programa intensivo de liderazgo situacional (6 meses)\n' : ''}${cognitiveScoring.iqEstimado < 100 ? '2. CRÍTICO: Desarrollo de habilidades cognitivas y analíticas\n' : ''}${ethicalScoring.indiceIntegridad < 5 ? '3. CRÍTICO: Programa de desarrollo ético supervisado\n' : ''}${generalRiskLevel.includes('ALTO') ? '4. CRÍTICO: Coaching ejecutivo para gestión de riesgos\n' : ''}

CRONOGRAMA RECOMENDADO:
• Evaluación inicial: Completada
• Fase de desarrollo: ${overallScore >= 70 ? '3-6 meses' : overallScore >= 50 ? '6-12 meses' : '12-18 meses'}
• Reevaluación: ${overallScore >= 70 ? '6 meses' : '12 meses'}
• Seguimiento continuo: Trimestral

PRÓXIMOS PASOS:
1. Revisión de resultados con evaluado y supervisor directo
2. Diseño de plan de desarrollo personalizado
3. Asignación de coach/mentor especializado
4. Establecimiento de métricas de progreso
5. Calendario de evaluaciones de seguimiento

NOTA TÉCNICA:
${analysis.analysisType === 'real' ? 
  'Este reporte incluye análisis personalizado generado por IA además de los algoritmos psicométricos estándar.' :
  'Este reporte utiliza algoritmos psicométricos estándar. Para análisis personalizado completo con IA, contacte al administrador del sistema.'
}
    `.trim();
    
    addText(finalRecommendations, margin, yPosition, {
      fontSize: 10,
      maxWidth: contentWidth
    });
    
    // Footer técnico
    yPosition = pageHeight - 40;
    addText('DOCUMENTO TÉCNICO CONFIDENCIAL - INTERPRETACIÓN PROFESIONAL REQUERIDA', pageWidth / 2, yPosition, {
      fontSize: 8,
      color: colors.secondary,
      align: 'center'
    });
    
    addText(`Generado el ${new Date().toLocaleDateString('es-ES')} | Powered by BoadMate.net`, pageWidth / 2, yPosition + 10, {
      fontSize: 8,
      color: colors.secondary,
      align: 'center'
    });
    
    // Convertir a base64
    const pdfOutput = pdf.output('datauristring');
    const base64Data = pdfOutput.split(',')[1];
    
    return base64Data;
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF report');
  }
};