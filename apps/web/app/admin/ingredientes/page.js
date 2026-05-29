'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import AdminOnly from '@/components/AdminOnly';
import { getIngredients, createIngredient, deleteIngredient } from '@/lib/api';

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
      setError(err.message);
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(id, name) {
    if (!confirm(`¿Eliminar el ingrediente "${name}"?`)) return;
    try {
      await deleteIngredient(id);
      setIngredients((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div style={{ background: '#121111', minHeight: '100vh' }}>
      <Header title="Ingredientes" showBack />
      <main style={{ padding: 16, paddingBottom: 80, maxWidth: 480, margin: '0 auto' }}>
        <form onSubmit={handleAdd} style={{ marginBottom: 20, display: 'flex', gap: 8 }}>
          <input
            className="form-input"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nombre del ingrediente"
            style={{ flex: 1 }}
          />
          <button className="btn-primary" type="submit" disabled={adding} style={{ width: 'auto', padding: '10px 18px' }}>
            {adding ? '…' : 'Agregar'}
          </button>
        </form>

        {error && (
          <div style={{ background: '#2d1b1b', border: '1px solid #ef4444', borderRadius: 8, padding: '8px 12px', color: '#fca5a5', fontSize: 13, marginBottom: 14 }}>
            {error}
          </div>
        )}

        <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>{ingredients.length} ingredientes</p>

        {loading && <p style={{ color: '#6b7280', textAlign: 'center', padding: 20 }}>Cargando…</p>}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {ingredients.map((ing) => (
            <div
              key={ing.id}
              style={{
                background: '#1e1d1d',
                border: '1px solid #3a3939',
                borderRadius: 10,
                padding: '10px 14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: 14, color: 'white' }}>🧂 {ing.name}</span>
              <button className="btn-danger" onClick={() => handleDelete(ing.id, ing.name)}>
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

export default function AdminIngredientesPage() {
  return <AdminOnly><AdminIngredientesContent /></AdminOnly>;
}
