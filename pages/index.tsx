import React from "react";
import Head from "next/head";
import Link from "next/link";

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

        <div>
          <p>Suggestions:</p>
          <Link href="/munge/Aaron/Shrek">
            <a>Aaron ⇒ Shrek</a>
          </Link>
        </div>
      </main>
    </div>
  );
}
