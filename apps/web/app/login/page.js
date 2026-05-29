'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { login as apiLogin } from '@/lib/api';

// ── Paleta de Colores Gastronómica ────────────────────────────
const theme = {
  bg: '#FDFBF7', // Crema cálido
  textMain: '#2C2A29', // Carbón
  textMuted: '#78716C', // Gris piedra
  accent: '#D35400', // Terracota
  border: '#E7E5E4',
  cardBg: '#FFFFFF',
  danger: '#9B2226', // Burdeos suave
  dangerBg: '#FDF3F3', // Fondo de error sutil
};

// ── Ícono SVG (Opcional) ──────────────────────────────────────
const Icons = {
  Warning: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  )
};

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) router.replace('/');
  }, [isAuthenticated, router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await apiLogin(username, password);
      login(data.token, data.user);
      router.push('/');
    } catch (err) {
      setError(err.message || 'Credenciales incorrectas. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: theme.bg,
        fontFamily: '"Inter", "Helvetica Neue", sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div style={{ width: '100%', maxWidth: 380 }}>
        
        {/* ── Encabezado / Logo ── */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1
            style={{
              fontSize: 34,
              fontWeight: 800,
              color: theme.textMain,
              margin: '0 0 8px 0',
              fontFamily: '"Playfair Display", "Merriweather", serif',
              letterSpacing: '-0.5px'
            }}
          >
            MagicGourmet
          </h1>
          <p style={{ color: theme.textMuted, fontSize: 14, margin: 0, letterSpacing: '0.3px' }}>
            Acceso a tu cuenta
          </p>
        </div>

        {/* ── Tarjeta de Formulario ── */}
        <form
          onSubmit={handleSubmit}
          style={{
            background: theme.cardBg,
            border: `1px solid ${theme.border}`,
            borderRadius: 16,
            padding: '32px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          }}
        >
          {error && (
            <div style={{ 
              background: theme.dangerBg, 
              border: `1px solid ${theme.danger}40`, 
              borderRadius: 8, 
              padding: '12px 16px', 
              color: theme.danger, 
              fontSize: 13,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontWeight: 500
            }}>
              <Icons.Warning /> {error}
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: theme.textMain, marginBottom: 8 }}>
              Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Tu nombre de usuario"
              autoComplete="username"
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 8,
                border: `1px solid ${theme.border}`,
                background: theme.bg,
                color: theme.textMain,
                fontSize: 15,
                outline: 'none',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => e.target.style.borderColor = theme.accent}
              onBlur={(e) => e.target.style.borderColor = theme.border}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: theme.textMain, marginBottom: 8 }}>
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 8,
                border: `1px solid ${theme.border}`,
                background: theme.bg,
                color: theme.textMain,
                fontSize: 15,
                outline: 'none',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => e.target.style.borderColor = theme.accent}
              onBlur={(e) => e.target.style.borderColor = theme.border}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading || !username || !password}
            style={{
              width: '100%',
              padding: '14px',
              marginTop: 8,
              borderRadius: 8,
              border: 'none',
              background: (loading || !username || !password) ? theme.textMuted : theme.accent,
              color: 'white',
              fontSize: 15,
              fontWeight: 600,
              cursor: (loading || !username || !password) ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
              boxShadow: (loading || !username || !password) ? 'none' : '0 4px 14px rgba(211, 84, 0, 0.25)',
              letterSpacing: '0.5px'
            }}
          >
            {loading ? 'Accediendo...' : 'Iniciar sesión'}
          </button>

          <div style={{ textAlign: 'center', marginTop: 4, borderTop: `1px solid ${theme.border}`, paddingTop: 20 }}>
            <p style={{ fontSize: 13, color: theme.textMuted, margin: 0 }}>
              ¿No tienes una cuenta?{' '}
              <a 
                href="/registro" 
                style={{ 
                  color: theme.accent, 
                  textDecoration: 'none', 
                  fontWeight: 600 
                }}
              >
                Regístrate
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}