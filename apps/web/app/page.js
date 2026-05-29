'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import RecipeCard from '@/components/RecipeCard';
import { getRecipes } from '@/lib/api';

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getRecipes()
      .then(setRecipes)
      .catch(() => setError('No se pudieron cargar las recetas'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ background: '#121111', minHeight: '100vh' }}>
      <Header />
      <main style={{ padding: '16px', paddingBottom: 80 }}>
        <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 16 }}>
          {recipes.length} recetas disponibles
        </p>

        {loading && (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <img src="/assets/imagen_buscando.png" alt="Cargando" width={80} style={{ opacity: 0.5, margin: '0 auto 12px' }} />
            <p style={{ color: '#6b7280' }}>Cargando recetas…</p>
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', padding: 40, color: '#fca5a5' }}>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && recipes.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <img src="/assets/imagen_nocargada.png" alt="Sin recetas" width={80} style={{ opacity: 0.4, margin: '0 auto 12px' }} />
            <p style={{ color: '#6b7280' }}>No hay recetas aún</p>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {recipes.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
