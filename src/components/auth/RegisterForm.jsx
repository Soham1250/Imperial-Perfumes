'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function RegisterForm() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);

    try {
      const { name, email, password } = formData;
      const result = await register(name, email, password);

      if (!result.success) {
        setError(result.message || 'Registration failed');
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
        <div className="rounded-md bg-red-900/20 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-blck-silver">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-blck-purple bg-blck-purple p-2.5 text-white focus:border-blck-accent focus:outline-none focus:ring-1 focus:ring-blck-accent"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-blck-silver">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-blck-purple bg-blck-purple p-2.5 text-white focus:border-blck-accent focus:outline-none focus:ring-1 focus:ring-blck-accent"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-blck-silver">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-blck-purple bg-blck-purple p-2.5 text-white focus:border-blck-accent focus:outline-none focus:ring-1 focus:ring-blck-accent"
          placeholder="••••••••"
        />
        <p className="mt-1 text-xs text-blck-textMuted">
          Must be at least 8 characters
        </p>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-blck-silver">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-blck-purple bg-blck-purple p-2.5 text-white focus:border-blck-accent focus:outline-none focus:ring-1 focus:ring-blck-accent"
          placeholder="••••••••"
        />
      </div>

      <div className="flex items-center">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          required
          className="h-4 w-4 rounded border-blck-purple bg-blck-purple text-blck-accent focus:ring-blck-accent"
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-blck-textMuted">
          I agree to the Excited to join Imperial Perfumes
        </label>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blck-accent py-2.5 text-center font-medium text-white hover:bg-blck-accent/90 focus:outline-none focus:ring-2 focus:ring-blck-accent focus:ring-offset-2 disabled:opacity-70"
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </div>
    </form>
  );
}
