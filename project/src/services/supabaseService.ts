import { createClient } from '@supabase/supabase-js';
import { AssessmentData, UserData, AnswerSet, EthicalDilemmaAnswer } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { AssessmentAnalysis } from './geminiService';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export const initializeAssessment = async (): Promise<string> => {
  if (!supabase) {
    console.warn('Supabase not configured, using mock ID');
    return 'mock-assessment-id';
  }
  
  try {
    const assessmentId = uuidv4();
    
    const { error } = await supabase
      .from('assessments')
      .insert({
        id: assessmentId,
        created_at: new Date().toISOString(),
        status: 'in_progress'
      });

    if (error) {
      console.error('Error creating assessment:', error);
      console.warn('Using mock ID for development.');
      return uuidv4();
    }

    return assessmentId;
  } catch (error) {
    console.error('Error creating assessment:', error);
    console.warn('Using mock assessment ID due to database error');
    return 'mock-assessment-id';
  }
};

export const savePersonalData = async (assessmentId: string, userData: UserData) => {
  if (!supabase) {
    console.warn('Supabase not configured. Data not saved.');
    return;
  }

  try {
  const { error } = await supabase
    .from('assessments')
    .update({
        user_data: userData,
      updated_at: new Date().toISOString()
    })
    .eq('id', assessmentId);

  if (error) {
      console.error('Error saving user data:', error);
      throw new Error('Failed to save user data');
  }
  } catch (error) {
    console.error('Error in savePersonalData:', error);
    throw error;
  }
};

export const saveSituationalAnswers = async (assessmentId: string, answers: AnswerSet) => {
  if (!supabase) {
    console.warn('Supabase not configured. Situational answers not saved.');
    return;
  }

  try {
  const { error } = await supabase
    .from('assessments')
    .update({
        situational_answers: answers,
      updated_at: new Date().toISOString()
    })
    .eq('id', assessmentId);

  if (error) {
      console.error('Error saving situational answers:', error);
      throw new Error('Failed to save situational answers');
  }
  } catch (error) {
    console.error('Error in saveSituationalAnswers:', error);
    throw error;
  }
};

export const saveHoganAnswers = async (assessmentId: string, answers: AnswerSet) => {
  if (!supabase) {
    console.warn('Supabase not configured. Hogan answers not saved.');
    return;
  }

  try {
  const { error } = await supabase
    .from('assessments')
    .update({
        hogan_answers: answers,
      updated_at: new Date().toISOString()
    })
    .eq('id', assessmentId);

  if (error) {
      console.error('Error saving hogan answers:', error);
      throw new Error('Failed to save hogan answers');
  }
  } catch (error) {
    console.error('Error in saveHoganAnswers:', error);
    throw error;
  }
};

export const saveDiscAnswers = async (assessmentId: string, answers: AnswerSet) => {
  if (!supabase) {
    console.warn('Supabase not configured. DISC answers not saved.');
    return;
  }

  try {
  const { error } = await supabase
    .from('assessments')
    .update({
        disc_answers: answers,
      updated_at: new Date().toISOString()
    })
    .eq('id', assessmentId);

  if (error) {
      console.error('Error saving DISC answers:', error);
      throw new Error('Failed to save DISC answers');
  }
  } catch (error) {
    console.error('Error in saveDiscAnswers:', error);
    throw error;
  }
};

export const saveCognitiveAnswers = async (assessmentId: string, answers: AnswerSet) => {
  if (!supabase) {
    console.warn('Supabase not configured. Cognitive answers not saved.');
    return;
  }

  try {
  const { error } = await supabase
    .from('assessments')
    .update({
        cognitive_answers: answers,
      updated_at: new Date().toISOString()
    })
    .eq('id', assessmentId);

  if (error) {
      console.error('Error saving cognitive answers:', error);
      throw new Error('Failed to save cognitive answers');
  }
  } catch (error) {
    console.error('Error in saveCognitiveAnswers:', error);
    throw error;
  }
};

export const saveEthicalAnswers = async (assessmentId: string, answers: Record<string, EthicalDilemmaAnswer>) => {
  if (!supabase) {
    console.warn('Supabase not configured. Ethical answers not saved.');
    return;
  }

  try {
    const { error } = await supabase
      .from('assessments')
      .update({
        ethical_answers: answers,
        updated_at: new Date().toISOString()
      })
      .eq('id', assessmentId);

    if (error) {
      console.error('Error saving ethical answers:', error);
      throw new Error('Failed to save ethical answers');
    }
  } catch (error) {
    console.error('Error in saveEthicalAnswers:', error);
    throw error;
  }
};

export const saveAIAnalysis = async (assessmentId: string, analysis: AssessmentAnalysis) => {
  if (!supabase) {
    console.warn('Supabase not configured. AI analysis not saved.');
    return;
  }

  try {
    const { error } = await supabase
      .from('assessments')
      .update({
        ai_analysis: analysis,
        updated_at: new Date().toISOString()
      })
      .eq('id', assessmentId);

    if (error) {
      console.error('Error saving AI analysis:', error);
      throw new Error('Failed to save AI analysis');
    }
  } catch (error) {
    console.error('Error in saveAIAnalysis:', error);
    throw error;
  }
};

export const saveCompletePDF = async (assessmentId: string, pdfData: string) => {
  if (!supabase) {
    console.warn('Supabase not configured. PDF not saved.');
    return;
  }

  try {
  const { error } = await supabase
    .from('assessments')
    .update({
        complete_report_pdf: pdfData,
        updated_at: new Date().toISOString()
      })
      .eq('id', assessmentId);

    if (error) {
      console.error('Error saving PDF:', error);
      throw new Error('Failed to save PDF');
    }
  } catch (error) {
    console.error('Error in saveCompletePDF:', error);
    throw error;
  }
};

export const completeAssessment = async (assessmentId: string) => {
  if (!supabase) {
    console.warn('Supabase not configured. Assessment completion not saved.');
    return;
  }

  try {
    const { error } = await supabase
      .from('assessments')
      .update({
      status: 'completed',
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('id', assessmentId);

  if (error) {
      console.error('Error completing assessment:', error);
      throw new Error('Failed to complete assessment');
  }
  } catch (error) {
    console.error('Error in completeAssessment:', error);
    throw error;
  }
};

export const getAssessment = async (assessmentId: string) => {
  if (!supabase) {
    console.warn('Supabase not configured. Cannot fetch assessment.');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('assessments')
      .select('*')
      .eq('id', assessmentId)
      .single();

    if (error) {
      console.error('Error fetching assessment:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getAssessment:', error);
    return null;
  }
};

export const deleteAssessment = async (assessmentId: string) => {
  if (!supabase) {
    console.warn('Supabase not configured. Cannot delete assessment.');
    return false;
  }

  try {
    const { error } = await supabase
      .from('assessments')
      .delete()
      .eq('id', assessmentId);

    if (error) {
      console.error('Error deleting assessment:', error);
      throw new Error('Failed to delete assessment');
    }

    return true;
  } catch (error) {
    console.error('Error in deleteAssessment:', error);
    throw error;
  }
};

export const getAllAssessments = async () => {
  if (!supabase) {
    console.warn('Supabase not configured. Cannot fetch assessments.');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('assessments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching assessments:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getAllAssessments:', error);
    return [];
  }
};