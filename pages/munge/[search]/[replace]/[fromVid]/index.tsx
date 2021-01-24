import React from "react";
import { GetServerSideProps } from "next";

import { IVerse, parseVid } from "lib/all/Verse";
import { lookupVid } from "lib/server/BibleSqlite";
import { SiteHead, SitePageHeader } from "components/SiteChrome";
import { VerseSingle } from "components/VerseSingle";
import { ThisMungeWithExpandLink } from "components/ThisMunge";
import MungeYourOwn from "components/MungeYourOwnButton";

/* This is just a _single verse_, so we do a server side query for it
 */

type MungeSingleVerseServerSideProps = {
  search: string;
  replace: string;
  vid: string;
  verse: IVerse;
  previewUriPath: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const search = context.params.search as string;
  const replace = context.params.replace as string;
  const vid = context.params.fromVid as string;
  const vidTable = parseVid(vid);
  const verse = await lookupVid(vidTable);
  const previewUriPath = `/munge/${search}/${replace}/${vid}`;

  const resultProps: MungeSingleVerseServerSideProps = {
    search,
    replace,
    vid,
    verse,
    previewUriPath,
  };

  return {
    props: resultProps,
  };
};

export default function MungeSingleVerse({
  search,
  replace,
  vid,
  verse,
  previewUriPath,
}: MungeSingleVerseServerSideProps) {
  const urlPath = `/munge/${search}/${replace}/${vid}`;
  const verseLabel = `${verse.bookName} ${verse.chapterNum}:${verse.verseNum}`;
  console.log(`previewUriPath : ${previewUriPath}`);
  return (
    <>
      <SiteHead
        title={`biblemunger: (${verseLabel}) ${search} ⇒ ${replace}`}
        urlPath={urlPath}
        preview={previewUriPath}
      />
      <SitePageHeader />
      <main className="py-20 overflow-hidden min-h-screen max-w-xl mx-auto">
        <VerseSingle verse={verse} search={search} replace={replace} />
        <ThisMungeWithExpandLink search={search} replace={replace} />
        <MungeYourOwn />
      </main>
    </>
  );
}
