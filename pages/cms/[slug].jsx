import Layout from '../../components/Layout';
import Link from 'next/link';
import { connectDB, Page } from '../../lib/db';
import { getCommonProps } from '../../lib/pageProps';

export default function CmsPage({ page, site, footerPages }) {
  if (!page) return (
    <Layout site={site} footerPages={footerPages} title="Page Not Found">
      <div style={{ textAlign:'center', padding:'100px 24px' }}>
        <h1 style={{ fontSize:'2rem', fontWeight:800, marginBottom:16 }}>Page Not Found</h1>
        <Link href="/" className="btn btn-primary">Go Home</Link>
      </div>
    </Layout>
  );

  return (
    <Layout
      site={site}
      footerPages={footerPages}
      title={page.metaTitle || page.title}
      description={page.metaDesc || ''}
      noindex={!page.published}
    >
      {/* Header */}
      <section style={{ background:'linear-gradient(135deg, var(--color-secondary), #0f3460)', padding:'52px 0 40px' }}>
        <div className="container">
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12, flexWrap:'wrap' }}>
            <Link href="/" style={{ color:'rgba(255,255,255,0.5)', fontSize:'0.85rem' }}>Home</Link>
            <span style={{ color:'rgba(255,255,255,0.3)' }}>/</span>
            <span style={{ color:'rgba(255,255,255,0.7)', fontSize:'0.85rem' }}>{page.title}</span>
          </div>
          {page.pageType === 'policy' && (
            <div className="badge" style={{ background:'rgba(212,175,55,0.15)', borderColor:'rgba(212,175,55,0.4)', color:'var(--color-primary)' }}>Legal</div>
          )}
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.8rem,3.5vw,2.8rem)', color:'var(--color-white)', fontWeight:800, marginTop:10 }}>{page.title}</h1>
        </div>
      </section>

      {/* Content */}
      <section className="section-pad">
        <div className="container">
          <div style={{ maxWidth:800, margin:'0 auto' }}>
            {page.htmlContent ? (
              <div
                className="cms-content"
                dangerouslySetInnerHTML={{ __html: page.htmlContent }}
              />
            ) : page.content ? (
              <div style={{ color:'var(--color-text-light)', lineHeight:1.85, fontSize:'0.97rem' }}>
                {page.content.split('\n').map((p, i) => <p key={i} style={{ marginBottom:14 }}>{p}</p>)}
              </div>
            ) : (
              <p style={{ color:'var(--color-text-muted)' }}>No content yet.</p>
            )}
          </div>
        </div>
      </section>

      <style>{`
        .cms-content { color: var(--color-text-light); line-height: 1.85; font-size: 0.97rem; }
        .cms-content h1, .cms-content h2 { font-family: var(--font-display); color: var(--color-text); font-weight: 800; margin: 32px 0 14px; }
        .cms-content h1 { font-size: 2rem; }
        .cms-content h2 { font-size: 1.5rem; }
        .cms-content h3 { font-size: 1.2rem; font-weight: 700; color: var(--color-text); margin: 24px 0 10px; }
        .cms-content p { margin-bottom: 16px; }
        .cms-content ul, .cms-content ol { padding-left: 24px; margin-bottom: 16px; }
        .cms-content li { margin-bottom: 8px; }
        .cms-content strong { color: var(--color-text); font-weight: 700; }
        .cms-content a { color: var(--color-primary); text-decoration: underline; }
        .cms-content blockquote { border-left: 4px solid var(--color-primary); padding-left: 20px; margin: 24px 0; color: var(--color-text-muted); font-style: italic; }
        .cms-content table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        .cms-content th, .cms-content td { padding: 10px 14px; border: 1px solid var(--color-border); text-align: left; }
        .cms-content th { background: var(--color-bg-alt); font-weight: 700; }
      `}</style>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const common = await getCommonProps();
    await connectDB();
    const page = await Page.findOne({ slug: params.slug, published: true }).lean();
    return { props: { ...common, page: page ? JSON.parse(JSON.stringify(page)) : null } };
  } catch {
    return { props: { page: null, site:{}, footerPages:[] } };
  }
}
