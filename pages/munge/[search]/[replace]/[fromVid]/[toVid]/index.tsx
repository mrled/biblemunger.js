import React from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import useSWR from "swr";

import {
  IVerse,
  parseVid,
  socialPreviewVerseFromList,
  verseCitationString,
  vid,
} from "@mrled/biblemungerjs-kjv/verse";
import { concordanceBetween, lookupVid } from "@mrled/biblemungerjs-kjv";

import { VersesListSimple } from "components/VerseListSimple";
import { SiteHead, SitePageHeader } from "components/SiteChrome";
import { ThisMunge } from "components/ThisMunge";

// TODO: expose in the UI, and prevent too many results from causing problems. Require pagination?

type MungePassageServerSidePropsResult = {
  search: string;
  replace: string;
  fromVid: string;
  toVid: string;
  fromVerse: IVerse;
  toVerse: IVerse;
  uriPath: string;
  previewUriPath: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const search = context.params.search as string;
  const replace = context.params.replace as string;
  const fromVid = context.params.fromVid as string;
  const toVid = context.params.toVid as string;
  const fromVidTable = parseVid(fromVid);
  const toVidTable = parseVid(toVid);
  const fromVerse = await lookupVid(fromVidTable);
  const toVerse = await lookupVid(toVidTable);
  const uriPath = `/munge/${search}/${replace}`;
  const verses = await concordanceBetween(search, fromVidTable, toVidTable);
  const previewVerse = socialPreviewVerseFromList(verses);
  const previewVid = vid(previewVerse);
  const previewUriPath = `/munge/${search}/${replace}/${previewVid}`;

  const resultProps: MungePassageServerSidePropsResult = {
    search,
    replace,
    fromVid,
    toVid,
    fromVerse,
    toVerse,
    uriPath,
    previewUriPath,
  };
  return {
    props: resultProps,
  };
};

export default function MungePassage(
  ssProps: MungePassageServerSidePropsResult
) {
  const router = useRouter();
  const {
    search: routerSearch,
    replace: routerReplace,
    fromVid: routerFromVid,
    toVid: routerToVid,
  } = router.query;
  const {
    search: sspSearch,
    replace: sspReplace,
    fromVid: sspFromVid,
    toVid: sspToVid,
    fromVerse: sspFromVerse,
    toVerse: sspToVerse,
    uriPath,
    previewUriPath,
  } = ssProps;

  // router.query is null on first render,
  // but we can use the values from getServerSideProps
  const search = routerSearch ? (routerSearch as string) : sspSearch;
  const replace = routerReplace ? (routerReplace as string) : sspReplace;
  const fromVid = routerFromVid ? (routerFromVid as string) : sspFromVid;
  const toVid = routerToVid ? (routerToVid as string) : sspToVid;

  // Get actual verses from API
  // We do this via SWR, rather than in getServerSideProps,
  // because large search results take a long time to render on the server,
  // which is unpleasant for users and may time out.
  const { data: passage, error } = useSWR(`/api/passage/${fromVid}/${toVid}`);

  // If we have data from the SWR, use that, otherwise use data from getServerSideProps
  const fromVerse = passage ? passage[0] : sspFromVerse;
  const toVerse = passage ? passage[passage.length - 1] : sspToVerse;

  const fromVerseLabel = verseCitationString(fromVerse);
  const toVerseLabel = verseCitationString(toVerse);
  const headTitle = `biblemunger: (${fromVerseLabel}&mdash;${toVerseLabel}) ${search} ⇒ ${replace}`;

  let content: JSX.Element;
  if (error) {
    content = <div className="text-lg my-8 text-center">Error: {error}</div>;
  } else if (!passage || typeof passage === "undefined") {
    // TODO: use nicer loading spinner
    content = <div className="text-lg my-8 text-center">Loading...</div>;
  } else {
    content = (
      <>
        <div className="text-lg my-8 text-center">
          <div>
            <ThisMunge search={search} replace={replace} />
          </div>
          <p>
            In passage {fromVerseLabel} &mdash; {toVerseLabel}
          </p>
        </div>
        <div className="border-l-6 border-double border-redletter pl-4 my-8">
          <VersesListSimple
            verses={passage}
            search={search}
            replace={replace}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <SiteHead title={headTitle} urlPath={uriPath} preview={previewUriPath} />
      <SitePageHeader />
      <main className="p-2 overflow-hidden max-w-3xl mt-2pct mb-0 mx-auto"></main>
    </>
  );
}
