import React from "react";
import Link from "next/link";
import Head from "next/head";

const defaultTitle = "biblemunger";
const defaultSiteDescription =
  "Provocative text replacement in famous literature";

type SiteHeadProps = {
  title?: string;
  description?: string;
};
export function SiteHead(props: SiteHeadProps) {
  const title = props.title || defaultTitle;
  const description = props.description || defaultSiteDescription;
  return (
    <Head>
      {/* Regular HTML stuff */}
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest"></link>

      {/* TODO: Add screenshot and Twitter image */}

      {/* OpenGraph stuff (Facebook) */}
      <meta name="og:title" property="og:title" content={title} />
      <meta
        name="og:description"
        property="og:description"
        content={description}
      />
      {/* TODO: Set OpenGraph URL automatically from Vercel environment variables
      https://vercel.com/docs/environment-variables */}
      {/* <meta property="og:url" content="https://biblemunger.micahrl.com" /> */}
      <meta property="og:image" content="/og_image_screenshot.png" />

      {/* Twitter stuff */}
      <meta name="twitter:site" content="@mrled" />
      <meta name="twitter:creator" content="@mrled" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {/*
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:image"
        content="https://keymap.click/android-chrome-512x512.png"
      />
      <meta name="twitter:image:width" content="512" />
      <meta name="twitter:image:height" content="512" />
      <meta
        name="twitter:image:alt"
        content="Cistercian numerals representing 1337"
      />
      */}
    </Head>
  );
}

export function SitePageHeader() {
  return (
    <header className="w-full p-2">
      <Link href="/">
        <a className="w-20 my-0 mx-auto block">
          <img className="" src="/biblemunger-logo-1-noword.svg" />
        </a>
      </Link>
    </header>
  );
}
