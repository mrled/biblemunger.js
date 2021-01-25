/* Functionality for generating preview images like og:image and twitter:image
 */
import { NextApiRequest, NextApiResponse } from "next";

import puppeteer from "puppeteer";
import chromium from "chrome-aws-lambda";

import { getAppUri } from "lib/server/appUri";

async function launchBrowser(
  puppeteerLaunchArgs: any
): Promise<puppeteer.Browser> {
  if (process.env.VERCEL_ENV) {
    console.log("Running on Vercel, will use chrome-aws-lambda");
    const browser = await puppeteer.launch({
      args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
      ...puppeteerLaunchArgs,
    });
    return browser;
  } else {
    console.log("Not running on Vercel, will use default Chrome");
    const browser = await puppeteer.launch();
    return browser;
  }
}

async function takeScreenshotOfUri(
  uri: string,
  width: number,
  height: number
): Promise<Buffer> {
  const browser = await launchBrowser({});
  const page = await browser.newPage();

  // This is scaled to fill up most of the image with the content
  // It was adjusted manually
  const scaleFactor = 1.5;

  page.setViewport({
    width: Math.floor(width / scaleFactor),
    height: Math.floor(height / scaleFactor),
    deviceScaleFactor: scaleFactor,
  });
  await page.goto(uri);
  const screenshot: Buffer = await page.screenshot();
  return screenshot;
}

export async function getScreenshot(
  uri: string,
  width: number,
  height: number
): Promise<Buffer | null> {
  try {
    const newScreenshot = await takeScreenshotOfUri(uri, width, height);
    return newScreenshot;
  } catch (err) {
    // TODO: default image is always openGraph dimensions, fixme
    console.error(`Encountered error ${err}, returning default image`);
    return null;
  }
}

/* A higher-order function that returns a preview image handler.
 * The handler can be used under /pages/api/preview/... to generate a social preview image.
 */
export function previewImageHandlerHof(image: Buffer) {
  const previewHandler = async (_req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader("Content-Type", "image/png");
    const oneYearInSeconds = 31536000; // Max allowed for s-maxage on Vercel
    res.setHeader(
      "Cache-Control",
      `s-maxage=${oneYearInSeconds}, immutable, public`
    );
    res.statusCode = 200;
    res.end(image);
  };
  return previewHandler;
}

export function previewImageHandlerFromReqHof(width: number, height: number) {
  const previewHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const search = req.query.search as string;
    const replace = req.query.replace as string;
    const vid = req.query.fromVid as string;

    const appUri = getAppUri();
    const uriToRender = `${appUri}/preview/munge/${search}/${replace}/${vid}`;
    const preview = await getScreenshot(uriToRender, width, height);

    res.setHeader("Content-Type", "image/png");
    const oneYearInSeconds = 31536000; // Max allowed for s-maxage on Vercel
    res.setHeader(
      "Cache-Control",
      `s-maxage=${oneYearInSeconds}, immutable, public`
    );
    res.statusCode = 200;
    res.end(preview);
  };
  return previewHandler;
}
