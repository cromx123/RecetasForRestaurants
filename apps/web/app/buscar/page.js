'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import RecipeCard from '@/components/RecipeCard';
import IngredientSelector from '@/components/IngredientSelector';
import { searchRecipes, getIngredients } from '@/lib/api';

export default function BuscarPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    getIngredients().then(setIngredients).catch(() => {});
  }, []);

  async function handleSearch(e) {
    e.preventDefault();
    const term = query.trim() || selectedIngredients.join(' ');
    if (!term) return;
    setLoading(true);
    setSearched(true);
    try {
      const data = await searchRecipes(term);
      setResults(data);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ background: '#121111', minHeight: '100vh' }}>
      <Header title="Buscar recetas" />
      <main style={{ padding: 16, paddingBottom: 80 }}>
        <form onSubmit={handleSearch} style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
          <input
            className="form-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre, descripción…"
            style={{ flex: 1 }}
          />
          <button className="btn-primary" type="submit" style={{ width: 'auto', padding: '10px 18px' }}>
            Buscar
          </button>
        </form>

        <button
          onClick={() => setShowFilters(!showFilters)}
          style={{
            background: 'none',
            border: '1px solid #3a3939',
            borderRadius: 8,
            padding: '6px 14px',
            color: '#9ca3af',
            cursor: 'pointer',
            fontSize: 13,
            marginBottom: 12,
          }}
        >
          {showFilters ? '▲ Ocultar ingredientes' : '▼ Filtrar por ingredientes'}
        </button>

        {showFilters && (
          <div style={{ marginBottom: 16, background: '#1e1d1d', borderRadius: 10, padding: 12, border: '1px solid #3a3939' }}>
            <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 8 }}>Selecciona ingredientes para filtrar:</p>
            <IngredientSelector
              ingredients={ingredients}
              selected={selectedIngredients}
              onChange={setSelectedIngredients}
            />
            {selectedIngredients.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedIngredients([])}
                style={{ marginTop: 8, background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', fontSize: 12 }}
              >
                Limpiar selección
              </button>
            )}
          </div>
        )}

        {loading && (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <img src="/assets/imagen_buscando.png" alt="Buscando" width={80} style={{ opacity: 0.5, margin: '0 auto 12px' }} />
            <p style={{ color: '#6b7280' }}>Buscando…</p>
          </div>
        )}

        {!loading && searched && results.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <img src="/assets/imagen_nocargada.png" alt="Sin resultados" width={80} style={{ opacity: 0.4, margin: '0 auto 12px' }} />
            <p style={{ color: '#6b7280' }}>No se encontraron recetas</p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <>
            <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>{results.length} resultado(s)</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {results.map((r) => <RecipeCard key={r.id} recipe={r} />)}
            </div>
          </>
        )}

        {!searched && !loading && (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <img src="/assets/busqueda.png" alt="Buscar" width={64} style={{ opacity: 0.3, margin: '0 auto 12px' }} />
            <p style={{ color: '#6b7280', fontSize: 14 }}>Escribe para buscar recetas</p>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
