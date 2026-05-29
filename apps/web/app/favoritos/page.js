'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import RecipeCard from '@/components/RecipeCard';
import ProtectedRoute from '@/components/ProtectedRoute';
import { getFavorites } from '@/lib/api';

function FavoritosContent() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFavorites()
      .then(setFavorites)
      .catch(() => setFavorites([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ background: '#121111', minHeight: '100vh' }}>
      <Header title="Mis favoritos" />
      <main style={{ padding: 16, paddingBottom: 80 }}>
        {loading && (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <p style={{ color: '#6b7280' }}>Cargando favoritos…</p>
          </div>
        )}

        {!loading && favorites.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <img src="/assets/estrella.png" alt="Favoritos" width={64} style={{ opacity: 0.3, margin: '0 auto 16px' }} />
            <p style={{ color: '#6b7280', fontSize: 14 }}>No tienes recetas favoritas aún</p>
            <p style={{ color: '#6b7280', fontSize: 12, marginTop: 8 }}>Explora recetas y agrega las que más te gusten</p>
          </div>
        )}

        {!loading && favorites.length > 0 && (
          <>
            <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>{favorites.length} receta(s) guardada(s)</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {favorites.map((r) => <RecipeCard key={r.id} recipe={r} />)}
            </div>
          </>
        )}
      </main>
      <BottomNav />
    </div>
  );
}

export default function FavoritosPage() {
  return (
    <ProtectedRoute>
      <FavoritosContent />
    </ProtectedRoute>
  );
}
