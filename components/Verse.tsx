import React from "react";

import { IVerse, verseKey, vid } from "lib/Verse";
import { sanitizeHtml } from "lib/Sanitize";
import { InternalLink } from "./Links";

type VerseRowProps = {
  verse: IVerse;
  search: string;
  replace: string;
};
export function VerseRow({ verse, search, replace }: VerseRowProps) {
  const mungedClasses = "munged text-red-600";
  const sanitizedReplace = sanitizeHtml(replace);
  const verseTextReplacedHtml = verse.verseText.replace(
    new RegExp(search, "g"),
    `<span class="${mungedClasses}">${sanitizedReplace}</span>`
  );

  return (
    <>
      <InternalLink href={`/munge/${search}/${replace}/${vid(verse)}`}>
        <div className="">
          {verse.bookName} {verse.chapterNum}:{verse.verseNum}
        </div>
      </InternalLink>
      <div dangerouslySetInnerHTML={{ __html: verseTextReplacedHtml }} />
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
