export interface LessonSection {
  title: string;
  content: string;
}

export interface Lesson {
  title: string;
  slug: string;
  image: string;
  description?: string;
  sections?: LessonSection[];
}

export const lessons: Lesson[] = [
  {
    title: 'Guitare',
    slug: 'guitare',
    image:
      'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80',
    description:
      'Apprenez la guitare électrique, folk ou classique, du débutant au confirmé.',
    sections: [
      {
        title: 'Programme',
        content:
          'Étude des accords, rythmiques, arpèges, improvisation. Répertoire varié (Rock, Pop, Blues, Variété...).',
      },
    ],
  },
  {
    title: 'Batterie',
    slug: 'batterie',
    image: 'https://picsum.photos/1000',
    description:
      'Découvrez le rythme et la percussion avec nos cours de batterie adaptés à tout âge.',
    sections: [
      {
        title: 'PROGRAMME DES COURS',
        content:
          '- Pour les plus jeunes et en vue d’une inscription aux cours de batterie ou de percussions à la Rock School, initiation aux rythmes et découverte des instruments de percussions (djembé, batterie, doum doum, petites percussions…).\n- Apprentissage ludique basé sur l’écoute, la pratique de rythmes simples et de jeux polyrythmiques où la responsabilité de chacun se précise.\n- Cours de quarante cinq minutes pour les 5 à 7 ans.',
      },
      {
        title: 'LES HORAIRES',
        content:
          "- Lundi : 17h15 et 18h00\n\nL'ouverture d'un créneau horaire dépend du nombre d'inscrits sur ce créneau. Merci de nous indiquer plusieurs créneaux horaires lors de l'inscription afin de faciliter l'organisation du planning des cours.",
      },
    ],
  },
  {
    title: 'Basse',
    slug: 'basse',
    image: 'https://picsum.photos/1000?blur',
  },
  {
    title: 'Chant',
    slug: 'chant',
    image: 'https://picsum.photos/1000?greyscale',
  },
  {
    title: 'Clavier',
    slug: 'clavier',
    image:
      'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80',
  },
  {
    title: 'Jeu en groupe',
    slug: 'jeu-en-groupe',
    image:
      'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80',
  },
  {
    title: 'Danse Hip Hop',
    slug: 'danse-hip-hop',
    image:
      'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&q=80',
  },
  {
    title: 'Éveil Musical',
    slug: 'eveil-musical',
    image:
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80',
  },
  {
    title: 'Petits Rockers',
    slug: 'petits-rockers',
    image:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80',
  },
];
