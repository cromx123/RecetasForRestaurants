'use client';

import { useRouter } from 'next/navigation';

export default function RecipeCard({ recipe }) {
  const router = useRouter();

  const ingredientNames = recipe.ingredients?.map((i) => i.name).join(', ') || '';

  return (
    <div
      onClick={() => router.push(`/recetas/${recipe.id}`)}
      style={{
        background: '#2a2929',
        border: '1px solid #3a3939',
        borderRadius: 12,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.15s, border-color 0.15s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.borderColor = '#8b5cf6';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = '#3a3939';
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: 180 }}>
        <img
          src={recipe.image_url || '/assets/imagen_nocargada.png'}
          alt={recipe.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => { e.target.src = '/assets/imagen_nocargada.png'; }}
        />
      </div>
      <div style={{ padding: '12px 14px' }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: 'white', marginBottom: 6 }}>
          {recipe.name}
        </h3>
        <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 8, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {recipe.description}
        </p>
        {ingredientNames && (
          <p style={{ fontSize: 12, color: '#6b7280' }}>
            🥘 {ingredientNames.length > 60 ? ingredientNames.slice(0, 60) + '…' : ingredientNames}
          </p>
        )}
      </div>
    </div>
  );
}
