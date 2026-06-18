import { useState } from 'react';
import PopupModal from './PopupModal';
import Toast from './Toast';

export function ContactModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ name:'', email:'', phone:'', subject:'', message:'' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };
  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const onSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({}); setLoading(true);
    try {
      const res = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) });
      if (res.ok) {
        setToast({ message:"Message sent! We'll get back to you soon.", type:'success' });
        setForm({ name:'', email:'', phone:'', subject:'', message:'' });
        setTimeout(() => { onClose(); setToast(null); }, 1400);
      } else throw new Error();
    } catch { setToast({ message:'Failed to send. Please call us directly.', type:'error' }); }
    finally { setLoading(false); }
  };

  const inp = { width:'100%', padding:'10px 13px', border:'1.5px solid var(--color-border)', borderRadius:'var(--radius-sm)', background:'var(--color-white)', color:'var(--color-text)', fontSize:'0.92rem', outline:'none', fontFamily:'inherit' };

  return (
    <PopupModal isOpen={isOpen} onClose={onClose} title="Contact Us">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
        <Fld label="Your Name *" error={errors.name}><input name="name" value={form.name} onChange={onChange} style={inp} placeholder="Full Name" /></Fld>
        <Fld label="Phone"><input name="phone" value={form.phone} onChange={onChange} style={inp} placeholder="Mobile Number" /></Fld>
        <Fld label="Email *" error={errors.email} span><input name="email" type="email" value={form.email} onChange={onChange} style={inp} placeholder="your@email.com" /></Fld>
        <Fld label="Subject" span><input name="subject" value={form.subject} onChange={onChange} style={inp} placeholder="What is this about?" /></Fld>
        <Fld label="Message *" error={errors.message} span><textarea name="message" value={form.message} onChange={onChange} style={{ ...inp, resize:'vertical', minHeight:90 }} placeholder="Your message..." /></Fld>
      </div>
      <button onClick={onSubmit} disabled={loading} style={{ width:'100%', marginTop:16, padding:'12px', background:'var(--color-primary)', color:'var(--color-secondary)', border:'none', borderRadius:'var(--radius-md)', fontWeight:700, fontSize:'0.97rem', cursor:loading?'not-allowed':'pointer', opacity:loading?0.7:1, fontFamily:'inherit' }}>
        {loading ? 'Sending...' : 'Send Message →'}
      </button>
    </PopupModal>
  );
}

function Fld({ label, error, children, span }) {
  return (
    <div style={{ gridColumn: span?'1/-1':undefined }}>
      <label style={{ display:'block', fontSize:'0.83rem', fontWeight:600, marginBottom:5, color:'var(--color-text)' }}>{label}</label>
      {children}
      {error && <p style={{ fontSize:'0.78rem', color:'var(--color-error)', marginTop:3 }}>{error}</p>}
    </div>
  );
}

// Floating action button that opens the contact modal — fixed bottom-right,
// purely additive so it never disturbs existing Navbar/Footer markup.
export function ContactFAB({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Contact Us"
      style={{
        position:'fixed', bottom:24, right:24, zIndex:900,
        background:'var(--color-primary)', color:'var(--color-secondary)',
        border:'none', borderRadius:100, padding:'13px 22px',
        fontWeight:800, fontSize:'0.85rem', letterSpacing:'0.02em',
        boxShadow:'0 8px 24px rgba(0,0,0,0.25)', cursor:'pointer',
        display:'flex', alignItems:'center', gap:8,
      }}
    >💬 Contact</button>
  );
}
