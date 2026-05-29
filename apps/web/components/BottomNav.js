'use client';

import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

const navItems = [
  { href: '/', label: 'Inicio', icon: '/assets/hogar.png', iconSel: '/assets/hogar_selec.png' },
  { href: '/buscar', label: 'Buscar', icon: '/assets/busqueda.png', iconSel: '/assets/busqueda_selec.png' },
  { href: '/favoritos', label: 'Favoritos', icon: '/assets/estrella.png', iconSel: '/assets/estrella.png' },
  { href: '/perfil', label: 'Perfil', icon: '/assets/perfil_us.png', iconSel: '/assets/perfil_us_selec.png' },
];

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#1e1d1d',
        borderTop: '1px solid #3a3939',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 64,
        zIndex: 100,
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
              gap: 2,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '6px 16px',
            }}
          >
            <Image
              src={active ? item.iconSel : item.icon}
              alt={item.label}
              width={24}
              height={24}
              style={{ filter: active ? 'none' : 'brightness(0.6)' }}
            />
            <span
              style={{
                fontSize: 10,
                color: active ? '#8b5cf6' : '#6b7280',
                fontWeight: active ? 600 : 400,
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
