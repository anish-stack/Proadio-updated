import nodemailer from 'nodemailer';

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_USER || !SMTP_PASS) return null;

  transporter = nodemailer.createTransport({
    host: SMTP_HOST || 'smtp.gmail.com',
    port: Number(SMTP_PORT) || 465,
    secure: Number(SMTP_PORT) !== 587, // true for 465 (SSL), false for 587 (TLS)
    auth: { user: (SMTP_USER || '').trim(), pass: SMTP_PASS },
  });
  return transporter;
}

// Sends a plain notification email. Never throws — logs and resolves false
// instead, so a mail failure never blocks saving the enquiry/contact to DB.
export async function sendNotificationEmail({ subject, html, replyTo }) {
  try {
    const t = getTransporter();
    if (!t) {
      console.warn('Mailer not configured: set SMTP_USER and SMTP_PASS in .env.local');
      return false;
    }
    const to = process.env.NOTIFY_EMAIL || process.env.SMTP_USER;
    await t.sendMail({
      from: `"Pro Audio Solution Website" <${process.env.SMTP_USER}>`,
      to,
      replyTo,
      subject,
      html,
    });
    return true;
  } catch (err) {
    console.error('Email send failed:', err.message);
    return false;
  }
}

export function enquiryEmailHtml(e) {
  return `
    <div style="font-family:Arial,sans-serif;font-size:14px;color:#1A1A2E;line-height:1.6">
      <h2 style="color:#D4AF37;margin-bottom:4px">New Enquiry Received</h2>
      <p><strong>Name:</strong> ${esc(e.name)}</p>
      <p><strong>Phone:</strong> ${esc(e.phone)}</p>
      <p><strong>Email:</strong> ${esc(e.email)}</p>
      ${e.eventType ? `<p><strong>Event Type:</strong> ${esc(e.eventType)}</p>` : ''}
      ${e.eventDate ? `<p><strong>Event Date:</strong> ${esc(e.eventDate)}</p>` : ''}
      ${e.product ? `<p><strong>Product/Equipment:</strong> ${esc(e.product)}</p>` : ''}
      ${e.message ? `<p><strong>Message:</strong><br/>${esc(e.message)}</p>` : ''}
      <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
      <p style="color:#888;font-size:12px">Sent automatically from the Pro Audio Solution website enquiry form. Also visible in the Admin Panel → Enquiries tab.</p>
    </div>`;
}

export function contactEmailHtml(c) {
  return `
    <div style="font-family:Arial,sans-serif;font-size:14px;color:#1A1A2E;line-height:1.6">
      <h2 style="color:#D4AF37;margin-bottom:4px">New Contact Message</h2>
      <p><strong>Name:</strong> ${esc(c.name)}</p>
      <p><strong>Email:</strong> ${esc(c.email)}</p>
      ${c.phone ? `<p><strong>Phone:</strong> ${esc(c.phone)}</p>` : ''}
      ${c.subject ? `<p><strong>Subject:</strong> ${esc(c.subject)}</p>` : ''}
      <p><strong>Message:</strong><br/>${esc(c.message)}</p>
      <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
      <p style="color:#888;font-size:12px">Sent automatically from the Pro Audio Solution website contact form. Also visible in the Admin Panel → Contacts tab.</p>
    </div>`;
}

function esc(str) {
  return String(str || '').replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}
