export interface GalleryImage {
  id: string;
  title: string;
  category: 'all' | 'pool' | 'salon' | 'night' | 'events' | 'deco';
  imageUrl: string;
  alt: string;
  description: string;
  highlight?: string;
}

export interface Amenity {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  image: string;
  features: string[];
  capacity?: string;
}

export interface EventTypeItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  idealFor: string;
  included: string[];
  badge?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  date: string;
  rating: number;
  eventType: string;
  comment: string;
  avatarUrl?: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  eventDate: string;
  eventType: string;
  guestCount: number;
  timeSlot: 'day' | 'night' | 'full';
  notes: string;
}

export interface QuoteService {
  id: string;
  name: string;
  pricePerUnit: number;
  description: string;
  icon: string;
}

