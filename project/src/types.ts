export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Student {
  // Selected subjects with their marks
  selectedSubjects: {
    [subject: string]: {
      mark: number;
      level?: 'HL' | 'FAL'; // For languages
    };
  };
  interests: string[];
  physicalTalents: string;
  preferredLanguage: 'English' | 'Afrikaans' | 'Both';
}

export interface Course {
  id: string;
  name: string;
  university: string;
  faculty: string;
  description: string;
  duration: string;
  qualification: string;
  minimumAPS: number;
  specificRequirements: {
    mathematics?: number;
    physicalSciences?: number;
    lifeSciencies?: number;
    english?: number;
    englishLevel?: 'HL' | 'FAL';
    afrikaans?: number;
    afrikaansLevel?: 'HL' | 'FAL';
    additionalRequirements?: string[];
  };
  careerOpportunities: string[];
  relatedInterests: string[];
  physicalRequirements?: string[];
  languageOfInstruction: string[];
}

export interface RecommendationResult {
  course: Course;
  matchScore: number;
  apsScore: number;
  meetsRequirements: boolean;
  reasons: string[];
  missingRequirements?: string[];
}

export interface Subject {
  code: string;
  name: string;
  hasLevels: boolean; // For languages that have HL/FAL
}