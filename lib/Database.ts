import sqlite3 from "sqlite3";
import sqlite from "sqlite";
import { open } from "sqlite";
import { IVerse, IVidTable } from "./Verse";

const DatabasePath = "database/kjv.sqlite";

export const KjvTableName = "kjv";

export async function OpenDatabase() {
  const db = await open({
    filename: DatabasePath,
    driver: sqlite3.Database,
  });
  return db;
}

/* Find all verses containing a string
 */
export async function concordance(
  db: sqlite.Database<sqlite3.Database, sqlite3.Statement>,
  textLike: string
): Promise<IVerse[]> {
  const result = await db.all<IVerse[]>(
    `SELECT id, bookNum, chapterNum, verseNum, bookName, bookShortName, verseText FROM ${KjvTableName} WHERE verseText LIKE ?`,
    textLike
  );
  console.log(`VerseTextLike(${textLike}) returned ${result.length} results`);
  return result;
}

/* Given a VidTable, return a single verse
 */
export async function lookupVid(
  db: sqlite.Database<sqlite3.Database, sqlite3.Statement>,
  vidTable: IVidTable
): Promise<IVerse> {
  const result = await db.get<IVerse>(
    `SELECT id, bookNum, chapterNum, verseNum, bookName, bookShortName, verseText FROM ${KjvTableName} WHERE bookNum = $bookNum AND chapterNum = $chapterNum AND verseNum = $verseNum`,
    {
      $bookNum: vidTable.bookNum,
      $chapterNum: vidTable.chapterNum,
      $verseNum: vidTable.verseNum,
    }
  );
  return result;
}

/* Return the whole passage between two verses, given two VidTables
 */
export async function lookupPassage(
  db: sqlite.Database<sqlite3.Database, sqlite3.Statement>,
  startVidTable: IVidTable,
  endVidTable: IVidTable
): Promise<IVerse[]> {
  const fromResult = await lookupVid(db, startVidTable);
  const toResult = await lookupVid(db, endVidTable);
  const passageResult = await db.all<IVerse[]>(
    `SELECT id, bookNum, chapterNum, verseNum, bookName, bookShortName, verseText FROM ${KjvTableName} WHERE id >= $fromId AND id <= $toId`,
    {
      $fromId: fromResult.id,
      $toId: toResult.id,
    }
  );
  return passageResult;
}
