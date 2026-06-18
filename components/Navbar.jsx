import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NAV_LINKS = [
  { href: '/',        label: 'Home'     },
  { href: '/about',   label: 'About'    },
  { href: '/products',label: 'Products' },
  { href: '/events',  label: 'Events'   },
  { href: '/gallery', label: 'Gallery'  },
  { href: '/contact', label: 'Contact'  },
];

export default function Navbar({ site }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const s = site || {};
  const logoText = s.logoText || 'PA';
  const logoUrl  = s.logoUrl  || '';
  const siteName = s.name     || 'Pro Audio Solution';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [router.pathname]);

  const isHome = router.pathname === '/';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

        .nav-root {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          transition: background .35s ease, border-color .35s ease, box-shadow .35s ease;
        }
        .nav-root.top {
          background: linear-gradient(to bottom, rgba(4,6,13,.85), rgba(4,6,13,0));
          border-bottom: 1px solid transparent;
          box-shadow: none;
        }
        .nav-root.scrolled {
          background: rgba(6,8,18,.92);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(212,175,55,.15);
          box-shadow: 0 4px 32px rgba(0,0,0,.5);
        }
        .nav-inner {
          max-width: 1280px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          height: 70px; padding: 0 clamp(16px,4vw,48px);
        }
        /* Logo */
        .nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .nav-logo-box {
          width: 40px; height: 40px; border-radius: 8px;
          background: #D4AF37;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Bebas Neue', sans-serif; font-size: 1.1rem;
          color: #04060D; letter-spacing: .05em; flex-shrink: 0;
          box-shadow: 0 0 18px rgba(212,175,55,.35);
        }
        .nav-logo-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.25rem; color: #fff;
          line-height: 1; letter-spacing: .04em;
        }
        .nav-logo-sub {
          font-size: .62rem; letter-spacing: .14em;
          color: #D4AF37; font-weight: 700; text-transform: uppercase;
          margin-top: 2px;
        }
        /* Desktop links */
        .nav-links { display: flex; align-items: center; gap: 2px; list-style: none; }
        .nav-link {
          padding: 7px 14px; border-radius: 4px;
          font-weight: 600; font-size: .85rem; letter-spacing: .03em;
          color: rgba(255,255,255,.65);
          text-decoration: none; display: block;
          transition: color .2s, background .2s;
          position: relative;
        }
        .nav-link:hover { color: #fff; background: rgba(255,255,255,.06); }
        .nav-link.active { color: #D4AF37; }
        .nav-link.active::after {
          content: ''; position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%);
          width: 18px; height: 2px; border-radius: 1px; background: #D4AF37;
        }
        .nav-cta {
          background: #D4AF37; color: #04060D;
          font-weight: 700; font-size: .78rem; letter-spacing: .07em; text-transform: uppercase;
          padding: 9px 20px; border-radius: 4px; text-decoration: none;
          transition: background .2s, transform .15s;
          margin-left: 8px; white-space: nowrap;
        }
        .nav-cta:hover { background: #e8c84a; transform: translateY(-1px); }
        /* Hamburger */
        .nav-ham {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; padding: 8px; cursor: pointer;
        }
        .nav-ham span {
          width: 22px; height: 2px; background: #fff;
          border-radius: 2px; display: block; transition: transform .25s, opacity .25s;
          transform-origin: center;
        }
        /* Mobile drawer */
        .nav-drawer {
          overflow: hidden; transition: max-height .32s ease;
          background: rgba(6,8,18,.97);
          border-top: 1px solid rgba(212,175,55,.12);
        }
        .nav-drawer ul { list-style: none; padding: 10px 24px 20px; }
        .nav-drawer li { border-bottom: 1px solid rgba(255,255,255,.06); }
        .nav-drawer a {
          display: block; padding: 13px 0;
          font-weight: 600; font-size: .95rem; color: rgba(255,255,255,.7);
          text-decoration: none; transition: color .2s;
        }
        .nav-drawer a:hover, .nav-drawer a.active { color: #D4AF37; }
        .nav-drawer-cta {
          display: block; margin-top: 16px;
          background: #D4AF37; color: #04060D;
          font-weight: 700; font-size: .82rem; letter-spacing: .07em; text-transform: uppercase;
          padding: 13px; border-radius: 4px; text-align: center; text-decoration: none;
        }
        @media (max-width: 900px) {
          .nav-links { display: none !important; }
          .nav-ham   { display: flex !important; }
        }
        @media (min-width: 901px) {
          .nav-drawer { display: none !important; }
        }
      `}</style>

      <nav className={`nav-root ${scrolled ? 'scrolled' : 'scrolled'}`}>
        <div className="nav-inner">

          {/* Logo */}
          <Link href="/" className="nav-logo">
            {logoUrl ? (
              <img src={logoUrl} alt={siteName} style={{ height: 40, width: 'auto', objectFit: 'contain' }} />
            ) : (
              <>
                <div className="nav-logo-box">{logoText}</div>
                <div>
                  <div className="nav-logo-name">{siteName.split(' ').slice(0, 2).join(' ')}</div>
                  <div className="nav-logo-sub">{siteName.split(' ').slice(2).join(' ') || 'Solution'}</div>
                </div>
              </>
            )}
          </Link>

          {/* Desktop nav */}
          <ul className="nav-links">
            {NAV_LINKS.map(l => (
              <li key={l.href}>
                <Link href={l.href} className={`nav-link${router.pathname === l.href ? ' active' : ''}`}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li><Link href="/contact" className="nav-cta">Get Quote ↗</Link></li>
          </ul>

          {/* Hamburger */}
          <button className="nav-ham" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
            <span style={{ transform: menuOpen ? 'rotate(45deg) translateY(7px)'  : 'none' }} />
            <span style={{ opacity:    menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
          </button>
        </div>

        {/* Mobile drawer */}
        <div className="nav-drawer" style={{ maxHeight: menuOpen ? 500 : 0 }}>
          <ul>
            {NAV_LINKS.map(l => (
              <li key={l.href}>
                <Link href={l.href} className={router.pathname === l.href ? 'active' : ''}>{l.label}</Link>
              </li>
            ))}
            <li style={{ border: 'none' }}>
              <Link href="/contact" className="nav-drawer-cta">Get Free Quote ↗</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}