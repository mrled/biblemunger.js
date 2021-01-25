/* What is the URI for the root of the app?
 * We maintain a mapping here, so that we can get the URI on the server side.
 */

export function getAppUri() {
  const vercelEnv = process.env.VERCEL_ENV;
  switch (vercelEnv) {
    case "production":
      return "https://biblemunger.micahrl.com";
    case "preview":
      return "biblemungerjs-wip.mrled.vercel.app";
    case "development":
    //   return "deployed development URI";
    case "":
    //   return "local development URI"
    default:
      return "http://localhost:3000";
  }
}
