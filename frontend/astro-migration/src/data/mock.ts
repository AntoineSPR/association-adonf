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
  COMPLET = 'COMPLET',
  ANNULE = 'ANNULÉ',
  REPORTE = 'REPORTÉ',
}

export interface Concert {
  id: number;
  name: string;
  slug: string;
  date: Date;
  venue: string;
  imageUrl: string;
  price: number;
  description: string;
  status: ConcertStatus | null;
  featured: boolean;
}

export const actualites: Actualite[] = [
  {
    id: 1,
    title: 'Inscriptions au Tremplin Musical 2026',
    slug: 'inscriptions-tremplin-2026',
    excerpt:
      'Les inscriptions pour le Tremplin Musical 2026 sont ouvertes ! Une opportunité unique pour les jeunes talents de se faire connaître.',
    content: '',
    imageUrl:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800',
    publishedAt: new Date('2025-11-20'),
    featured: true,
  },
  {
    id: 2,
    title: "Rentrée de l'École de Musique",
    slug: 'rentree-ecole-musique',
    excerpt:
      "Toutes les informations sur la rentrée de l'école de musique : horaires, inscriptions, nouveaux cours...",
    content: '',
    imageUrl:
      'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800',
    publishedAt: new Date('2025-11-15'),
    featured: false,
  },
  {
    id: 3,
    title: "Nouveau Studio d'Enregistrement",
    slug: 'nouveau-studio-enregistrement',
    excerpt:
      "Découvrez notre nouveau studio d'enregistrement équipé des dernières technologies pour vos projets musicaux.",
    content: '',
    imageUrl:
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800',
    publishedAt: new Date('2025-11-10'),
    featured: false,
  },
];

export const concerts: Concert[] = [
  {
    id: 1,
    name: 'Rock Night - The Killers Tribute',
    slug: 'rock-night-killers',
    date: new Date('2025-12-05'),
    venue: 'Salle principale Adonf',
    imageUrl:
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
    price: 15,
    description:
      'Une soirée rock inoubliable avec le meilleur tribute band des Killers',
    status: null,
    featured: true,
  },
  {
    id: 2,
    name: 'Jazz Session - Marcus Miller Style',
    slug: 'jazz-session-miller',
    date: new Date('2025-12-12'),
    venue: 'Salle principale Adonf',
    imageUrl:
      'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800',
    price: 20,
    description: 'Soirée jazz exceptionnelle',
    status: ConcertStatus.COMPLET,
    featured: false,
  },
  {
    id: 3,
    name: "Concert de Noël - Élèves de l'École",
    slug: 'concert-noel-eleves',
    date: new Date('2025-12-20'),
    venue: 'Salle principale Adonf',
    imageUrl:
      'https://images.unsplash.com/photo-1511192336575-5a79af67169a?w=800',
    price: 5,
    description: 'Venez fêter Noël avec nous',
    status: null,
    featured: true,
  },
];
