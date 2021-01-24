/* What is the URI for the root of the app?
 * We maintain a mapping here, so that we can get the URI on the server side.
 */

export function getAppUri() {
  switch (process.env.VERCEL_ENV) {
    case "production":
      return "https://biblemunger.micahrl.com";
    case "preview":
    //   return "preview URI";
    case "development":
    //   return "deployed development URI";
    case "":
    //   return "local development URI"
    default:
      return "http://localhost:3000";
  }
}
