'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthModal() {
  const { authModalOpen, closeAuthModal, authMode, switchAuthMode } = useAuth();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (!authModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md transition-all duration-300">
      <div className="relative w-full max-w-md rounded-lg bg-blck-cardBackground p-6 shadow-lg border border-blck-purple/30">
        <button
          onClick={closeAuthModal}
          className="absolute right-4 top-4 text-blck-textMuted hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="mb-6 text-center">
          <h2 className="text-2xl font-heading font-bold text-blck-silver">
            {authMode === 'login' ? 'Sign In' : 'Create Account'}
          </h2>
          <p className="mt-2 text-sm text-blck-textMuted">
            {authMode === 'login'
              ? 'Sign in to your Imperial Perfumes account'
              : 'Join Imperial Perfumes to discover your signature scent'}
          </p>
        </div>

        {authMode === 'login' ? <LoginForm /> : <RegisterForm />}

        <div className="mt-6 text-center text-sm text-blck-textMuted">
          {authMode === 'login' ? (
            <p>
              Don&apos;t have an account?{' '}
              <button
                onClick={switchAuthMode}
                className="text-blck-accent hover:underline"
              >
                Create one
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                onClick={switchAuthMode}
                className="text-blck-accent hover:underline"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
