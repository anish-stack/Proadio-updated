import { connectDB, Contact } from '../../../lib/db';

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  if (req.method === 'PUT') {
    const c = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    return res.json({ success: true, data: c });
  }

  if (req.method === 'DELETE') {
    await Contact.findByIdAndDelete(id);
    return res.json({ success: true });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
