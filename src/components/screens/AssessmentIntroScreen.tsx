import React from 'react';
import { Button } from '../Button';

interface AssessmentIntroScreenProps {
  onNext: () => void;
}

const AssessmentIntroScreen: React.FC<AssessmentIntroScreenProps> = ({ onNext }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">
          Evaluación Psicométrica Integral
        </h2>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">
            Bienvenido a su Evaluación Profesional
          </h3>
          <p className="text-blue-700 leading-relaxed">
            A continuación realizará una evaluación integral compuesta por <strong>5 módulos científicos</strong> 
            diseñados para identificar sus fortalezas, estilo de liderazgo y áreas de desarrollo profesional.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-50 rounded-lg p-6">
            <h4 className="font-semibold text-slate-800 mb-3">📋 Módulos de Evaluación</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• <strong>Liderazgo Situacional:</strong> Flexibilidad de estilos</li>
              <li>• <strong>Perfil de Riesgos:</strong> Comportamiento bajo presión</li>
              <li>• <strong>Estilo DISC:</strong> Preferencias de comunicación</li>
              <li>• <strong>Aptitudes Cognitivas:</strong> Capacidad de análisis</li>
              <li>• <strong>Juicio Ético:</strong> Toma de decisiones morales</li>
            </ul>
          </div>
          
          <div className="bg-slate-50 rounded-lg p-6">
            <h4 className="font-semibold text-slate-800 mb-3">⏱️ Información Práctica</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• <strong>Duración:</strong> 45-60 minutos aproximadamente</li>
              <li>• <strong>Formato:</strong> Preguntas de opción múltiple</li>
              <li>• <strong>Progreso:</strong> Se guarda automáticamente</li>
              <li>• <strong>Resultado:</strong> Reporte profesional detallado</li>
              <li>• <strong>Confidencialidad:</strong> Información protegida</li>
            </ul>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h4 className="font-semibold text-yellow-800 mb-3">💡 Recomendaciones Importantes</h4>
          <div className="text-yellow-700 text-sm space-y-2">
            <p>• <strong>Responda con honestidad:</strong> No hay respuestas correctas o incorrectas</p>
            <p>• <strong>Confíe en su primera impresión:</strong> Las respuestas espontáneas son más precisas</p>
            <p>• <strong>Ambiente tranquilo:</strong> Busque un lugar sin interrupciones</p>
            <p>• <strong>Tome su tiempo:</strong> Reflexione pero no sobreanalice</p>
          </div>
        </div>

        <div className="text-center">
          <Button onClick={onNext} size="lg" className="px-8 py-3">
            Comenzar Evaluación
          </Button>
          <p className="text-xs text-slate-500 mt-4">
            Al continuar, acepta que sus respuestas serán procesadas de forma confidencial
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssessmentIntroScreen;


export { AssessmentIntroScreen }