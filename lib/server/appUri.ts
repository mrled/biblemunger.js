/* What is the URI for the root of the app?
 * We maintain a mapping here, so that we can get the URI on the server side.
 */

export function getAppEnv(): AppEnvType {
  const vercelEnv = process.env.VERCEL_ENV;
  switch (vercelEnv) {
    case "production":
      return {
        uri: "https://biblemunger.micahrl.com",
        ogImageBase: "https://ogimage.micahrl.com",
        ogImageEnv: "production",
      };
    case "preview":
      return {
        uri: "biblemungerjs-wip.mrled.vercel.app",
        ogImageBase: "https://ogimage.micahrl.com",
        ogImageEnv: "preview",
      };
    case "development":
    //   return "deployed development URI";
    case "":
    //   return "local development URI"
    default:
      return {
        uri: "http://localhost:3000",
        ogImageBase: "http://localhost:2929",
        ogImageEnv: "local",
      };
  }
}

type AppEnvType = {
  uri: string;
  ogImageBase: string;
  ogImageEnv: string;
};
