'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import AdminOnly from '@/components/AdminOnly';
import { getRestaurantConfig, updateRestaurantConfig } from '@/lib/api';

// ── Constantes ────────────────────────────────────────────────
const DAY_NAMES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

const ALL_DURATIONS = [
  { value: 60,  label: '1 hora' },
  { value: 90,  label: '1 hora 30 min' },
  { value: 120, label: '2 horas' },
  { value: 180, label: '3 horas' },
];

const DEFAULT_SCHEDULE = Object.fromEntries(
  [0, 1, 2, 3, 4, 5, 6].map((d) => [
    d,
    { open: '13:00', close: '22:30', closed: d === 1 },
  ])
);

// ── Paleta de Colores Gastronómica (Admin) ────────────────────
const theme = {
  bg: '#FDFBF7', // Crema cálido
  textMain: '#2C2A29', // Carbón
  textMuted: '#78716C', // Gris piedra
  accent: '#D35400', // Terracota
  accentLight: '#F3EFE6', // Crema oscuro para fondos activos
  border: '#E7E5E4',
  cardBg: '#FFFFFF',
  danger: '#9B2226', // Burdeos para errores/cerrado
  dangerBg: '#FDF3F3',
  success: '#2E5C31', // Verde salvia para éxito
  successBg: '#F0F5F1'
};

// ── Componente ────────────────────────────────────────────────
function AdminReservasContent() {
  const [schedule,  setSchedule]  = useState(DEFAULT_SCHEDULE);
  const [durations, setDurations] = useState([60, 90, 120]);
  const [loading,   setLoading]   = useState(true);
  const [saving,    setSaving]    = useState(false);
  const [msg,       setMsg]       = useState({ type: '', text: '' });

  useEffect(() => {
    getRestaurantConfig()
      .then((cfg) => {
        if (cfg.schedule) {
          const normalized = {};
          for (const [k, v] of Object.entries(cfg.schedule)) normalized[parseInt(k)] = v;
          setSchedule(normalized);
        }
        if (cfg.durations) setDurations(cfg.durations.map(Number));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function setDayField(dayNum, field, value) {
    setSchedule((prev) => ({
      ...prev,
      [dayNum]: { ...prev[dayNum], [field]: value },
    }));
  }

  function toggleDuration(val) {
    setDurations((prev) =>
      prev.includes(val) ? prev.filter((d) => d !== val) : [...prev, val].sort((a, b) => a - b)
    );
  }

  async function handleSave() {
    if (durations.length === 0) {
      return setMsg({ type: 'error', text: 'Debes seleccionar al menos una duración de reserva.' });
    }

    setSaving(true);
    setMsg({ type: '', text: '' });
    try {
      await updateRestaurantConfig({ schedule, durations });
      setMsg({ type: 'ok', text: 'Configuración guardada correctamente.' });
    } catch (err) {
      setMsg({ type: 'error', text: err.message || 'Error al guardar la configuración.' });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ background: theme.bg, minHeight: '100vh', fontFamily: '"Inter", "Helvetica Neue", sans-serif', color: theme.textMain }}>
      <Header title="Configuración de Reservas" showBack />

      <main style={{ padding: '24px 16px', paddingBottom: 100, maxWidth: 560, margin: '0 auto' }}>

        {loading ? (
          <p style={{ color: theme.textMuted, textAlign: 'center', padding: 40, fontStyle: 'italic' }}>Cargando configuración…</p>
        ) : (
          <>
            {/* ── Horario por día ── */}
            <section style={styles.card}>
              <h2 style={styles.sectionTitle}>Horario del Restaurante</h2>
              <p style={styles.hint}>Define los horarios de apertura y cierre. Los días marcados como cerrados no aceptarán reservas.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20 }}>
                {[0, 1, 2, 3, 4, 5, 6].map((dayNum) => {
                  const cfg = schedule[dayNum] || { open: '13:00', close: '22:30', closed: false };
                  return (
                    <div
                      key={dayNum}
                      style={{
                        background: cfg.closed ? theme.bg : theme.cardBg,
                        border: `1px solid ${theme.border}`,
                        borderRadius: 12,
                        padding: '16px',
                        opacity: cfg.closed ? 0.7 : 1,
                        transition: 'all 0.2s ease',
                        boxShadow: cfg.closed ? 'none' : '0 2px 6px rgba(0,0,0,0.02)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: cfg.closed ? 0 : 16 }}>
                        {/* Toggle cerrado */}
                        <label style={{
                          display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', flex: 1,
                        }}>
                          <div
                            onClick={() => setDayField(dayNum, 'closed', !cfg.closed)}
                            style={{
                              width: 44, height: 24, borderRadius: 12,
                              background: cfg.closed ? theme.border : theme.accent,
                              position: 'relative', cursor: 'pointer', transition: 'background 0.2s',
                              flexShrink: 0,
                            }}
                          >
                            <div style={{
                              position: 'absolute',
                              top: 2, left: cfg.closed ? 2 : 22,
                              width: 20, height: 20, borderRadius: '50%',
                              background: 'white', transition: 'left 0.2s ease',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }} />
                          </div>
                          <span style={{ color: theme.textMain, fontWeight: 600, fontSize: 15 }}>
                            {DAY_NAMES[dayNum]}
                          </span>
                          {cfg.closed && (
                            <span style={{
                              marginLeft: 'auto',
                              fontSize: 11, color: theme.danger,
                              background: theme.dangerBg, border: `1px solid ${theme.danger}40`,
                              borderRadius: 20, padding: '4px 10px', fontWeight: 700,
                              textTransform: 'uppercase', letterSpacing: '0.5px'
                            }}>
                              Cerrado
                            </span>
                          )}
                        </label>
                      </div>

                      {/* Horarios (sólo si está abierto) */}
                      {!cfg.closed && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                          <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', color: theme.textMuted, fontSize: 11, marginBottom: 6, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                              Apertura
                            </label>
                            <input
                              type="time"
                              value={cfg.open}
                              onChange={(e) => setDayField(dayNum, 'open', e.target.value)}
                              style={styles.timeInput}
                            />
                          </div>
                          <span style={{ color: theme.border, fontSize: 16, marginTop: 22 }}>—</span>
                          <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', color: theme.textMuted, fontSize: 11, marginBottom: 6, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                              Cierre
                            </label>
                            <input
                              type="time"
                              value={cfg.close}
                              onChange={(e) => setDayField(dayNum, 'close', e.target.value)}
                              style={styles.timeInput}
                            />
                          </div>
                          <div style={{ flex: 1, textAlign: 'right' }}>
                            <label style={{ display: 'block', color: theme.textMuted, fontSize: 11, marginBottom: 6, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                              Total horas
                            </label>
                            <p style={{ color: theme.accent, fontSize: 14, fontWeight: 700, margin: 0, paddingTop: 10 }}>
                              {(() => {
                                const [oh, om] = cfg.open.split(':').map(Number);
                                const [ch, cm] = cfg.close.split(':').map(Number);
                                const diff = (ch * 60 + cm) - (oh * 60 + om);
                                return diff > 0 ? `${Math.floor(diff / 60)}h ${diff % 60 > 0 ? `${diff % 60}m` : ''}` : '—';
                              })()}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ── Duraciones disponibles ── */}
            <section style={styles.card}>
              <h2 style={styles.sectionTitle}>Duración de Mesas</h2>
              <p style={styles.hint}>
                Selecciona los bloques de tiempo que los clientes podrán elegir al hacer su reserva online.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20 }}>
                {ALL_DURATIONS.map(({ value, label }) => {
                  const active = durations.includes(value);
                  return (
                    <label
                      key={value}
                      onClick={() => toggleDuration(value)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                        padding: '16px',
                        borderRadius: 12,
                        border: `1px solid ${active ? theme.accent : theme.border}`,
                        background: active ? theme.accentLight : theme.cardBg,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {/* Checkbox visual minimalista */}
                      <div style={{
                        width: 22, height: 22, borderRadius: 6,
                        border: `2px solid ${active ? theme.accent : theme.border}`,
                        background: active ? theme.accent : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, transition: 'all 0.2s ease',
                      }}>
                        {active && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <p style={{ color: theme.textMain, fontWeight: 600, fontSize: 15, margin: 0 }}>
                          {label}
                        </p>
                        <p style={{ color: theme.textMuted, fontSize: 12, margin: '4px 0 0' }}>
                          Bloque de {value} minutos
                        </p>
                      </div>
                      
                      {active && (
                        <span style={{
                          fontSize: 11, color: theme.accent, fontWeight: 700,
                          background: 'rgba(211, 84, 0, 0.1)', borderRadius: 20, padding: '4px 10px',
                        }}>
                          Activa
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>

              {durations.length === 0 && (
                <p style={{ color: theme.danger, fontSize: 13, marginTop: 12, fontWeight: 500, padding: '10px', background: theme.dangerBg, borderRadius: 8 }}>
                  Requiere selección: Debes habilitar al menos un bloque de tiempo.
                </p>
              )}
            </section>

            {/* ── Feedback + Guardar ── */}
            {msg.text && (
              <div style={{
                background: msg.type === 'ok' ? theme.successBg : theme.dangerBg,
                border: `1px solid ${msg.type === 'ok' ? `${theme.success}40` : `${theme.danger}40`}`,
                borderRadius: 12, padding: '14px 16px', marginBottom: 20,
                display: 'flex', alignItems: 'center', gap: 10
              }}>
                {msg.type === 'ok' ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.success} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.danger} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                )}
                <p style={{ color: msg.type === 'ok' ? theme.success : theme.danger, fontSize: 14, fontWeight: 500, margin: 0 }}>
                  {msg.text}
                </p>
              </div>
            )}

            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                width: '100%', padding: '16px',
                borderRadius: 12, border: 'none',
                background: saving ? theme.textMuted : theme.accent,
                color: 'white',
                fontSize: 16, fontWeight: 600,
                cursor: saving ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
                boxShadow: saving ? 'none' : '0 4px 12px rgba(211, 84, 0, 0.2)',
                letterSpacing: '0.5px'
              }}
            >
              {saving ? 'Guardando cambios…' : 'Guardar Configuración'}
            </button>
          </>
        )}
      </main>
      <BottomNav />
    </div>
  );
}

// ── Estilos (Actualizados) ─────────────────────────────────────
const styles = {
  card: {
    background: theme.cardBg,
    border: `1px solid ${theme.border}`,
    borderRadius: 16,
    padding: '24px 20px',
    marginBottom: 24,
    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
  },
  sectionTitle: {
    color: theme.textMain,
    fontSize: 16,
    fontWeight: 700,
    margin: '0 0 6px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  hint: {
    color: theme.textMuted,
    fontSize: 13,
    margin: 0,
    lineHeight: 1.5,
  },
  timeInput: {
    width: '100%',
    background: theme.bg,
    border: `1px solid ${theme.border}`,
    borderRadius: 8,
    padding: '10px 12px',
    color: theme.textMain,
    fontSize: 15,
    fontWeight: 500,
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    // colorScheme eliminado para que use el default (claro) del navegador
  },
};

// ── Export ─────────────────────────────────────────────────────
export default function AdminReservasPage() {
  return <AdminOnly><AdminReservasContent /></AdminOnly>;
}