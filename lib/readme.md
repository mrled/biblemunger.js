# lib/

Code in `lib/all` can be used on EITHER the server OR the client. Take care to only import functions that are available on both. Stuff that comes from `next` or `react` is fine, but stuff that comes from node modules like `fs` will cause compilation errors.

Code in `lib/server` can be used ONLY on the server. It is safe there to import node stuff like `fs`. However, make sure that files in this location are never imported on the client side e.g. in pages or components.
