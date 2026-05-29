'use client';

import { useRouter } from 'next/navigation';

// Paleta de colores gastronómica
const theme = {
  bg: 'rgba(253, 251, 247, 0.92)', // Crema con transparencia para efecto glass
  textMain: '#2C2A29', // Carbón
  textMuted: '#78716C',
  accent: '#D35400', // Terracota
  border: '#E7E5E4'
};

export default function Header({ title, showBack = false }) {
  const router = useRouter();

  return (
    <header
      style={{
        background: theme.bg,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${theme.border}`,
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      {showBack && (
        <button
          onClick={() => router.back()}
          style={{
            background: 'none',
            border: 'none',
            color: theme.textMain,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px',
            marginLeft: '-4px', // Ajuste óptico
          }}
          aria-label="Volver"
        >
          {/* Ícono de flecha SVG minimalista en lugar del carácter de texto */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <h1
          style={{
            fontSize: title ? 18 : 22,
            fontWeight: title ? 600 : 800,
            color: theme.textMain,
            margin: 0,
            letterSpacing: title ? '0' : '-0.5px',
            fontFamily: title ? '"Inter", "Helvetica Neue", sans-serif' : '"Playfair Display", "Merriweather", serif',
          }}
        >
          {title || 'MagicGourmet'}
        </h1>
        
        {!title && (
          <span style={{ 
            fontSize: 10, 
            color: theme.accent, 
            fontWeight: 700, 
            textTransform: 'uppercase', 
            letterSpacing: '1px',
            borderLeft: `1px solid ${theme.border}`,
            paddingLeft: 12,
            marginTop: 2
          }}>
            Carta Digital
          </span>
        )}
      </div>
    </header>
  );
}