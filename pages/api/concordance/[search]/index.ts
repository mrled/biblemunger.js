/* Search for any text
 */

import { concordance } from "lib/server/BibleSqlite";

// TODO: Add typing

export default async function handler(req, res) {
  const {
    query: { search },
  } = req;
  const result = await concordance(search as string);
  res.setHeader("Content-Type", "application/json");
  if (result.length > 0) {
    res.statusCode = 200;
    res.end(JSON.stringify(result));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: `No results for query ${search}` }));
  }
}
