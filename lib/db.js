import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/proaudiosolution';
let cached = global.mongoose;
if (!cached) { cached = global.mongoose = { conn: null, promise: null }; }

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) cached.promise = mongoose.connect(MONGODB_URI).then(m => m);
  cached.conn = await cached.promise;
  return cached.conn;
}

// ── Product ────────────────────────────────────────────────
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  specs: { type: String },
  image: { type: String },
  images: [{ type: String }],
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  popupEnabled: { type: Boolean, default: false },
  popupContent: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// ── Event ──────────────────────────────────────────────────
const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, sparse: true },
  description: { type: String },
  htmlContent: { type: String },
  date: { type: Date, required: true },
  endDate: { type: Date },
  venue: { type: String },
  category: { type: String, default: 'Other' },
  image: { type: String },
  images: [{ type: String }],
  isUpcoming: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  popupEnabled: { type: Boolean, default: false },
  popupContent: { type: String },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

// ── Gallery Image ──────────────────────────────────────────
const GalleryImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  caption: { type: String },
  altText: { type: String },
  category: { type: String, default: 'General' },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  eventName: { type: String },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// ── Category (manageable lists for Gallery & Events, kept separate) ──
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['gallery', 'event'], required: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});
CategorySchema.index({ name: 1, type: 1 }, { unique: true });

// ── Enquiry ────────────────────────────────────────────────
const EnquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  product: { type: String },
  eventDate: { type: String },
  eventType: { type: String },
  message: { type: String },
  status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
  createdAt: { type: Date, default: Date.now },
});

// ── Contact ────────────────────────────────────────────────
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  subject: { type: String },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
  createdAt: { type: Date, default: Date.now },
});

// ── CMS Page ───────────────────────────────────────────────
const PageSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String },
  htmlContent: { type: String },
  pageType: { type: String, enum: ['cms', 'policy', 'service'], default: 'cms' },
  metaTitle: { type: String },
  metaDesc: { type: String },
  published: { type: Boolean, default: true },
  showInFooter: { type: Boolean, default: false },
  popupEnabled: { type: Boolean, default: false },
  popupContent: { type: String },
  updatedAt: { type: Date, default: Date.now },
});

// ── Site Settings ──────────────────────────────────────────
const SettingsSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: mongoose.Schema.Types.Mixed },
  label: { type: String },
  group: { type: String, default: 'general' },
});

// ── Stats ──────────────────────────────────────────────────
const StatSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  label: { type: String, required: true },
  value: { type: String, required: true },
  icon: { type: String },
  order: { type: Number, default: 0 },
  visible: { type: Boolean, default: true },
});

export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);
export const GalleryImage = mongoose.models.GalleryImage || mongoose.model('GalleryImage', GalleryImageSchema);
export const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
export const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);
export const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
export const Page = mongoose.models.Page || mongoose.model('Page', PageSchema);
export const Settings = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
export const Stat = mongoose.models.Stat || mongoose.model('Stat', StatSchema);
