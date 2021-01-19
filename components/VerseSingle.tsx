import React from "react";

import { IVerse, verseKey, vid } from "lib/Verse";
import { sanitizeHtml } from "lib/Sanitize";
import { InternalLink } from "./Links";
import { useAppSettings } from "hooks/useAppSettings";

type VerseSingleProps = {
  verse: IVerse;
  search: string;
  replace: string;
};

/* A single verse component
 */
export function VerseSingle({ verse, search, replace }: VerseSingleProps) {
  const { scriptureFont, scriptureDropcapFont } = useAppSettings();

  const mungedClasses = "munged text-redletter";
  const sanitizedReplace = sanitizeHtml(replace);

  //   const verseTextReplacedHtml = verse.verseText.replace(
  //     new RegExp(search, "g"),
  //     `<strong>${sanitizedReplace}</strong>`
  //   );
  const verseTextReplacedHtml = verse.verseText.replace(
    new RegExp(search, "g"),
    `<span class="${mungedClasses}"><strong>${sanitizedReplace}</strong></span>`
  );

  // TODO: offer a version of this that links the citation to the /munge/search/replace/fromVid
  // This would be useful for the index page, which displays a random one.

  return (
    <div
      className={`${scriptureFont} border-double border-redletter border-l-6 pl-4 mb-8`}
    >
      <p
        className={`${scriptureDropcapFont} text-redletter-dropcap text-4xl leading-normal`}
        dangerouslySetInnerHTML={{ __html: verseTextReplacedHtml }}
      />
      <p className="italic text-lg pt-8 pb-2">
        &mdash; {verse.bookName} {verse.chapterNum}:{verse.verseNum}
      </p>
    </div>
  );
}
