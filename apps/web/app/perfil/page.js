'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import Image from 'next/image';

export default function PerfilPage() {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    return (
      <div style={{ background: '#121111', minHeight: '100vh' }}>
        <Header title="Perfil" />
        <div style={{ padding: 24, textAlign: 'center', paddingBottom: 80 }}>
          <Image src="/assets/perfil_us.png" alt="Perfil" width={64} height={64} style={{ opacity: 0.4, margin: '24px auto' }} />
          <p style={{ color: '#6b7280', marginBottom: 20 }}>Inicia sesión para ver tu perfil</p>
          <button className="btn-primary" style={{ width: 'auto', padding: '10px 32px' }} onClick={() => router.push('/login')}>
            Iniciar sesión
          </button>
        </div>
        <BottomNav />
      </div>
    );
  }

  function handleLogout() {
    logout();
    router.push('/login');
  }

  const adminLinks = [
    { label: '📖 Administrar recetas', href: '/admin/recetas' },
    { label: '🧂 Administrar ingredientes', href: '/admin/ingredientes' },
    { label: '🔍 Administrar filtros', href: '/admin/filtros' },
    { label: '👥 Administrar usuarios', href: '/admin/usuarios' },
  ];

  const clientLinks = [
    { label: '⭐ Mis favoritos', href: '/favoritos' },
  ];

  const links = isAdmin ? adminLinks : clientLinks;

  return (
    <div style={{ background: '#121111', minHeight: '100vh' }}>
      <Header title="Perfil" />
      <main style={{ padding: 16, paddingBottom: 80, maxWidth: 480, margin: '0 auto' }}>
        <div
          style={{
            background: '#1e1d1d',
            border: '1px solid #3a3939',
            borderRadius: 16,
            padding: 24,
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              fontWeight: 700,
              color: 'white',
              flexShrink: 0,
            }}
          >
            {user.username?.[0]?.toUpperCase()}
          </div>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 2 }}>
              {user.username}
            </h2>
            <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 4 }}>{user.email}</p>
            <span
              style={{
                display: 'inline-block',
                padding: '2px 10px',
                borderRadius: 12,
                fontSize: 12,
                background: isAdmin ? '#3b2f6e' : '#1f2a1f',
                color: isAdmin ? '#a78bfa' : '#86efac',
                border: `1px solid ${isAdmin ? '#8b5cf6' : '#22c55e'}`,
              }}
            >
              {user.role}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => router.push(link.href)}
              style={{
                background: '#1e1d1d',
                border: '1px solid #3a3939',
                borderRadius: 12,
                padding: '14px 16px',
                color: 'white',
                fontSize: 15,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background 0.15s, border-color 0.15s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#2a2929'; e.currentTarget.style.borderColor = '#8b5cf6'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#1e1d1d'; e.currentTarget.style.borderColor = '#3a3939'; }}
            >
              {link.label}
              <span style={{ color: '#6b7280' }}>›</span>
            </button>
          ))}
        </div>

        <button
          onClick={handleLogout}
          className="btn-danger"
          style={{ width: '100%', padding: '12px', fontSize: 14, borderRadius: 12 }}
        >
          Cerrar sesión
        </button>
      </main>
      <BottomNav />
    </div>
  );
}
