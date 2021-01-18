import React from "react";
import { GetServerSideProps } from "next";

import { parseVid } from "lib/Verse";
import { lookupPassage, lookupVid } from "lib/BibleJson";
import { VersesList } from "components/Verse";

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
    <main className="p-2 overflow-hidden max-w-3xl border-l-6 border-double border-redletter mt-2pct mb-0 mx-auto">
      {" "}
      <p className="text-xl bold">
        {search} ⇒ {replace}
      </p>
      <p className="text-lg">
        In passage {fromVerseLabel} -- {toVerseLabel}
      </p>
      <VersesList verses={passage} search={search} replace={replace} />
    </main>
  );
}
