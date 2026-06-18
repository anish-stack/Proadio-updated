import { connectDB, Enquiry } from '../../../lib/db';
import { sendNotificationEmail, enquiryEmailHtml } from '../../../lib/mailer';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const total = await Enquiry.countDocuments(filter);
    const data = await Enquiry.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit)).lean();
    return res.json({ success: true, data, total, page: Number(page) });
  }

  if (req.method === 'POST') {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) return res.status(400).json({ error: 'name, email, phone required' });
    const enquiry = await Enquiry.create(req.body);
    sendNotificationEmail({
      subject: `New Enquiry — ${name}${req.body.eventType ? ' ('+req.body.eventType+')' : ''}`,
      html: enquiryEmailHtml(enquiry),
      replyTo: email,
    }).catch(() => {});
    return res.status(201).json({ success: true, data: enquiry });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
