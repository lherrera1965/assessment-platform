import React, { useState } from 'react';
import { AnswerSet, Question } from '../../types';
import { Button } from '../Button';
import { 
  SITUATIONAL_LEADERSHIP_QUESTIONS,
  HOGAN_STYLE_QUESTIONS,
  DISC_QUESTIONS,
  COGNITIVE_TEST_QUESTIONS,
  SITUATIONAL_LEADERSHIP_INTRO,
  HOGAN_STYLE_INTRO,
  DISC_INTRO,
  COGNITIVE_ABILITY_INTRO
} from '../../constants';

interface LeadershipTestProps {
  testType?: 'situational' | 'hogan' | 'disc' | 'cognitive';
  onNext: (answers: AnswerSet) => void;
  onBack?: () => void;
}

const LeadershipTest: React.FC<LeadershipTestProps> = ({ 
  testType = 'situational', 
  onNext, 
  onBack 
}) => {
  const [answers, setAnswers] = useState<AnswerSet>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showIntro, setShowIntro] = useState(true);

  const getTestConfig = () => {
    switch (testType) {
      case 'hogan':
        return {
          title: '4. Perfil de Competencias Profesionales',
          questions: HOGAN_STYLE_QUESTIONS,
          intro: HOGAN_STYLE_INTRO
        };
      case 'disc':
        return {
          title: '5. Cuestionario de Estilo de Comportamiento',
          questions: DISC_QUESTIONS,
          intro: DISC_INTRO
        };
      case 'cognitive':
        return {
          title: '6. Prueba de Habilidades Cognitivas',
          questions: COGNITIVE_TEST_QUESTIONS,
          intro: COGNITIVE_ABILITY_INTRO
        };
      default:
        return {
          title: '3. Evaluación de Liderazgo Situacional',
          questions: SITUATIONAL_LEADERSHIP_QUESTIONS,
          intro: SITUATIONAL_LEADERSHIP_INTRO
        };
    }
  };

  const { title, questions, intro } = getTestConfig();
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      onNext(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else if (onBack) {
      onBack();
    }
  };

  const isAnswered = answers[currentQuestion?.id];
  const allQuestionsAnswered = questions.every(q => answers[q.id]);

  if (showIntro) {
    return (
      <div>
        <div 
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: intro }}
        />
        <div className="mt-8 flex justify-between">
          {onBack && (
            <Button onClick={onBack} variant="secondary">
              Atrás
            </Button>
          )}
          <Button onClick={() => setShowIntro(false)}>
            Comenzar Evaluación
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">{title}</h2>
      <p className="text-slate-500 mb-6">
        Pregunta {currentQuestionIndex + 1} de {questions.length}
      </p>

      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          {currentQuestion.text}
        </h3>

        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <label
              key={option.value}
              className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all ${
                answers[currentQuestion.id] === option.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <input
                type="radio"
                name={currentQuestion.id}
                value={option.value}
                checked={answers[currentQuestion.id] === option.value}
                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                className="mt-1 mr-3 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-slate-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <Button onClick={handlePrevious} variant="secondary">
          {currentQuestionIndex === 0 ? 'Atrás' : 'Anterior'}
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={!isAnswered}
        >
          {currentQuestionIndex === questions.length - 1 ? 'Finalizar' : 'Siguiente'}
        </Button>
      </div>

      {/* Progress indicator */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-slate-500 mb-2">
          <span>Progreso</span>
          <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default LeadershipTest;