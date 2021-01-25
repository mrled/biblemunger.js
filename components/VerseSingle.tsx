import React from "react";

import { IVerse, vid } from "@mrled/biblemungerjs-kjv/verse";
import { sanitizeHtml } from "lib/all/Sanitize";
import { InternalLink } from "./Links";
import { useAppSettings } from "hooks/useAppSettings";

type VerseSingleProps = {
  verse: IVerse;
  search: string;
  replace: string;
  linkCitation?: boolean;
};

/* Verse citation
 */
function VerseCitation({
  verse,
  search,
  replace,
  linkCitation,
}: VerseSingleProps) {
  const mungeLink = `/munge/${search}/${replace}/${vid(verse)}`;
  if (linkCitation) {
    return (
      <InternalLink href={mungeLink}>
        <p className="italic text-lg pt-8 pb-2">
          &mdash; {verse.bookName} {verse.chapterNum}:{verse.verseNum}
        </p>
      </InternalLink>
    );
  } else {
    return (
      <p className="italic text-lg pt-8 pb-2">
        &mdash; {verse.bookName} {verse.chapterNum}:{verse.verseNum}
      </p>
    );
  }
}

/* A single verse component
 */
export function VerseSingle({
  verse,
  search,
  replace,
  linkCitation,
}: VerseSingleProps) {
  const { scriptureFont, scriptureDropcapFont } = useAppSettings();

  const mungedClasses = "munged text-redletter font-extrabold";
  const sanitizedReplace = sanitizeHtml(replace);

  const verseTextReplacedHtml = verse.verseText.replace(
    new RegExp(search, "g"),
    `<span class="${mungedClasses}"><strong>${sanitizedReplace}</strong></span>`
  );

  return (
    <div
      className={`${scriptureFont} border-double border-redletter border-l-6 pl-4 mb-8`}
    >
      <p
        className={`${scriptureDropcapFont} dropcap-spacing-large text-redletter-dropcap text-4xl leading-normal`}
        dangerouslySetInnerHTML={{ __html: verseTextReplacedHtml }}
      />
      <VerseCitation
        verse={verse}
        search={search}
        replace={replace}
        linkCitation={linkCitation}
      />
    </div>
  );
}
