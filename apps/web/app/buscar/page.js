'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import RecipeCard from '@/components/RecipeCard';
import IngredientSelector from '@/components/IngredientSelector';
import { searchRecipes, getIngredients } from '@/lib/api';

// ── Paleta de Colores Gastronómica ────────────────────────────
const theme = {
  bg: '#FDFBF7', // Crema cálido
  textMain: '#2C2A29', // Carbón
  textMuted: '#78716C', // Gris piedra
  accent: '#D35400', // Terracota
  border: '#E7E5E4',
  cardBg: '#FFFFFF',
  accentLight: '#F3EFE6', // Crema oscuro para fondos
};

// ── Íconos SVG ────────────────────────────────────────────────
const Icons = {
  Search: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  Filter: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>,
  ChevronUp: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>,
  ChevronDown: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>,
  Empty: () => <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={theme.textMuted} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>,
  Loader: () => <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={theme.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
};

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
    <div style={{ background: theme.bg, minHeight: '100vh', fontFamily: '"Inter", "Helvetica Neue", sans-serif' }}>
      <Header title="Explorar la Carta" />
      <main style={{ padding: '24px 20px', paddingBottom: 100, maxWidth: 800, margin: '0 auto' }}>
        
        {/* ── Buscador Principal ── */}
        <form onSubmit={handleSearch} style={{ marginBottom: 16 }}>
          <div style={{ 
            display: 'flex', 
            background: theme.cardBg, 
            borderRadius: 12, 
            border: `1px solid ${theme.border}`,
            padding: '4px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
            transition: 'box-shadow 0.2s ease',
          }}
          onFocus={(e) => e.currentTarget.style.boxShadow = '0 4px 16px rgba(211, 84, 0, 0.1)'}
          onBlur={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)'}
          >
            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 12, color: theme.textMuted }}>
              <Icons.Search />
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar plato, ingredientes, categoría..."
              style={{ 
                flex: 1, 
                border: 'none', 
                background: 'transparent', 
                padding: '12px 14px', 
                fontSize: 15, 
                color: theme.textMain, 
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
            <button 
              type="submit" 
              style={{ 
                background: theme.accent, 
                color: 'white', 
                border: 'none', 
                borderRadius: 8, 
                padding: '0 20px', 
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
                transition: 'background 0.2s ease'
              }}
            >
              Buscar
            </button>
          </div>
        </form>

        {/* ── Botón de Filtros ── */}
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 20 }}>
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: showFilters ? theme.accentLight : 'transparent',
              border: `1px solid ${showFilters ? theme.accent : theme.border}`,
              borderRadius: 20,
              padding: '6px 16px',
              color: showFilters ? theme.accent : theme.textMuted,
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 600,
              transition: 'all 0.2s ease',
            }}
          >
            <Icons.Filter />
            {showFilters ? 'Ocultar ingredientes' : 'Filtrar por ingredientes'}
            {showFilters ? <Icons.ChevronUp /> : <Icons.ChevronDown />}
          </button>
        </div>

        {/* ── Panel de Filtros ── */}
        {showFilters && (
          <div style={{ 
            marginBottom: 24, 
            background: theme.cardBg, 
            borderRadius: 12, 
            padding: 20, 
            border: `1px solid ${theme.border}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: theme.textMain, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>
              Selecciona ingredientes
            </p>
            <IngredientSelector
              ingredients={ingredients}
              selected={selectedIngredients}
              onChange={setSelectedIngredients}
            />
            {selectedIngredients.length > 0 && (
              <div style={{ marginTop: 16, borderTop: `1px solid ${theme.border}`, paddingTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setSelectedIngredients([])}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: theme.textMuted, 
                    cursor: 'pointer', 
                    fontSize: 13,
                    textDecoration: 'underline'
                  }}
                >
                  Limpiar selección
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── Estados de Carga y Resultados ── */}
        <div style={{ marginTop: 24 }}>
          {loading && (
            <div style={{ textAlign: 'center', padding: '60px 20px', animation: 'pulse 1.5s infinite' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                 <Icons.Loader />
              </div>
              <p style={{ color: theme.textMuted, fontSize: 15, fontStyle: 'italic' }}>Explorando la cocina...</p>
              
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes pulse {
                  0% { opacity: 0.6; }
                  50% { opacity: 1; }
                  100% { opacity: 0.6; }
                }
              `}} />
            </div>
          )}

          {!loading && searched && results.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: theme.cardBg, borderRadius: 16, border: `1px dashed ${theme.border}` }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                <Icons.Empty />
              </div>
              <h3 style={{ color: theme.textMain, fontSize: 18, marginBottom: 8, fontFamily: '"Playfair Display", serif' }}>
                No encontramos coincidencias
              </h3>
              <p style={{ color: theme.textMuted, fontSize: 14, margin: 0 }}>
                Intenta buscar con otros ingredientes o términos más generales.
              </p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: theme.textMain, margin: 0, fontFamily: '"Playfair Display", serif' }}>
                  Resultados
                </h3>
                <span style={{ fontSize: 12, fontWeight: 600, color: theme.accent, background: theme.accentLight, padding: '4px 10px', borderRadius: 12 }}>
                  {results.length} {results.length === 1 ? 'plato' : 'platos'}
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                {results.map((r) => <RecipeCard key={r.id} recipe={r} />)}
              </div>
            </>
          )}

          {!searched && !loading && (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <div style={{ color: theme.border, marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </div>
              <p style={{ color: theme.textMuted, fontSize: 15, margin: 0 }}>
                Escribe el nombre de un plato o ingrediente para comenzar.
              </p>
            </div>
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}