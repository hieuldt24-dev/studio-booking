export interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

export interface HeroSectionProps {
  title: string;
  description?: string;
  ctaText: string;
  ctaHref: string;
  backgroundImage?: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName?: string;
}

export interface FeaturesSectionProps {
  tagline?: string;
  title: string;
  description?: string;
  items: FeatureItem[];
}

export interface StudioRoom {
  id: string;
  name: string;
  description: string;
  pricePerHour: number;
  image: string;
  capacity: number;
  equipment: string[];
  panoramaUrl?: string;
}

export interface EquipmentItem {
  id: string;
  name: string;
  category: "camera" | "lighting" | "audio" | "other";
  description: string;
  pricePerSession: number;
  image: string;
  specs: string[];
}

export interface StudioListSectionProps {
  title: string;
  description?: string;
  rooms: StudioRoom[];
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  avatar?: string;
  quote: string;
  rating: number;
}

export interface TestimonialsSectionProps {
  title: string;
  description?: string;
  testimonials: Testimonial[];
}

export interface LandingPageContent {
  slug: string;
  seo: SEOProps;
  hero: HeroSectionProps;
  features: FeaturesSectionProps;
  studios: StudioListSectionProps;
  testimonials: TestimonialsSectionProps;
  equipment?: EquipmentItem[];
}
