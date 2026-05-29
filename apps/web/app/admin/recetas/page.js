'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import AdminOnly from '@/components/AdminOnly';
import { getRecipes, deleteRecipe } from '@/lib/api';

function AdminRecetasContent() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  function load() {
    getRecipes().then(setRecipes).catch(() => {}).finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id, name) {
    if (!confirm(`¿Eliminar la receta "${name}"?`)) return;
    try {
      await deleteRecipe(id);
      setRecipes((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div style={{ background: '#121111', minHeight: '100vh' }}>
      <Header title="Administrar Recetas" showBack />
      <main style={{ padding: 16, paddingBottom: 80 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
          <button
            className="btn-primary"
            style={{ width: 'auto', padding: '9px 20px' }}
            onClick={() => router.push('/admin/recetas/nueva')}
          >
            + Nueva receta
          </button>
        </div>

        {loading && <p style={{ color: '#6b7280', textAlign: 'center', padding: 40 }}>Cargando…</p>}

        {!loading && recipes.length === 0 && (
          <p style={{ color: '#6b7280', textAlign: 'center', padding: 40 }}>No hay recetas aún</p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {recipes.map((r) => (
            <div
              key={r.id}
              style={{
                background: '#1e1d1d',
                border: '1px solid #3a3939',
                borderRadius: 12,
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <img
                src={r.image_url || '/assets/imagen_nocargada.png'}
                alt={r.name}
                style={{ width: 52, height: 52, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }}
                onError={(e) => { e.target.src = '/assets/imagen_nocargada.png'; }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {r.name}
                </p>
                <p style={{ fontSize: 12, color: '#6b7280' }}>
                  {r.ingredients?.length || 0} ingredientes · {r.steps?.length || 0} pasos
                </p>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <button
                  onClick={() => router.push(`/admin/recetas/${r.id}/editar`)}
                  style={{
                    background: '#2a2929',
                    border: '1px solid #3a3939',
                    borderRadius: 8,
                    padding: '6px 12px',
                    color: '#a78bfa',
                    cursor: 'pointer',
                    fontSize: 13,
                  }}
                >
                  Editar
                </button>
                <button className="btn-danger" onClick={() => handleDelete(r.id, r.name)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

export default function AdminRecetasPage() {
  return <AdminOnly><AdminRecetasContent /></AdminOnly>;
}
