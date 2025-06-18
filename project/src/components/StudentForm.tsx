import React, { useState } from 'react';
import { Student } from '../types';
import { availableSubjects } from '../data/subjects';

interface StudentFormProps {
  onSubmit: (student: Student) => void;
}

const interestCategories = {
  '🎓 Academic & Intellectual': [
    'Science & Research',
    'Technology & Innovation',
    'Mathematics',
    'History',
    'Philosophy',
    'Politics & Current Affairs',
    'Economics & Finance',
    'Language & Linguistics'
  ],
  '🎨 Creative & Artistic': [
    'Drawing & Painting',
    'Music (Listening / Playing)',
    'Writing & Storytelling',
    'Photography',
    'Acting & Theater',
    'Film & Video Editing',
    'Fashion & Design',
    'Crafts & DIY'
  ],
  '💼 Career-Oriented / Professional': [
    'Business & Entrepreneurship',
    'Marketing & Advertising',
    'Engineering',
    'Medicine & Healthcare',
    'Law & Justice',
    'Education & Teaching',
    'Architecture',
    'Psychology',
    'Social Work',
    'Culinary Arts'
  ],
  '💪 Physical & Outdoor': [
    'Sports & Fitness',
    'Hiking & Nature',
    'Dance',
    'Camping & Survival Skills',
    'Gardening',
    'Martial Arts',
    'Travel & Adventure'
  ],
  '💻 Tech & Gaming': [
    'Programming / Coding',
    'Video Games',
    'Web Development',
    'Cybersecurity',
    'Robotics',
    'AI & Machine Learning',
    'Blockchain / Crypto'
  ],
  '🌐 Social & Community': [
    'Volunteering',
    'Activism & Advocacy',
    'Mentoring & Coaching',
    'Cultural Exchange',
    'Event Planning'
  ],
  '🧘 Lifestyle & Personal Growth': [
    'Meditation & Mindfulness',
    'Spirituality',
    'Reading',
    'Journaling',
    'Minimalism',
    'Personal Finance',
    'Self-Improvement'
  ],
  '🐾 Animals & Nature': [
    'Animal Care',
    'Wildlife Conservation',
    'Environmental Sustainability',
    'Bird Watching',
    'Marine Biology'
  ]
};

export function StudentForm({ onSubmit }: StudentFormProps) {
  const [selectedSubjects, setSelectedSubjects] = useState<Student['selectedSubjects']>({
    lifeOrientation: { mark: 0 } // Life Orientation is compulsory
  });
  const [interests, setInterests] = useState<string[]>([]);
  const [physicalTalents, setPhysicalTalents] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState<'English' | 'Afrikaans' | 'Both'>('English');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that at least 6 subjects are selected (including Life Orientation)
    const subjectCount = Object.keys(selectedSubjects).length;
    if (subjectCount < 6) {
      alert('Please select at least 6 subjects including Life Orientation');
      return;
    }

    // Check if English is selected
    const hasEnglish = Object.keys(selectedSubjects).some(subject => 
      subject === 'english' || subject.includes('english')
    );
    if (!hasEnglish) {
      alert('Please select English as one of your subjects');
      return;
    }

    onSubmit({
      selectedSubjects,
      interests,
      physicalTalents,
      preferredLanguage
    });
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
    if (subjectCode === 'lifeOrientation') return; // Cannot remove Life Orientation
    
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

  const handleInterestChange = (interest: string, checked: boolean) => {
    if (checked) {
      setInterests([...interests, interest]);
    } else {
      setInterests(interests.filter(i => i !== interest));
    }
  };

  const availableToAdd = availableSubjects.filter(subject => 
    !selectedSubjects[subject.code]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Subject Selection Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
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
              <div key={subjectCode} className="flex items-center space-x-4 p-4 bg-white rounded-lg border">
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

        <div className="mt-4 text-sm text-gray-600">
          <p>Selected subjects: {Object.keys(selectedSubjects).length} (minimum 6 required)</p>
          <p className="text-xs mt-1">
            Note: Life Orientation is compulsory. You need at least one language (preferably English).
          </p>
        </div>
      </div>

      {/* Interests Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          What are your interests? (Select all that apply)
        </h3>
        <div className="space-y-6">
          {Object.entries(interestCategories).map(([category, categoryInterests]) => (
            <div key={category} className="bg-white p-4 rounded-lg border">
              <h4 className="text-md font-medium text-gray-800 mb-3">{category}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {categoryInterests.map(interest => (
                  <label key={interest} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={interests.includes(interest)}
                      onChange={(e) => handleInterestChange(interest, e.target.checked)}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">{interest}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          <p>Selected interests: {interests.length}</p>
        </div>
      </div>

      {/* Physical Talents Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Physical Talents & Abilities
        </h3>
        <textarea
          value={physicalTalents}
          onChange={(e) => setPhysicalTalents(e.target.value)}
          placeholder="Describe your physical talents, sports abilities, or any physical activities you excel at..."
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
        />
      </div>

      {/* Language Preference */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Preferred Language of Instruction
        </h3>
        <div className="space-y-2">
          {(['English', 'Afrikaans', 'Both'] as const).map(lang => (
            <label key={lang} className="flex items-center space-x-2">
              <input
                type="radio"
                name="language"
                value={lang}
                checked={preferredLanguage === lang}
                onChange={(e) => setPreferredLanguage(e.target.value as typeof lang)}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">{lang}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
      >
        Get Course Recommendations
      </button>
    </form>
  );
}