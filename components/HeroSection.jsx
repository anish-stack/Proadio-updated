'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

const EVENT_CARDS = [
  { icon: '💍', name: 'Wedding Setup',   sub: 'Sound + LED Wall',    pos: { top: '6%',    left: '4%'   }, dur: 4.2, delay: 0   },
  { icon: '🎸', name: 'Live Concert',    sub: 'Line Array + Lights', pos: { top: '8%',    right: '5%'  }, dur: 3.8, delay: 0.7 },
  { icon: '🏢', name: 'Corporate Event', sub: 'PA + Stage Setup',    pos: { bottom: '22%',left: '2%'   }, dur: 5.0, delay: 1.2 },
  { icon: '🎓', name: 'College Fest',    sub: 'Full Rig Available',  pos: { bottom: '18%',right: '3%'  }, dur: 4.5, delay: 0.4 },
];

const GEAR_TAGS = [
  { label: '🎛️ Mixing Console',    pos: { top: '36%',   left: '1%'    }, dur: 5.5, delay: 0.3 },
  { label: '💡 Intelligent Lights', pos: { top: '32%',   right: '0%'   }, dur: 4.8, delay: 1.0 },
  { label: '📺 LED Wall',           pos: { bottom: '8%', left: '18%'   }, dur: 5.2, delay: 0.6 },
  { label: '🏗️ Trussing',          pos: { bottom: '8%', right: '16%'  }, dur: 4.0, delay: 1.4 },
];

export default function HeroSection({ site, stats }) {
  const s = site || {};
  const heroSubtext = s.heroSubtext || 'From intimate weddings to stadium-scale concerts — professional PA systems, intelligent lighting, LED walls & trussing. Available 24×7 across Delhi NCR.';
  const displayStats = stats?.length > 0 ? stats : [
    { label: 'Events',     value: '600+' },
    { label: 'Years Exp.', value: '20+'  },
    { label: 'Available',  value: '24×7' },
    { label: 'Brands',     value: '50+'  },
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

    /* spotlights */
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

    /* bottom waveform */
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

    /* orb waveform */
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

    /* connecting lines */
    function drawLines() {
      const W=lCv.width, H=lCv.height;
      lCx.clearRect(0,0,W,H);
      const cx=W/2, cy=H/2;
      vw.querySelectorAll('[data-card]').forEach(c => {
        const r=c.getBoundingClientRect(), vr=vw.getBoundingClientRect();
        const tx=r.left-vr.left+r.width/2, ty=r.top-vr.top+r.height/2;
        const g=lCx.createLinearGradient(cx,cy,tx,ty);
        g.addColorStop(0,'rgba(212,175,55,0.25)'); g.addColorStop(1,'rgba(212,175,55,0.03)');
        lCx.beginPath(); lCx.moveTo(cx,cy); lCx.lineTo(tx,ty);
        lCx.strokeStyle=g; lCx.lineWidth=0.8; lCx.setLineDash([3,7]); lCx.stroke(); lCx.setLineDash([]);
      });
      rafs.current[3] = requestAnimationFrame(drawLines);
    }
    drawLines();

    /* EQ bars */
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

    /* particles */
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
        .hero-section{position:relative;overflow:hidden;min-height:92vh;display:flex;background:#04060D}
        .hero-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;opacity:.75}
        .hero-overlay{position:absolute;inset:0;z-index:1;background:linear-gradient(135deg,rgba(4,6,13,.82) 0%,rgba(4,6,13,.62) 50%,rgba(4,6,13,.82) 100%);pointer-events:none}
        .hero-canvas-beams{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:2}
        .hero-canvas-wave{position:absolute;bottom:0;left:0;width:100%;height:90px;pointer-events:none;opacity:.3;z-index:2}
        .hero-left{position:relative;z-index:10;display:flex;flex-direction:column;justify-content:center;width:52%;padding:clamp(48px,7vw,72px) clamp(20px,4vw,56px)}
        .hero-right{position:relative;z-index:10;width:48%;display:flex;align-items:center;justify-content:center;padding:32px 32px 32px 0}
        .hero-badge{display:inline-flex;align-items:center;gap:7px;width:fit-content;margin-bottom:20px;padding:5px 13px;border-radius:100px;border:1px solid rgba(212,175,55,.35);background:rgba(212,175,55,.13);color:#D4AF37;font-size:10.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}
        .hero-badge-dot{width:7px;height:7px;border-radius:50%;background:#22c55e;flex-shrink:0;animation:heroPulse 1.8s ease-in-out infinite}
        .hero-h1{font-family:'Bebas Neue',sans-serif;font-size:clamp(2.8rem,5.2vw,4.8rem);color:#fff;line-height:.95;letter-spacing:.01em;margin:0}
        .hero-subtext{font-size:.88rem;color:rgba(255,255,255,.58);line-height:1.75;margin:16px 0 26px;max-width:420px}
        .hero-ctas{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:40px}
        .hero-btn-main{display:inline-block;padding:12px 24px;border-radius:4px;background:#D4AF37;color:#04060D;font-weight:700;font-size:.78rem;letter-spacing:.07em;text-transform:uppercase;text-decoration:none;border:none;cursor:pointer;transition:background .2s,transform .15s}
        .hero-btn-main:hover{background:#e8c84a;transform:translateY(-1px)}
        .hero-btn-ghost{display:inline-block;padding:12px 24px;border-radius:4px;background:transparent;color:rgba(255,255,255,.85);font-weight:600;font-size:.78rem;letter-spacing:.07em;text-transform:uppercase;text-decoration:none;border:1.5px solid rgba(255,255,255,.22);cursor:pointer;transition:border-color .2s,background .2s}
        .hero-btn-ghost:hover{border-color:rgba(255,255,255,.5);background:rgba(255,255,255,.07)}
        .hero-stats{display:flex;flex-wrap:wrap;border-top:1px solid rgba(255,255,255,.08);padding-top:28px;gap:0}
        .hero-stat{padding-right:24px;margin-right:24px;border-right:1px solid rgba(255,255,255,.08)}
        .hero-stat:last-child{border-right:none;padding-right:0;margin-right:0}
        .hero-stat-val{font-family:'Bebas Neue',sans-serif;font-size:2.1rem;color:#D4AF37;line-height:1}
        .hero-stat-lbl{font-size:.68rem;color:rgba(255,255,255,.42);letter-spacing:.1em;text-transform:uppercase;margin-top:3px}
        .hero-viswrap{position:relative;width:100%;max-width:460px;height:460px}
        .hero-canvas-lines{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:4}
        .hero-orb{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:160px;height:160px;border-radius:50%;background:radial-gradient(circle at 38% 38%,#1a0a00,#0a0a1a);border:1px solid rgba(212,175,55,.25);display:flex;align-items:center;justify-content:center;overflow:hidden;z-index:5}
        .hero-orb-inner{position:absolute;inset:0;border-radius:50%;display:flex;align-items:center;justify-content:center}
        .hero-orb-ring{position:absolute;border-radius:50%;animation:orbRing 3s ease-in-out infinite}
        .hero-orb-icon{font-size:2.8rem;z-index:2;filter:drop-shadow(0 0 12px rgba(212,175,55,.5))}
        .hero-canvas-orb{position:absolute;bottom:-2px;left:0;width:100%;height:44px;border-radius:0 0 80px 80px}
        .hero-ev-card{position:absolute;display:flex;align-items:center;gap:9px;white-space:nowrap;border-radius:10px;padding:9px 14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);z-index:6;animation:floatCard ease-in-out infinite}
        .hero-ev-icon{font-size:1.3rem}
        .hero-ev-name{font-size:.75rem;font-weight:700;color:#fff;letter-spacing:.03em}
        .hero-ev-sub{font-size:.62rem;color:rgba(255,255,255,.45);margin-top:1px}
        .hero-gear-tag{position:absolute;border-radius:100px;padding:5px 12px;background:rgba(212,175,55,.1);border:1px solid rgba(212,175,55,.3);color:#D4AF37;font-size:.65rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;z-index:6;animation:floatCard ease-in-out infinite}
        .hero-eq-label{position:absolute;bottom:50px;right:28px;z-index:20;font-size:.65rem;font-weight:600;color:rgba(212,175,55,.45);letter-spacing:.14em;text-transform:uppercase}
        .hero-eq-row{position:absolute;bottom:14px;right:28px;z-index:20;display:flex;align-items:flex-end;gap:3px;height:32px}
        .hero-scroll{position:absolute;bottom:18px;left:50%;transform:translateX(-50%);z-index:20;display:flex;flex-direction:column;align-items:center;gap:5px}
        .hero-scroll-line{width:1px;height:28px;background:linear-gradient(to bottom,rgba(212,175,55,.6),transparent);animation:scrollHint 1.6s ease-in-out infinite}
        .hero-scroll-lbl{font-size:.62rem;color:rgba(255,255,255,.35);letter-spacing:.12em;text-transform:uppercase}
        @media(max-width:768px){
          .hero-left{width:100% !important;padding:80px 24px 48px !important}
          .hero-right{display:none !important}
        }
      `}</style>

      <section className="hero-section">

        {/* BG VIDEO */}
        <video autoPlay muted loop playsInline className="hero-video">
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />

        {/* CANVAS */}
        <canvas ref={beamRef} className="hero-canvas-beams" />
        <canvas ref={waveRef} className="hero-canvas-wave" />

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

          <div className="hero-ctas">
            <Link href="/contact" className="hero-btn-main">Get Free Quote ↗</Link>
            <Link href="/products" className="hero-btn-ghost">View Products</Link>
          </div>

          <div className="hero-stats">
            {displayStats.map(st => (
              <div key={st.label} className="hero-stat">
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

            {/* Orb */}
            <div className="hero-orb">
              <div className="hero-orb-inner">
                {[['100%','rgba(212,175,55,.15)','0s'],['130%','rgba(0,180,255,.1)','0.8s'],['165%','rgba(180,0,255,.07)','1.6s']].map(([s,c,d],i) => (
                  <span key={i} className="hero-orb-ring" style={{ width:s, height:s, border:`1px solid ${c}`, animationDelay:d }} />
                ))}
                <span className="hero-orb-icon">🔊</span>
              </div>
              <canvas ref={orbwRef} className="hero-canvas-orb" />
            </div>

            {/* Event cards */}
            {EVENT_CARDS.map((c,i) => (
              <div key={i} data-card className="hero-ev-card"
                style={{ ...c.pos, animationDuration:`${c.dur}s`, animationDelay:`${c.delay}s` }}>
                <span className="hero-ev-icon">{c.icon}</span>
                <div>
                  <div className="hero-ev-name">{c.name}</div>
                  <div className="hero-ev-sub">{c.sub}</div>
                </div>
              </div>
            ))}

            {/* Gear tags */}
            {GEAR_TAGS.map((g,i) => (
              <div key={i} className="hero-gear-tag"
                style={{ ...g.pos, animationDuration:`${g.dur}s`, animationDelay:`${g.delay}s` }}>
                {g.label}
              </div>
            ))}
          </div>
        </div>

        {/* EQ */}
        <div className="hero-eq-label">Live Audio Feed</div>
        <div ref={eqRef} className="hero-eq-row" />

        {/* Scroll hint */}
        <div className="hero-scroll">
          <div className="hero-scroll-line" />
          <span className="hero-scroll-lbl">Scroll</span>
        </div>
      </section>
    </>
  );
}