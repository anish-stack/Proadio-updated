import { useState, useEffect, useCallback } from 'react';
import Layout from '../components/Layout';
import EnquiryForm from '../components/EnquiryForm';
import PopupModal from '../components/PopupModal';
import { connectDB, Product } from '../lib/db';
import { getCommonProps } from '../lib/pageProps';
import { useRouter } from 'next/router';

const CAT_ICONS = { 'Sound Systems':'🔊','Mixing Consoles':'🎛️','Microphones':'🎤','Lighting':'💡','Trussing & Structures':'🏗️','LED Walls':'📺' };
const PER_PAGE = 9;

export default function ProductsPage({ products, categories, site, footerPages }) {
  const router = useRouter();
  const [active, setActive] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [enquiryModal, setEnquiryModal] = useState(null); // product name
  const [detailsModal, setDetailsModal] = useState(null); // full product object (details view)

  useEffect(() => {
    if (router.query.enquiry) setEnquiryModal(router.query.enquiry);
    if (router.query.category) setActive(router.query.category);
  }, [router.query]);

  const filtered = products.filter(p => {
    const matchCat = active === 'All' || p.category === active;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || (p.description||'').toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const changeFilter = useCallback((cat) => { setActive(cat); setPage(1); }, []);
  const changeSearch = useCallback((v) => { setSearch(v); setPage(1); }, []);

  return (
    <Layout site={site} footerPages={footerPages} title="Products & Equipment"
      description="Browse Pro Audio Solution's complete inventory — JBL VTX, DiGiCo consoles, grandMA3, Sennheiser & Shure mics, LED walls, aluminium truss and more."
      keywords="jbl vtx a12 rental, digico quantum 338, grandma3 rental delhi, sennheiser skm d6000, led wall rental delhi, aluminium truss rental"
    >
      {/* Hero */}
      <section style={{ background:'var(--color-secondary)', padding:'64px 0 48px' }}>
        <div className="container">
          <div className="badge" style={{ background:'rgba(212,175,55,0.15)', borderColor:'rgba(212,175,55,0.3)', color:'var(--color-primary)' }}>Our Inventory</div>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2rem,4vw,3rem)', color:'var(--color-white)', fontWeight:800, margin:'12px 0 12px' }}>Premium Equipment</h1>
          <p style={{ color:'rgba(255,255,255,0.65)', maxWidth:560 }}>World-class PA systems, intelligent lighting, mixing consoles, microphones &amp; more — available for rent across Delhi NCR.</p>
        </div>
      </section>

      {/* Sticky filter bar */}
      <section style={{ background:'var(--color-bg-alt)', borderBottom:'1px solid var(--color-border)', padding:'16px 0', position:'sticky', top:68, zIndex:100 }}>
        <div className="container">
          <div style={{ display:'flex', gap:10, flexWrap:'wrap', alignItems:'center', justifyContent:'space-between' }}>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              <span style={{ fontWeight:700, fontSize:'0.82rem', color:'var(--color-text-muted)', alignSelf:'center' }}>Filter:</span>
              {['All', ...categories].map(cat => (
                <button key={cat} onClick={() => changeFilter(cat)} style={{
                  padding:'6px 14px', borderRadius:100, border:'1.5px solid', fontWeight:600, fontSize:'0.82rem', cursor:'pointer', transition:'var(--transition)',
                  background: active===cat ? 'var(--color-primary)' : 'var(--color-white)',
                  borderColor: active===cat ? 'var(--color-primary)' : 'var(--color-border)',
                  color: active===cat ? 'var(--color-secondary)' : 'var(--color-text)',
                }}>{cat === 'All' ? 'All Equipment' : `${CAT_ICONS[cat]||'🎵'} ${cat}`}</button>
              ))}
            </div>
            <input
              type="text" value={search} onChange={e=>changeSearch(e.target.value)}
              placeholder="🔍 Search equipment..."
              style={{ padding:'7px 14px', border:'1.5px solid var(--color-border)', borderRadius:100, fontSize:'0.85rem', outline:'none', background:'var(--color-white)', minWidth:200 }}
            />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-pad">
        <div className="container">
          <p style={{ fontSize:'0.88rem', color:'var(--color-text-muted)', marginBottom:24 }}>
            Showing {paged.length} of {filtered.length} items
            {search && <> matching &quot;<strong>{search}</strong>&quot;</>}
          </p>

          {paged.length === 0 ? (
            <div style={{ textAlign:'center', padding:'60px 0' }}>
              <div style={{ fontSize:'2.5rem', marginBottom:12 }}>🔍</div>
              <h3 style={{ color:'var(--color-text-light)', fontWeight:600 }}>No equipment found. Try a different filter or search term.</h3>
              <button onClick={()=>{ changeFilter('All'); changeSearch(''); }} style={{ marginTop:16, padding:'9px 20px', background:'var(--color-primary)', color:'var(--color-secondary)', border:'none', borderRadius:8, fontWeight:700, cursor:'pointer' }}>Clear Filters</button>
            </div>
          ) : (
            <div className="grid-3">
              {paged.map(p => (
                <div key={p._id} className="card" style={{ position:'relative', cursor:'pointer' }} onClick={() => setDetailsModal(p)}>
                  {p.featured && (
                    <div style={{ position:'absolute', top:12, right:12, background:'var(--color-primary)', color:'var(--color-secondary)', fontSize:'0.68rem', fontWeight:800, padding:'3px 10px', borderRadius:100, zIndex:1 }}>★ Featured</div>
                  )}
                  {p.image ? (
                    <div style={{ height:130, overflow:'hidden' }}>
                      <img src={p.image} alt={p.name} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} loading="lazy" />
                    </div>
                  ) : (
                    <div style={{ height:130, background:'linear-gradient(135deg, var(--color-secondary) 0%, var(--color-secondary-light) 100%)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2.8rem' }}>
                      {CAT_ICONS[p.category]||'🎵'}
                    </div>
                  )}
                  <div style={{ padding:20 }}>
                    <span style={{ fontSize:'0.7rem', fontWeight:700, color:'var(--color-primary)', textTransform:'uppercase', letterSpacing:'0.1em' }}>{p.category}</span>
                    <h2 style={{ fontWeight:700, fontSize:'1rem', margin:'6px 0 8px', color:'var(--color-text)' }}>{p.name}</h2>
                    <p style={{ fontSize:'0.85rem', color:'var(--color-text-light)', lineHeight:1.6, marginBottom:6 }}>{p.description?.slice(0,100)}{p.description?.length>100?'...':''}</p>
                    {p.specs && <p style={{ fontSize:'0.76rem', color:'var(--color-text-muted)', fontStyle:'italic', marginBottom:14 }}>{p.specs}</p>}
                    <div style={{ display:'flex', gap:8, flexWrap:'wrap' }} onClick={e => e.stopPropagation()}>
                      <button onClick={() => setEnquiryModal(p.name)} className="btn btn-primary btn-sm">Enquire Now</button>
                      <button onClick={() => setDetailsModal(p)} className="btn btn-outline-gold btn-sm">View Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display:'flex', justifyContent:'center', gap:8, marginTop:40, flexWrap:'wrap' }}>
              <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1} style={pageBtnSt(false)}>← Prev</button>
              {Array.from({length:totalPages},(_,i)=>i+1).map(pg=>(
                <button key={pg} onClick={()=>setPage(pg)} style={pageBtnSt(pg===page)}>{pg}</button>
              ))}
              <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages} style={pageBtnSt(false)}>Next →</button>
            </div>
          )}
        </div>
      </section>

      {/* Enquiry modal */}
      <PopupModal isOpen={!!enquiryModal} onClose={() => setEnquiryModal(null)} title={`Enquire: ${enquiryModal||''}`}>
        <EnquiryForm defaultProduct={enquiryModal} compact />
      </PopupModal>

      {/* Product details modal — acts as the single product details view */}
      <PopupModal isOpen={!!detailsModal} onClose={() => setDetailsModal(null)} title={detailsModal?.name} size="lg">
        {detailsModal && (
          <div>
            {detailsModal.image && (
              <div style={{ borderRadius:'var(--radius-md)', overflow:'hidden', marginBottom:20, maxHeight:320 }}>
                <img src={detailsModal.image} alt={detailsModal.name} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
              </div>
            )}
            <span style={{ fontSize:'0.72rem', fontWeight:700, color:'var(--color-primary)', textTransform:'uppercase', letterSpacing:'0.1em' }}>{detailsModal.category}</span>
            {detailsModal.description && (
              <p style={{ color:'var(--color-text-light)', lineHeight:1.75, margin:'10px 0 16px', fontSize:'0.95rem' }}>{detailsModal.description}</p>
            )}
            {detailsModal.specs && (
              <div style={{ background:'var(--color-bg-alt)', borderRadius:'var(--radius-sm)', padding:'12px 16px', marginBottom:20 }}>
                <span style={{ fontSize:'0.78rem', fontWeight:700, color:'var(--color-text-muted)', textTransform:'uppercase', letterSpacing:'0.06em' }}>Specifications</span>
                <p style={{ fontSize:'0.9rem', color:'var(--color-text)', marginTop:4 }}>{detailsModal.specs}</p>
              </div>
            )}
            {detailsModal.popupEnabled && detailsModal.popupContent && (
              <div dangerouslySetInnerHTML={{ __html: detailsModal.popupContent }} style={{ lineHeight:1.75, color:'var(--color-text-light)', marginBottom:20 }} />
            )}
            <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
              <button onClick={() => { setEnquiryModal(detailsModal.name); setDetailsModal(null); }} className="btn btn-primary btn-sm">Enquire Now</button>
            </div>
          </div>
        )}
      </PopupModal>

    </Layout>
  );
}

function pageBtnSt(active) {
  return { padding:'8px 16px', borderRadius:8, border:'1.5px solid', fontWeight:600, fontSize:'0.85rem', cursor:'pointer', transition:'all 0.2s', background:active?'var(--color-primary)':'var(--color-white)', borderColor:active?'var(--color-primary)':'var(--color-border)', color:active?'var(--color-secondary)':'var(--color-text)' };
}

export async function getServerSideProps() {
  try {
    const common = await getCommonProps();
    await connectDB();
    const products = await Product.find({}).sort({ featured:-1, order:1, name:1 }).lean();
    const cats = [...new Set(products.map(p=>p.category).filter(Boolean))];
    return { props: { ...common, products:JSON.parse(JSON.stringify(products)), categories:cats } };
  } catch { return { props: { products:[], categories:[], site:{}, footerPages:[] } }; }
}
