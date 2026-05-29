'use client';

import { useState, useEffect } from 'react';
import { getIngredients } from '@/lib/api';
import IngredientSelector from './IngredientSelector';

export default function RecipeForm({ initial = {}, onSubmit, loading }) {
  const [name, setName] = useState(initial.name || '');
  const [description, setDescription] = useState(initial.description || '');
  const [link, setLink] = useState(initial.link || '');
  const [imageUrl, setImageUrl] = useState(initial.image_url || '');
  const [selectedIngredients, setSelectedIngredients] = useState(
    initial.ingredients?.map((i) => i.name) || []
  );
  const [stepsText, setStepsText] = useState(
    initial.steps?.map((s) => s.description).join('\n') || ''
  );
  const [allIngredients, setAllIngredients] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getIngredients().then(setAllIngredients).catch(() => {});
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!name.trim()) { setError('El nombre es requerido'); return; }

    const steps = stepsText.split('\n').filter((l) => l.trim());
    try {
      await onSubmit({
        name: name.trim(),
        description: description.trim(),
        link: link.trim(),
        image_url: imageUrl.trim(),
        ingredients: selectedIngredients,
        steps,
      });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {error && (
        <div style={{ background: '#2d1b1b', border: '1px solid #ef4444', borderRadius: 8, padding: '10px 14px', color: '#fca5a5', fontSize: 14 }}>
          {error}
        </div>
      )}

      <div>
        <label style={{ display: 'block', fontSize: 13, color: '#9ca3af', marginBottom: 6 }}>Nombre *</label>
        <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre de la receta" />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: 13, color: '#9ca3af', marginBottom: 6 }}>Descripción</label>
        <textarea className="form-input" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe la receta..." rows={3} style={{ resize: 'vertical' }} />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: 13, color: '#9ca3af', marginBottom: 6 }}>URL de imagen</label>
        <input className="form-input" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: 13, color: '#9ca3af', marginBottom: 6 }}>Link de referencia</label>
        <input className="form-input" value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://..." />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: 13, color: '#9ca3af', marginBottom: 8 }}>
          Ingredientes ({selectedIngredients.length} seleccionados)
        </label>
        <IngredientSelector
          ingredients={allIngredients}
          selected={selectedIngredients}
          onChange={setSelectedIngredients}
        />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: 13, color: '#9ca3af', marginBottom: 6 }}>
          Pasos (uno por línea)
        </label>
        <textarea
          className="form-input"
          value={stepsText}
          onChange={(e) => setStepsText(e.target.value)}
          placeholder={"Paso 1...\nPaso 2...\nPaso 3..."}
          rows={6}
          style={{ resize: 'vertical', fontFamily: 'monospace', fontSize: 13 }}
        />
      </div>

      <button className="btn-primary" type="submit" disabled={loading}>
        {loading ? 'Guardando…' : 'Guardar receta'}
      </button>
    </form>
  );
}
