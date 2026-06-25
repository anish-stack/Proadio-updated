import { useState } from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react';
import PopupModal from './PopupModal';

function WhatsAppIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.149-.15.347-.39.521-.585.174-.198.232-.297.348-.495.116-.198.06-.372-.04-.522-.099-.149-.643-1.553-.886-2.149-.18-.434-.36-.385-.499-.392-.137-.006-.296-.007-.456-.007-.156 0-.41.06-.628.296-.219.235-.836.815-.836 1.99 0 1.176.86 2.312.978 2.479.118.166 1.626 2.494 3.99 3.402 1.978.755 2.378.604 2.81.563.43-.04 1.39-.566 1.586-1.115.196-.55.196-1.018.137-1.116-.058-.099-.297-.149-.594-.298z" />
      <path d="M12.04 2C6.477 2 2 6.477 2 12.04c0 1.96.554 3.787 1.516 5.347L2 22l4.74-1.484A9.93 9.93 0 0012.04 22c5.563 0 10.04-4.477 10.04-10.04C22.08 6.477 17.603 2 12.04 2zm0 18.18a8.1 8.1 0 01-4.378-1.279l-.314-.197-3.103.972.99-3.027-.205-.31A8.13 8.13 0 0112.04 3.86c4.51 0 8.18 3.67 8.18 8.18 0 4.51-3.67 8.14-8.18 8.14z" />
    </svg>
  );
}

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
                {s.facebook && <SocialLink href={s.facebook} icon={<Facebook size={16} />} />}
                {s.instagram && <SocialLink href={s.instagram} icon={<Instagram size={16} />} />}
                {s.youtube && <SocialLink href={s.youtube} icon={<Youtube size={16} />} />}
                {s.whatsapp && <SocialLink href={`https://wa.me/${s.whatsapp.replace(/\D/g, '')}`} icon={<WhatsAppIcon size={15} />} />}
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
                  <a key={p} href={`tel:${p}`} style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 8 }}><Phone size={15} style={{ flexShrink: 0 }} /> {p}</a>
                ))}
                {s.email && <a href={`mailto:${s.email}`} style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 8, wordBreak: 'break-all' }}><Mail size={15} style={{ flexShrink: 0 }} /> {s.email}</a>}
                {s.address && <div style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.6)', display: 'flex', gap: 8 }}><MapPin size={15} style={{ flexShrink: 0, marginTop: 2 }} /><span>{s.address}</span></div>}
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

function SocialLink({ href, icon }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{
      width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'rgba(255,255,255,0.7)', transition: 'all 0.2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-secondary)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
    >{icon}</a>
  );
}
