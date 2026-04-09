'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { showToast } from '@/utils/toast';
import { MESSAGES } from '@/constants/messages';
import { authSchema } from '@/validations/AuthValidation';
import { rest } from '@/api/rest';
import { COOKIE_KEYS } from '@/constants/enums';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem(COOKIE_KEYS.ACCESS_TOKEN) : null;
    if (token) {
      router.replace('/');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const { error: validationError } = authSchema.validate({ email, password });
    if (validationError) {
      const msg = validationError.details[0].message;
      setError(msg);
      showToast({ title: msg, type: 'error' });
      return;
    }

    try {
      const res = await rest.post<any>('/auth/login', { email, password });
      const data = res.data;
      
      localStorage.setItem(COOKIE_KEYS.ACCESS_TOKEN, data.token);
      localStorage.setItem(COOKIE_KEYS.USER, JSON.stringify(data.user));
      showToast({ title: MESSAGES.LOGIN_SUCCESS, type: 'success' });
      window.location.href = '/'; 
    } catch (err: any) {
      const msg = err.response?.data?.error || MESSAGES.LOGIN_FAILURE;
      setError(msg);
      showToast({ title: msg, type: 'error' });
    }
  };

  return (
    <div className="auth-container glass-panel">
      <h1>Sign In</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p className="error-text">{error}</p>}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
