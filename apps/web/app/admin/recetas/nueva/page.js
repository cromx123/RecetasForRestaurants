'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import AdminOnly from '@/components/AdminOnly';
import RecipeForm from '@/components/RecipeForm';
import { createRecipe } from '@/lib/api';

function NuevaRecetaContent() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(data) {
    setLoading(true);
    try {
      await createRecipe(data);
      router.push('/admin/recetas');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ background: '#121111', minHeight: '100vh' }}>
      <Header title="Nueva Receta" showBack />
      <main style={{ padding: 16, paddingBottom: 80, maxWidth: 560, margin: '0 auto' }}>
        <RecipeForm onSubmit={handleSubmit} loading={loading} />
      </main>
      <BottomNav />
    </div>
  );
}

export default function NuevaRecetaPage() {
  return <AdminOnly><NuevaRecetaContent /></AdminOnly>;
}
