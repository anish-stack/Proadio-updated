import { useState } from 'react';
import Link from 'next/link';
import PopupModal from './PopupModal';

export default function Footer({ site, footerPages }) {
  const s = site || {};
  const year = new Date().getFullYear();
  const logoText = s.logoText || 'PA';
  const logoUrl = s.logoUrl || '';
  const siteName = s.name || 'Pro Audio Solution';
  const phones = [s.phone1, s.phone2, s.phone3].filter(Boolean);
  const policyPages = (footerPages || []).filter(p => p.published && p.showInFooter);
  const [popup, setPopup] = useState(null);

  const SERVICES = [
    { label: 'PA & Sound Systems', slug: 'sound-systems' },
    { label: 'Dynamic Lighting', slug: 'lighting' },
    { label: 'LED Walls', slug: 'led-walls' },
    { label: 'Trussing & Structures', slug: 'trussing' },
    { label: 'Mixing Consoles', slug: 'consoles' },
    { label: 'Wireless Microphones', slug: 'microphones' },
  ];

    const Policy = [
    { label: 'Refund Policy', slug: 'refund-policy' },
    { label: 'Terms & Conditions', slug: 'terms-conditions' },
    { label: 'Privacy Policy', slug: 'privacy-policy' }
  ];
  const handleServiceClick = (e, service) => {
    // Check if there's a CMS page for this service
    const page = (footerPages || []).find(p => p.slug === service.slug && p.published);
    if (page && page.popupEnabled && page.popupContent) {
      e.preventDefault();
      setPopup(page);
    }
  };

  return (
    <>
      <footer style={{ background: 'var(--color-secondary)', color: 'rgba(255,255,255,0.85)', paddingTop: 64 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 40, paddingBottom: 48 }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                {logoUrl ? (
                  <img src={logoUrl} alt={siteName} style={{ height: 44, width: 'auto', objectFit: 'contain' }} />
                ) : (
                  <>
                   
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.15rem', color: 'var(--color-white)' }}>{siteName}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--color-primary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Premium Light &amp; Sound</div>
                    </div>
                  </>
                )}
              </div>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', marginBottom: 20 }}>
                {s.about ? s.about.slice(0, 130) + '...' : "Delhi's leading light & sound company — delivering top-quality audio and lighting experiences for every event."}
              </p>
              {/* Social */}
              <div style={{ display: 'flex', gap: 10 }}>
                {s.facebook && <SocialLink href={s.facebook} label="FB" />}
                {s.instagram && <SocialLink href={s.instagram} label="IG" />}
                {s.youtube && <SocialLink href={s.youtube} label="YT" />}
                {s.whatsapp && <SocialLink href={`https://wa.me/${s.whatsapp}`} label="WA" />}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ color: 'var(--color-primary)', fontWeight: 700, marginBottom: 16, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Quick Links</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[['Home', '/'], ['About Us', '/about'], ['Products', '/products'], ['Events', '/events'], ['Gallery', '/gallery'], ['Contact', '/contact']].map(([label, href]) => (
                  <li key={href}><Link href={href} style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = 'var(--color-primary)'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.7)'}
                  >{label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 style={{ color: 'var(--color-primary)', fontWeight: 700, marginBottom: 16, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Services</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {SERVICES.map(svc => (
                  <li key={svc.slug}>
                    <Link href={`/products?category=${encodeURIComponent(svc.label)}`}
                      onClick={(e) => handleServiceClick(e, svc)}
                      style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', transition: 'color 0.2s', cursor: 'pointer' }}
                      onMouseEnter={e => e.target.style.color = 'var(--color-primary)'}
                      onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.7)'}
                    >{svc.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Services */}
            <div>
              <h4 style={{ color: 'var(--color-primary)', fontWeight: 700, marginBottom: 16, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Services</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {Policy.map(svc => (
                  <li key={svc.slug}>
                    <Link href={`/cms/${encodeURIComponent(svc.slug)}`}
                   
                      style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', transition: 'color 0.2s', cursor: 'pointer' }}
                      onMouseEnter={e => e.target.style.color = 'var(--color-primary)'}
                      onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.7)'}
                    >{svc.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Contact */}
            <div>
              <h4 style={{ color: 'var(--color-primary)', fontWeight: 700, marginBottom: 16, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Contact</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {phones.map(p => (
                  <a key={p} href={`tel:${p}`} style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 8 }}>📞 {p}</a>
                ))}
                {s.email && <a href={`mailto:${s.email}`} style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 8, wordBreak: 'break-all' }}>✉️ {s.email}</a>}
                {s.address && <div style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.6)', display: 'flex', gap: 8 }}><span>📍</span><span>{s.address}</span></div>}
              </div>
            </div>
          </div>

          {/* Policy links */}
          {policyPages.length > 0 && (
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '16px 0', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {policyPages.map(pg => (
                <Link key={pg.slug} href={`/cms/${pg.slug}`} style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--color-primary)'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.45)'}
                >{pg.title}</Link>
              ))}
            </div>
          )}

          {/* Bottom */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>© {year} {siteName}. All rights reserved.</p>
            {s.website && <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}><a href={`https://${s.website}`} style={{ color: 'var(--color-primary)' }}>{s.website}</a></p>}
          </div>
        </div>
      </footer>

      {/* Service Popup */}
      {popup && (
        <PopupModal isOpen={!!popup} onClose={() => setPopup(null)} title={popup.title}>
          <div dangerouslySetInnerHTML={{ __html: popup.popupContent }} style={{ lineHeight: 1.75, color: 'var(--color-text-light)', fontSize: '0.95rem' }} />
          <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
            <Link href={`/cms/${popup.slug}`} className="btn btn-primary btn-sm" onClick={() => setPopup(null)}>View Full Page</Link>
            <button onClick={() => setPopup(null)} className="btn btn-secondary btn-sm">Close</button>
          </div>
        </PopupModal>
      )}
    </>
  );
}

function SocialLink({ href, label }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{
      width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '0.78rem', fontWeight: 800, color: 'rgba(255,255,255,0.7)', transition: 'all 0.2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-secondary)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
    >{label}</a>
  );
}
