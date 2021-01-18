/* The Bible in JSON format
 * TODO: this is not well optimized; I just adapter the SQL code to JSON. FIXME.
 *
 * For now, we keep the results as Promise objects, even though we don't need to.
 * This means the interface will work the same as database or other async fetching.
 */

import { IVerse, IVidTable, referenceEq } from "./Verse";

import Kjv from "database/kjv.json";

type TKjv = {
  verses: IVerse[];
};

/* Find all verses containing a string
 */
export async function concordance(textLike: string): Promise<IVerse[]> {
  const result = ((Kjv as unknown) as TKjv).verses.filter((v) =>
    v.verseText.includes(textLike)
  );
  return new Promise((resolve, _reject) => {
    resolve(result);
  });
}

/* Given a VidTable, return a single verse
 */
export async function lookupVid(vidTable: IVidTable): Promise<IVerse> {
  const result = ((Kjv as unknown) as TKjv).verses.filter((v) =>
    referenceEq(v, vidTable)
  );
  return new Promise((resolve, reject) => {
    if (result.length == 1) {
      resolve(result[0]);
    } else if (result.length < 1) {
      reject(`No results for VID ${JSON.stringify(vidTable)}`);
    } else {
      reject(`Multiple results for VID ${JSON.stringify(vidTable)} ??`);
    }
  });
}

/* Return the whole passage between two verses, given two VidTables
 */
export async function lookupPassage(
  startVidTable: IVidTable,
  endVidTable: IVidTable
): Promise<IVerse[]> {
  let foundStartVerse: boolean = false;
  let results: IVerse[] = [];
  ((Kjv as unknown) as TKjv).verses.every((verse) => {
    if (!foundStartVerse) {
      if (referenceEq(verse, startVidTable)) {
        foundStartVerse = true;
        results.push(verse);
        return true;
      } else {
        return true;
      }
    } else {
      results.push(verse);
      if (referenceEq(verse, endVidTable)) {
        return false; // Stop processing; like 'break' in the forEach loop of a normal language.
      } else {
        return true;
      }
    }
  });
  return new Promise((resolve, _reject) => {
    resolve(results);
  });
}
