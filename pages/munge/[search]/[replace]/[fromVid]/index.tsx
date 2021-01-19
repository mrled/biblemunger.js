import React from "react";
import { GetServerSideProps } from "next";

import { parseVid } from "lib/Verse";
import { lookupVid } from "lib/BibleSqlite";
import { SiteHead, SitePageHeader } from "components/SiteChrome";
import { VerseSingle } from "components/VerseSingle";
import { ThisMungeWithExpandLink } from "components/ThisMunge";
import MungeYourOwn from "components/MungeYourOwnButton";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { search, replace, fromVid } = context.params;

  const vidTable = parseVid(fromVid as string);

  const verse = await lookupVid(vidTable);

  return {
    props: {
      search,
      replace,
      verse,
    },
  };
};

export default function MungeSingleVerse({ search, replace, verse }) {
  const verseLabel = `${verse.bookName} ${verse.chapterNum}:${verse.verseNum}`;
  return (
    <>
      <SiteHead title={`biblemunger: (${verseLabel}) ${search} ⇒ ${replace}`} />
      <SitePageHeader />
      <main className="py-20 overflow-hidden min-h-screen max-w-xl mx-auto">
        <VerseSingle verse={verse} search={search} replace={replace} />
        <ThisMungeWithExpandLink search={search} replace={replace} />
        <MungeYourOwn />
      </main>
    </>
  );
}
