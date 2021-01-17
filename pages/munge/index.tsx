import React from "react";
import Head from "next/head";
import { FavoriteSearches } from "lib/Favorites";
import { MungeLinkList } from "components/MungeLink";
import Link from "next/link";
import MungeForm from "components/MungeForm";

export default function MungePage() {
  return (
    <div>
      <Head>
        <title>biblemunger</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="w-full p-2">
        <Link href="/">
          <a className="w-20 my-0 mx-auto block">
            <img className="" src="/biblemunger-logo-1-noword.svg" />
          </a>
        </Link>
      </header>

      <main className="p-2 overflow-hidden max-w-3xl mt-2pct mb-0 mx-auto">
        <MungeForm />

        <div>
          <p className="my-2">Suggestions:</p>
          <div className="text-xs my-2">
            <MungeLinkList pairs={FavoriteSearches} />
          </div>
        </div>
      </main>
    </div>
  );
}
