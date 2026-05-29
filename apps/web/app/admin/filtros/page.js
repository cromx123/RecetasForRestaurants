'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import AdminOnly from '@/components/AdminOnly';
import { getFilters, createFilter, deleteFilter, getIngredients } from '@/lib/api';

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
      setError(err.message);
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(id, filterName) {
    if (!confirm(`¿Eliminar el filtro "${filterName}"?`)) return;
    try {
      await deleteFilter(id);
      setFilters((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div style={{ background: '#121111', minHeight: '100vh' }}>
      <Header title="Filtros" showBack />
      <main style={{ padding: 16, paddingBottom: 80, maxWidth: 480, margin: '0 auto' }}>
        <form
          onSubmit={handleAdd}
          style={{
            background: '#1e1d1d',
            border: '1px solid #3a3939',
            borderRadius: 12,
            padding: 16,
            marginBottom: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <p style={{ fontSize: 14, fontWeight: 600, color: 'white', marginBottom: 2 }}>Agregar filtro</p>
          <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre del filtro *" />
          <input className="form-input" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción (opcional)" />
          <select
            className="form-input"
            value={ingredientId}
            onChange={(e) => setIngredientId(e.target.value)}
            style={{ cursor: 'pointer' }}
          >
            <option value="">Sin ingrediente asociado</option>
            {ingredients.map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}
          </select>

          {error && <p style={{ color: '#fca5a5', fontSize: 13 }}>{error}</p>}

          <button className="btn-primary" type="submit" disabled={adding}>
            {adding ? 'Agregando…' : 'Agregar filtro'}
          </button>
        </form>

        <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>{filters.length} filtros</p>
        {loading && <p style={{ color: '#6b7280', textAlign: 'center', padding: 20 }}>Cargando…</p>}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filters.map((f) => (
            <div
              key={f.id}
              style={{
                background: '#1e1d1d',
                border: '1px solid #3a3939',
                borderRadius: 10,
                padding: '12px 14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'white', marginBottom: 2 }}>🔍 {f.name}</p>
                {f.description && <p style={{ fontSize: 12, color: '#6b7280' }}>{f.description}</p>}
                {f.ingredient_name && <p style={{ fontSize: 12, color: '#a78bfa' }}>→ {f.ingredient_name}</p>}
              </div>
              <button className="btn-danger" onClick={() => handleDelete(f.id, f.name)}>Eliminar</button>
            </div>
          ))}
        </div>

        {!loading && filters.length === 0 && (
          <p style={{ color: '#6b7280', textAlign: 'center', padding: 20 }}>No hay filtros creados</p>
        )}
      </main>
      <BottomNav />
    </div>
  );
}

export default function AdminFiltrosPage() {
  return <AdminOnly><AdminFiltrosContent /></AdminOnly>;
}
