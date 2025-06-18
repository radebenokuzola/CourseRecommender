import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useStudentData } from '../App';

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

export function InterestsPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { studentData, updateStudentData } = useStudentData();
  
  const [interests, setInterests] = useState<string[]>(studentData.interests || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudentData({ interests });
    navigate('/talents');
  };

  const handleInterestChange = (interest: string, checked: boolean) => {
    if (checked) {
      setInterests([...interests, interest]);
    } else {
      setInterests(interests.filter(i => i !== interest));
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Interests</h1>
          <p className="text-gray-600">Step 2 of 3: Select your areas of interest</p>
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
          <div className="flex items-center text-indigo-600">
            <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-full text-white text-sm font-medium">
              2
            </div>
            <span className="ml-2 text-sm font-medium">Interests</span>
          </div>
          <div className="flex-1 mx-4 h-1 bg-gray-200 rounded">
            <div className="h-1 bg-indigo-600 rounded" style={{ width: '66%' }}></div>
          </div>
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
            What are your interests? (Select all that apply)
          </h3>
          
          <div className="space-y-6">
            {Object.entries(interestCategories).map(([category, categoryInterests]) => (
              <div key={category} className="bg-gray-50 p-6 rounded-lg border">
                <h4 className="text-md font-medium text-gray-800 mb-4">{category}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {categoryInterests.map(interest => (
                    <label key={interest} className="flex items-center space-x-2 cursor-pointer">
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
          
          <div className="mt-6 text-sm text-gray-600">
            <p>Selected interests: {interests.length}</p>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate('/academic-results')}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
          >
            ← Back: Academic Results
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Next: Talents →
          </button>
        </div>
      </form>
    </div>
  );
}