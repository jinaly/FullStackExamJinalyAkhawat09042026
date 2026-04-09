import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.replace('/login');
    }
  }, [router]);

  return <>{children}</>;
}
