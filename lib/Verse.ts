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

/* A Verse ID table
 * Splits the components of a verse ID into three named properties
 */
export interface IVidTable {
  bookNum: number;
  chapterNum: number;
  verseNum: number;
}

/* Given a vid of the form 1-1-1, return an IVidTable
 */
export function parseVid(vid: string): IVidTable {
  const [bookNum, chapterNum, verseNum] = vid.split("-");
  return {
    bookNum: Number(bookNum),
    chapterNum: Number(chapterNum),
    verseNum: Number(verseNum),
  };
}

/* Given a verse, return a Verse ID string of the form 1-1-1
 */
export function vid(verse: IVerse): string {
  return `${verse.bookNum}-${verse.chapterNum}-${verse.verseNum}`;
}

/* Given a verse, return a React key that can be used to uniquely identify it in a list of verses
 */
export function verseKey(verse: IVerse): string {
  return vid(verse);
}
