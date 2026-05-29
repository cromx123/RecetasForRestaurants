'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import AdminOnly from '@/components/AdminOnly';

const sections = [
  { label: '📖 Recetas', desc: 'Crear, editar y eliminar recetas', href: '/admin/recetas' },
  { label: '🧂 Ingredientes', desc: 'Gestionar ingredientes disponibles', href: '/admin/ingredientes' },
  { label: '🔍 Filtros', desc: 'Administrar filtros de búsqueda', href: '/admin/filtros' },
  { label: '👥 Usuarios', desc: 'Ver y gestionar usuarios registrados', href: '/admin/usuarios' },
];

function AdminContent() {
  const router = useRouter();
  return (
    <div style={{ background: '#121111', minHeight: '100vh' }}>
      <Header title="Panel de Administración" showBack />
      <main style={{ padding: 16, paddingBottom: 80, maxWidth: 480, margin: '0 auto' }}>
        <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 20 }}>
          Bienvenido al panel de administración de MagicGourmet
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {sections.map((s) => (
            <button
              key={s.href}
              onClick={() => router.push(s.href)}
              style={{
                background: '#1e1d1d',
                border: '1px solid #3a3939',
                borderRadius: 14,
                padding: '16px 18px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#8b5cf6'; e.currentTarget.style.background = '#2a2929'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#3a3939'; e.currentTarget.style.background = '#1e1d1d'; }}
            >
              <div>
                <p style={{ fontSize: 16, fontWeight: 600, color: 'white', marginBottom: 2 }}>{s.label}</p>
                <p style={{ fontSize: 12, color: '#6b7280' }}>{s.desc}</p>
              </div>
              <span style={{ color: '#8b5cf6', fontSize: 20 }}>›</span>
            </button>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

export default function AdminPage() {
  return <AdminOnly><AdminContent /></AdminOnly>;
}
