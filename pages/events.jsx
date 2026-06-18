import { useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { connectDB, Event } from '../lib/db';
import { getCommonProps } from '../lib/pageProps';
import PopupModal from '../components/PopupModal';
import EnquiryForm from '../components/EnquiryForm';

const CAT_COLORS = { Corporate:'#2563EB', Wedding:'#DB2777', Concert:'#D97706', College:'#16A34A', Government:'#7C3AED', Other:'#6B7280' };

export default function EventsPage({ upcoming, past, site, footerPages }) {
  const [tab, setTab] = useState('upcoming');
  const [enquiryModal, setEnquiryModal] = useState(false);
  const events = tab === 'upcoming' ? upcoming : past;

  return (
    <Layout site={site} footerPages={footerPages} title="Events"
      description="Upcoming and past events powered by Pro Audio Solution — concerts, weddings, corporate events, college fests, government events across Delhi NCR."
    >
      {/* Hero */}
      <section style={{ background:'linear-gradient(135deg, var(--color-secondary), #0f3460)', padding:'64px 0 52px' }}>
        <div className="container">
          <div className="badge" style={{ background:'rgba(212,175,55,0.15)', borderColor:'rgba(212,175,55,0.4)', color:'var(--color-primary)' }}>Live &amp; Upcoming</div>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2rem,4vw,3rem)', color:'var(--color-white)', fontWeight:800, margin:'12px 0 12px' }}>Events We Power</h1>
          <p style={{ color:'rgba(255,255,255,0.65)', maxWidth:540 }}>From Bollywood concerts to corporate AGMs — every event deserves world-class sound &amp; lighting.</p>
        </div>
      </section>

      {/* Sticky tab bar */}
      <section style={{ background:'var(--color-bg-alt)', borderBottom:'1px solid var(--color-border)', padding:'16px 0', position:'sticky', top:68, zIndex:100 }}>
        <div className="container" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
          <div style={{ display:'flex', gap:8 }}>
            {[['upcoming','🗓 Upcoming'],['past','📸 Past Events']].map(([val,label])=>(
              <button key={val} onClick={()=>setTab(val)} style={{
                padding:'8px 20px', borderRadius:100, fontWeight:700, fontSize:'0.88rem', border:'1.5px solid', cursor:'pointer', transition:'var(--transition)',
                background: tab===val ? 'var(--color-primary)' : 'var(--color-white)',
                borderColor: tab===val ? 'var(--color-primary)' : 'var(--color-border)',
                color: tab===val ? 'var(--color-secondary)' : 'var(--color-text)',
              }}>{label} <span style={{ fontWeight:500, opacity:0.7 }}>({tab===val?events.length:(val==='upcoming'?upcoming.length:past.length)})</span></button>
            ))}
          </div>
          <button onClick={()=>setEnquiryModal(true)} className="btn btn-primary btn-sm">Get Quote for Your Event</button>
        </div>
      </section>

      {/* Events grid */}
      <section className="section-pad">
        <div className="container">
          {events.length === 0 ? (
            <div style={{ textAlign:'center', padding:'72px 0' }}>
              <div style={{ fontSize:'3rem', marginBottom:16 }}>🎵</div>
              <h3 style={{ fontWeight:700, color:'var(--color-text-light)', fontSize:'1.2rem' }}>
                {tab==='upcoming' ? 'No upcoming events right now — check back soon!' : 'No past events listed yet.'}
              </h3>
            </div>
          ) : (
            <div className="grid-3">
              {events.map(ev => <EventCard key={ev._id} event={ev} upcoming={tab==='upcoming'} />)}
            </div>
          )}
        </div>
      </section>

      {/* Specializations */}
      <section className="section-pad bg-section">
        <div className="container">
          <div className="section-header center">
            <div className="badge">Our Expertise</div>
            <h2 className="section-title">Event Specializations</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid-3">
            {EVENT_SPECS.map(s=>(
              <div key={s.title} style={{ background:'var(--color-white)', borderRadius:'var(--radius-lg)', padding:'28px 24px', border:'1px solid var(--color-border)', textAlign:'center', transition:'var(--transition)', cursor:'pointer' }}
                onMouseEnter={e=>{e.currentTarget.style.boxShadow='var(--shadow-gold)';e.currentTarget.style.transform='translateY(-4px)'}}
                onMouseLeave={e=>{e.currentTarget.style.boxShadow='none';e.currentTarget.style.transform='none'}}
                onClick={()=>setEnquiryModal(true)}
              >
                <div style={{ fontSize:'2.5rem', marginBottom:14 }}>{s.icon}</div>
                <h3 style={{ fontWeight:700, marginBottom:8 }}>{s.title}</h3>
                <p style={{ fontSize:'0.88rem', color:'var(--color-text-light)', lineHeight:1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PopupModal isOpen={enquiryModal} onClose={()=>setEnquiryModal(false)} title="Get a Free Event Quote">
        <EnquiryForm compact />
      </PopupModal>
    </Layout>
  );
}

const EVENT_SPECS = [
  { icon:'💍', title:'Weddings & Sangeet', desc:'Magical sound & lighting for your most special day. DJ setups, live band PA, LED décor & dramatic stage lighting.' },
  { icon:'🏢', title:'Corporate Events', desc:'AGMs, product launches, conferences & seminars. Crystal-clear speech reinforcement & professional stage production.' },
  { icon:'🎸', title:'Live Concerts', desc:'Arena-scale PA, moving head rigs & LED walls for touring artists — from indie bands to Bollywood headliners.' },
  { icon:'🎓', title:'College Fests', desc:'High-energy fests with powerful sound systems, dynamic lighting & crowd-moving productions.' },
  { icon:'🏛️', title:'Government Events', desc:'Yoga Day, national celebrations & official ceremonies — reliable, dignified production.' },
  { icon:'🏆', title:'Award Shows', desc:'Film Fare Awards & entertainment galas — glamour-ready rigs with broadcast-quality audio.' },
];

function EventCard({ event, upcoming }) {
  const d = new Date(event.date);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const color = CAT_COLORS[event.category] || '#6B7280';
  return (
    <Link href={`/events/${event.slug || event._id}`} style={{ textDecoration:'none', display:'block' }}>
      <div className="card" style={{ cursor:'pointer' }}>
        {event.image ? (
          <div style={{ height:150, position:'relative', overflow:'hidden', borderBottom:'1px solid var(--color-border)' }}>
            <img src={event.image} alt={event.title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} loading="lazy" />
            <div style={{ position:'absolute', top:12, right:12, background:color, color:'#fff', fontSize:'0.7rem', fontWeight:700, padding:'3px 10px', borderRadius:100 }}>{event.category}</div>
            {upcoming && <div style={{ position:'absolute', top:12, left:12, background:'var(--color-primary)', color:'var(--color-secondary)', fontSize:'0.7rem', fontWeight:800, padding:'3px 10px', borderRadius:100 }}>UPCOMING</div>}
            <div style={{ position:'absolute', bottom:0, left:0, background:'rgba(0,0,0,0.55)', color:'#fff', padding:'4px 12px', borderTopRightRadius:8 }}>
              <span style={{ fontWeight:800, fontSize:'0.95rem' }}>{d.getDate()}</span> <span style={{ fontSize:'0.78rem', fontWeight:600 }}>{months[d.getMonth()]} {d.getFullYear()}</span>
            </div>
          </div>
        ) : (
          <div style={{ height:150, background:`linear-gradient(135deg, ${color}22, ${color}44)`, display:'flex', alignItems:'center', justifyContent:'center', position:'relative', borderBottom:'1px solid var(--color-border)' }}>
            <div style={{ textAlign:'center' }}>
              <div style={{ fontSize:'2.4rem', fontWeight:900, color, lineHeight:1 }}>{d.getDate()}</div>
              <div style={{ fontSize:'0.85rem', fontWeight:700, color, letterSpacing:'0.1em' }}>{months[d.getMonth()]} {d.getFullYear()}</div>
            </div>
            <div style={{ position:'absolute', top:12, right:12, background:color, color:'#fff', fontSize:'0.7rem', fontWeight:700, padding:'3px 10px', borderRadius:100 }}>{event.category}</div>
            {upcoming && <div style={{ position:'absolute', top:12, left:12, background:'var(--color-primary)', color:'var(--color-secondary)', fontSize:'0.7rem', fontWeight:800, padding:'3px 10px', borderRadius:100 }}>UPCOMING</div>}
          </div>
        )}
        <div style={{ padding:20 }}>
          <h3 style={{ fontWeight:700, fontSize:'1rem', marginBottom:8, color:'var(--color-text)' }}>{event.title}</h3>
          {event.venue && <p style={{ fontSize:'0.84rem', color:'var(--color-text-muted)', marginBottom:8 }}>📍 {event.venue}</p>}
          {event.description && <p style={{ fontSize:'0.87rem', color:'var(--color-text-light)', lineHeight:1.6 }}>{event.description.slice(0,90)}{event.description.length>90?'...':''}</p>}
          <span style={{ display:'inline-block', marginTop:12, fontSize:'0.82rem', fontWeight:700, color:'var(--color-primary)' }}>View Details →</span>
        </div>
      </div>
    </Link>
  );
}

export async function getServerSideProps() {
  try {
    const common = await getCommonProps();
    await connectDB();
    const now = new Date();
    const [upcoming, past] = await Promise.all([
      Event.find({ isUpcoming:true, date:{ $gte:now } }).sort({ date:1 }).lean(),
      Event.find({ $or:[{ isUpcoming:false },{ date:{ $lt:now } }] }).sort({ date:-1 }).limit(12).lean(),
    ]);
    return { props: { ...common, upcoming:JSON.parse(JSON.stringify(upcoming)), past:JSON.parse(JSON.stringify(past)) } };
  } catch { return { props: { upcoming:[], past:[], site:{}, footerPages:[] } }; }
}
