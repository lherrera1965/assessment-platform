import React, { useState, useEffect } from 'react';
import { ETHICAL_DILEMMAS } from '../../constants';
import { EthicalDilemmaAnswer } from '../../types';
import { Button } from '../Button';

interface EthicalDilemmasScreenProps {
  dilemmas: typeof ETHICAL_DILEMMAS;
  answers: Record<string, EthicalDilemmaAnswer>;
  setAnswers: (answers: Record<string, EthicalDilemmaAnswer>) => void;
  onNext: (answers: Record<string, EthicalDilemmaAnswer>) => void;
}

const EthicalDilemmasScreen: React.FC<EthicalDilemmasScreenProps> = ({
  dilemmas,
  answers,
  setAnswers,
  onNext
}) => {
  const [currentDilemmaIndex, setCurrentDilemmaIndex] = useState(0);
  const [timeSpent, setTimeSpent] = useState<Record<number, number>>({});
  const [startTime, setStartTime] = useState(Date.now());

  const currentDilemma = dilemmas[currentDilemmaIndex];
  const totalDilemmas = dilemmas.length;
  const progress = ((currentDilemmaIndex + 1) / totalDilemmas) * 100;

  useEffect(() => {
    setStartTime(Date.now());
  }, [currentDilemmaIndex]);

  const handleAnswer = (choice: string, reasoning: string) => {
    const timeForThisDilemma = Date.now() - startTime;
    
    const newAnswers = {
      ...answers,
      [currentDilemma.id]: {
        mainAnswer: reasoning,
        followUp1Answer: '',
        followUp2Answer: '',
        timeSpent: timeForThisDilemma
      }
    };

    setAnswers(newAnswers);
    setTimeSpent(prev => ({
      ...prev,
      [currentDilemmaIndex]: timeForThisDilemma
    }));

    if (currentDilemmaIndex < totalDilemmas - 1) {
      setCurrentDilemmaIndex(currentDilemmaIndex + 1);
    } else {
      onNext(newAnswers);
    }
  };

  const currentAnswer = answers[currentDilemma.id];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Dilemas Éticos
            </h2>
            <span className="text-sm text-gray-500">
              {currentDilemmaIndex + 1} de {totalDilemmas}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {currentDilemma.title}
          </h3>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {currentDilemma.scenario}
            </p>
          </div>

          <div className="space-y-4">
            {currentDilemma.options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  const choice = String.fromCharCode(65 + index); // A, B, C, D
                  handleAnswer(choice, option);
                }}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  currentAnswer?.choice === String.fromCharCode(65 + index)
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-800'
                    : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-25'
                }`}
              >
                <div className="flex items-start">
                  <span className="font-semibold text-indigo-600 mr-3 mt-1">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span className="flex-1">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {currentAnswer && (
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Respuesta seleccionada: {currentAnswer.choice}
            </div>
            
            {currentDilemmaIndex === totalDilemmas - 1 ? (
              <Button
                onClick={() => onNext(answers)}
                className="bg-green-600 hover:bg-green-700"
              >
                Finalizar Evaluación
              </Button>
            ) : (
              <Button
                onClick={() => setCurrentDilemmaIndex(currentDilemmaIndex + 1)}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Siguiente Dilema
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EthicalDilemmasScreen;