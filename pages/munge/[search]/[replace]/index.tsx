import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import { VersesList } from "components/VerseList";
import { SiteHead, SitePageHeader } from "components/SiteChrome";

export default function MungeBible() {
  const router = useRouter();
  const { search, replace } = router.query;

  // router.query is null on first render
  if (!search || !replace) {
    // TODO: use nicer loading spinner
    return null;
  }

  // Once the router has loaded, then we can do an SWR query of our API
  const { data: verses, error } = useSWR(`/api/concordance/${search}`);

  let content: JSX.Element;
  if (error) {
    content = <div>Error: {error}</div>;
  } else if (!verses || typeof verses === "undefined") {
    // TODO: use nicer loading spinner
    content = <p>Loading...</p>;
  } else {
    content = (
      <VersesList
        verses={verses}
        search={search as string}
        replace={replace as string}
      />
    );
  }

  return (
    <>
      <SiteHead title={`biblemunger: ${search} ⇒ ${replace}`} />
      <SitePageHeader />
      <main className="p-2 overflow-hidden max-w-2xl mt-2pct mb-0 mx-auto">
        {content}
      </main>
    </>
  );
}
