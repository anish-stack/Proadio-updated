import Layout from '../components/Layout';
import Link from 'next/link';
import { useState } from 'react';
import { WHY_CHOOSE, CLIENTS_TYPES } from '../lib/siteData';
import { connectDB, Product, Event } from '../lib/db';
import { getCommonProps } from '../lib/pageProps';
import EnquiryForm from '../components/EnquiryForm';
import PopupModal from '../components/PopupModal';
import HeroSection from '../components/HeroSection';

const CAT_ICONS = { 'Sound Systems': '🔊', 'Mixing Consoles': '🎛️', 'Microphones': '🎤', 'Lighting': '💡', 'Trussing & Structures': '🏗️', 'LED Walls': '📺' };

export default function Home({ featuredProducts, upcomingEvents, collageEvents, site, footerPages, stats, celebrities, whyChoose, eventTypes }) {
  const s = site || {};
  const phones = [s.phone1, s.phone2, s.phone3].filter(Boolean);
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
      <section className="section-pad bg-alt">
        <div className="container">
          <div className="section-header center">
            <div className="badge">Why Choose Us</div>
            <h2 className="section-title">The Pro Audio Advantage</h2>
            <div className="gold-divider" />
            <p className="section-subtitle">Expert engineers, premium equipment, and unmatched reliability — every event, every time.</p>
          </div>
          <div className="grid-3">
            {displayWhyChoose.map(item => (
              <div key={item._id || item.title} className="why-card">
                <div className="why-card-img">
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>
                <div className="why-card-body">
                  <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .why-card {
            background: var(--color-white); border-radius: var(--radius-lg); overflow: hidden;
            border: 1px solid var(--color-border); box-shadow: var(--shadow-sm); transition: var(--transition);
          }
          .why-card:hover { box-shadow: var(--shadow-gold); transform: translateY(-4px); }
          .why-card-img { height: 170px; overflow: hidden; }
          .why-card-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: var(--transition); }
          .why-card:hover .why-card-img img { transform: scale(1.06); }
          .why-card-body { padding: 22px; }
        `}</style>
      </section>


      {/* CELEBRITIES */}
      {celebrities && celebrities.length > 0 && (
        <section className="section-pad" style={{ background: 'linear-gradient(180deg, var(--color-secondary) 0%, var(--color-secondary-light) 100%)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(circle at 20% 20%, var(--color-primary) 0%, transparent 35%), radial-gradient(circle at 80% 80%, var(--color-primary) 0%, transparent 35%)' }} />
          <div className="container" style={{ position: 'relative' }}>
            <div className="section-header center">
              <div className="badge" style={{ background: 'rgba(212,175,55,0.15)', borderColor: 'rgba(212,175,55,0.4)', color: 'var(--color-primary)' }}>Star Power</div>
              <h2 className="section-title" style={{ color: 'var(--color-white)' }}>Celebrities We&apos;ve Worked With</h2>
              <div className="gold-divider" />
              <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.65)', margin: '0 auto' }}>Trusted by top artists and performers for sound, lighting & production that never misses a beat.</p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 28 }}>
              {celebrities.map(c => (
                <div key={c._id} style={{ width: 160, textAlign: 'center' }}>
                  <div style={{
                    width: 130, height: 130, borderRadius: '50%', margin: '0 auto 14px', padding: 3,
                    background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.35)', transition: 'var(--transition)',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px) scale(1.04)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none' }}
                  >
                    <img src={c.image} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', border: '3px solid var(--color-secondary)', display: 'block' }} loading="lazy" />
                  </div>
                  <h3 style={{ color: 'var(--color-white)', fontWeight: 700, fontSize: '0.95rem', marginBottom: 2 }}>{c.name}</h3>
                  {c.designation && <p style={{ color: 'var(--color-primary)', fontSize: '0.78rem', fontWeight: 600 }}>{c.designation}</p>}
                </div>
              ))}
            </div>
          </div>
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


      <section className="section-pad">
        <div className="container">
          <div className="section-header center">
            <div className="badge">Our Portfolio</div>
            <h2 className="section-title">Events We Power</h2>
            <div className="gold-divider" />
            <p className="section-subtitle">From intimate gatherings to massive stadium concerts — we&apos;ve done it all.</p>
          </div>
          <div className="events-power-grid">
            {displayEventTypes.map(et => (
              <div key={et._id || et.title} className="events-power-card">
                <img src={et.image} alt={et.title} loading="lazy" />
                <div className="events-power-overlay">
                  <span>{et.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .events-power-grid {
            display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
          }
          .events-power-card {
            position: relative; border-radius: var(--radius-md); overflow: hidden;
            height: 150px; box-shadow: var(--shadow-sm); transition: var(--transition);
          }
          .events-power-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-3px); }
          .events-power-card img { width: 100%; height: 100%; object-fit: cover; display: block; transition: var(--transition); }
          .events-power-card:hover img { transform: scale(1.08); }
          .events-power-overlay {
            position: absolute; inset: 0; display: flex; align-items: flex-end;
            background: linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.72) 100%);
            padding: 12px;
          }
          .events-power-overlay span { color: #fff; font-weight: 700; font-size: 0.9rem; line-height: 1.25; }
          @media (max-width: 900px) { .events-power-grid { grid-template-columns: repeat(3, 1fr); } }
          @media (max-width: 600px) { .events-power-grid { grid-template-columns: repeat(2, 1fr); } }
        `}</style>
      </section>

      {/* CTA / ENQUIRY */}
      <section style={{ background: 'linear-gradient(135deg, var(--color-secondary), var(--color-secondary-light))', padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div className="badge" style={{ background: 'rgba(212,175,55,0.15)', borderColor: 'rgba(212,175,55,0.4)', color: 'var(--color-primary)' }}>Book Now</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 800, color: 'var(--color-white)', margin: '12px 0 16px' }}>Ready to Create an Unforgettable Event?</h2>
              <div style={{ width: 60, height: 4, background: 'var(--color-primary)', borderRadius: 2, marginBottom: 20 }} />
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, marginBottom: 28 }}>Call us now for instant availability and a free quote. Available 24×7.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {phones.map(p => (
                  <a key={p} href={`tel:${p}`} style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--color-primary)', fontWeight: 700, fontSize: '1.05rem' }}>
                    <span style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(212,175,55,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📞</span>{p}
                  </a>
                ))}
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.97)', borderRadius: 'var(--radius-xl)', padding: 36 }}>
              <h3 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: 24, color: 'var(--color-text)' }}>Quick Enquiry</h3>
              <EnquiryForm compact />
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important}}`}</style>
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
      Product.find({ featured: true }).limit(6).lean(),
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
