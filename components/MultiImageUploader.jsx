import { useRef, useState } from 'react';

// Multi-image uploader. `value` is an array of URLs.
// Calls onChange(newArray) after each successful upload (supports multi-select).
export default function MultiImageUploader({ value = [], onChange, folder = 'general', label = 'Images', showToast }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const pick = () => inputRef.current?.click();

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = '';
    if (!files.length) return;

    setUploading(true);
    const uploaded = [];
    try {
      for (const file of files) {
        if (!file.type.startsWith('image/')) continue;
        if (file.size > 15 * 1024 * 1024) { showToast?.(`${file.name} is over 15MB, skipped`, 'error'); continue; }
        const fd = new FormData();
        fd.append('file', file);
        fd.append('folder', folder);
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (res.ok && data.url) uploaded.push(data.url);
      }
      if (uploaded.length) {
        onChange([...value, ...uploaded]);
        showToast?.(`${uploaded.length} image${uploaded.length>1?'s':''} uploaded!`);
      }
    } catch {
      showToast?.('Some uploads failed', 'error');
    } finally {
      setUploading(false);
    }
  };

  const removeAt = (idx) => onChange(value.filter((_, i) => i !== idx));

  return (
    <div>
      <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: 5, color: '#555', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>
      <input ref={inputRef} type="file" accept="image/*" multiple onChange={handleFiles} style={{ display: 'none' }} />
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
        {value.map((url, idx) => (
          <div key={url + idx} style={{ position: 'relative' }}>
            <img src={url} alt={`img-${idx}`} style={{ width: 84, height: 84, objectFit: 'cover', borderRadius: 8, border: '1px solid #E8E4D9' }} />
            <button type="button" onClick={() => removeAt(idx)} title="Remove" style={{
              position: 'absolute', top: -8, right: -8, width: 20, height: 20, borderRadius: '50%',
              background: '#E74C3C', color: '#fff', border: '2px solid #fff', cursor: 'pointer', fontSize: '0.65rem', fontWeight: 700, lineHeight: 1,
            }}>✕</button>
          </div>
        ))}
      </div>
      <button type="button" onClick={pick} disabled={uploading} style={{
        background: uploading ? '#ccc' : '#1A1A2E', color: '#fff', border: 'none', padding: '9px 16px', borderRadius: 7,
        fontWeight: 700, cursor: uploading ? 'not-allowed' : 'pointer', fontSize: '0.82rem',
      }}>{uploading ? 'Uploading...' : '⬆ Upload Image(s)'}</button>
    </div>
  );
}
