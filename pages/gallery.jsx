import { useState } from 'react';
import Layout from '../components/Layout';
import Lightbox from '../components/Lightbox';
import { connectDB, GalleryImage } from '../lib/db';
import { getCommonProps } from '../lib/pageProps';

export default function GalleryPage({ images, categories, site, footerPages }) {
  const [active, setActive] = useState('All');
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const filtered = active === 'All' ? images : images.filter(i => i.category === active);

  return (
    <Layout site={site} footerPages={footerPages} title="Gallery"
      description="View Pro Audio Solution's event gallery — corporate events, weddings, live concerts, college fests, award shows and government events across Delhi."
    >
      {/* Hero */}
      <section style={{ background:'linear-gradient(135deg, var(--color-secondary), #0f3460)', padding:'64px 0 52px' }}>
        <div className="container">
          <div className="badge" style={{ background:'rgba(212,175,55,0.15)', borderColor:'rgba(212,175,55,0.4)', color:'var(--color-primary)' }}>Our Work</div>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2rem,4vw,3rem)', color:'var(--color-white)', fontWeight:800, margin:'12px 0 12px' }}>Event Gallery</h1>
          <p style={{ color:'rgba(255,255,255,0.65)', maxWidth:540 }}>A glimpse into the events we&apos;ve powered — click any photo to view full size.</p>
        </div>
      </section>

      {/* Filter */}
      <section style={{ background:'var(--color-bg-alt)', borderBottom:'1px solid var(--color-border)', padding:'16px 0', position:'sticky', top:68, zIndex:100 }}>
        <div className="container">
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', alignItems:'center' }}>
            <span style={{ fontWeight:700, fontSize:'0.82rem', color:'var(--color-text-muted)' }}>Category:</span>
            {['All', ...categories].map(cat => (
              <button key={cat} onClick={() => setActive(cat)} style={{
                padding:'6px 14px', borderRadius:100, border:'1.5px solid', fontWeight:600, fontSize:'0.82rem', cursor:'pointer', transition:'var(--transition)',
                background: active===cat ? 'var(--color-primary)' : 'var(--color-white)',
                borderColor: active===cat ? 'var(--color-primary)' : 'var(--color-border)',
                color: active===cat ? 'var(--color-secondary)' : 'var(--color-text)',
              }}>{cat} {active===cat && <span style={{ opacity:0.7 }}>({filtered.length})</span>}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry grid */}
      <section className="section-pad">
        <div className="container">
          {filtered.length === 0 ? (
            <div style={{ textAlign:'center', padding:'64px 0' }}>
              <div style={{ fontSize:'3rem', marginBottom:12 }}>📷</div>
              <h3 style={{ color:'var(--color-text-light)', fontWeight:600 }}>
                {images.length === 0 ? 'Gallery images will appear here once added from the admin panel.' : 'No images in this category.'}
              </h3>
            </div>
          ) : (
            <>
              <p style={{ fontSize:'0.85rem', color:'var(--color-text-muted)', marginBottom:20 }}>{filtered.length} photo{filtered.length!==1?'s':''} — click to enlarge</p>
              <div style={{ columns:'3 260px', gap:14 }}>
                {filtered.map((img, idx) => (
                  <div
                    key={img._id} onClick={() => setLightboxIdx(idx)}
                    style={{ marginBottom:14, borderRadius:10, overflow:'hidden', cursor:'pointer', position:'relative', breakInside:'avoid', lineHeight:0 }}
                    onMouseEnter={e => e.currentTarget.querySelector('.gal-overlay').style.opacity='1'}
                    onMouseLeave={e => e.currentTarget.querySelector('.gal-overlay').style.opacity='0'}
                  >
                    <img
                      src={img.url}
                      alt={img.altText || img.caption || 'Gallery image'}
                      style={{ width:'100%', display:'block', borderRadius:10 }}
                      loading="lazy"
                      onError={e => { e.target.src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='240'%3E%3Crect fill='%23F3F0EA' width='400' height='240'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='%23888' font-size='14' dy='.35em'%3EImage not found%3C/text%3E%3C/svg%3E"; }}
                    />
                    <div className="gal-overlay" style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.5)', opacity:0, transition:'opacity 0.25s', borderRadius:10, display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:14 }}>
                      {img.caption && <p style={{ color:'#fff', fontSize:'0.82rem', fontWeight:600, marginBottom:2, lineHeight:1.3 }}>{img.caption}</p>}
                      {img.eventName && <p style={{ color:'var(--color-primary)', fontSize:'0.75rem', fontWeight:700 }}>{img.eventName}</p>}
                      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:44, height:44, background:'rgba(255,255,255,0.15)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.3rem' }}>🔍</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {lightboxIdx !== null && (
        <Lightbox
          images={filtered}
          currentIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx(i => Math.max(0, i - 1))}
          onNext={() => setLightboxIdx(i => Math.min(filtered.length - 1, i + 1))}
        />
      )}
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const common = await getCommonProps();
    await connectDB();
    const images = await GalleryImage.find({}).sort({ order:1, createdAt:-1 }).lean();
    const cats = [...new Set(images.map(i=>i.category).filter(Boolean))];
    return { props: { ...common, images:JSON.parse(JSON.stringify(images)), categories:cats } };
  } catch { return { props: { images:[], categories:[], site:{}, footerPages:[] } }; }
}
