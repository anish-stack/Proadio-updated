import formidable from 'formidable';
import fs from 'fs';
import { uploadToCloudinary } from '../../lib/cloudinary';

export const config = {
  api: { bodyParser: false },
};

function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = formidable({ maxFileSize: 15 * 1024 * 1024, multiples: false });
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    return res.status(500).json({ error: 'Cloudinary is not configured on the server. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in .env.local' });
  }

  try {
    const { fields, files } = await parseForm(req);
    const folderField = Array.isArray(fields.folder) ? fields.folder[0] : fields.folder;
    const folder = `proaudio/${folderField || 'general'}`;

    const fileEntry = files.file;
    const file = Array.isArray(fileEntry) ? fileEntry[0] : fileEntry;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const buffer = fs.readFileSync(file.filepath);
    const base64 = buffer.toString('base64');
    const mime = file.mimetype || 'image/jpeg';
    const dataUri = `data:${mime};base64,${base64}`;

    const url = await uploadToCloudinary(dataUri, folder);

    // cleanup temp file
    fs.unlink(file.filepath, () => {});

    return res.status(200).json({ success: true, url });
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ error: 'Upload failed. Please try again.' });
  }
}
