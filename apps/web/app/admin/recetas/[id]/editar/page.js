'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import AdminOnly from '@/components/AdminOnly';
import RecipeForm from '@/components/RecipeForm';
import { getRecipeById, updateRecipe } from '@/lib/api';

function EditarRecetaContent() {
  const { id } = useParams();
  const router = useRouter();
  const [recipe, setRecipe] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getRecipeById(id).then(setRecipe).catch(() => {}).finally(() => setFetching(false));
  }, [id]);

  async function handleSubmit(data) {
    setSaving(true);
    try {
      await updateRecipe(id, data);
      router.push('/admin/recetas');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ background: '#121111', minHeight: '100vh' }}>
      <Header title="Editar Receta" showBack />
      <main style={{ padding: 16, paddingBottom: 80, maxWidth: 560, margin: '0 auto' }}>
        {fetching && <p style={{ color: '#6b7280', textAlign: 'center', padding: 40 }}>Cargando receta…</p>}
        {!fetching && !recipe && <p style={{ color: '#fca5a5', textAlign: 'center', padding: 40 }}>Receta no encontrada</p>}
        {!fetching && recipe && (
          <RecipeForm initial={recipe} onSubmit={handleSubmit} loading={saving} />
        )}
      </main>
      <BottomNav />
    </div>
  );
}

export default function EditarRecetaPage() {
  return <AdminOnly><EditarRecetaContent /></AdminOnly>;
}
