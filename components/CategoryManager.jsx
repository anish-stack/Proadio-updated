import { useEffect, useState } from 'react';

// Small inline manager: shows existing categories as removable chips plus
// an add-input. Calls onChange(namesArray) whenever the list changes so the
// parent can refresh its dropdown options.
export default function CategoryManager({ type, showToast, onChange, collapsedByDefault = true }) {
  const [cats, setCats] = useState([]);
  const [newName, setNewName] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(!collapsedByDefault);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/categories?type=${type}`);
      const data = await res.json();
      const list = data.data || [];
      setCats(list);
      onChange?.(list.map(c => c.name));
    } catch { showToast?.('Failed to load categories', 'error'); }
    setLoading(false);
  };

  useEffect(() => { load(); }, [type]);

  const add = async () => {
    const name = newName.trim();
    if (!name) return;
    const res = await fetch('/api/categories', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ name, type }) });
    if (res.ok) { setNewName(''); load(); showToast?.('Category added!'); }
    else { const d = await res.json(); showToast?.(d.error || 'Error adding category', 'error'); }
  };

  const remove = async (id) => {
    if (!confirm('Remove this category?')) return;
    const res = await fetch(`/api/categories?id=${id}`, { method:'DELETE' });
    if (res.ok) { load(); showToast?.('Category removed'); }
    else { const d = await res.json(); showToast?.(d.error || 'Error removing category', 'error'); }
  };

  return (
    <div style={{ border:'1.5px solid #E8E4D9', borderRadius:8, background:'#F8F7F4', marginBottom:14 }}>
      <button type="button" onClick={() => setOpen(o => !o)} style={{
        width:'100%', textAlign:'left', padding:'10px 14px', background:'none', border:'none', cursor:'pointer',
        fontSize:'0.82rem', fontWeight:700, color:'#555', display:'flex', justifyContent:'space-between', alignItems:'center',
      }}>
        <span>🏷️ Manage {type === 'gallery' ? 'Gallery' : 'Event'} Categories</span>
        <span>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div style={{ padding:'0 14px 14px' }}>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:10 }}>
            {loading && <span style={{ fontSize:'0.78rem', color:'#888' }}>Loading...</span>}
            {!loading && cats.length === 0 && <span style={{ fontSize:'0.78rem', color:'#888' }}>No categories yet — add one below.</span>}
            {cats.map(c => (
              <span key={c._id} style={{
                display:'inline-flex', alignItems:'center', gap:6, background:'#fff', border:'1px solid #E8E4D9',
                borderRadius:100, padding:'4px 6px 4px 12px', fontSize:'0.8rem', fontWeight:600, color:'#333',
              }}>
                {c.name}
                <button type="button" onClick={() => remove(c._id)} title="Remove" style={{
                  width:18, height:18, borderRadius:'50%', border:'none', background:'#E74C3C', color:'#fff',
                  fontSize:'0.6rem', fontWeight:700, cursor:'pointer', lineHeight:1,
                }}>✕</button>
              </span>
            ))}
          </div>
          <div style={{ display:'flex', gap:8 }}>
            <input
              value={newName} onChange={e=>setNewName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), add())}
              placeholder="New category name..."
              style={{ flex:1, padding:'8px 12px', border:'1.5px solid #E8E4D9', borderRadius:7, fontSize:'0.85rem', outline:'none' }}
            />
            <button type="button" onClick={add} style={{
              background:'#1A1A2E', color:'#fff', border:'none', padding:'8px 16px', borderRadius:7,
              fontWeight:700, cursor:'pointer', fontSize:'0.82rem',
            }}>+ Add</button>
          </div>
        </div>
      )}
    </div>
  );
}
