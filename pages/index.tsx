import React from "react";
import { GetServerSideProps } from "next";

import { FavoriteMungedVerses } from "lib/Favorites";
import { SiteHead, SitePageHeader } from "components/SiteChrome";
import { lookupVid } from "lib/BibleSqlite";
import { VerseSingle } from "components/VerseSingle";
import { ThisMungeWithExpandLink } from "components/ThisMunge";
import MungeYourOwn from "components/MungeYourOwnButton";

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const randomFavorite =
    FavoriteMungedVerses[
      Math.floor(Math.random() * FavoriteMungedVerses.length)
    ];
  const verse = await lookupVid(randomFavorite.verseId);

  return {
    props: {
      verse,
      search: randomFavorite.search,
      replace: randomFavorite.replace,
    },
  };
};

export default function Home({ verse, search, replace }) {
  return (
    <>
      <SiteHead title="biblemunger: provocative text replacement in famous literature" />
      <SitePageHeader />

      <main className="py-20 overflow-hidden min-h-screen max-w-xl mx-auto">
        <VerseSingle
          verse={verse}
          search={search}
          replace={replace}
          linkCitation={true}
        />
        <ThisMungeWithExpandLink search={search} replace={replace} />
        <MungeYourOwn />
      </main>
    </>
  );
}
