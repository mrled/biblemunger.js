import sqlite3 from "sqlite3";
// import sqlite from "sqlite";
import { open } from "sqlite";

const DatabasePath = "database/kjv.sqlite";

export const KjvTableName = "kjv";

export async function OpenDatabase() {
  const db = await open({
    filename: DatabasePath,
    driver: sqlite3.Database,
  });
  return db;
}
