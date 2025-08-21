import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  showLabels?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  showLabels = true,
  className = ''
}) => {
  const progress = (currentStep / totalSteps) * 100;

  const stepLabels = [
    'Bienvenida',
    'Datos Personales',
    'Perfil Profesional', 
    'Introducción',
    'Test de Liderazgo',
    'Dilemas Éticos',
    'Finalización'
  ];

  return (
    <div className={`w-full ${className}`}>
      {showLabels && (
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-slate-600">
            Paso {currentStep} de {totalSteps}
          </span>
          <span className="text-sm text-slate-500">
            {Math.round(progress)}% completado
          </span>
        </div>
      )}
      
      <div className="w-full bg-slate-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {showLabels && currentStep <= stepLabels.length && (
        <div className="mt-2">
          <p className="text-sm text-slate-700 font-medium">
            {stepLabels[currentStep - 1]}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;