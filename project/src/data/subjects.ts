import { Subject } from '../types';

export const availableSubjects: Subject[] = [
  // Core subjects
  { code: 'mathematics', name: 'Mathematics', hasLevels: false },
  { code: 'mathematicalLiteracy', name: 'Mathematical Literacy', hasLevels: false },
  { code: 'english', name: 'English Home Language', hasLevels: true },
  { code: 'afrikaans', name: 'Afrikaans', hasLevels: true },
  { code: 'isiZulu', name: 'isiZulu', hasLevels: true },
  { code: 'isiXhosa', name: 'isiXhosa', hasLevels: true },
  { code: 'sepedi', name: 'Sepedi', hasLevels: true },
  { code: 'setswana', name: 'Setswana', hasLevels: true },
  { code: 'sesotho', name: 'Sesotho', hasLevels: true },
  { code: 'siswati', name: 'siSwati', hasLevels: true },
  { code: 'tshivenda', name: 'Tshivenda', hasLevels: true },
  { code: 'xitsonga', name: 'Xitsonga', hasLevels: true },
  { code: 'ndebele', name: 'isiNdebele', hasLevels: true },
  
  // Sciences
  { code: 'physicalSciences', name: 'Physical Sciences', hasLevels: false },
  { code: 'lifeSciencies', name: 'Life Sciences', hasLevels: false },
  { code: 'agriculturalSciences', name: 'Agricultural Sciences', hasLevels: false },
  
  // Social Sciences
  { code: 'geography', name: 'Geography', hasLevels: false },
  { code: 'history', name: 'History', hasLevels: false },
  
  // Commercial subjects
  { code: 'accounting', name: 'Accounting', hasLevels: false },
  { code: 'businessStudies', name: 'Business Studies', hasLevels: false },
  { code: 'economics', name: 'Economics', hasLevels: false },
  
  // Technical subjects
  { code: 'engineeringGraphicsDesign', name: 'Engineering Graphics and Design', hasLevels: false },
  { code: 'mechanicalTechnology', name: 'Mechanical Technology', hasLevels: false },
  { code: 'electricalTechnology', name: 'Electrical Technology', hasLevels: false },
  { code: 'civilTechnology', name: 'Civil Technology', hasLevels: false },
  { code: 'informationTechnology', name: 'Information Technology', hasLevels: false },
  { code: 'computerApplicationsTechnology', name: 'Computer Applications Technology', hasLevels: false },
  
  // Arts and Culture
  { code: 'visualArts', name: 'Visual Arts', hasLevels: false },
  { code: 'music', name: 'Music', hasLevels: false },
  { code: 'dramaticArts', name: 'Dramatic Arts', hasLevels: false },
  { code: 'dance', name: 'Dance Studies', hasLevels: false },
  
  // Other subjects
  { code: 'lifeOrientation', name: 'Life Orientation', hasLevels: false },
  { code: 'tourism', name: 'Tourism', hasLevels: false },
  { code: 'consumerStudies', name: 'Consumer Studies', hasLevels: false },
  { code: 'hospitalityStudies', name: 'Hospitality Studies', hasLevels: false },
  { code: 'religion', name: 'Religion Studies', hasLevels: false },
];