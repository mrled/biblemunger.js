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

/* Given two objects which implement IVidTable
 * (which might be just a vid table, or might be a whole IVerse),
 * do they reference the same verse?
 */
export function referenceEq(verse1: IVidTable, verse2: IVidTable) {
  return (
    verse1.bookNum == verse2.bookNum &&
    verse1.chapterNum == verse2.chapterNum &&
    verse1.verseNum == verse2.verseNum
  );
}

/* Return a verse citation in nice format, e.g. "Genesis 1:1"
 */
export function verseCitationString(verse: IVerse) {
  return `${verse.bookName} ${verse.chapterNum}:${verse.verseNum}`;
}

/* Return a single verse from a list of verses to be used for the social preview.
 *
 * Social previews must be some reasonable size (not too long, not too short).
 *
 * The returned verse should be the same every time for the same list of verses.
 */
export function socialPreviewVerseFromList(verses: IVerse[]) {
  // This number happens to be a Wagstaff Prime, and I picked it because it was large and on wikipedia.
  const prime = 2932031007403;
  const verseIdx = (verses.length - 1) % prime;
  return verses[verseIdx];
}
