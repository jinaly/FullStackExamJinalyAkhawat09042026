'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { showToast } from '@/utils/toast';
import { MESSAGES } from '@/constants/messages';
import { authSchema } from '@/validations/AuthValidation';
import { rest } from '@/api/rest';
import { COOKIE_KEYS } from '@/constants/enums';

export default function RegisterPage() {
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

  const handleRegister = async (e: React.FormEvent) => {
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
      await rest.post('/auth/register', { email, password });
      showToast({ title: MESSAGES.REGISTER_SUCCESS, type: 'success' });
      router.push('/login');
    } catch (err: any) {
      const msg = err.response?.data?.error || MESSAGES.REGISTER_FAILURE;
      setError(msg);
      showToast({ title: msg, type: 'error' });
    }
  };

  return (
    <div className="auth-container glass-panel">
      <h1>Create Account</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p className="error-text">{error}</p>}
        <button type="submit">Create your NextGenStore account</button>
      </form>
    </div>
  );
}
