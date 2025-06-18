import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useStudentData } from '../App';
import { availableSubjects } from '../data/subjects';
import { Student } from '../types';

export function AcademicResultsPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { studentData, updateStudentData } = useStudentData();
  
  const [selectedSubjects, setSelectedSubjects] = useState<Student['selectedSubjects']>(
    studentData.selectedSubjects || { lifeOrientation: { mark: 0 } }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subjectCount = Object.keys(selectedSubjects).length;
    if (subjectCount < 6) {
      alert('Please select at least 6 subjects including Life Orientation');
      return;
    }

    const hasEnglish = Object.keys(selectedSubjects).some(subject => 
      subject === 'english' || subject.includes('english')
    );
    if (!hasEnglish) {
      alert('Please select English as one of your subjects');
      return;
    }

    updateStudentData({ selectedSubjects });
    navigate('/interests');
  };

  const handleSubjectAdd = (subjectCode: string) => {
    const subject = availableSubjects.find(s => s.code === subjectCode);
    if (!subject || selectedSubjects[subjectCode]) return;

    setSelectedSubjects(prev => ({
      ...prev,
      [subjectCode]: {
        mark: 0,
        ...(subject.hasLevels && { level: 'HL' })
      }
    }));
  };

  const handleSubjectRemove = (subjectCode: string) => {
    if (subjectCode === 'lifeOrientation') return;
    
    setSelectedSubjects(prev => {
      const updated = { ...prev };
      delete updated[subjectCode];
      return updated;
    });
  };

  const handleMarkChange = (subjectCode: string, mark: number) => {
    setSelectedSubjects(prev => ({
      ...prev,
      [subjectCode]: {
        ...prev[subjectCode],
        mark: Math.max(0, Math.min(100, mark))
      }
    }));
  };

  const handleLevelChange = (subjectCode: string, level: 'HL' | 'FAL') => {
    setSelectedSubjects(prev => ({
      ...prev,
      [subjectCode]: {
        ...prev[subjectCode],
        level
      }
    }));
  };

  const availableToAdd = availableSubjects.filter(subject => 
    !selectedSubjects[subject.code]
  );

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Academic Results</h1>
          <p className="text-gray-600">Step 1 of 3: Enter your subject marks</p>
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
          <div className="flex items-center text-indigo-600">
            <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-full text-white text-sm font-medium">
              1
            </div>
            <span className="ml-2 text-sm font-medium">Academic Results</span>
          </div>
          <div className="flex-1 mx-4 h-1 bg-gray-200 rounded">
            <div className="h-1 bg-indigo-600 rounded" style={{ width: '33%' }}></div>
          </div>
          <div className="flex items-center text-gray-400">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full text-gray-600 text-sm font-medium">
              2
            </div>
            <span className="ml-2 text-sm">Interests</span>
          </div>
          <div className="flex-1 mx-4 h-1 bg-gray-200 rounded"></div>
          <div className="flex items-center text-gray-400">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full text-gray-600 text-sm font-medium">
              3
            </div>
            <span className="ml-2 text-sm">Talents</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white shadow-xl rounded-lg p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Select Your Subjects and Enter Your Marks (%)
          </h3>
          
          {/* Add Subject Dropdown */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add a subject:
            </label>
            <select
              className="w-full md:w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              onChange={(e) => {
                if (e.target.value) {
                  handleSubjectAdd(e.target.value);
                  e.target.value = '';
                }
              }}
              defaultValue=""
            >
              <option value="">Select a subject to add...</option>
              {availableToAdd.map(subject => (
                <option key={subject.code} value={subject.code}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          {/* Selected Subjects */}
          <div className="space-y-4">
            {Object.entries(selectedSubjects).map(([subjectCode, subjectData]) => {
              const subject = availableSubjects.find(s => s.code === subjectCode);
              if (!subject) return null;

              return (
                <div key={subjectCode} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      {subject.name}
                      {subjectCode === 'lifeOrientation' && ' (Required)'}
                    </label>
                  </div>
                  
                  {subject.hasLevels && (
                    <div className="w-24">
                      <select
                        value={subjectData.level || 'HL'}
                        onChange={(e) => handleLevelChange(subjectCode, e.target.value as 'HL' | 'FAL')}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                      >
                        <option value="HL">HL</option>
                        <option value="FAL">FAL</option>
                      </select>
                    </div>
                  )}
                  
                  <div className="w-20">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={subjectData.mark}
                      onChange={(e) => handleMarkChange(subjectCode, Number(e.target.value))}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                      placeholder="Mark"
                    />
                  </div>
                  
                  {subjectCode !== 'lifeOrientation' && (
                    <button
                      type="button"
                      onClick={() => handleSubjectRemove(subjectCode)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Remove
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 text-sm text-gray-600">
            <p>Selected subjects: {Object.keys(selectedSubjects).length} (minimum 6 required)</p>
            <p className="text-xs mt-1">
              Note: Life Orientation is compulsory. You need at least one language (preferably English).
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Next: Interests →
          </button>
        </div>
      </form>
    </div>
  );
}