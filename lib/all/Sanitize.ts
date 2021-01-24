/* HTML sanitization
 */

/* Strip any HTML from a string
 *
 * https://stackoverflow.com/questions/822452/strip-html-from-text-javascript
 */
export function sanitizeHtml(str: string): string {
  let doc;
  if (typeof window === "undefined") {
    // On the server, there is no 'window' or 'document', so we have to use a virtual DOM
    const jsdom = require("jsdom");
    const dom = new jsdom.JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
    doc = dom.window.document;
  } else {
    // In the browser, we just use the real DOM
    doc = document;
  }
  const tmpElement = doc.createElement("div");
  tmpElement.innerHTML = str;
  return tmpElement.textContent || tmpElement.innerText || "";
}
