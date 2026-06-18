import { useState, useEffect, useCallback, useRef } from 'react';
import Head from 'next/head';
import Toast from '../../components/Toast';
import ImageUploader from '../../components/ImageUploader';
import MultiImageUploader from '../../components/MultiImageUploader';
import CategoryManager from '../../components/CategoryManager';

const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASS || 'proaudio2024';
const ADMIN_TAB_KEY = 'pa_admin_tab';

// ── Rich Text Editor (no external dep) ──────────────────────
function RichEditor({ value, onChange, height = 300 }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value || '';
    }
  }, []); // only on mount
  const execCmd = (cmd, val = null) => { document.execCommand(cmd, false, val); ref.current.focus(); };
  const TOOLS = [
    { cmd:'bold', icon:'B', title:'Bold' },
    { cmd:'italic', icon:'I', title:'Italic' },
    { cmd:'underline', icon:'U', title:'Underline' },
    { sep:true },
    { cmd:'insertUnorderedList', icon:'• List', title:'Bullet List' },
    { cmd:'insertOrderedList', icon:'1. List', title:'Numbered List' },
    { sep:true },
    { cmd:'formatBlock', icon:'H2', val:'h2', title:'Heading 2' },
    { cmd:'formatBlock', icon:'H3', val:'h3', title:'Heading 3' },
    { cmd:'formatBlock', icon:'P', val:'p', title:'Paragraph' },
    { sep:true },
    { cmd:'createLink', icon:'🔗', title:'Insert Link', prompt:'URL:' },
    { cmd:'removeFormat', icon:'✕ Format', title:'Clear Formatting' },
  ];
  return (
    <div style={{ border:'1.5px solid #E8E4D9', borderRadius:8, overflow:'hidden' }}>
      <div style={{ background:'#F8F7F4', borderBottom:'1px solid #E8E4D9', padding:'6px 10px', display:'flex', gap:4, flexWrap:'wrap', alignItems:'center' }}>
        {TOOLS.map((t, i) => t.sep ? (
          <span key={i} style={{ width:1, height:20, background:'#E8E4D9', margin:'0 4px' }} />
        ) : (
          <button key={t.cmd+t.icon} type="button" title={t.title} onMouseDown={e => { e.preventDefault(); t.prompt ? execCmd(t.cmd, window.prompt(t.prompt)) : execCmd(t.cmd, t.val); }}
            style={{ padding:'4px 10px', border:'1px solid #E8E4D9', borderRadius:5, background:'#fff', cursor:'pointer', fontSize:'0.78rem', fontWeight:700, color:'#555' }}>
            {t.icon}
          </button>
        ))}
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={() => onChange(ref.current.innerHTML)}
        style={{ minHeight:height, padding:'14px 16px', outline:'none', fontSize:'0.9rem', lineHeight:1.7, background:'#fff' }}
      />
    </div>
  );
}

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState('');
  const [authErr, setAuthErr] = useState('');
  const [tab, setTab] = useState('dashboard');
  const [toast, setToast] = useState(null);
  const [data, setData] = useState({ products:[], enquiries:[], contacts:[], events:[], pages:[], gallery:[], stats:[], settings:{} });
  const [loading, setLoading] = useState(false);

  const showToast = useCallback((message, type='success') => setToast({ message, type }), []);

  const switchTab = useCallback((t) => {
    setTab(t);
    try { localStorage.setItem(ADMIN_TAB_KEY, t); } catch {}
  }, []);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [pR,eR,cR,evR,pgR,gR,stR,setR] = await Promise.all([
        fetch('/api/products'), fetch('/api/enquiries'), fetch('/api/contact'),
        fetch('/api/events'), fetch('/api/admin/pages'), fetch('/api/gallery'),
        fetch('/api/stats'), fetch('/api/settings'),
      ]);
      const [p,e,c,ev,pg,g,st,set] = await Promise.all([pR.json(),eR.json(),cR.json(),evR.json(),pgR.json(),gR.json(),stR.json(),setR.json()]);
      setData({ products:p.data||[], enquiries:e.data||[], contacts:c.data||[], events:ev.data||[], pages:pg.data||[], gallery:g.data||[], stats:st.data||[], settings:set.data||{} });
    } catch { showToast('Failed to fetch data','error'); }
    setLoading(false);
  }, [showToast]);

  useEffect(() => {
    const saved = sessionStorage.getItem('pa_admin');
    if (saved === 'ok') {
      setAuthed(true);
      // Restore last active tab from localStorage
      try {
        const savedTab = localStorage.getItem(ADMIN_TAB_KEY);
        if (savedTab) setTab(savedTab);
      } catch {}
      fetchAll();
    }
  }, [fetchAll]);

  const onLogin = () => {
    if (pass === ADMIN_PASS) {
      sessionStorage.setItem('pa_admin','ok');
      setAuthed(true);
      try {
        const savedTab = localStorage.getItem(ADMIN_TAB_KEY);
        if (savedTab) setTab(savedTab);
      } catch {}
      fetchAll();
    } else { setAuthErr('Wrong password'); }
  };

  if (!authed) return <LoginScreen pass={pass} setPass={setPass} onLogin={onLogin} error={authErr} />;

  const newEnq = data.enquiries.filter(e=>e.status==='new').length;
  const newCon = data.contacts.filter(c=>c.status==='new').length;

  const TABS = [
    { id:'dashboard', label:'📊 Dashboard' },
    { id:'products',  label:'🎛️ Products' },
    { id:'events',    label:'🎵 Events' },
    { id:'gallery',   label:'🖼️ Gallery' },
    { id:'enquiries', label:`📩 Enquiries${newEnq?` (${newEnq})`:''}` },
    { id:'contacts',  label:`📧 Contacts${newCon?` (${newCon})`:''}` },
    { id:'pages',     label:'📄 CMS Pages' },
    { id:'stats',     label:'📈 Stats' },
    { id:'settings',  label:'⚙️ Settings' },
  ];

  return (
    <>
      <Head>
        <title>Admin — Pro Audio Solution</title>
        <meta name="robots" content="noindex,nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <style>{`*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Inter',sans-serif;background:#F8F7F4;color:#1A1A2E}`}</style>
      </Head>
      {toast && <Toast {...toast} onClose={()=>setToast(null)} />}

      <div style={{ display:'flex', minHeight:'100vh' }}>
        {/* Sidebar */}
        <aside style={{ width:230, background:'#1A1A2E', color:'#fff', flexShrink:0, position:'sticky', top:0, height:'100vh', overflow:'auto', display:'flex', flexDirection:'column' }}>
          <div style={{ padding:'20px 16px', borderBottom:'1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontWeight:900, fontSize:'1.1rem', color:'#D4AF37' }}>Pro Audio</div>
            <div style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.45)', marginTop:2 }}>Admin Panel</div>
          </div>
          <nav style={{ flex:1, padding:'8px 0' }}>
            {TABS.map(t => (
              <button key={t.id} onClick={()=>switchTab(t.id)} style={{
                width:'100%', textAlign:'left', padding:'10px 16px',
                background: tab===t.id ? 'rgba(212,175,55,0.15)' : 'none',
                color: tab===t.id ? '#D4AF37' : 'rgba(255,255,255,0.7)',
                border:'none', cursor:'pointer', fontSize:'0.87rem', fontWeight:600,
                borderLeft:`3px solid ${tab===t.id?'#D4AF37':'transparent'}`,
                transition:'all 0.15s',
              }}>{t.label}</button>
            ))}
          </nav>
          <div style={{ padding:'12px 16px', borderTop:'1px solid rgba(255,255,255,0.1)' }}>
            <a href="/" target="_blank" style={{ display:'block', color:'rgba(255,255,255,0.5)', fontSize:'0.8rem', marginBottom:8 }}>← View Site</a>
            <button onClick={()=>{ sessionStorage.removeItem('pa_admin'); setAuthed(false); }} style={{ background:'rgba(255,255,255,0.08)', border:'none', color:'rgba(255,255,255,0.7)', padding:'7px 14px', borderRadius:6, cursor:'pointer', fontSize:'0.82rem', width:'100%' }}>Logout</button>
          </div>
        </aside>

        {/* Main */}
        <main style={{ flex:1, overflow:'auto', minWidth:0 }}>
          <div style={{ background:'#fff', borderBottom:'1px solid #E8E4D9', padding:'14px 24px', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, zIndex:10, boxShadow:'0 1px 4px rgba(0,0,0,0.05)' }}>
            <h1 style={{ fontSize:'1rem', fontWeight:700 }}>{TABS.find(t=>t.id===tab)?.label}</h1>
            <button onClick={fetchAll} disabled={loading} style={{ background:'#D4AF37', color:'#1A1A2E', border:'none', padding:'7px 16px', borderRadius:7, fontWeight:700, cursor:'pointer', fontSize:'0.82rem' }}>
              {loading ? '...' : '↻ Refresh'}
            </button>
          </div>
          <div style={{ padding:24 }}>
            {tab==='dashboard' && <DashTab data={data} switchTab={switchTab} />}
            {tab==='products'  && <ProductsTab products={data.products} refresh={fetchAll} showToast={showToast} />}
            {tab==='events'    && <EventsTab events={data.events} refresh={fetchAll} showToast={showToast} />}
            {tab==='gallery'   && <GalleryTab images={data.gallery} refresh={fetchAll} showToast={showToast} />}
            {tab==='enquiries' && <EnquiriesTab enquiries={data.enquiries} refresh={fetchAll} showToast={showToast} />}
            {tab==='contacts'  && <ContactsTab contacts={data.contacts} refresh={fetchAll} showToast={showToast} />}
            {tab==='pages'     && <PagesTab pages={data.pages} refresh={fetchAll} showToast={showToast} />}
            {tab==='stats'     && <StatsTab stats={data.stats} refresh={fetchAll} showToast={showToast} />}
            {tab==='settings'  && <SettingsTab settings={data.settings} refresh={fetchAll} showToast={showToast} />}
          </div>
        </main>
      </div>
    </>
  );
}

// ── Login ─────────────────────────────────────────────────
function LoginScreen({ pass, setPass, onLogin, error }) {
  return (
    <>
      <Head><title>Admin Login — Pro Audio Solution</title><meta name="robots" content="noindex" /></Head>
      <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#1A1A2E' }}>
        <div style={{ background:'#fff', borderRadius:20, padding:40, width:'100%', maxWidth:380 }}>
          <div style={{ textAlign:'center', marginBottom:28 }}>
            <div style={{ width:52, height:52, background:'#D4AF37', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:'1.2rem', color:'#1A1A2E', margin:'0 auto 12px' }}>PA</div>
            <h2 style={{ fontWeight:800, fontSize:'1.3rem' }}>Admin Login</h2>
          </div>
          <label style={{ fontSize:'0.85rem', fontWeight:600, display:'block', marginBottom:6 }}>Password</label>
          <input type="password" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==='Enter'&&onLogin()}
            style={{ width:'100%', padding:'11px 14px', border:'1.5px solid #E8E4D9', borderRadius:8, fontSize:'0.95rem', outline:'none', marginBottom:6 }}
            placeholder="Enter admin password" autoFocus />
          {error && <p style={{ color:'#E74C3C', fontSize:'0.82rem', marginBottom:8 }}>{error}</p>}
          <button onClick={onLogin} style={{ width:'100%', padding:12, background:'#D4AF37', color:'#1A1A2E', border:'none', borderRadius:8, fontWeight:700, fontSize:'1rem', cursor:'pointer', marginTop:8 }}>Login →</button>
        </div>
      </div>
    </>
  );
}

// ── Dashboard ─────────────────────────────────────────────
function DashTab({ data, switchTab }) {
  const stats = [
    { label:'Products', value:data.products.length, icon:'🎛️', color:'#2563EB', tab:'products' },
    { label:'Events', value:data.events.length, icon:'🎵', color:'#7C3AED', tab:'events' },
    { label:'Gallery', value:data.gallery.length, icon:'🖼️', color:'#059669', tab:'gallery' },
    { label:'Enquiries', value:data.enquiries.length, icon:'📩', color:'#D97706', tab:'enquiries', new:data.enquiries.filter(e=>e.status==='new').length },
    { label:'Contacts', value:data.contacts.length, icon:'📧', color:'#E94560', tab:'contacts', new:data.contacts.filter(c=>c.status==='new').length },
    { label:'CMS Pages', value:data.pages.length, icon:'📄', color:'#0891B2', tab:'pages' },
  ];
  return (
    <div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:16, marginBottom:28 }}>
        {stats.map(s => (
          <div key={s.label} onClick={()=>switchTab(s.tab)} style={{ background:'#fff', borderRadius:12, padding:'20px 16px', border:'1px solid #E8E4D9', cursor:'pointer', transition:'all 0.15s', boxShadow:'0 1px 4px rgba(0,0,0,0.05)' }}
            onMouseEnter={e=>{e.currentTarget.style.boxShadow='0 4px 16px rgba(0,0,0,0.1)';e.currentTarget.style.transform='translateY(-2px)'}}
            onMouseLeave={e=>{e.currentTarget.style.boxShadow='0 1px 4px rgba(0,0,0,0.05)';e.currentTarget.style.transform='none'}}
          >
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <div>
                <p style={{ fontSize:'0.75rem', fontWeight:600, color:'#888', textTransform:'uppercase', letterSpacing:'0.08em' }}>{s.label}</p>
                <p style={{ fontSize:'2rem', fontWeight:900, color:s.color, lineHeight:1.1, marginTop:6 }}>{s.value}</p>
                {s.new>0 && <p style={{ fontSize:'0.72rem', color:'#E74C3C', fontWeight:700, marginTop:2 }}>{s.new} new</p>}
              </div>
              <span style={{ fontSize:'1.6rem' }}>{s.icon}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
        <RecentList title="Latest Enquiries" items={data.enquiries.slice(0,5)} render={e=>(
          <><span style={{ fontWeight:600, fontSize:'0.88rem' }}>{e.name}</span><span style={{ color:'#888', fontSize:'0.8rem', marginLeft:8 }}>{e.phone}</span><StatusBadge status={e.status} /></>
        )} empty="No enquiries yet" />
        <RecentList title="Latest Contacts" items={data.contacts.slice(0,5)} render={c=>(
          <><span style={{ fontWeight:600, fontSize:'0.88rem' }}>{c.name}</span><span style={{ color:'#888', fontSize:'0.8rem', marginLeft:8 }}>{c.email}</span><StatusBadge status={c.status} /></>
        )} empty="No contacts yet" />
      </div>
      <style>{`@media(max-width:700px){div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
function RecentList({ title, items, render, empty }) {
  return (
    <div style={{ background:'#fff', borderRadius:12, padding:20, border:'1px solid #E8E4D9' }}>
      <h3 style={{ fontWeight:700, marginBottom:14, fontSize:'0.92rem' }}>{title}</h3>
      {items.length===0 ? <p style={{ color:'#888', fontSize:'0.85rem' }}>{empty}</p> : items.map((item,i) => (
        <div key={item._id||i} style={{ padding:'9px 0', borderBottom:'1px solid #F3F0EA', display:'flex', justifyContent:'space-between', alignItems:'center', gap:8 }}>{render(item)}</div>
      ))}
    </div>
  );
}

// ── Products Tab ──────────────────────────────────────────
const CATS = ['Sound Systems','Mixing Consoles','Microphones','Lighting','Trussing & Structures','LED Walls'];
function ProductsTab({ products, refresh, showToast }) {
  const empty = { name:'', category:'Sound Systems', description:'', specs:'', image:'', featured:false, popupEnabled:false, popupContent:'' };
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filterCat, setFilterCat] = useState('All');
  const [page, setPage] = useState(1);
  const PER = 10;

  const filtered = filterCat==='All' ? products : products.filter(p=>p.category===filterCat);
  const pages = Math.ceil(filtered.length/PER);
  const paged = filtered.slice((page-1)*PER, page*PER);

  const save = async () => {
    if (!form.name.trim()) { showToast('Name required','error'); return; }
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `/api/products/${editing}` : '/api/products';
    const res = await fetch(url,{ method, headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) });
    if (res.ok) { showToast(editing?'Updated!':'Added!'); setForm(empty); setEditing(null); setShowForm(false); refresh(); }
    else showToast('Error','error');
  };
  const del = async id => { if(!confirm('Delete?'))return; await fetch(`/api/products/${id}`,{method:'DELETE'}); showToast('Deleted'); refresh(); };
  const edit = p => { setForm({name:p.name,category:p.category,description:p.description||'',specs:p.specs||'',image:p.image||'',featured:p.featured||false,popupEnabled:p.popupEnabled||false,popupContent:p.popupContent||''}); setEditing(p._id); setShowForm(true); window.scrollTo({top:0,behavior:'smooth'}); };

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:16, flexWrap:'wrap', gap:10 }}>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap', alignItems:'center' }}>
          <h2 style={{ fontWeight:700, fontSize:'1rem' }}>Products ({products.length})</h2>
          <select value={filterCat} onChange={e=>{setFilterCat(e.target.value);setPage(1)}} style={selectSt}>
            <option>All</option>{CATS.map(c=><option key={c}>{c}</option>)}
          </select>
        </div>
        <button onClick={()=>{setShowForm(!showForm);setEditing(null);setForm(empty)}} style={addBtnSt}>{showForm?'Cancel':'+ Add Product'}</button>
      </div>

      {showForm && (
        <FormCard title={editing?'Edit Product':'Add Product'}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <AF label="Name *" value={form.name} onChange={v=>setForm(f=>({...f,name:v}))} />
            <AF label="Category" type="select" value={form.category} onChange={v=>setForm(f=>({...f,category:v}))} options={CATS} />
            <AF label="Description" type="textarea" value={form.description} onChange={v=>setForm(f=>({...f,description:v}))} span />
            <AF label="Specs" value={form.specs} onChange={v=>setForm(f=>({...f,specs:v}))} span />
            <div style={{ gridColumn:'1/-1' }}>
              <ImageUploader label="Product Image" value={form.image} onChange={v=>setForm(f=>({...f,image:v}))} folder="products" showToast={showToast} />
            </div>
            <div style={{ gridColumn:'1/-1', display:'flex', gap:20, flexWrap:'wrap' }}>
              <CbField label="Featured" checked={form.featured} onChange={v=>setForm(f=>({...f,featured:v}))} />
              <CbField label="Enable Popup" checked={form.popupEnabled} onChange={v=>setForm(f=>({...f,popupEnabled:v}))} />
            </div>
            {form.popupEnabled && (
              <div style={{ gridColumn:'1/-1' }}>
                <label style={labelSt}>Popup Content (HTML)</label>
                <RichEditor value={form.popupContent} onChange={v=>setForm(f=>({...f,popupContent:v}))} height={160} />
              </div>
            )}
          </div>
          <SaveBtn onClick={save} label={editing?'Update':'Add Product'} />
        </FormCard>
      )}

      <Table headers={['Image','Name','Category','Featured','Popup','Actions']}>
        {paged.map(p=>(
          <tr key={p._id} style={{ borderTop:'1px solid #F3F0EA' }}>
            <td style={tdSt}>{p.image ? <img src={p.image} alt={p.name} style={{ width:44, height:44, objectFit:'cover', borderRadius:6, border:'1px solid #E8E4D9' }} /> : <span style={{ color:'#ccc', fontSize:'0.75rem' }}>—</span>}</td>
            <td style={tdSt}><span style={{ fontWeight:600 }}>{p.name}</span></td>
            <td style={tdSt}><span style={{ fontSize:'0.8rem',color:'#555' }}>{p.category}</span></td>
            <td style={tdSt}>{p.featured?'⭐':'—'}</td>
            <td style={tdSt}>{p.popupEnabled?'✅':'—'}</td>
            <td style={{ ...tdSt, display:'flex', gap:6 }}>
              <Btn color="#2563EB" onClick={()=>edit(p)}>Edit</Btn>
              <Btn color="#E74C3C" onClick={()=>del(p._id)}>Delete</Btn>
            </td>
          </tr>
        ))}
      </Table>
      {paged.length===0 && <Empty text="No products found" />}
      <Pagination page={page} pages={pages} setPage={setPage} />
    </div>
  );
}

// ── Events Tab ────────────────────────────────────────────
function EventsTab({ events, refresh, showToast }) {
  const empty = { title:'', slug:'', description:'', htmlContent:'', date:'', venue:'', category:'', image:'', images:[], isUpcoming:true, featured:false, popupEnabled:false, popupContent:'' };
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);
  const [eventCats, setEventCats] = useState([]);
  const PER=8; const pages=Math.ceil(events.length/PER); const paged=events.slice((page-1)*PER,page*PER);

  // Once categories load, default a blank form's category to the first option
  useEffect(() => {
    if (eventCats.length && !editing && !form.category) setForm(f => ({ ...f, category: eventCats[0] }));
  }, [eventCats]);

  const save = async () => {
    if (!form.title.trim()||!form.date) { showToast('Title and date required','error'); return; }
    const method = editing?'PUT':'POST';
    const url = editing?`/api/events/${editing}`:'/api/events';
    // auto-generate slug if empty
    const body = { ...form, slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') };
    const res = await fetch(url,{method,headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
    if (res.ok) { showToast(editing?'Updated!':'Added!'); setForm(empty); setEditing(null); setShowForm(false); refresh(); }
    else showToast('Error','error');
  };
  const del = async id => { if(!confirm('Delete?'))return; await fetch(`/api/events/${id}`,{method:'DELETE'}); showToast('Deleted'); refresh(); };
  const edit = ev => {
    setForm({ title:ev.title, slug:ev.slug||'', description:ev.description||'', htmlContent:ev.htmlContent||'', date:ev.date?.split('T')[0]||'', venue:ev.venue||'', category:ev.category||'', image:ev.image||'', images:ev.images||[], isUpcoming:ev.isUpcoming, featured:ev.featured||false, popupEnabled:ev.popupEnabled||false, popupContent:ev.popupContent||'' });
    setEditing(ev._id); setShowForm(true); window.scrollTo({top:0,behavior:'smooth'});
  };

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:16 }}>
        <h2 style={{ fontWeight:700, fontSize:'1rem' }}>Events ({events.length})</h2>
        <button onClick={()=>{setShowForm(!showForm);setEditing(null);setForm(empty)}} style={addBtnSt}>{showForm?'Cancel':'+ Add Event'}</button>
      </div>

      {showForm && (
        <FormCard title={editing?'Edit Event':'Add Event'}>
          <CategoryManager type="event" showToast={showToast} onChange={setEventCats} />
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <AF label="Title *" value={form.title} onChange={v=>setForm(f=>({...f,title:v}))} span />
            <AF label="Slug (URL)" value={form.slug} onChange={v=>setForm(f=>({...f,slug:v}))} placeholder="auto-generated if empty" />
            <AF label="Date *" type="date" value={form.date} onChange={v=>setForm(f=>({...f,date:v}))} />
            <AF label="Venue" value={form.venue} onChange={v=>setForm(f=>({...f,venue:v}))} />
            <AF label="Category" type="select" value={form.category} onChange={v=>setForm(f=>({...f,category:v}))} options={eventCats.length?eventCats:['Other']} />
            <AF label="Description" type="textarea" value={form.description} onChange={v=>setForm(f=>({...f,description:v}))} span />
            <div style={{ gridColumn:'1/-1' }}>
              <ImageUploader label="Cover Image" value={form.image} onChange={v=>setForm(f=>({...f,image:v}))} folder="events" showToast={showToast} />
            </div>
            <div style={{ gridColumn:'1/-1' }}>
              <MultiImageUploader label="Event Pictures (shown on event detail page)" value={form.images} onChange={v=>setForm(f=>({...f,images:v}))} folder="events" showToast={showToast} />
            </div>
            <div style={{ gridColumn:'1/-1' }}>
              <label style={labelSt}>HTML Content (shown on event detail page)</label>
              <RichEditor value={form.htmlContent} onChange={v=>setForm(f=>({...f,htmlContent:v}))} height={220} />
            </div>
            <div style={{ gridColumn:'1/-1', display:'flex', gap:20, flexWrap:'wrap' }}>
              <CbField label="Upcoming" checked={form.isUpcoming} onChange={v=>setForm(f=>({...f,isUpcoming:v}))} />
              <CbField label="Featured" checked={form.featured} onChange={v=>setForm(f=>({...f,featured:v}))} />
              <CbField label="Enable Popup" checked={form.popupEnabled} onChange={v=>setForm(f=>({...f,popupEnabled:v}))} />
            </div>
            {form.popupEnabled && (
              <div style={{ gridColumn:'1/-1' }}>
                <label style={labelSt}>Popup Content (HTML — shown automatically on event page)</label>
                <RichEditor value={form.popupContent} onChange={v=>setForm(f=>({...f,popupContent:v}))} height={140} />
              </div>
            )}
          </div>
          <SaveBtn onClick={save} label={editing?'Update Event':'Add Event'} />
        </FormCard>
      )}

      <Table headers={['Image','Title','Date','Category','Status','Popup','Actions']}>
        {paged.map(ev=>(
          <tr key={ev._id} style={{ borderTop:'1px solid #F3F0EA' }}>
            <td style={tdSt}>{ev.image ? <img src={ev.image} alt={ev.title} style={{ width:44, height:44, objectFit:'cover', borderRadius:6, border:'1px solid #E8E4D9' }} /> : <span style={{ color:'#ccc', fontSize:'0.75rem' }}>—</span>}</td>
            <td style={{ ...tdSt, maxWidth:200 }}><a href={`/events/${ev.slug||ev._id}`} target="_blank" rel="noopener noreferrer" style={{ fontWeight:600, color:'#D4AF37', fontSize:'0.88rem' }}>{ev.title}</a></td>
            <td style={tdSt}><span style={{ fontSize:'0.82rem',color:'#555' }}>{ev.date?new Date(ev.date).toLocaleDateString():'-'}</span></td>
            <td style={tdSt}><span style={{ fontSize:'0.8rem' }}>{ev.category}</span></td>
            <td style={tdSt}><span style={{ background:ev.isUpcoming?'#DCFCE7':'#F3F4F6', color:ev.isUpcoming?'#16A34A':'#888', padding:'2px 8px', borderRadius:100, fontSize:'0.72rem', fontWeight:700 }}>{ev.isUpcoming?'Upcoming':'Past'}</span></td>
            <td style={tdSt}>{ev.popupEnabled?'✅':'—'}</td>
            <td style={{ ...tdSt, display:'flex', gap:6 }}>
              <Btn color="#2563EB" onClick={()=>edit(ev)}>Edit</Btn>
              <Btn color="#E74C3C" onClick={()=>del(ev._id)}>Delete</Btn>
            </td>
          </tr>
        ))}
      </Table>
      {paged.length===0 && <Empty text="No events yet" />}
      <Pagination page={page} pages={pages} setPage={setPage} />
    </div>
  );
}

// ── Gallery Tab ───────────────────────────────────────────
function GalleryTab({ images, refresh, showToast }) {
  const [galleryCats, setGalleryCats] = useState([]);
  const empty = { url:'', caption:'', altText:'', category:'', eventName:'' };
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filterCat, setFilterCat] = useState('All');
  const [page, setPage] = useState(1);
  const [bulkUploading, setBulkUploading] = useState(false);
  const [bulkProgress, setBulkProgress] = useState({ done: 0, total: 0 });
  const PER=12;
  const filtered = filterCat==='All' ? images : images.filter(i=>i.category===filterCat);
  const pages = Math.ceil(filtered.length/PER);
  const paged = filtered.slice((page-1)*PER, page*PER);

  // Load managed categories independently so the filter bar works even
  // before the Add form (and its CategoryManager) has been opened.
  useEffect(() => {
    fetch('/api/categories?type=gallery').then(r=>r.json()).then(d => setGalleryCats((d.data||[]).map(c=>c.name))).catch(()=>{});
  }, []);

  // Default a blank form's category to the first managed category once loaded
  useEffect(() => {
    if (galleryCats.length && !editing && !form.category) setForm(f => ({ ...f, category: galleryCats[0] }));
  }, [galleryCats]);

  // Bulk-add: pick one or more files, upload each to Cloudinary, create a
  // GalleryImage doc per file using the shared caption/category/eventName.
  const bulkFileRef = useRef(null);
  const handleBulkFiles = async (e) => {
    const files = Array.from(e.target.files || []).filter(f => f.type.startsWith('image/'));
    e.target.value = '';
    if (!files.length) return;
    setBulkUploading(true);
    setBulkProgress({ done: 0, total: files.length });
    let count = 0;
    try {
      for (const file of files) {
        const fd = new FormData();
        fd.append('file', file);
        fd.append('folder', 'gallery');
        const upRes = await fetch('/api/upload', { method:'POST', body:fd });
        const upData = await upRes.json();
        if (upRes.ok && upData.url) {
          const body = { url:upData.url, caption:form.caption, altText:form.altText, category:form.category, eventName:form.eventName };
          const res = await fetch('/api/gallery', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body) });
          if (res.ok) count++;
        }
        setBulkProgress(p => ({ ...p, done: p.done + 1 }));
      }
      if (count) showToast(`${count} image${count>1?'s':''} added!`);
      else showToast('Upload failed','error');
      setForm(empty); setShowForm(false); refresh();
    } catch { showToast('Upload failed','error'); }
    finally { setBulkUploading(false); setBulkProgress({ done:0, total:0 }); }
  };

  // Warn before leaving the page mid-upload — losing a 100+ photo batch
  // halfway through would be a frustrating surprise.
  useEffect(() => {
    if (!bulkUploading) return;
    const handler = (e) => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [bulkUploading]);

  const save = async () => {
    // Editing an existing entry: just update its fields (URL may have been replaced via ImageUploader)
    if (!form.url.trim()) { showToast('Please upload an image','error'); return; }
    const res = await fetch(`/api/gallery/${editing}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});
    if (res.ok) { showToast('Updated!'); setForm(empty); setEditing(null); setShowForm(false); refresh(); }
    else showToast('Error','error');
  };
  const del = async id => { if(!confirm('Delete image?'))return; await fetch(`/api/gallery/${id}`,{method:'DELETE'}); showToast('Deleted'); refresh(); };
  const edit = img => { setForm({url:img.url,caption:img.caption||'',altText:img.altText||'',category:img.category||'',eventName:img.eventName||''}); setEditing(img._id); setShowForm(true); window.scrollTo({top:0,behavior:'smooth'}); };

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:16, flexWrap:'wrap', gap:10 }}>
        <div style={{ display:'flex', gap:8, alignItems:'center', flexWrap:'wrap' }}>
          <h2 style={{ fontWeight:700, fontSize:'1rem' }}>Gallery ({images.length})</h2>
          <select value={filterCat} onChange={e=>{setFilterCat(e.target.value);setPage(1)}} style={selectSt}>
            <option>All</option>{galleryCats.map(c=><option key={c}>{c}</option>)}
          </select>
        </div>
        <button onClick={()=>{setShowForm(!showForm);setEditing(null);setForm(empty)}} style={addBtnSt}>{showForm?'Cancel':'+ Add Image'}</button>
      </div>

      {showForm && (
        <FormCard title={editing?'Edit Image':'Add Gallery Images'}>
          <CategoryManager type="gallery" showToast={showToast} onChange={setGalleryCats} />
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            {editing ? (
              <div style={{ gridColumn:'1/-1' }}>
                <ImageUploader label="Image" value={form.url} onChange={v=>setForm(f=>({...f,url:v}))} folder="gallery" showToast={showToast} />
              </div>
            ) : (
              <div style={{ gridColumn:'1/-1' }}>
                <label style={labelSt}>Photos</label>
                <p style={{ fontSize:'0.75rem', color:'#888', marginBottom:8 }}>Select one or more photos (100+ is fine). Pick the category below first — every photo you select gets uploaded to Cloudinary and added as its own gallery item in that category.</p>
                <input ref={bulkFileRef} type="file" accept="image/*" multiple onChange={handleBulkFiles} style={{ display:'none' }} />
                <button type="button" onClick={()=>bulkFileRef.current?.click()} disabled={bulkUploading} style={{
                  background: bulkUploading?'#ccc':'#1A1A2E', color:'#fff', border:'none', padding:'10px 18px', borderRadius:7,
                  fontWeight:700, cursor: bulkUploading?'not-allowed':'pointer', fontSize:'0.85rem',
                }}>{bulkUploading?`Uploading... (${bulkProgress.done}/${bulkProgress.total})`:'⬆ Select & Upload Photos'}</button>
                {bulkUploading && bulkProgress.total > 0 && (
                  <div style={{ marginTop:10, height:8, background:'#E8E4D9', borderRadius:100, overflow:'hidden', maxWidth:320 }}>
                    <div style={{ height:'100%', background:'#D4AF37', width:`${Math.round((bulkProgress.done/bulkProgress.total)*100)}%`, transition:'width 0.2s' }} />
                  </div>
                )}
              </div>
            )}
            <AF label="Category" type="select" value={form.category} onChange={v=>setForm(f=>({...f,category:v}))} options={galleryCats.length?galleryCats:['General']} />
            <AF label="Event Name" value={form.eventName} onChange={v=>setForm(f=>({...f,eventName:v}))} placeholder="e.g. Punjabi Film Fare Awards 2024" />
            <AF label="Caption" value={form.caption} onChange={v=>setForm(f=>({...f,caption:v}))} />
            <AF label="Alt Text (SEO)" value={form.altText} onChange={v=>setForm(f=>({...f,altText:v}))} />
          </div>
          {editing && <SaveBtn onClick={save} label="Update" />}
        </FormCard>
      )}

      {/* Grid view */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:14 }}>
        {paged.map(img=>(
          <div key={img._id} style={{ borderRadius:10, overflow:'hidden', border:'1px solid #E8E4D9', background:'#fff', position:'relative' }}>
            <img src={img.url} alt={img.altText||img.caption||'Gallery'} style={{ width:'100%', height:130, objectFit:'cover', display:'block' }} loading="lazy" onError={e=>{e.target.src='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="130"><rect fill="%23F3F0EA" width="200" height="130"/><text x="50%" y="50%" text-anchor="middle" fill="%23888" font-size="12">No Image</text></svg>'}} />
            <div style={{ padding:'10px 12px' }}>
              {img.caption && <p style={{ fontSize:'0.78rem', fontWeight:600, color:'#333', marginBottom:2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{img.caption}</p>}
              <p style={{ fontSize:'0.72rem', color:'#D4AF37', fontWeight:700 }}>{img.category}</p>
              <div style={{ display:'flex', gap:6, marginTop:8 }}>
                <Btn color="#2563EB" onClick={()=>edit(img)} sm>Edit</Btn>
                <Btn color="#E74C3C" onClick={()=>del(img._id)} sm>Del</Btn>
              </div>
            </div>
          </div>
        ))}
      </div>
      {paged.length===0 && <Empty text="No images yet. Add gallery images above." />}
      <Pagination page={page} pages={pages} setPage={setPage} />
    </div>
  );
}

// ── Enquiries Tab ─────────────────────────────────────────
function EnquiriesTab({ enquiries, refresh, showToast }) {
  const [expanded, setExpanded] = useState(null);
  const [page, setPage] = useState(1);
  const PER=15; const pages=Math.ceil(enquiries.length/PER); const paged=enquiries.slice((page-1)*PER,page*PER);

  const upd = async (id, status) => {
    await fetch(`/api/enquiries/${id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({status})});
    showToast('Status updated'); refresh();
  };
  const del = async id => { if(!confirm('Delete?'))return; await fetch(`/api/enquiries/${id}`,{method:'DELETE'}); showToast('Deleted'); refresh(); };

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:16, flexWrap:'wrap', gap:8 }}>
        <h2 style={{ fontWeight:700, fontSize:'1rem' }}>Enquiries ({enquiries.length})</h2>
        <div style={{ display:'flex', gap:8, fontSize:'0.8rem', color:'#888' }}>
          <span style={{ color:'#E74C3C', fontWeight:700 }}>{enquiries.filter(e=>e.status==='new').length} new</span>
          <span>·</span>
          <span>{enquiries.filter(e=>e.status==='replied').length} replied</span>
        </div>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {paged.map(e=>(
          <div key={e._id} style={{ background:'#fff', borderRadius:10, border:`1px solid ${e.status==='new'?'#FDE68A':'#E8E4D9'}`, overflow:'hidden' }}>
            <div style={{ padding:'12px 16px', display:'flex', justifyContent:'space-between', alignItems:'center', cursor:'pointer', gap:12 }} onClick={()=>setExpanded(expanded===e._id?null:e._id)}>
              <div style={{ display:'flex', gap:12, alignItems:'center', flexWrap:'wrap', flex:1 }}>
                <StatusBadge status={e.status} />
                <span style={{ fontWeight:700, fontSize:'0.9rem' }}>{e.name}</span>
                <span style={{ color:'#888', fontSize:'0.82rem' }}>{e.phone}</span>
                {e.eventType && <span style={{ fontSize:'0.78rem', color:'#D4AF37', fontWeight:600 }}>{e.eventType}</span>}
              </div>
              <span style={{ fontSize:'0.75rem', color:'#888', flexShrink:0 }}>{new Date(e.createdAt).toLocaleDateString()}</span>
              <span style={{ flexShrink:0 }}>{expanded===e._id?'▲':'▼'}</span>
            </div>
            {expanded===e._id && (
              <div style={{ padding:'0 16px 14px', borderTop:'1px solid #F3F0EA' }}>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:10, margin:'12px 0', fontSize:'0.85rem' }}>
                  <div><span style={{ color:'#888' }}>Email: </span><span style={{ fontWeight:600 }}>{e.email}</span></div>
                  {e.product && <div><span style={{ color:'#888' }}>Product: </span><span style={{ fontWeight:600 }}>{e.product}</span></div>}
                  {e.eventDate && <div><span style={{ color:'#888' }}>Event Date: </span><span style={{ fontWeight:600 }}>{e.eventDate}</span></div>}
                </div>
                {e.message && <p style={{ fontSize:'0.88rem', color:'#555', background:'#F8F7F4', padding:'10px 12px', borderRadius:7, marginBottom:12 }}>{e.message}</p>}
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  {e.status!=='read' && <Btn color="#2563EB" onClick={()=>upd(e._id,'read')}>Mark Read</Btn>}
                  {e.status!=='replied' && <Btn color="#059669" onClick={()=>upd(e._id,'replied')}>Mark Replied</Btn>}
                  <Btn color="#E74C3C" onClick={()=>del(e._id)}>Delete</Btn>
                  <a href={`tel:${e.phone}`} style={{ ...bStyle('#D4AF37'), color:'#1A1A2E', textDecoration:'none' }}>📞 Call</a>
                  <a href={`mailto:${e.email}`} style={{ ...bStyle('#7C3AED'), textDecoration:'none' }}>✉️ Email</a>
                </div>
              </div>
            )}
          </div>
        ))}
        {paged.length===0 && <Empty text="No enquiries yet" />}
      </div>
      <Pagination page={page} pages={pages} setPage={setPage} />
    </div>
  );
}

// ── Contacts Tab ──────────────────────────────────────────
function ContactsTab({ contacts, refresh, showToast }) {
  const [expanded, setExpanded] = useState(null);
  const [page, setPage] = useState(1);
  const PER=15; const pages=Math.ceil(contacts.length/PER); const paged=contacts.slice((page-1)*PER,page*PER);

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:16 }}>
        <h2 style={{ fontWeight:700, fontSize:'1rem' }}>Contact Messages ({contacts.length})</h2>
        <span style={{ fontSize:'0.8rem', color:'#E74C3C', fontWeight:700 }}>{contacts.filter(c=>c.status==='new').length} new</span>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {paged.map(c=>(
          <div key={c._id} style={{ background:'#fff', borderRadius:10, border:`1px solid ${c.status==='new'?'#FDE68A':'#E8E4D9'}`, overflow:'hidden' }}>
            <div style={{ padding:'12px 16px', display:'flex', justifyContent:'space-between', alignItems:'center', cursor:'pointer', gap:12 }} onClick={()=>setExpanded(expanded===c._id?null:c._id)}>
              <div style={{ display:'flex', gap:12, alignItems:'center', flexWrap:'wrap', flex:1 }}>
                <StatusBadge status={c.status} />
                <span style={{ fontWeight:700, fontSize:'0.9rem' }}>{c.name}</span>
                <span style={{ color:'#888', fontSize:'0.82rem' }}>{c.email}</span>
                {c.subject && <span style={{ fontSize:'0.8rem', color:'#555', fontStyle:'italic' }}>{c.subject}</span>}
              </div>
              <span style={{ fontSize:'0.75rem', color:'#888', flexShrink:0 }}>{new Date(c.createdAt).toLocaleDateString()}</span>
              <span>{expanded===c._id?'▲':'▼'}</span>
            </div>
            {expanded===c._id && (
              <div style={{ padding:'0 16px 14px', borderTop:'1px solid #F3F0EA' }}>
                <p style={{ fontSize:'0.88rem', color:'#555', background:'#F8F7F4', padding:'10px 12px', borderRadius:7, margin:'12px 0' }}>{c.message}</p>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <a href={`mailto:${c.email}`} style={{ ...bStyle('#059669'), textDecoration:'none' }}>✉️ Reply by Email</a>
                  {c.phone && <a href={`tel:${c.phone}`} style={{ ...bStyle('#D4AF37'), color:'#1A1A2E', textDecoration:'none' }}>📞 Call</a>}
                </div>
              </div>
            )}
          </div>
        ))}
        {paged.length===0 && <Empty text="No contact messages yet" />}
      </div>
      <Pagination page={page} pages={pages} setPage={setPage} />
    </div>
  );
}

// ── CMS Pages Tab ─────────────────────────────────────────
function PagesTab({ pages, refresh, showToast }) {
  const empty = { slug:'', title:'', htmlContent:'', pageType:'cms', metaTitle:'', metaDesc:'', published:true, showInFooter:false, popupEnabled:false, popupContent:'' };
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const save = async () => {
    if (!form.slug.trim()||!form.title.trim()) { showToast('Slug and title required','error'); return; }
    const method = editing?'PUT':'POST';
    const url = editing?`/api/admin/pages/${editing}`:'/api/admin/pages';
    const res = await fetch(url,{method,headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});
    if (res.ok) { showToast(editing?'Updated!':'Created!'); setForm(empty); setEditing(null); setShowForm(false); refresh(); }
    else { const d=await res.json(); showToast(d.error||'Error','error'); }
  };
  const del = async id => { if(!confirm('Delete?'))return; await fetch(`/api/admin/pages/${id}`,{method:'DELETE'}); showToast('Deleted'); refresh(); };
  const edit = pg => {
    setForm({ slug:pg.slug, title:pg.title, htmlContent:pg.htmlContent||'', pageType:pg.pageType||'cms', metaTitle:pg.metaTitle||'', metaDesc:pg.metaDesc||'', published:pg.published, showInFooter:pg.showInFooter||false, popupEnabled:pg.popupEnabled||false, popupContent:pg.popupContent||'' });
    setEditing(pg._id); setShowForm(true); window.scrollTo({top:0,behavior:'smooth'});
  };

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:16 }}>
        <h2 style={{ fontWeight:700, fontSize:'1rem' }}>CMS Pages ({pages.length})</h2>
        <button onClick={()=>{setShowForm(!showForm);setEditing(null);setForm(empty)}} style={addBtnSt}>{showForm?'Cancel':'+ New Page'}</button>
      </div>

      {showForm && (
        <FormCard title={editing?'Edit Page':'Create CMS Page'}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <AF label="Slug (URL path) *" value={form.slug} onChange={v=>setForm(f=>({...f,slug:v}))} placeholder="e.g. privacy-policy" />
            <AF label="Title *" value={form.title} onChange={v=>setForm(f=>({...f,title:v}))} />
            <AF label="Page Type" type="select" value={form.pageType} onChange={v=>setForm(f=>({...f,pageType:v}))} options={['cms','policy','service']} />
            <AF label="Meta Title (SEO)" value={form.metaTitle} onChange={v=>setForm(f=>({...f,metaTitle:v}))} />
            <AF label="Meta Description (SEO)" type="textarea" value={form.metaDesc} onChange={v=>setForm(f=>({...f,metaDesc:v}))} span style={{ minHeight:60 }} />
            <div style={{ gridColumn:'1/-1' }}>
              <label style={labelSt}>Page Content (HTML Rich Editor)</label>
              <RichEditor value={form.htmlContent} onChange={v=>setForm(f=>({...f,htmlContent:v}))} height={280} />
            </div>
            <div style={{ gridColumn:'1/-1', display:'flex', gap:20, flexWrap:'wrap' }}>
              <CbField label="Published" checked={form.published} onChange={v=>setForm(f=>({...f,published:v}))} />
              <CbField label="Show in Footer" checked={form.showInFooter} onChange={v=>setForm(f=>({...f,showInFooter:v}))} />
              <CbField label="Enable Popup" checked={form.popupEnabled} onChange={v=>setForm(f=>({...f,popupEnabled:v}))} />
            </div>
            {form.popupEnabled && (
              <div style={{ gridColumn:'1/-1' }}>
                <label style={labelSt}>Popup Content (HTML)</label>
                <RichEditor value={form.popupContent} onChange={v=>setForm(f=>({...f,popupContent:v}))} height={140} />
              </div>
            )}
          </div>
          <SaveBtn onClick={save} label={editing?'Update Page':'Create Page'} />
        </FormCard>
      )}

      <div style={{ background:'#fff', borderRadius:12, border:'1px solid #E8E4D9', overflow:'hidden' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.85rem' }}>
          <thead><tr style={{ background:'#F8F7F4' }}>
            {['Slug','Title','Type','Footer','Status','Actions'].map(h=><th key={h} style={{ padding:'10px 14px', textAlign:'left', fontWeight:700, fontSize:'0.78rem', color:'#888' }}>{h}</th>)}
          </tr></thead>
          <tbody>
            {pages.map(pg=>(
              <tr key={pg._id} style={{ borderTop:'1px solid #F3F0EA' }}>
                <td style={tdSt}><a href={`/cms/${pg.slug}`} target="_blank" rel="noopener noreferrer" style={{ fontFamily:'monospace', fontSize:'0.82rem', color:'#D4AF37' }}>/{pg.slug}</a></td>
                <td style={{ ...tdSt, fontWeight:600 }}>{pg.title}</td>
                <td style={tdSt}><span style={{ fontSize:'0.78rem', color:'#555', textTransform:'capitalize' }}>{pg.pageType}</span></td>
                <td style={tdSt}>{pg.showInFooter?'✅':'—'}</td>
                <td style={tdSt}><span style={{ background:pg.published?'#DCFCE7':'#F3F4F6', color:pg.published?'#16A34A':'#888', padding:'2px 8px', borderRadius:100, fontSize:'0.72rem', fontWeight:700 }}>{pg.published?'Live':'Draft'}</span></td>
                <td style={{ ...tdSt, display:'flex', gap:6 }}>
                  <Btn color="#2563EB" onClick={()=>edit(pg)}>Edit</Btn>
                  <Btn color="#E74C3C" onClick={()=>del(pg._id)}>Delete</Btn>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {pages.length===0 && <Empty text="No pages yet" />}
      </div>
    </div>
  );
}

// ── Stats Tab ─────────────────────────────────────────────
function StatsTab({ stats, refresh, showToast }) {
  const [localStats, setLocalStats] = useState(stats);
  useEffect(() => setLocalStats(stats), [stats]);

  const save = async () => {
    const res = await fetch('/api/stats',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({stats:localStats})});
    if (res.ok) { showToast('Stats saved!'); refresh(); }
    else showToast('Error','error');
  };
  const addStat = () => setLocalStats(s=>[...s,{key:`stat_${Date.now()}`,label:'New Stat',value:'0',icon:'📊',order:s.length+1,visible:true}]);

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:16, flexWrap:'wrap', gap:10 }}>
        <div>
          <h2 style={{ fontWeight:700, fontSize:'1rem' }}>Homepage Stats</h2>
          <p style={{ fontSize:'0.82rem', color:'#888', marginTop:4 }}>These numbers appear in the hero section of the homepage.</p>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <button onClick={addStat} style={{ ...addBtnSt, background:'#16A34A' }}>+ Add Stat</button>
          <button onClick={save} style={addBtnSt}>Save All</button>
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:16 }}>
        {localStats.map((st,i)=>(
          <div key={st.key||i} style={{ background:'#fff', borderRadius:12, padding:20, border:'1px solid #E8E4D9' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              <AF label="Value" value={st.value} onChange={v=>setLocalStats(s=>s.map((x,j)=>j===i?{...x,value:v}:x))} />
              <AF label="Icon (emoji)" value={st.icon||''} onChange={v=>setLocalStats(s=>s.map((x,j)=>j===i?{...x,icon:v}:x))} />
              <AF label="Label" value={st.label} onChange={v=>setLocalStats(s=>s.map((x,j)=>j===i?{...x,label:v}:x))} span />
              <div style={{ gridColumn:'1/-1', display:'flex', gap:16, alignItems:'center' }}>
                <CbField label="Visible" checked={st.visible!==false} onChange={v=>setLocalStats(s=>s.map((x,j)=>j===i?{...x,visible:v}:x))} />
                <button onClick={()=>setLocalStats(s=>s.filter((_,j)=>j!==i))} style={{ background:'none', border:'none', color:'#E74C3C', cursor:'pointer', fontSize:'0.82rem', fontWeight:700 }}>Remove</button>
              </div>
            </div>
            {/* Preview */}
            <div style={{ background:'#F8F7F4', borderRadius:8, padding:12, marginTop:12, textAlign:'center' }}>
              <div style={{ fontSize:'1.6rem', fontWeight:900, color:'#D4AF37' }}>{st.value}</div>
              <div style={{ fontSize:'0.78rem', color:'#888', fontWeight:600 }}>{st.icon} {st.label}</div>
            </div>
          </div>
        ))}
      </div>
      {localStats.length===0 && <Empty text="No stats. Add some above." />}
    </div>
  );
}

// ── Settings Tab ──────────────────────────────────────────
function SettingsTab({ settings, refresh, showToast }) {
  const [local, setLocal] = useState(settings);
  const [activeGroup, setActiveGroup] = useState('general');
  useEffect(() => setLocal(settings), [settings]);

  const GROUPS = [
    { id:'general', label:'🏢 General' },
    { id:'contact', label:'📞 Contact' },
    { id:'social',  label:'🔗 Social Media' },
    { id:'theme',   label:'🎨 Theme Colors' },
    { id:'content', label:'✏️ Content' },
  ];

  const FIELDS = {
    general: [
      { key:'site_name', label:'Site Name' },
      { key:'tagline',   label:'Tagline' },
      { key:'logo_text', label:'Logo Text (shown if no logo image)' },
      { key:'logo_url',  label:'Logo Image URL', hint:'Paste URL of your logo image (PNG/SVG). Leave blank to use text logo.' },
    ],
    contact: [
      { key:'phone1', label:'Phone 1' },
      { key:'phone2', label:'Phone 2' },
      { key:'phone3', label:'Phone 3' },
      { key:'email',  label:'Email Address' },
      { key:'address',label:'Full Address', textarea:true },
      { key:'website',label:'Website URL' },
      { key:'whatsapp',label:'WhatsApp Number (digits only)' },
      { key:'maps_embed',label:'Google Maps Embed URL', hint:'Paste the "src" URL from Google Maps embed iframe' },
    ],
    social: [
      { key:'facebook', label:'Facebook Page URL' },
      { key:'instagram',label:'Instagram Profile URL' },
      { key:'youtube',  label:'YouTube Channel URL' },
    ],
    theme: [
      { key:'color_primary',   label:'Primary Color (Gold)', type:'color' },
      { key:'color_secondary', label:'Secondary Color (Navy)', type:'color' },
      { key:'color_accent',    label:'Accent Color (Red)', type:'color' },
      { key:'color_bg',        label:'Background Color', type:'color' },
      { key:'color_bg_alt',    label:'Alt Background Color', type:'color' },
      { key:'color_text',      label:'Text Color', type:'color' },
    ],
    content: [
      { key:'hero_heading', label:'Hero Section Heading', textarea:true },
      { key:'hero_subtext', label:'Hero Section Subtext', textarea:true },
      { key:'about_text',   label:'About Us Text', textarea:true },
    ],
  };

  const set = (key, value) => setLocal(l => ({ ...l, [key]: value }));

  const save = async () => {
    const settings = Object.entries(local).map(([key, value]) => ({ key, value }));
    const res = await fetch('/api/settings',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({settings})});
    if (res.ok) { showToast('Settings saved! Refresh site to see changes.'); refresh(); }
    else showToast('Error saving settings','error');
  };

  const fields = FIELDS[activeGroup] || [];

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:16, flexWrap:'wrap', gap:10 }}>
        <h2 style={{ fontWeight:700, fontSize:'1rem' }}>Site Settings</h2>
        <button onClick={save} style={addBtnSt}>💾 Save Settings</button>
      </div>

      <div style={{ display:'flex', gap:0, marginBottom:20, background:'#fff', borderRadius:10, border:'1px solid #E8E4D9', overflow:'hidden' }}>
        {GROUPS.map(g=>(
          <button key={g.id} onClick={()=>setActiveGroup(g.id)} style={{
            flex:1, padding:'10px 8px', border:'none', cursor:'pointer', fontSize:'0.8rem', fontWeight:700,
            background: activeGroup===g.id ? '#D4AF37' : 'transparent',
            color: activeGroup===g.id ? '#1A1A2E' : '#555',
            borderRight:'1px solid #E8E4D9', transition:'all 0.15s',
          }}>{g.label}</button>
        ))}
      </div>

      <div style={{ background:'#fff', borderRadius:12, padding:24, border:'1px solid #E8E4D9' }}>
        {/* Logo preview */}
        {activeGroup==='general' && local.logo_url && (
          <div style={{ marginBottom:20, padding:16, background:'#F8F7F4', borderRadius:8 }}>
            <p style={{ fontSize:'0.8rem', fontWeight:600, color:'#888', marginBottom:8 }}>Logo Preview:</p>
            <img src={local.logo_url} alt="Logo" style={{ height:52, objectFit:'contain' }} onError={e=>e.target.style.display='none'} />
          </div>
        )}
        {/* Color swatches preview */}
        {activeGroup==='theme' && (
          <div style={{ display:'flex', gap:10, marginBottom:20, flexWrap:'wrap' }}>
            {['color_primary','color_secondary','color_accent','color_bg'].map(k=>(
              <div key={k} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                <div style={{ width:44, height:44, borderRadius:8, background:local[k]||'#ccc', border:'1px solid #E8E4D9', boxShadow:'0 1px 3px rgba(0,0,0,0.1)' }} />
                <span style={{ fontSize:'0.68rem', color:'#888' }}>{local[k]||''}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          {fields.map(f => (
            <div key={f.key} style={{ gridColumn: f.textarea ? '1/-1' : undefined }}>
              <label style={labelSt}>{f.label}</label>
              {f.hint && <p style={{ fontSize:'0.75rem', color:'#888', marginBottom:5 }}>{f.hint}</p>}
              {f.type==='color' ? (
                <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                  <input type="color" value={local[f.key]||'#000000'} onChange={e=>set(f.key,e.target.value)} style={{ width:48, height:36, padding:2, border:'1.5px solid #E8E4D9', borderRadius:6, cursor:'pointer' }} />
                  <input type="text" value={local[f.key]||''} onChange={e=>set(f.key,e.target.value)} style={{ ...inputSt, flex:1 }} placeholder="#000000" />
                </div>
              ) : f.textarea ? (
                <textarea value={local[f.key]||''} onChange={e=>set(f.key,e.target.value)} style={{ ...inputSt, minHeight:80, resize:'vertical' }} />
              ) : (
                <input type="text" value={local[f.key]||''} onChange={e=>set(f.key,e.target.value)} style={inputSt} />
              )}
            </div>
          ))}
        </div>
        <div style={{ marginTop:20 }}>
          <button onClick={save} style={addBtnSt}>💾 Save Settings</button>
        </div>
      </div>
    </div>
  );
}

// ── Shared helpers ────────────────────────────────────────
function Table({ headers, children }) {
  return (
    <div style={{ background:'#fff', borderRadius:12, border:'1px solid #E8E4D9', overflow:'hidden', overflowX:'auto' }}>
      <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.85rem', minWidth:500 }}>
        <thead><tr style={{ background:'#F8F7F4' }}>
          {headers.map(h=><th key={h} style={{ padding:'10px 14px', textAlign:'left', fontWeight:700, fontSize:'0.78rem', color:'#888', whiteSpace:'nowrap' }}>{h}</th>)}
        </tr></thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
function Pagination({ page, pages, setPage }) {
  if (pages<=1) return null;
  return (
    <div style={{ display:'flex', gap:8, justifyContent:'center', marginTop:20, flexWrap:'wrap' }}>
      {Array.from({length:pages},(_,i)=>i+1).map(p=>(
        <button key={p} onClick={()=>setPage(p)} style={{ width:32, height:32, borderRadius:6, border:'1px solid', fontWeight:700, fontSize:'0.82rem', cursor:'pointer', background:page===p?'#D4AF37':'#fff', borderColor:page===p?'#D4AF37':'#E8E4D9', color:page===p?'#1A1A2E':'#555' }}>{p}</button>
      ))}
    </div>
  );
}
function StatusBadge({ status }) {
  const map={new:['#FDE68A','#92400E','NEW'],read:['#DBEAFE','#1D4ED8','READ'],replied:['#DCFCE7','#16A34A','REPLIED']};
  const [bg,color,label]=map[status]||map.new;
  return <span style={{ background:bg,color,padding:'2px 8px',borderRadius:100,fontSize:'0.7rem',fontWeight:800,flexShrink:0 }}>{label}</span>;
}
function AF({ label, value, onChange, type='text', options, span, placeholder, hint }) {
  const base = { ...inputSt };
  return (
    <div style={{ gridColumn:span?'1/-1':undefined }}>
      <label style={labelSt}>{label}</label>
      {hint && <p style={{ fontSize:'0.72rem', color:'#888', marginBottom:4 }}>{hint}</p>}
      {type==='select' ? (
        <select value={value} onChange={e=>onChange(e.target.value)} style={base}>
          {options.map(o=><option key={o} value={o}>{o}</option>)}
        </select>
      ) : type==='textarea' ? (
        <textarea value={value} onChange={e=>onChange(e.target.value)} rows={3} style={{ ...base, resize:'vertical' }} placeholder={placeholder} />
      ) : (
        <input type={type} value={value} onChange={e=>onChange(e.target.value)} style={base} placeholder={placeholder} />
      )}
    </div>
  );
}
function CbField({ label, checked, onChange }) {
  return (
    <label style={{ display:'flex', gap:8, alignItems:'center', fontSize:'0.88rem', fontWeight:600, cursor:'pointer' }}>
      <input type="checkbox" checked={checked} onChange={e=>onChange(e.target.checked)} style={{ width:16, height:16 }} />{label}
    </label>
  );
}
function FormCard({ title, children }) {
  return (
    <div style={{ background:'#fff', borderRadius:12, padding:22, marginBottom:20, border:'1px solid #E8E4D9', boxShadow:'0 2px 8px rgba(0,0,0,0.05)' }}>
      <h3 style={{ fontWeight:700, marginBottom:16, fontSize:'0.95rem' }}>{title}</h3>
      {children}
    </div>
  );
}
function SaveBtn({ onClick, label }) {
  return <button onClick={onClick} style={{ background:'#D4AF37', color:'#1A1A2E', border:'none', padding:'10px 24px', borderRadius:8, fontWeight:700, cursor:'pointer', marginTop:16 }}>{label}</button>;
}
function Btn({ color, onClick, children, sm }) {
  return <button onClick={onClick} style={{ ...bStyle(color), fontSize: sm?'0.75rem':'0.82rem', padding: sm?'4px 10px':'6px 14px' }}>{children}</button>;
}
function Empty({ text }) {
  return <div style={{ textAlign:'center', padding:'32px 24px', color:'#888', fontSize:'0.9rem' }}>{text}</div>;
}
function bStyle(bg) {
  return { background:bg, color:'#fff', border:'none', padding:'6px 14px', borderRadius:6, fontWeight:600, cursor:'pointer', fontSize:'0.82rem' };
}
const inputSt = { width:'100%', padding:'9px 12px', border:'1.5px solid #E8E4D9', borderRadius:7, fontSize:'0.88rem', outline:'none', background:'#F8F7F4', color:'#1A1A2E' };
const labelSt = { fontSize:'0.78rem', fontWeight:700, display:'block', marginBottom:5, color:'#555', textTransform:'uppercase', letterSpacing:'0.05em' };
const selectSt = { padding:'6px 12px', border:'1.5px solid #E8E4D9', borderRadius:7, fontSize:'0.85rem', background:'#fff', cursor:'pointer' };
const addBtnSt = { background:'#D4AF37', color:'#1A1A2E', border:'none', padding:'9px 18px', borderRadius:8, fontWeight:700, cursor:'pointer', fontSize:'0.85rem' };
const tdSt = { padding:'10px 14px', verticalAlign:'middle' };
