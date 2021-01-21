import React from "react";
import { GetServerSideProps } from "next";

import { concordance } from "lib/BibleSqlite";
import { VersesList } from "components/VerseList";
import { SiteHead, SitePageHeader } from "components/SiteChrome";
import { ThisMunge } from "components/ThisMunge";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { search, replace } = context.params;
  const result = await concordance(search as string);
  const searchCompleteDate = new Date().toJSON();
  console.log(
    `[${searchCompleteDate}]' getServerSideProps() in /munge/${search}/${replace}, got ${result.length} results`
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
    <>
      <SiteHead title={`biblemunger: ${search} ⇒ ${replace}`} />
      <SitePageHeader />
      <main className="p-2 overflow-hidden max-w-2xl mt-2pct mb-0 mx-auto">
        <VersesList verses={verses} search={search} replace={replace} />
      </main>
    </>
  );
}
