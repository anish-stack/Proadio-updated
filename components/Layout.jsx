import { useState } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import { ContactModal, ContactFAB } from './ContactModal';

export default function Layout({ children, title, description, keywords, noindex, site, footerPages }) {
  const s = site || {};
  const [contactOpen, setContactOpen] = useState(false);
  const siteName = s.name || 'Pro Audio Solution';
  const pageTitle = title ? `${title} | ${siteName}` : `${siteName} — ${s.tagline || 'Premium Light & Sound Solutions'}`;
  const pageDesc = description || `${siteName} — Delhi's leading light & sound company. PA systems, dynamic lighting, LED walls, trussing for weddings, corporate events & concerts.`;
  const pageKeys = keywords || 'pro audio solution, sound system rental delhi, pa system rental, event lighting delhi, led wall rental, truss rental, digico, jbl, grandma3';
  const website = s.website || 'www.proaudiosolution.in';

  const themeVars = `
    :root {
      --color-primary: ${s.colorPrimary || '#D4AF37'};
      --color-primary-dark: ${darken(s.colorPrimary || '#D4AF37')};
      --color-primary-light: ${lighten(s.colorPrimary || '#D4AF37')};
      --color-secondary: ${s.colorSecondary || '#1A1A2E'};
      --color-secondary-light: ${lighten(s.colorSecondary || '#1A1A2E', 0.06)};
      --color-accent: ${s.colorAccent || '#E94560'};
      --color-bg: ${s.colorBg || '#FFFFFF'};
      --color-bg-alt: ${s.colorBgAlt || '#F8F7F4'};
      --color-bg-section: ${s.colorBgAlt || '#F3F0EA'};
      --color-text: ${s.colorText || '#1A1A2E'};
      --color-text-light: #555B6E;
      --color-text-muted: #888EA8;
      --color-border: #E8E4D9;
      --color-white: #FFFFFF;
      --color-success: #27AE60;
      --color-error: #E74C3C;
      --shadow-sm: 0 1px 4px rgba(26,26,46,0.08);
      --shadow-md: 0 4px 16px rgba(26,26,46,0.10);
      --shadow-lg: 0 8px 32px rgba(26,26,46,0.14);
      --shadow-gold: 0 4px 20px rgba(212,175,55,0.18);
      --radius-sm: 6px; --radius-md: 12px; --radius-lg: 20px; --radius-xl: 32px;
      --font-primary: 'Inter','Segoe UI',system-ui,sans-serif;
      --font-display: 'Playfair Display',Georgia,serif;
      --transition: all 0.25s ease;
    }
  `;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="keywords" content={pageKeys} />
        <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteName} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`https://${website}`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <style dangerouslySetInnerHTML={{ __html: themeVars }} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar site={s} />
      <main style={{ paddingTop: 68 }}>{children}</main>
      <Footer site={s} footerPages={footerPages || []} />
      <ContactFAB onClick={() => setContactOpen(true)} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}

function darken(hex) {
  try {
    const n = parseInt(hex.replace('#',''), 16);
    const r = Math.max(0,(n>>16)-30), g = Math.max(0,((n>>8)&0xff)-30), b = Math.max(0,(n&0xff)-30);
    return '#'+((r<<16)|(g<<8)|b).toString(16).padStart(6,'0');
  } catch { return hex; }
}
function lighten(hex, amt=0.15) {
  try {
    const n = parseInt(hex.replace('#',''), 16);
    const r = Math.min(255,(n>>16)+Math.round(255*amt)), g = Math.min(255,((n>>8)&0xff)+Math.round(255*amt)), b = Math.min(255,(n&0xff)+Math.round(255*amt));
    return '#'+((r<<16)|(g<<8)|b).toString(16).padStart(6,'0');
  } catch { return hex; }
}
