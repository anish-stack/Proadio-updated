import Layout from '../../components/Layout';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { connectDB, Event } from '../../lib/db';
import { getCommonProps } from '../../lib/pageProps';
import EnquiryForm from '../../components/EnquiryForm';
import PopupModal from '../../components/PopupModal';
import Lightbox from '../../components/Lightbox';

const CAT_COLORS = { Corporate:'#2563EB',Wedding:'#DB2777',Concert:'#D97706',College:'#16A34A',Government:'#7C3AED',Other:'#6B7280' };
const POPUP_COOLDOWN_MS = 2 * 60 * 1000; // don't re-show the same event popup for 2 minutes

export default function EventDetailPage({ event, site, footerPages }) {
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [popupShown, setPopupShown] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(null);

  useEffect(() => {
    if (!(event?.popupEnabled && event?.popupContent)) return;
    const storageKey = `pa_event_popup_${event._id}`;
    try {
      const lastShown = Number(localStorage.getItem(storageKey) || 0);
      if (Date.now() - lastShown < POPUP_COOLDOWN_MS) return; // shown recently, stay quiet
    } catch { /* localStorage unavailable, fall through and show */ }

    const t = setTimeout(() => {
      setPopupShown(true);
      try { localStorage.setItem(storageKey, String(Date.now())); } catch {}
    }, 1500);
    return () => clearTimeout(t);
  }, [event]);

  const closePopup = () => setPopupShown(false);

  if (!event) return (
    <Layout site={site} footerPages={footerPages} title="Event Not Found">
      <div style={{ textAlign:'center', padding:'100px 24px' }}>
        <h1 style={{ fontSize:'2rem', fontWeight:800, marginBottom:16 }}>Event Not Found</h1>
        <Link href="/events" className="btn btn-primary">Back to Events</Link>
      </div>
    </Layout>
  );

  const d = new Date(event.date);
  const color = CAT_COLORS[event.category] || '#6B7280';

  return (
    <Layout
      site={site}
      footerPages={footerPages}
      title={event.title}
      description={event.description || `${event.title} — Pro Audio Solution event production.`}
    >
      {/* Hero */}
      <section style={{ background:`linear-gradient(135deg, var(--color-secondary) 0%, ${color}33 100%)`, padding:'72px 0 52px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:0, right:0, width:400, height:400, borderRadius:'50%', background:`${color}11`, pointerEvents:'none' }} />
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20, flexWrap:'wrap' }}>
            <Link href="/events" style={{ color:'rgba(255,255,255,0.6)', fontSize:'0.88rem', fontWeight:500 }}> Events</Link>
            <span style={{ color:'rgba(255,255,255,0.3)' }}>/</span>
            <span style={{ color:'rgba(255,255,255,0.6)', fontSize:'0.88rem' }}>{event.title}</span>
          </div>
          <div style={{ display:'flex', gap:10, marginBottom:16, flexWrap:'wrap' }}>
            <span style={{ background:color, color:'#fff', fontSize:'0.78rem', fontWeight:700, padding:'4px 14px', borderRadius:100 }}>{event.category}</span>
            {event.isUpcoming && <span style={{ background:'var(--color-primary)', color:'var(--color-secondary)', fontSize:'0.78rem', fontWeight:800, padding:'4px 14px', borderRadius:100 }}>UPCOMING</span>}
            {event.featured && <span style={{ background:'rgba(255,255,255,0.15)', color:'var(--color-primary)', fontSize:'0.78rem', fontWeight:700, padding:'4px 14px', borderRadius:100 }}>★ Featured</span>}
          </div>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.8rem,4vw,3rem)', color:'var(--color-white)', fontWeight:800, marginBottom:16, maxWidth:700 }}>{event.title}</h1>
          {event.description && <p style={{ color:'rgba(255,255,255,0.7)', fontSize:'1.05rem', maxWidth:640, lineHeight:1.75 }}>{event.description}</p>}
        </div>
      </section>

      {/* Content */}
      <section className="section-pad">
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:48, alignItems:'start' }}>
            {/* Main */}
            <div>
              {/* Event details card */}
              <div style={{ background:'var(--color-bg-alt)', borderRadius:'var(--radius-lg)', padding:28, marginBottom:32, border:'1px solid var(--color-border)' }}>
                <h2 style={{ fontWeight:800, fontSize:'1.1rem', marginBottom:20, color:'var(--color-text)' }}>Event Details</h2>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                  <InfoRow icon="📅" label="Date" value={d.toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' })} />
                  <InfoRow icon="⏰" label="Time" value={d.toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' })} />
                  {event.venue && <InfoRow icon="📍" label="Venue" value={event.venue} span />}
                  {event.category && <InfoRow icon="🎭" label="Category" value={event.category} />}
                  {event.tags && event.tags.length > 0 && (
                    <div style={{ gridColumn:'1/-1' }}>
                      <span style={{ fontSize:'0.8rem', fontWeight:700, color:'var(--color-text-muted)', textTransform:'uppercase', letterSpacing:'0.08em' }}>Tags</span>
                      <div style={{ display:'flex', gap:8, marginTop:6, flexWrap:'wrap' }}>
                        {event.tags.map(t => (
                          <span key={t} style={{ background:'rgba(212,175,55,0.1)', color:'var(--color-primary)', fontSize:'0.8rem', fontWeight:600, padding:'3px 12px', borderRadius:100, border:'1px solid rgba(212,175,55,0.25)' }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* HTML Content from CMS */}
              {event.htmlContent && (
                <div>
                  <h2 style={{ fontWeight:800, fontSize:'1.2rem', marginBottom:16 }}>About This Event</h2>
                  <div
                    className="event-html-content"
                    dangerouslySetInnerHTML={{ __html: event.htmlContent }}
                    style={{ color:'var(--color-text-light)', lineHeight:1.8, fontSize:'0.97rem' }}
                  />
                </div>
              )}

              {/* Event pictures */}
              {event.images && event.images.length > 0 && (
                <div style={{ marginTop: event.htmlContent ? 36 : 0 }}>
                  <h2 style={{ fontWeight:800, fontSize:'1.2rem', marginBottom:16 }}>Event Pictures</h2>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))', gap:12 }}>
                    {event.images.map((url, idx) => (
                      <div key={url+idx} onClick={() => setLightboxIdx(idx)} style={{ borderRadius:10, overflow:'hidden', cursor:'pointer', height:120, border:'1px solid var(--color-border)' }}>
                        <img src={url} alt={`${event.title} photo ${idx+1}`} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} loading="lazy" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              {/* Date card */}
              <div style={{ background:`linear-gradient(135deg, ${color}, ${color}cc)`, borderRadius:'var(--radius-lg)', padding:28, marginBottom:20, textAlign:'center', color:'#fff' }}>
                <div style={{ fontSize:'3.5rem', fontWeight:900, lineHeight:1 }}>{d.getDate()}</div>
                <div style={{ fontSize:'1rem', fontWeight:700, letterSpacing:'0.1em', marginTop:4 }}>{d.toLocaleString('default',{month:'long'}).toUpperCase()}</div>
                <div style={{ fontSize:'1.2rem', fontWeight:700, marginTop:2 }}>{d.getFullYear()}</div>
                {event.venue && <div style={{ marginTop:16, fontSize:'0.88rem', opacity:0.85, lineHeight:1.5 }}>📍 {event.venue}</div>}
              </div>

              {/* CTA card */}
              <div style={{ background:'var(--color-white)', borderRadius:'var(--radius-lg)', padding:24, border:'1px solid var(--color-border)', boxShadow:'var(--shadow-sm)' }}>
                <h3 style={{ fontWeight:800, fontSize:'1rem', marginBottom:12 }}>Interested in this event?</h3>
                <p style={{ fontSize:'0.88rem', color:'var(--color-text-light)', marginBottom:16, lineHeight:1.65 }}>Need sound & lighting for a similar event? Get a free quote from our team.</p>
                <button onClick={() => setShowEnquiry(true)} className="btn btn-primary" style={{ width:'100%', justifyContent:'center' }}>Get Free Quote</button>
                <div style={{ marginTop:12, display:'flex', flexDirection:'column', gap:8 }}>
                  {[site.phone1,site.phone2].filter(Boolean).map(p => (
                    <a key={p} href={`tel:${p}`} style={{ display:'flex', alignItems:'center', gap:8, fontSize:'0.9rem', fontWeight:600, color:'var(--color-primary)' }}>📞 {p}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <style>{`
            @media(max-width:768px){div[style*="grid-template-columns: 2fr 1fr"]{grid-template-columns:1fr!important}}
            .event-html-content h2,.event-html-content h3{color:var(--color-text);font-weight:700;margin:24px 0 10px}
            .event-html-content h2{font-size:1.3rem}.event-html-content h3{font-size:1.1rem}
            .event-html-content p{margin-bottom:14px}
            .event-html-content ul,.event-html-content ol{padding-left:22px;margin-bottom:14px}
            .event-html-content li{margin-bottom:6px}
            .event-html-content strong{color:var(--color-text);font-weight:700}
          `}</style>
        </div>
      </section>

      {/* Enquiry modal */}
      <PopupModal isOpen={showEnquiry} onClose={() => setShowEnquiry(false)} title="Get a Free Quote">
        <EnquiryForm defaultProduct={`Event: ${event.title}`} compact />
      </PopupModal>

      {/* Event pictures lightbox */}
      {lightboxIdx !== null && event.images && (
        <Lightbox
          images={event.images.map(url => ({ url }))}
          currentIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx(i => Math.max(0, i - 1))}
          onNext={() => setLightboxIdx(i => Math.min(event.images.length - 1, i + 1))}
        />
      )}

      {/* Auto popup */}
      {event.popupEnabled && event.popupContent && (
        <PopupModal isOpen={popupShown} onClose={closePopup} title={event.title} size="sm">
          <div dangerouslySetInnerHTML={{ __html: event.popupContent }} style={{ lineHeight:1.75, color:'var(--color-text-light)', marginBottom:20 }} />
          <div style={{ display:'flex', gap:10 }}>
            <button onClick={() => { closePopup(); setShowEnquiry(true); }} className="btn btn-primary btn-sm">Get Quote</button>
            <button onClick={closePopup} className="btn btn-secondary btn-sm">Close</button>
          </div>
        </PopupModal>
      )}
    </Layout>
  );
}

function InfoRow({ icon, label, value, span }) {
  return (
    <div style={{ gridColumn: span ? '1/-1' : undefined }}>
      <div style={{ fontSize:'0.78rem', fontWeight:700, color:'var(--color-text-muted)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:4 }}>{icon} {label}</div>
      <div style={{ fontWeight:600, color:'var(--color-text)', fontSize:'0.92rem' }}>{value}</div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const common = await getCommonProps();
    await connectDB();
    const { id } = params;
    const event = await Event.findOne({ $or: [{ slug: id }, { _id: id.match(/^[a-f\d]{24}$/i) ? id : null }] }).lean();
    return { props: { ...common, event: event ? JSON.parse(JSON.stringify(event)) : null } };
  } catch {
    return { props: { event: null, site:{}, footerPages:[] } };
  }
}
