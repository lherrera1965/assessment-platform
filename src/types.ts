export type AssessmentStep = 
  | 'welcome'
  | 'personalData'
  | 'professionalProfile'
  | 'assessmentIntro'
  | 'leadershipTest'
  | 'ethicalDilemmas'
  | 'completion';

export interface PersonalData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  company: string;
}

export interface ProfessionalProfile {
  experience: string;
  industry: string;
  teamSize: string;
  leadership: boolean;
}

export interface LeadershipResults {
  [key: string]: any;
}

export interface EthicalResults {
  [key: string]: any;
}

export interface AssessmentData {
  id: string;
  personalData: PersonalData;
  professionalProfile: ProfessionalProfile;
  leadershipResults: LeadershipResults;
  ethicalResults: EthicalResults;
  completedAt: string | null;
  createdAt: string;
  startTime?: string;
  endTime?: string;
  totalDuration?: number; // en minutos
  sectionTimes?: {
    personalData?: number;
    professionalProfile?: number;
    situationalTest?: number;
    hoganTest?: number;
    discTest?: number;
    cognitiveTest?: number;
    ethicalDilemmas?: number;
  };
}

export interface UserData {
  name: string;
  email: string;
  phone: string;
  company: string;
  employeeId: string;
  position: string;
  department: string;
  educationLevel: string;
  educationHistory: EducationEntry[];
  workExperience: WorkExperienceEntry[];
  strengths: string;
  opportunities: string;
  achievements: string;
  goals: string;
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  startYear: string;
  endYear: string;
}

export interface WorkExperienceEntry {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
}

export interface AnswerSet {
  [questionId: string]: string;
}

export interface ProfileData {
  userData: UserData;
  situationalTest: AnswerSet;
  hoganStyleTest: AnswerSet;
  discTest: AnswerSet;
  cognitiveTest: AnswerSet;
  ethicalDilemmas: Record<string, EthicalDilemmaAnswer>;
  situationalReportPDF: string;
  hoganStyleReportPDF: string;
  discReportPDF: string;
  cognitiveReportPDF: string;
  ethicalReportPDF: string;
}

export interface EthicalDilemma {
  id: string;
  scenario: string;
  mainQuestion: string;
  followUpQuestions: string[];
}

export interface EthicalDilemmaAnswer {
  mainAnswer: string;
  followUp1Answer: string;
  followUp2Answer: string;
}

export interface Question {
  id: string;
  text: string;
  options: Array<{ value: string; label: string }>;
  required?: boolean;
}

export interface TestSection {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  timeLimit?: number;
}