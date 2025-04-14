'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function LoginForm() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { email, password } = formData;
      const result = await login(email, password);

      if (!result.success) {
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-md bg-red-900/30 p-3 text-sm text-red-300 border border-red-800/50">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-blck-accent/30 bg-blck-purple/50 p-2.5 text-white placeholder-blck-silver/70 focus:border-blck-accent focus:outline-none focus:ring-1 focus:ring-blck-accent"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-white">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-blck-accent/30 bg-blck-purple/50 p-2.5 text-white placeholder-blck-silver/70 focus:border-blck-accent focus:outline-none focus:ring-1 focus:ring-blck-accent"
          placeholder="••••••••"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-blck-accent bg-blck-purple/50 text-blck-accent focus:ring-blck-accent"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-blck-silver">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <a href="#" className="text-blck-accent hover:underline">
            Forgot password?
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blck-accent py-2.5 text-center font-medium text-white hover:bg-blck-accent/90 focus:outline-none focus:ring-2 focus:ring-blck-accent focus:ring-offset-2 disabled:opacity-70"
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </div>
    </form>
  );
}
