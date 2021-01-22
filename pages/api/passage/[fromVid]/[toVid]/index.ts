/* Search for any text
 */

import { lookupPassage, lookupVid } from "lib/BibleSqlite";
import { parseVid } from "lib/Verse";

// TODO: Add typing

export default async function handler(req, res) {
  const {
    query: { fromVid, toVid },
  } = req;
  const fromVidTable = parseVid(fromVid as string);
  const toVidTable = parseVid(toVid as string);

  const fromVerse = await lookupVid(fromVidTable);
  const toVerse = await lookupVid(toVidTable);
  const passage = await lookupPassage(fromVerse, toVerse);

  res.setHeader("Content-Type", "application/json");
  if (passage.length > 0) {
    res.statusCode = 200;
    res.end(JSON.stringify(passage));
  } else {
    res.statusCode = 404;
    res.end(
      JSON.stringify({ message: `No results for query ${fromVid} - ${toVid}` })
    );
  }
}
