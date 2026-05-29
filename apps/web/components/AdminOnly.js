'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function AdminOnly({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) router.replace('/login');
      else if (!isAdmin) router.replace('/');
    }
  }, [loading, isAuthenticated, isAdmin, router]);

  if (loading || !isAuthenticated || !isAdmin) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#121111' }}>
        <div style={{ color: '#8b5cf6', fontSize: 16 }}>Verificando permisos…</div>
      </div>
    );
  }

  return children;
}
