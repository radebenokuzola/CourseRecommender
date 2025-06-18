import { Course } from '../types';

export const courses: Course[] = [
  {
    id: 'medicine-uct',
    name: 'Bachelor of Medicine and Bachelor of Surgery (MBChB)',
    university: 'University of Cape Town',
    faculty: 'Faculty of Health Sciences',
    description: 'A comprehensive 6-year medical degree program that prepares students to become qualified medical doctors. The program combines theoretical knowledge with practical clinical experience in hospitals and clinics.',
    duration: '6 years',
    qualification: 'MBChB',
    minimumAPS: 42,
    specificRequirements: {
      mathematics: 70,
      physicalSciences: 70,
      english: 60,
      englishLevel: 'HL',
      additionalRequirements: [
        'Life Sciences recommended (60%+)',
        'National Benchmark Test (NBT) required',
        'Interview and selection process',
        'Medical fitness certificate required'
      ]
    },
    careerOpportunities: [
      'General Practitioner',
      'Specialist Doctor',
      'Surgeon',
      'Medical Researcher',
      'Public Health Officer',
      'Medical Officer'
    ],
    relatedInterests: [
      'helping people',
      'science',
      'medicine',
      'healthcare',
      'research',
      'biology'
    ],
    languageOfInstruction: ['English']
  },
  {
    id: 'engineering-wits',
    name: 'Bachelor of Science in Engineering (Mechanical)',
    university: 'University of the Witwatersrand',
    faculty: 'Faculty of Engineering and the Built Environment',
    description: 'A 4-year program focusing on mechanical engineering principles, thermodynamics, fluid mechanics, materials science, and design. Students learn to solve complex engineering problems and design mechanical systems.',
    duration: '4 years',
    qualification: 'BSc Engineering (Mechanical)',
    minimumAPS: 38,
    specificRequirements: {
      mathematics: 70,
      physicalSciences: 70,
      english: 50,
      englishLevel: 'HL',
      additionalRequirements: [
        'National Benchmark Test (NBT) required',
        'Engineering Graphics and Design recommended'
      ]
    },
    careerOpportunities: [
      'Mechanical Engineer',
      'Design Engineer',
      'Manufacturing Engineer',
      'Project Manager',
      'Consulting Engineer',
      'Research and Development Engineer'
    ],
    relatedInterests: [
      'mathematics',
      'science',
      'technology',
      'engineering',
      'design',
      'mechanics'
    ],
    languageOfInstruction: ['English']
  },
  {
    id: 'computer-science-up',
    name: 'Bachelor of Science in Computer Science',
    university: 'University of Pretoria',
    faculty: 'Faculty of Engineering, Built Environment and Information Technology',
    description: 'A comprehensive program covering programming languages, algorithms, software engineering, database systems, artificial intelligence, and computer networks. Prepares students for careers in the technology industry.',
    duration: '3 years',
    qualification: 'BSc Computer Science',
    minimumAPS: 32,
    specificRequirements: {
      mathematics: 60,
      english: 50,
      additionalRequirements: [
        'Physical Sciences recommended (50%+)',
        'Information Technology advantageous',
        'Computer Applications Technology acceptable alternative'
      ]
    },
    careerOpportunities: [
      'Software Developer',
      'Systems Analyst',
      'Data Scientist',
      'Cybersecurity Specialist',
      'IT Consultant',
      'Database Administrator'
    ],
    relatedInterests: [
      'technology',
      'computers',
      'mathematics',
      'engineering',
      'design'
    ],
    languageOfInstruction: ['English', 'Afrikaans']
  },
  {
    id: 'agricultural-sciences-up',
    name: 'Bachelor of Science in Agricultural Sciences',
    university: 'University of Pretoria',
    faculty: 'Faculty of Natural and Agricultural Sciences',
    description: 'A comprehensive program covering crop production, animal science, soil science, agricultural economics, and sustainable farming practices. Prepares students for careers in modern agriculture and food security.',
    duration: '4 years',
    qualification: 'BSc Agricultural Sciences',
    minimumAPS: 28,
    specificRequirements: {
      mathematics: 50,
      lifeSciencies: 50,
      english: 50,
      additionalRequirements: [
        'Agricultural Sciences highly recommended',
        'Physical Sciences recommended',
        'Geography advantageous'
      ]
    },
    careerOpportunities: [
      'Agricultural Scientist',
      'Farm Manager',
      'Agricultural Consultant',
      'Crop Specialist',
      'Livestock Specialist',
      'Agricultural Extension Officer'
    ],
    relatedInterests: [
      'agriculture',
      'environment',
      'science',
      'animals',
      'plants',
      'sustainability'
    ],
    languageOfInstruction: ['English', 'Afrikaans']
  },
  {
    id: 'law-uct',
    name: 'Bachelor of Laws (LLB)',
    university: 'University of Cape Town',
    faculty: 'Faculty of Law',
    description: 'A 4-year undergraduate law degree providing comprehensive legal education covering constitutional law, criminal law, contract law, and human rights law. Includes practical legal training and moot court experience.',
    duration: '4 years',
    qualification: 'LLB',
    minimumAPS: 35,
    specificRequirements: {
      english: 70,
      englishLevel: 'HL',
      additionalRequirements: [
        'Strong language and communication skills required',
        'Critical thinking and analytical abilities',
        'National Benchmark Test (NBT) required',
        'History recommended'
      ]
    },
    careerOpportunities: [
      'Attorney',
      'Advocate',
      'Legal Advisor',
      'Magistrate',
      'Corporate Lawyer',
      'Human Rights Lawyer',
      'Prosecutor'
    ],
    relatedInterests: [
      'law',
      'human rights',
      'politics',
      'helping people',
      'writing',
      'research'
    ],
    languageOfInstruction: ['English']
  },
  {
    id: 'business-stellenbosch',
    name: 'Bachelor of Commerce (BCom)',
    university: 'Stellenbosch University',
    faculty: 'Faculty of Economic and Management Sciences',
    description: 'A comprehensive business degree covering accounting, finance, marketing, management, and economics. Students can specialize in various fields and gain practical business experience through internships.',
    duration: '3 years',
    qualification: 'BCom',
    minimumAPS: 30,
    specificRequirements: {
      mathematics: 50,
      english: 50,
      additionalRequirements: [
        'Accounting recommended (50%+)',
        'Business Studies advantageous',
        'Economics recommended'
      ]
    },
    careerOpportunities: [
      'Financial Analyst',
      'Marketing Manager',
      'Business Consultant',
      'Accountant',
      'Investment Banker',
      'Entrepreneur',
      'Management Trainee'
    ],
    relatedInterests: [
      'business',
      'finance',
      'economics',
      'leadership',
      'mathematics'
    ],
    languageOfInstruction: ['English', 'Afrikaans']
  },
  {
    id: 'psychology-ukzn',
    name: 'Bachelor of Social Science in Psychology',
    university: 'University of KwaZulu-Natal',
    faculty: 'Faculty of Humanities',
    description: 'A comprehensive psychology program covering human behavior, cognitive processes, developmental psychology, social psychology, and research methods. Includes practical training in psychological assessment and counseling.',
    duration: '3 years',
    qualification: 'BA Psychology',
    minimumAPS: 28,
    specificRequirements: {
      english: 60,
      englishLevel: 'HL',
      additionalRequirements: [
        'Life Sciences recommended (50%+)',
        'Mathematics or Mathematical Literacy acceptable',
        'Strong communication skills required'
      ]
    },
    careerOpportunities: [
      'Clinical Psychologist',
      'Counselor',
      'Human Resources Specialist',
      'Research Psychologist',
      'Educational Psychologist',
      'Industrial Psychologist'
    ],
    relatedInterests: [
      'helping people',
      'psychology',
      'research',
      'healthcare',
      'human rights'
    ],
    languageOfInstruction: ['English']
  },
  {
    id: 'teaching-nwu',
    name: 'Bachelor of Education (BEd) - Foundation Phase',
    university: 'North-West University',
    faculty: 'Faculty of Education',
    description: 'A 4-year teaching degree specializing in foundation phase education (Grades R-3). Covers child development, literacy and numeracy teaching methods, and classroom management.',
    duration: '4 years',
    qualification: 'BEd Foundation Phase',
    minimumAPS: 26,
    specificRequirements: {
      english: 50,
      englishLevel: 'HL',
      additionalRequirements: [
        'Mathematics or Mathematical Literacy (40%+)',
        'Teaching aptitude assessment',
        'Good communication skills required',
        'Criminal background check required'
      ]
    },
    careerOpportunities: [
      'Foundation Phase Teacher',
      'Grade R Teacher',
      'Educational Specialist',
      'Curriculum Developer',
      'School Principal',
      'Educational Consultant'
    ],
    relatedInterests: [
      'teaching',
      'helping people',
      'working with children',
      'education'
    ],
    languageOfInstruction: ['English', 'Afrikaans']
  },
  {
    id: 'sports-science-ufs',
    name: 'Bachelor of Science in Sport Science',
    university: 'University of the Free State',
    faculty: 'Faculty of Health Sciences',
    description: 'A program focusing on exercise physiology, biomechanics, sports psychology, sports nutrition, and sports management. Includes practical training in fitness assessment and sports performance analysis.',
    duration: '3 years',
    qualification: 'BSc Sport Science',
    minimumAPS: 28,
    specificRequirements: {
      mathematics: 50,
      lifeSciencies: 50,
      english: 50,
      additionalRequirements: [
        'Physical Sciences recommended (50%+)',
        'Physical fitness assessment required',
        'Sports participation advantageous'
      ]
    },
    careerOpportunities: [
      'Sports Scientist',
      'Fitness Trainer',
      'Sports Coach',
      'Exercise Physiologist',
      'Sports Manager',
      'Sports Nutritionist'
    ],
    relatedInterests: [
      'sports',
      'fitness',
      'health',
      'science',
      'helping people'
    ],
    physicalRequirements: [
      'Good physical fitness required',
      'Interest in sports and exercise',
      'Ability to demonstrate physical activities'
    ],
    languageOfInstruction: ['English', 'Afrikaans']
  },
  {
    id: 'nursing-wits',
    name: 'Bachelor of Nursing Science',
    university: 'University of the Witwatersrand',
    faculty: 'Faculty of Health Sciences',
    description: 'A 4-year comprehensive nursing program covering medical-surgical nursing, pediatric nursing, psychiatric nursing, and community health nursing. Includes extensive clinical practice in hospitals and clinics.',
    duration: '4 years',
    qualification: 'BNSc',
    minimumAPS: 32,
    specificRequirements: {
      mathematics: 50,
      lifeSciencies: 60,
      english: 60,
      englishLevel: 'HL',
      additionalRequirements: [
        'Physical Sciences recommended (50%+)',
        'Medical fitness certificate required',
        'Criminal background check required',
        'Interview may be required'
      ]
    },
    careerOpportunities: [
      'Professional Nurse',
      'Nurse Manager',
      'Clinical Nurse Specialist',
      'Community Health Nurse',
      'Nurse Educator',
      'Nurse Researcher'
    ],
    relatedInterests: [
      'helping people',
      'healthcare',
      'medicine',
      'science'
    ],
    languageOfInstruction: ['English']
  }
];