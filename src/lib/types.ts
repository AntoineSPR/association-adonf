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
  sections?: ConcertSection[];
  featured: boolean;
}
