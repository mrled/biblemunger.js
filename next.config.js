const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  async redirects() {
    return [
      {
        source: "/",
        has: [
          {
            type: "query",
            key: "search",
            value: "(?<search>.*)", // Named capture group to match anything on the value
          },
          {
            type: "query",
            key: "replace",
            value: "(?<replace>.*)", // Named capture group to match anything on the value
          },
        ],
        permanent: true,
        destination: "/munge/:search/:replace",
      },
    ];
  },
});
