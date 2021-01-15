import React from "react";

import { IVerse, verseKey } from "lib/Verse";

type VerseRowProps = {
  verse: IVerse;
  search: string;
  replace: string;
};
export function VerseRow({ verse, search, replace }: VerseRowProps) {
  const verseTextReplaced = verse.verseText.replace(
    new RegExp(search, "g"),
    replace
  );

  return (
    <>
      <div className="">
        {verse.bookName} {verse.chapterNum}:{verse.verseNum}
      </div>
      <div>{verseTextReplaced}</div>
    </>
  );
}

type VersesListProps = {
  verses: IVerse[];
  search: string;
  replace: string;
};
export function VersesList({ verses, search, replace }: VersesListProps) {
  const verseRows = verses.map((v) => (
    <VerseRow key={verseKey(v)} verse={v} search={search} replace={replace} />
  ));
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "10rem auto",
      }}
    >
      {verseRows}
    </div>
  );
}
