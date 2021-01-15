import React from "react";
import { GetServerSideProps } from "next";

import { parseVid } from "lib/Verse";
import { lookupVid, OpenDatabase } from "lib/Database";
import { VersesList } from "components/Verse";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { search, replace, fromVid } = context.params;

  const vidTable = parseVid(fromVid as string);

  const db = await OpenDatabase();
  const verse = await lookupVid(db, vidTable);

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
    <div>
      <p className="text-xl bold">
        {search} ⇒ {replace}
      </p>
      <p className="text-lg">{verseLabel}</p>
      <VersesList verses={[verse]} search={search} replace={replace} />
    </div>
  );
}
