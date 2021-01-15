/* Strip any HTML from a string
 *
 * https://stackoverflow.com/questions/822452/strip-html-from-text-javascript
 */
export function sanitizeHtml(str: string): string {
  const tmpElement = document.createElement("div");
  tmpElement.innerHTML = str;
  return tmpElement.textContent || tmpElement.innerText || "";
}
