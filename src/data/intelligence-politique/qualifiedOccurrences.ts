/**
 * Occurrences qualifiées — référentiel manuel (26.07 - 07.08.2026).
 * Source de vérité unique : public/intelligence-politique/qualified-occurrences.json
 * (le même fichier alimente la plateforme statique Intelligence Politique).
 * Aucune valeur n'est dupliquée ni recalculée ici.
 */
import raw from "../../../public/intelligence-politique/qualified-occurrences.json";

export type QualifiedLang = "fr" | "en" | "ar";

export interface QualifiedActor {
  name: string;
  /** null = donnée non renseignée dans le référentiel (jamais convertie en zéro) */
  occurrences: number | null;
  color: string;
  initials?: string;
  image?: string;
  acronym?: boolean;
}

export interface QualifiedTopic {
  name: Record<QualifiedLang, string>;
  occurrences: number;
  color: string;
}

export interface QualifiedOccurrences {
  period: Record<QualifiedLang, string>;
  qualifiedMentions: number;
  maxParty: number;
  maxLeader: number;
  maxTopic: number;
  parties: QualifiedActor[];
  leaders: QualifiedActor[];
  topics: QualifiedTopic[];
  labels: Record<QualifiedLang, Record<string, string>>;
}

export const qualifiedOccurrences = raw as unknown as QualifiedOccurrences;

/** Tri décroissant, les valeurs non renseignées en fin de liste (ordre stable). */
export const sortByOccurrences = (rows: QualifiedActor[]): QualifiedActor[] =>
  [...rows].sort((a, b) => {
    if (a.occurrences == null && b.occurrences == null) return 0;
    if (a.occurrences == null) return 1;
    if (b.occurrences == null) return -1;
    return b.occurrences - a.occurrences;
  });

/** Intensité relative en % ; null si la donnée n'est pas renseignée. */
export const relativeIntensity = (value: number | null, max: number): number | null =>
  value == null ? null : (value / max) * 100;

export default qualifiedOccurrences;
