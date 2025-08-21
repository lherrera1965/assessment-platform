import React, { useState } from 'react';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { UserData, AnswerSet, EthicalDilemmaAnswer } from '../../types';
import { CheckCircle, Download, Mail, FileText, Brain } from 'lucide-react';
import { downloadPDF } from '../../services/pdfService';
import { getAssessment } from '../../services/supabaseService';
import { ETHICAL_DILEMMAS } from '../../constants';

interface CompletionScreenProps {
  assessmentId: string;
  userData: UserData;
  situationalAnswers: AnswerSet;
  hoganAnswers: AnswerSet;
  discAnswers: AnswerSet;
  cognitiveAnswers: AnswerSet;
  ethicalAnswers: Record<string, EthicalDilemmaAnswer>;
  onRestart: () => void;
}

export const CompletionScreen: React.FC<CompletionScreenProps> = ({
  assessmentId,
  userData,
  situationalAnswers,
  hoganAnswers,
  discAnswers,
  cognitiveAnswers,
  ethicalAnswers,
  onRestart
}) => {
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateReport = async () => {
    setIsGeneratingReport(true);
    setError(null);

    try {
      // Obtener el assessment completo de la base de datos
      const assessment = await getAssessment(assessmentId);
      
      if (!assessment || !assessment.complete_report_pdf) {
        throw new Error('No se pudo obtener el reporte de la base de datos');
      }

      // Descargar PDF desde la base de datos
      const filename = `Reporte_Evaluacion_${userData.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      downloadPDF(assessment.complete_report_pdf, filename);

      setReportGenerated(true);
    } catch (err) {
      console.error('Error generating report:', err);
      setError('Hubo un error al generar el reporte. Por favor, inténtelo de nuevo.');
    } finally {
      setIsGeneratingReport(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
        
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          ¡Assessment Completado!
        </h2>
        
        <p className="text-lg text-slate-600 mb-8">
          Gracias por completar el assessment, {userData.name}. 
          Tu evaluación ha sido procesada exitosamente y está lista para generar tu reporte personalizado.
        </p>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md" role="alert">
            <p>{error}</p>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-8 h-8 text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold text-blue-900">Reporte con Análisis de IA</h3>
          </div>
          <p className="text-blue-800 mb-4">
            Tu reporte incluirá un análisis completo generado por inteligencia artificial que evaluará:
          </p>
          <ul className="text-sm text-blue-700 text-left space-y-1 mb-6">
            <li>• Perfil de liderazgo y estilo de gestión</li>
            <li>• Análisis de personalidad y comportamiento</li>
            <li>• Evaluación de habilidades cognitivas</li>
            <li>• Marco ético y toma de decisiones</li>
            <li>• Recomendaciones personalizadas de desarrollo</li>
            <li>• Sugerencias de carrera profesional</li>
          </ul>
          
          <Button 
            onClick={handleGenerateReport}
            disabled={isGeneratingReport}
            loading={isGeneratingReport}
            className="w-full mb-4"
          >
            <FileText className="w-4 h-4 mr-2" />
            {isGeneratingReport ? 'Generando Reporte...' : 'Generar Reporte Completo'}
          </Button>
          
          {reportGenerated && (
            <div className="bg-green-100 border border-green-300 rounded-md p-3">
              <p className="text-green-800 text-sm">
                ✅ Reporte generado y descargado exitosamente
              </p>
            </div>
          )}
        </div>

        <div className="space-y-4 border-t pt-6">
          <Button onClick={onRestart} className="w-full mt-6">
            Realizar Nuevo Assessment
          </Button>
        </div>
      </div>
    </div>
  );
};