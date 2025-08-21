import React, { useState, useCallback } from 'react';
import { AdminPanel } from './components/AdminPanel';
import { AdminLogin } from './components/AdminLogin';
import { UserData, AnswerSet, ProfileData, EthicalDilemmaAnswer } from './types';
import { 
  SITUATIONAL_LEADERSHIP_QUESTIONS, 
  HOGAN_STYLE_QUESTIONS,
  DISC_QUESTIONS,
  ETHICAL_DILEMMAS,
  COGNITIVE_TEST_QUESTIONS,
  SITUATIONAL_LEADERSHIP_INTRO,
  HOGAN_STYLE_INTRO,
  DISC_INTRO,
  COGNITIVE_ABILITY_INTRO,
  ETHICS_INTRO
} from './constants';
import { 
  initializeAssessment, 
  savePersonalData, 
  saveSituationalAnswers,
  saveHoganAnswers,
  saveDiscAnswers,
  saveCognitiveAnswers,
  saveEthicalAnswers,
  saveAIAnalysis,
  saveCompletePDF,
  completeAssessment
} from './services/supabaseService';
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { PersonalDataForm } from './components/screens/PersonalDataForm';
import { ProfessionalProfileScreen } from './components/screens/ProfessionalProfileScreen';
import { LeadershipTest } from './components/screens/LeadershipTest';
import { CompletionScreen } from './components/screens/CompletionScreen';
import { ProgressBar } from './components/ProgressBar';
import { AssessmentIntroScreen } from './components/screens/AssessmentIntroScreen';
import { EthicalDilemmasScreen } from './components/screens/EthicalDilemmasScreen';
import { generateAssessmentAnalysis } from './services/geminiService';
import { generateComprehensivePDF } from './services/pdfService';

const App: React.FC = () => {
  const [step, setStep] = useState(0);
  const [assessmentId, setAssessmentId] = useState<string>('');
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    employeeId: '',
    position: '',
    department: '',
    educationLevel: '',
    educationHistory: [],
    workExperience: [],
    strengths: '',
    opportunities: '',
    achievements: '',
    goals: '',
  });
  const [situationalAnswers, setSituationalAnswers] = useState<AnswerSet>({});
  const [hoganStyleAnswers, setHoganStyleAnswers] = useState<AnswerSet>({});
  const [discAnswers, setDiscAnswers] = useState<AnswerSet>({});
  const [cognitiveAnswers, setCognitiveAnswers] = useState<AnswerSet>({});
  const [ethicalDilemmaAnswers, setEthicalDilemmaAnswers] = useState<Record<string, EthicalDilemmaAnswer>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const totalSteps = 14; // Welcome(0) -> Completion(13) = 14 states

  const handleStart = useCallback(async () => {
    try {
      const id = await initializeAssessment();
      setAssessmentId(id);
      setStep(1);
    } catch (err) {
      console.error('Error initializing assessment:', err);
      setStep(1); // Continue anyway
    }
  }, []);

  const handleNext = useCallback(() => {
    if (step < totalSteps - 1) {
      setStep(prev => prev + 1);
    }
  }, [step, totalSteps]);

  const handleNextWithSave = useCallback(async (saveFunction?: () => Promise<void>) => {
    if (saveFunction) {
      try {
        await saveFunction();
      } catch (error) {
        console.error('Error saving data:', error);
        setError('Error al guardar los datos. Por favor, inténtelo de nuevo.');
        return;
      }
    }
    handleNext();
  }, [handleNext]);

  const handleBack = useCallback(() => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  }, [step]);
  
  const resetState = useCallback(() => {
    setStep(0);
    setAssessmentId('');
    setUserData({
      name: '',
      email: '',
      phone: '',
      company: '',
      employeeId: '',
      position: '',
      department: '',
      educationLevel: '',
      educationHistory: [],
      workExperience: [],
      strengths: '',
      opportunities: '',
      achievements: '',
      goals: '',
    });
    setSituationalAnswers({});
    setHoganStyleAnswers({});
    setDiscAnswers({});
    setCognitiveAnswers({});
    setEthicalDilemmaAnswers({});
    setError(null);
  }, []);

  const handleAdminAccess = () => {
    setShowAdminLogin(true);
  };

  const handleAdminLogin = () => {
    setShowAdminPanel(true);
  };

  const handleCloseAdmin = () => {
    setShowAdminPanel(false);
  };

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Guardar respuestas éticas finales
      await saveEthicalAnswers(assessmentId, ethicalDilemmaAnswers);
      
      // Generar análisis con IA
      const analysis = await generateAssessmentAnalysis(
        userData,
        situationalAnswers,
        hoganStyleAnswers,
        discAnswers,
        cognitiveAnswers,
        ethicalDilemmaAnswers,
        ETHICAL_DILEMMAS
      );
      
      // Guardar análisis de IA
      await saveAIAnalysis(assessmentId, analysis);
      
      // Generar PDF completo
      const pdfData = await generateComprehensivePDF(
        userData,
        situationalAnswers,
        hoganStyleAnswers,
        discAnswers,
        cognitiveAnswers,
        ethicalDilemmaAnswers,
        analysis
      );
      
      // Guardar PDF en base de datos
      await saveCompletePDF(assessmentId, pdfData);
      
      // Marcar assessment como completado
      await completeAssessment(assessmentId);
      
      setStep(totalSteps - 1); // Go to completion screen

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ocurrió un error desconocido.';
      setError(`Hubo un error al generar o guardar la información. ${errorMessage}. Por favor, inténtelo de nuevo.`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [userData, situationalAnswers, hoganStyleAnswers, discAnswers, cognitiveAnswers, ethicalDilemmaAnswers, totalSteps, assessmentId]);

  const renderStep = () => {
    switch (step) {
      case 0:
        return <WelcomeScreen onStart={handleStart} />;
      case 1:
        return (
          <PersonalDataForm
            data={userData}
            setData={setUserData}
            onNext={() => handleNextWithSave(() => savePersonalData(assessmentId, userData))}
          />
        );
      case 2:
        return (
          <ProfessionalProfileScreen
            data={userData}
            setData={setUserData}
            onNext={() => handleNextWithSave(() => savePersonalData(assessmentId, userData))}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <AssessmentIntroScreen
            title="3. Introducción a la Evaluación de Liderazgo Situacional"
            description={SITUATIONAL_LEADERSHIP_INTRO}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <LeadershipTest
            title="3. Evaluación de Liderazgo Situacional"
            questions={SITUATIONAL_LEADERSHIP_QUESTIONS}
            answers={situationalAnswers}
            setAnswers={setSituationalAnswers}
            onNext={() => handleNextWithSave(() => saveSituationalAnswers(assessmentId, situationalAnswers))}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <AssessmentIntroScreen
            title="4. Introducción a la Evaluación de Estilo de Liderazgo"
            description={HOGAN_STYLE_INTRO}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 6:
        return (
          <LeadershipTest
            title="4. Evaluación de Estilo de Liderazgo (Hogan)"
            questions={HOGAN_STYLE_QUESTIONS}
            answers={hoganStyleAnswers}
            setAnswers={setHoganStyleAnswers}
            onNext={() => handleNextWithSave(() => saveHoganAnswers(assessmentId, hoganStyleAnswers))}
            onBack={handleBack}
          />
        );
      case 7:
        return (
          <AssessmentIntroScreen
            title="5. Introducción a la Evaluación de Perfil DISC"
            description={DISC_INTRO}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 8:
        return (
          <LeadershipTest
            title="5. Evaluación de Perfil DISC"
            questions={DISC_QUESTIONS}
            answers={discAnswers}
            setAnswers={setDiscAnswers}
            onNext={() => handleNextWithSave(() => saveDiscAnswers(assessmentId, discAnswers))}
            onBack={handleBack}
          />
        );
      case 9:
        return (
          <AssessmentIntroScreen
            title="6. Introducción a la Evaluación de Habilidad Cognitiva"
            description={COGNITIVE_ABILITY_INTRO}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 10:
        return (
          <LeadershipTest
            title="6. Evaluación de Habilidad Cognitiva"
            questions={COGNITIVE_TEST_QUESTIONS}
            answers={cognitiveAnswers}
            setAnswers={setCognitiveAnswers}
            onNext={() => handleNextWithSave(() => saveCognitiveAnswers(assessmentId, cognitiveAnswers))}
            onBack={handleBack}
          />
        );
      case 11:
        return (
          <AssessmentIntroScreen
            title="7. Introducción a la Evaluación de Ética y Valores"
            description={ETHICS_INTRO}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 12:
        return (
          <EthicalDilemmasScreen
            dilemmas={ETHICAL_DILEMMAS}
            answers={ethicalDilemmaAnswers}
            setAnswers={setEthicalDilemmaAnswers}
            onNext={handleSubmit}
            onBack={handleBack}
            isLoading={isLoading}
          />
        );
      case 13:
        return (
          <CompletionScreen 
            assessmentId={assessmentId}
            userData={userData}
            situationalAnswers={situationalAnswers}
            hoganAnswers={hoganStyleAnswers}
            discAnswers={discAnswers}
            cognitiveAnswers={cognitiveAnswers}
            ethicalAnswers={ethicalDilemmaAnswers}
            onRestart={resetState} 
          />
        );
      default:
        return <WelcomeScreen onStart={handleStart} />;
    }
  };

  // Si está en modo admin, mostrar el panel
  if (showAdminPanel) {
    return <AdminPanel onClose={handleCloseAdmin} />;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-800 tracking-tight">
              Plataforma de Desarrollo de Talento
            </h1>
            <p className="mt-3 text-lg text-slate-600">
              Un espacio para el autoconocimiento y el crecimiento profesional.
            </p>
          </header>

          {step > 0 && step < totalSteps - 1 && (
            <div className="mb-8">
              <ProgressBar currentStep={step} totalSteps={totalSteps} />
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md shadow-md" role="alert">
              <h3 className="font-bold">Error</h3>
              <p>{error}</p>
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 md:p-8">
            {renderStep()}
          </div>
        </div>
      </main>
      <footer className="bg-slate-100 text-center py-4 border-t">
        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Todos los derechos reservados. Powered by{' '}
          <button
            type="button"
            onClick={handleAdminAccess}
            className="text-blue-600 hover:text-blue-800 underline-offset-2 hover:underline transition-colors cursor-pointer bg-transparent border-none p-0 font-inherit text-sm"
          >
            BoadMate.net
          </button>
        </p>
      </footer>

      <AdminLogin
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
        onLogin={handleAdminLogin}
      />
    </div>
  );
};

export default App;