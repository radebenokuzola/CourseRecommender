import { Student } from '../types';

export function calculateAPS(selectedSubjects: Student['selectedSubjects']): number {
  // APS calculation based on best 6 subjects including compulsory subjects
  const subjects = Object.entries(selectedSubjects);
  
  // Convert percentage to APS points (7-point scale)
  const convertToAPS = (percentage: number): number => {
    if (percentage >= 80) return 7;
    if (percentage >= 70) return 6;
    if (percentage >= 60) return 5;
    if (percentage >= 50) return 4;
    if (percentage >= 40) return 3;
    if (percentage >= 30) return 2;
    return 1;
  };

  // Life Orientation is compulsory but counts as half points
  let totalAPS = 0;
  let subjectCount = 0;

  // Add Life Orientation (counts as half)
  if (selectedSubjects.lifeOrientation) {
    totalAPS += convertToAPS(selectedSubjects.lifeOrientation.mark) * 0.5;
  }

  // Add best 6 other subjects (excluding Life Orientation)
  const otherSubjects = subjects
    .filter(([subject]) => subject !== 'lifeOrientation')
    .sort(([, a], [, b]) => b.mark - a.mark)
    .slice(0, 6);

  otherSubjects.forEach(([, subjectData]) => {
    totalAPS += convertToAPS(subjectData.mark);
    subjectCount++;
  });

  return Math.round(totalAPS);
}