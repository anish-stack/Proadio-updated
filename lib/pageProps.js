// Shared helper: get site settings + footer pages for every page
import { connectDB, Settings, Page, Stat } from './db';

export async function getCommonProps() {
  try {
    await connectDB();
    const [settingsRaw, footerPages, stats] = await Promise.all([
      Settings.find({}).lean(),
      Page.find({ showInFooter: true, published: true }).select('slug title pageType popupEnabled popupContent').lean(),
      Stat.find({ visible: true }).sort({ order: 1 }).lean(),
    ]);
    const site = {};
    const keyMap = {
      site_name:'name', tagline:'tagline', logo_text:'logoText', logo_url:'logoUrl',
      phone1:'phone1', phone2:'phone2', phone3:'phone3',
      email:'email', address:'address', website:'website', whatsapp:'whatsapp',
      facebook:'facebook', instagram:'instagram', youtube:'youtube',
      about_text:'about', hero_heading:'heroHeading', hero_subtext:'heroSubtext',
      maps_embed:'mapsEmbed',
      color_primary:'colorPrimary', color_secondary:'colorSecondary',
      color_accent:'colorAccent', color_bg:'colorBg', color_bg_alt:'colorBgAlt',
      color_text:'colorText',
    };
    settingsRaw.forEach(s => { site[keyMap[s.key] || s.key] = s.value; });
    return {
      site: JSON.parse(JSON.stringify(site)),
      footerPages: JSON.parse(JSON.stringify(footerPages)),
      stats: JSON.parse(JSON.stringify(stats)),
    };
  } catch {
    return { site: {}, footerPages: [], stats: [] };
  }
}
