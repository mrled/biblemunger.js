import React from "react";
import { GetServerSideProps } from "next";

import { FavoriteMungedVerses } from "lib/all/Favorites";
import { SiteHead, SitePageHeader } from "components/SiteChrome";
import { lookupVid } from "lib/server/BibleSqlite";
import { VerseSingle } from "components/VerseSingle";
import { ThisMungeWithExpandLink } from "components/ThisMunge";
import MungeYourOwn from "components/MungeYourOwnButton";
import { InternalLink } from "components/Links";
import { useAppSettings } from "hooks/useAppSettings";

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
  const { scriptureFont, scriptureDropcapFont } = useAppSettings();
  return (
    <>
      <SiteHead
        title="biblemunger: provocative text replacement in famous literature"
        urlPath="/"
      />
      <SitePageHeader />

      <main className="py-20 overflow-hidden min-h-screen max-w-xl mx-auto">
        <div className="pb-20 border-b border-redletter">
          <VerseSingle
            verse={verse}
            search={search}
            replace={replace}
            linkCitation={true}
          />
          <ThisMungeWithExpandLink search={search} replace={replace} />
          <MungeYourOwn />
        </div>
        <div className="py-20">
          <InternalLink href="/wtf">
            <p
              className={`${scriptureFont} ${scriptureDropcapFont} dropcap-spacing-regular`}
            >
              What is this?
            </p>
          </InternalLink>
        </div>
      </main>
    </>
  );
}
