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
        email: email,
        password: password
      });

      const token = response.data.token;
      localStorage.setItem('jwt_token', token);
      navigate('/dashboard');
      
    } catch (err) {
      setError('Invalid credentials or server offline. Please try again.');
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
          <p className="text-sm text-gray-500 mt-1">Registrar & Administration Portal</p>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
          <button className="flex-1 bg-white text-gray-900 text-sm font-medium py-2 rounded-md shadow-sm border border-gray-200">
            Faculty / Staff
          </button>
          <button className="flex-1 text-gray-500 text-sm font-medium py-2 hover:text-gray-700">
            Student Portal
          </button>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-2">
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-2 border border-red-100">
              {error}
            </div>
          )}

          <div className="flex justify-between items-end mb-1">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Work Email</span>
          </div>
          <InputField 
            type="email"
            placeholder="e.vance@university.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <div className="flex justify-between items-end mt-2 mb-1">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Password</span>
          </div>
          <InputField 
            type="password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex items-center justify-between mt-2 mb-4">
            <label className="flex items-center text-xs text-gray-600 cursor-pointer">
              <input type="checkbox" className="mr-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              Remember me for 30 days
            </label>
            <a href="#" className="text-xs text-indigo-600 font-medium hover:underline">
              Forgot password?
            </a>
          </div>

          <Button 
            text={isLoading ? "Authenticating..." : "Sign In to Workspace →"} 
            onClick={handleLogin} 
            className={`w-full py-2.5 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          />
        </form>

        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <p className="text-xs text-gray-400">
            Secured by University Single Sign-On (SSO).<br />
            Need access? <a href="#" className="text-indigo-600 hover:underline">Contact IT Helpdesk</a>
          </p>
        </div>
      </div>
    </div>
  );
}