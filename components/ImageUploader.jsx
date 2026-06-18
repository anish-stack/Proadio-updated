import { useRef, useState } from 'react';

// Single-image uploader. `value` is the current image URL (or '').
// Calls onChange(url) once Cloudinary upload completes.
export default function ImageUploader({ value, onChange, folder = 'general', label = 'Image', showToast }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const pick = () => inputRef.current?.click();

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) { showToast?.('Please select an image file', 'error'); return; }
    if (file.size > 15 * 1024 * 1024) { showToast?.('Image must be under 15MB', 'error'); return; }

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', folder);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || 'Upload failed');
      onChange(data.url);
      showToast?.('Image uploaded!');
    } catch (err) {
      showToast?.(err.message || 'Upload failed', 'error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: 5, color: '#555', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        {value ? (
          <div style={{ position: 'relative' }}>
            <img src={value} alt="preview" style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8, border: '1px solid #E8E4D9' }} />
            <button type="button" onClick={() => onChange('')} title="Remove image" style={{
              position: 'absolute', top: -8, right: -8, width: 22, height: 22, borderRadius: '50%',
              background: '#E74C3C', color: '#fff', border: '2px solid #fff', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 700, lineHeight: 1,
            }}>✕</button>
          </div>
        ) : (
          <div style={{ width: 100, height: 100, borderRadius: 8, border: '1.5px dashed #E8E4D9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', color: '#bbb', background: '#F8F7F4' }}>🖼️</div>
        )}
        <button type="button" onClick={pick} disabled={uploading} style={{
          background: uploading ? '#ccc' : '#1A1A2E', color: '#fff', border: 'none', padding: '9px 16px', borderRadius: 7,
          fontWeight: 700, cursor: uploading ? 'not-allowed' : 'pointer', fontSize: '0.82rem',
        }}>{uploading ? 'Uploading...' : value ? 'Change Image' : '⬆ Upload Image'}</button>
      </div>
    </div>
  );
}
