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

  if (loading) {
    return (
      <div style={{ background: '#121111', minHeight: '100vh' }}>
        <Header showBack />
        <div style={{ textAlign: 'center', padding: 60, color: '#6b7280' }}>Cargando receta…</div>
        <BottomNav />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div style={{ background: '#121111', minHeight: '100vh' }}>
        <Header showBack />
        <div style={{ textAlign: 'center', padding: 60, color: '#6b7280' }}>Receta no encontrada</div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div style={{ background: '#121111', minHeight: '100vh' }}>
      <Header title={recipe.name} showBack />
      <main style={{ paddingBottom: 80 }}>
        {/* Imagen */}
        <div style={{ position: 'relative', width: '100%', height: 260 }}>
          <img
            src={recipe.image_url || '/assets/imagen_nocargada.png'}
            alt={recipe.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { e.target.src = '/assets/imagen_nocargada.png'; }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #121111 0%, transparent 60%)' }} />
        </div>

        <div style={{ padding: '0 16px', marginTop: -40, position: 'relative' }}>
          {/* Título y favorito */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: 'white', flex: 1, marginRight: 12 }}>{recipe.name}</h1>
            <button
              onClick={toggleFavorite}
              disabled={favLoading}
              style={{
                background: isFavorite ? '#3b2f6e' : '#2a2929',
                border: `1px solid ${isFavorite ? '#8b5cf6' : '#3a3939'}`,
                borderRadius: 10,
                padding: '8px 14px',
                cursor: 'pointer',
                fontSize: 20,
                flexShrink: 0,
              }}
            >
              {isFavorite ? '⭐' : '☆'}
            </button>
          </div>

          {/* Descripción */}
          {recipe.description && (
            <p style={{ color: '#9ca3af', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
              {recipe.description}
            </p>
          )}

          {/* Ingredientes */}
          {recipe.ingredients?.length > 0 && (
            <section style={{ marginBottom: 20 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: '#a78bfa', marginBottom: 10 }}>🧂 Ingredientes</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {recipe.ingredients.map((ing) => (
                  <span
                    key={ing.id}
                    style={{ background: '#2a2929', border: '1px solid #3a3939', borderRadius: 20, padding: '4px 12px', fontSize: 13, color: '#d1d5db' }}
                  >
                    {ing.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Pasos */}
          {recipe.steps?.length > 0 && (
            <section style={{ marginBottom: 20 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: '#a78bfa', marginBottom: 10 }}>📋 Preparación</h2>
              <ol style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {recipe.steps.map((step, i) => (
                  <li
                    key={step.id}
                    style={{ display: 'flex', gap: 12, background: '#1e1d1d', borderRadius: 10, padding: '12px 14px' }}
                  >
                    <span
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: '#8b5cf6',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12,
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </span>
                    <span style={{ fontSize: 14, color: '#d1d5db', lineHeight: 1.6 }}>{step.description}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Link */}
          {recipe.link && (
            <section style={{ marginBottom: 24 }}>
              <a
                href={recipe.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#8b5cf6', fontSize: 14 }}
              >
                🔗 Ver receta completa
              </a>
            </section>
          )}

          {/* Comentarios */}
          <section style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: '#a78bfa', marginBottom: 12 }}>
              💬 Comentarios ({comments.length})
            </h2>

            {isAuthenticated && (
              <form onSubmit={handleComment} style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
                <input
                  className="form-input"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Escribe un comentario…"
                  style={{ flex: 1 }}
                />
                <button
                  className="btn-primary"
                  type="submit"
                  disabled={commentLoading}
                  style={{ width: 'auto', padding: '10px 16px', fontSize: 13 }}
                >
                  Enviar
                </button>
              </form>
            )}

            {!isAuthenticated && (
              <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>
                <a href="/login" style={{ color: '#8b5cf6' }}>Inicia sesión</a> para comentar
              </p>
            )}

            {comments.length === 0 ? (
              <p style={{ color: '#6b7280', fontSize: 13 }}>Sé el primero en comentar</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {comments.map((c) => (
                  <div
                    key={c.id}
                    style={{ background: '#1e1d1d', border: '1px solid #3a3939', borderRadius: 10, padding: '12px 14px' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#a78bfa' }}>
                        {c.username || 'Anónimo'}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 11, color: '#6b7280' }}>
                          {new Date(c.created_at).toLocaleDateString('es')}
                        </span>
                        {(isAdmin || user?.id === c.user_id) && (
                          <button
                            onClick={() => handleDeleteComment(c.id)}
                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 12 }}
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>
                    <p style={{ fontSize: 14, color: '#d1d5db' }}>{c.description}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
