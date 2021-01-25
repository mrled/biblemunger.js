import { IVidTable } from "@mrled/biblemungerjs-kjv/verse";

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
