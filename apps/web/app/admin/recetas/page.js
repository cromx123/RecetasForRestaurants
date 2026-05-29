'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import AdminOnly from '@/components/AdminOnly';
import { getRecipes, deleteRecipe } from '@/lib/api';

// ── Paleta de Colores Gastronómica (Admin) ────────────────────
const theme = {
  bg: '#FDFBF7',
  textMain: '#2C2A29',
  textMuted: '#78716C',
  accent: '#D35400',
  border: '#E7E5E4',
  cardBg: '#FFFFFF',
};

// ── Íconos SVG ────────────────────────────────────────────────
const Icons = {
  Plus: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Edit: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>,
  Trash: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
  Empty: () => <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={theme.textMuted} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
  Loader: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={theme.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
};

function AdminRecetasContent() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  function load() {
    getRecipes().then(setRecipes).catch(() => {}).finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id, name) {
    if (!confirm(`¿Estás seguro de que deseas eliminar la receta "${name}"? Esta acción no se puede deshacer.`)) return;
    try {
      await deleteRecipe(id);
      setRecipes((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      alert(err.message || 'Error al eliminar la receta.');
    }
  }

  return (
    <div style={{ background: theme.bg, minHeight: '100vh', fontFamily: '"Inter", "Helvetica Neue", sans-serif' }}>
      <Header title="Administrar Recetas" showBack />
      
      <main style={{ padding: '24px 16px', paddingBottom: 100, maxWidth: 640, margin: '0 auto' }}>
        {/* ── Botón Nueva Receta ── */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
          <button
            className="btn-primary"
            style={{ width: 'auto', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 8, borderRadius: 24 }}
            onClick={() => router.push('/admin/recetas/nueva')}
          >
            <Icons.Plus /> Nueva receta
          </button>
        </div>

        {/* ── Estados de Carga y Vacío ── */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 20px', animation: 'pulse 1.5s infinite' }}>
             <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
               <Icons.Loader />
             </div>
             <p style={{ color: theme.textMuted, fontSize: 14, fontStyle: 'italic' }}>Cargando catálogo...</p>
          </div>
        )}

        {!loading && recipes.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: theme.cardBg, borderRadius: 16, border: `1px dashed ${theme.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
              <Icons.Empty />
            </div>
            <p style={{ color: theme.textMain, fontSize: 16, fontWeight: 600, margin: '0 0 8px' }}>Tu carta está vacía</p>
            <p style={{ color: theme.textMuted, fontSize: 14, margin: 0 }}>Comienza agregando tu primer platillo.</p>
          </div>
        )}

        {/* ── Lista de Recetas ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {recipes.map((r) => (
            <div
              key={r.id}
              style={{
                background: theme.cardBg,
                border: `1px solid ${theme.border}`,
                borderRadius: 12,
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.02)';
              }}
            >
              <img
                src={r.image_url || '/assets/imagen_nocargada.png'}
                alt={r.name}
                style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 8, flexShrink: 0, border: `1px solid ${theme.border}` }}
                onError={(e) => { e.target.src = '/assets/imagen_nocargada.png'; }}
              />
              
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: theme.textMain, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 4 }}>
                  {r.name}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 10, fontWeight: 600, color: theme.accent, background: theme.accentLight, padding: '2px 8px', borderRadius: 12, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                    {r.category || 'Sin categoría'}
                  </span>
                  <span style={{ fontSize: 12, color: theme.textMuted }}>
                    {r.ingredients?.length || 0} ingr. · {r.steps?.length || 0} pasos
                  </span>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <button
                  className="btn-secondary"
                  onClick={() => router.push(`/admin/recetas/${r.id}/editar`)}
                  style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Editar receta"
                  aria-label="Editar receta"
                >
                  <Icons.Edit />
                </button>
                <button 
                  className="btn-danger" 
                  onClick={() => handleDelete(r.id, r.name)}
                  style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Eliminar receta"
                  aria-label="Eliminar receta"
                >
                  <Icons.Trash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}} />
      <BottomNav />
    </div>
  );
}

export default function AdminRecetasPage() {
  return <AdminOnly><AdminRecetasContent /></AdminOnly>;
}