import { useState, useEffect } from 'react';
import { SITE_DEFAULTS } from './siteData';

// Server-side: fetch settings and merge with defaults
export async function getSettings() {
  try {
    const { connectDB, Settings } = await import('./db');
    await connectDB();
    const settings = await Settings.find({}).lean();
    const map = { ...SITE_DEFAULTS };
    settings.forEach(s => {
      // map db keys to SITE_DEFAULTS style keys
      const keyMap = {
        site_name: 'name', tagline: 'tagline', logo_text: 'logoText', logo_url: 'logoUrl',
        phone1: 'phone1', phone2: 'phone2', phone3: 'phone3',
        email: 'email', address: 'address', website: 'website', whatsapp: 'whatsapp',
        facebook: 'facebook', instagram: 'instagram', youtube: 'youtube',
        about_text: 'about', hero_heading: 'heroHeading', hero_subtext: 'heroSubtext',
        maps_embed: 'mapsEmbed',
        color_primary: 'colorPrimary', color_secondary: 'colorSecondary',
        color_accent: 'colorAccent', color_bg: 'colorBg', color_bg_alt: 'colorBgAlt',
        color_text: 'colorText',
      };
      if (keyMap[s.key]) map[keyMap[s.key]] = s.value;
      else map[s.key] = s.value;
    });
    return map;
  } catch {
    return SITE_DEFAULTS;
  }
}

// Returns phones as array
export function getPhones(site) {
  return [site.phone1, site.phone2, site.phone3].filter(Boolean);
}
