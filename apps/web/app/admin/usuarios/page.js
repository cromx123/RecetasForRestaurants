'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import AdminOnly from '@/components/AdminOnly';
import { getUsers, updateUser, deleteUser } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

// ── Paleta de Colores Gastronómica (Admin) ────────────────────
const theme = {
  bg: '#FDFBF7',
  textMain: '#2C2A29',
  textMuted: '#78716C',
  accent: '#D35400',
  accentLight: '#F3EFE6',
  border: '#E7E5E4',
  cardBg: '#FFFFFF',
  danger: '#9B2226',
};

// ── Íconos SVG ────────────────────────────────────────────────
const Icons = {
  Edit: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>,
  Trash: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
  Check: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>,
  X: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  Loader: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={theme.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>,
  User: () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={theme.textMuted} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
};

function AdminUsuariosContent() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editRole, setEditRole] = useState('');
  const { user: currentUser } = useAuth();

  useEffect(() => {
    getUsers().then(setUsers).catch(() => {}).finally(() => setLoading(false));
  }, []);

  async function handleRoleUpdate(id) {
    try {
      await updateUser(id, { role: editRole });
      setUsers((prev) => prev.map((u) => u.id === id ? { ...u, role: editRole } : u));
      setEditingId(null);
    } catch (err) {
      alert(err.message || 'Error al actualizar el rol.');
    }
  }

  async function handleDelete(id, username) {
    if (id === currentUser?.id) { alert('Operación denegada: No puedes eliminar tu propia cuenta de administrador.'); return; }
    if (!confirm(`¿Estás seguro de que deseas eliminar permanentemente al usuario "${username}"?`)) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      alert(err.message || 'Error al eliminar usuario.');
    }
  }

  return (
    <div style={{ background: theme.bg, minHeight: '100vh', fontFamily: '"Inter", "Helvetica Neue", sans-serif' }}>
      <Header title="Gestión de Usuarios" showBack />
      
      <main style={{ padding: '24px 16px', paddingBottom: 100, maxWidth: 600, margin: '0 auto' }}>
        
        {/* ── Cabecera ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: theme.textMain, margin: 0, fontFamily: '"Playfair Display", serif' }}>
            Directorio
          </h2>
          <span style={{ fontSize: 12, fontWeight: 600, color: theme.textMuted, background: theme.border, padding: '4px 10px', borderRadius: 12 }}>
            {users.length} {users.length === 1 ? 'registrado' : 'registrados'}
          </span>
        </div>

        {/* ── Estado de Carga ── */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '40px 20px', animation: 'pulse 1.5s infinite' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}><Icons.Loader /></div>
            <p style={{ color: theme.textMuted, fontSize: 14, fontStyle: 'italic' }}>Consultando base de datos...</p>
          </div>
        )}

        {!loading && users.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: theme.cardBg, borderRadius: 16, border: `1px dashed ${theme.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}><Icons.User /></div>
            <p style={{ color: theme.textMain, fontSize: 16, fontWeight: 600, margin: '0 0 8px' }}>Sin usuarios</p>
            <p style={{ color: theme.textMuted, fontSize: 14, margin: 0 }}>Aún no hay clientes registrados en la plataforma.</p>
          </div>
        )}

        {/* ── Lista de Usuarios ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {users.map((u) => (
            <div
              key={u.id}
              style={{
                background: theme.cardBg,
                border: `1px solid ${theme.border}`,
                borderRadius: 12,
                padding: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.01)',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: editingId === u.id ? 16 : 0 }}>
                
                {/* Info de Usuario */}
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: theme.textMain, margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    {u.username}
                    {u.id === currentUser?.id && (
                      <span style={{ fontSize: 10, fontWeight: 600, color: theme.accent, background: theme.accentLight, padding: '2px 6px', borderRadius: 6 }}>Tú</span>
                    )}
                  </p>
                  <p style={{ fontSize: 13, color: theme.textMuted, margin: '0 0 4px' }}>{u.email}</p>
                  <p style={{ fontSize: 11, color: theme.textMuted, opacity: 0.8, margin: 0 }}>
                    Registrado el {new Date(u.created_at).toLocaleDateString('es-CL')}
                  </p>
                </div>
                
                {/* Badge de Rol */}
                <span
                  style={{
                    padding: '4px 10px',
                    borderRadius: 12,
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    background: u.role === 'Administrador' ? '#2C2A29' : theme.accentLight,
                    color: u.role === 'Administrador' ? '#FFFFFF' : theme.accent,
                  }}
                >
                  {u.role}
                </span>
              </div>

              {/* ── Controles de Edición de Rol ── */}
              {editingId === u.id ? (
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', background: theme.bg, padding: '8px', borderRadius: 8, border: `1px solid ${theme.border}` }}>
                  <select
                    className="form-input"
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    style={{ flex: 1, padding: '8px 12px', appearance: 'auto' }}
                  >
                    <option value="Cliente">Cliente</option>
                    <option value="Administrador">Administrador</option>
                  </select>
                  <button
                    onClick={() => handleRoleUpdate(u.id)}
                    style={{ background: theme.accent, border: 'none', borderRadius: 8, padding: '10px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    title="Guardar rol"
                  >
                    <Icons.Check />
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: 8, padding: '10px', color: theme.textMuted, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    title="Cancelar"
                  >
                    <Icons.X />
                  </button>
                </div>
              ) : (
                /* ── Botones de Acción ── */
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12, paddingTop: 12, borderTop: `1px dashed ${theme.border}` }}>
                  <button
                    className="btn-secondary"
                    onClick={() => { setEditingId(u.id); setEditRole(u.role); }}
                    style={{ padding: '8px 12px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}
                  >
                    <Icons.Edit /> Rol
                  </button>
                  {u.id !== currentUser?.id && (
                    <button 
                      className="btn-danger" 
                      onClick={() => handleDelete(u.id, u.username)}
                      style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      title="Eliminar usuario"
                    >
                      <Icons.Trash />
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}} />
      <BottomNav />
    </div>
  );
}

export default function AdminUsuariosPage() {
  return <AdminOnly><AdminUsuariosContent /></AdminOnly>;
}