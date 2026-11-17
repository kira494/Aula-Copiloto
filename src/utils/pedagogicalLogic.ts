import { StudentBitacora, ClassroomSituation, GeneratedStrategyPayload } from '../types';

export function filterStudentsByQuery(
  students: StudentBitacora[],
  query: string,
  gradeFilter: string = 'all'
): StudentBitacora[] {
  const cleanQ = query.trim().toLowerCase();
  return students.filter(s => {
    const matchesQ = 
      !cleanQ ||
      s.studentName.toLowerCase().includes(cleanQ) ||
      s.internalCode.toLowerCase().includes(cleanQ) ||
      s.learningContext.personalInterests.some(i => i.toLowerCase().includes(cleanQ));
    
    const matchesGrade = gradeFilter === 'all' || s.grade === gradeFilter;
    return matchesQ && matchesGrade;
  });
}

export function validateStrategyPayload(payload: any): boolean {
  if (!payload) return false;
  const hasInterp = Boolean(
    payload.interpretation &&
    Array.isArray(payload.interpretation.observedFacts) &&
    Array.isArray(payload.interpretation.aiHypotheses)
  );
  const hasStrats = Array.isArray(payload.strategies) && payload.strategies.length >= 3;
  const hasScript = Boolean(payload.practicalClassroomScript && Array.isArray(payload.practicalClassroomScript.teacherScript));
  const hasRubric = Boolean(payload.evaluationRubric && Array.isArray(payload.evaluationRubric.evaluationCriteria));
  return hasInterp && hasStrats && hasScript && hasRubric;
}
