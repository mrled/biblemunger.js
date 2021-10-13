This is a rewrite of
[my old Python biblemunger project](https://github.com/mrled/biblemunger).

<https://biblemunger.micahrl.com>

## Development

First, run the development server:

```bash
npm run dev
```

Open <http://localhost:24253> with your browser to see the result.

## Deployment

This will deploy automatically on pushes to the master branch.

## Prerequisites

- The biblemungerjs-kjv package ([GitHub](https://github.com/mrled/biblemungerjs-kjv), [NPM](https://www.npmjs.com/package/@mrled/biblemungerjs-kjv))
- [ogimage](https://github.com/mrled/ogimage) deployed to <https://ogimage.micahrl.com> (see `lib/all/appUri.ts`)

## Thanks

- My wonderful friend Ben, for design help
- Daniel M. Lavery, formerly of [The Toast](https://the-toast.net/series/bible-verses/), for providing the inspiration
- [The Zefania Project](https://sourceforge.net/projects/zefania-sharp/), which probably does not appreciate this at all
- [kjv1611 font from Fredrick Brennan](https://github.com/ctrlcctrlv/kjv1611), OFL licensed
- [Dearest Outline font from West Wind Fonts](http://moorstation.org/typoasis/designers/westwind/), no license provided
- [Eczar font from Rosetta](https://fonts.google.com/specimen/Eczar), OFL licensed
