import { useState } from 'react';
import Toast from './Toast';

export default function EnquiryForm({ compact, defaultProduct }) {
  const [form, setForm] = useState({ name:'', email:'', phone:'', product:defaultProduct||'', eventDate:'', eventType:'', message:'' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim() || form.phone.replace(/\D/g,'').length < 10) e.phone = 'Valid phone required';
    return e;
  };
  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const onSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({}); setLoading(true);
    try {
      const res = await fetch('/api/enquiries', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) });
      if (res.ok) { setToast({ message:"Enquiry sent! We'll contact you within 24 hours.", type:'success' }); setForm({ name:'', email:'', phone:'', product:'', eventDate:'', eventType:'', message:'' }); }
      else throw new Error();
    } catch { setToast({ message:'Failed to send. Please call us directly.', type:'error' }); }
    finally { setLoading(false); }
  };

  const inp = { width:'100%', padding:'10px 13px', border:'1.5px solid var(--color-border)', borderRadius:'var(--radius-sm)', background:'var(--color-white)', color:'var(--color-text)', fontSize:'0.92rem', outline:'none', fontFamily:'inherit' };
  const col2 = { display:'grid', gridTemplateColumns: compact?'1fr':'1fr 1fr', gap:12 };

  return (
    <div>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <div style={col2}>
        <Fld label="Name *" error={errors.name}><input name="name" value={form.name} onChange={onChange} style={inp} placeholder="Full Name" /></Fld>
        <Fld label="Phone *" error={errors.phone}><input name="phone" value={form.phone} onChange={onChange} style={inp} placeholder="Mobile Number" /></Fld>
        <Fld label="Email *" error={errors.email} span><input name="email" type="email" value={form.email} onChange={onChange} style={inp} placeholder="your@email.com" /></Fld>
        <Fld label="Event Type">
          <select name="eventType" value={form.eventType} onChange={onChange} style={inp}>
            <option value="">Select Event Type</option>
            {['Wedding','Sangeet','Corporate','Concert','College Event','Government Event','Other'].map(t=><option key={t}>{t}</option>)}
          </select>
        </Fld>
        <Fld label="Event Date"><input name="eventDate" type="date" value={form.eventDate} onChange={onChange} style={inp} /></Fld>
        {!compact && <Fld label="Equipment / Product" span><input name="product" value={form.product} onChange={onChange} style={inp} placeholder="e.g. JBL VTX A12, grandMA3..." /></Fld>}
        <Fld label="Message" span><textarea name="message" value={form.message} onChange={onChange} style={{ ...inp, resize:'vertical', minHeight: compact?72:100 }} placeholder="Tell us about your event requirements..." /></Fld>
      </div>
      <button onClick={onSubmit} disabled={loading} style={{ width:'100%', marginTop:4, padding:'12px', background:'var(--color-primary)', color:'var(--color-secondary)', border:'none', borderRadius:'var(--radius-md)', fontWeight:700, fontSize:'0.97rem', cursor:loading?'not-allowed':'pointer', opacity:loading?0.7:1, fontFamily:'inherit' }}>
        {loading ? 'Sending...' : 'Send Enquiry →'}
      </button>
    </div>
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
