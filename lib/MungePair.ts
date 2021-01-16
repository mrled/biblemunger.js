import { IVidTable } from "./Verse";

/* A search/replace pair
 */
export interface IMungePair {
  search: string;
  replace: string;
}

export interface IMungePairVerse {
  search: string;
  replace: string;
  verseId: IVidTable;
}
