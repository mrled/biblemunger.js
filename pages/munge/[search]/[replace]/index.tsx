import React from "react";
import { GetServerSideProps } from "next";

import { concordance } from "lib/BibleSqlite";
import { VersesList } from "components/Verse";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { search, replace } = context.params;
  const result = await concordance(search as string);
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
    <main className="p-2 overflow-hidden max-w-3xl border-l-6 border-double border-redletter mt-2pct mb-0 mx-auto">
      <p className="text-xl bold">
        {search} ⇒ {replace}
      </p>
      <VersesList verses={verses} search={search} replace={replace} />
    </main>
  );
}
