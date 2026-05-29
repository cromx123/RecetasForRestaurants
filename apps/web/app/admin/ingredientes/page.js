'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import AdminOnly from '@/components/AdminOnly';
import { getIngredients, createIngredient, deleteIngredient } from '@/lib/api';

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
  Ingredient: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>,
  Trash: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
  Plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Loader: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={theme.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>,
  Empty: () => <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={theme.textMuted} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>
};

function AdminIngredientesContent() {
  const [ingredients, setIngredients] = useState([]);
  const [newName, setNewName] = useState('');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState('');

  function load() {
    getIngredients().then(setIngredients).catch(() => {}).finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    setAdding(true);
    setError('');
    try {
      const ing = await createIngredient(newName.trim());
      setIngredients((prev) => [...prev, ing].sort((a, b) => a.name.localeCompare(b.name)));
      setNewName('');
    } catch (err) {
      setError(err.message || 'Error al agregar el ingrediente.');
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(id, name) {
    if (!confirm(`¿Estás seguro de que deseas eliminar el ingrediente "${name}"?`)) return;
    try {
      await deleteIngredient(id);
      setIngredients((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      alert(err.message || 'Error al eliminar.');
    }
  }

  return (
    <div style={{ background: theme.bg, minHeight: '100vh', fontFamily: '"Inter", "Helvetica Neue", sans-serif' }}>
      <Header title="Despensa de Ingredientes" showBack />
      
      <main style={{ padding: '24px 16px', paddingBottom: 100, maxWidth: 520, margin: '0 auto' }}>
        
        {/* ── Formulario de Agregar ── */}
        <div style={{ 
          background: theme.cardBg, 
          border: `1px solid ${theme.border}`, 
          borderRadius: 16, 
          padding: 20, 
          marginBottom: 32,
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
        }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: theme.textMain, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Registrar nuevo ingrediente
          </p>
          <form onSubmit={handleAdd} style={{ display: 'flex', gap: 10 }}>
            <input
              className="form-input"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Ej. Sal de mar, Albahaca fresca..."
              style={{ flex: 1, padding: '10px 14px' }}
            />
            <button 
              className="btn-primary" 
              type="submit" 
              disabled={adding || !newName.trim()} 
              style={{ width: 'auto', padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 6 }}
            >
              {adding ? '...' : <><Icons.Plus /> Agregar</>}
            </button>
          </form>

          {error && (
            <div style={{ marginTop: 12, background: '#FDF3F3', border: `1px solid ${theme.danger}40`, borderRadius: 8, padding: '8px 12px' }}>
              <p style={{ color: theme.danger, fontSize: 13, margin: 0, fontWeight: 500 }}>{error}</p>
            </div>
          )}
        </div>

        {/* ── Cabecera de la Lista ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: theme.textMain, margin: 0, fontFamily: '"Playfair Display", serif' }}>
            Listado de Ingredientes
          </h2>
          <span style={{ fontSize: 12, fontWeight: 600, color: theme.textMuted, background: theme.border, padding: '4px 10px', borderRadius: 12 }}>
            {ingredients.length} registrados
          </span>
        </div>

        {/* ── Estados de Carga y Vacío ── */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '40px 20px', animation: 'pulse 1.5s infinite' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}><Icons.Loader /></div>
            <p style={{ color: theme.textMuted, fontSize: 14, fontStyle: 'italic' }}>Abriendo despensa...</p>
          </div>
        )}

        {!loading && ingredients.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', background: theme.cardBg, borderRadius: 16, border: `1px dashed ${theme.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}><Icons.Empty /></div>
            <p style={{ color: theme.textMain, fontSize: 15, fontWeight: 600, margin: '0 0 4px' }}>Despensa vacía</p>
            <p style={{ color: theme.textMuted, fontSize: 13, margin: 0 }}>Aún no has registrado ningún ingrediente.</p>
          </div>
        )}

        {/* ── Lista de Ingredientes ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {ingredients.map((ing) => (
            <div
              key={ing.id}
              style={{
                background: theme.cardBg,
                border: `1px solid ${theme.border}`,
                borderRadius: 10,
                padding: '12px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 1px 2px rgba(0,0,0,0.01)',
                transition: 'transform 0.2s ease, border-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.borderColor = theme.textMuted;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = theme.border;
              }}
            >
              <span style={{ fontSize: 15, color: theme.textMain, display: 'flex', alignItems: 'center', gap: 10, fontWeight: 500 }}>
                <span style={{ color: theme.accent }}><Icons.Ingredient /></span> {ing.name}
              </span>
              <button 
                className="btn-danger" 
                onClick={() => handleDelete(ing.id, ing.name)}
                style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                title="Eliminar ingrediente"
                aria-label="Eliminar ingrediente"
              >
                <Icons.Trash />
              </button>
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

export default function AdminIngredientesPage() {
  return <AdminOnly><AdminIngredientesContent /></AdminOnly>;
}