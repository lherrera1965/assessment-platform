
import React, { useState } from 'react';
import { Question, AnswerSet } from '../../types';
import { Button } from '../Button';

interface LeadershipTestProps {
  title: string;
  questions: Question[];
  answers: AnswerSet;
  setAnswers: React.Dispatch<React.SetStateAction<AnswerSet>>;
  onNext: () => void;
  onBack: () => void;
  isFinalStep?: boolean;
  isLoading?: boolean;
}

const LeadershipTest: React.FC<LeadershipTestProps> = ({
  title,
  questions,
  answers,
  setAnswers,
  onNext,
  onBack,
  isFinalStep = false,
  isLoading = false,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    if(error) setError(null);
  };

  const handleNext = () => {
    if (Object.keys(answers).length < questions.length) {
      setError('Por favor, responda todas las preguntas antes de continuar.');
      return;
    }
    setError(null);
    onNext();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">{title}</h2>
      {error && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-md" role="alert">
          <p>{error}</p>
        </div>
      )}
      <div className="space-y-8">
        {questions.map((q, index) => (
          <div key={q.id} className="border-b border-slate-200 pb-6">
            <p className="font-semibold text-slate-700 mb-4">{`${index + 1}. ${q.text}`}</p>
            <div className="space-y-3">
              {q.options.map(option => (
                <label
                  key={option.value}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                    answers[q.id] === option.value
                      ? 'bg-primary-50 border-primary-500 ring-2 ring-primary-500'
                      : 'border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name={q.id}
                    value={option.value}
                    checked={answers[q.id] === option.value}
                    onChange={() => handleAnswerChange(q.id, option.value)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-slate-300"
                  />
                  <span className="ml-3 text-slate-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-between">
        <Button onClick={onBack} variant="secondary">
          Atrás
        </Button>
        <Button onClick={handleNext} isLoading={isLoading}>
          {isFinalStep ? 'Finalizar y Guardar' : 'Siguiente'}
        </Button>
      </div>
    </div>
  );
};

export default LeadershipTest;

export { LeadershipTest }