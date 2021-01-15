import React from "react";
import { GetServerSideProps } from "next";

import { IVerse } from "lib/Verse";
import { OpenDatabase, concordance } from "lib/Database";
import { VersesList } from "components/Verse";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { search, replace } = context.params;
  const sqlQueryLike = `%${search}%`;
  const db = await OpenDatabase();
  const result = await concordance(db, sqlQueryLike);
  console.log(
    `getServerSideProps() in /munge/${search}/${replace}, got ${result.length} results`
  );
  return {
    props: {
      search,
      replace,
      verses: result,
    },
  };
};

export default function MungeBible({ search, replace, verses }) {
  return (
    <div>
      <p className="text-xl bold">
        {search} ⇒ {replace}
      </p>
      <VersesList verses={verses} search={search} replace={replace} />
    </div>
  );
}
