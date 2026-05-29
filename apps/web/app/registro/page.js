'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register as apiRegister } from '@/lib/api';

// ── Paleta de Colores Gastronómica ────────────────────────────
const theme = {
  bg: '#FDFBF7', // Crema cálido
  textMain: '#2C2A29', // Carbón
  textMuted: '#78716C', // Gris piedra
  accent: '#D35400', // Terracota
  border: '#E7E5E4',
  cardBg: '#FFFFFF',
  danger: '#9B2226',
  dangerBg: '#FDF3F3',
  success: '#2E5C31',
  successBg: '#F0F5F1',
};

// ── Íconos SVG ────────────────────────────────────────────────
const Icons = {
  Warning: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  ),
  CheckCircle: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  )
};

export default function RegistroPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    
    // Validaciones
    if (!username.trim() || !email.trim()) { setError('Por favor, completa todos los campos.'); return; }
    if (password !== confirm) { setError('Las contraseñas no coinciden.'); return; }
    if (password.length < 4) { setError('La contraseña debe tener al menos 4 caracteres.'); return; }

    setLoading(true);
    try {
      await apiRegister(username, email, password);
      setSuccess(true);
      setTimeout(() => router.push('/login'), 2500);
    } catch (err) {
      setError(err.message || 'Hubo un problema al crear la cuenta. Inténtalo de nuevo.');
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
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
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
            Crea tu cuenta de comensal
          </p>
        </div>

        {/* ── Estado de Éxito ── */}
        {success ? (
          <div
            style={{
              background: theme.successBg,
              border: `1px solid ${theme.success}40`,
              borderRadius: 16,
              padding: '40px 24px',
              textAlign: 'center',
              color: theme.success,
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              animation: 'fadeIn 0.5s ease',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
              <Icons.CheckCircle />
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px', fontFamily: '"Playfair Display", serif' }}>
              ¡Bienvenido!
            </h2>
            <p style={{ fontSize: 14, margin: 0, opacity: 0.9 }}>
              Tu cuenta ha sido creada exitosamente. Te estamos redirigiendo para que inicies sesión...
            </p>
          </div>
        ) : (
          /* ── Formulario de Registro ── */
          <form
            onSubmit={handleSubmit}
            style={{
              background: theme.cardBg,
              border: `1px solid ${theme.border}`,
              borderRadius: 16,
              padding: '32px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
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
                alignItems: 'flex-start',
                gap: 8,
                fontWeight: 500,
                lineHeight: 1.4
              }}>
                <span style={{ marginTop: 2 }}><Icons.Warning /></span>
                <span>{error}</span>
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
                placeholder="Nombre y Apellido" 
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = theme.accent}
                onBlur={(e) => e.target.style.borderColor = theme.border}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: theme.textMain, marginBottom: 8 }}>
                Correo electrónico
              </label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="correo@ejemplo.com" 
                style={inputStyle}
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
                placeholder="Mínimo 4 caracteres" 
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = theme.accent}
                onBlur={(e) => e.target.style.borderColor = theme.border}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: theme.textMain, marginBottom: 8 }}>
                Confirmar contraseña
              </label>
              <input 
                type="password" 
                value={confirm} 
                onChange={(e) => setConfirm(e.target.value)} 
                placeholder="Repite la contraseña" 
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = theme.accent}
                onBlur={(e) => e.target.style.borderColor = theme.border}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                marginTop: 8,
                borderRadius: 8,
                border: 'none',
                background: loading ? theme.textMuted : theme.accent,
                color: 'white',
                fontSize: 15,
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
                boxShadow: loading ? 'none' : '0 4px 14px rgba(211, 84, 0, 0.25)',
                letterSpacing: '0.5px'
              }}
            >
              {loading ? 'Preparando mesa...' : 'Crear Cuenta'}
            </button>

            <div style={{ textAlign: 'center', marginTop: 4, borderTop: `1px solid ${theme.border}`, paddingTop: 20 }}>
              <p style={{ fontSize: 13, color: theme.textMuted, margin: 0 }}>
                ¿Ya tienes una reserva o cuenta?{' '}
                <a 
                  href="/login" 
                  style={{ 
                    color: theme.accent, 
                    textDecoration: 'none', 
                    fontWeight: 600 
                  }}
                >
                  Inicia sesión
                </a>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// Estilo base para los inputs reusado en el componente
const inputStyle = {
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
};