// Blog data for Cupcakes & Cashmere clone
// Design: Modern Lifestyle Magazine

export type Category =
  | 'LIFESTYLE'
  | 'FASHION'
  | 'FOODIE'
  | 'DECOR'
  | 'MOTHERHOOD'
  | 'BEAUTY'
  | 'TRAVEL'
  | 'DIY'
  | 'SERIES';

export interface Post {
  id: string;
  slug: string;
  title: string;
  category: Category;
  subcategory?: string;
  author: string;
  date: string;
  dateShort: string;
  image: string;
  excerpt: string;
  content: string;
  gallery?: string[];
  tags?: string[];
}

// CDN image URLs
const IMGS = {
  fashion: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663513310224/9SZMGkbaaC4Zu6zT8mQETT/blog-fashion-nm6oj7buY5a5L3V9bgfxiU.webp',
  food: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663513310224/9SZMGkbaaC4Zu6zT8mQETT/blog-food-8CGcTzC2acUiwoKLFaJNQu.webp',
  decor: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663513310224/9SZMGkbaaC4Zu6zT8mQETT/blog-decor-AoCoAP6gd9vb6ntQABKYh4.webp',
  gallery: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663513310224/9SZMGkbaaC4Zu6zT8mQETT/blog-gallery-HoeFbqCpgi7HEHpz5K7K8E.webp',
  hero: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663513310224/9SZMGkbaaC4Zu6zT8mQETT/hero-lifestyle-hRNXeda5dDWjSG8BhTNcSv.webp',
  // Unsplash lifestyle images
  lifestyle1: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
  lifestyle2: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
  motherhood1: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80',
  motherhood2: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80',
  motherhood3: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80',
  beauty1: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80',
  travel1: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=800&q=80',
  food2: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
  food3: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
  decor2: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
  fashion2: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
  fashion3: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
};

export const POSTS: Post[] = [
  {
    id: '1',
    slug: 'ive-moved-to-substack',
    title: "I've Moved to Substack!",
    category: 'LIFESTYLE',
    author: 'Emily',
    date: 'February 21, 2025',
    dateShort: 'Feb 21, 2025',
    image: IMGS.hero,
    excerpt: 'After many years of blogging here, I\'m excited to share that I\'ve moved my writing to Substack where I can connect more directly with you.',
    content: `After many years of blogging here, I'm excited to share that I've moved my writing to Substack where I can connect more directly with you. The newsletter format feels so much more intimate and personal.

I'll be sharing the same content you've come to love — fashion finds, home decor inspiration, recipes, and personal reflections — but in a format that allows for deeper conversation.

Thank you for being such a loyal reader over the years. I hope you'll follow me to the next chapter!`,
    gallery: [IMGS.hero, IMGS.lifestyle1, IMGS.lifestyle2],
    tags: ['lifestyle', 'personal', 'newsletter'],
  },
  {
    id: '2',
    slug: 'life-lately',
    title: 'Life, lately',
    category: 'LIFESTYLE',
    author: 'Emily',
    date: 'October 30, 2023',
    dateShort: 'Oct 30, 2023',
    image: IMGS.lifestyle1,
    excerpt: 'A little peek into what\'s been going on in my world lately — from cozy mornings to afternoon walks and everything in between.',
    content: `A little peek into what's been going on in my world lately. October has been such a beautiful month — crisp mornings, golden light, and the perfect excuse to wear all my favorite cozy layers.

I've been spending a lot of time in the kitchen experimenting with new recipes, taking long walks in the neighborhood, and reading more than I have in years.

Here are a few snapshots from the past few weeks.`,
    gallery: [IMGS.lifestyle1, IMGS.lifestyle2, IMGS.gallery, IMGS.hero],
    tags: ['lifestyle', 'personal'],
  },

  {
    id: '6',
    slug: 'the-lavune-core-collection-is-here',
    title: 'The Lavune Core Collection is Here!',
    category: 'DECOR',
    subcategory: 'ROOMS & DETAILS',
    author: 'Emily',
    date: 'February 1, 2023',
    dateShort: 'Feb 1, 2023',
    image: IMGS.decor,
    excerpt: 'The collection I\'ve been working on for months is finally here — thoughtfully designed pieces for the modern home.',
    content: `The collection I've been working on for months is finally here — thoughtfully designed pieces for the modern home. Each piece was designed with intention, balancing beauty and function.

I wanted to create objects that feel both elevated and livable, the kind of things you reach for every day and that make your home feel a little more like you.`,
    gallery: [IMGS.decor, IMGS.decor2, IMGS.hero],
    tags: ['decor', 'home', 'collection'],
  },
  {
    id: '7',
    slug: 'welcome-to-our-peaceful-primary-bathroom',
    title: 'Welcome to Our Peaceful Primary Bathroom',
    category: 'DECOR',
    subcategory: 'ROOMS & DETAILS',
    author: 'Emily',
    date: 'August 1, 2022',
    dateShort: 'Aug 1, 2022',
    image: IMGS.decor2,
    excerpt: 'A full tour of our newly renovated primary bathroom — a serene, spa-like retreat that we designed to be both beautiful and functional.',
    content: `A full tour of our newly renovated primary bathroom — a serene, spa-like retreat that we designed to be both beautiful and functional. After months of planning and a few weeks of construction, it's finally done and I couldn't be happier.

The palette is soft and neutral — warm whites, natural stone, and touches of brass. Every detail was considered, from the handmade tiles to the custom vanity.`,
    gallery: [IMGS.decor2, IMGS.decor, IMGS.hero],
    tags: ['decor', 'bathroom', 'renovation', 'home tour'],
  },
  {
    id: '8',
    slug: 'a-letter-to-my-daughter-on-her-10th-birthday',
    title: 'A Letter to My Daughter On Her 10th Birthday',
    category: 'MOTHERHOOD',
    author: 'Emily',
    date: 'February 21, 2025',
    dateShort: 'Feb 21, 2025',
    image: IMGS.motherhood1,
    excerpt: 'Ten years ago, you changed everything. A love letter to my daughter on the occasion of her tenth birthday.',
    content: `Ten years ago, you changed everything. A love letter to my daughter on the occasion of her tenth birthday.

My darling girl, I can hardly believe you are ten. A whole decade of watching you grow, learn, and become the most extraordinary person I know.

You came into this world with such determination, and that spirit has never wavered. You are curious and kind, fierce and gentle, funny in ways that catch me off guard and make me laugh until I cry.`,
    gallery: [IMGS.motherhood1, IMGS.motherhood2, IMGS.motherhood3],
    tags: ['motherhood', 'personal', 'birthday'],
  },
  {
    id: '9',
    slug: 'a-letter-to-my-daughter-on-her-9th-birthday',
    title: 'A Letter to My Daughter On Her 9th Birthday',
    category: 'MOTHERHOOD',
    author: 'Emily',
    date: 'February 6, 2024',
    dateShort: 'Feb 6, 2024',
    image: IMGS.motherhood2,
    excerpt: 'Nine years of watching you grow into the most wonderful person. A birthday letter filled with love.',
    content: `Nine years of watching you grow into the most wonderful person. A birthday letter filled with love.

You are nine today, and I find myself marveling at who you are becoming. You have your father's sense of humor and my love of beauty, but mostly you are entirely, wonderfully yourself.`,
    gallery: [IMGS.motherhood2, IMGS.motherhood1, IMGS.motherhood3],
    tags: ['motherhood', 'personal', 'birthday'],
  },
  {
    id: '10',
    slug: 'new-holiday-party-uniform-unlocked',
    title: 'New holiday party uniform unlocked',
    category: 'FASHION',
    subcategory: 'STYLE',
    author: 'Emily',
    date: 'December 16, 2024',
    dateShort: 'Dec 16, 2024',
    image: IMGS.fashion,
    excerpt: 'The outfit formula I\'ll be wearing on repeat this holiday season — festive but not costume-y, elevated but still comfortable.',
    content: `The outfit formula I'll be wearing on repeat this holiday season — festive but not costume-y, elevated but still comfortable. After years of overthinking holiday dressing, I've finally found my formula.

It starts with a great pair of wide-leg trousers in a rich fabric — velvet, satin, or even a subtle brocade. Add a simple top that lets the pants do the talking, then elevate with jewelry and a great shoe.`,
    gallery: [IMGS.fashion, IMGS.fashion2, IMGS.fashion3],
    tags: ['fashion', 'holiday', 'style', 'outfit'],
  },
  {
    id: '11',
    slug: 'suede-jacket-borrowed-from-the-boys',
    title: 'Suede Jacket Borrowed From The Boys',
    category: 'FASHION',
    subcategory: 'FALL',
    author: 'Emily',
    date: 'September 27, 2024',
    dateShort: 'Sep 27, 2024',
    image: IMGS.fashion2,
    excerpt: 'The menswear-inspired suede jacket that\'s become my most-worn piece this fall — and how I\'m styling it three different ways.',
    content: `The menswear-inspired suede jacket that's become my most-worn piece this fall — and how I'm styling it three different ways. There's something about a slightly oversized suede jacket that feels effortlessly cool without trying too hard.

I've been wearing mine with everything from jeans and a tee to midi skirts and ankle boots.`,
    gallery: [IMGS.fashion2, IMGS.fashion, IMGS.fashion3],
    tags: ['fashion', 'fall', 'jacket', 'style'],
  },
  {
    id: '12',
    slug: 'scenes-from-a-tuesday-afternoon',
    title: 'Scenes from a Tuesday Afternoon',
    category: 'LIFESTYLE',
    author: 'Emily',
    date: 'April 30, 2024',
    dateShort: 'Apr 30, 2024',
    image: IMGS.lifestyle2,
    excerpt: 'A quiet Tuesday afternoon captured in photographs — the small moments that make up a life.',
    content: `A quiet Tuesday afternoon captured in photographs — the small moments that make up a life. There's something I love about the ordinary Tuesday, the day that asks nothing of you.

These are the days I try to pay attention to — the light through the kitchen window, the sound of the neighborhood, the particular pleasure of a good cup of coffee.`,
    gallery: [IMGS.lifestyle2, IMGS.hero, IMGS.lifestyle1],
    tags: ['lifestyle', 'personal', 'photography'],
  },
];

export const POPULAR_BY_CATEGORY: Record<string, Post[]> = {
  LIFESTYLE: POSTS.filter(p => p.category === 'LIFESTYLE').slice(0, 2),
  DECOR: POSTS.filter(p => p.category === 'DECOR').slice(0, 2),
  MOTHERHOOD: POSTS.filter(p => p.category === 'MOTHERHOOD').slice(0, 3),
};

export const CATEGORY_COLORS: Record<string, string> = {
  LIFESTYLE: '#c8a090',
  FASHION: '#a0b8d0',
  FOODIE: '#c8a060',
  FIT: '#90b8a0',
  DECOR: '#a8b8a0',
  MOTHERHOOD: '#b8a0c0',
  BEAUTY: '#c8a0b0',
  TRAVEL: '#90a8c0',
  DIY: '#c8b890',
  SERIES: '#b0b0b0',
};

export const NAV_CATEGORIES = [
  'FASHION', 'FOODIE', 'FIT', 'BEAUTY', 'TRAVEL', 'DECOR', 'MOTHERHOOD', 'VIDEO'
];
