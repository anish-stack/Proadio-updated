// components/HeroSection.js
'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

const RING_CARDS = [
  { icon: '💍', color: '#B24FE0', name: 'Wedding Setup',   sub: 'Sound + LED Wall',    pos: { top: '2%',   left: '30%' }, dur: 4.2, delay: 0   },
  { icon: '🎸', color: '#E0475C', name: 'Live Concert',    sub: 'Line Array + Lights', pos: { top: '6%',   right: '0%' }, dur: 3.8, delay: 0.7 },
  { icon: '🎛️', color: '#3D8BE0', name: 'Mixing Console',  sub: 'Digital Sound Control',pos: { top: '32%',  left: '-6%' }, dur: 5.0, delay: 1.2 },
  { icon: '💡', color: '#E0B23D', name: 'Intelligent Lights', sub: 'Smart & Dynamic',  pos: { top: '35%',  right: '-6%' }, dur: 4.5, delay: 0.4 },
  { icon: '🏢', color: '#3DBE8B', name: 'Corporate Event', sub: 'PA + Stage Setup',    pos: { top: '60%',  left: '-4%' }, dur: 5.5, delay: 0.3 },
  { icon: '🎓', color: '#8B5CF6', name: 'College Fest',    sub: 'Full Rig Available',  pos: { top: '62%',  right: '-4%' }, dur: 4.8, delay: 1.0 },
  { icon: '📺', color: '#4ADE80', name: 'LED Wall',        sub: 'HD Visuals',          pos: { bottom: '4%', left: '18%' }, dur: 5.2, delay: 0.6 },
  { icon: '🏗️', color: '#E0475C', name: 'Trussing',        sub: 'Heavy Duty Setup',    pos: { bottom: '4%', right: '10%' }, dur: 4.0, delay: 1.4 },
];

const FEATURE_STRIP = [
  { icon: '👥', title: 'Expert Team',       sub: 'Certified Engineers' },
  { icon: '🛡️', title: 'Top Quality Gear',  sub: 'Latest Technology'  },
  { icon: '🕐', title: 'On Time Delivery',  sub: 'Always Reliable'    },
  { icon: '🎧', title: '24×7 Support',      sub: "We're Always Here"  },
];

export default function HeroSection({ site, stats }) {
  const s = site || {};
  const heroSubtext = s.heroSubtext || 'From intimate weddings to massive concerts — professional PA systems, intelligent lighting, LED walls & trussing. Available 24×7 across Delhi NCR.';
  const displayStats = stats?.length > 0 ? stats : [
    { label: 'Events Executed',    value: '600+', icon: '📅' },
    { label: 'Years Experience',   value: '20+',  icon: '🎖️' },
    { label: 'Availability',       value: '24×7', icon: '🎵' },
    { label: 'Premium Brands',     value: '50+',  icon: '👑' },
  ];

  const beamRef    = useRef(null);
  const waveRef    = useRef(null);
  const linesRef   = useRef(null);
  const orbwRef    = useRef(null);
  const eqRef      = useRef(null);
  const viswrapRef = useRef(null);
  const rafs       = useRef([]);
  const intervals  = useRef([]);

  useEffect(() => {
    const hero = beamRef.current?.parentElement;
    const bCv  = beamRef.current;
    const wCv  = waveRef.current;
    const lCv  = linesRef.current;
    const oCv  = orbwRef.current;
    const vw   = viswrapRef.current;
    if (!hero || !bCv || !wCv || !lCv || !oCv || !vw) return;

    const bCx = bCv.getContext('2d');
    const wCx = wCv.getContext('2d');
    const lCx = lCv.getContext('2d');
    const oCx = oCv.getContext('2d');

    function resize() {
      bCv.width  = hero.offsetWidth;  bCv.height  = hero.offsetHeight;
      wCv.width  = hero.offsetWidth;  wCv.height  = 90;
      lCv.width  = vw.offsetWidth;    lCv.height  = vw.offsetHeight;
      oCv.width  = 160;               oCv.height  = 44;
    }
    resize();
    window.addEventListener('resize', resize);

    const spots = [
      { x: 0.12, color: 'rgba(0,180,255,',  speed: 0.38, angle: -0.10, swing: 0.22, phase: 0   },
      { x: 0.42, color: 'rgba(212,175,55,', speed: 0.25, angle:  0.04, swing: 0.18, phase: 2   },
      { x: 0.72, color: 'rgba(180,0,255,',  speed: 0.32, angle:  0.12, swing: 0.20, phase: 1.1 },
    ];
    let bt = 0;
    function drawBeams() {
      const W = bCv.width, H = bCv.height;
      bCx.clearRect(0, 0, W, H);
      spots.forEach(sp => {
        const cx  = sp.x * W;
        const ang = sp.angle + Math.sin(bt * sp.speed + sp.phase) * sp.swing;
        const spd = 0.10 + 0.025 * Math.sin(bt * 0.4 + sp.phase);
        const len = H * 1.1;
        const t1  = cx + Math.sin(ang - spd) * len;
        const t2  = cx + Math.sin(ang + spd) * len;
        const g   = bCx.createLinearGradient(cx, 0, cx + (t1 + t2) / 2 - cx * 0.4, H * 0.75);
        g.addColorStop(0, sp.color + '0.18)');
        g.addColorStop(0.5, sp.color + '0.07)');
        g.addColorStop(1, sp.color + '0)');
        bCx.beginPath(); bCx.moveTo(cx, 0); bCx.lineTo(t2, H); bCx.lineTo(t1, H); bCx.closePath();
        bCx.fillStyle = g; bCx.fill();
        const hl = bCx.createRadialGradient(cx, 1, 0, cx, 1, 34);
        hl.addColorStop(0, sp.color + '0.45)'); hl.addColorStop(1, sp.color + '0)');
        bCx.beginPath(); bCx.arc(cx, 1, 34, 0, Math.PI * 2); bCx.fillStyle = hl; bCx.fill();
      });
      bt += 0.011;
      rafs.current[0] = requestAnimationFrame(drawBeams);
    }
    drawBeams();

    const bands = Array.from({ length: 80 }, () => ({
      freq: 0.5 + Math.random() * 3, phase: Math.random() * Math.PI * 2, amp: 0.3 + Math.random() * 0.7,
    }));
    let wt = 0;
    function drawWave() {
      const W = wCv.width, mid = 90 * 0.58;
      wCx.clearRect(0, 0, W, 90);
      [[bands.slice(0,12),14,'rgba(212,175,55,0.85)',1.4],[bands.slice(12,24),9,'rgba(0,180,255,0.45)',1.0]]
        .forEach(([bs, amp, color, lw]) => {
          wCx.beginPath();
          for (let x = 0; x <= W; x += 2) {
            let y = 0; bs.forEach(b => { y += b.amp * Math.sin(x*0.018*b.freq + wt*b.freq + b.phase)*amp; });
            x === 0 ? wCx.moveTo(x, mid+y) : wCx.lineTo(x, mid+y);
          }
          wCx.strokeStyle = color; wCx.lineWidth = lw; wCx.stroke();
        });
      wt += 0.024;
      rafs.current[1] = requestAnimationFrame(drawWave);
    }
    drawWave();

    const ob = Array.from({length:20},()=>({freq:.8+Math.random()*2,phase:Math.random()*Math.PI*2,amp:.4+Math.random()*.6}));
    let ot = 0;
    function drawOrbWave() {
      oCx.clearRect(0,0,160,44);
      oCx.beginPath();
      for (let x=0;x<=160;x+=2){let y=0;ob.forEach(b=>{y+=b.amp*Math.sin(x*.05*b.freq+ot*b.freq+b.phase)*7;});x===0?oCx.moveTo(x,22+y):oCx.lineTo(x,22+y);}
      oCx.strokeStyle='rgba(212,175,55,0.7)'; oCx.lineWidth=1.2; oCx.stroke();
      ot += 0.03;
      rafs.current[2] = requestAnimationFrame(drawOrbWave);
    }
    drawOrbWave();

    function drawLines() {
      const W=lCv.width, H=lCv.height;
      lCx.clearRect(0,0,W,H);
      const cx=W/2, cy=H/2;
      vw.querySelectorAll('[data-card]').forEach(c => {
        const r=c.getBoundingClientRect(), vr=vw.getBoundingClientRect();
        const tx=r.left-vr.left+r.width/2, ty=r.top-vr.top+r.height/2;
        const g=lCx.createLinearGradient(cx,cy,tx,ty);
        g.addColorStop(0,'rgba(212,175,55,0.3)'); g.addColorStop(1,'rgba(212,175,55,0.02)');
        lCx.beginPath(); lCx.moveTo(cx,cy); lCx.lineTo(tx,ty);
        lCx.strokeStyle=g; lCx.lineWidth=0.8; lCx.setLineDash([3,6]); lCx.stroke(); lCx.setLineDash([]);
      });
      rafs.current[3] = requestAnimationFrame(drawLines);
    }
    drawLines();

    const eq = eqRef.current;
    if (eq) {
      const barEls = [];
      for (let i=0;i<20;i++){
        const b=document.createElement('div');
        b.style.cssText=`width:4px;border-radius:2px;background:rgba(212,175,55,0.5);height:${4+Math.random()*24}px;transition:height .3s ease`;
        eq.appendChild(b); barEls.push(b);
      }
      intervals.current[0] = setInterval(()=>{barEls.forEach(b=>{b.style.height=(4+Math.random()*24)+'px';});},320);
    }

    const ptc = document.createElement('div');
    ptc.style.cssText='position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:3';
    hero.appendChild(ptc);
    ['#D4AF37','#00B4FF','#B400FF','#fff'].forEach(color=>{
      for(let i=0;i<6;i++){
        const d=document.createElement('div');
        const sz=1+Math.random()*2;
        d.style.cssText=`position:absolute;width:${sz}px;height:${sz}px;border-radius:50%;background:${color};left:${Math.random()*100}%;bottom:${Math.random()*35}%;opacity:0;animation:hfloat ${7+Math.random()*9}s linear ${Math.random()*-18}s infinite`;
        ptc.appendChild(d);
      }
    });

    return () => {
      rafs.current.forEach(id=>cancelAnimationFrame(id));
      intervals.current.forEach(id=>clearInterval(id));
      window.removeEventListener('resize',resize);
      ptc.remove();
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        @keyframes hfloat{0%{opacity:0;transform:translateY(0) scale(1)}20%{opacity:1}80%{opacity:.5}100%{opacity:0;transform:translateY(-300px) scale(.3)}}
        @keyframes heroPulse{0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.6)}50%{box-shadow:0 0 0 5px rgba(34,197,94,0)}}
        @keyframes floatCard{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes orbRing{0%,100%{opacity:.3;transform:scale(1)}50%{opacity:.9;transform:scale(1.04)}}
        @keyframes scrollHint{0%,100%{opacity:0;transform:scaleY(.5) translateY(-6px)}50%{opacity:1;transform:scaleY(1) translateY(0)}}

        .hero-section{position:relative;overflow:hidden;min-height:92vh;display:flex;flex-direction:column;background:#04060D}
        .hero-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;opacity:.6}
        .hero-overlay{position:absolute;inset:0;z-index:1;background:linear-gradient(135deg,rgba(4,6,13,.88) 0%,rgba(4,6,13,.68) 50%,rgba(4,6,13,.88) 100%);pointer-events:none}
        .hero-canvas-beams{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:2}
        .hero-canvas-wave{position:absolute;bottom:0;left:0;width:100%;height:90px;pointer-events:none;opacity:.3;z-index:2}

        .hero-main{position:relative;z-index:10;flex:1;display:flex;padding:clamp(48px,6vw,64px) clamp(20px,4vw,56px) 0}
        .hero-left{position:relative;z-index:10;display:flex;flex-direction:column;justify-content:center;width:50%}
        .hero-right{position:relative;z-index:10;width:50%;display:flex;align-items:center;justify-content:center}

        .hero-badge{display:inline-flex;align-items:center;gap:7px;width:fit-content;margin-bottom:20px;padding:5px 13px;border-radius:100px;border:1px solid rgba(212,175,55,.35);background:rgba(212,175,55,.13);color:#D4AF37;font-size:10.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}
        .hero-badge-dot{width:7px;height:7px;border-radius:50%;background:#22c55e;flex-shrink:0;animation:heroPulse 1.8s ease-in-out infinite}
        .hero-h1{font-family:'Bebas Neue',sans-serif;font-size:clamp(2.6rem,4.8vw,4.4rem);color:#fff;line-height:.95;letter-spacing:.01em;margin:0}
        .hero-subtext{font-size:.88rem;color:rgba(255,255,255,.58);line-height:1.75;margin:16px 0 6px;max-width:420px}
        .hero-mini-eq{display:flex;align-items:center;gap:8px;margin-bottom:22px}
        .hero-mini-eq span{width:16px;height:2px;background:#D4AF37;border-radius:1px}

        .hero-ctas{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:36px}
        .hero-btn-main{display:inline-flex;align-items:center;gap:6px;padding:12px 24px;border-radius:6px;background:#D4AF37;color:#04060D;font-weight:700;font-size:.78rem;letter-spacing:.05em;text-transform:uppercase;text-decoration:none;border:none;cursor:pointer;transition:background .2s,transform .15s;min-height:44px}
        .hero-btn-main:hover{background:#e8c84a;transform:translateY(-1px)}
        .hero-btn-ghost{display:inline-flex;align-items:center;gap:6px;padding:12px 24px;border-radius:6px;background:transparent;color:rgba(255,255,255,.85);font-weight:600;font-size:.78rem;letter-spacing:.05em;text-transform:uppercase;text-decoration:none;border:1.5px solid rgba(255,255,255,.22);cursor:pointer;transition:border-color .2s,background .2s;min-height:44px}
        .hero-btn-ghost:hover{border-color:rgba(255,255,255,.5);background:rgba(255,255,255,.07)}

        .hero-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;max-width:520px}
        .hero-stat{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:14px 12px}
        .hero-stat-icon{font-size:.9rem;margin-bottom:6px;display:block}
        .hero-stat-val{font-family:'Bebas Neue',sans-serif;font-size:1.7rem;color:#D4AF37;line-height:1}
        .hero-stat-lbl{font-size:.62rem;color:rgba(255,255,255,.42);letter-spacing:.06em;text-transform:uppercase;margin-top:3px;line-height:1.3}

        .hero-viswrap{position:relative;width:100%;max-width:520px;height:480px}
        .hero-canvas-lines{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:4}
        .hero-orb{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:150px;height:150px;border-radius:50%;background:radial-gradient(circle at 38% 38%,#1a0a00,#0a0a1a);border:1px solid rgba(212,175,55,.4);display:flex;align-items:center;justify-content:center;overflow:hidden;z-index:5;box-shadow:0 0 40px -8px rgba(212,175,55,.4)}
        .hero-orb-inner{position:absolute;inset:0;border-radius:50%;display:flex;align-items:center;justify-content:center}
        .hero-orb-ring{position:absolute;border-radius:50%;animation:orbRing 3s ease-in-out infinite}
        .hero-orb-icon{font-size:2.6rem;z-index:2;filter:drop-shadow(0 0 12px rgba(212,175,55,.5))}
        .hero-canvas-orb{position:absolute;bottom:-2px;left:0;width:100%;height:44px;border-radius:0 0 80px 80px}

        .hero-ring-card{position:absolute;display:flex;align-items:center;gap:10px;white-space:nowrap;border-radius:10px;padding:10px 14px;background:rgba(20,20,28,.75);border:1px solid rgba(255,255,255,.1);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);z-index:6;animation:floatCard ease-in-out infinite}
        .hero-ring-icon-box{width:34px;height:34px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1.05rem;flex-shrink:0}
        .hero-ring-name{font-size:.76rem;font-weight:700;color:#fff;letter-spacing:.02em}
        .hero-ring-sub{font-size:.63rem;color:rgba(255,255,255,.45);margin-top:1px}

        .hero-feature-strip{position:relative;z-index:10;display:flex;flex-wrap:wrap;justify-content:center;gap:0;border-top:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.015);padding:20px clamp(20px,4vw,56px)}
        .hero-feature{display:flex;align-items:center;gap:12px;padding:0 28px;flex:1;min-width:200px;justify-content:center;border-right:1px solid rgba(255,255,255,.08)}
        .hero-feature:last-child{border-right:none}
        .hero-feature-icon{width:38px;height:38px;border-radius:50%;border:1px solid rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0}
        .hero-feature-title{color:#fff;font-size:.82rem;font-weight:700}
        .hero-feature-sub{color:rgba(255,255,255,.42);font-size:.68rem;margin-top:1px}

        .hero-eq-label{position:absolute;top:20px;right:28px;z-index:20;font-size:.65rem;font-weight:600;color:rgba(212,175,55,.45);letter-spacing:.14em;text-transform:uppercase}
        .hero-eq-row{position:absolute;top:38px;right:28px;z-index:20;display:flex;align-items:flex-end;gap:3px;height:32px}

        @media(max-width:1024px){
          .hero-right{display:none !important}
          .hero-left{width:100% !important}
        }
        @media(max-width:768px){
          .hero-main{padding:80px 20px 32px}
          .hero-stats{grid-template-columns:repeat(2,1fr)}
          .hero-feature-strip{flex-direction:column;gap:16px;padding:20px}
          .hero-feature{border-right:none;border-bottom:1px solid rgba(255,255,255,.08);padding-bottom:16px;justify-content:flex-start;width:100%}
          .hero-feature:last-child{border-bottom:none;padding-bottom:0}
          .hero-eq-label,.hero-eq-row{display:none}
        }
      `}</style>

      <section className="hero-section">

        <video autoPlay muted loop playsInline className="hero-video">
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />

        <canvas ref={beamRef} className="hero-canvas-beams" />
        <canvas ref={waveRef} className="hero-canvas-wave" />

        <div className="hero-eq-label">Live Audio Feed</div>
        <div ref={eqRef} className="hero-eq-row" />

        <div className="hero-main">
          {/* LEFT */}
          <div className="hero-left">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Delhi&apos;s Premier Sound &amp; Lighting Co.
            </div>

            <h1 className="hero-h1">
              PREMIUM{' '}
              <span style={{ WebkitTextStroke: '1.5px rgba(255,255,255,.35)', color: 'transparent' }}>SOUND</span>{' '}
              <span style={{ color: '#D4AF37' }}>&amp;</span>
              <br />LIGHTING
            </h1>

            <p className="hero-subtext">{heroSubtext}</p>
            <div className="hero-mini-eq"><span /><span style={{ background: '#D4AF37', opacity: 0.6 }} /></div>

            <div className="hero-ctas">
              <Link href="/contact" className="hero-btn-main">Get Free Quote →</Link>
              <Link href="/products" className="hero-btn-ghost">📷 View Products</Link>
            </div>

            <div className="hero-stats">
              {displayStats.map(st => (
                <div key={st.label} className="hero-stat">
                  {st.icon && <span className="hero-stat-icon">{st.icon}</span>}
                  <div className="hero-stat-val">{st.value}</div>
                  <div className="hero-stat-lbl">{st.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="hero-right">
            <div ref={viswrapRef} className="hero-viswrap">
              <canvas ref={linesRef} className="hero-canvas-lines" />

              <div className="hero-orb">
                <div className="hero-orb-inner">
                  {[['100%','rgba(212,175,55,.15)','0s'],['130%','rgba(0,180,255,.1)','0.8s'],['165%','rgba(180,0,255,.07)','1.6s']].map(([sz,c,d],i) => (
                    <span key={i} className="hero-orb-ring" style={{ width:sz, height:sz, border:`1px solid ${c}`, animationDelay:d }} />
                  ))}
                  <span className="hero-orb-icon">🔊</span>
                </div>
                <canvas ref={orbwRef} className="hero-canvas-orb" />
              </div>

              {RING_CARDS.map((c,i) => (
                <div key={i} data-card className="hero-ring-card"
                  style={{ ...c.pos, animationDuration:`${c.dur}s`, animationDelay:`${c.delay}s` }}>
                  <span className="hero-ring-icon-box" style={{ background: `${c.color}22`, color: c.color, border: `1px solid ${c.color}55` }}>{c.icon}</span>
                  <div>
                    <div className="hero-ring-name">{c.name}</div>
                    <div className="hero-ring-sub">{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM FEATURE STRIP */}
        <div className="hero-feature-strip">
          {FEATURE_STRIP.map(f => (
            <div key={f.title} className="hero-feature">
              <span className="hero-feature-icon">{f.icon}</span>
              <div>
                <div className="hero-feature-title">{f.title}</div>
                <div className="hero-feature-sub">{f.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}