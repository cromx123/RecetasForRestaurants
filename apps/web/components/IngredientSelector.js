'use client';

export default function IngredientSelector({ ingredients, selected, onChange }) {
  function toggle(name) {
    if (selected.includes(name)) {
      onChange(selected.filter((n) => n !== name));
    } else {
      onChange([...selected, name]);
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        padding: '10px 0',
      }}
    >
      {ingredients.map((ing) => {
        const active = selected.includes(ing.name);
        return (
          <button
            key={ing.id}
            type="button"
            onClick={() => toggle(ing.name)}
            style={{
              padding: '6px 12px',
              borderRadius: 20,
              fontSize: 13,
              border: active ? '1px solid #8b5cf6' : '1px solid #3a3939',
              background: active ? '#3b2f6e' : '#2a2929',
              color: active ? '#a78bfa' : '#9ca3af',
              cursor: 'pointer',
              transition: 'all 0.15s',
              fontWeight: active ? 600 : 400,
            }}
          >
            {ing.name}
          </button>
        );
      })}
    </div>
  );
}
