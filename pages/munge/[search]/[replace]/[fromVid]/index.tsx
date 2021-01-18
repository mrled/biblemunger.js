import React from "react";
import { GetServerSideProps } from "next";

import { parseVid } from "lib/Verse";
import { lookupVid } from "lib/BibleJson";
import { VersesList } from "components/Verse";

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
    <main className="p-2 overflow-hidden max-w-3xl border-l-6 border-double border-redletter mt-2pct mb-0 mx-auto">
      <p className="text-xl bold">
        {search} ⇒ {replace}
      </p>
      <p className="text-lg">{verseLabel}</p>
      <VersesList verses={[verse]} search={search} replace={replace} />
    </main>
  );
}
