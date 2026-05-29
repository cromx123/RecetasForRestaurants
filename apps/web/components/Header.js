'use client';

import { useRouter } from 'next/navigation';

export default function Header({ title, showBack = false }) {
  const router = useRouter();

  return (
    <header
      style={{
        background: '#1e1d1d',
        borderBottom: '1px solid #3a3939',
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      {showBack && (
        <button
          onClick={() => router.back()}
          style={{
            background: 'none',
            border: 'none',
            color: '#8b5cf6',
            fontSize: 22,
            cursor: 'pointer',
            lineHeight: 1,
          }}
        >
          ←
        </button>
      )}
      <h1
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: 'white',
          margin: 0,
          background: 'linear-gradient(90deg, #8b5cf6, #a78bfa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {title || '✨ MagicGourmet'}
      </h1>
    </header>
  );
}
