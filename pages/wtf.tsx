import React from "react";

import { InternalLink, ExternalLink } from "components/Links";
import { SiteHead, SitePageHeader } from "components/SiteChrome";
import MungeYourOwn from "components/MungeYourOwnButton";

export default function About() {
  return (
    <>
      <SiteHead title="About biblemunger" urlPath="/wtf" />
      <SitePageHeader />

      <main className="py-20 overflow-hidden min-h-screen max-w-xl mx-auto font-eczar">
        <div className="text-center mb-12">
          <h1 className="m-0 text-4xl font-kjv1611">
            <InternalLink href="/">biblemunger</InternalLink>
          </h1>
          <p className="text-xs italic">
            provocative text replacement in famous literature
          </p>
        </div>

        <h2 className="text-2xl py-4">What is this?</h2>
        <p className="my-2">
          <span className="font-kjv1611">biblemunger</span> is a stupid thing
          that will replace arbitrary text in the Bible with other arbitrary
          text. It is, as they say, good clean fun!
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
          It's easy to use, simply{" "}
          <span className="mx-4">
            <MungeYourOwn />
          </span>
        </p>

        <h2 className="text-2xl py-4">What else should I know about it?</h2>
        <p className="my-2">
          Note that it will even search/replace just a part of a word. For
          instance, in the{" "}
          <InternalLink href="/munge/servant/uber driver/">
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

        <h2 className="text-2xl py-4">Credits</h2>
        <p className="my-2">
          <span className="font-kjv1611">biblemunger</span> was written by{" "}
          <ExternalLink href="https://me.micahrl.com">Micah</ExternalLink>.
        </p>
        <p className="my-2">
          <ul className="list-disc pl-8">
            <li>
              Site design thanks to my wonderful friend{" "}
              <ExternalLink href="http://benjamingodwin.com/">
                Benjamin Godwin
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://github.com/ctrlcctrlv/kjv1611">
                KJV1611 font
              </ExternalLink>{" "}
              thanks to{" "}
              <ExternalLink href="https://twitter.com/fr_brennan">
                Fredrick Brennan
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://fonts.google.com/specimen/Eczar">
                Eczar font
              </ExternalLink>{" "}
              thanks to{" "}
              <ExternalLink href="https://www.rosettatype.com/">
                Rosetta
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://www.dafont.com/dearest.font">
                Dearest Outline font
              </ExternalLink>{" "}
              thanks to{" "}
              <ExternalLink href="http://moorstation.org/typoasis/designers/westwind/">
                West Wind Fonts
              </ExternalLink>
            </li>
            <li>
              XML KJV thanks to{" "}
              <ExternalLink href="https://sourceforge.net/projects/zefania-sharp/">
                the Zefania project
              </ExternalLink>
              , which probably would not appreciate this at all
            </li>
          </ul>
        </p>
        <p className="my-2">
          <ExternalLink href="https://github.com/mrled/biblemunger.js">
            Contributions are welcome
          </ExternalLink>
        </p>
      </main>
    </>
  );
}
