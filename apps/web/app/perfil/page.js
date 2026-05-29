'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

// ── Paleta de Colores Gastronómica ────────────────────────────
const theme = {
  bg: '#FDFBF7', // Crema cálido
  textMain: '#2C2A29', // Carbón
  textMuted: '#78716C', // Gris piedra
  accent: '#D35400', // Terracota
  accentLight: '#F3EFE6', // Crema oscuro para fondos
  border: '#E7E5E4',
  cardBg: '#FFFFFF',
  danger: '#9B2226', // Burdeos suave
  dangerBg: '#FDF3F3',
};

const Icons = {
  User: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={theme.textMuted} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  ),
  Recipes: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
  ),
  Ingredients: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>
  ),
  Filters: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
  ),
  Users: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
  ),
  Favorites: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
  ),
  ChevronRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={theme.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
  )
};

export default function PerfilPage() {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();

  // ── Vista: Usuario No Autenticado ────────────────────────────
  if (!isAuthenticated) {
    return (
      <div style={{ background: theme.bg, minHeight: '100vh', fontFamily: '"Inter", sans-serif' }}>
        <Header title="Perfil" />
        <div style={{ padding: '40px 24px', textAlign: 'center', paddingBottom: 80 }}>
          <div style={{ margin: '0 auto 24px', display: 'flex', justifyContent: 'center' }}>
            <Icons.User />
          </div>
          <p style={{ color: theme.textMuted, marginBottom: 24, fontSize: 15 }}>
            Inicia sesión para acceder a tu perfil y reservas.
          </p>
          <button 
            onClick={() => router.push('/login')}
            style={{ 
              background: theme.accent, 
              color: 'white', 
              border: 'none', 
              padding: '12px 32px', 
              borderRadius: 8, 
              fontSize: 15, 
              fontWeight: 600, 
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(211, 84, 0, 0.2)'
            }}
          >
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

  // ── Enlaces de Navegación ─────────────────────────────────────
  const adminLinks = [
    { label: 'Administrar recetas', href: '/admin/recetas', icon: <Icons.Recipes /> },
    { label: 'Administrar ingredientes', href: '/admin/ingredientes', icon: <Icons.Ingredients /> },
    { label: 'Administrar filtros', href: '/admin/filtros', icon: <Icons.Filters /> },
    { label: 'Administrar usuarios', href: '/admin/usuarios', icon: <Icons.Users /> },
  ];

  const clientLinks = [
    { label: 'Mis favoritos', href: '/favoritos', icon: <Icons.Favorites /> },
  ];

  const links = isAdmin ? adminLinks : clientLinks;

  return (
    <div style={{ background: theme.bg, minHeight: '100vh', fontFamily: '"Inter", "Helvetica Neue", sans-serif' }}>
      <Header title="Mi Cuenta" />
      <main style={{ padding: '24px 20px', paddingBottom: 100, maxWidth: 560, margin: '0 auto' }}>
        
        {/* ── Tarjeta de Información de Usuario ── */}
        <div
          style={{
            background: theme.cardBg,
            border: `1px solid ${theme.border}`,
            borderRadius: 16,
            padding: 20,
            marginBottom: 32,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}
        >
          {/* Avatar estilo Monograma */}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: theme.accent,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              fontWeight: 700,
              fontFamily: '"Playfair Display", serif',
              color: 'white',
              flexShrink: 0,
            }}
          >
            {user.username?.[0]?.toUpperCase()}
          </div>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: theme.textMain, marginBottom: 4, letterSpacing: '-0.3px' }}>
              {user.username}
            </h2>
            <p style={{ fontSize: 13, color: theme.textMuted, marginBottom: 8, margin: 0 }}>
              {user.email}
            </p>
            <div style={{ marginTop: 8 }}>
              <span
                style={{
                  display: 'inline-block',
                  padding: '3px 10px',
                  borderRadius: 12,
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  background: isAdmin ? '#2C2A29' : theme.accentLight,
                  color: isAdmin ? '#FFFFFF' : theme.accent,
                }}
              >
                {user.role === 'Administrador' ? 'Administrador' : 'Cliente'}
              </span>
            </div>
          </div>
        </div>

        {/* ── Lista de Enlaces ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => router.push(link.href)}
              style={{
                background: theme.cardBg,
                border: `1px solid ${theme.border}`,
                borderRadius: 12,
                padding: '16px',
                color: theme.textMain,
                fontSize: 15,
                fontWeight: 500,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                boxShadow: '0 1px 3px rgba(0,0,0,0.01)'
              }}
              onMouseEnter={(e) => { 
                e.currentTarget.style.background = theme.bg; 
                e.currentTarget.style.borderColor = theme.textMuted; 
              }}
              onMouseLeave={(e) => { 
                e.currentTarget.style.background = theme.cardBg; 
                e.currentTarget.style.borderColor = theme.border; 
              }}
            >
              <span style={{ color: theme.accent, display: 'flex' }}>
                {link.icon}
              </span>
              <span style={{ flex: 1 }}>{link.label}</span>
              <Icons.ChevronRight />
            </button>
          ))}
        </div>

        {/* ── Botón de Cerrar Sesión ── */}
        <button
          onClick={handleLogout}
          style={{ 
            width: '100%', 
            padding: '14px', 
            fontSize: 14, 
            fontWeight: 600,
            borderRadius: 12,
            background: theme.dangerBg,
            color: theme.danger,
            border: `1px solid ${theme.danger}40`,
            cursor: 'pointer',
            transition: 'background 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#F9E6E6'}
          onMouseLeave={(e) => e.currentTarget.style.background = theme.dangerBg}
        >
          Cerrar sesión
        </button>
      </main>
      <BottomNav />
    </div>
  );
}