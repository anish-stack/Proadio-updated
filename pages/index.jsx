// pages/index.js
import Layout from '../components/Layout';
import Link from 'next/link';
import { useState } from 'react';
import { WHY_CHOOSE, CLIENTS_TYPES } from '../lib/siteData';
import { connectDB, Product, Event } from '../lib/db';
import { getCommonProps } from '../lib/pageProps';
import EnquiryForm from '../components/EnquiryForm';
import PopupModal from '../components/PopupModal';
import HeroSection from '../components/HeroSection';
import { ArrowBigRight, ArrowRight } from 'lucide-react';

const CAT_ICONS = { 'Sound Systems': '🔊', 'Mixing Consoles': '🎛️', 'Microphones': '🎤', 'Lighting': '💡', 'Trussing & Structures': '🏗️', 'LED Walls': '📺' };
const WHY_META = [
  { icon: '👥', color: '#6C4FE0' },
  { icon: '⚙️', color: '#C9A227' },
  { icon: '📅', color: '#6C4FE0' },
  { icon: '🛡️', color: '#C9A227' },
  { icon: '🎚️', color: '#6C4FE0' },
  { icon: '⭐', color: '#C9A227' },
];
const STAR_META = [
  { icon: '🎤', color: '#E8A33D' },
  { icon: '🎵', color: '#A855F7' },
  { icon: '🎚️', color: '#E8A33D' },
  { icon: '🎤', color: '#3B82F6' },
];
const POWER_META = [
  { icon: '💍', color: '#D4AF37' },
  { icon: '💼', color: '#1E3A5F' },
  { icon: '🎤', color: '#C0392B' },
  { icon: '🎉', color: '#8E44AD' },
  { icon: '🏛️', color: '#1E7A46' },
  { icon: '🎬', color: '#B8860B' },
  { icon: '⭐', color: '#0FA3A3' },
  { icon: '🏆', color: '#C2185B' },
];

export default function Home({ featuredProducts, upcomingEvents, collageEvents, site, footerPages, stats, celebrities, whyChoose, eventTypes }) {
  const s = site || {};
  const phones = [ s.phone2, s.phone3].filter(Boolean);
  const heroHeading = s.heroHeading || 'Premium Sound & Lighting Solutions For Every Event';
  const heroSubtext = s.heroSubtext || 'From intimate weddings to massive concerts — professional PA systems, intelligent lighting, LED walls & trussing. Available 24×7 across Delhi NCR.';
  const displayStats = stats && stats.length > 0 ? stats : [
    { label: 'Events Executed', value: '500+', icon: '🎵' },
    { label: 'Years Experience', value: '10+', icon: '⭐' },
    { label: 'Availability', value: '24×7', icon: '⏰' },
    { label: 'Premium Brands', value: '50+', icon: '🏆' },
  ];
  const FALLBACK_IMG = 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600';
  const displayWhyChoose = whyChoose && whyChoose.length > 0 ? whyChoose : WHY_CHOOSE.map(w => ({ ...w, image: FALLBACK_IMG }));
  const displayEventTypes = eventTypes && eventTypes.length > 0 ? eventTypes : CLIENTS_TYPES.map(t => ({ title: t, image: FALLBACK_IMG }));

  const [productPopup, setProductPopup] = useState(null);

  return (
    <Layout site={s} footerPages={footerPages}>
      {/* HERO */}
      <HeroSection site={s} stats={displayStats} />

      {/* WHY CHOOSE */}
{/* WHY CHOOSE */}
<section className="section-pad why-section">
  <div className="why-wave why-wave-left" />
  <div className="why-wave why-wave-right" />
  <div className="container" style={{ position: 'relative' }}>
    <div className="section-header center">
      <div className="badge">🎚️ Why Choose Us</div>
      <h2 className="section-title">The Pro Audio <span style={{ color: 'var(--color-primary)' }}>Advantage</span></h2>
      <div className="gold-divider" />
      <p className="section-subtitle">Expert engineers, premium equipment, and unmatched reliability — every event, every time.</p>
    </div>

    <div className="why-grid">
      {displayWhyChoose.map((item, idx) => {
        const meta = WHY_META[idx % WHY_META.length];
        return (
          <div key={item._id || item.title} className="why-card">
            <div className="why-card-img">
              <img src={item.image} alt={item.title} loading="lazy" />
              <svg className="why-wave-cut" viewBox="0 0 400 40" preserveAspectRatio="none">
                <path d="M0,40 C100,0 300,0 400,40 L400,40 L0,40 Z" fill={meta.color} />
              </svg>
              <span className="why-badge" style={{ background: meta.color }}>{meta.icon}</span>
            </div>
            <div className="why-card-body">
              <h3 className="why-title">{item.title}</h3>
              <p className="why-desc">{item.desc}</p>
              <button type="button" className="why-arrow" style={{ background: meta.color }}><ArrowRight size={14}/></button>
            </div>
          </div>
        );
      })}

      {/* CTA BANNER TILE */}
      <div className="why-cta-card">
        <div className="why-cta-text">
          <span className="why-cta-tag">LET&apos;S CREATE</span>
          <h3 className="why-cta-heading">Extraordinary<br /><span>Events Together!</span></h3>
          <p className="why-cta-sub">Your vision. Our sound. A perfect experience.</p>
          <Link href="/contact" className="btn why-cta-btn">Get in Touch <ArrowRight size={14}/></Link>
        </div>
        <div className="why-cta-media">
          <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500" alt="microphone" loading="lazy" />
        </div>
      </div>
    </div>

    {/* STATS STRIP */}
    <div className="why-stats">
      <div className="why-stat"><span>🏆</span><div><strong>500+</strong><p>Events Powered</p></div></div>
      <div className="why-stat"><span>⭐</span><div><strong>98%</strong><p>Client Satisfaction</p></div></div>
      <div className="why-stat"><span>🎖️</span><div><strong>10+</strong><p>Years Experience</p></div></div>
      <div className="why-stat"><span>🎧</span><div><strong>24/7</strong><p>Support Available</p></div></div>
    </div>
  </div>

  <style>{`
    .why-section { position: relative; overflow: hidden; }
    .why-wave { position: absolute; top: 40px; width: 260px; height: 140px; opacity: 0.15; pointer-events: none;
      background-image: repeating-linear-gradient(90deg, var(--color-primary) 0 2px, transparent 2px 8px);
      -webkit-mask-image: radial-gradient(ellipse at center, #000 40%, transparent 75%);
      mask-image: radial-gradient(ellipse at center, #000 40%, transparent 75%);
    }
    .why-wave-left { left: -40px; }
    .why-wave-right { right: -40px; }

    .why-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 22px;
    }

    .why-card {
      background: var(--color-white);
      border-radius: 18px;
      overflow: hidden;
      box-shadow: 0 6px 18px rgba(0,0,0,0.06);
      transition: var(--transition);
      display: flex;
      flex-direction: column;
    }
    .why-card:hover { transform: translateY(-4px); box-shadow: 0 14px 30px rgba(0,0,0,0.1); }

    .why-card-img { position: relative; height: 160px; overflow: hidden; }
    .why-card-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: var(--transition); }
    .why-card:hover .why-card-img img { transform: scale(1.06); }
    .why-wave-cut { position: absolute; bottom: -1px; left: 0; width: 100%; height: 26px; }

    .why-badge {
      position: absolute; left: 18px; bottom: -22px;
      width: 44px; height: 44px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.15rem; color: #fff;
      border: 4px solid var(--color-white);
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
      z-index: 2;
    }

    .why-card-body { position: relative; padding: 32px 20px 22px; flex: 1; }
    .why-title { font-weight: 800; font-size: 1.05rem; color: var(--color-secondary); margin: 0 0 8px; font-family: var(--font-display); }
    .why-desc { font-size: 0.86rem; color: var(--color-text-light); line-height: 1.55; margin: 0; padding-right: 40px; }
    .why-arrow {
      position: absolute; right: 18px; bottom: 18px;
      width: 36px; height: 36px; border-radius: 50%; border: none;
      color: #fff; font-size: 1rem; cursor: pointer; transition: var(--transition);
      display: flex; align-items: center; justify-content: center;
    }
    .why-arrow:hover { transform: scale(1.1); }

    /* CTA banner tile spans 2 cols in the 2nd row */
    .why-cta-card {
      grid-column: span 2;
      background: linear-gradient(135deg, #2E1065, #4C1D95);
      border-radius: 18px;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 30px 30px 30px 34px;
      min-height: 100%;
    }
    .why-cta-text { position: relative; z-index: 1; max-width: 62%; }
    .why-cta-tag { color: var(--color-primary); font-size: 0.72rem; font-weight: 800; letter-spacing: 0.1em; }
    .why-cta-heading { color: #fff; font-family: var(--font-display); font-size: 1.5rem; font-weight: 800; margin: 8px 0 10px; line-height: 1.25; }
    .why-cta-heading span { color: var(--color-primary); }
    .why-cta-sub { color: rgba(255,255,255,0.7); font-size: 0.85rem; margin-bottom: 18px; }
    .why-cta-btn {
      display: inline-block; background: var(--color-primary); color: #2E1065;
      font-weight: 700; font-size: 0.88rem; padding: 12px 24px; border-radius: 100px;
      text-decoration: none; min-height: 44px; transition: var(--transition);
    }
    .why-cta-btn:hover { background: var(--color-primary-light); transform: translateY(-2px); }
    .why-cta-media { position: absolute; right: 0; bottom: 0; height: 100%; width: 46%; opacity: 0.9; }
    .why-cta-media img { width: 100%; height: 100%; object-fit: cover; object-position: left center;
      -webkit-mask-image: linear-gradient(90deg, transparent, #000 30%);
      mask-image: linear-gradient(90deg, transparent, #000 30%);
    }

    /* STATS */
    .why-stats {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;
      background: var(--color-alt, #F6F5FB);
      border-radius: 18px; padding: 26px 30px;
      margin-top: 30px;
    }
    .why-stat { display: flex; align-items: center; gap: 12px; justify-content: center; }
    .why-stat span { font-size: 1.5rem; }
    .why-stat strong { display: block; font-size: 1.3rem; font-weight: 800; color: var(--color-secondary); }
    .why-stat p { margin: 2px 0 0; font-size: 0.78rem; color: var(--color-text-light); }

    @media (max-width: 1024px) {
      .why-grid { grid-template-columns: repeat(2, 1fr); }
      .why-cta-card { grid-column: span 2; }
      .why-stats { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 640px) {
      .why-grid { grid-template-columns: 1fr; gap: 26px; }
      .why-cta-card { grid-column: span 1; flex-direction: column; align-items: flex-start; padding: 26px; }
      .why-cta-text { max-width: 100%; }
      .why-cta-media { position: static; width: 100%; height: 140px; margin-top: 16px; border-radius: 12px; overflow: hidden; }
      .why-cta-media img { -webkit-mask-image: none; mask-image: none; }
      .why-stats { grid-template-columns: 1fr 1fr; gap: 20px; padding: 20px; }
      .why-badge { width: 38px; height: 38px; font-size: 1rem; left: 14px; bottom: -18px; }
      .why-card-body { padding: 28px 16px 18px; }
    }
  `}</style>
</section>

{/* CELEBRITIES */}
{celebrities && celebrities.length > 0 && (
  <section className="section-pad star-section">
    <div className="star-bg-dots star-bg-dots-left" />
    <div className="star-bg-dots star-bg-dots-right" />
    <div className="star-bg-wave" />
    <div className="container" style={{ position: 'relative' }}>
      <div className="section-header center">
        <div className="badge star-badge">✦ Our Experience ✦</div>
        <h2 className="section-title" style={{ color: '#fff' }}>Celebrities We&apos;ve <span style={{ color: 'var(--color-primary)' }}>Worked With</span></h2>
        <div className="gold-divider star-divider"><span>🎵</span></div>
        <p className="section-subtitle star-subtitle">Trusted by top artists and global personalities. Bringing unforgettable experiences to life.</p>
      </div>

      <div className="star-grid">
        {celebrities.map((c, idx) => {
          const meta = STAR_META[idx % STAR_META.length];
          return (
            <div key={c._id} className="star-card">
              <div className="star-ring" style={{ '--ring-color': meta.color }}>
                <img src={c.image} alt={c.name} loading="lazy" />
                <span className="star-icon" style={{ background: meta.color }}>{meta.icon}</span>
              </div>
              <h3 className="star-name">{c.name}</h3>
              {c.designation && (
                <p className="star-role" style={{ color: meta.color }}>
                  <span className="star-dash" style={{ background: meta.color }} />
                  {c.designation}
                  <span className="star-dash" style={{ background: meta.color }} />
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="star-stats">
        <div className="star-stat"><span className="star-stat-icon">📅</span><div><strong>500+</strong><p>Events Completed</p></div></div>
        <div className="star-stat"><span className="star-stat-icon">👥</span><div><strong>200+</strong><p>Celebrity Collaborations</p></div></div>
        <div className="star-stat"><span className="star-stat-icon">🛡️</span><div><strong>15+</strong><p>Years of Experience</p></div></div>
        <div className="star-stat"><span className="star-stat-icon">🌐</span><div><strong>20+</strong><p>Countries Covered</p></div></div>
      </div>
    </div>

    <style>{`
      .star-section {
        position: relative;
        background: linear-gradient(180deg, #070B1A 0%, #0B1024 100%);
        overflow: hidden;
      }
      .star-bg-dots {
        position: absolute; top: 0; bottom: 0; width: 140px; opacity: 0.5; pointer-events: none;
        background-image: radial-gradient(rgba(212,175,55,0.35) 1.5px, transparent 1.5px);
        background-size: 18px 18px;
        -webkit-mask-image: linear-gradient(180deg, transparent, #000 20%, #000 80%, transparent);
        mask-image: linear-gradient(180deg, transparent, #000 20%, #000 80%, transparent);
      }
      .star-bg-dots-left { left: 0; }
      .star-bg-dots-right { right: 0; }
      .star-bg-wave {
        position: absolute; inset: 0; opacity: 0.06; pointer-events: none;
        background-image: repeating-linear-gradient(100deg, transparent 0 40px, rgba(255,255,255,0.4) 40px 41px);
      }

      .star-badge {
        background: rgba(212,175,55,0.1) !important; border: 1px solid rgba(212,175,55,0.4) !important;
        color: var(--color-primary) !important;
      }
      .star-divider { display: flex; align-items: center; justify-content: center; gap: 10px; }
      .star-subtitle { color: rgba(255,255,255,0.6) !important; }

      .star-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 22px;
        margin-top: 20px;
      }

      .star-card {
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.06);
        border-radius: 18px;
        padding: 70px 20px 26px;
        text-align: center;
        position: relative;
        margin-top: 60px;
        transition: var(--transition);
      }
      .star-card:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.14); }

      .star-ring {
        position: absolute; top: -60px; left: 50%; transform: translateX(-50%);
        width: 140px; height: 140px; border-radius: 50%;
        border: 3px solid var(--ring-color);
        box-shadow: 0 0 24px -4px var(--ring-color);
        padding: 4px;
      }
      .star-ring img {
        width: 100%; height: 100%; border-radius: 50%; object-fit: cover; display: block;
      }
      .star-icon {
        position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%);
        width: 40px; height: 40px; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-size: 1.05rem; color: #fff;
        border: 3px solid #0B1024;
        box-shadow: 0 4px 12px rgba(0,0,0,0.4);
      }

      .star-name { color: #fff; font-weight: 700; font-size: 1.15rem; margin: 8px 0 8px; font-family: var(--font-display); }
      .star-role { font-size: 0.85rem; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 8px; margin: 0; }
      .star-dash { width: 18px; height: 1px; display: inline-block; }

      .star-stats {
        display: flex; flex-wrap: wrap; justify-content: space-between; gap: 20px;
        margin-top: 60px;
        border: 1px solid rgba(212,175,55,0.3);
        border-radius: 100px;
        padding: 20px 40px;
      }
      .star-stat { display: flex; align-items: center; gap: 14px; flex: 1; min-width: 180px; justify-content: center; }
      .star-stat-icon {
        width: 46px; height: 46px; border-radius: 12px; background: rgba(212,175,55,0.1);
        display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0;
      }
      .star-stat strong { color: #fff; font-size: 1.4rem; font-weight: 800; display: block; }
      .star-stat p { color: rgba(255,255,255,0.55); font-size: 0.8rem; margin: 2px 0 0; }

      @media (max-width: 1024px) {
        .star-grid { grid-template-columns: repeat(2, 1fr); gap: 50px 20px; }
        .star-stats { border-radius: 20px; }
      }
      @media (max-width: 640px) {
        .star-grid { grid-template-columns: 1fr; gap: 60px; max-width: 280px; margin-left: auto; margin-right: auto; }
        .star-stats { flex-direction: column; padding: 24px; border-radius: 20px; }
        .star-stat { justify-content: flex-start; min-width: 0; }
      }
    `}</style>
  </section>
)}


      <section className="section-pad">
        <div className="container">
          <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div className="badge">Our Inventory</div>
              <h2 className="section-title">Featured Equipment</h2>
              <div className="gold-divider" />
            </div>
            <Link href="/products" className="btn btn-outline-gold">View All </Link>
          </div>
          <div className="grid-3">
            {featuredProducts.map(p => (
              <div key={p._id} className="card">
                <div style={{ height: 140, background: 'linear-gradient(135deg, var(--color-secondary), var(--color-secondary-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <img
                    src={p.image || "https://i.ibb.co/KcvrTVHx/14be2e9d-d974-417e-a79d-958ec26f659a.jpg"}
                    alt={p.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      background: "#000"
                    }}
                  />
                  {!p.image && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(0,0,0,0.25)",
                      }}
                    />
                  )}

                  {p.featured && <div style={{ position: 'absolute', top: 10, right: 10, background: 'var(--color-primary)', color: 'var(--color-secondary)', fontSize: '0.7rem', fontWeight: 800, padding: '2px 8px', borderRadius: 100 }}>★ Featured</div>}
                </div>
                <div style={{ padding: 20 }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{p.category}</span>
                  <h3 style={{ fontWeight: 700, fontSize: '1rem', margin: '6px 0 8px' }}>{p.name}</h3>
                  <p style={{ fontSize: '0.87rem', color: 'var(--color-text-light)', lineHeight: 1.6, marginBottom: 16 }}>{p.description?.slice(0, 90)}...</p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => setProductPopup(p)} className="btn btn-primary btn-sm">Enquire Now</button>
                    {p.popupEnabled && p.popupContent && (
                      <button onClick={() => setProductPopup({ ...p, showInfo: true })} className="btn btn-outline-gold btn-sm">Info</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      {upcomingEvents.length > 0 && (
        <section className="section-pad bg-section">
          <div className="container">
            <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div className="badge">Coming Soon</div>
                <h2 className="section-title">Upcoming Events</h2>
                <div className="gold-divider" />
              </div>
              <Link href="/events" className="btn btn-outline-gold">All Events →</Link>
            </div>
            <div className="grid-3">
              {upcomingEvents.map(ev => <EventCard key={ev._id} event={ev} />)}
            </div>
          </div>
        </section>
      )}

      {/* EVENT COLLAGE / HIGHLIGHTS */}
      {collageEvents && collageEvents.length > 0 && (
        <section className="section-pad bg-alt">
          <div className="container">
            <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div className="badge">Behind The Scenes</div>
                <h2 className="section-title">Event Highlights</h2>
                <div className="gold-divider" />
                <p className="section-subtitle">A glimpse from the stages, weddings & shows we&apos;ve powered recently.</p>
              </div>
              <Link href="/events" className="btn btn-outline-gold">All Events →</Link>
            </div>
            <div className="collage-grid">
              {collageEvents.flatMap(ev => {
                const imgs = (ev.images && ev.images.length ? ev.images : ev.image ? [ev.image] : []).slice(0, 2);
                return imgs.map((src, i) => ({ src, title: ev.title, category: ev.category, slug: ev.slug || ev._id, key: `${ev._id}-${i}` }));
              }).slice(0, 8).map((tile, idx) => (
                <Link href={`/events/${tile.slug}`} key={tile.key} className={`collage-tile ${idx % 5 === 0 ? 'collage-tile-big' : ''}`}>
                  <img src={tile.src} alt={tile.title} loading="lazy" />
                  <div className="collage-overlay">
                    <span className="collage-cat">{tile.category}</span>
                    <span className="collage-title">{tile.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <style>{`
            .collage-grid {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              grid-auto-rows: 160px;
              gap: 12px;
            }
            .collage-tile {
              position: relative;
              display: block;
              overflow: hidden;
              border-radius: var(--radius-md);
              grid-column: span 1;
              grid-row: span 1;
            }
            .collage-tile-big {
              grid-column: span 2;
              grid-row: span 2;
            }
            .collage-tile img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
              transition: var(--transition);
            }
            .collage-tile:hover img { transform: scale(1.07); }
            .collage-overlay {
              position: absolute; inset: 0;
              background: linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.75) 100%);
              display: flex; flex-direction: column; justify-content: flex-end;
              padding: 12px; opacity: 0; transition: var(--transition);
            }
            .collage-tile:hover .collage-overlay { opacity: 1; }
            .collage-cat {
              color: var(--color-primary); font-size: 0.68rem; font-weight: 800;
              text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 2px;
            }
            .collage-title {
              color: #fff; font-weight: 700; font-size: 0.85rem; line-height: 1.3;
            }
            @media (max-width: 768px) {
              .collage-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 130px; }
              .collage-tile-big { grid-column: span 2; grid-row: span 1; }
            }
          `}</style>
        </section>
      )}

{/* EVENTS WE POWER */}
<section className="section-pad power-section">
  <div className="container">
    <div className="section-header center">
      <div className="badge">Our Portfolio</div>
      <h2 className="section-title">Events <span style={{ color: 'var(--color-primary)' }}>We Power</span></h2>
      <div className="gold-divider" />
      <p className="section-subtitle">From intimate gatherings to massive stadium concerts — we&apos;ve done it all.</p>
    </div>

    <div className="power-grid">
      {displayEventTypes.map((et, idx) => {
        const meta = POWER_META[idx % POWER_META.length];
        const num = String(idx + 1).padStart(2, '0');
        return (
          <div key={et._id || et.title} className="power-card">
            <div className="power-card-img">
              <img src={et.image} alt={et.title} loading="lazy" />
            </div>
            <span className="power-badge" style={{ background: meta.color }}>{meta.icon}</span>
            <div className="power-card-body">
              <span className="power-num" style={{ color: meta.color }}>{num}.</span>
              <h3 className="power-title">{et.title}</h3>
              {et.desc && <p className="power-desc">{et.desc}</p>}
              <div className="power-underline" style={{ background: meta.color }} />
            </div>
          </div>
        );
      })}
    </div>

    <div style={{ textAlign: 'center', marginTop: 44 }}>
      <Link href="/contact" className="btn power-cta">✨ Let&apos;s Create Something Extraordinary</Link>
    </div>
  </div>

  <style>{`
    .power-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px 20px;
    }
    .power-card {
      position: relative;
      background: var(--color-white);
      border-radius: 18px;
      overflow: visible;
      box-shadow: 0 6px 20px rgba(0,0,0,0.06);
      transition: var(--transition);
    }
    .power-card:hover { transform: translateY(-4px); box-shadow: 0 12px 28px rgba(0,0,0,0.1); }

    .power-card-img {
      position: relative;
      height: 170px;
      border-radius: 18px;
      overflow: hidden;
      clip-path: polygon(0 0, 100% 0, 100% 78%, 82% 100%, 0 100%);
    }
    .power-card:nth-child(4n+1) .power-card-img,
    .power-card:nth-child(4n+3) .power-card-img {
      clip-path: polygon(18% 0, 100% 0, 100% 100%, 0 100%, 0 22%);
    }
    .power-card-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: var(--transition); }
    .power-card:hover .power-card-img img { transform: scale(1.06); }

    .power-badge {
      position: absolute;
      top: 130px;
      left: 18px;
      width: 46px; height: 46px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.2rem; color: #fff;
      border: 4px solid var(--color-white);
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
      z-index: 2;
    }

    .power-card-body { padding: 30px 6px 4px 8px; }
    .power-num { font-weight: 800; font-size: 0.85rem; }
    .power-title { font-weight: 800; font-size: 1.05rem; margin: 2px 0 6px; color: var(--color-secondary); font-family: var(--font-display); }
    .power-desc { font-size: 0.85rem; color: var(--color-text-light); line-height: 1.5; margin-bottom: 12px; }
    .power-underline { width: 30px; height: 3px; border-radius: 2px; }

    .power-cta {
      display: inline-block;
      background: var(--color-secondary);
      color: var(--color-primary);
      font-weight: 700; font-size: 0.9rem;
      letter-spacing: 0.03em;
      padding: 16px 34px;
      border-radius: 100px;
      text-decoration: none;
      transition: var(--transition);
      min-height: 44px;
    }
    .power-cta:hover { background: var(--color-secondary-light); transform: translateY(-2px); }

    @media (max-width: 1024px) {
      .power-grid { grid-template-columns: repeat(2, 1fr); gap: 28px 20px; }
    }
    @media (max-width: 480px) {
      .power-grid { grid-template-columns: 1fr; gap: 26px; }
      .power-card-img { height: 190px; }
      .power-badge { top: 148px; }
      .power-cta { width: 100%; padding: 14px 20px; }
    }
  `}</style>
</section>

      {/* CTA / ENQUIRY */}
{/* CTA / ENQUIRY */}
<section className="cta-section">
  <div className="cta-bg-shapes" />
  <div className="container cta-grid">
    {/* LEFT */}
    <div className="cta-left">
      <div className="cta-pill">📅 BOOK YOUR EXPERIENCE</div>
      <h2 className="cta-heading">
        Ready to Create<br />Something<br />
        <span className="cta-script">Extraordinary?</span>
      </h2>
      <div className="cta-line" />
      <p className="cta-sub">Share your event details and our experts will craft an unforgettable experience tailored just for you.</p>

      <div className="cta-features">
        <div className="cta-feature">
          <span className="cta-feat-icon" style={{ background: '#6C4FE0' }}>⚡</span>
          <div><strong>Quick Response</strong><p>Within 30 Minutes</p></div>
        </div>
        <div className="cta-feature">
          <span className="cta-feat-icon" style={{ background: '#C0398F' }}>🎧</span>
          <div><strong>24/7 Support</strong><p>We&apos;re Always Here</p></div>
        </div>
        <div className="cta-feature">
          <span className="cta-feat-icon" style={{ background: '#1E9BB0' }}>🛡️</span>
          <div><strong>Trusted Experts</strong><p>10+ Years Experience</p></div>
        </div>
      </div>

      <div className="cta-call-card">
        <span className="cta-call-icon">📞</span>
        <div className="cta-call-text">
          <strong>Prefer to talk?</strong>
          <p>Call us anytime, we&apos;re happy to help!</p>
        </div>
        <div className="cta-call-numbers">
          {phones.map(p => <a key={p} href={`tel:${p}`}>{p}</a>)}
        </div>
      </div>

      <div className="cta-media">
        <div className="cta-circle-frame">
          <img src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=900&h=900&fit=crop" alt="event crowd" />
        </div>
        <div className="cta-strip">
          <img src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=200&h=200&fit=crop" alt="" />
          <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop" alt="" />
          <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=200&h=200&fit=crop" alt="" />
          <button type="button" className="cta-strip-next">›</button>
        </div>
      </div>
    </div>

    {/* RIGHT - QUICK ENQUIRY */}
    <div className="cta-right">
      <div className="cta-form-head">
        <span className="cta-form-icon">✈️</span>
        <div>
          <h3>Quick <span>Enquiry</span></h3>
          <p>Get a free quote for your event</p>
        </div>
      </div>
      <div className="cta-form-body">
        <EnquiryForm compact dark />
      </div>
    </div>
  </div>

  <div className="container cta-stats">
    <div className="cta-stat"><span>🏆</span><div><strong>500+</strong><p>Events Organized</p></div></div>
    <div className="cta-stat"><span>⭐</span><div><strong>98%</strong><p>Client Satisfaction</p></div></div>
    <div className="cta-stat"><span>🎖️</span><div><strong>10+</strong><p>Years Experience</p></div></div>
    <div className="cta-stat"><span>🎧</span><div><strong>24/7</strong><p>Support Available</p></div></div>
  </div>

  <style>{`
    .cta-section {
      position: relative;
      background: linear-gradient(135deg, #0B0F2A 0%, #150E33 60%, #1A0F38 100%);
      padding: 70px 0 50px;
      overflow: hidden;
    }
    .cta-bg-shapes {
      position: absolute; inset: 0; pointer-events: none;
      background: radial-gradient(circle at 90% 10%, rgba(147,51,234,0.18), transparent 40%),
                  radial-gradient(circle at 5% 90%, rgba(212,175,55,0.10), transparent 35%);
    }
    .cta-grid {
      position: relative; z-index: 1;
      display: grid; grid-template-columns: 1.05fr 0.85fr; gap: 40px; align-items: start;
    }
    .cta-left { min-width: 0; }

    .cta-pill {
      display: inline-block; border: 1px solid rgba(212,175,55,0.5); color: var(--color-primary);
      font-size: 0.72rem; font-weight: 800; letter-spacing: 0.08em; padding: 8px 18px; border-radius: 100px;
      margin-bottom: 22px;
    }
    .cta-heading { font-family: var(--font-display); font-size: clamp(2rem,3.4vw,3.1rem); font-weight: 800; color: #fff; line-height: 1.15; margin: 0; }
    .cta-script { font-family: 'Brush Script MT', cursive; font-weight: 400; color: var(--color-primary); font-size: 1.15em; }
    .cta-line { width: 56px; height: 3px; background: var(--color-primary); border-radius: 2px; margin: 22px 0 18px; }
    .cta-sub { color: rgba(255,255,255,0.65); line-height: 1.7; max-width: 460px; margin-bottom: 26px; }

    .cta-features { display: flex; gap: 26px; flex-wrap: wrap; margin-bottom: 26px; }
    .cta-feature { display: flex; align-items: center; gap: 10px; }
    .cta-feat-icon { width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; }
    .cta-feature strong { color: #fff; font-size: 0.85rem; display: block; }
    .cta-feature p { color: rgba(255,255,255,0.5); font-size: 0.75rem; margin: 2px 0 0; }

    .cta-call-card {
      display: flex; align-items: center; gap: 14px; flex-wrap: wrap;
      background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
      border-radius: 16px; padding: 16px 20px; margin-bottom: 30px;
    }
    .cta-call-icon { width: 42px; height: 42px; border-radius: 50%; background: rgba(212,175,55,0.15); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; }
    .cta-call-text strong { color: #fff; font-size: 0.9rem; }
    .cta-call-text p { color: rgba(255,255,255,0.5); font-size: 0.78rem; margin: 2px 0 0; }
    .cta-call-numbers { display: flex; flex-direction: column; margin-left: auto; }
    .cta-call-numbers a { color: var(--color-primary); font-weight: 700; font-size: 0.9rem; text-decoration: none; }

    /* FIXED: circle image sizing */
    .cta-media { position: relative; display: flex; justify-content: center; padding-bottom: 30px; }
    .cta-circle-frame {
      width: 320px; height: 320px;
      border-radius: 50%;
      overflow: hidden;
      border: 1px solid rgba(212,175,55,0.35);
      flex-shrink: 0;
    }
    .cta-circle-frame img {
      width: 100%; height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
    }
    .cta-strip {
      position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
      display: flex; align-items: center; gap: 8px;
      background: rgba(11,15,42,0.9); padding: 8px; border-radius: 14px;
      border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(6px);
    }
    .cta-strip img { width: 56px; height: 56px; object-fit: cover; border-radius: 8px; display: block; }
    .cta-strip-next {
      width: 32px; height: 32px; border-radius: 50%; background: var(--color-primary); color: #1A0F38;
      border: none; font-size: 1.1rem; font-weight: 900; cursor: pointer; flex-shrink: 0;
    }

    .cta-right {
      background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
      border-radius: 22px; padding: 32px; backdrop-filter: blur(6px);
      position: sticky; top: 24px;
    }
    .cta-form-head { display: flex; align-items: center; gap: 14px; margin-bottom: 24px; }
    .cta-form-icon { width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg,#6C4FE0,#9333EA); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0; }
    .cta-form-head h3 { color: #fff; font-size: 1.25rem; font-weight: 800; margin: 0; }
    .cta-form-head h3 span { color: var(--color-primary); }
    .cta-form-head p { color: rgba(255,255,255,0.5); font-size: 0.82rem; margin: 2px 0 0; }

    /* FIXED: inputs + select visibility */
    .cta-form-body label { color: rgba(255,255,255,0.6) !important; font-size: 0.78rem !important; }
    .cta-form-body input,
    .cta-form-body select,
    .cta-form-body textarea {
      background: rgba(255,255,255,0.06) !important;
      border: 1px solid rgba(255,255,255,0.15) !important;
      color: #fff !important;
      border-radius: 12px !important;
      min-height: 48px;
      -webkit-appearance: none;
      appearance: none;
    }
    .cta-form-body input::placeholder,
    .cta-form-body textarea::placeholder { color: rgba(255,255,255,0.4) !important; }
    /* native <option> list is rendered by OS/browser and ignores parent bg —
       force explicit colors on each option so text never goes white-on-white */
    .cta-form-body select option {
      background: #1A0F38 !important;
      color: #fff !important;
    }
    .cta-form-body select {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23D4AF37' stroke-width='3'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") !important;
      background-repeat: no-repeat !important;
      background-position: right 16px center !important;
      padding-right: 40px !important;
    }
    .cta-form-body button[type="submit"] {
      background: linear-gradient(90deg, var(--color-primary), #9333EA) !important;
      border: none !important; border-radius: 12px !important; font-weight: 700 !important;
      min-height: 48px !important; width: 100% !important;
    }

    .cta-stats {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;
      margin-top: 56px; padding-top: 36px; border-top: 1px solid rgba(255,255,255,0.08);
    }
    .cta-stat { display: flex; align-items: center; gap: 12px; }
    .cta-stat span { font-size: 1.6rem; }
    .cta-stat strong { color: #fff; font-size: 1.3rem; font-weight: 800; display: block; }
    .cta-stat p { color: rgba(255,255,255,0.5); font-size: 0.78rem; margin: 2px 0 0; }

    @media (max-width: 1024px) {
      .cta-grid { grid-template-columns: 1fr; }
      .cta-right { position: static; }
      .cta-stats { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 600px) {
      .cta-features { flex-direction: column; gap: 14px; }
      .cta-call-card { flex-direction: column; align-items: flex-start; }
      .cta-call-numbers { margin-left: 0; }
      .cta-circle-frame { width: 240px; height: 240px; }
      .cta-stats { grid-template-columns: 1fr 1fr; gap: 24px; }
      .cta-right { padding: 22px; }
    }
  `}</style>
</section>
      {/* Product popup */}
      {productPopup && (
        <PopupModal isOpen={!!productPopup} onClose={() => setProductPopup(null)} title={productPopup.showInfo ? productPopup.name : `Enquire: ${productPopup.name}`} size="md">
          {productPopup.showInfo ? (
            <div>
              <div dangerouslySetInnerHTML={{ __html: productPopup.popupContent }} style={{ lineHeight: 1.75, color: 'var(--color-text-light)', marginBottom: 20 }} />
              <button onClick={() => setProductPopup({ ...productPopup, showInfo: false })} className="btn btn-primary btn-sm">Enquire Now</button>
            </div>
          ) : (
            <EnquiryForm defaultProduct={productPopup.name} compact />
          )}
        </PopupModal>
      )}
    </Layout>
  );
}

function EventCard({ event }) {
  const d = new Date(event.date);
  const catColors = { Corporate: '#2563EB', Wedding: '#DB2777', Concert: '#D97706', College: '#16A34A', Government: '#7C3AED', Other: '#6B7280' };
  const color = catColors[event.category] || '#6B7280';
  return (
    <Link href={`/events/${event.slug || event._id}`} className="card" style={{ display: 'block', textDecoration: 'none' }}>
      {event.image ? (
        <div style={{ height: 130, position:'relative', overflow:'hidden', borderBottom: '1px solid var(--color-border)' }}>
          <img src={event.image} alt={event.title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} loading="lazy" />
          <div style={{ position: 'absolute', top: 10, right: 10, background: color, color: '#fff', fontSize: '0.7rem', fontWeight: 700, padding: '3px 10px', borderRadius: 100 }}>{event.category}</div>
          <div style={{ position: 'absolute', top: 10, left: 10, background: 'var(--color-primary)', color: 'var(--color-secondary)', fontSize: '0.7rem', fontWeight: 800, padding: '3px 10px', borderRadius: 100 }}>UPCOMING</div>
          <div style={{ position:'absolute', bottom:0, left:0, background:'rgba(0,0,0,0.55)', color:'#fff', padding:'4px 12px', borderTopRightRadius:8 }}>
            <span style={{ fontWeight:800, fontSize:'0.9rem' }}>{d.getDate()}</span> <span style={{ fontSize:'0.74rem', fontWeight:600 }}>{d.toLocaleString('default',{month:'short'}).toUpperCase()} {d.getFullYear()}</span>
          </div>
        </div>
      ) : (
        <div style={{ height: 130, background: `linear-gradient(135deg,${color}22,${color}44)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, color, lineHeight: 1 }}>{d.getDate()}</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color, letterSpacing: '0.1em' }}>{d.toLocaleString('default', { month: 'short' }).toUpperCase()} {d.getFullYear()}</div>
          </div>
          <div style={{ position: 'absolute', top: 10, right: 10, background: color, color: '#fff', fontSize: '0.7rem', fontWeight: 700, padding: '3px 10px', borderRadius: 100 }}>{event.category}</div>
          <div style={{ position: 'absolute', top: 10, left: 10, background: 'var(--color-primary)', color: 'var(--color-secondary)', fontSize: '0.7rem', fontWeight: 800, padding: '3px 10px', borderRadius: 100 }}>UPCOMING</div>
        </div>
      )}
      <div style={{ padding: 20 }}>
        <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 6 }}>{event.title}</h3>
        {event.venue && <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)' }}>📍 {event.venue}</p>}
      </div>
    </Link>
  );
}

export async function getServerSideProps() {
  try {
    const common = await getCommonProps();
    await connectDB();
    const [featuredProducts, upcomingEvents, collageEventsRaw] = await Promise.all([
      Product.find({ featured: true }).limit(8).lean(),
      Event.find({ isUpcoming: true, date: { $gte: new Date() } }).sort({ date: 1 }).limit(3).lean(),
      Event.find({ $or: [{ image: { $exists: true, $ne: '' } }, { 'images.0': { $exists: true } }] })
        .sort({ date: -1 }).limit(8).select('title slug category images image').lean(),
    ]);
    return {
      props: {
        ...common,
        featuredProducts: JSON.parse(JSON.stringify(featuredProducts)),
        upcomingEvents: JSON.parse(JSON.stringify(upcomingEvents)),
        collageEvents: JSON.parse(JSON.stringify(collageEventsRaw)),
      },
    };
  } catch { return { props: { featuredProducts: [], upcomingEvents: [], collageEvents: [], site: {}, footerPages: [], stats: [], celebrities: [], whyChoose: [], eventTypes: [] } }; }
}