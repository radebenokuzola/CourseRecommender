import { Student, Course, RecommendationResult } from '../types';
import { calculateAPS } from './apsCalculator';

function calculateInterestMatch(studentInterests: string[], course: Course): number {
  if (studentInterests.length === 0) return 0.5;
  
  const matchingInterests = course.relatedInterests.filter(interest =>
    studentInterests.some(studentInterest => 
      interest.toLowerCase().includes(studentInterest.toLowerCase()) ||
      studentInterest.toLowerCase().includes(interest.toLowerCase()) ||
      // Enhanced matching for related terms
      (studentInterest.toLowerCase().includes('science') && interest.toLowerCase().includes('science')) ||
      (studentInterest.toLowerCase().includes('technology') && interest.toLowerCase().includes('technology')) ||
      (studentInterest.toLowerCase().includes('medicine') && interest.toLowerCase().includes('healthcare')) ||
      (studentInterest.toLowerCase().includes('business') && interest.toLowerCase().includes('business')) ||
      (studentInterest.toLowerCase().includes('engineering') && interest.toLowerCase().includes('engineering')) ||
      (studentInterest.toLowerCase().includes('programming') && interest.toLowerCase().includes('technology')) ||
      (studentInterest.toLowerCase().includes('coding') && interest.toLowerCase().includes('technology')) ||
      (studentInterest.toLowerCase().includes('sports') && interest.toLowerCase().includes('sports')) ||
      (studentInterest.toLowerCase().includes('fitness') && interest.toLowerCase().includes('sports')) ||
      (studentInterest.toLowerCase().includes('teaching') && interest.toLowerCase().includes('education')) ||
      (studentInterest.toLowerCase().includes('law') && interest.toLowerCase().includes('law')) ||
      (studentInterest.toLowerCase().includes('psychology') && interest.toLowerCase().includes('psychology'))
    )
  );
  
  return Math.min(1, matchingInterests.length / Math.max(1, course.relatedInterests.length) + 0.1);
}

function calculatePhysicalTalentMatch(physicalTalents: string, course: Course): number {
  if (!physicalTalents || !course.physicalRequirements) return 0.5;
  
  const talents = physicalTalents.toLowerCase();
  const hasPhysicalMatch = course.physicalRequirements.some(req =>
    talents.includes(req.toLowerCase()) || req.toLowerCase().includes(talents)
  );
  
  return hasPhysicalMatch ? 1 : 0.3;
}

function checkSpecificRequirements(student: Student, course: Course): { meets: boolean; missing: string[] } {
  const missing: string[] = [];
  const requirements = course.specificRequirements;
  const subjects = student.selectedSubjects;
  
  // Check mathematics requirement
  if (requirements.mathematics) {
    const mathSubject = subjects.mathematics || subjects.mathematicalLiteracy;
    if (!mathSubject || mathSubject.mark < requirements.mathematics) {
      missing.push(`Mathematics: Need ${requirements.mathematics}%, have ${mathSubject?.mark || 0}%`);
    }
  }
  
  // Check physical sciences requirement
  if (requirements.physicalSciences) {
    const physSci = subjects.physicalSciences;
    if (!physSci || physSci.mark < requirements.physicalSciences) {
      missing.push(`Physical Sciences: Need ${requirements.physicalSciences}%, have ${physSci?.mark || 0}%`);
    }
  }
  
  // Check life sciences requirement
  if (requirements.lifeSciencies) {
    const lifeSci = subjects.lifeSciencies;
    if (!lifeSci || lifeSci.mark < requirements.lifeSciencies) {
      missing.push(`Life Sciences: Need ${requirements.lifeSciencies}%, have ${lifeSci?.mark || 0}%`);
    }
  }
  
  // Check English requirement
  if (requirements.english) {
    const english = subjects.english;
    if (!english || english.mark < requirements.english) {
      missing.push(`English: Need ${requirements.english}%, have ${english?.mark || 0}%`);
    }
    
    // Check English level if specified
    if (requirements.englishLevel && english && english.level !== requirements.englishLevel) {
      missing.push(`English level: Need ${requirements.englishLevel}, have ${english.level || 'HL'}`);
    }
  }
  
  // Check Afrikaans requirement
  if (requirements.afrikaans) {
    const afrikaans = subjects.afrikaans;
    if (!afrikaans || afrikaans.mark < requirements.afrikaans) {
      missing.push(`Afrikaans: Need ${requirements.afrikaans}%, have ${afrikaans?.mark || 0}%`);
    }
    
    // Check Afrikaans level if specified
    if (requirements.afrikaansLevel && afrikaans && afrikaans.level !== requirements.afrikaansLevel) {
      missing.push(`Afrikaans level: Need ${requirements.afrikaansLevel}, have ${afrikaans.level || 'HL'}`);
    }
  }
  
  return { meets: missing.length === 0, missing };
}

export function generateRecommendations(
  student: Student,
  availableCourses: Course[]
): RecommendationResult[] {
  const apsScore = calculateAPS(student.selectedSubjects);
  
  const recommendations = availableCourses.map(course => {
    const interestMatch = calculateInterestMatch(student.interests, course);
    const physicalMatch = calculatePhysicalTalentMatch(student.physicalTalents, course);
    const requirementCheck = checkSpecificRequirements(student, course);
    
    // Calculate match score
    let matchScore = (interestMatch * 0.4 + physicalMatch * 0.2);
    
    // Bonus for meeting APS requirements
    if (apsScore >= course.minimumAPS) {
      matchScore += 0.4;
    } else {
      matchScore += 0.1; // Small score for courses slightly out of reach
    }
    
    const reasons: string[] = [];
    
    if (apsScore >= course.minimumAPS) {
      reasons.push(`Your APS score (${apsScore}) meets the minimum requirement (${course.minimumAPS})`);
    } else {
      reasons.push(`Your APS score (${apsScore}) is below the minimum requirement (${course.minimumAPS})`);
    }
    
    if (interestMatch > 0.3) {
      const matchingInterests = student.interests.filter(interest =>
        course.relatedInterests.some(courseInterest =>
          interest.toLowerCase().includes(courseInterest.toLowerCase()) ||
          courseInterest.toLowerCase().includes(interest.toLowerCase())
        )
      );
      if (matchingInterests.length > 0) {
        reasons.push(`Aligns with your interests: ${matchingInterests.slice(0, 3).join(', ')}`);
      }
    }
    
    if (course.physicalRequirements && physicalMatch > 0.5) {
      reasons.push('Matches your physical talents and abilities');
    }
    
    if (requirementCheck.meets) {
      reasons.push('You meet all specific subject requirements');
    }

    return {
      course,
      matchScore,
      apsScore,
      meetsRequirements: apsScore >= course.minimumAPS && requirementCheck.meets,
      reasons,
      missingRequirements: requirementCheck.missing.length > 0 ? requirementCheck.missing : undefined
    };
  });

  // Sort by match score, but prioritize courses where requirements are met
  return recommendations.sort((a, b) => {
    if (a.meetsRequirements && !b.meetsRequirements) return -1;
    if (!a.meetsRequirements && b.meetsRequirements) return 1;
    return b.matchScore - a.matchScore;
  });
}