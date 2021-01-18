import { createContext, useEffect, useState } from "react";

import initSqlJs from "sql.js";

type TBibleContext = {
  // An in-memory database containing bible verses
  bibleDb: any;
};

const DefaultBibleContext: TBibleContext = {
  bibleDb: undefined,
};

export const BibleContext = createContext<TBibleContext>(DefaultBibleContext);

export function useBible(): TBibleContext {
  // We have to load sqljs asynchronously
  const [sqljs, setSqljs] = useState(undefined);

  // The downloaded data of the binary sqlite database
  // This was generated at build/deploy time and fetched asynchronously from the server
  const [fetchedBibleDb, setFetchedBibleDb] = useState(undefined);

  // The in-memory bible sqlite database
  // This is loaded into memory from fetchedBibleDb
  const [bibleDb, setBibleDb] = useState(undefined);

  // Fetch the binary sqlite database which was generated at build/deploy time
  useEffect(() => {
    fetch("/kjv.sqlite")
      .then((result) => setFetchedBibleDb(result))
      .catch((err) => console.error(`Error fetching Bible database: ${err}`));
  }, [setFetchedBibleDb]);

  // Load sqljs async
  useEffect(() => {
    initSqlJs()
      .then((loadedSqljs) => setSqljs(loadedSqljs))
      .catch((err) => console.error(`Error initializing sql.js: ${err}`));
  }, [setSqljs]);

  // Build the in-memory sqljs database from the fetched binary database
  useEffect(() => {
    if (typeof sqljs === "undefined") {
      return;
    }
    if (typeof fetchedBibleDb === "undefined") {
      return;
    }
    setBibleDb(new sqljs.Database(fetchedBibleDb));
  }, [fetchedBibleDb, setBibleDb, sqljs]);

  return {
    bibleDb,
  };
}
