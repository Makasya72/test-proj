'use client';

import { useState } from 'react';

export function AuthForm() {
  const [login, setLogin] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
        setLoading(false);
        return;
      }

      window.location.href = '/cars';
    } catch {
      setError('Something went wrong');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <label className="mb-1 block text-sm font-medium">Login</label>
        <input
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none transition focus:border-slate-500"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none transition focus:border-slate-500"
        />
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-60"
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}