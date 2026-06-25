export const SITE_DEFAULTS = {
  name:    'Pro Audio Solution',
  tagline: 'Premium Light & Sound Solutions',
  phone1:  '9810240284',
  phone2:  '9810257891',
  phone3:  '8285923747',
  email:   'info@proaudiosolutions.in',
  website: 'www.proaudiosolution.in',
  address: 'Plot No. 149, Kh. No. 9/2, Nathan Vihar, Ranhola, Delhi',
  about:   'Pro Audio Solution is a leading Light & Sound company based in Delhi, dedicated to delivering top-quality audio and lighting experiences. We pride ourselves on providing exceptional sound and lighting solutions with timely, reliable execution.',
  agenda:  'By combining innovative technology, skilled professionals, and creative expertise, we create seamless connections between artists, audiences, and brands in the ever-evolving world of music and live events — creating unforgettable experiences that connect through the love of sound.',
  logoText:'PA',
  logoUrl: '',
  facebook:'',
  instagram:'',
  youtube: '',
  whatsapp:'9810240284',
};

export const STATS_SEED = [
  { key:'events_done',   label:'Events Executed',  value:'500+',  icon:'🎵', order:1, visible:true },
  { key:'years_exp',     label:'Years Experience', value:'10+',   icon:'⭐', order:2, visible:true },
  { key:'availability',  label:'Availability',     value:'24×7',  icon:'⏰', order:3, visible:true },
  { key:'brands',        label:'Premium Brands',   value:'50+',   icon:'🏆', order:4, visible:true },
];

export const SETTINGS_SEED = [
  // Contact
  { key:'site_name',    value:'Pro Audio Solution',  label:'Site Name',    group:'general' },
  { key:'tagline',      value:'Premium Light & Sound Solutions', label:'Tagline', group:'general' },
  { key:'logo_text',    value:'PA',                  label:'Logo Text (shown if no logo image)', group:'general' },
  { key:'logo_url',     value:'',                    label:'Logo Image URL', group:'general' },
  { key:'phone1',       value:'9810240284',           label:'Phone 1',      group:'contact' },
  { key:'phone2',       value:'9810257891',           label:'Phone 2',      group:'contact' },
  { key:'phone3',       value:'8285923747',           label:'Phone 3',      group:'contact' },
  { key:'email',        value:'info@proaudiosolutions.in', label:'Email',   group:'contact' },
  { key:'address',      value:'Plot No. 149, Kh. No. 9/2, Nathan Vihar, Ranhola, Delhi', label:'Address', group:'contact' },
  { key:'website',      value:'www.proaudiosolution.in', label:'Website URL', group:'contact' },
  { key:'whatsapp',     value:'9810240284',           label:'WhatsApp Number', group:'contact' },
  { key:'facebook',     value:'https://www.facebook.com/share/18qeFapLo8/',                    label:'Facebook URL', group:'social' },
  { key:'instagram',    value:'https://www.instagram.com/pro.audiosolutions',                    label:'Instagram URL', group:'social' },
  { key:'youtube',      value:'',                    label:'YouTube URL',  group:'social' },
  { key:'maps_embed',   value:'',                    label:'Google Maps Embed URL', group:'contact' },
  // Theme colors
  { key:'color_primary',       value:'#D4AF37', label:'Primary Color (Gold)',    group:'theme' },
  { key:'color_secondary',     value:'#1A1A2E', label:'Secondary Color (Navy)',  group:'theme' },
  { key:'color_accent',        value:'#E94560', label:'Accent Color (Red)',       group:'theme' },
  { key:'color_bg',            value:'#FFFFFF', label:'Background Color',         group:'theme' },
  { key:'color_bg_alt',        value:'#F8F7F4', label:'Alt Background Color',     group:'theme' },
  { key:'color_text',          value:'#1A1A2E', label:'Text Color',               group:'theme' },
  // About content
  { key:'about_text',  value:'Pro Audio Solution is a leading Light & Sound company based in Delhi, dedicated to delivering top-quality audio and lighting experiences.', label:'About Text', group:'content' },
  { key:'hero_heading',value:'Premium Sound & Lighting Solutions For Every Event', label:'Hero Heading', group:'content' },
  { key:'hero_subtext',value:'From intimate weddings to massive concerts — professional PA systems, intelligent lighting, LED walls & trussing. Available 24×7 across Delhi NCR.', label:'Hero Subtext', group:'content' },
];

export const PRODUCTS_SEED = [
  // PA Systems
  { name:'JBL VTX A12', category:'Sound Systems', description:'Professional touring line array tops — flagship VTX series delivering crystal-clear audio for large-scale concerts and events. Handles up to 10,000 capacity crowds with exceptional clarity.', specs:'Type: Line Array Tops | Brand: JBL | Series: VTX | Use: Large Concerts', featured:true, order:1 },
  { name:'JBL VTX B28', category:'Sound Systems', description:'Professional touring dual 18" subwoofer delivering deep, thunderous bass that you feel as much as hear. Pairs perfectly with VTX A12 and A8 line arrays.', specs:'Type: Subwoofer | Brand: JBL | Series: VTX | Use: Bass Extension', featured:true, order:2 },
  { name:'JBL VTX A8', category:'Sound Systems', description:'Compact touring line array tops for medium to large venues. Delivers the VTX quality in a smaller form factor — ideal for corporate ballrooms and concert halls.', specs:'Type: Line Array Tops | Brand: JBL | Series: VTX | Use: Medium Venues', featured:false, order:3 },
  { name:'JBL SRX 910 LA', category:'Sound Systems', description:'Versatile powered line array system — self-contained with built-in DSP and amplification. Perfect for corporate events and smaller concerts requiring quick deployment.', specs:'Type: Powered Line Array | Brand: JBL | Series: SRX | Use: Corporate & Mid Events', featured:false, order:4 },
  { name:'JBL VRX 915', category:'Sound Systems', description:'High-performance full-range speakers for versatile applications. Excellent for side fills, front fills, and smaller venue main PA deployments.', specs:'Type: Tops | Brand: JBL | Series: VRX | Use: Fill Speakers', featured:false, order:5 },
  { name:'RCF HDL20', category:'Sound Systems', description:'Italian-engineered RCF Series line array delivering warm, musical sound character. Exceptional mid-range clarity makes it a favorite for live band and vocal-forward events.', specs:'Type: Line Array Tops | Brand: RCF | Series: HDL | Use: Live Bands & Concerts', featured:true, order:6 },
  // Slim / Corporate Speakers
  { name:'Nexo Geo S Series', category:'Sound Systems', description:'Ultra-compact touring line array system for corporate events, conferences, and exhibitions where aesthetics and audio quality must coexist. Sleek and powerful.', specs:'Type: Compact Line Array | Brand: Nexo | Use: Corporate Events', featured:false, order:7 },
  { name:'Bose ShowMatch', category:'Sound Systems', description:'Installed/touring point-source system ideal for corporate presentations and speech reinforcement where a line array would be overkill.', specs:'Type: Point Source | Brand: Bose | Use: Corporate & Speech', featured:false, order:8 },
  // Consoles
  { name:'DiGiCo Quantum 338', category:'Mixing Consoles', description:'State-of-the-art flagship digital mixing console — the choice of top touring engineers worldwide. Features DiGiCo\'s exclusive Quantum engine for zero-latency processing, 96kHz operation, and unprecedented I/O flexibility. Used on Bollywood and international tours.', specs:'Type: Digital Console | Brand: DiGiCo | Model: Q338 | Channels: 128+ | Sample Rate: 96kHz', featured:true, order:1 },
  { name:'Allen & Heath dLive S7000', category:'Mixing Consoles', description:'A masterpiece of mixing engineering — dLive\'s FPGA-based processing delivers analog warmth in a digital platform. 96 input channels, 48 buses, and the most intuitive workflow in live sound. Our go-to for A-list artist tours.', specs:'Type: Digital Console | Brand: Allen & Heath | Model: dLive S7000 | Channels: 96 | Buses: 48', featured:true, order:2 },
  { name:'Soundcraft Vi 3000', category:'Mixing Consoles', description:'Industry-proven Vi series digital console with STUDER preamps and Vistonics™ II touchscreen interface. Beloved by broadcast engineers and live sound professionals for its musical, transparent sound.', specs:'Type: Digital Console | Brand: Soundcraft | Model: Vi 3000 | Channels: 64', featured:false, order:3 },
  { name:'Allen & Heath SQ7', category:'Mixing Consoles', description:'48-channel digital mixer with 96kHz operation — incredible value and performance in a compact frame. Our preferred console for medium corporate events and club gigs.', specs:'Type: Digital Console | Brand: Allen & Heath | Model: SQ7 | Channels: 48 | 96kHz', featured:false, order:4 },
  { name:'Soundcraft Si Impact', category:'Mixing Consoles', description:'Compact, powerful digital console featuring 40 input channels and full STUDER mic preamps. Ideal for theatre productions, corporate AV, and fixed-install scenarios.', specs:'Type: Digital Console | Brand: Soundcraft | Model: Si Impact | Channels: 40', featured:false, order:5 },
  { name:'Yamaha LS9-32', category:'Mixing Consoles', description:'The industry workhorse — Yamaha\'s legendary LS9 has powered thousands of events worldwide. Ultra-reliable, great-sounding, and familiar to engineers everywhere.', specs:'Type: Digital Console | Brand: Yamaha | Model: LS9-32 | Channels: 32', featured:false, order:6 },
  // Mics
  { name:'Shure Axient AD4D', category:'Microphones', description:'The gold standard of wireless microphone systems — Shure Axient Digital delivers pristine 24-bit audio with ShowLink remote management and automatic frequency coordination. Zero dropouts, even in crowded RF environments. Used for Bollywood artist performances.', specs:'Type: Wireless Handheld System | Brand: Shure | Model: Axient AD4D | Bandwidth: 72MHz', featured:true, order:1 },
  { name:'Sennheiser SKM D6000', category:'Microphones', description:'Ultra-premium Sennheiser flagship wireless system — Digital 6000 series delivers audiophile-grade wireless audio that rivals high-end wired microphones. The microphone of choice for demanding vocalists.', specs:'Type: Wireless Handheld | Brand: Sennheiser | Series: Digital 6000 | Bandwidth: 88MHz', featured:true, order:2 },
  { name:'Sennheiser EWDX E-945', category:'Microphones', description:'Evolution Wireless Digital system combining Sennheiser\'s legendary E945 capsule with cutting-edge digital transmission. Perfect balance of affordability and performance for medium-scale events.', specs:'Type: Digital Wireless | Brand: Sennheiser | Model: EWDX | Capsule: E945', featured:false, order:3 },
  { name:'Sennheiser IEM G4 2000 Series', category:'Microphones', description:'Professional in-ear monitoring system for artists who need to hear themselves clearly on stage. 2000 series delivers broadcast-quality audio directly to artist\'s ears, replacing stage monitors.', specs:'Type: IEM System | Brand: Sennheiser | Series: 2000 | Use: Artist Monitoring', featured:false, order:4 },
  { name:'Neumann MCM Clip-On', category:'Microphones', description:'World-renowned Neumann studio quality in a discreet clip-on format. The preferred microphone for classical musicians, conference speakers, and anyone who needs invisible high-fidelity audio capture.', specs:'Type: Clip-On Condenser | Brand: Neumann | Model: MCM | Use: Instruments & Lecturers', featured:false, order:5 },
  { name:'Sennheiser ME3 Headset Mic', category:'Microphones', description:'Cardioid headset microphone delivering consistent proximity regardless of head movement. Ideal for energetic performers, fitness presenters, and theatre actors.', specs:'Type: Headset Mic | Brand: Sennheiser | Model: ME3 | Pattern: Cardioid', featured:false, order:6 },
  { name:'Shure MX Series Podium', category:'Microphones', description:'Gooseneck podium microphones providing unobtrusive, professional-looking speech reinforcement. Standard for government events, press conferences, and corporate boardrooms.', specs:'Type: Gooseneck Podium | Brand: Shure | Series: MX | Use: Speech & Conferences', featured:false, order:7 },
  { name:'Shure SM58 & SM57 (Wired)', category:'Microphones', description:'The most famous microphones in history — SM58 for vocals, SM57 for instruments. Industry-standard wired mics found on every professional stage worldwide. Indestructible and unfailingly reliable.', specs:'Type: Dynamic Wired | Brand: Shure | Model: SM58 (vocal) + SM57 (instrument)', featured:false, order:8 },
  // Lighting
  { name:'Sharpy Moving Head Beam', category:'Lighting', description:'The iconic beam fixture that changed live entertainment forever. Razor-sharp pencil beams cut through haze with surgical precision, creating mid-air effects that audiences never forget. Essential for any concert lighting rig.', specs:'Type: Moving Head Beam | Lamp: 189W HSD | Pan: 540° | Tilt: 270° | Beam Angle: 0°-2.5°', featured:true, order:1 },
  { name:'BSW Beam Spot Wash Hybrid', category:'Lighting', description:'Ultimate versatility — one fixture does the work of three. Switch between tight beam effects, sharp gobo projections, and wide soft washes in seconds. Our most-requested fixture for dynamic corporate and concert productions.', specs:'Type: Moving Head Hybrid BSW | LED: 350W RGBW | Pan: 540° | Tilt: 270°', featured:true, order:2 },
  { name:'LED Wash Moving Head (RGBW)', category:'Lighting', description:'Smooth, wide-angle RGBW LED wash for rich stage color fills. Advanced pixel control enables eye-catching internal effects. Produces natural skin tones critical for IMAG video capture.', specs:'Type: Moving Wash | LED: 19×15W RGBW | Zoom: 7°-55° | CRI: 90+', featured:false, order:3 },
  { name:'LED Batten Static', category:'Lighting', description:'Linear LED batten fixture for stage edge lighting, set washing, and architectural illumination. Delivers even, streak-free light coverage across the full stage width.', specs:'Type: Static LED Batten | LED: RGBW | Length: 1m | Use: Stage Wash & Architectural', featured:false, order:4 },
  { name:'Atomic Strobe (LED)', category:'Lighting', description:'Blinding strobe power with LED efficiency. Variable speed and intensity creates everything from subtle shimmer to full blackout-speed strobing. A concert must-have for build-up moments.', specs:'Type: LED Strobe | Power: 800W equivalent | Speed: Variable | Color: White + RGB', featured:false, order:5 },
  { name:'Tamboora Moving Batten', category:'Lighting', description:'Moving linear batten delivering motorized pan and tilt combined with full RGBW color mixing. Creates unique sweeping effects impossible with traditional fixtures.', specs:'Type: Moving LED Batten | Pan: 200° | RGBW LED Array | Use: Dynamic Linear Effects', featured:false, order:6 },
  { name:'LED Par (RGBW)', category:'Lighting', description:'Workhorse RGBW LED par cans for vibrant stage color washes, set lighting, and uplighting. Wireless DMX capable for wire-free deployment across large stages.', specs:'Type: LED Par | LED: 12×15W RGBW | Beam Angle: 25° | Wireless DMX Ready', featured:false, order:7 },
  { name:'Follow Spot 2000W', category:'Lighting', description:'Professional 2000W follow spot for tracking artists across the stage. Long throw capability ensures bright, clean pools of light even in large arenas and outdoor venues.', specs:'Type: Follow Spot | Lamp: 2000W HMI | Throw: 15-50m | Iris, Color, Dimmer Controls', featured:false, order:8 },
  // Light Consoles
  { name:'grandMA3 Full Size', category:'Lighting', description:'The undisputed king of lighting control — grandMA3 is the industry standard for world-class touring, theatre, and television productions. Unlimited universe capacity, intuitive 3D pre-visualisation, and the most powerful programming engine ever made.', specs:'Type: Lighting Console | Brand: MA Lighting | Model: MA3 Full | Universes: Unlimited | Screens: 5x Multi-Touch', featured:true, order:1 },
  { name:'Avolites D7-330', category:'Lighting', description:'Powerful mid-size lighting console featuring Avolites\' legendary Titan OS. 330 playback faders, multi-touch screens, and the fastest busking workflow in the industry. Our choice for events requiring speed and flexibility.', specs:'Type: Lighting Console | Brand: Avolites | Model: D7-330 | Faders: 330 | OS: Titan', featured:true, order:2 },
  { name:'Arena Light Board', category:'Lighting', description:'Heavy-duty arena-grade lighting control console built for maximum reliability in the most demanding touring environments. Handles the largest rigs with ease.', specs:'Type: Lighting Console | Use: Arena Scale Productions | High Reliability', featured:false, order:3 },
  { name:'Avolites Tiger Touch II', category:'Lighting', description:'Compact, powerful Avolites console perfect for medium-scale productions. Full Titan OS in a portable form factor — all the power, less the size.', specs:'Type: Lighting Console | Brand: Avolites | Model: Tiger Touch II | OS: Titan', featured:false, order:4 },
  // Truss
  { name:'Aluminium Box Truss 100×100', category:'Trussing & Structures', description:'Heavy-duty 100"×100" aluminium box truss — the backbone of any major stage production. Engineer-certified for maximum load ratings. Supports LED walls, line array towers, lighting rigs, and complete roof systems. Available in custom lengths.', specs:'Type: Box Truss | Material: Aluminium 6082-T6 | Section: 100×100mm | Load Rating: Engineer Certified', featured:true, order:1 },
  { name:'Aluminium T-Truss 52×52', category:'Trussing & Structures', description:'Versatile T-section truss for smaller stage configurations, exhibition stands, and backdrop structures. Lightweight yet strong — quick assembly for time-pressured events.', specs:'Type: T-Truss | Material: Aluminium | Section: 52×52mm | Use: Small Stages & Exhibitions', featured:false, order:2 },
  { name:'Motor Chain Hoist (1 Ton)', category:'Trussing & Structures', description:'Electric chain hoists for flying truss, line arrays, and LED walls safely and quickly. 1-ton capacity with integrated safety limit switches and load monitoring.', specs:'Type: Electric Chain Hoist | Capacity: 1000kg | Speed: 4m/min | Chain: G80 Alloy Steel', featured:false, order:3 },
  { name:'Ballast Weights (Certified)', category:'Trussing & Structures', description:'Engineer-certified counterweight ballast blocks for ground-supported truss safety. Prevents tip-over in windy outdoor conditions. All structures certified to BIS standards.', specs:'Type: Safety Ballast | Certification: Engineer Approved | Use: Ground Support Safety', featured:false, order:4 },
  // LED Wall
  { name:'LED Wall P4.8 Indoor (up to 4000 sqft)', category:'LED Walls', description:'Spectacular indoor LED wall system available in configurations up to 4,000 sq.ft. P4.8mm pixel pitch delivers breathtaking visual clarity for stage backdrops, IMAG screens, and brand activations. Seamless panel system with quick rigging for events on tight schedules.', specs:'Type: Indoor LED Wall | Pixel Pitch: P4.8mm | Brightness: 1200 nit | Refresh Rate: 3840Hz | Max Size: 4000 sq.ft', featured:true, order:1 },
  { name:'LED Wall P3.9 Outdoor', category:'LED Walls', description:'Weatherproof P3.9 outdoor LED wall panels for daylight-visible signage and entertainment displays. IP65 rated front and rear — fully weatherproof for outdoor festivals and events.', specs:'Type: Outdoor LED Wall | Pixel Pitch: P3.9mm | Brightness: 5000 nit | IP Rating: IP65 | Use: Outdoor Events', featured:false, order:2 },
];

export const GALLERY_SEED = [
  // Corporate Events  
  { url:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', caption:'Corporate Conference Setup — DiGiCo Q338 FOH', category:'Corporate', eventName:'Corporate Event', altText:'Professional audio setup for corporate conference' },
  { url:'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800', caption:'Corporate Product Launch — Full Stage Production', category:'Corporate', eventName:'Corporate Event', altText:'Stage production for product launch' },
  { url:'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800', caption:'Corporate AGM — Podium & Projector Setup', category:'Corporate', eventName:'Corporate Event', altText:'AGM audio visual setup' },
  { url:'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800', caption:'Corporate Awards Ceremony — Full Lighting Rig', category:'Corporate', eventName:'Corporate Event', altText:'Awards ceremony with lighting' },
  // Wedding Events
  { url:'https://images.unsplash.com/photo-1519741497674-611481863552?w=800', caption:'Grand Wedding Reception — JBL VTX A12 + LED Uplighting', category:'Wedding', eventName:'Wedding Events', altText:'Wedding reception audio lighting setup' },
  { url:'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800', caption:'Sangeet Night — Moving Heads & LED Dance Floor', category:'Wedding', eventName:'Wedding Events', altText:'Sangeet night with moving head lights' },
  { url:'https://images.unsplash.com/photo-1478147427282-58a87a433b2a?w=800', caption:'Wedding Stage — LED Wall Backdrop + Truss Arch', category:'Wedding', eventName:'Wedding Events', altText:'Wedding stage with LED wall backdrop' },
  // Concerts
  { url:'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800', caption:'Live Concert — JBL VTX A12 Line Array Deploy', category:'Concert', eventName:'Concert Event', altText:'Live concert line array deployment' },
  { url:'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800', caption:'Night Concert — Sharpy Beam Show + Haze', category:'Concert', eventName:'Concert Event', altText:'Concert with beam lights and haze' },
  { url:'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800', caption:'Concert Stage — LED Wall + Full Lighting Rig', category:'Concert', eventName:'Concert Event', altText:'Concert stage with full production' },
  { url:'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800', caption:'Live Band Concert — grandMA3 Programmed Show', category:'Concert', eventName:'Concert Event', altText:'Live band concert with programmed lighting' },
  // College Events
  { url:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800', caption:'College Fest — High Energy Sound & Lighting', category:'College', eventName:'College Event', altText:'College festival with sound and lights' },
  { url:'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800', caption:'Annual College Function — Full Stage Rig', category:'College', eventName:'College Event', altText:'College annual function stage' },
  // Award Shows
  { url:'https://images.unsplash.com/photo-1586899028174-e7098604235b?w=800', caption:'Punjabi Film Fare Awards — LED Wall + Truss Stage', category:'Awards', eventName:'Punjabi Film Fare Award', altText:'Award show with LED wall stage' },
  // Government Events
  { url:'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=800', caption:'International Yoga Day — Government Event Sound Setup', category:'Government', eventName:'Govt Event (Yoga Day)', altText:'Government event audio setup' },
];

export const POLICY_PAGES_SEED = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    pageType: 'policy',
    showInFooter: true,
    published: true,
    metaTitle: 'Privacy Policy | Pro Audio Solution',
    metaDesc: 'Privacy policy for Pro Audio Solution website and services.',
    htmlContent: `<h2>Privacy Policy</h2>
<p>Last updated: January 2025</p>
<p>Pro Audio Solution ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.</p>
<h3>Information We Collect</h3>
<p>We collect information you provide directly to us when you submit an enquiry or contact form, including your name, email address, phone number, and event details.</p>
<h3>How We Use Your Information</h3>
<ul>
<li>To respond to your enquiries and provide event production services</li>
<li>To send you quotes and service information</li>
<li>To improve our website and services</li>
</ul>
<h3>Information Sharing</h3>
<p>We do not sell, trade, or otherwise transfer your personal information to third parties. Your information is used solely for providing our services.</p>
<h3>Contact Us</h3>
<p>If you have questions about this Privacy Policy, contact us at info@proaudiosolutions.in</p>`,
  },
  {
    slug: 'terms-conditions',
    title: 'Terms & Conditions',
    pageType: 'policy',
    showInFooter: true,
    published: true,
    metaTitle: 'Terms & Conditions | Pro Audio Solution',
    metaDesc: 'Terms and conditions for Pro Audio Solution rental and event services.',
    htmlContent: `<h2>Terms &amp; Conditions</h2>
<p>Last updated: January 2025</p>
<p>By booking Pro Audio Solution for your event, you agree to the following terms:</p>
<h3>Booking & Payment</h3>
<ul>
<li>A 50% advance is required to confirm bookings</li>
<li>Remaining balance due on day of event before setup begins</li>
<li>Cancellations within 7 days of event forfeit the advance</li>
</ul>
<h3>Equipment</h3>
<ul>
<li>All equipment remains the property of Pro Audio Solution</li>
<li>Client is responsible for damage to equipment caused by misuse</li>
<li>Equipment will be collected within 24 hours of event completion</li>
</ul>
<h3>Liability</h3>
<p>Pro Audio Solution is not liable for disruptions caused by power failures, extreme weather, or force majeure events beyond our control.</p>
<h3>Contact</h3>
<p>For queries: info@proaudiosolutions.in | 9810240284</p>`,
  },
  {
    slug: 'refund-policy',
    title: 'Refund Policy',
    pageType: 'policy',
    showInFooter: true,
    published: true,
    metaTitle: 'Refund Policy | Pro Audio Solution',
    metaDesc: 'Refund and cancellation policy for Pro Audio Solution.',
    htmlContent: `<h2>Refund Policy</h2>
<p>Last updated: January 2025</p>
<h3>Cancellation Policy</h3>
<ul>
<li><strong>More than 30 days before event:</strong> Full refund of advance payment</li>
<li><strong>15-30 days before event:</strong> 50% refund of advance payment</li>
<li><strong>7-14 days before event:</strong> 25% refund of advance payment</li>
<li><strong>Less than 7 days before event:</strong> No refund — advance forfeited</li>
</ul>
<h3>Equipment Issues</h3>
<p>If equipment failure on our part causes significant disruption to your event, we will offer a proportional credit toward a future booking.</p>
<h3>Contact for Refunds</h3>
<p>Email: info@proaudiosolutions.in | Call: 9810240284</p>`,
  },
];

export const EVENTS_SEED = [
  {
    title: 'Bollywood Fusion Night 2025',
    slug: 'bollywood-fusion-night-2025',
    description: 'An electrifying evening of Bollywood hits featuring top artists from Mumbai. Full JBL VTX A12 line array, grandMA3 lighting, and 2000sqft LED wall backdrop.',
    htmlContent: '<h3>Event Details</h3><p>Join us for an unforgettable night of Bollywood music featuring top-tier artists. Pro Audio Solution will power the event with our flagship JBL VTX A12 line array system, grandMA3 programmed lighting show, and a spectacular 2000sqft P4.8 LED wall.</p><h3>Equipment Deployed</h3><ul><li>JBL VTX A12 Line Array (24 boxes)</li><li>JBL VTX B28 Subwoofers (12 boxes)</li><li>DiGiCo Quantum 338 FOH Console</li><li>grandMA3 Full Size Lighting Console</li><li>LED Wall P4.8 – 2000sqft</li><li>Sharpy Moving Head Beams (48 units)</li></ul>',
    date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    venue: 'Jawaharlal Nehru Stadium, New Delhi',
    category: 'Concert',
    isUpcoming: true,
    featured: true,
    popupEnabled: true,
    popupContent: '🎵 <strong>Book Your Table!</strong> VIP packages available. Call 9810240284 now — limited seats.',
    tags: ['Bollywood', 'Concert', 'Live Music'],
  },
  {
    title: 'Corporate Excellence Summit 2025',
    slug: 'corporate-excellence-summit-2025',
    description: 'Annual corporate leadership summit featuring keynote speakers, panel discussions, and networking. Full AV production by Pro Audio Solution.',
    htmlContent: '<h3>About The Summit</h3><p>The Corporate Excellence Summit brings together 500+ business leaders for a day of insights, networking, and inspiration. Pro Audio Solution handles the complete AV production.</p><h3>Production Includes</h3><ul><li>Slim Tower speaker system for crystal-clear speech</li><li>Shure Axient wireless microphone systems</li><li>Shure MX series podium microphones</li><li>Dual projection screens with presentation support</li><li>Professional stage lighting</li></ul>',
    date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    venue: 'The Leela Palace, New Delhi',
    category: 'Corporate',
    isUpcoming: true,
    featured: false,
    tags: ['Corporate', 'Conference', 'Summit'],
  },
  {
    title: 'Grand Wedding Celebrations — Sharma Family',
    slug: 'sharma-family-wedding-2025',
    description: 'Three-day wedding celebration including mehendi, sangeet, and reception. Complete sound, lighting, and LED décor by Pro Audio Solution.',
    htmlContent: '<h3>Event Overview</h3><p>A grand three-day wedding celebration requiring full audio-visual production for mehendi garden ceremony, high-energy sangeet night, and elegant reception dinner.</p>',
    date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    venue: 'The Oberoi, Gurgaon',
    category: 'Wedding',
    isUpcoming: true,
    featured: false,
    tags: ['Wedding', 'Sangeet', 'Reception'],
  },
  // Past events
  {
    title: 'Punjabi Film Fare Awards 2024',
    slug: 'punjabi-filmfare-awards-2024',
    description: 'Prestigious Punjabi cinema awards ceremony — complete stage production including LED wall, truss staging, Sharpy beam show, and broadcast-quality audio.',
    htmlContent: '<h3>Event Highlights</h3><p>The Punjabi Film Fare Awards 2024 was one of our most spectacular productions — a full arena-scale setup for Punjabi cinema\'s biggest night.</p><h3>Technical Specs</h3><ul><li>LED Wall P4.8 — 3000sqft main screen + 2 side screens</li><li>RCF HDL20 Line Array (48 boxes)</li><li>DiGiCo dLive S7000 FOH Console</li><li>Avolites D7-330 Lighting Console</li><li>Sharpy Moving Heads — 60 units</li><li>Aluminium Box Truss Stage — custom arch design</li></ul>',
    date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    venue: 'Indira Gandhi Indoor Stadium, Delhi',
    category: 'Concert',
    isUpcoming: false,
    featured: true,
    tags: ['Awards', 'Punjabi Cinema', 'Entertainment'],
  },
  {
    title: 'International Yoga Day — Government Celebration',
    slug: 'yoga-day-govt-2024',
    description: 'Government-organized International Yoga Day celebration with 5000+ participants. Full outdoor PA system and stage production.',
    htmlContent: '<h3>Event Details</h3><p>International Yoga Day government celebration with 5000+ participants at Rajpath. Complete outdoor PA system, stage setup, and lighting by Pro Audio Solution.</p>',
    date: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
    venue: 'Rajpath, New Delhi',
    category: 'Government',
    isUpcoming: false,
    featured: false,
    tags: ['Government', 'Yoga Day', 'Outdoor'],
  },
  {
    title: 'IIT Delhi Rendezvous Fest 2024',
    slug: 'iit-delhi-rendezvous-2024',
    description: 'IIT Delhi\'s annual cultural festival — one of Asia\'s largest college fests. Pro Audio Solution powered the main stage for 3 consecutive nights.',
    htmlContent: '<h3>About Rendezvous</h3><p>IIT Delhi\'s flagship cultural festival Rendezvous 2024 — 3 nights of non-stop entertainment with A-list Bollywood performers. Pro Audio Solution handled main stage audio and lighting.</p>',
    date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    venue: 'IIT Delhi Campus, New Delhi',
    category: 'College',
    isUpcoming: false,
    featured: false,
    tags: ['College Fest', 'IIT', 'Cultural'],
  },
];

export const WHY_CHOOSE = [
  { icon: '🕐', title: '24×7 Expert Team', desc: 'Our engineers and crew are available round the clock — call us at 2AM if you need to. We never switch off.' },
  { icon: '🎛️', title: 'Complete Production', desc: 'Sound, lights, LED walls, truss, and staging — full event production under one roof. No coordination hassle.' },
  { icon: '💍', title: 'All Event Types', desc: 'Weddings, corporate AGMs, stadium concerts, college fests, government events — we\'ve done it all, at every scale.' },
  { icon: '⚡', title: 'Always On Time', desc: 'Setup completed before your event timeline — our #1 commitment. If we\'re not early, we\'re late.' },
  { icon: '🏆', title: 'Premium Brands Only', desc: 'JBL, DiGiCo, Sennheiser, Shure, grandMA, Avolites — we invest in the world\'s best gear so your event sounds and looks world-class.' },
  { icon: '🔧', title: 'On-Site Engineers', desc: 'Our qualified sound and lighting engineers stay for the entire event — not just setup. Constant monitoring, instant problem-solving.' },
];

// Image-based seed for the home page "Why Choose Us" cards (admin-manageable WhyChoose model)
export const WHY_CHOOSE_SEED = [
  { title: '24×7 Expert Team', desc: 'Our engineers and crew are available round the clock — call us at 2AM if you need to. We never switch off.', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600', order: 1 },
  { title: 'Complete Production', desc: 'Sound, lights, LED walls, truss, and staging — full event production under one roof. No coordination hassle.', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600', order: 2 },
  { title: 'All Event Types', desc: 'Weddings, corporate AGMs, stadium concerts, college fests, government events — we\'ve done it all, at every scale.', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600', order: 3 },
  { title: 'Always On Time', desc: 'Setup completed before your event timeline — our #1 commitment. If we\'re not early, we\'re late.', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600', order: 4 },
  { title: 'Premium Brands Only', desc: 'JBL, DiGiCo, Sennheiser, Shure, grandMA, Avolites — we invest in the world\'s best gear so your event sounds and looks world-class.', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600', order: 5 },
  { title: 'On-Site Engineers', desc: 'Our qualified sound and lighting engineers stay for the entire event — not just setup. Constant monitoring, instant problem-solving.', image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600', order: 6 },
];

export const CLIENTS_TYPES = [
  'Weddings & Sangeet',
  'Corporate Events',
  'Live Concerts',
  'College Fests',
  'Government Events',
  'Punjabi Film Awards',
  'Bollywood Artists',
  'Award Shows',
];

// Image-based seed for the home page "Events We Power" cards (admin-manageable EventType model)
export const EVENT_TYPES_SEED = [
  { title: 'Weddings & Sangeet', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500', order: 1 },
  { title: 'Corporate Events', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500', order: 2 },
  { title: 'Live Concerts', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500', order: 3 },
  { title: 'College Fests', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500', order: 4 },
  { title: 'Government Events', image: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=500', order: 5 },
  { title: 'Punjabi Film Awards', image: 'https://images.unsplash.com/photo-1586899028174-e7098604235b?w=500', order: 6 },
  { title: 'Bollywood Artists', image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500', order: 7 },
  { title: 'Award Shows', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500', order: 8 },
];
