import { useState } from 'react';
import Layout from '../components/Layout';
import Toast from '../components/Toast';
import { getCommonProps } from '../lib/pageProps';

export default function ContactPage({ site, footerPages }) {
  const s = site || {};
  const phones = [s.phone2, s.phone3].filter(Boolean);
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
      if (res.ok) { setToast({ message:"Message sent! We'll get back to you soon.", type:'success' }); setForm({ name:'', email:'', phone:'', subject:'', message:'' }); }
      else throw new Error();
    } catch { setToast({ message:'Failed to send. Please call us directly.', type:'error' }); }
    finally { setLoading(false); }
  };

  return (
    <Layout site={s} footerPages={footerPages} title="Contact Us"
      description={`Contact ${s.name||'Pro Audio Solution'} Delhi — get a free quote for PA systems, lighting, LED walls & event production. Call ${s.phone2||'9810257891'}.`}
    >
      {toast && <Toast {...toast} onClose={()=>setToast(null)} />}

      <section style={{ background:'linear-gradient(135deg, var(--color-secondary), #0f3460)', padding:'64px 0 52px' }}>
        <div className="container">
          <div className="badge" style={{ background:'rgba(212,175,55,0.15)', borderColor:'rgba(212,175,55,0.4)', color:'var(--color-primary)' }}>Get In Touch</div>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2rem,4vw,3rem)', color:'var(--color-white)', fontWeight:800, margin:'12px 0 12px' }}>Contact Us</h1>
          <p style={{ color:'rgba(255,255,255,0.65)', maxWidth:500 }}>Ready to plan your event? Reach out — our team responds within hours, available 24×7.</p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1.5fr', gap:56, alignItems:'start' }}>
            <div>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'1.8rem', fontWeight:800, marginBottom:8 }}>Let&apos;s Talk</h2>
              <div className="gold-divider" />
              <p style={{ color:'var(--color-text-light)', lineHeight:1.75, marginBottom:32 }}>
                Available 24×7 for all event enquiries. Call us directly for immediate assistance, or fill the form and we&apos;ll get back to you.
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                {phones.map(p => (
                  <InfoCard key={p} icon="📞" title="Phone">
                    <a href={`tel:${p}`} style={{ color:'var(--color-primary)', fontWeight:700, fontSize:'1rem' }}>{p}</a>
                  </InfoCard>
                ))}
                {s.email && (
                  <InfoCard icon="✉️" title="Email">
                    <a href={`mailto:${s.email}`} style={{ color:'var(--color-primary)' }}>{s.email}</a>
                  </InfoCard>
                )}
                {s.whatsapp && (
                  <InfoCard icon="💬" title="WhatsApp">
                    <a href={`https://wa.me/${s.whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ color:'var(--color-primary)', fontWeight:600 }}>Chat on WhatsApp</a>
                  </InfoCard>
                )}
                {s.website && (
                  <InfoCard icon="🌐" title="Website">
                    <a href={`https://${s.website}`} style={{ color:'var(--color-primary)' }} target="_blank" rel="noopener noreferrer">{s.website}</a>
                  </InfoCard>
                )}
                {s.address && (
                  <InfoCard icon="📍" title="Address">
                    <span style={{ color:'var(--color-text-light)' }}>{s.address}</span>
                  </InfoCard>
                )}
                <InfoCard icon="⏰" title="Availability">
                  <span style={{ color:'var(--color-success)', fontWeight:700 }}>24 × 7 — Always Available</span>
                </InfoCard>
              </div>
            </div>

            <div style={{ background:'var(--color-bg-alt)', borderRadius:'var(--radius-xl)', padding:'36px 32px', border:'1px solid var(--color-border)' }}>
              <h3 style={{ fontWeight:800, fontSize:'1.25rem', marginBottom:24 }}>Send a Message</h3>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                <FormField label="Your Name *" name="name" value={form.name} onChange={onChange} error={errors.name} />
                <FormField label="Phone" name="phone" value={form.phone} onChange={onChange} />
                <FormField label="Email *" name="email" type="email" value={form.email} onChange={onChange} error={errors.email} span />
                <FormField label="Subject" name="subject" value={form.subject} onChange={onChange} span />
                <FormField label="Message *" name="message" value={form.message} onChange={onChange} error={errors.message} span textarea />
              </div>
              <button onClick={onSubmit} disabled={loading} className="btn btn-primary" style={{ width:'100%', justifyContent:'center', marginTop:8 }}>
                {loading ? 'Sending...' : 'Send Message →'}
              </button>
            </div>
          </div>
          <style>{`@media(max-width:768px){div[style*="grid-template-columns: 1fr 1.5fr"]{grid-template-columns:1fr!important}}`}</style>
        </div>
      </section>

      {/* Map */}
      <section style={{ background:'var(--color-bg-section)', padding:'48px 0' }}>
        <div className="container">
          {s.mapsEmbed ? (
            <div style={{ borderRadius:'var(--radius-xl)', overflow:'hidden', border:'1px solid var(--color-border)', height:340 }}>
              <iframe src={s.mapsEmbed} width="100%" height="340" style={{ border:0, display:'block' }} allowFullScreen loading="lazy" title="Location Map" />
            </div>
          ) : (
            <div style={{ borderRadius:'var(--radius-xl)', overflow:'hidden', border:'1px solid var(--color-border)', height:280, background:'var(--color-bg-alt)', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:10 }}>
              <div style={{ fontSize:'3rem' }}>📍</div>
              <h3 style={{ fontWeight:700 }}>{s.address || 'Nathan Vihar, Ranhola, Delhi'}</h3>
              <a href={`https://maps.google.com/?q=${encodeURIComponent(s.address||'Ranhola Delhi')}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline-gold btn-sm">Open in Google Maps</a>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

function InfoCard({ icon, title, children }) {
  return (
    <div style={{ display:'flex', gap:14, padding:'14px 16px', background:'var(--color-white)', borderRadius:'var(--radius-md)', border:'1px solid var(--color-border)' }}>
      <div style={{ width:38, height:38, borderRadius:'50%', background:'rgba(212,175,55,0.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1rem', flexShrink:0 }}>{icon}</div>
      <div>
        <div style={{ fontSize:'0.75rem', fontWeight:700, color:'var(--color-text-muted)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:3 }}>{title}</div>
        <div style={{ fontSize:'0.9rem' }}>{children}</div>
      </div>
    </div>
  );
}

function FormField({ label, name, value, onChange, error, span, textarea, type='text' }) {
  const base = { width:'100%', padding:'10px 14px', border:'1.5px solid var(--color-border)', borderRadius:'var(--radius-sm)', background:'var(--color-white)', color:'var(--color-text)', fontSize:'0.92rem', transition:'var(--transition)', outline:'none' };
  return (
    <div style={{ gridColumn:span?'1/-1':undefined }}>
      <label style={{ display:'block', fontSize:'0.85rem', fontWeight:600, marginBottom:5, color:'var(--color-text)' }}>{label}</label>
      {textarea
        ? <textarea name={name} value={value} onChange={onChange} rows={4} style={{ ...base, resize:'vertical' }} />
        : <input type={type} name={name} value={value} onChange={onChange} style={base} />
      }
      {error && <p style={{ fontSize:'0.8rem', color:'var(--color-error)', marginTop:3 }}>{error}</p>}
    </div>
  );
}

export async function getServerSideProps() {
  try { const common = await getCommonProps(); return { props: common }; }
  catch { return { props: { site:{}, footerPages:[] } }; }
}
