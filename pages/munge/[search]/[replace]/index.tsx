import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import { concordance } from "@mrled/biblemungerjs-kjv";
import {
  socialPreviewVerseFromList,
  vid,
} from "@mrled/biblemungerjs-kjv/verse";

import { VersesList } from "components/VerseList";
import { SiteHead, SitePageHeader } from "components/SiteChrome";
import { GetServerSideProps } from "next";

type MungeBibleServerSidePropsResult = {
  search: string;
  replace: string;
  uriPath: string;
  previewUriPath: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const search = context.params.search as string;
  const replace = context.params.replace as string;
  const uriPath = `/munge/${search}/${replace}`;
  const verses = await concordance(search);
  const previewVerse = socialPreviewVerseFromList(verses);
  const previewVid = vid(previewVerse);
  const previewUriPath = `/munge/${search}/${replace}/${previewVid}`;

  const resultProps: MungeBibleServerSidePropsResult = {
    search,
    replace,
    uriPath,
    previewUriPath,
  };
  return {
    props: resultProps,
  };
};

export default function MungeBible(ssProps: MungeBibleServerSidePropsResult) {
  const router = useRouter();
  const {
    search: sspSearch,
    replace: sspReplace,
    uriPath,
    previewUriPath,
  } = ssProps;
  const { search: routerSearch, replace: routerReplace } = router.query;

  // router.query is null on first render,
  // but we can use the search/replace values from getServerSideProps
  const search = routerSearch ? (routerSearch as string) : sspSearch;
  const replace = routerReplace ? (routerReplace as string) : sspReplace;

  // Get actual verses from API
  // We do this via SWR, rather than in getServerSideProps,
  // because large search results take a long time to render on the server,
  // which is unpleasant for users and may time out.
  const { data: verses, error } = useSWR(`/api/concordance/${search}`);

  let content: JSX.Element;
  if (error) {
    content = <div>Error: {error}</div>;
  } else if (!verses || typeof verses === "undefined") {
    // TODO: use nicer loading spinner
    content = <p>Loading...</p>;
  } else {
    content = <VersesList verses={verses} search={search} replace={replace} />;
  }

  return (
    <>
      <SiteHead
        title={`biblemunger: ${search} ⇒ ${replace}`}
        urlPath={uriPath}
        preview={previewUriPath}
      />
      <SitePageHeader />
      <main className="p-2 overflow-hidden max-w-2xl mt-2pct mb-0 mx-auto">
        {content}
      </main>
    </>
  );
}
