import { connectDB, Contact } from '../../../lib/db';
import { sendNotificationEmail, contactEmailHtml } from '../../../lib/mailer';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const total = await Contact.countDocuments(filter);
    const data = await Contact.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit)).lean();
    return res.json({ success: true, data, total });
  }

  if (req.method === 'POST') {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ error: 'name, email, message required' });
    const contact = await Contact.create(req.body);
    // Fire-and-forget: don't let a mail failure affect the saved submission
    sendNotificationEmail({
      subject: `New Contact Message — ${name}`,
      html: contactEmailHtml(contact),
      replyTo: email,
    }).catch(() => {});
    return res.status(201).json({ success: true, data: contact });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
