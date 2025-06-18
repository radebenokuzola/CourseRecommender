import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useStudentData } from '../App';
import { RecommendationList } from '../components/RecommendationList';
import { generateRecommendations } from '../utils/recommendationEngine';
import { courses } from '../data/courses';
import { RecommendationResult, Student } from '../types';

export function RecommendationsPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { studentData, resetStudentData } = useStudentData();
  
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if we have complete student data
    if (!studentData.selectedSubjects || !studentData.interests || studentData.physicalTalents === undefined) {
      navigate('/academic-results');
      return;
    }

    // Generate recommendations
    const student: Student = {
      selectedSubjects: studentData.selectedSubjects,
      interests: studentData.interests,
      physicalTalents: studentData.physicalTalents,
      preferredLanguage: studentData.preferredLanguage || 'English'
    };

    const results = generateRecommendations(student, courses);
    setRecommendations(results);
    setLoading(false);
  }, [studentData, navigate]);

  const handleNewSearch = () => {
    resetStudentData();
    navigate('/academic-results');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Generating your course recommendations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Course Recommendations</h1>
          <p className="text-gray-600">Based on your academic results, interests, and talents</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
          <button
            onClick={logout}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Found {recommendations.length} course recommendations
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Courses are ranked by how well they match your profile
            </p>
          </div>
          <button
            onClick={handleNewSearch}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            New Search
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong className="text-green-600">Green border:</strong> You meet all requirements • 
          <strong className="text-yellow-600"> Yellow border:</strong> Check specific requirements
        </p>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 ? (
        <RecommendationList recommendations={recommendations} />
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <p className="text-gray-600">
            No course recommendations found. Please try adjusting your criteria.
          </p>
          <button
            onClick={handleNewSearch}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}