import { RecommendationResult } from '../types';
import { availableSubjects } from '../data/subjects';

interface RecommendationListProps {
  recommendations: RecommendationResult[];
}

export function RecommendationList({ recommendations }: RecommendationListProps) {
  const getSubjectName = (subjectCode: string) => {
    const subject = availableSubjects.find(s => s.code === subjectCode);
    return subject ? subject.name : subjectCode;
  };

  return (
    <div className="space-y-6">
      {recommendations.map(({ course, matchScore, apsScore, meetsRequirements, reasons, missingRequirements }) => (
        <div
          key={course.id}
          className={`bg-white shadow-lg overflow-hidden sm:rounded-lg border-l-4 ${
            meetsRequirements ? 'border-green-500' : 'border-yellow-500'
          }`}
        >
          <div className="px-6 py-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl leading-6 font-bold text-gray-900">
                {course.name}
              </h3>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  meetsRequirements ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {meetsRequirements ? 'Eligible' : 'Check Requirements'}
                </span>
                <span className="text-sm font-medium text-gray-500">
                  Match: {(matchScore * 100).toFixed(0)}%
                </span>
              </div>
            </div>
            <p className="mt-1 text-sm text-gray-600">
              {course.university} • {course.faculty}
            </p>
          </div>
          
          <div className="border-t border-gray-200 px-6 py-5">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Description</dt>
                <dd className="mt-1 text-sm text-gray-900">{course.description}</dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500">Qualification & Duration</dt>
                <dd className="mt-1 text-sm text-gray-900">{course.qualification} • {course.duration}</dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500">Your APS Score</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <span className={apsScore >= course.minimumAPS ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                    {apsScore}
                  </span>
                  <span className="text-gray-500"> / {course.minimumAPS} required</span>
                </dd>
              </div>
              
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Subject Requirements</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <ul className="list-disc pl-5 space-y-1">
                    {course.specificRequirements.mathematics && (
                      <li>Mathematics: {course.specificRequirements.mathematics}%</li>
                    )}
                    {course.specificRequirements.physicalSciences && (
                      <li>Physical Sciences: {course.specificRequirements.physicalSciences}%</li>
                    )}
                    {course.specificRequirements.lifeSciencies && (
                      <li>Life Sciences: {course.specificRequirements.lifeSciencies}%</li>
                    )}
                    {course.specificRequirements.english && (
                      <li>
                        English: {course.specificRequirements.english}%
                        {course.specificRequirements.englishLevel && ` (${course.specificRequirements.englishLevel})`}
                      </li>
                    )}
                    {course.specificRequirements.afrikaans && (
                      <li>
                        Afrikaans: {course.specificRequirements.afrikaans}%
                        {course.specificRequirements.afrikaansLevel && ` (${course.specificRequirements.afrikaansLevel})`}
                      </li>
                    )}
                    {course.specificRequirements.additionalRequirements?.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500">Language of Instruction</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {course.languageOfInstruction.join(', ')}
                </dd>
              </div>
              
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Career Opportunities</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <div className="flex flex-wrap gap-2">
                    {course.careerOpportunities.map((career, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {career}
                      </span>
                    ))}
                  </div>
                </dd>
              </div>
              
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Why this course matches you</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <ul className="list-disc pl-5 space-y-1">
                    {reasons.map((reason, index) => (
                      <li key={index}>{reason}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              
              {missingRequirements && missingRequirements.length > 0 && (
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-red-600">Missing Requirements</dt>
                  <dd className="mt-1 text-sm text-red-700">
                    <ul className="list-disc pl-5 space-y-1">
                      {missingRequirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      ))}
    </div>
  );
}