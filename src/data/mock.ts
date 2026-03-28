export interface ActualiteSection {
  titre: string;
  content: string;
}

export interface Actualite {
  id: number;
  titre: string;
  slug: string;
  extrait: string;
  content: string;
  sections?: ActualiteSection[];
  image: string;
  datePublication: Date;
  featured: boolean;
}

export enum ConcertStatus {
  COMPLET = 'COMPLET',
  ANNULE = 'ANNULÉ',
  REPORTE = 'REPORTÉ',
}

export interface ConcertSection {
  titre: string;
  content: string;
}

export interface Concert {
  id: number;
  titre: string;
  slug: string;
  date: Date;
  lieu: string;
  image: string;
  prix: number;
  contenuHtml: string;
  status: ConcertStatus | null;
  sections?: ConcertSection[]; // New field for customizable sections
  featured: boolean;
}

export const actualites: Actualite[] = [
  {
    id: 1,
    titre: 'Inscriptions au Tremplin Musical 2026',
    slug: 'inscriptions-tremplin-2026',
    extrait:
      'Les inscriptions pour le Tremplin Musical 2026 sont ouvertes ! Une opportunité unique pour les jeunes talents de se faire connaître.',
    content:
      "Le Tremplin Musical est de retour pour une nouvelle édition qui s'annonce explosive ! Comme chaque année, nous recherchons les pépites de la scène locale.",
    sections: [
      {
        titre: 'Conditions de participation',
        content:
          "Pour participer, vous devez résider dans la région et proposer un répertoire original de compositions (pas de reprises). Le groupe doit avoir moins de 3 ans d'existence.",
      },
      {
        titre: 'Les prix à gagner',
        content:
          "Le lauréat remportera un enregistrement en studio, un accompagnement artistique d'un an et une programmation sur la scène du festival l'été prochain.",
      },
      {
        titre: "Comment s'inscrire ?",
        content:
          "Envoyez votre dossier complet (bio, liens d'écoute, photos) via le formulaire en ligne avant le 31 janvier.",
      },
    ],
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800',
    datePublication: new Date('2025-11-20'),
    featured: true,
  },
  {
    id: 2,
    titre: "Rentrée de l'École de Musique",
    slug: 'rentree-ecole-musique',
    extrait:
      "Toutes les informations sur la rentrée de l'école de musique : horaires, inscriptions, nouveaux cours...",
    content:
      "L'école de musique rouvre ses portes le 15 septembre. Découvrez notre planning pour l'année 2025-2026.",
    sections: [
      {
        titre: 'Nouveaux cours',
        content:
          "Cette année, nous ouvrons une classe de MAO (Musique Assistée par Ordinateur) et un atelier d'éveil musical pour les tout-petits.",
      },
    ],
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800',
    datePublication: new Date('2025-11-15'),
    featured: false,
  },
  {
    id: 3,
    titre: "Nouveau Studio d'Enregistrement",
    slug: 'nouveau-studio-enregistrement',
    extrait:
      "Découvrez notre nouveau studio d'enregistrement équipé des dernières technologies pour vos projets musicaux.",
    content: '',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800',
    datePublication: new Date('2025-11-10'),
    featured: false,
  },
  {
    id: 4,
    titre: "Nouveau Studio d'Enregistrement 2",
    slug: 'nouveau-studio-enregistrement-2',
    extrait:
      "Découvrez notre nouveau studio d'enregistrement équipé des dernières technologies pour vos projets musicaux.",
    content: '',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800',
    datePublication: new Date('2025-11-10'),
    featured: false,
  },
];

export const concerts: Concert[] = [
  {
    id: 1,
    titre: 'Rock Night - The Killers Tribute',
    slug: 'rock-night-killers',
    date: new Date('2025-12-05'),
    lieu: 'Le Parallèle',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
    prix: 15,
    contenuHtml:
      'Une soirée rock inoubliable avec le meilleur tribute band des Killers. Venez redécouvrir les tubes qui ont marqué les années 2000.',
    status: null,
    sections: [
      {
        titre: 'Au programme',
        content:
          "Retrouvez tous les classiques : Mr. Brightside, Somebody Told Me, Human... Interprétés avec passion par le groupe 'Hot Fuss' qui tourne dans toute l'Europe.",
      },
      {
        titre: 'Informations pratiques',
        content:
          'Ouverture des portes à 20h00. Début du concert à 20h30. Bar et petite restauration sur place. Pas de vestiaire.',
      },
    ],
    featured: true,
  },
  {
    id: 2,
    titre: 'Jazz Session - Marcus Miller Style',
    slug: 'jazz-session-miller',
    date: new Date('2025-12-12'),
    lieu: 'Le Parallèle',
    image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800',
    prix: 20,
    contenuHtml: 'Soirée jazz exceptionnelle',
    status: ConcertStatus.COMPLET,
    featured: false,
  },
  {
    id: 3,
    titre: "Concert de Noël - Élèves de l'École",
    slug: 'concert-noel-eleves',
    date: new Date('2025-12-20'),
    lieu: 'Le Parallèle',
    image: 'https://picsum.photos/800/600',
    prix: 5,
    contenuHtml: 'Venez fêter Noël avec nous',
    status: ConcertStatus.ANNULE,
    featured: true,
  },
  {
    id: 4,
    titre: "Concert de Noël 2 - Élèves de l'École",
    slug: 'concert-noel-eleves',
    date: new Date('2025-12-20'),
    lieu: 'Le Parallèle',
    image: 'https://picsum.photos/800/600',
    prix: 5,
    contenuHtml: 'Venez fêter Noël avec nous',
    status: ConcertStatus.ANNULE,
    featured: true,
  },
  {
    id: 5,
    titre: "Concert de Noël 3 - Élèves de l'École",
    slug: 'concert-noel-eleves',
    date: new Date('2025-12-20'),
    lieu: 'Le Parallèle',
    image: 'https://picsum.photos/800/600',
    prix: 5,
    contenuHtml: 'Venez fêter Noël avec nous',
    status: ConcertStatus.ANNULE,
    featured: true,
  },
];
