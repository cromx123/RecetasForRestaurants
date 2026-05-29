'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { useAuth } from '@/context/AuthContext';
import { getRecipeById, getFavorites, addFavorite, removeFavorite, getComments, addComment, deleteComment } from '@/lib/api';

export default function RecetaPage() {
  const { id } = useParams();
  const { isAuthenticated, user, isAdmin } = useAuth();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    getRecipeById(id).then(setRecipe).catch(() => {}).finally(() => setLoading(false));
    getComments(id).then(setComments).catch(() => {});
    if (isAuthenticated) {
      getFavorites()
        .then((favs) => setIsFavorite(favs.some((f) => f.id === parseInt(id))))
        .catch(() => {});
    }
  }, [id, isAuthenticated]);

  async function toggleFavorite() {
    if (!isAuthenticated) { window.location.href = '/login'; return; }
    setFavLoading(true);
    try {
      if (isFavorite) {
        await removeFavorite(id);
        setIsFavorite(false);
      } else {
        await addFavorite(id);
        setIsFavorite(true);
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setFavLoading(false);
    }
  }

  async function handleComment(e) {
    e.preventDefault();
    if (!newComment.trim()) return;
    setCommentLoading(true);
    try {
      await addComment(id, newComment.trim());
      setNewComment('');
      const updated = await getComments(id);
      setComments(updated);
    } catch (err) {
      alert(err.message);
    } finally {
      setCommentLoading(false);
    }
  }

  async function handleDeleteComment(commentId) {
    if (!confirm('¿Eliminar este comentario?')) return;
    try {
      await deleteComment(commentId);
      setComments(comments.filter((c) => c.id !== commentId));
    } catch (err) {
      alert(err.message);
    }
  }

  // Paleta de colores gastronómica
  const theme = {
    bg: '#FDFBF7', // Crema cálido
    textMain: '#2C2A29', // Carbón
    textMuted: '#78716C', // Gris piedra cálido
    accent: '#D35400', // Naranja tostado / Terracota
    accentLight: '#F3EFE6', // Fondo para tags
    border: '#E7E5E4',
    cardBg: '#FFFFFF'
  };

  if (loading) {
    return (
      <div style={{ background: theme.bg, minHeight: '100vh' }}>
        <Header showBack />
        <div style={{ textAlign: 'center', padding: 60, color: theme.textMuted, fontFamily: 'serif' }}>Preparando cocina…</div>
        <BottomNav />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div style={{ background: theme.bg, minHeight: '100vh' }}>
        <Header showBack />
        <div style={{ textAlign: 'center', padding: 60, color: theme.textMuted }}>La receta no está disponible.</div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div style={{ background: theme.bg, minHeight: '100vh', color: theme.textMain, fontFamily: '"Inter", "Helvetica Neue", sans-serif' }}>
      <Header title={recipe.name} showBack />
      <main style={{ paddingBottom: 80 }}>
        {/* Imagen con gradiente hacia crema */}
        <div style={{ position: 'relative', width: '100%', height: 320 }}>
          <img
            src={recipe.image_url || '/assets/imagen_nocargada.png'}
            alt={recipe.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { e.target.src = '/assets/imagen_nocargada.png'; }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #FDFBF7 0%, transparent 40%)' }} />
        </div>

        <div style={{ padding: '0 20px', marginTop: -30, position: 'relative' }}>
          {/* Título y favorito */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: theme.textMain, flex: 1, marginRight: 16, lineHeight: 1.2, letterSpacing: '-0.5px' }}>
              {recipe.name}
            </h1>
            <button
              onClick={toggleFavorite}
              disabled={favLoading}
              style={{
                background: theme.cardBg,
                border: `1px solid ${theme.border}`,
                borderRadius: '50%',
                width: 44,
                height: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill={isFavorite ? theme.accent : "none"} stroke={isFavorite ? theme.accent : theme.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>

          {/* Descripción */}
          {recipe.description && (
            <p style={{ color: theme.textMuted, fontSize: 15, lineHeight: 1.6, marginBottom: 28, fontWeight: 400 }}>
              {recipe.description}
            </p>
          )}

          {/* Ingredientes */}
          {recipe.ingredients?.length > 0 && (
            <section style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: theme.textMain, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `1px solid ${theme.border}`, paddingBottom: 8 }}>
                Ingredientes
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
                {recipe.ingredients.map((ing) => (
                  <li
                    key={ing.id}
                    style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: 8, padding: '10px 14px', fontSize: 14, color: theme.textMain, fontWeight: 500, boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}
                  >
                    {ing.name}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Link */}
          {recipe.link && (
            <section style={{ marginBottom: 32 }}>
              <a
                href={recipe.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-block', color: theme.accent, fontSize: 15, fontWeight: 600, textDecoration: 'none', borderBottom: `2px solid ${theme.accentLight}`, paddingBottom: 2 }}
              >
                Ver fuente original de la receta ↗
              </a>
            </section>
          )}

          
        </div>
      </main>
      <BottomNav />
    </div>
  );
}