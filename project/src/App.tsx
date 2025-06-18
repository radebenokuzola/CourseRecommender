import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, createContext, useContext } from 'react';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AcademicResultsPage } from './pages/AcademicResultsPage';
import { InterestsPage } from './pages/InterestsPage';
import { TalentsPage } from './pages/TalentsPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { Student, User } from './types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

interface StudentDataContextType {
  studentData: Partial<Student>;
  updateStudentData: (data: Partial<Student>) => void;
  resetStudentData: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);
const StudentDataContext = createContext<StudentDataContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const useStudentData = () => {
  const context = useContext(StudentDataContext);
  if (!context) throw new Error('useStudentData must be used within StudentDataProvider');
  return context;
};

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [studentData, setStudentData] = useState<Partial<Student>>({});

  const login = (email: string, password: string): boolean => {
    // Simple mock authentication - in real app, this would call an API
    if (email && password) {
      setUser({ id: '1', name: 'Student', email });
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string): boolean => {
    // Simple mock registration - in real app, this would call an API
    if (name && email && password) {
      setUser({ id: '1', name, email });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setStudentData({});
  };

  const updateStudentData = (data: Partial<Student>) => {
    setStudentData(prev => ({ ...prev, ...data }));
  };

  const resetStudentData = () => {
    setStudentData({});
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      <StudentDataContext.Provider value={{ studentData, updateStudentData, resetStudentData }}>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Routes>
              <Route 
                path="/login" 
                element={user ? <Navigate to="/academic-results" /> : <LoginPage />} 
              />
              <Route 
                path="/register" 
                element={user ? <Navigate to="/academic-results" /> : <RegisterPage />} 
              />
              <Route 
                path="/academic-results" 
                element={user ? <AcademicResultsPage /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/interests" 
                element={user ? <InterestsPage /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/talents" 
                element={user ? <TalentsPage /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/recommendations" 
                element={user ? <RecommendationsPage /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/" 
                element={<Navigate to={user ? "/academic-results" : "/login"} />} 
              />
            </Routes>
          </div>
        </Router>
      </StudentDataContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;