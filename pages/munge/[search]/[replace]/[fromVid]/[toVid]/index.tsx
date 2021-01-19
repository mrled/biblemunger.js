import React from "react";
import { GetServerSideProps } from "next";

import { parseVid } from "lib/Verse";
import { lookupPassage, lookupVid } from "lib/BibleSqlite";
import { VersesListSimple } from "components/VerseListSimple";
import { SiteHead, SitePageHeader } from "components/SiteChrome";
import { ThisMunge } from "components/ThisMunge";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { search, replace, fromVid, toVid } = context.params;

  const fromVidTable = parseVid(fromVid as string);
  const toVidTable = parseVid(toVid as string);

  const fromVerse = await lookupVid(fromVidTable);
  const toVerse = await lookupVid(toVidTable);
  const passage = await lookupPassage(fromVerse, toVerse);

  console.log(
    `getServerSideProps() in /munge/${search}/${replace}/${fromVid}/${toVid}, got ${passage.length} results`
  );
  return {
    props: {
      search,
      replace,
      fromVerse,
      toVerse,
      passage,
    },
  };
};

export default function MungePassage({
  search,
  replace,
  fromVerse,
  toVerse,
  passage,
}) {
  const fromVerseLabel = `${fromVerse.bookName} ${fromVerse.chapterNum}:${fromVerse.verseNum}`;
  const toVerseLabel = `${toVerse.bookName} ${toVerse.chapterNum}:${toVerse.verseNum}`;
  return (
    <>
      <SiteHead
        title={`biblemunger: (${fromVerseLabel}&mdash;${toVerseLabel}) ${search} ⇒ ${replace}`}
      />
      <SitePageHeader />
      <main className="p-2 overflow-hidden max-w-3xl mt-2pct mb-0 mx-auto">
        <div className="text-lg my-8 text-center">
          <div>
            <ThisMunge search={search} replace={replace} />
          </div>
          <p>
            In passage {fromVerseLabel} &mdash; {toVerseLabel}
          </p>
        </div>
        <div className="border-l-6 border-double border-redletter pl-4 my-8">
          <VersesListSimple
            verses={passage}
            search={search}
            replace={replace}
          />
        </div>
      </main>
    </>
  );
}
