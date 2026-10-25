/* =====================================================================
   SITE CONFIG — shared by index.html and admin.html
   Change your Supabase project or admin email here (one place only).
   Everything else is edited from admin.html — no coding needed.
   ===================================================================== */
const SUPABASE_URL = 'https://pxlpfhagbkbafxgcpcyl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4bHBmaGFnYmtiYWZ4Z2NwY3lsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI4NDcxMjEsImV4cCI6MjEwODQyMzEyMX0.fLsjVzsqy16qe9wsYsF9KStaVKNm9cZDiInf5gsM3ek';
const ADMIN_EMAIL = 'fareedulhassan0@gmail.com';   // only this Supabase user can edit the site
const SETTINGS_ID = 'main';
const STORAGE_BUCKET = 'portfolio';
const FEED_FUNCTION = 'social-feed';                // Supabase Edge Function name

/* ---------- Social platforms (feed:true = can show latest posts automatically) ---------- */
const SOCIAL_PLATFORMS = {
  facebook:  { name: 'Facebook',  icon: 'fa-brands fa-facebook-f',  color: '#1877f2', ph: 'https://facebook.com/yourpage', feed: true },
  instagram: { name: 'Instagram', icon: 'fa-brands fa-instagram',   color: '#e4405f', ph: 'https://instagram.com/username', feed: true },
  linkedin:  { name: 'LinkedIn',  icon: 'fa-brands fa-linkedin-in', color: '#0a66c2', ph: 'https://linkedin.com/in/username' },
  youtube:   { name: 'YouTube',   icon: 'fa-brands fa-youtube',     color: '#ff0033', ph: 'https://youtube.com/@yourchannel', feed: true },
  tiktok:    { name: 'TikTok',    icon: 'fa-brands fa-tiktok',      color: '#fe2c55', ph: 'https://tiktok.com/@username', feed: true },
  x:         { name: 'X (Twitter)', icon: 'fa-brands fa-x-twitter', color: '#8b8b8b', ph: 'https://x.com/username' },
  threads:   { name: 'Threads',   icon: 'fa-brands fa-threads',     color: '#8b8b8b', ph: 'https://threads.net/@username' },
  whatsapp:  { name: 'WhatsApp Channel', icon: 'fa-brands fa-whatsapp', color: '#25d366', ph: 'https://whatsapp.com/channel/...' },
  telegram:  { name: 'Telegram',  icon: 'fa-brands fa-telegram',    color: '#26a5e4', ph: 'https://t.me/username' },
  pinterest: { name: 'Pinterest', icon: 'fa-brands fa-pinterest-p', color: '#e60023', ph: 'https://pinterest.com/username' },
  snapchat:  { name: 'Snapchat',  icon: 'fa-brands fa-snapchat',    color: '#f7d400', ph: 'https://snapchat.com/add/username' },
  github:    { name: 'GitHub',    icon: 'fa-brands fa-github',      color: '#8b8b8b', ph: 'https://github.com/username' },
  medium:    { name: 'Medium',    icon: 'fa-brands fa-medium',      color: '#8b8b8b', ph: 'https://medium.com/@username' },
  behance:   { name: 'Behance',   icon: 'fa-brands fa-behance',     color: '#1769ff', ph: 'https://behance.net/username' },
  dribbble:  { name: 'Dribbble',  icon: 'fa-brands fa-dribbble',    color: '#ea4c89', ph: 'https://dribbble.com/username' },
  discord:   { name: 'Discord',   icon: 'fa-brands fa-discord',     color: '#5865f2', ph: 'https://discord.gg/invite' },
  fiverr:    { name: 'Fiverr',    icon: 'fa-brands fa-fiverr',      color: '#1dbf73', ph: 'https://fiverr.com/username' },
  upwork:    { name: 'Upwork',    icon: 'fa-solid fa-briefcase',    color: '#14a800', ph: 'https://upwork.com/freelancers/...' },
  website:   { name: 'Website / Blog', icon: 'fa-solid fa-globe',   color: '#ff7a1a', ph: 'https://yourwebsite.com' }
};

/* ---------- Built-in sections (hero is always first) ---------- */
const BUILTIN_SECTIONS = ['marquee', 'stats', 'about', 'services', 'skills', 'experience', 'education', 'highlights', 'social', 'contact'];
const SECTION_LABELS = { hero: 'Hero', marquee: 'Ticker Strip', stats: 'Stats Counter', about: 'About Me', services: 'Services', skills: 'Skills', experience: 'Experience', education: 'Education & Certifications', highlights: 'Highlights', social: 'Social Feed', contact: 'Contact' };

/* ---------- Default content (admin.html overrides all of this) ---------- */
const DEFAULTS = (() => {
  const platforms = {};
  Object.keys(SOCIAL_PLATFORMS).forEach(k => { platforms[k] = { enabled: false, url: '', feed: false }; });
  Object.assign(platforms.youtube, { channelId: '' });
  Object.assign(platforms.facebook, { mode: 'plugin', pageId: '' });
  Object.assign(platforms.linkedin, { enabled: true, url: 'https://www.linkedin.com/in/syed-fareed-ul-hassan-898844286' });

  return {
    seo: { title: 'Syed Fareed Ul Hassan | Career Expert & Physics Educator', description: 'Portfolio of Syed Fareed Ul Hassan — Career Expert, Physics Educator and Online Instructor based in Sargodha, Punjab, Pakistan.' },
    theme: { preset: 'flame', primary: '#ff5500', secondary: '#ff9900', bg: '#060609', bg2: '#0c0c12', card: '#13131c', text: '#f3f4f6', muted: '#9ca3af', radius: 18, glow: 40, fontHeading: 'Outfit', fontBody: 'Inter' },
    animations: { enabled: true, reveal: 'fade-up', speed: 0.8, stagger: 0.08, typewriter: true, typeSpeed: 90, particles: true, particleCount: 60, orbit: true, float: true, cursorGlow: true, tilt: true, marquee: true, marqueeSpeed: 30, counters: true, preloader: true, scrollProgress: true },
    nav: { cta: "Let's Talk" },
    profile: {
      firstName: 'Syed Fareed', lastName: 'Ul Hassan', brand: 'Syed Fareed', initials: 'SFH',
      hello: "Hello, I'm", badge: 'Available for Career Consulting & Online Instruction',
      roles: ['Career Expert', 'Physics Educator', 'Online Quran Instructor', 'Resume & Document Specialist'],
      intro: 'Career services professional and Physics educator with experience in resume guidance, secondary-level science instruction, and online Quran teaching. Combining a BS in Physics with specialized training in Office Management and Amazon Virtual Assistance.',
      photoUrl: '', cvUrl: '',
      yearsExp: '4+', yearsLabel: 'Years of Experience', floatBadge: 'BS Physics',
      email: 'fareedulhassan0@gmail.com', phone: '03205335188', whatsapp: '923205335188',
      linkedin: 'https://www.linkedin.com/in/syed-fareed-ul-hassan-898844286',
      location: 'Sargodha, Punjab, Pakistan', availability: 'Available On-Site & Remote Worldwide',
      aboutTag: 'Career Expert | Physics Educator | Online Instructor',
      aboutTitle: 'Helping job seekers build targeted career documents and guiding students toward excellence in Physics & Quranic studies.',
      aboutText1: 'I am a career services professional and Physics educator with hands-on experience in resume guidance, secondary-level science instruction, and online Quran teaching. I hold a BS in Physics from the University of Sargodha, complemented by certified training in Office Management and Amazon Virtual Assistance.',
      aboutText2: 'At Pixely Careers, I help job seekers present their qualifications, work history, and skills in clear, targeted career documents aligned with their goals — combining clear communication, individualized support, and client-focused review.',
      cvSummary: 'Career services professional and Physics educator with experience in resume guidance, secondary-level science instruction, and online Quran teaching. Holds an academic background in Physics with training in office management and Amazon virtual assistance. Combines professional communication, learner support, and client-focused document review across education and career services.'
    },
    sections: {
      hero: { show: true, nav: 'Home' },
      marquee: { show: true },
      stats: { show: true },
      about: { show: true, nav: 'About', kicker: 'Discover My Profile', title: 'About', accent: 'Me', sub: '' },
      services: { show: true, nav: 'Services', kicker: 'What I Do', title: 'My', accent: 'Services', sub: 'Professional solutions across career development, science instruction, online education, and virtual office administration.' },
      skills: { show: true, nav: 'Skills', kicker: 'Core Competencies', title: 'My Work', accent: 'Skills', sub: 'Combining analytical Physics training with professional career consulting and administrative precision.' },
      experience: { show: true, nav: 'Experience', kicker: 'Career Journey', title: 'Professional', accent: 'Experience', sub: '' },
      education: { show: true, nav: 'Education', kicker: 'Academic Credentials', title: 'Education &', accent: 'Certifications', sub: '' },
      highlights: { show: true, nav: '', kicker: 'Value Delivered', title: 'Why Clients & Learners', accent: 'Work With Me', sub: '' },
      social: { show: true, nav: '', kicker: 'Stay Connected', title: 'Latest From My', accent: 'Socials', sub: 'Fresh videos, photos and updates from my social media channels.', maxItems: 9 },
      contact: { show: true, nav: 'Contact', kicker: "Let's Work Together", title: 'Get In', accent: 'Touch', sub: 'Have a resume project, need a Physics or Quran tutor, or looking for a dedicated professional? Reach out below.' }
    },
    order: BUILTIN_SECTIONS.slice(),
    customSections: [],
    socials: { showHero: true, showFooter: true, showContact: true, floatingBar: false, platforms, posts: [] },
    marquee: ['Resume Review', 'Career Guidance', 'Physics Instruction', 'Online Quran Teaching', 'Lesson Planning', 'Office Administration', 'Amazon Virtual Assistance', 'Client Communication'],
    stats: [
      { icon: 'fa-solid fa-briefcase', value: '4', suffix: '+', label: 'Years Professional Experience' },
      { icon: 'fa-solid fa-chalkboard-user', value: '4', suffix: '', label: 'Professional Roles' },
      { icon: 'fa-solid fa-layer-group', value: '3', suffix: '', label: 'Core Domains' },
      { icon: 'fa-solid fa-certificate', value: '2', suffix: '', label: 'Certified Trainings' }
    ],
    services: [
      { icon: 'fa-solid fa-file-pen', title: 'Resume Review & Career Guidance', desc: 'Targeted resume structuring, clarity optimization, professional wording, and alignment with your specific career goals and target roles.', tag: 'Pixely Careers Expertise' },
      { icon: 'fa-solid fa-atom', title: 'Physics Instruction & Exam Prep', desc: 'Secondary & FSc level Physics coaching focused on foundational concepts, numerical problem-solving, and worked exam solutions.', tag: 'Theory & Exam Prep' },
      { icon: 'fa-solid fa-book-quran', title: 'Online Quran Instruction', desc: 'Personalized one-on-one online Quran lessons guiding recitation, Tajweed pronunciation, and structured practice with supportive feedback.', tag: '1-on-1 Remote Learning' },
      { icon: 'fa-solid fa-laptop-file', title: 'Office Admin & Amazon VA', desc: 'Document preparation and organization, professional correspondence, remote client communication, and virtual assistance operations.', tag: 'Certified Operations' }
    ],
    skills: [
      { name: 'Resume Review & Optimization', percent: 96, category: 'Career Services' },
      { name: 'Career Guidance & Role Alignment', percent: 94, category: 'Career Services' },
      { name: 'Client Communication', percent: 95, category: 'Career Services' },
      { name: 'Physics Instruction & Numericals', percent: 95, category: 'Education' },
      { name: 'Online Quran Teaching & Tajweed', percent: 94, category: 'Education' },
      { name: 'Lesson Planning & Student Support', percent: 92, category: 'Education' },
      { name: 'Office Administration & Documents', percent: 92, category: 'Admin & VA' },
      { name: 'Amazon Virtual Assistance', percent: 90, category: 'Admin & VA' }
    ],
    competencies: ['Resume Review', 'Career Guidance', 'Client Communication', 'Document Preparation', 'Physics Instruction', 'Lesson Planning', 'Problem-Solving', 'Student Support', 'Online Instruction', 'Office Administration', 'Document Organization', 'Professional Correspondence', 'Remote Communication', 'Amazon Virtual Assistance'],
    experience: [
      { role: 'Career Expert', company: 'Pixely Careers', period: 'June 2026 – Present', type: 'Career Services', icon: 'fa-solid fa-briefcase', current: true, points: ['Help job seekers present qualifications, work history, and relevant skills in clear, targeted career documents.', "Review resumes for structure, relevance, clarity, professional wording, and alignment with applicants' career goals.", 'Discuss career backgrounds and target roles with clients to identify document requirements and improvements.'] },
      { role: 'Online Quran Teacher', company: 'Remote / Online Instruction', period: '2024 – 2026', type: 'Online Instruction', icon: 'fa-solid fa-globe', current: false, points: ['Delivered online Quran lessons and adapted explanations to individual learning needs and progress.', 'Guided recitation, pronunciation, and regular practice with structured feedback to support learning.'] },
      { role: 'Physics Teacher', company: 'Islamic Suffah High School', period: '2023 – 2024', type: 'Secondary Education', icon: 'fa-solid fa-school', current: false, points: ['Taught secondary-level Physics, emphasizing scientific concepts, foundational principles, and numerical problem-solving.', 'Developed lesson explanations, examples, and classroom activities aligned with Physics topics.'] },
      { role: 'Physics Teacher', company: 'Ahmed Science Academy', period: '2022 – 2023', type: 'Science Academy', icon: 'fa-solid fa-flask', current: false, points: ['Delivered Physics instruction covering theory, calculations, and examination-focused problem-solving.', 'Supported topic revision with guided examples, worked solutions, and learner feedback.'] }
    ],
    education: [
      { degree: 'Bachelor of Science (BS) in Physics', institute: 'University of Sargodha', period: '2022 – 2026', location: 'Sargodha, Pakistan', desc: 'Training in classical & modern physics, mathematical methods, analytical problem-solving, and scientific instruction.' },
      { degree: 'FSc (Pre-Engineering)', institute: 'Government Central Model Higher Secondary School, Sargodha', period: '2020 – 2022', location: 'Sargodha, Pakistan', desc: '' },
      { degree: 'Secondary School Certificate (Matriculation)', institute: 'Government High School, Sultanabad, Sargodha', period: '2018 – 2020', location: 'Sargodha, Pakistan', desc: '' }
    ],
    certifications: [
      { title: 'Amazon Virtual Assistant Course', org: 'University of Sargodha', year: 'Certified Course', icon: 'fa-brands fa-amazon', desc: 'Training in e-commerce store operations, client management, product research, and remote virtual assistance workflows.' },
      { title: 'Office Management Course', org: 'I-CET Academy', year: '2021', icon: 'fa-solid fa-folder-tree', desc: 'Foundation in office administration, document preparation, record organization, and professional correspondence.' }
    ],
    highlights: [
      { icon: 'fa-solid fa-bullseye', title: 'Targeted Career Documents', text: "Turns work history and qualifications into clear, focused resumes aligned with each applicant's target roles and goals." },
      { icon: 'fa-solid fa-square-root-variable', title: 'Clear Step-by-Step Physics', text: 'Breaks complex Physics principles and numericals into structured, worked solutions that build exam confidence.' },
      { icon: 'fa-solid fa-hands-holding-child', title: 'Patient, Personalized Teaching', text: "Online Quran instruction tailored to each learner's pace, with steady feedback on pronunciation and recitation." }
    ],
    contact: { formTitle: 'Send a Direct Message', formSub: 'Your message is saved securely and delivered straight to my Gmail inbox.', gmailTo: 'fareedulhassan0@gmail.com', saveToSupabase: true, sendGmail: true, whatsappButton: true, successMsg: "Thank you! Your message has been received — I'll get back to you soon." },
    footer: { tagline: 'Career Expert | Physics Educator | Online Instructor', text: 'All Rights Reserved.' }
  };
})();

const FONT_WEIGHTS = {
  'Outfit': '300;400;500;600;700;800;900', 'Inter': '300;400;500;600;700;800;900', 'Poppins': '300;400;500;600;700;800;900',
  'Montserrat': '300;400;500;600;700;800;900', 'Space Grotesk': '300;400;500;600;700', 'Sora': '300;400;500;600;700;800',
  'Plus Jakarta Sans': '300;400;500;600;700;800', 'Manrope': '300;400;500;600;700;800', 'Raleway': '300;400;500;600;700;800;900',
  'Playfair Display': '400;500;600;700;800;900', 'DM Sans': '300;400;500;600;700;800;900', 'Urbanist': '300;400;500;600;700;800;900',
  'Lexend': '300;400;500;600;700;800;900', 'Rubik': '300;400;500;600;700;800;900', 'Nunito': '300;400;500;600;700;800;900',
  'Lora': '400;500;600;700', 'Roboto': '300;400;500;700;900', 'Open Sans': '300;400;500;600;700;800', 'Syne': '400;500;600;700;800', 'Bebas Neue': '400'
};

/* ---------- Shared helpers ---------- */
function merge(base, over) {
  if (over === undefined || over === null) return base;
  if (Array.isArray(over)) return over;
  if (typeof over === 'object' && base && typeof base === 'object' && !Array.isArray(base)) {
    const out = { ...base };
    for (const k in over) out[k] = merge(base[k], over[k]);
    return out;
  }
  return over;
}

/** Final order of all sections (built-in + custom), hero excluded. */
function orderList(c) {
  const all = [...BUILTIN_SECTIONS, ...((c.customSections || []).map(s => s.id))];
  const o = (c.order || []).filter((x, i, a) => all.includes(x) && a.indexOf(x) === i);
  all.forEach(x => {
    if (o.includes(x)) return;
    const ci = o.indexOf('contact');
    if (ci >= 0 && x !== 'contact') o.splice(ci, 0, x); else o.push(x);
  });
  return o;
}

function linkedinUrl(c) {
  const l = c.socials && c.socials.platforms && c.socials.platforms.linkedin;
  return l && l.enabled && l.url ? l.url : (c.profile.linkedin || '');
}

/** Turns any link (YouTube, Instagram, Facebook, LinkedIn, TikTok, Vimeo, image, video, or pasted <iframe> code) into an embeddable media object. */
function parseMedia(u) {
  u = String(u || '').trim();
  if (!u) return null;
  const ifr = u.match(/<iframe[^>]+src=["']([^"']+)["']/i);
  if (ifr) u = ifr[1].replace(/&amp;/g, '&');
  let m;
  if ((m = u.match(/(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/|v\/)|youtu\.be\/)([\w-]{11})/)))
    return { pl: 'youtube', kind: 'iframe', src: `https://www.youtube.com/embed/${m[1]}?rel=0`, thumb: `https://i.ytimg.com/vi/${m[1]}/hqdefault.jpg`, url: `https://www.youtube.com/watch?v=${m[1]}`, play: true };
  if ((m = u.match(/vimeo\.com\/(?:video\/)?(\d+)/)))
    return { pl: 'vimeo', kind: 'iframe', src: `https://player.vimeo.com/video/${m[1]}`, url: `https://vimeo.com/${m[1]}`, play: true };
  if ((m = u.match(/instagram\.com\/(?:[\w.]+\/)?(p|reels?|tv)\/([\w-]+)/))) {
    const t = m[1].startsWith('reel') ? 'reel' : m[1];
    return { pl: 'instagram', kind: 'iframe', src: `https://www.instagram.com/${t}/${m[2]}/embed/captioned/`, url: `https://www.instagram.com/${t}/${m[2]}/`, h: 620 };
  }
  if ((m = u.match(/tiktok\.com\/(?:@[\w.-]+\/video|embed(?:\/v2)?)\/(\d+)/)))
    return { pl: 'tiktok', kind: 'iframe', src: `https://www.tiktok.com/embed/v2/${m[1]}`, url: u, h: 740 };
  if (/facebook\.com\/plugins\//.test(u))
    return { pl: 'facebook', kind: 'iframe', src: u, url: decodeURIComponent((u.match(/href=([^&]+)/) || [])[1] || u), h: 600 };
  if (/(facebook\.com|fb\.watch)\//.test(u)) {
    const vid = /\/videos?\/|\/reel\/|\/watch|fb\.watch/.test(u);
    return { pl: 'facebook', kind: 'iframe', src: `https://www.facebook.com/plugins/${vid ? 'video' : 'post'}.php?href=${encodeURIComponent(u)}&show_text=true&width=500`, url: u, h: vid ? 480 : 600 };
  }
  if ((m = u.match(/linkedin\.com\/embed\/feed\/update\/(urn:li:\w+:\d+)/)))
    return { pl: 'linkedin', kind: 'iframe', src: `https://www.linkedin.com/embed/feed/update/${m[1]}`, url: u, h: 600 };
  if ((m = u.match(/linkedin\.com\/.*?(activity|share|ugcPost)[-:](\d{10,25})/)))
    return { pl: 'linkedin', kind: 'iframe', src: `https://www.linkedin.com/embed/feed/update/urn:li:${m[1]}:${m[2]}`, url: u, h: 600 };
  if (/^data:video\//.test(u) || /\.(mp4|webm|ogg|ogv|mov|m4v)(\?|#|$)/i.test(u))
    return { pl: 'upload', kind: 'video', src: u, url: u, play: true };
  if (/^data:image\//.test(u) || /\.(png|jpe?g|gif|webp|avif|svg|bmp)(\?|#|$)/i.test(u) || /images\.unsplash\.com|googleusercontent\.com|fbcdn\.net|cdninstagram\.com|i\.ytimg\.com/.test(u))
    return { pl: 'upload', kind: 'image', src: u, thumb: u, url: u };
  return { pl: 'link', kind: 'link', url: u };
}
