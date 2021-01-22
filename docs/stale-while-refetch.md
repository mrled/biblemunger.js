# Stale While Refetch

On pages with many results, the database query is very fast (<1s) even for thousands of results. However, with `getServerSideProps()`, it would attempt to render on the server, and if this took longer than 10 seconds, Vercel would kill it and the user would get `502: BAD_GATEWAY Code: NO_RESPONSE_FROM_FUNCTION`.

To solve this, we can return NO data (or, if we wanted, we could return only a few results which would be fast to render), and implement the "stale while refresh" pattern, which has the client request more data from a backend API.

I implemented this for `munge/search/replace` and `munge/search/replace/fromVid/toVid`, and I hope that now they will return quickly when deployed to Vercel.

However, for `/` and `munge/search/replace/fromVid`, there will only ever be one verse rendered. I kept these using `getServerSideProps()`. This will have a small speed advantage, but more importantly, I would like to have these pages return a server-generated image for social media at some point, and that will require `getServerSideProps()` anyway.
