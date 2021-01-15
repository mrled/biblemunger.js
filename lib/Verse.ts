/* The 'Verse
 */

export interface IVerse {
  bookNum: number;
  chapterNum: number;
  verseNum: number;
  bookName: string;
  bookShortName: string;
  verseText: string;
}

export function verseKey(verse: IVerse) {
  return `${verse.bookNum}-${verse.chapterNum}-${verse.verseNum}`;
}

export class Verse implements IVerse {
  public constructor(
    public bookNum: number,
    public chapterNum: number,
    public verseNum: number,
    public bookName: string,
    public bookShortName: string,
    public verseText: string
  ) {}

  public key() {
    return verseKey(this);
  }
}
