import React, { useState } from 'react';
import { Brain, Lock, User, ArrowRight, Eye, EyeOff, Info } from 'lucide-react';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: 'Very Weak', color: 'bg-gray-200 dark:bg-gray-700', textColor: 'text-gray-500' };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (pass.match(/[A-Z]/)) score += 1;
    if (pass.match(/[0-9]/)) score += 1;
    if (pass.match(/[^A-Za-z0-9]/)) score += 1;

    switch (score) {
      case 0: return { score, label: 'Very Weak', color: 'bg-gray-200 dark:bg-gray-700', textColor: 'text-gray-500' };
      case 1: return { score, label: 'Weak', color: 'bg-red-500', textColor: 'text-red-500' };
      case 2: return { score, label: 'So-so', color: 'bg-orange-500', textColor: 'text-orange-500' };
      case 3: return { score, label: 'Good', color: 'bg-lime-500', textColor: 'text-lime-500' };
      case 4: return { score, label: 'Strong', color: 'bg-emerald-500', textColor: 'text-emerald-500' };
      default: return { score: 0, label: 'Very Weak', color: 'bg-gray-200 dark:bg-gray-700', textColor: 'text-gray-500' };
    }
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to create an account');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center relative overflow-hidden selection:bg-accent/30">
      {/* Background aesthetics */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/20 via-background to-background pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-accent/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-[100px]"></div>

      <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-accent/10 p-3 rounded-2xl border border-accent/20 mb-4 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
            <Brain className="text-accent size-10" />
          </div>
          <h1 className="text-2xl font-bold tracking-widest">MEMORIX</h1>
          <p className="text-sm text-gray-400 mt-2">Knowledge Operations Center</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-xl backdrop-blur-xl">
          <h2 className="text-lg font-semibold mb-6">Create an account</h2>
          
          {error && <div className="mb-4 text-sm text-red-500">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Email</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-secondary/50 border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full bg-secondary/50 border rounded-lg pl-10 pr-10 py-2.5 text-sm focus:outline-none transition-colors ${
                    password ? (strength.score === 0 || strength.score === 1 ? 'border-red-500 focus:border-red-500' : 
                              strength.score === 2 ? 'border-orange-500 focus:border-orange-500' :
                              strength.score === 3 ? 'border-lime-500 focus:border-lime-500' :
                              'border-emerald-500 focus:border-emerald-500') 
                             : 'border-border focus:border-accent'
                  }`}
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              
              {/* Password Strength Meter */}
              {password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1.5">
                    {[1, 2, 3, 4].map((index) => (
                      <div 
                        key={index} 
                        className={`h-1 w-full rounded-full transition-all duration-300 ${
                          index <= strength.score ? strength.color : 'bg-secondary'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-end items-center gap-1.5">
                    <span className={`text-[10px] font-semibold ${strength.textColor}`}>
                      {strength.label}
                    </span>
                    <Info className={`size-3 ${strength.textColor}`} />
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-secondary/50 border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-primary-foreground py-2.5 rounded-lg text-sm font-medium transition-all hover:gap-3 mt-6 shadow-[0_0_15px_rgba(59,130,246,0.3)] disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
              <ArrowRight className="size-4" />
            </button>
          </form>

          <div className="mt-6 flex flex-col items-center gap-4">
            <button 
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-2 bg-secondary/50 hover:bg-secondary border border-border py-2.5 rounded-lg text-sm font-medium transition-all"
            >
              <svg className="size-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign up with Google
            </button>
            <p className="text-xs text-gray-500">
              Already have an account? <Link to="/login" className="text-accent hover:underline">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
