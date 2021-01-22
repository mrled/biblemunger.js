import { useEffect } from "react";
import { useRouter } from "next/router";
import * as Fathom from "fathom-client";

import "styles/tailwind.css";
import "styles/fonts.css";
import "styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    Fathom.load("KJZJABDT", {
      includedDomains: ["biblemunger.micahrl.com"],
    });
    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    router.events.on("routeChangeComplete", onRouteChangeComplete);
    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
