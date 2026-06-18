import { connectDB, Enquiry } from '../../../lib/db';

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  if (req.method === 'PUT') {
    const e = await Enquiry.findByIdAndUpdate(id, req.body, { new: true });
    return res.json({ success: true, data: e });
  }

  if (req.method === 'DELETE') {
    await Enquiry.findByIdAndDelete(id);
    return res.json({ success: true });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
