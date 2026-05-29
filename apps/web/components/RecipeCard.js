'use client';

import { useRouter } from 'next/navigation';

// Colores redefinidos a tonos "culinarios" y terrosos (elegantes, no neón)
const CATEGORY_COLORS = {
  'Entradas':        '#7A9A5B', // Verde salvia
  'Sopas y Cremas':  '#D4A373', // Arena/Tostado
  'Ensaladas':       '#8CB369', // Verde oliva claro
  'Pastas y Arroces':'#E27D60', // Terracota suave
  'Carnes':          '#9B2226', // Borgoña / Vino tinto
  'Aves':            '#DDA15E', // Ocre dorado
  'Mariscos':        '#5FA8D3', // Azul océano pálido
  'Postres':         '#DDA7A5', // Rosa empolvado
  'Bebidas':         '#8ECAE6', // Celeste claro
  'Cócteles':        '#E07A5F', // Naranja atardecer
  'Vinos':           '#660708', // Burdeos oscuro
};

const theme = {
  bg: '#FDFBF7',
  textMain: '#2C2A29',
  textMuted: '#78716C',
  border: '#E7E5E4',
  cardBg: '#FFFFFF'
};

export default function RecipeCard({ recipe }) {
  const router = useRouter();
  
  // Si no hay categoría, usamos un terracota por defecto
  const accentColor = CATEGORY_COLORS[recipe.category] || '#D35400'; 
  
  const price = recipe.price
    ? `$ ${Number(recipe.price).toLocaleString('es-CL')}`
    : null;

  return (
    <div
      onClick={() => router.push(`/recetas/${recipe.id}`)}
      style={{
        background: theme.cardBg,
        border: `1px solid ${theme.border}`,
        borderRadius: 12, // Curva ligeramente más elegante (12 en vez de 14)
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)';
      }}
    >
      {/* Imagen Header */}
      <div style={{ position: 'relative', width: '100%', height: 180 }}>
        <img
          src={recipe.image_url || '/assets/imagen_nocargada.png'}
          alt={recipe.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => { e.target.src = '/assets/imagen_nocargada.png'; }}
        />

        {/* Overlay de no disponible (Elegante) */}
        {recipe.is_available === 0 && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(2px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{
              color: '#9B2226', fontSize: 13, fontWeight: 700,
              background: '#FFFFFF', padding: '6px 16px', borderRadius: 20,
              border: '1px solid #9B2226',
              textTransform: 'uppercase', letterSpacing: '1px'
            }}>
              Agotado
            </span>
          </div>
        )}

        {/* Badge de Precio */}
        {price && (
          <div style={{
            position: 'absolute', bottom: 12, right: 12,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(4px)',
            borderRadius: 8,
            padding: '6px 12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}>
            <span style={{ color: theme.textMain, fontWeight: 700, fontSize: 14 }}>
              {price}
            </span>
          </div>
        )}

        {/* Badge de Tiempo de Preparación */}
        {recipe.preparation_time > 0 && (
          <div style={{
            position: 'absolute', top: 12, left: 12,
            background: 'rgba(44, 42, 41, 0.8)', // Carbón translúcido
            backdropFilter: 'blur(4px)',
            borderRadius: 20,
            padding: '4px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span style={{ color: '#FFFFFF', fontSize: 11, fontWeight: 500 }}>
              {recipe.preparation_time} min
            </span>
          </div>
        )}
      </div>

      {/* Contenido / Información */}
      <div style={{ padding: '16px' }}>
        {/* Etiqueta de Categoría */}
        <div style={{ marginBottom: 10 }}>
          <span style={{
            fontSize: 10,
            color: accentColor,
            background: `${accentColor}12`, // 12 es opacidad en hex para un fondo muy sutil
            border: `1px solid ${accentColor}30`,
            borderRadius: 12,
            padding: '3px 10px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
            {recipe.category}
          </span>
        </div>

        <h3 style={{
          fontSize: 17,
          fontWeight: 700,
          color: theme.textMain,
          margin: '0 0 8px',
          lineHeight: 1.3,
          fontFamily: '"Playfair Display", "Merriweather", serif', // Toque editorial
        }}>
          {recipe.name}
        </h3>

        <p style={{
          fontSize: 13,
          color: theme.textMuted,
          margin: '0 0 16px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          lineHeight: 1.5,
        }}>
          {recipe.description}
        </p>

        {/* Ingredientes (Chips minimalistas) */}
        {recipe.ingredients?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {recipe.ingredients.slice(0, 3).map((ing) => (
              <span
                key={ing.id}
                style={{
                  fontSize: 11,
                  color: theme.textMuted,
                  background: theme.bg,
                  border: `1px solid ${theme.border}`,
                  borderRadius: 6,
                  padding: '4px 8px',
                  fontWeight: 500
                }}
              >
                {ing.name}
              </span>
            ))}
            {recipe.ingredients.length > 3 && (
              <span style={{ 
                fontSize: 11, 
                color: theme.textMuted, 
                padding: '4px 6px',
                fontStyle: 'italic'
              }}>
                + {recipe.ingredients.length - 3} más
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}