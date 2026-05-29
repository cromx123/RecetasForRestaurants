'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { login as apiLogin } from '@/lib/api';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) router.replace('/');
  }, [isAuthenticated, router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await apiLogin(username, password);
      login(data.token, data.user);
      router.push('/');
    } catch (err) {
      setError(err.message || 'Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#121111',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 800,
              background: 'linear-gradient(90deg, #8b5cf6, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: 8,
            }}
          >
            ✨ MagicGourmet
          </h1>
          <p style={{ color: '#6b7280', fontSize: 14 }}>Inicia sesión para continuar</p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            background: '#1e1d1d',
            border: '1px solid #3a3939',
            borderRadius: 16,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          {error && (
            <div style={{ background: '#2d1b1b', border: '1px solid #ef4444', borderRadius: 8, padding: '10px 14px', color: '#fca5a5', fontSize: 14 }}>
              {error}
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: 13, color: '#9ca3af', marginBottom: 6 }}>Usuario</label>
            <input
              className="form-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Tu nombre de usuario"
              autoComplete="username"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, color: '#9ca3af', marginBottom: 6 }}>Contraseña</label>
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? 'Entrando…' : 'Iniciar sesión'}
          </button>

          <p style={{ textAlign: 'center', fontSize: 13, color: '#6b7280' }}>
            ¿No tienes cuenta?{' '}
            <a href="/registro" style={{ color: '#8b5cf6', textDecoration: 'none' }}>
              Regístrate
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
