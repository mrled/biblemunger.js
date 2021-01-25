import React from "react";

import { IVerse, verseKey, vid } from "@mrled/biblemungerjs-kjv/verse";
import { sanitizeHtml } from "lib/all/Sanitize";
import { ThisMunge } from "./ThisMunge";
import { useAppSettings } from "hooks/useAppSettings";
import Link from "next/link";

type VerseRowProps = {
  verse: IVerse;
  search: string;
  replace: string;
};
export function VerseRow({ verse, search, replace }: VerseRowProps) {
  const { scriptureFont } = useAppSettings();

  // TODO: I like using text-redletter here, but it doesn't work well with hover-transition-bg-redletter ... can I make both work well together?
  // const mungedClasses = "munged text-redletter";
  const mungedClasses = "munged font-extrabold";
  const sanitizedReplace = sanitizeHtml(replace);
  const verseTextReplacedHtml = verse.verseText.replace(
    new RegExp(search, "g"),
    `<span class="${mungedClasses}">${sanitizedReplace}</span>`
  );
  const verseCitation = `${verse.bookName} ${verse.chapterNum}:${verse.verseNum}`;
  const singleVerseMungeUri = `/munge/${search}/${replace}/${vid(verse)}`;

  return (
    <Link href={singleVerseMungeUri}>
      <div
        className={`${scriptureFont} leading-normal border-b border-redletter mt-8 pt-2 pb-8 px-8 cursor-pointer hover-transition-bg-redletter`}
      >
        <dd
          className=" text-xl"
          dangerouslySetInnerHTML={{ __html: verseTextReplacedHtml }}
        />
        <dt className="text-base ">&mdash; {verseCitation}</dt>
      </div>
    </Link>
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
    <div className="border-double border-t-6 border-redletter pt-8">
      <div className="pt-4 pb-8 text-center">
        <p>
          <ThisMunge search={search} replace={replace} />
        </p>
      </div>
      <dl className="text-lg">{verseRows}</dl>
    </div>
  );
}
