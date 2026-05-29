'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import AdminOnly from '@/components/AdminOnly';
import { getFilters, createFilter, deleteFilter, getIngredients } from '@/lib/api';

// ── Paleta de Colores Gastronómica (Admin) ────────────────────
const theme = {
  bg: '#FDFBF7',
  textMain: '#2C2A29',
  textMuted: '#78716C',
  accent: '#D35400',
  accentLight: '#F3EFE6',
  border: '#E7E5E4',
  cardBg: '#FFFFFF',
  danger: '#9B2226',
};

// ── Íconos SVG ────────────────────────────────────────────────
const Icons = {
  Filter: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>,
  Trash: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
  ArrowRight: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>,
  Loader: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={theme.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
};

function AdminFiltrosContent() {
  const [filters, setFilters] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredientId, setIngredientId] = useState('');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getFilters().then(setFilters).catch(() => {}).finally(() => setLoading(false));
    getIngredients().then(setIngredients).catch(() => {});
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    if (!name.trim()) return;
    setAdding(true);
    setError('');
    try {
      const f = await createFilter({
        name: name.trim(),
        description: description.trim() || null,
        ingredient_id: ingredientId ? parseInt(ingredientId) : null,
      });
      setFilters((prev) => [...prev, { ...f, description, ingredient_name: ingredients.find(i => i.id === parseInt(ingredientId))?.name }]);
      setName('');
      setDescription('');
      setIngredientId('');
    } catch (err) {
      setError(err.message || 'Error al crear el filtro.');
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(id, filterName) {
    if (!confirm(`¿Estás seguro de que deseas eliminar el filtro "${filterName}"?`)) return;
    try {
      await deleteFilter(id);
      setFilters((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      alert(err.message || 'Error al eliminar.');
    }
  }

  return (
    <div style={{ background: theme.bg, minHeight: '100vh', fontFamily: '"Inter", "Helvetica Neue", sans-serif' }}>
      <Header title="Gestión de Filtros" showBack />
      <main style={{ padding: '24px 16px', paddingBottom: 100, maxWidth: 520, margin: '0 auto' }}>
        
        {/* ── Formulario de Creación ── */}
        <form
          onSubmit={handleAdd}
          style={{
            background: theme.cardBg,
            border: `1px solid ${theme.border}`,
            borderRadius: 16,
            padding: 24,
            marginBottom: 32,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}
        >
          <div style={{ marginBottom: 4 }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: theme.textMain, margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Agregar Filtro
            </p>
            <p style={{ fontSize: 13, color: theme.textMuted, margin: '4px 0 0' }}>
              Define criterios de búsqueda (ej. Vegano, Sin Gluten).
            </p>
          </div>

          <input 
            className="form-input" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Nombre del filtro *" 
            required
          />
          <input 
            className="form-input" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Descripción breve (opcional)" 
          />
          
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: theme.textMuted, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Asociar a Ingrediente (Opcional)
            </label>
            <select
              className="form-input"
              value={ingredientId}
              onChange={(e) => setIngredientId(e.target.value)}
              style={{ cursor: 'pointer', appearance: 'auto' }}
            >
              <option value="">Sin ingrediente asociado</option>
              {ingredients.map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}
            </select>
          </div>

          {error && (
            <div style={{ padding: '10px 14px', background: '#FDF3F3', border: `1px solid ${theme.danger}40`, borderRadius: 8 }}>
              <p style={{ color: theme.danger, fontSize: 13, margin: 0, fontWeight: 500 }}>{error}</p>
            </div>
          )}

          <button className="btn-primary" type="submit" disabled={adding} style={{ marginTop: 8 }}>
            {adding ? 'Creando filtro…' : 'Crear Filtro'}
          </button>
        </form>

        {/* ── Lista de Filtros ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: theme.textMain, margin: 0, fontFamily: '"Playfair Display", serif' }}>
            Filtros Activos
          </h2>
          <span style={{ fontSize: 12, fontWeight: 600, color: theme.textMuted, background: theme.border, padding: '4px 10px', borderRadius: 12 }}>
            {filters.length} {filters.length === 1 ? 'filtro' : 'filtros'}
          </span>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '40px 20px', animation: 'pulse 1.5s infinite' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}><Icons.Loader /></div>
            <p style={{ color: theme.textMuted, fontSize: 14, fontStyle: 'italic' }}>Cargando filtros...</p>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filters.map((f) => (
            <div
              key={f.id}
              style={{
                background: theme.cardBg,
                border: `1px solid ${theme.border}`,
                borderRadius: 12,
                padding: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.01)',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div>
                <p style={{ fontSize: 15, fontWeight: 700, color: theme.textMain, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: theme.accent }}><Icons.Filter /></span> {f.name}
                </p>
                {f.description && <p style={{ fontSize: 13, color: theme.textMuted, margin: '0 0 4px', paddingLeft: 22 }}>{f.description}</p>}
                
                {f.ingredient_name && (
                  <p style={{ fontSize: 12, color: theme.accent, margin: 0, paddingLeft: 22, display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}>
                    <Icons.ArrowRight /> Vinculado a: {f.ingredient_name}
                  </p>
                )}
              </div>
              <button 
                className="btn-danger" 
                onClick={() => handleDelete(f.id, f.name)}
                style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                title="Eliminar filtro"
                aria-label="Eliminar filtro"
              >
                <Icons.Trash />
              </button>
            </div>
          ))}
        </div>

        {!loading && filters.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', background: theme.cardBg, borderRadius: 16, border: `1px dashed ${theme.border}` }}>
            <p style={{ color: theme.textMain, fontSize: 15, fontWeight: 600, margin: '0 0 4px' }}>Sin filtros</p>
            <p style={{ color: theme.textMuted, fontSize: 13, margin: 0 }}>Aún no has configurado ningún filtro de búsqueda.</p>
          </div>
        )}
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

export default function AdminFiltrosPage() {
  return <AdminOnly><AdminFiltrosContent /></AdminOnly>;
}