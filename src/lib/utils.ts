import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function resolvePath(path: string) {
  if (!path) return path;
  if (path.startsWith('http')) return path;
  const base = import.meta.env.BASE_URL;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
}

export function isEmptyContent(content: any): boolean {
  if (!content) return true;
  if (Array.isArray(content) && content.length === 0) return true;
  if (typeof content === 'object') {
    const hasSections = content.sections && content.sections.length > 0;
    const hasHtml =
      content.contenuHtml &&
      content.contenuHtml.replace(/<[^>]*>/g, '').trim().length > 0;
    const descHtml = content.presentation?.descriptionHtml;
    const hasPresentation =
      descHtml &&
      descHtml.replace(/<[^>]*>/g, '').trim().length > 0 &&
      descHtml !== '<p>Contenu en cours de chargement...</p>';
    const hasPartenaires =
      content.partenaires && content.partenaires.length > 0;
    const hasCours = content.cours && content.cours.length > 0;
    const hasProjets = content.projets && content.projets.length > 0;
    const hasTarifs = content.tarifs && content.tarifs.length > 0;

    const hasRepetitionsData =
      content.presentationHtml ||
      content.reservationHtml ||
      (content.horaires && content.horaires.length > 0);

    if (
      hasSections ||
      hasHtml ||
      hasPresentation ||
      hasPartenaires ||
      hasCours ||
      hasProjets ||
      hasTarifs ||
      hasRepetitionsData
    ) {
      return false;
    }
    return true;
  }
  return false;
}
