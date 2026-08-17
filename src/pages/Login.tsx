import React from 'react';
import { Brain, Lock, User, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login delay
    setTimeout(() => {
      onLogin();
    }, 500);
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
          <h2 className="text-lg font-semibold mb-6">Sign in to your account</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Enterprise Email</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
                <input 
                  type="email" 
                  defaultValue="admin@enterprise.com"
                  className="w-full bg-secondary/50 border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors"
                  required
                />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-gray-400">Password</label>
                <a href="#" className="text-xs text-accent hover:text-accent/80 transition-colors">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
                <input 
                  type="password" 
                  defaultValue="password123"
                  className="w-full bg-secondary/50 border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-primary-foreground py-2.5 rounded-lg text-sm font-medium transition-all hover:gap-3 mt-6 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
            >
              Access Dashboard
              <ArrowRight className="size-4" />
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-[10px] text-gray-500">
              By signing in, you agree to the Enterprise Security Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
