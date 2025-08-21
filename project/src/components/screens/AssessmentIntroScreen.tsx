import React from 'react';
import { Button } from '../Button';

interface AssessmentIntroScreenProps {
  title: string;
  description: string;
  onNext: () => void;
  onBack: () => void;
}

const AssessmentIntroScreen: React.FC<AssessmentIntroScreenProps> = ({ title, description, onNext, onBack }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-4">{title}</h2>
      <div 
        className="prose prose-slate max-w-none text-slate-600"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <div className="mt-8 flex justify-between">
        <Button onClick={onBack} variant="secondary">
          Atrás
        </Button>
        <Button onClick={onNext}>
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default AssessmentIntroScreen;


export { AssessmentIntroScreen }