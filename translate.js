#!/usr/bin/env node

"use strict";

const fs = require("fs");
const convert = require("xml-js");
const sqlite3 = require("sqlite3");
const { ArgumentParser } = require("argparse");

// const Database = require("./lib/Database");
// const kjvDb = "database/kjv.sqlite";

/* Create a sqlite database and insert all verses into it
 */
function createDb(verses, dbPath, versesTable) {
  const createTableStatement = `
CREATE TABLE ${versesTable} (
  id INTEGER PRIMARY KEY,
  bookNum INTEGER,
  chapterNum INTEGER,
  verseNum INTEGER,
  bookName TEXT,
  bookShortName TEXT,
  verseText TEXT
);
`;

  const insertStatement = `
INSERT INTO ${versesTable}(
  id,
  bookNum,
  chapterNum,
  verseNum,
  bookName,
  bookShortName,
  verseText
) VALUES (?, ?, ?, ?, ?, ?, ?);
`;

  const kjvVersesArr = verses.map((v) => [
    v.verseIdx,
    v.bookNum,
    v.chapterNum,
    v.verseNum,
    v.bookName,
    v.bookShortName,
    v.verseText,
  ]);

  var db = new sqlite3.Database(dbPath);
  db.serialize(() => {
    db.exec(`DROP TABLE IF EXISTS ${versesTable}`);
    db.exec(createTableStatement);
    const statement = db.prepare(insertStatement);
    for (var idx = 0; idx < kjvVersesArr.length; idx++) {
      statement.run(kjvVersesArr[idx]);
    }
    statement.finalize();
  });
  db.close();
}

/* Get an array of verses from the XML file
 */
function getVerses(xmlFile) {
  var xmlContents = fs.readFileSync(xmlFile);
  const rawXml = convert.xml2js(xmlContents);
  let versesResult = [];
  // console.log(JSON.stringify(rawXml, undefined, 2));
  const xmlbible = rawXml.elements.filter(
    (elem) => elem.name === "XMLBIBLE"
  )[0];
  //console.log(JSON.stringify(xmlbible, undefined, 2));
  const biblebook = xmlbible.elements.filter(
    (elem) => elem.name === "BIBLEBOOK"
  );
  //console.log(JSON.stringify(biblebook, undefined, 2));
  let verseIdx = 0;
  biblebook.forEach((bookElem) => {
    const bookName = bookElem.attributes.bname;
    const bookNum = bookElem.attributes.bnumber;
    const bookShortName = bookElem.attributes.bsname;

    const chapters = bookElem.elements.filter(
      (subElem) => subElem.name === "CHAPTER"
    );
    chapters.forEach((chapElem) => {
      const chapterNum = chapElem.attributes.cnumber;

      const verses = chapElem.elements.filter(
        (subElem) => subElem.name === "VERS"
      );
      verses.forEach((versElem) => {
        const verseNum = versElem.attributes.vnumber;
        const verseText = versElem.elements.filter(
          (subElem) => subElem.type === "text"
        )[0].text;

        // console.log(`${bookName} ${chapterNum}:${verseNum} -- ${verseText}`);

        versesResult.push({
          verseIdx,
          bookName,
          bookNum,
          bookShortName,
          chapterNum,
          verseNum,
          verseText,
        });

        verseIdx += 1;
      });
    });
  });

  // console.log(JSON.stringify(versesResult));

  return versesResult;
}

function xml2jsonAction(xmlPath, jsonPath) {
  // console.log(`xml2jsonAction(${xmlPath}, ${jsonPath})`);
  const kjvVerses = getVerses(xmlPath);
  // console.log(JSON.stringify(kjvVerses));
  fs.writeFileSync(jsonPath, JSON.stringify(kjvVerses, undefined, 2));
}

function xml2dbAction(xmlPath, dbPath, tableName, skipIfExists) {
  const kjvVerses = getVerses(xmlPath);
  if (skipIfExists && fs.accessSync(dbPath)) {
    console.log(`Database already exists at ${dbPath}, skipping...`);
  } else {
    createDb(kjvVerses, dbPath, tableName);
  }
}

function main() {
  const parser = new ArgumentParser({
    description: "Convert the Zefania Project XML KJV to other formats",
  });
  parser.add_argument("--kjvxml", {
    help: "The location of the Zefania XML KJV",
    required: true,
  });
  const subparsers = parser.add_subparsers({ required: true, dest: "action" });
  const xml2jsonParser = subparsers.add_parser("xml2json", {
    help: "Convert to a JSON file",
  });
  xml2jsonParser.add_argument("--jsonfile", {
    help: "Location of the JSON output file",
    required: true,
  });
  const xml2dbParser = subparsers.add_parser("xml2db", {
    help: "Convert to a sqlite database",
  });
  xml2dbParser.add_argument("--dbfile", {
    help: "Location of the sqlite output file",
    required: true,
  });
  xml2dbParser.add_argument("--skip-if-exists", {
    help: "Do not regenerate the database if --dbfile already exists",
  });
  xml2dbParser.add_argument("--tablename", {
    help:
      "The name for the database table (will be dropped if it already exists)",
    required: true,
  });
  const parsed = parser.parse_args();

  console.log("Parsed arguments:");
  console.dir(parsed);

  switch (parsed.action) {
    case "xml2json":
      xml2jsonAction(parsed.kjvxml, parsed.jsonfile);
      break;
    case "xml2db":
      xml2dbAction(
        parsed.kjvxml,
        parsed.dbfile,
        parsed.tablename,
        parsed.skip_if_exists
      );
      break;
    default:
      throw Error(`Unknown subcommand ${parsed.action}`);
      break;
  }
}

main();
