import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import { VersesListSimple } from "components/VerseListSimple";
import { SiteHead, SitePageHeader } from "components/SiteChrome";
import { ThisMunge } from "components/ThisMunge";
import { verseCitationString } from "lib/Verse";

// TODO: expose in the UI, and prevent too many results from causing problems. Require pagination?

export default function MungePassage() {
  const router = useRouter();
  const { search, replace, fromVid, toVid } = router.query;

  // router.query is null on first render
  if (!search || !replace || !fromVid || !toVid) {
    // TODO: use nicer loading spinner
    return null;
  }

  // Once the router has loaded, then we can do an SWR query of our API
  const { data: passage, error } = useSWR(`/api/passage/${fromVid}/${toVid}`);

  // TODO: clean up code duplication
  if (error) {
    return (
      <>
        <SiteHead title={`Error: ${error}`} />
        <SitePageHeader />
        <main className="p-2 overflow-hidden max-w-3xl mt-2pct mb-0 mx-auto">
          <div className="text-lg my-8 text-center">Error: {error}</div>
        </main>
      </>
    );
  } else if (!passage || typeof passage === "undefined") {
    // TODO: use nicer loading spinner
    return (
      <>
        <SiteHead title="biblemunger" />
        <SitePageHeader />
        <main className="p-2 overflow-hidden max-w-3xl mt-2pct mb-0 mx-auto">
          <div className="text-lg my-8 text-center">Loading...</div>
        </main>
      </>
    );
  }

  const fromVerseLabel = verseCitationString(passage[0]);
  const toVerseLabel = verseCitationString(passage[passage.length - 1]);

  const headTitle = `biblemunger: (${fromVerseLabel}&mdash;${toVerseLabel}) ${search} ⇒ ${replace}`;

  return (
    <>
      <SiteHead title={headTitle} />
      <SitePageHeader />
      <main className="p-2 overflow-hidden max-w-3xl mt-2pct mb-0 mx-auto">
        <div className="text-lg my-8 text-center">
          <div>
            <ThisMunge search={search as string} replace={replace as string} />
          </div>
          <p>
            In passage {fromVerseLabel} &mdash; {toVerseLabel}
          </p>
        </div>
        <div className="border-l-6 border-double border-redletter pl-4 my-8">
          <VersesListSimple
            verses={passage}
            search={search as string}
            replace={replace as string}
          />
        </div>
      </main>
    </>
  );
}
