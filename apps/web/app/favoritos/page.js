'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { getReservations, createReservation, cancelReservation, getRestaurantConfig } from '@/lib/api';

// ── Paleta de Colores Gastronómica ────────────────────────────
const theme = {
  bg: '#FDFBF7',
  textMain: '#2C2A29',
  textMuted: '#78716C',
  accent: '#D35400',
  accentLight: '#F3EFE6',
  border: '#E7E5E4',
  cardBg: '#FFFFFF',
  danger: '#9B2226',
  dangerBg: '#FDF3F3',
  success: '#2E5C31',
  successBg: '#F0F5F1',
  warningBg: '#FFF9F0',
  warningText: '#B45309',
  warningBorder: '#FDE6C8'
};

// ── Constantes ────────────────────────────────────────────────
const DAY_NAMES  = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const DAY_SHORT  = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MONTHS_ES  = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio',
                    'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

// ── Helpers ───────────────────────────────────────────────────
function parseDateLocal(dateStr) {
  const [y, m, d] = String(dateStr).slice(0, 10).split('-').map(Number);
  return new Date(y, m - 1, d);
}

function formatDateES(dateStr) {
  if (!dateStr) return '';
  const date = parseDateLocal(dateStr);
  const [y, m, d] = String(dateStr).slice(0, 10).split('-').map(Number);
  return `${DAY_NAMES[date.getDay()]} ${d} de ${MONTHS_ES[m - 1]} de ${y}`;
}

function getMinDate() {
  const t = new Date();
  t.setDate(t.getDate() + 1);
  return t.toISOString().split('T')[0];
}

function timeToMins(t) {
  const [h, m] = String(t).slice(0, 5).split(':').map(Number);
  return h * 60 + m;
}

function minsToTime(m) {
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
}

function generateSlots(dayConfig, durationMins) {
  if (!dayConfig || dayConfig.closed) return [];
  const open  = timeToMins(dayConfig.open);
  const close = timeToMins(dayConfig.close);
  const last  = close - durationMins;
  const slots = [];
  for (let m = open; m <= last; m += 30) slots.push(minsToTime(m));
  return slots;
}

function getDayConfig(schedule, dateStr) {
  if (!schedule || !dateStr) return null;
  const dayNum = parseDateLocal(dateStr).getDay();
  return schedule[dayNum] ?? schedule[String(dayNum)] ?? null;
}

function durationLabel(mins) {
  if (mins === 60)  return '1 hora';
  if (mins === 90)  return '1h 30min';
  if (mins === 120) return '2 horas';
  if (mins === 180) return '3 horas';
  return `${mins} min`;
}

function isWeekend(dateStr) {
  if (!dateStr) return false;
  const day = parseDateLocal(dateStr).getDay();
  return day === 0 || day === 6;
}

function isUpcoming(r) {
  return new Date(`${r.reservation_date}T${r.reservation_time}`) > new Date() && r.status === 'confirmada';
}

// ── Íconos SVG ────────────────────────────────────────────────
const Icons = {
  Clock: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
  Calendar: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
  Info: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>,
  Users: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
  Check: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>,
  List: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
};

// ── Componente principal ───────────────────────────────────────
function ReservasContent() {
  const { user } = useAuth();

  // Config del restaurante
  const [config,     setConfig]     = useState(null);
  const [loadCfg,    setLoadCfg]    = useState(true);

  // Form
  const [duration,   setDuration]   = useState(null);
  const [date,       setDate]       = useState('');
  const [time,       setTime]       = useState('');
  const [guests,     setGuests]     = useState(2);
  const [notes,      setNotes]      = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError,  setFormError]  = useState('');
  const [formOk,     setFormOk]     = useState('');

  // Lista
  const [reservations, setReservations] = useState([]);
  const [loadingList,  setLoadingList]  = useState(true);

  useEffect(() => {
    getRestaurantConfig()
      .then((cfg) => {
        const sched = {};
        if (cfg.schedule) {
          for (const [k, v] of Object.entries(cfg.schedule)) sched[parseInt(k)] = v;
          cfg.schedule = sched;
        }
        setConfig(cfg);
        if (cfg.durations?.length) setDuration(cfg.durations[0]);
      })
      .catch(() => {})
      .finally(() => setLoadCfg(false));

    loadList();
  }, []);

  function loadList() {
    setLoadingList(true);
    getReservations()
      .then(setReservations)
      .catch(() => setReservations([]))
      .finally(() => setLoadingList(false));
  }

  const dayConfig = getDayConfig(config?.schedule, date);
  const slots     = duration && dayConfig ? generateSlots(dayConfig, duration) : [];
  const isClosed  = date ? (dayConfig ? dayConfig.closed : true) : false;
  const weekend   = isWeekend(date);
  const graceMins = weekend ? 15 : 30;

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError(''); setFormOk('');

    if (!duration) return setFormError('Selecciona la duración de tu estadía.');
    if (!date)     return setFormError('Selecciona una fecha.');
    if (isClosed)  return setFormError('El restaurante se encuentra cerrado ese día.');
    if (!time)     return setFormError('Selecciona un horario disponible.');

    setSubmitting(true);
    try {
      await createReservation({ reservation_date: date, reservation_time: time, duration, guests, notes });
      setFormOk(`Reserva confirmada. Hemos enviado los detalles a ${user?.email || 'tu correo'}.`);
      setDate(''); setTime(''); setGuests(2); setNotes('');
      loadList();
    } catch (err) {
      setFormError(err.message || 'Lo sentimos, no se pudo completar la reserva.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCancel(id) {
    if (!confirm('¿Estás seguro de que deseas cancelar esta reserva?')) return;
    try {
      await cancelReservation(id);
      setReservations((prev) => prev.map((r) => r.id === id ? { ...r, status: 'cancelada' } : r));
    } catch (err) {
      alert(err.message || 'Hubo un problema al cancelar.');
    }
  }

  const upcoming   = reservations.filter(isUpcoming);
  const historical = reservations.filter((r) => !isUpcoming(r));

  return (
    <div style={{ background: theme.bg, minHeight: '100vh', fontFamily: '"Inter", "Helvetica Neue", sans-serif', color: theme.textMain }}>
      <Header title="Reservar Mesa" />

      <main style={{ padding: '24px 16px', paddingBottom: 100, maxWidth: 560, margin: '0 auto' }}>

        {/* ── Horario del restaurante ── */}
        {!loadCfg && config?.schedule && (
          <ScheduleDisplay schedule={config.schedule} />
        )}

        {/* ── Política de tolerancia ── */}
        <PolicyBanner date={date} graceMins={graceMins} weekend={weekend} />

        {/* ── Formulario ── */}
        <section style={styles.card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, borderBottom: `1px solid ${theme.border}`, paddingBottom: 12 }}>
            <span style={{ color: theme.accent }}><Icons.Calendar /></span>
            <h2 style={styles.sectionTitle}>Planifica tu Visita</h2>
          </div>

          <form onSubmit={handleSubmit}>
            {/* 1. Duración */}
            {!loadCfg && config?.durations?.length > 0 && (
              <Field label="Experiencia (Duración estimada)">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {config.durations.map((d) => {
                    const active = duration === d;
                    return (
                      <button
                        type="button"
                        key={d}
                        onClick={() => { setDuration(d); setTime(''); }}
                        style={{
                          padding: '10px 18px',
                          borderRadius: 24,
                          border: `1px solid ${active ? theme.accent : theme.border}`,
                          background:  active ? theme.accent : theme.cardBg,
                          color:       active ? '#FFFFFF' : theme.textMain,
                          fontSize: 13,
                          fontWeight: active ? 600 : 500,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          boxShadow: active ? '0 4px 12px rgba(211, 84, 0, 0.2)' : 'none'
                        }}
                      >
                        <Icons.Clock /> {durationLabel(d)}
                      </button>
                    );
                  })}
                </div>
                {duration && (
                  <p style={styles.hint}>
                    Tu mesa estará garantizada y exclusiva durante <strong style={{ color: theme.accent }}>{durationLabel(duration)}</strong>.
                  </p>
                )}
              </Field>
            )}

            {/* 2. Fecha */}
            <Field label="Fecha de la reserva">
              <input
                type="date"
                value={date}
                min={getMinDate()}
                onChange={(e) => { setDate(e.target.value); setTime(''); }}
                style={styles.inputStyle}
              />
              {date && !isClosed && (
                <p style={styles.hint}>
                  <strong style={{ color: theme.textMain }}>{formatDateES(date)}</strong> · {weekend ? 'Fin de semana' : 'Día de semana'}
                </p>
              )}
              {date && isClosed && (
                <p style={{ ...styles.hint, color: theme.danger }}>
                  Nuestras cocinas descansan este día. Por favor, selecciona otra fecha.
                </p>
              )}
            </Field>

            {/* 3. Horarios dinámicos */}
            {date && !isClosed && duration && (
              <Field label="Horarios disponibles">
                {slots.length === 0 ? (
                  <p style={{ ...styles.hint, color: theme.danger }}>
                    No contamos con disponibilidad para esta duración en la fecha seleccionada.
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {slots.map((t) => {
                      const active = time === t;
                      return (
                        <button
                          type="button"
                          key={t}
                          onClick={() => setTime(t)}
                          style={{
                            padding: '10px 16px',
                            borderRadius: 8,
                            border: `1px solid ${active ? theme.accent : theme.border}`,
                            background:  active ? theme.accentLight : theme.cardBg,
                            color:       active ? theme.accent : theme.textMain,
                            fontSize: 14,
                            fontWeight: active ? 700 : 500,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            flex: '1 0 calc(25% - 10px)', // Layout más ordenado tipo grilla
                            textAlign: 'center'
                          }}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                )}
                {time && duration && (
                  <p style={styles.hint}>
                    Recepción a las <strong style={{ color: theme.accent }}>{time}</strong>. Disfrute su velada hasta las{' '}
                    <strong style={{ color: theme.accent }}>{minsToTime(timeToMins(time) + duration)}</strong>.
                  </p>
                )}
              </Field>
            )}

            {/* 4. Personas */}
            <Field label="Número de comensales">
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: theme.bg, padding: '4px', borderRadius: 24, border: `1px solid ${theme.border}` }}>
                  <CounterBtn onClick={() => setGuests((g) => Math.max(1, g - 1))}>−</CounterBtn>
                  <span style={{ color: theme.textMain, fontSize: 18, fontWeight: 700, minWidth: 28, textAlign: 'center', fontFamily: '"Playfair Display", serif' }}>
                    {guests}
                  </span>
                  <CounterBtn onClick={() => setGuests((g) => Math.min(8, g + 1))}>+</CounterBtn>
                </div>
                <span style={{ color: theme.textMuted, fontSize: 13, lineHeight: 1.4 }}>
                  {guests === 1 ? 'Mesa individual' : `Mesa para ${guests <= 2 ? 2 : guests <= 4 ? 4 : 8} personas`}
                </span>
              </div>
            </Field>

            {/* 5. Notas */}
            <Field label="Peticiones especiales (opcional)">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Alergias, aniversarios, preferencia de terraza..."
                maxLength={200}
                rows={2}
                style={{ ...styles.inputStyle, resize: 'none' }}
              />
            </Field>

            {formError && <Alert type="error">{formError}</Alert>}
            {formOk    && <Alert type="ok">{formOk}</Alert>}

            <button
              type="submit"
              disabled={submitting || !date || !time || !duration || isClosed}
              style={{
                width: '100%', padding: '16px', marginTop: 8,
                borderRadius: 12, border: 'none',
                background: submitting || !date || !time || !duration || isClosed
                  ? theme.textMuted
                  : theme.accent,
                color: 'white',
                fontSize: 16, fontWeight: 600,
                cursor: submitting || !date || !time || !duration || isClosed ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
                letterSpacing: '0.5px',
                boxShadow: submitting || !date || !time || !duration || isClosed ? 'none' : '0 4px 14px rgba(211, 84, 0, 0.25)'
              }}
            >
              {submitting ? 'Procesando reserva...' : 'Solicitar Reserva'}
            </button>
          </form>
        </section>

        {/* ── Reservas próximas ── */}
        {!loadingList && upcoming.length > 0 && (
          <section style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span style={{ color: theme.textMain }}><Icons.List /></span>
              <h3 style={{ ...styles.sectionTitle, margin: 0 }}>Mis Próximas Visitas</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {upcoming.map((r) => <ReservationCard key={r.id} reservation={r} onCancel={handleCancel} />)}
            </div>
          </section>
        )}

        {/* ── Historial ── */}
        {!loadingList && historical.length > 0 && (
          <section>
            <h3 style={{ color: theme.textMuted, fontSize: 13, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 12, fontWeight: 600 }}>
              Historial de Visitas
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {historical.map((r) => <ReservationCard key={r.id} reservation={r} past />)}
            </div>
          </section>
        )}

        {loadingList && (
          <p style={{ color: theme.textMuted, fontSize: 14, textAlign: 'center', marginTop: 32, fontStyle: 'italic' }}>
            Consultando libro de reservas...
          </p>
        )}
      </main>

      <BottomNav />
    </div>
  );
}

// ── Sub-componentes ───────────────────────────────────────────

function ScheduleDisplay({ schedule }) {
  return (
    <div style={{
      background: theme.cardBg,
      border: `1px solid ${theme.border}`,
      borderRadius: 12,
      padding: '20px',
      marginBottom: 24,
      boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
    }}>
      <p style={{ color: theme.textMain, fontSize: 13, fontWeight: 700, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8, textTransform: 'uppercase', letterSpacing: '1px' }}>
        <Icons.Clock /> Horario de Atención
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px' }}>
        {[0, 1, 2, 3, 4, 5, 6].map((dayNum) => {
          const cfg = schedule[dayNum];
          if (!cfg) return null;
          return (
            <div key={dayNum} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px dashed ${theme.border}`, paddingBottom: 6 }}>
              <span style={{ color: theme.textMuted, fontSize: 13, fontWeight: 500 }}>{DAY_NAMES[dayNum]}</span>
              <span style={{
                fontSize: 13,
                fontWeight: 600,
                color: cfg.closed ? theme.danger : theme.textMain,
              }}>
                {cfg.closed ? 'Cerrado' : `${cfg.open} – ${cfg.close}`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PolicyBanner({ date, graceMins, weekend }) {
  return (
    <div style={{
      background: theme.warningBg, border: `1px solid ${theme.warningBorder}`,
      borderRadius: 12, padding: '16px', marginBottom: 24,
      display: 'flex', gap: 12, alignItems: 'flex-start',
    }}>
      <span style={{ color: theme.warningText, marginTop: 2 }}><Icons.Info /></span>
      <div>
        <p style={{ color: theme.warningText, fontSize: 14, fontWeight: 700, margin: '0 0 6px', letterSpacing: '0.3px' }}>
          Política de Cortesía
        </p>
        {date ? (
          <p style={{ color: theme.textMain, fontSize: 13, margin: '0 0 6px', lineHeight: 1.5 }}>
            Su reserva corresponde a un <strong>{weekend ? 'fin de semana' : 'día de semana'}</strong>. Mantenemos la mesa durante{' '}
            <strong style={{ color: theme.warningText }}>{graceMins} minutos</strong> desde la hora pactada.
          </p>
        ) : (
          <p style={{ color: theme.textMain, fontSize: 13, margin: '0 0 6px', lineHeight: 1.5 }}>
            Tiempo de gracia: <strong>30 min</strong> (Lunes a Viernes) y <strong>15 min</strong> (Fines de semana).
          </p>
        )}
        <p style={{ color: theme.textMuted, fontSize: 12, margin: 0, lineHeight: 1.5, fontStyle: 'italic' }}>
          Transcurrido este margen, la reserva quedará sujeta a disponibilidad de sala.
        </p>
      </div>
    </div>
  );
}

function ReservationCard({ reservation: r, onCancel, past = false }) {
  const weekend  = isWeekend(r.reservation_date);
  const grace    = weekend ? 15 : 30;
  const endTime  = r.duration ? minsToTime(timeToMins(r.reservation_time) + parseInt(r.duration)) : null;

  return (
    <div style={{
      background: theme.cardBg,
      border: `1px solid ${past ? theme.border : theme.accent}40`,
      borderRadius: 16, padding: '20px',
      opacity: past ? 0.7 : 1,
      boxShadow: past ? 'none' : '0 4px 12px rgba(211, 84, 0, 0.05)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Detalle visual sutil en el borde izquierdo para reservas activas */}
      {!past && r.status === 'confirmada' && (
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: theme.accent }} />
      )}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <p style={{ color: theme.textMain, fontWeight: 700, fontSize: 16, margin: '0 0 8px', fontFamily: '"Playfair Display", serif' }}>
            {formatDateES(r.reservation_date)}
          </p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
            <p style={{ display: 'flex', alignItems: 'center', gap: 6, color: theme.textMuted, fontSize: 13, margin: 0 }}>
              <Icons.Clock /> <span style={{ color: theme.textMain, fontWeight: 600 }}>{r.reservation_time}</span>
              {endTime && ` – ${endTime}`}
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: 6, color: theme.textMuted, fontSize: 13, margin: 0 }}>
              <Icons.Users /> <span style={{ color: theme.textMain, fontWeight: 600 }}>{r.guests}</span> comensales
            </p>
          </div>

          {r.notes && (
            <p style={{ color: theme.textMuted, fontSize: 13, margin: '8px 0 0', padding: '8px 12px', background: theme.bg, borderRadius: 8, fontStyle: 'italic', borderLeft: `2px solid ${theme.border}` }}>
              "{r.notes}"
            </p>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12, flexShrink: 0 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.5px',
            background: r.status === 'cancelada' ? theme.dangerBg : (past ? theme.bg : theme.successBg),
            color:      r.status === 'cancelada' ? theme.danger : (past ? theme.textMuted : theme.success),
            border:     `1px solid ${r.status === 'cancelada' ? theme.danger : (past ? theme.border : theme.success)}40`,
          }}>
            {r.status === 'cancelada' ? 'Cancelada' : (past ? 'Completada' : 'Confirmada')}
          </span>

          {!past && r.status === 'confirmada' && (
            <button
              onClick={() => onCancel(r.id)}
              style={{
                background: 'none', border: 'none', textDecoration: 'underline',
                color: theme.textMuted, fontSize: 12, cursor: 'pointer', padding: 0
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = theme.danger}
              onMouseLeave={(e) => e.currentTarget.style.color = theme.textMuted}
            >
              Cancelar reserva
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <label style={{ display: 'block', color: theme.textMain, fontSize: 13, fontWeight: 700, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function CounterBtn({ onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: 36, height: 36, borderRadius: '50%',
        border: 'none', background: theme.cardBg,
        color: theme.textMain, fontSize: 18, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        transition: 'transform 0.1s'
      }}
      onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
      onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      {children}
    </button>
  );
}

function Alert({ type, children }) {
  const ok = type === 'ok';
  return (
    <div style={{
      background: ok ? theme.successBg : theme.dangerBg,
      border: `1px solid ${ok ? theme.success : theme.danger}40`,
      borderRadius: 12, padding: '14px 16px', marginBottom: 20,
      display: 'flex', alignItems: 'center', gap: 10
    }}>
      <span style={{ color: ok ? theme.success : theme.danger }}>
        {ok ? <Icons.Check /> : <Icons.Info />}
      </span>
      <p style={{ color: ok ? theme.success : theme.danger, fontSize: 14, fontWeight: 500, margin: 0, lineHeight: 1.4 }}>
        {children}
      </p>
    </div>
  );
}

// ── Estilos ────────────────────────────────────────────────────
const styles = {
  card: {
    background: theme.cardBg, 
    border: `1px solid ${theme.border}`,
    borderRadius: 16, 
    padding: '24px 20px', 
    marginBottom: 32,
    boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
  },
  sectionTitle: {
    color: theme.textMain, 
    fontSize: 18, 
    fontWeight: 800, 
    margin: 0,
    fontFamily: '"Playfair Display", serif',
    letterSpacing: '-0.3px'
  },
  inputStyle: {
    width: '100%', 
    background: theme.cardBg,
    border: `1px solid ${theme.border}`, 
    borderRadius: 8,
    padding: '12px 14px', 
    color: theme.textMain,
    fontSize: 15, 
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  },
  hint: { 
    color: theme.textMuted, 
    fontSize: 12, 
    marginTop: 8, 
    marginBottom: 0,
    lineHeight: 1.4
  }
};

// ── Export ─────────────────────────────────────────────────────
export default function ReservasPage() {
  return <ProtectedRoute><ReservasContent /></ProtectedRoute>;
}