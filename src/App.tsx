import React, { useState, useEffect } from 'react';
import { ETHICAL_DILEMMAS } from './constants';
import WelcomeScreen from './components/screens/WelcomeScreen';
import PersonalDataForm from './components/screens/PersonalDataForm';
import ProfessionalProfileScreen from './components/screens/ProfessionalProfileScreen';
import AssessmentIntroScreen from './components/screens/AssessmentIntroScreen';
import LeadershipTest from './components/screens/LeadershipTest';
import EthicalDilemmasScreen from './components/screens/EthicalDilemmasScreen';
import CompletionScreen from './components/screens/CompletionScreen';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import ProgressBar from './components/ProgressBar';
import { EthicalDilemmaAnswer } from './types';
import { supabase } from './services/supabaseService';

type Screen = 
  | 'welcome' 
  | 'personal-data' 
  | 'professional-profile' 
  | 'assessment-intro' 
  | 'leadership-test' 
  | 'hogan-test' 
  | 'disc-test' 
  | 'cognitive-test' 
  | 'ethical-dilemmas' 
  | 'completion'
  | 'admin-login'
  | 'admin-panel';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  const [assessment, setAssessment] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [ethicalAnswers, setEthicalAnswers] = useState<Record<string, EthicalDilemmaAnswer>>({});
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  useEffect(() => {
    // Check if we're in admin mode
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      setShowAdminLogin(true);
    }
  }, []);

  const createAssessment = async () => {
    try {
      const { data, error } = await supabase
        .from('assessments')
        .insert([{ status: 'in_progress' }])
        .select()
        .single();

      if (error) throw error;

      setAssessmentId(data.id);
      setAssessment(data);
      setCurrentScreen('personal-data');
    } catch (error) {
      console.error('Error creating assessment:', error);
      alert('Error al crear la evaluación. Por favor, intenta de nuevo.');
    }
  };

  const updateAssessment = async (updates: any) => {
    if (!assessmentId) return;

    try {
      const { data, error } = await supabase
        .from('assessments')
        .update(updates)
        .eq('id', assessmentId)
        .select()
        .single();

      if (error) throw error;

      setAssessment(data);
    } catch (error) {
      console.error('Error updating assessment:', error);
      alert('Error al actualizar la evaluación. Por favor, intenta de nuevo.');
    }
  };

  const getProgressPercentage = (): number => {
    const screenOrder: Screen[] = [
      'welcome',
      'personal-data', 
      'professional-profile',
      'assessment-intro',
      'leadership-test',
      'hogan-test',
      'disc-test',
      'cognitive-test',
      'ethical-dilemmas',
      'completion'
    ];
    
    const currentIndex = screenOrder.indexOf(currentScreen);
    return currentIndex >= 0 ? (currentIndex / (screenOrder.length - 1)) * 100 : 0;
  };

  const handleAdminLogin = () => {
    setIsAdmin(true);
    setShowAdminLogin(false);
    setCurrentScreen('welcome');
  };

  const handleAdminClose = () => {
    setIsAdmin(false);
    setCurrentScreen('welcome');
  };

  const handleAdminAccess = () => {
    setShowAdminLogin(true);
  };

  if (showAdminLogin) {
    return (
      <AdminLogin 
        isOpen={true}
        onClose={() => setShowAdminLogin(false)}
        onLogin={handleAdminLogin}
      />
    );
  }

  if (currentScreen === 'admin-panel') {
    return <AdminPanel onClose={handleAdminClose} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {currentScreen === 'welcome' && (
          <WelcomeScreen 
            onStart={createAssessment} 
            onAdminAccess={handleAdminAccess}
            isAdmin={isAdmin}
            onAdminPanelOpen={() => setCurrentScreen('admin-panel')}
          />
        )}
        
        {currentScreen === 'personal-data' && (
          <PersonalDataForm
            onNext={(data) => {
              updateAssessment({ personal_data: data });
              setCurrentScreen('professional-profile');
            }}
          />
        )}
        
        {currentScreen === 'professional-profile' && (
          <ProfessionalProfileScreen
            onNext={(data) => {
              updateAssessment({ professional_profile: data });
              setCurrentScreen('assessment-intro');
            }}
          />
        )}
        
        {currentScreen === 'assessment-intro' && (
          <AssessmentIntroScreen
            onNext={() => setCurrentScreen('leadership-test')}
          />
        )}
        
        {currentScreen === 'leadership-test' && (
          <LeadershipTest
            onNext={(answers) => {
              updateAssessment({ situational_answers: answers });
              setCurrentScreen('hogan-test');
            }}
          />
        )}
        
        {currentScreen === 'hogan-test' && (
          <LeadershipTest
            testType="hogan"
            onNext={(answers) => {
              updateAssessment({ hogan_answers: answers });
              setCurrentScreen('disc-test');
            }}
          />
        )}
        
        {currentScreen === 'disc-test' && (
          <LeadershipTest
            testType="disc"
            onNext={(answers) => {
              updateAssessment({ disc_answers: answers });
              setCurrentScreen('cognitive-test');
            }}
          />
        )}
        
        {currentScreen === 'cognitive-test' && (
          <LeadershipTest
            testType="cognitive"
            onNext={(answers) => {
              updateAssessment({ cognitive_answers: answers });
              setCurrentScreen('ethical-dilemmas');
            }}
          />
        )}
        
        {currentScreen === 'ethical-dilemmas' && (
          <EthicalDilemmasScreen
            dilemmas={ETHICAL_DILEMMAS}
            answers={ethicalAnswers}
            setAnswers={setEthicalAnswers}
            onNext={(answers) => {
              updateAssessment({ 
                ethical_answers: answers,
                completed_at: new Date().toISOString(),
                status: 'completed'
              });
              setCurrentScreen('completion');
            }}
          />
        )}
        
        {currentScreen === 'completion' && assessmentId && (
          <CompletionScreen 
            assessmentId={assessmentId}
            onRestart={() => {
              setCurrentScreen('welcome');
              setAssessmentId(null);
              setAssessment(null);
              setEthicalAnswers({});
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;