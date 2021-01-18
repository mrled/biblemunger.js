# Storage

Dealing with the whole Bible is difficult. The XML source I have is 5MB, and the sqlite database is about that size, and the JSON database is almost twice that size.

## Experiments 20210117

sqlite searches that are designed more or less the way the old biblemunger app worked are quite fast locally. In my testing, large (but not pathological) searches load more or less instantly, maybe very large ones take a second or so. (Pathological searches would be like single-letter munges; these are slow and the browser handles them poorly.) However, even tiny searches are quite slow when deployed to Vercel. _Very_ slow, actually - like 8-9 seconds to load a munge result page. That's bad enough that I need to fix it.

### JSON database experiment

I wrote a JSON database to test against. It is not optimized, as it is mostly pattered after the sqlite design, and could use improvement. However, some initial results are instructive. All of the following results are run on my local machine, and compared with the sqlite way of running on my local machine.

- Much slower for search/replace/fromVid/toVid, like 9+ seconds
- A bit slower for whole-bible search/replace, like 4-5 seconds
- Perfectly fine for single-verse search/replace/fromVid, more or less instant

I could optimize the much slower search/replace/fromvid/tovid case with a lookup table for vids->verse indeces, or perhaps by redesigning the whole app to use verse indeces exclusively and deprecating vids.

However, the text replacement time for whole-bible search/replace is probably not fixable, and it's still pretty bad. Using JavaScript to search through every verse for the search term is just slower than using sql.

### sql.js experiment

I spent some time trying to use sql.js for _client-side_ sqlite searches, but without any luck.

Whenever I ran `initSqlJs` I would get an error about not being able to find the `fs` module -- even when running e.g. `next build` which compiles the project using Node, which has an `fs` module.

It is very unclear how sql.js is supposed to work with React:

- <https://github.com/vercel/next.js/issues/9454> ??
- <https://github.com/sql-js/react-sqljs-demo> is the official React docs (??) and I have no idea what I'm supposed to do here

Going to give up on this for now.
