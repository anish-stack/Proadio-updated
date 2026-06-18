# Pro Audio Solution — Complete Website

Full-stack Next.js website for **Pro Audio Solution**, Delhi — Premium Light & Sound Company.

## 🚀 Tech Stack
- **Frontend + Backend**: Next.js 14, JSX (no TypeScript), Pages Router
- **Database**: MongoDB via Mongoose
- **Image hosting**: Cloudinary (admin-side file uploads)
- **Email notifications**: Nodemailer (Gmail SMTP)
- **Styling**: Pure CSS custom properties (zero CSS frameworks)
- **Admin**: Built-in password-protected admin panel at `/admin`

## ✨ Features

### Public Website
- 🏠 **Homepage** — Hero, stats, featured products (with real images), upcoming events (with real images), CTA with enquiry form
- 🎛️ **Products** — Category filter, search, pagination (9/page), product image, click-to-open **details view** (description, specs, image, enquire), enquiry popup
- 🎵 **Events** — Upcoming/past tabs, clickable event cards with cover image, single event detail pages
- 📄 **Event Detail** — HTML rich content, **event picture gallery with lightbox**, auto-popup on load (**won't re-show for 2 minutes after being shown/closed**), enquiry form
- 🖼️ **Gallery** — Masonry grid, category filter, click-to-open lightbox with keyboard nav
- ℹ️ **About** — Dynamic content from settings
- 📞 **Contact** — Full contact page, **plus a floating "💬 Contact" button on every page that opens a contact modal** without leaving the page
- 📑 **CMS Pages** — `/cms/[slug]` renders any admin-created page (policy pages, etc.)
- 🔗 **Footer** — Policy pages (Privacy, Terms, Refund), service popup support

### Admin Panel (`/admin`)
- 🔐 **Password protected** — session persisted; **tab persisted via localStorage** (refresh stays on same tab)
- 📊 **Dashboard** — Live stats, latest enquiries & contacts
- 🎛️ **Products CRUD** — Add/edit/delete, **image upload (Cloudinary)**, featured flag, popup content (rich editor)
- 🎵 **Events CRUD** — Title, slug, HTML content (rich editor), **cover image + multi-photo gallery upload (Cloudinary)**, popup toggle, upcoming/past flag
- 🖼️ **Gallery** — **Bulk photo upload (Cloudinary)** — select multiple files at once, each becomes its own gallery entry; category, caption, event name; grid preview
- 📩 **Enquiries** — View, expand, mark read/replied, call/email buttons — **email notification sent automatically on new enquiry**
- 📧 **Contacts** — View, expand, reply by email — **email notification sent automatically on new contact message**
- 📄 **CMS Pages** — Rich HTML editor, slug, SEO meta, published/draft, show in footer, popup toggle
- 📈 **Stats** — Edit homepage hero statistics (value, label, icon, visibility)
- ⚙️ **Settings** — Grouped settings:
  - General: site name, tagline, logo text, logo URL
  - Contact: phone 1-3, email, address, website, WhatsApp, Google Maps embed
  - Social: Facebook, Instagram, YouTube
  - Theme Colors: primary, secondary, accent, background (color pickers)
  - Content: hero heading, hero subtext, about text

### SEO
- Dynamic meta tags, OG tags, canonical URL
- `sitemap.xml` — auto-generated
- `robots.txt` — admin excluded
- Server-side rendering on all pages

## ⚙️ New Setup Required (Cloudinary + Email)

Add these to `.env.local` (placeholders already added — just fill in the blanks):

```env
# Cloudinary (create a free account at https://cloudinary.com)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Gmail SMTP (use an "App Password", not your normal password)
# Create one at https://myaccount.google.com/apppasswords
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=
SMTP_PASS=
NOTIFY_EMAIL=
```

Without these, the site still works exactly as before — image uploads will show a clear error message in the admin panel, and form submissions will still save to MongoDB (visible in the admin panel) even if the email fails to send.

## 📁 Project Structure
```
proaudio/
├── pages/

│   ├── index.jsx             ← Homepage
│   ├── about.jsx
│   ├── products.jsx          ← Search + filter + pagination
│   ├── events.jsx            ← Upcoming/past tabs
│   ├── events/[id].jsx       ← Single event detail page
│   ├── gallery.jsx           ← Masonry + lightbox
│   ├── contact.jsx
│   ├── cms/[slug].jsx        ← Dynamic CMS pages
│   ├── 404.jsx
│   ├── sitemap.xml.jsx
│   ├── robots.txt.jsx
│   ├── admin/index.jsx       ← Full CMS admin panel
│   └── api/
│       ├── products/[id].js
│       ├── events/[id].js
│       ├── enquiries/[id].js
│       ├── contact/[id].js
│       ├── gallery/[id].js
│       ├── settings/index.js
│       ├── stats/index.js
│       └── admin/seed.js, pages.js, pages/[id].js
├── components/
│   ├── Layout.jsx            ← SEO + dynamic theme CSS vars
│   ├── Navbar.jsx            ← Dynamic logo from settings
│   ├── Footer.jsx            ← Policy links + service popup
│   ├── EnquiryForm.jsx
│   ├── PopupModal.jsx        ← Reusable modal
│   ├── Lightbox.jsx          ← Gallery lightbox
│   └── Toast.jsx
├── lib/
│   ├── db.js                 ← All Mongoose models
│   ├── siteData.js           ← Full seed data (35 products, 6 events, 15 gallery images, policy pages)
│   ├── pageProps.js          ← Shared SSR helper
│   └── settings.js           ← Settings utilities
└── styles/globals.css        ← CSS vars + utility classes
```

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.local.example .env.local
# Edit MONGODB_URI if using MongoDB Atlas

# 3. Start development server
npm run dev

# 4. Seed all demo data (server must be running)
node scripts/seed.js

# 5. Open admin panel
# URL: http://localhost:3000/admin
# Password: proaudio2024
```

## 🎨 Theme Customization
**From Admin Panel** → Settings → Theme Colors tab
- Change colors live with color pickers
- Changes apply to entire site instantly

**In Code** → `styles/globals.css` `:root` block — change once, retheming done.

## 🌐 Deployment (Vercel)
1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variables:
   - `MONGODB_URI` = your MongoDB Atlas connection string
   - `NEXT_PUBLIC_ADMIN_PASS` = your admin password
   - `ADMIN_SECRET` = your seed secret
4. Deploy ✅

## 📋 API Reference
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/api/products` | List / create products |
| PUT/DELETE | `/api/products/[id]` | Update / delete |
| GET/POST | `/api/events` | List / create events |
| PUT/DELETE | `/api/events/[id]` | Update / delete |
| GET/POST | `/api/enquiries` | List / submit |
| PUT/DELETE | `/api/enquiries/[id]` | Update status / delete |
| GET/POST | `/api/contact` | List / submit |
| PUT/DELETE | `/api/contact/[id]` | Update / delete |
| GET/POST | `/api/gallery` | List / add images |
| PUT/DELETE | `/api/gallery/[id]` | Update / delete |
| GET/PUT | `/api/settings` | Get all / bulk update |
| GET/PUT | `/api/stats` | Get stats / update all |
| GET/POST | `/api/admin/pages` | List / create CMS pages |
| PUT/DELETE | `/api/admin/pages/[id]` | Update / delete |
| POST | `/api/admin/seed` | Seed all demo data |
