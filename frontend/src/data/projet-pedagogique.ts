export interface ProjectSection {
  title: string;
  content: string;
}

export interface Project {
  slug: string;
  title: string;
  image: string;
  description: string; // Description for the card/list
  introduction: string; // Detail page intro
  sections: ProjectSection[];
}

export const projects: Project[] = [
  {
    title: 'Eveil Musical',
    slug: 'eveil-musical',
    image:
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80',
    description:
      'Découverte sensorielle et ludique de la musique pour les tout-petits.',
    introduction:
      "L'éveil musical permet aux jeunes enfants de s'initier au monde sonore par le jeu, l'écoute et la manipulation d'instruments adaptés.",
    sections: [
      {
        title: 'Objectifs Pédagogiques',
        content:
          "Développer l'oreille musicale, le sens du rythme et la coordination motrice. Favoriser l'expression corporelle et la socialisation.",
      },
      {
        title: 'Déroulement des séances',
        content:
          'Comptines, jeux de doigts, écoute active, découverte des instruments (percussions, instruments mélodiques simples).',
      },
    ],
  },
  {
    title: 'Interventions en Milieu Scolaire',
    slug: 'interventions-scolaires',
    image: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=800',
    description:
      'Des projets musicaux construits en partenariat avec les écoles primaires et collèges.',
    introduction:
      'Nos intervenants musiciens se déplacent dans les établissements scolaires pour animer des ateliers et monter des projets artistiques.',
    sections: [
      {
        title: "Types d'interventions",
        content:
          "Chorale, percussions corporelles, création de chansons, découverte de l'histoire du rock, ateliers d'écriture.",
      },
      {
        title: 'Partenariat Éducation Nationale',
        content:
          'Tous nos projets sont élaborés en concertation avec les équipes enseignantes et respectent les objectifs du socle commun de connaissances et de compétences.',
      },
    ],
  },
  {
    title: 'Pratiques Collectives',
    slug: 'pratiques-collectives',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800',
    description: 'Jouer en groupe : le cœur de notre projet associatif.',
    introduction:
      'La musique est avant tout un langage qui se partage. Nous encourageons nos élèves à jouer ensemble le plus tôt possible.',
    sections: [
      {
        title: 'Ateliers Rock / Pop / Funk',
        content:
          'Constitution de groupes par niveau et affinités. Travail de reprises, arrangement, présence scénique.',
      },
      {
        title: "Concerts d'élèves",
        content:
          'Plusieurs fois par an, les groupes se produisent sur la scène de la Rock School Barbey dans des conditions professionnelles.',
      },
    ],
  },
  {
    title: 'Action Culturelle et Sociale',
    slug: 'action-culturelle',
    image: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=800',
    description:
      'La musique comme vecteur de lien social dans les quartiers prioritaires.',
    introduction:
      'Nous menons des actions de médiation culturelle pour rendre la pratique musicale accessible à tous les publics.',
    sections: [
      {
        title: 'Projets de quartier',
        content:
          'Ateliers de rue, scènes ouvertes, projets intergénérationnels en partenariat avec les centres sociaux.',
      },
      {
        title: 'Publics spécifiques',
        content:
          "Interventions en milieu carcéral, hôpitaux, structures d'accueil pour personnes en situation de handicap.",
      },
    ],
  },
];
