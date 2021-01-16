import React from "react";
import Head from "next/head";

import { InternalLink, ExternalLink } from "components/Links";

export default function About() {
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
        <title>About biblemunger</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-8">
        <h1 className="m-0 text-4xl">
          <InternalLink href="/">biblemunger</InternalLink>
        </h1>
        <p className="text-xs italic">
          provocative text replacement in famous literature
        </p>

        <h2 className="text-2xl py-4">What the fuck is this?</h2>
        <p className="my-2">
          biblemunger is a stupid thing that will replace arbitrary text in the
          Bible with other arbitrary text
        </p>
        <p className="my-2">
          It was inspired by{" "}
          <ExternalLink href="https://the-toast.net/series/bible-verses/">
            some of my favorite articles on The Toast
          </ExternalLink>
          , like{" "}
          <ExternalLink href="https://the-toast.net/2014/12/28/bible-verses-thou-shalt-not-replaced-can-u-not/">
            this one
          </ExternalLink>
          .
        </p>
        <p className="my-2">
          It uses an XML KJV from{" "}
          <ExternalLink href="https://sourceforge.net/projects/zefania-sharp/">
            the Zefania project
          </ExternalLink>
          , which probably would not appreciate this at all
        </p>
        <p className="my-2">
          <ExternalLink href="https://me.micahrl.com">mrled</ExternalLink> is
          responsible for this bullshit
        </p>
        <p className="my-2">
          <ExternalLink href="https://github.com/mrled/biblemunger.js">
            Contributions are welcome
          </ExternalLink>
        </p>

        <h2 className="text-2xl py-4">How the fuck do I use this?</h2>

        <p className="my-2">
          Note that it will even search/replace just a part of a word. For
          instance, in the{" "}
          <InternalLink href="/munge/servant/uber driver">
            "servant" ⇒ "uber driver"
          </InternalLink>{" "}
          search, note that some verses now refer to{" "}
          <span className="font-bold">
            menuber drivers and maiduber drivers
          </span>{" "}
          (from <span className="font-bold">menservants and maidservants</span>
          ).
        </p>
        <p className="my-2">
          However, it does search/replace numbers and punctuation, not just
          letters, so if the above behavior is undesirable, surround your search
          and your replacement with spaces. For example,{" "}
          <InternalLink href="/munge/servant/uber driver">
            "servant" ⇒ "uber driver"
          </InternalLink>{" "}
          will only find instances of "servant" when it's surrounded by spaces.
          (This also means that it will not find results of "servant" when
          followed by punctuation.)
        </p>
        <p className="my-2">
          One final thing to note: because it's so strict, it currently is case
          sensitive, such that{" "}
          <InternalLink href="/munge/LORD/kickstarter backer">
            LORD ⇒ kickstarter backer
          </InternalLink>{" "}
          will find completely different results than{" "}
          <InternalLink href="/munge/lord/kickstarter backer">
            lord ⇒ kickstarter backer
          </InternalLink>
          , which will find completely different results than{" "}
          <InternalLink href="/munge/Lord/kickstarter backer">
            Lord ⇒ kickstarter backer
          </InternalLink>
          . This means that, currently, an uncapitalized search term will never
          match a word that begins a sentence.
        </p>
      </main>
    </div>
  );
}
