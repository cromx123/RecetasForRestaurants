'use client';

import { usePathname, useRouter } from 'next/navigation';

// Paleta de colores gastronómica coherente con el resto de la app
const theme = {
  bg: 'rgba(253, 251, 247, 0.92)', // Crema translúcido (glassmorphism)
  textMain: '#2C2A29', // Carbón
  textMuted: '#A8A29E', // Gris piedra claro para inactivos
  accent: '#D35400', // Terracota
  border: '#E7E5E4'
};

// Íconos SVG minimalistas para una estética premium y nítida
const navItems = [
  { 
    href: '/', 
    label: 'Carta', 
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
        <path d="M7 2v20"></path>
        <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
      </svg>
    ) 
  },
  { 
    href: '/buscar', 
    label: 'Buscar', 
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    ) 
  },
  { 
    href: '/favoritos', 
    label: 'Reservar', 
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    ) 
  },
  { 
    href: '/perfil', 
    label: 'Perfil', 
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    ) 
  },
];

export default function BottomNav() {
  const pathname = usePathname();
  const router   = useRouter();

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: theme.bg,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderTop: `1px solid ${theme.border}`,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 68, // Ligeramente más alto para respirar
        paddingBottom: 'env(safe-area-inset-bottom)', // Soporte para la barra de inicio de iPhone
        zIndex: 100,
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.02)', // Sombra muy sutil
      }}
    >
      {navItems.map((item) => {
        const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
        
        return (
          <button
            key={item.href}
            onClick={() => router.push(item.href)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4, // Un poco más de espacio entre icono y texto
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px 12px',
              color: active ? theme.accent : theme.textMuted,
              transition: 'color 0.2s ease-in-out',
              flex: 1, // Para distribuir el espacio uniformemente
            }}
            aria-label={item.label}
          >
            {/* El SVG hereda automáticamente el color del padre (terracota o gris) gracias a 'currentColor' */}
            <div style={{ transform: active ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.2s ease-in-out' }}>
              {item.icon}
            </div>
            
            <span
              style={{
                fontSize: 10,
                fontWeight: active ? 700 : 500, // Menos contraste extremo de pesos
                letterSpacing: '0.3px',
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}