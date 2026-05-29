'use client';

import { useEffect, useState, useRef } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import RecipeCard from '@/components/RecipeCard';
import { getRecipes } from '@/lib/api';

const CATEGORY_ORDER = [
  'Entradas',
  'Sopas y Cremas',
  'Ensaladas',
  'Pastas y Arroces',
  'Carnes',
  'Aves',
  'Mariscos',
  'Postres',
  'Bebidas',
  'Cócteles',
  'Vinos',
];

// Paleta de colores gastronómica compartida
const theme = {
  bg: '#FDFBF7', // Crema cálido
  textMain: '#2C2A29', // Carbón
  textMuted: '#78716C', // Gris piedra cálido
  accent: '#D35400', // Naranja tostado / Terracota
  accentLight: '#F3EFE6', // Fondo para tags
  border: '#E7E5E4',
  cardBg: '#FFFFFF'
};

export default function HomePage() {
  const [recipes, setRecipes]         = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState('');
  const [activeCategory, setActive]   = useState(null);
  const sectionRefs                   = useRef({});

  useEffect(() => {
    getRecipes()
      .then((data) => {
        setRecipes(data);
        const first = CATEGORY_ORDER.find((c) => data.some((r) => r.category === c));
        if (first) setActive(first);
      })
      .catch(() => setError('No se pudo cargar la carta'))
      .finally(() => setLoading(false));
  }, []);

  const grouped = CATEGORY_ORDER.reduce((acc, cat) => {
    const items = recipes.filter((r) => r.category === cat);
    if (items.length > 0) acc[cat] = items;
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  const scrollToCategory = (cat) => {
    setActive(cat);
    sectionRefs.current[cat]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div style={{ background: theme.bg, minHeight: '100vh', fontFamily: '"Inter", "Helvetica Neue", sans-serif' }}>
      <Header />

      {/* Hero banner - Estilo Portada de Menú */}
      <div style={{
        background: theme.bg,
        padding: '48px 20px 36px',
        textAlign: 'center',
        borderBottom: `1px solid ${theme.border}`,
        position: 'relative'
      }}>
        <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: '40px', height: '1px', background: theme.accent }}></div>
        <p style={{ color: theme.textMuted, fontSize: 12, letterSpacing: '4px', textTransform: 'uppercase', margin: '0 0 12px', fontWeight: 500 }}>
          Bienvenido a
        </p>
        <h2 style={{ 
          fontSize: 36, 
          fontWeight: 800, 
          color: theme.textMain, 
          margin: '0 0 12px', 
          letterSpacing: '-1px',
          fontFamily: '"Playfair Display", "Merriweather", serif' // Toque clásico/elegante
        }}>
          MagicGourmet
        </h2>
        <p style={{ color: theme.accent, fontSize: 14, margin: '0 0 8px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
          Carta Digital · Temporada 2025
        </p>
        <p style={{ color: theme.textMuted, fontSize: 13, margin: 0, fontStyle: 'italic' }}>
          Martes a Domingo  ·  13:00 – 23:00
        </p>
      </div>

      {/* Category pill tabs - Navegación Minimalista */}
      {!loading && categories.length > 0 && (
        <div
          style={{
            position: 'sticky',
            top: 57,
            zIndex: 40,
            background: 'rgba(253, 251, 247, 0.95)', // Crema semitransparente
            backdropFilter: 'blur(8px)',
            borderBottom: `1px solid ${theme.border}`,
            display: 'flex',
            gap: 12,
            padding: '12px 20px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {categories.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => scrollToCategory(cat)}
                style={{
                  flexShrink: 0,
                  padding: '8px 18px',
                  borderRadius: 24,
                  border: `1px solid ${active ? theme.accent : theme.border}`,
                  background: active ? theme.accent : theme.cardBg,
                  color: active ? '#FFFFFF' : theme.textMain,
                  fontSize: 13,
                  fontWeight: active ? 600 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease-in-out',
                  boxShadow: active ? '0 4px 10px rgba(211, 84, 0, 0.2)' : '0 1px 2px rgba(0,0,0,0.02)',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}

      <main style={{ padding: '32px 20px', paddingBottom: 100 }}>
        {loading && (
          <div style={{ textAlign: 'center', padding: 60 }}>
            <p style={{ color: theme.textMuted, fontSize: 15, fontStyle: 'italic' }}>Preparando la carta…</p>
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', padding: 40, background: '#FEF2F2', borderRadius: 8, border: '1px solid #FCA5A5' }}>
            <p style={{ color: '#DC2626', fontWeight: 500 }}>{error}</p>
          </div>
        )}

        {!loading && !error && Object.entries(grouped).map(([cat, items]) => (
          <section
            key={cat}
            ref={(el) => { sectionRefs.current[cat] = el; }}
            style={{ marginBottom: 48, scrollMarginTop: 140 }}
          >
            {/* Category header - Estilo Título de Sección */}
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              marginBottom: 20,
              paddingBottom: 12,
              borderBottom: `2px solid ${theme.border}`,
            }}>
              <h2 style={{ 
                fontSize: 22, 
                fontWeight: 700, 
                color: theme.textMain, 
                margin: 0,
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {cat}
              </h2>
              <span style={{
                fontSize: 12,
                fontWeight: 600,
                color: theme.accent,
                background: theme.accentLight,
                borderRadius: 12,
                padding: '4px 10px',
              }}>
                {items.length} {items.length === 1 ? 'opción' : 'opciones'}
              </span>
            </div>

            {/* Grid of cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 20,
            }}>
              {items.map((r) => (
                <RecipeCard key={r.id} recipe={r} />
              ))}
            </div>
          </section>
        ))}

        {!loading && !error && categories.length === 0 && (
          <div style={{ textAlign: 'center', padding: 60 }}>
            <p style={{ color: theme.textMuted, fontSize: 15 }}>La carta está siendo actualizada.</p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}