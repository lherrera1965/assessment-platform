import React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '../Button';
import { CheckCircle, Heart, Star } from 'lucide-react';
import { supabase } from '../../services/supabaseService';
import { generateComprehensivePDF } from '../../services/pdfService';
import { generateAssessmentAnalysis, generateMasterAnalysis } from '../../services/geminiService';
import { ETHICAL_DILEMMAS } from '../../constants';

interface CompletionScreenProps {
  assessmentId: string;
  onRestart: () => void;
}

export const CompletionScreen: React.FC<CompletionScreenProps> = ({
  assessmentId,
  onRestart
}) => {
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  useEffect(() => {
    generateAndSaveReport();
  }, [assessmentId]);

  const generateAndSaveReport = async () => {
    if (!supabase || isGeneratingReport || reportGenerated) return;

    setIsGeneratingReport(true);
    
    try {
      // Obtener datos del assessment
      const { data: assessment, error } = await supabase
        .from('assessments')
        .select('*')
        .eq('id', assessmentId)
        .single();

      if (error || !assessment) {
        console.error('Error fetching assessment:', error);
        return;
      }

      // Verificar si ya tiene PDF generado
      if (assessment.complete_report_pdf) {
        setReportGenerated(true);
        return;
      }

      // Extraer datos necesarios
      const userData = assessment.user_data || assessment.personal_data || {};
      const situationalAnswers = assessment.situational_answers || {};
      const hoganAnswers = assessment.hogan_answers || {};
      const discAnswers = assessment.disc_answers || {};
      const cognitiveAnswers = assessment.cognitive_answers || {};
      const ethicalAnswers = assessment.ethical_answers || {};

      // Generar análisis con IA o mock
      const analysis = await generateAssessmentAnalysis(
        userData,
        situationalAnswers,
        hoganAnswers,
        discAnswers,
        cognitiveAnswers,
        ethicalAnswers,
        ETHICAL_DILEMMAS
      );

      // Generar PDF
      const pdfBase64 = await generateComprehensivePDF(
        userData,
        situationalAnswers,
        hoganAnswers,
        discAnswers,
        cognitiveAnswers,
        ethicalAnswers,
        analysis
      );

      // Generar análisis maestro
      const masterAnalysis = generateMasterAnalysis(
        assessmentId,
        userData,
        situationalAnswers,
        hoganAnswers,
        discAnswers,
        cognitiveAnswers,
        ethicalAnswers
      );

      // Guardar PDF en la base de datos
      const { error: updateError } = await supabase
        .from('assessments')
        .update({
          complete_report_pdf: pdfBase64,
          ai_analysis: analysis,
          detailed_report: masterAnalysis.reporte_individual,
          csv_data: masterAnalysis.fila_csv,
          updated_at: new Date().toISOString()
        })
        .eq('id', assessmentId);

      if (updateError) {
        console.error('Error saving PDF:', updateError);
      } else {
        setReportGenerated(true);
      }

    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const generateMockAnalysis = (userData: any, situationalAnswers: any, hoganAnswers: any, discAnswers: any, cognitiveAnswers: any, ethicalAnswers: any) => {
    // Análisis de liderazgo situacional
    const situationalStyles = Object.values(situationalAnswers);
    const dirigirCount = situationalStyles.filter(s => s === 'dirigir').length;
    const entrenarCount = situationalStyles.filter(s => s === 'entrenar').length;
    const apoyarCount = situationalStyles.filter(s => s === 'apoyar').length;
    const delegarCount = situationalStyles.filter(s => s === 'delegar').length;
    const flexibilidad = 4 - [dirigirCount, entrenarCount, apoyarCount, delegarCount].filter(count => count === 0).length;

    // Análisis cognitivo
    const correctAnswers: Record<string, string> = {
      'cog1': '38', 'cog2': 'aire', 'cog3': 'pais', 'cog4': '12', 'cog5': 'triangulo',
      'cog6': 'pesimista', 'cog7': '1_minuto', 'cog8': 'tiene_titulo', 'cog9': 'patata',
      'cog10': '150', 'cog11': 'tornillo', 'cog12': 'D4', 'cog13': '90_km',
      'cog14': 'pentagono', 'cog15': 'convencer', 'cog16': '8', 'cog17': 'sabado',
      'cog18': '27', 'cog19': 'temporal', 'cog20': 'menor'
    };
    
    const totalQuestions = Object.keys(cognitiveAnswers).length;
    const correctCount = Object.entries(cognitiveAnswers).filter(([questionId, answer]) => 
      correctAnswers[questionId] === answer
    ).length;
    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const estimatedIQ = Math.round(85 + (percentage - 50) * 0.6);

    // Análisis ético
    const ethicalResponses = Object.values(ethicalAnswers);
    const avgResponseLength = ethicalResponses.length > 0 ? 
      ethicalResponses.reduce((acc: number, r: any) => acc + (r.mainAnswer?.length || 0), 0) / ethicalResponses.length : 0;
    const integrityIndex = avgResponseLength > 200 ? 8 : avgResponseLength > 150 ? 6 : avgResponseLength > 100 ? 4 : 2;

    return {
      executiveSummary: `${userData.name || 'El evaluado'} presenta un perfil de liderazgo con flexibilidad situacional de ${flexibilidad}/4 estilos. Su capacidad cognitiva estimada (IQ ${estimatedIQ}) ${estimatedIQ >= 100 ? 'está dentro del rango esperado' : 'requiere consideración adicional'} para roles ejecutivos.`,
      leadershipProfile: `Demuestra preferencia por el estilo ${dirigirCount >= Math.max(entrenarCount, apoyarCount, delegarCount) ? 'directivo' : entrenarCount >= Math.max(apoyarCount, delegarCount) ? 'formativo' : apoyarCount >= delegarCount ? 'colaborativo' : 'delegativo'} con ${flexibilidad === 4 ? 'excelente' : flexibilidad >= 3 ? 'buena' : 'limitada'} adaptabilidad situacional.`,
      cognitiveAssessment: `Capacidad cognitiva estimada: IQ ${estimatedIQ} (${correctCount}/${totalQuestions} respuestas correctas, ${percentage}%). ${estimatedIQ >= 115 ? 'Superior al promedio ejecutivo.' : estimatedIQ >= 100 ? 'Dentro del rango promedio.' : 'Por debajo del benchmark ejecutivo típico.'}`,
      personalityInsights: `Perfil de comportamiento basado en respuestas DISC indica tendencias hacia la ${Object.values(discAnswers).join(', ').includes('decisivo') ? 'dominancia' : Object.values(discAnswers).join(', ').includes('sociable') ? 'influencia' : Object.values(discAnswers).join(', ').includes('estable') ? 'estabilidad' : 'concienzudez'}.`,
      ethicalFramework: `Índice de integridad: ${integrityIndex}/10. ${integrityIndex >= 7 ? 'Sólido marco ético.' : integrityIndex >= 5 ? 'Marco ético moderado, requiere desarrollo.' : 'Área crítica que requiere atención inmediata.'}`,
      developmentRecommendations: `Priorizar desarrollo en ${flexibilidad < 3 ? 'flexibilidad de liderazgo, ' : ''}${estimatedIQ < 100 ? 'habilidades analíticas, ' : ''}${integrityIndex < 5 ? 'formación ética intensiva' : 'consolidación de fortalezas identificadas'}.`,
      strengths: [
        flexibilidad >= 3 ? 'Alta flexibilidad de liderazgo' : 'Estilo de liderazgo definido',
        estimatedIQ >= 100 ? 'Capacidad cognitiva adecuada' : 'Potencial de desarrollo cognitivo',
        integrityIndex >= 5 ? 'Marco ético sólido' : 'Conciencia ética básica'
      ],
      areasForGrowth: [
        flexibilidad < 3 ? 'Desarrollar flexibilidad situacional' : 'Perfeccionar diagnóstico situacional',
        estimatedIQ < 100 ? 'Fortalecer habilidades analíticas' : 'Optimizar toma de decisiones',
        integrityIndex < 5 ? 'Desarrollo ético crítico requerido' : 'Consolidar liderazgo ético'
      ],
      careerSuggestions: `${estimatedIQ >= 100 && integrityIndex >= 5 ? 'Apto para roles de liderazgo senior con desarrollo continuo.' : 'Requiere programa de desarrollo intensivo antes de asumir roles ejecutivos de alta responsabilidad.'}`,
      analysisType: 'mock' as const
    };
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
        
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          ¡Assessment Completado!
        </h2>
        
        <p className="text-lg text-slate-600 mb-8">
          Gracias por completar el assessment. 
          Tu evaluación ha sido procesada exitosamente.
          {isGeneratingReport && (
            <span className="block mt-2 text-sm text-blue-600">
              Generando reporte integral...
            </span>
          )}
          {reportGenerated && (
            <span className="block mt-2 text-sm text-green-600">
              ✓ Reporte generado y guardado
            </span>
          )}
        </p>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-center mb-4">
            <Star className="w-8 h-8 text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold text-blue-900">¡Excelente trabajo!</h3>
          </div>
          <p className="text-blue-800 mb-4">
            Has completado todas las secciones de la evaluación:
          </p>
          <ul className="text-sm text-blue-700 text-left space-y-2 mb-6 max-w-md mx-auto">
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
              Información personal y profesional
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
              Evaluación de liderazgo situacional
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
              Análisis de estilo de liderazgo
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
              Perfil de personalidad DISC
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
              Evaluación de habilidades cognitivas
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
              Análisis de ética y valores
            </li>
          </ul>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-center mb-3">
            <Heart className="w-6 h-6 text-red-500 mr-2" />
            <h3 className="text-lg font-semibold text-slate-900">¿Qué sigue ahora?</h3>
          </div>
          <p className="text-slate-700 text-sm leading-relaxed">
            Tu evaluación será revisada por nuestro equipo de desarrollo de talento. 
            Los resultados y recomendaciones personalizadas serán compartidos contigo 
            a través de tu supervisor directo o el área de Recursos Humanos en los 
            próximos días hábiles.
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
          <p className="text-green-800 text-sm">
            <strong>¡Gracias por tu tiempo y dedicación!</strong><br />
            Tu compromiso con el desarrollo profesional es muy valioso para nosotros.<br />
            <span className="text-xs text-green-600 mt-2 block">
              Nota: Si tu reporte contiene advertencias (⚠️), significa que el análisis fue básico. 
              Para obtener insights personalizados completos, contacta al área de Recursos Humanos.
            </span>
          </p>
        </div>

        <div className="space-y-4 border-t pt-6">
          <Button onClick={onRestart} className="w-full">
            Realizar Nuevo Assessment
          </Button>
          <p className="text-xs text-slate-500">
            Si necesitas realizar otra evaluación o tienes alguna pregunta, 
            contacta al área de Recursos Humanos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompletionScreen;