import React, { useState, useMemo } from 'react';
import { EthicalDilemma, EthicalDilemmaAnswer } from '../../types';
import { Button } from '../Button';

interface EthicalDilemmasScreenProps {
  dilemmas: EthicalDilemma[];
  answers: Record<string, EthicalDilemmaAnswer>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, EthicalDilemmaAnswer>>>;
  onNext: () => void;
  onBack: () => void;
  isLoading?: boolean;
}

const TextareaField: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }> = ({ label, id, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
        <textarea id={id} className="block w-full px-4 py-2 text-slate-900 placeholder-slate-400 bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition" {...props} />
    </div>
);


const EthicalDilemmasScreen: React.FC<EthicalDilemmasScreenProps> = ({
  dilemmas,
  answers,
  setAnswers,
  onNext,
  onBack,
  isLoading = false,
}) => {
  const [currentDilemmaIndex, setCurrentDilemmaIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const currentDilemma = dilemmas[currentDilemmaIndex];
  const currentAnswers = useMemo(() => answers[currentDilemma.id] || { mainAnswer: '', followUp1Answer: '', followUp2Answer: '' }, [answers, currentDilemma.id]);

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedAnswers = { ...currentAnswers, [name]: value };
    setAnswers(prev => ({ ...prev, [currentDilemma.id]: updatedAnswers }));
    if(error) setError(null);
  };

  const validateCurrentDilemma = () => {
      const { mainAnswer, followUp1Answer, followUp2Answer } = currentAnswers;
      if (!mainAnswer.trim() || !followUp1Answer.trim() || !followUp2Answer.trim()) {
          setError('Por favor, responda a las tres preguntas para este dilema antes de continuar.');
          return false;
      }
      return true;
  }

  const handleNextDilemma = () => {
    if (!validateCurrentDilemma()) return;
    
    if (currentDilemmaIndex < dilemmas.length - 1) {
      setCurrentDilemmaIndex(prev => prev + 1);
      setError(null);
    }
  };

  const handlePrevDilemma = () => {
    if (currentDilemmaIndex > 0) {
      setCurrentDilemmaIndex(prev => prev - 1);
      setError(null);
    } else {
        onBack();
    }
  };

  const handleSubmit = () => {
      if (!validateCurrentDilemma()) return;
      onNext();
  }

  const isFinalDilemma = currentDilemmaIndex === dilemmas.length - 1;

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">7. Ética y Valores Profesionales</h2>
       <p className="text-slate-500 mb-6">Dilema {currentDilemmaIndex + 1} de {dilemmas.length}</p>

      {error && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-md" role="alert">
          <p>{error}</p>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <div className="mb-6">
            <h3 className="font-semibold text-slate-800 mb-2">Escenario:</h3>
            <p className="text-slate-600 italic">{currentDilemma.scenario}</p>
        </div>

        <div className="space-y-6">
            <TextareaField
                label={currentDilemma.mainQuestion}
                id="mainAnswer"
                name="mainAnswer"
                rows={4}
                value={currentAnswers.mainAnswer}
                onChange={handleAnswerChange}
            />
            <TextareaField
                label={currentDilemma.followUpQuestions[0]}
                id="followUp1Answer"
                name="followUp1Answer"
                rows={3}
                value={currentAnswers.followUp1Answer}
                onChange={handleAnswerChange}
            />
            <TextareaField
                label={currentDilemma.followUpQuestions[1]}
                id="followUp2Answer"
                name="followUp2Answer"
                rows={3}
                value={currentAnswers.followUp2Answer}
                onChange={handleAnswerChange}
            />
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button onClick={handlePrevDilemma} variant="secondary">
          {currentDilemmaIndex === 0 ? 'Atrás' : 'Anterior Dilema'}
        </Button>
        {isFinalDilemma ? (
            <Button onClick={handleSubmit} isLoading={isLoading}>
                Finalizar y Guardar
            </Button>
        ) : (
            <Button onClick={handleNextDilemma}>
                Siguiente Dilema
            </Button>
        )}
      </div>
    </div>
  );
};

export default EthicalDilemmasScreen;

export { EthicalDilemmasScreen }