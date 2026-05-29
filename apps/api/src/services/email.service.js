const nodemailer = require('nodemailer');
const { smtp, restaurant } = require('../config/env');

const DAYS_ES   = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const MONTHS_ES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio',
                   'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

function formatDateES(dateStr) {
  const [y, m, d] = String(dateStr).slice(0, 10).split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return `${DAYS_ES[date.getDay()]} ${d} de ${MONTHS_ES[m - 1]} de ${y}`;
}

function getGraceInfo(dateStr) {
  const [y, m, d] = String(dateStr).slice(0, 10).split('-').map(Number);
  const day = new Date(y, m - 1, d).getDay();
  const isWeekend = day === 0 || day === 6;
  return {
    minutes: isWeekend ? 15 : 30,
    label:   isWeekend ? 'fin de semana' : 'día de semana',
  };
}

function createTransporter() {
  if (!smtp.host || !smtp.user || !smtp.pass) return null;
  return nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.port === 465,
    auth: { user: smtp.user, pass: smtp.pass },
  });
}

function buildEmailHtml({ title, preheader, bodyContent }) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#0f0e0e;font-family:Arial,Helvetica,sans-serif;">
  <div style="display:none;font-size:1px;color:#0f0e0e;max-height:0;overflow:hidden;">${preheader}</div>
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0e0e;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:480px;background:#161515;border-radius:16px;overflow:hidden;border:1px solid #252424;">

        <!-- Header del restaurante -->
        <tr>
          <td style="background:linear-gradient(135deg,#2d1060 0%,#1a0040 100%);padding:28px 24px;text-align:center;">
            <p style="color:#a78bfa;font-size:10px;letter-spacing:4px;text-transform:uppercase;margin:0 0 6px;">Restaurante</p>
            <h1 style="color:#ffffff;font-size:26px;font-weight:800;margin:0 0 4px;letter-spacing:-0.5px;">${restaurant.name}</h1>
            <p style="color:#7c5fba;font-size:12px;margin:0;">Carta Digital · Temporada 2025</p>
          </td>
        </tr>

        <!-- Cuerpo principal -->
        <tr><td style="padding:24px;">${bodyContent}</td></tr>

        <!-- Footer -->
        <tr>
          <td style="padding:14px 24px;border-top:1px solid #1e1d1d;text-align:center;">
            <p style="color:#4b5563;font-size:11px;margin:0;">${restaurant.name} · Martes a Domingo · 13:00 – 23:00</p>
            <p style="color:#374151;font-size:10px;margin:4px 0 0;">Para cancelar, inicia sesión en nuestra carta digital.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function durationLabel(mins) {
  if (mins === 60)  return '1 hora';
  if (mins === 90)  return '1 hora 30 min';
  if (mins === 120) return '2 horas';
  if (mins === 180) return '3 horas';
  return `${mins} min`;
}

function reservationDetailsBlock(reservation) {
  const { reservation_date, reservation_time, duration, guests, notes } = reservation;
  const grace = getGraceInfo(reservation_date);
  const timeStr = String(reservation_time).slice(0, 5);
  const durMins = parseInt(duration) || 60;

  return `
    <table width="100%" cellpadding="0" cellspacing="0"
      style="background:#111010;border:1px solid #1e1d1d;border-radius:12px;margin-bottom:16px;">
      <tr><td style="padding:14px 16px;">
        <p style="color:#6b7280;font-size:10px;font-weight:600;text-transform:uppercase;
           letter-spacing:1px;margin:0 0 12px;padding-bottom:10px;border-bottom:1px solid #1e1d1d;">
          Detalles de la Reserva
        </p>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="color:#9ca3af;font-size:13px;padding:4px 0;">📅 Fecha</td>
            <td style="color:#ffffff;font-size:13px;font-weight:600;text-align:right;padding:4px 0;">
              ${formatDateES(reservation_date)}
            </td>
          </tr>
          <tr>
            <td style="color:#9ca3af;font-size:13px;padding:4px 0;">🕐 Hora</td>
            <td style="color:#ffffff;font-size:13px;font-weight:600;text-align:right;padding:4px 0;">
              ${timeStr}
            </td>
          </tr>
          <tr>
            <td style="color:#9ca3af;font-size:13px;padding:4px 0;">⏳ Duración</td>
            <td style="color:#ffffff;font-size:13px;font-weight:600;text-align:right;padding:4px 0;">
              ${durationLabel(durMins)}
            </td>
          </tr>
          <tr>
            <td style="color:#9ca3af;font-size:13px;padding:4px 0;">👥 Personas</td>
            <td style="color:#ffffff;font-size:13px;font-weight:600;text-align:right;padding:4px 0;">
              ${guests} ${guests === 1 ? 'persona' : 'personas'}
            </td>
          </tr>
          ${notes ? `
          <tr>
            <td style="color:#9ca3af;font-size:13px;padding:4px 0;">📝 Notas</td>
            <td style="color:#d1d5db;font-size:12px;text-align:right;padding:4px 0;">${notes}</td>
          </tr>` : ''}
        </table>
      </td></tr>
    </table>

    <!-- Política de tolerancia -->
    <table width="100%" cellpadding="0" cellspacing="0"
      style="background:#1a0f00;border:1px solid #78350f;border-radius:12px;">
      <tr><td style="padding:14px 16px;">
        <p style="color:#fbbf24;font-size:13px;font-weight:600;margin:0 0 6px;">⚠️ Política de Reservas</p>
        <p style="color:#d97706;font-size:12px;margin:0 0 4px;line-height:1.5;">
          Tu reserva es un <strong>${grace.label}</strong>. Contás con
          <strong>${grace.minutes} minutos de tolerancia</strong> desde la hora reservada.
        </p>
        <p style="color:#92400e;font-size:11px;margin:0;line-height:1.5;">
          Pasado ese margen, el restaurante puede liberar la mesa para otros comensales.
        </p>
      </td></tr>
    </table>`;
}

async function sendConfirmationEmail(user, reservation) {
  const bodyContent = `
    <div style="text-align:center;margin-bottom:20px;">
      <div style="display:inline-block;width:52px;height:52px;background:#052e16;
           border:2px solid #166534;border-radius:50%;font-size:22px;line-height:52px;
           margin-bottom:12px;">✅</div>
      <h2 style="color:#ffffff;font-size:18px;font-weight:700;margin:0 0 6px;">
        ¡Reserva Confirmada!
      </h2>
      <p style="color:#9ca3af;font-size:13px;margin:0;">
        Hola, <strong style="color:#ffffff;">${user.username}</strong>.
        Tu mesa está asegurada. Te esperamos.
      </p>
    </div>

    ${reservationDetailsBlock(reservation)}

    <p style="color:#6b7280;font-size:11px;text-align:center;margin:16px 0 0;">
      Recibirás un recordatorio 2 días antes de tu visita.
    </p>`;

  await sendMail({
    to:      user.email,
    subject: `✅ Reserva confirmada — ${restaurant.name}`,
    html:    buildEmailHtml({
      title:     `Reserva Confirmada — ${restaurant.name}`,
      preheader: `Tu mesa está confirmada para el ${String(reservation.reservation_date).slice(0, 10)} a las ${String(reservation.reservation_time).slice(0, 5)}.`,
      bodyContent,
    }),
  });
}

async function sendReminderEmail(user, reservation) {
  const dateLabel = formatDateES(reservation.reservation_date);

  const bodyContent = `
    <div style="text-align:center;margin-bottom:20px;">
      <div style="display:inline-block;width:52px;height:52px;background:#1c1c00;
           border:2px solid #854d0e;border-radius:50%;font-size:22px;line-height:52px;
           margin-bottom:12px;">⏰</div>
      <h2 style="color:#ffffff;font-size:18px;font-weight:700;margin:0 0 6px;">
        ¡Tu reserva es en 2 días!
      </h2>
      <p style="color:#9ca3af;font-size:13px;margin:0;">
        Hola, <strong style="color:#ffffff;">${user.username}</strong>.
        Te recordamos que tienes una reserva el <strong style="color:#a78bfa;">${dateLabel}</strong>.
      </p>
    </div>

    ${reservationDetailsBlock(reservation)}

    <p style="color:#6b7280;font-size:11px;text-align:center;margin:16px 0 0;">
      Si no puedes asistir, cancela tu reserva desde la carta digital.
    </p>`;

  await sendMail({
    to:      user.email,
    subject: `⏰ Recordatorio: tu reserva en ${restaurant.name} es en 2 días`,
    html:    buildEmailHtml({
      title:     `Recordatorio de Reserva — ${restaurant.name}`,
      preheader: `Te esperamos el ${String(reservation.reservation_date).slice(0, 10)} a las ${String(reservation.reservation_time).slice(0, 5)}.`,
      bodyContent,
    }),
  });
}

async function sendMail({ to, subject, html }) {
  const transporter = createTransporter();

  if (!transporter) {
    console.log(`[EMAIL] SMTP no configurado — email que se habría enviado:`);
    console.log(`  Para: ${to}`);
    console.log(`  Asunto: ${subject}`);
    return;
  }

  const info = await transporter.sendMail({ from: smtp.from, to, subject, html });
  console.log(`[EMAIL] Enviado a ${to} — Message-ID: ${info.messageId}`);
}

module.exports = { sendConfirmationEmail, sendReminderEmail };
