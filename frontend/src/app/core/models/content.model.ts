export interface Actualite {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  publishedAt: Date;
  featured: boolean;
}

export enum ConcertStatus {
  COMPLET = 'Complet',
  ANNULE = 'Annulé',
}

export interface Concert {
  id: number;
  name: string;
  slug: string;
  date: Date;
  venue: string;
  imageUrl: string;
  price?: number;
  description: string;
  status?: ConcertStatus | null;
  featured: boolean;
}

export interface Cours {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  level: string;
  duration: string;
  price?: number;
}

export interface Contact {
  id: number;
  name: string;
  role: string;
  email: string;
  phone?: string;
  photoUrl?: string;
}

export interface BilletterieEvent {
  id: number;
  name: string;
  date: Date;
  imageUrl: string;
  price: number;
  ticketUrl: string;
  hasVideo?: boolean;
}

export interface Partner {
  id: number;
  name: string;
  logoUrl: string;
  websiteUrl: string;
  description?: string;
}
