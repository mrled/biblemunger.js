import React from "react";
import Link from "next/link";
import Head from "next/head";

import { getAppUri } from "lib/server/appUri";
import { previewImageDimensions } from "lib/all/previewImageDimensions";

const defaultTitle = "biblemunger";
const defaultSiteDescription =
  "Provocative text replacement in famous literature";

type SiteHeadProps = {
  // The path component of the URL, including leading slash, like /munge/wine/whiteclaws
  urlPath: string;

  /* If not passed, an empty string, or the string "default",
   * use the default social preview image URI.
   *
   * If this is the literal string "apiPreview",
   * use /api/preview/[openGraph,twitter] to the urlPath for the social preview image URI.
   *
   * If any other string, append that string to /api/preview[openGraph,twitter]
   * to find the social preview image URI.
   *
   * Note that OpenGraph can use relative values like "/image.png",
   * but Twitter requires absolute URIs like "http://example.com/image.png".
   * The <SiteHead> component will prepend the app root URI for Twitter images;
   * callers do not need to worry about this.
   */
  preview?: string;

  // Override default page title
  title?: string;

  // Override default page description
  description?: string;
};

/* The SiteHead component
 *
 * Take extra care to only pass things to this component that the server knows about on FIRST render.
 * E.g., you cannot pass values from the Next (client-side) router.query.ANYTHING to SiteHead,
 * because router.query is undefined when the server is rendering the initial page,
 * and only becomes defined once the client has loaded the page.
 */
export function SiteHead(props: SiteHeadProps) {
  const title = props.title || defaultTitle;
  const description = props.description || defaultSiteDescription;
  const appUri = getAppUri();
  const ogUrl = `${appUri}${props.urlPath}`;
  const twAccount = "@mrled";
  const twImageWidth = String(previewImageDimensions.twitterImage.width);
  const twImageHeight = String(previewImageDimensions.twitterImage.height);

  let ogImage: string;
  let twImage: string;
  switch (props.preview) {
    case undefined:
    case "":
    case "default":
      ogImage = `/defaultPreview_1200x628.png`;
      twImage = `${appUri}/defaultPreview_1200x675.png`;
      break;
    case "apiPreview":
      ogImage = `/api/preview/openGraph${props.urlPath}`;
      twImage = `${appUri}/api/preview/twitter${props.urlPath}`;
      break;
    default:
      ogImage = `/api/preview/openGraph${props.preview}`;
      twImage = `${appUri}/api/preview/twitter${props.preview}`;
  }

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

      {/* OpenGraph stuff (Facebook) */}
      <meta name="og:title" property="og:title" content={title} />
      <meta
        name="og:description"
        property="og:description"
        content={description}
      />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter stuff */}
      <meta name="twitter:site" content={twAccount} />
      <meta name="twitter:creator" content={twAccount} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={twImage} />
      <meta name="twitter:image:width" content={twImageWidth} />
      <meta name="twitter:image:height" content={twImageHeight} />
      <meta name="twitter:image:alt" content={description} />
    </Head>
  );
}

export function SitePageHeader() {
  return (
    <header className="w-full p-2">
      <div className="w-60 h-20 mx-auto flex">
        <Link href="/">
          <a className="w-20 my-0 mx-auto block flex">
            <img className="" src="/biblemunger-logo-1-noword.svg" />
          </a>
        </Link>
      </div>
    </header>
  );
}
