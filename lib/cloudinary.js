import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;

// Uploads a base64 data-URI (or remote URL) string to Cloudinary and
// returns the secure HTTPS URL. `folder` groups images inside the
// Cloudinary media library (e.g. "proaudio/products").
export async function uploadToCloudinary(fileDataUri, folder = 'proaudio') {
  const result = await cloudinary.uploader.upload(fileDataUri, {
    folder,
    resource_type: 'image',
    // Keep file sizes web-friendly without visibly degrading quality
    transformation: [{ width: 1920, height: 1920, crop: 'limit' }, { quality: 'auto:good' }],
  });
  return result.secure_url;
}

export async function deleteFromCloudinary(publicId) {
  if (!publicId) return;
  try { await cloudinary.uploader.destroy(publicId); } catch { /* ignore */ }
}
