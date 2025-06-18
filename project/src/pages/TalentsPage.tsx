import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useStudentData } from '../App';

export function TalentsPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { studentData, updateStudentData } = useStudentData();
  
  const [physicalTalents, setPhysicalTalents] = useState(studentData.physicalTalents || '');
  const [preferredLanguage, setPreferredLanguage] = useState<'English' | 'Afrikaans' | 'Both'>(
    studentData.preferredLanguage || 'English'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudentData({ physicalTalents, preferredLanguage });
    navigate('/recommendations');
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Talents</h1>
          <p className="text-gray-600">Step 3 of 3: Tell us about your talents and preferences</p>
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

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center">
          <div className="flex items-center text-green-600">
            <div className="flex items-center justify-center w-8 h-8 bg-green-600 rounded-full text-white text-sm font-medium">
              ✓
            </div>
            <span className="ml-2 text-sm font-medium">Academic Results</span>
          </div>
          <div className="flex-1 mx-4 h-1 bg-green-600 rounded"></div>
          <div className="flex items-center text-green-600">
            <div className="flex items-center justify-center w-8 h-8 bg-green-600 rounded-full text-white text-sm font-medium">
              ✓
            </div>
            <span className="ml-2 text-sm font-medium">Interests</span>
          </div>
          <div className="flex-1 mx-4 h-1 bg-green-600 rounded"></div>
          <div className="flex items-center text-indigo-600">
            <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-full text-white text-sm font-medium">
              3
            </div>
            <span className="ml-2 text-sm font-medium">Talents</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Physical Talents Section */}
        <div className="bg-white shadow-xl rounded-lg p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Physical Talents & Abilities
          </h3>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Describe your physical talents, sports abilities, or any physical activities you excel at. 
              This helps us recommend courses that might benefit from your physical capabilities.
            </p>
            <textarea
              value={physicalTalents}
              onChange={(e) => setPhysicalTalents(e.target.value)}
              placeholder="Examples: Good at soccer, excellent hand-eye coordination, strong swimmer, dance abilities, martial arts experience, outdoor activities, etc."
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={4}
            />
          </div>
        </div>

        {/* Language Preference */}
        <div className="bg-white shadow-xl rounded-lg p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Preferred Language of Instruction
          </h3>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Select your preferred language for university instruction. This will help filter courses 
              that are taught in your preferred language.
            </p>
            <div className="space-y-3">
              {(['English', 'Afrikaans', 'Both'] as const).map(lang => (
                <label key={lang} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="language"
                    value={lang}
                    checked={preferredLanguage === lang}
                    onChange={(e) => setPreferredLanguage(e.target.value as typeof lang)}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700 font-medium">{lang}</span>
                  {lang === 'Both' && (
                    <span className="text-xs text-gray-500">(Shows courses in both languages)</span>
                  )}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate('/interests')}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
          >
            ← Back: Interests
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            Get My Recommendations →
          </button>
        </div>
      </form>
    </div>
  );
}