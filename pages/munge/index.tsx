import React from "react";
import { FavoriteSearches } from "lib/all/Favorites";
import { MungeLinkList } from "components/MungeLink";
import MungeForm from "components/MungeForm";
import { SiteHead, SitePageHeader } from "components/SiteChrome";

export default function MungePage() {
  return (
    <>
      <SiteHead title="biblemunger" urlPath="/munge" />

      <SitePageHeader />

      <main className="p-2 overflow-hidden max-w-3xl mt-2pct mb-0 mx-auto">
        <MungeForm />

        <div>
          <p className="my-2">Suggestions:</p>
          <div className="text-xs my-2">
            <MungeLinkList pairs={FavoriteSearches} />
          </div>
        </div>
      </main>
    </>
  );
}
