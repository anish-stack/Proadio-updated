import Layout from '../components/Layout';
import Link from 'next/link';
import { WHY_CHOOSE } from '../lib/siteData';
import { getCommonProps } from '../lib/pageProps';

export default function AboutPage({ site, footerPages }) {
  const s = site || {};
  return (
    <Layout site={s} footerPages={footerPages} title="About Us"
      description="Learn about Pro Audio Solution — Delhi's leading light & sound company with professional teams, premium equipment, and 10+ years of event production experience."
    >
      <section style={{ background:'linear-gradient(135deg, var(--color-secondary), #0f3460)', padding:'72px 0 60px' }}>
        <div className="container">
          <div className="badge" style={{ background:'rgba(212,175,55,0.15)', borderColor:'rgba(212,175,55,0.4)', color:'var(--color-primary)' }}>About Us</div>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2rem,4vw,3rem)', color:'var(--color-white)', fontWeight:800, margin:'12px 0 16px' }}>
            {s.name || 'Pro Audio Solution'}
          </h1>
          <p style={{ color:'rgba(255,255,255,0.7)', maxWidth:600, lineHeight:1.75, fontSize:'1.05rem' }}>{s.about || 'Delhi\'s leading light & sound company.'}</p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>
            <div>
              <div className="badge">Our Story</div>
              <h2 className="section-title">Where Sound Meets Excellence</h2>
              <div className="gold-divider" />
              <p style={{ color:'var(--color-text-light)', lineHeight:1.8, marginBottom:20 }}>
                {s.name || 'Pro Audio Solution'} was born from a passion for exceptional live audio and lighting. Based in the heart of Delhi, we&apos;ve grown from a small rental operation to one of the region&apos;s most trusted event production companies.
              </p>
              <p style={{ color:'var(--color-text-light)', lineHeight:1.8, marginBottom:32 }}>
                By combining innovative technology, skilled professionals, and creative expertise, we create seamless connections between artists, audiences, and brands — delivering unforgettable experiences through the love of sound.
              </p>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                {[['500+','Events Executed'],['10+','Years Experience'],['24×7','Availability'],['50+','Equipment Brands']].map(([n,l])=>(
                  <div key={n} style={{ background:'var(--color-bg-alt)', borderRadius:'var(--radius-md)', padding:'18px 16px', textAlign:'center', border:'1px solid var(--color-border)' }}>
                    <div style={{ fontSize:'2rem', fontWeight:900, color:'var(--color-primary)' }}>{n}</div>
                    <div style={{ fontSize:'0.8rem', fontWeight:600, color:'var(--color-text-muted)', marginTop:4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              {[['🔊','World-Class Audio','JBL, RCF, DiGiCo'],['💡','Smart Lighting','MA3, Avolites'],['🏗️','Truss & Staging','Custom builds'],['📺','LED Walls','Up to 4000 sq.ft']].map(([icon,t,s])=>(
                <div key={t} style={{ background:'var(--color-bg-section)', borderRadius:'var(--radius-lg)', padding:'24px 20px', border:'1px solid var(--color-border)', textAlign:'center' }}>
                  <div style={{ fontSize:'2rem', marginBottom:10 }}>{icon}</div>
                  <div style={{ fontWeight:700, fontSize:'0.95rem', marginBottom:4 }}>{t}</div>
                  <div style={{ fontSize:'0.78rem', color:'var(--color-text-muted)' }}>{s}</div>
                </div>
              ))}
            </div>
          </div>
          <style>{`@media(max-width:768px){div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important}}`}</style>
        </div>
      </section>

      <section className="section-pad bg-section">
        <div className="container">
          <div className="section-header center">
            <div className="badge">Our Commitment</div>
            <h2 className="section-title">What We Stand For</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid-3">
            {[
              { icon:'🔊', title:'Good Quality Sound', desc:'Guiding artists and events to reach audiences with perfectly engineered, crystal-clear sound.' },
              { icon:'⏳', title:'Before-Time Setup', desc:'Our #1 priority — setup completed before your event timeline. No stress, no delays, ever.' },
              { icon:'💪', title:'Strong Professional Team', desc:'A dedicated team of trained sound engineers and lighting technicians, ready for any challenge.' },
            ].map(c=>(
              <div key={c.title} style={{ background:'var(--color-white)', borderRadius:'var(--radius-lg)', padding:32, border:'1px solid var(--color-border)', textAlign:'center' }}>
                <div style={{ width:64, height:64, borderRadius:'50%', background:'rgba(212,175,55,0.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.8rem', margin:'0 auto 16px' }}>{c.icon}</div>
                <h3 style={{ fontWeight:700, marginBottom:10 }}>{c.title}</h3>
                <p style={{ fontSize:'0.9rem', color:'var(--color-text-light)', lineHeight:1.7 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container">
          <div className="section-header center">
            <div className="badge">Why Choose Us</div>
            <h2 className="section-title">The Pro Audio Difference</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid-3">
            {WHY_CHOOSE.map(w=>(
              <div key={w.title} style={{ display:'flex', gap:16, padding:'20px 0', borderBottom:'1px solid var(--color-border)' }}>
                <div style={{ fontSize:'1.8rem', flexShrink:0 }}>{w.icon}</div>
                <div>
                  <h4 style={{ fontWeight:700, marginBottom:6 }}>{w.title}</h4>
                  <p style={{ fontSize:'0.88rem', color:'var(--color-text-light)', lineHeight:1.65 }}>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background:'var(--color-secondary)', padding:'64px 0', textAlign:'center' }}>
        <div className="container">
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.8rem,3vw,2.5rem)', color:'var(--color-white)', fontWeight:800, marginBottom:16 }}>Let&apos;s Create Something Unforgettable</h2>
          <p style={{ color:'rgba(255,255,255,0.65)', marginBottom:32, maxWidth:480, margin:'0 auto 32px' }}>Ready to elevate your event with world-class audio and lighting?</p>
          <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/contact" className="btn btn-primary btn-lg">Get Free Quote</Link>
            <Link href="/products" className="btn btn-lg" style={{ background:'rgba(255,255,255,0.1)', color:'var(--color-white)', border:'1.5px solid rgba(255,255,255,0.25)' }}>Our Equipment</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps() {
  try { const common = await getCommonProps(); return { props: common }; }
  catch { return { props: { site:{}, footerPages:[] } }; }
}
