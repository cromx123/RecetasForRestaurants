'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register as apiRegister } from '@/lib/api';

export default function RegistroPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (password !== confirm) { setError('Las contraseñas no coinciden'); return; }
    if (password.length < 4) { setError('La contraseña debe tener al menos 4 caracteres'); return; }

    setLoading(true);
    try {
      await apiRegister(username, email, password);
      setSuccess(true);
      setTimeout(() => router.push('/login'), 2000);
    } catch (err) {
      setError(err.message);
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
          <p style={{ color: '#6b7280', fontSize: 14 }}>Crea tu cuenta gratis</p>
        </div>

        {success ? (
          <div
            style={{
              background: '#1a2e1a',
              border: '1px solid #22c55e',
              borderRadius: 16,
              padding: 24,
              textAlign: 'center',
              color: '#86efac',
            }}
          >
            <p style={{ fontSize: 20 }}>✓</p>
            <p>Cuenta creada. Redirigiendo al login…</p>
          </div>
        ) : (
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
              <input className="form-input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nombre de usuario" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#9ca3af', marginBottom: 6 }}>Correo electrónico</label>
              <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#9ca3af', marginBottom: 6 }}>Contraseña</label>
              <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 4 caracteres" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#9ca3af', marginBottom: 6 }}>Confirmar contraseña</label>
              <input className="form-input" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Repite la contraseña" />
            </div>

            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? 'Creando cuenta…' : 'Registrarse'}
            </button>

            <p style={{ textAlign: 'center', fontSize: 13, color: '#6b7280' }}>
              ¿Ya tienes cuenta?{' '}
              <a href="/login" style={{ color: '#8b5cf6', textDecoration: 'none' }}>
                Inicia sesión
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
