'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import AdminOnly from '@/components/AdminOnly';
import { getUsers, updateUser, deleteUser } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

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
      alert(err.message);
    }
  }

  async function handleDelete(id, username) {
    if (id === currentUser?.id) { alert('No puedes eliminarte a ti mismo'); return; }
    if (!confirm(`¿Eliminar al usuario "${username}"?`)) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div style={{ background: '#121111', minHeight: '100vh' }}>
      <Header title="Usuarios" showBack />
      <main style={{ padding: 16, paddingBottom: 80 }}>
        <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 16 }}>{users.length} usuarios registrados</p>
        {loading && <p style={{ color: '#6b7280', textAlign: 'center', padding: 20 }}>Cargando…</p>}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {users.map((u) => (
            <div
              key={u.id}
              style={{
                background: '#1e1d1d',
                border: '1px solid #3a3939',
                borderRadius: 12,
                padding: '14px 16px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: 'white' }}>{u.username}</p>
                  <p style={{ fontSize: 12, color: '#6b7280' }}>{u.email}</p>
                  <p style={{ fontSize: 11, color: '#4b5563', marginTop: 2 }}>
                    {new Date(u.created_at).toLocaleDateString('es')}
                  </p>
                </div>
                <span
                  style={{
                    padding: '3px 10px',
                    borderRadius: 12,
                    fontSize: 11,
                    background: u.role === 'Administrador' ? '#3b2f6e' : '#1f2a1f',
                    color: u.role === 'Administrador' ? '#a78bfa' : '#86efac',
                    border: `1px solid ${u.role === 'Administrador' ? '#8b5cf6' : '#22c55e'}`,
                  }}
                >
                  {u.role}
                </span>
              </div>

              {editingId === u.id ? (
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <select
                    className="form-input"
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    style={{ flex: 1, padding: '6px 10px' }}
                  >
                    <option value="Cliente">Cliente</option>
                    <option value="Administrador">Administrador</option>
                  </select>
                  <button
                    onClick={() => handleRoleUpdate(u.id)}
                    style={{ background: '#8b5cf6', border: 'none', borderRadius: 8, padding: '6px 14px', color: 'white', cursor: 'pointer', fontSize: 13 }}
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    style={{ background: '#2a2929', border: '1px solid #3a3939', borderRadius: 8, padding: '6px 12px', color: 'white', cursor: 'pointer', fontSize: 13 }}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => { setEditingId(u.id); setEditRole(u.role); }}
                    style={{ background: '#2a2929', border: '1px solid #3a3939', borderRadius: 8, padding: '6px 12px', color: '#a78bfa', cursor: 'pointer', fontSize: 13 }}
                  >
                    Cambiar rol
                  </button>
                  {u.id !== currentUser?.id && (
                    <button className="btn-danger" onClick={() => handleDelete(u.id, u.username)}>
                      Eliminar
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

export default function AdminUsuariosPage() {
  return <AdminOnly><AdminUsuariosContent /></AdminOnly>;
}
