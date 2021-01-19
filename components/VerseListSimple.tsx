import React from "react";

import { IVerse, verseKey, vid } from "lib/Verse";
import { sanitizeHtml } from "lib/Sanitize";
import { InternalLink } from "./Links";
import { useAppSettings } from "hooks/useAppSettings";

type VerseRowProps = {
  verse: IVerse;
  search: string;
  replace: string;
};
export function VerseRowSimple({ verse, search, replace }: VerseRowProps) {
  const { scriptureFont } = useAppSettings();

  const mungedClasses = "munged text-redletter text-extrabold";
  const sanitizedReplace = sanitizeHtml(replace);
  const verseTextReplacedHtml = verse.verseText.replace(
    new RegExp(search, "g"),
    `<span class="${mungedClasses}">${sanitizedReplace}</span>`
  );

  return (
    <>
      <dt className={`${scriptureFont}`}>
        <InternalLink href={`/munge/${search}/${replace}/${vid(verse)}`}>
          {verse.bookName} {verse.chapterNum}:{verse.verseNum}
        </InternalLink>
      </dt>
      <dd
        className={`${scriptureFont}`}
        dangerouslySetInnerHTML={{ __html: verseTextReplacedHtml }}
      />
    </>
  );
}

type VersesListProps = {
  verses: IVerse[];
  search: string;
  replace: string;
};
export function VersesListSimple({ verses, search, replace }: VersesListProps) {
  const verseRows = verses.map((v) => (
    <VerseRowSimple
      key={verseKey(v)}
      verse={v}
      search={search}
      replace={replace}
    />
  ));
  return <dl className="grid grid-template-cols-10rem-auto">{verseRows}</dl>;
}
