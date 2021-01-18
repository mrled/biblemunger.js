/* Secret control panel
 */
import React from "react";

import { SiteHead, SitePageHeader } from "components/SiteChrome";
import {
  ScriptureFontOptions,
  ScriptureDropcapFontOptions,
  useAppSettings,
} from "hooks/useAppSettings";
import { InternalLink } from "components/Links";

export default function Controls() {
  const {
    scriptureFont,
    setScriptureFont,
    scriptureDropcapFont,
    setScriptureDropcapFont,
  } = useAppSettings();

  return (
    <>
      <SiteHead title="biblemunger: provocative text replacement in famous literature" />
      <SitePageHeader />

      <main className="py-20 overflow-hidden min-h-screen max-w-xl mx-auto">
        This is a secret. <InternalLink href="/">Return to safety</InternalLink>
        <div className="mt-4 table">
          <div className="table-row">
            <label
              htmlFor="scripture-font-selector"
              className="p-2 m-2 text-xs table-cell"
            >
              Scripture font
            </label>
            <select
              onChange={(event) => setScriptureFont(event.target.value)}
              value={scriptureFont}
              name="Scripture font"
              id="scripture-font-selector"
              className="p-2 m-2 text-xs table-cell border"
            >
              {Object.keys(ScriptureFontOptions).map((fontName) => (
                <option value={ScriptureFontOptions[fontName]}>
                  {fontName}
                </option>
              ))}
            </select>
          </div>

          <div className="table-row">
            <label
              htmlFor="scripture-dropcap-font-selector"
              className="p-2 m-2 text-xs table-cell"
            >
              Dropcap font
            </label>
            <select
              onChange={(event) => setScriptureDropcapFont(event.target.value)}
              value={scriptureDropcapFont}
              name="Scripture font"
              id="scripture-dropcap-font-selector"
              className="p-2 m-2 text-xs table-cell border"
            >
              {Object.keys(ScriptureDropcapFontOptions).map((fontName) => (
                <option value={ScriptureDropcapFontOptions[fontName]}>
                  {fontName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </main>
    </>
  );
}
