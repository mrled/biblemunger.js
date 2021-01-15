/* The 'Verse
 *
 * On verse database ID, vid/Verse ID, and verse key:
 *   The 'id' column in the database is the index, and is unique
 *   A 'vid' or 'Verse ID' is a string in the form 'bookNum-chapterNum-verseNum',
 *     which can uniquely idenfity a verse and is more human readable
 *   The 'key' is a React key
 */

export interface IVerse {
  // The ID in the database
  id: number;

  // The number of the book, e.g. Genesis is 1, Exodus is 2
  bookNum: number;

  // The chapter number
  chapterNum: number;

  // The verse number
  verseNum: number;

  // The string name of the book, e.g. "Genesis"
  bookName: string;

  // The string abbreviation of the book, e.g. "Gen"
  bookShortName: string;

  // The text of the verse, e.g. "Jesus wept"
  verseText: string;
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
