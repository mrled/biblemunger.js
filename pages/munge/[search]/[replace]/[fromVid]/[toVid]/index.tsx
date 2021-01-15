import React from "react";
import { GetServerSideProps } from "next";

import { parseVid } from "lib/Verse";
import { lookupPassage, lookupVid, OpenDatabase } from "lib/Database";
import { VersesList } from "components/Verse";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { search, replace, fromVid, toVid } = context.params;

  const fromVidTable = parseVid(fromVid as string);
  const toVidTable = parseVid(toVid as string);

  const db = await OpenDatabase();
  const fromVerse = await lookupVid(db, fromVidTable);
  const toVerse = await lookupVid(db, toVidTable);
  const passage = await lookupPassage(db, fromVerse, toVerse);

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
    <div>
      <p className="text-xl bold">
        {search} ⇒ {replace}
      </p>
      <p className="text-lg">
        In passage {fromVerseLabel} -- {toVerseLabel}
      </p>
      <VersesList verses={passage} search={search} replace={replace} />
    </div>
  );
}
