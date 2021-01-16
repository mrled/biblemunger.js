import React from "react";
import Head from "next/head";
import Munge from "components/Munge";
import { InternalLink } from "components/Links";
import { FavoriteSearches } from "lib/Favorites";
import { MungeLinkList } from "components/MungeLink";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "0 flex0.5rem",
        display: "",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Head>
        <title>biblemunger</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        style={{
          padding: "5rem 0",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 className="m-0 text-4xl">biblemunger</h1>
        <p className="text-xs italic">
          provocative text replacement in famous literature
        </p>

        <div className="m-4">
          <InternalLink href="/about">wtf?</InternalLink>
        </div>

        <Munge />

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
