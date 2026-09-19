import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import api from '../../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await api.post('/auth/login', {
        email: email.trim(),
        password: password
      });

      const { token, role } = response.data;
      localStorage.setItem('jwt_token', token);
      localStorage.setItem('user_email', response.data.email);
      localStorage.setItem('user_role', role);

      // Route based on role
      if (role === 'ROLE_STUDENT') {
        navigate('/student/schedule');
      } else {
        navigate('/dashboard');
      }
      
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Invalid email or password. Please check your credentials.';
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-full max-w-md">
        
        <div className="flex flex-col items-center mb-8">
          <div className="bg-indigo-600 p-3 rounded-xl mb-4 shadow-sm">
            <BookOpen size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">AcademiaOS</h1>
          <p className="text-sm text-gray-500 mt-1">
            Sign in with your email and password
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-2">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-2 border border-red-100">
              {error}
            </div>
          )}

          <div className="flex justify-between items-end mb-1">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Email Address
            </span>
          </div>
          <InputField 
            type="email"
            placeholder="e.g. user@university.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          
          <div className="flex justify-between items-end mt-2 mb-1">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Password</span>
          </div>
          <InputField 
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          <Button 
            type="submit"
            text={isLoading ? "Signing in..." : "Sign In →"} 
            className={`w-full py-2.5 mt-4 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          />
        </form>
      </div>
    </div>
  );
}