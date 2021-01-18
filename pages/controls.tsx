/* Secret control panel
 */
import React from "react";

import { SiteHead, SitePageHeader } from "components/SiteChrome";
import {
  ScriptureFontOptions,
  ScriptureDropcapFontOptions,
  useAppSettings,
  UiRedButtonFontOptions,
} from "hooks/useAppSettings";
import { InternalLink } from "components/Links";

type FontSelectorTableRowProps = {
  label: string;
  fontValue: string;
  setFont: (newValue: string) => void;
  fontOptions: { [key: string]: string };
};
function FontSelectorTableRow({
  label,
  fontValue,
  setFont,
  fontOptions,
}: FontSelectorTableRowProps) {
  return (
    <div className="table-row">
      <label
        htmlFor="scripture-dropcap-font-selector"
        className="p-2 m-2 text-xs table-cell"
      >
        {label}
      </label>
      <select
        onChange={(event) => setFont(event.target.value)}
        value={fontValue}
        name={label}
        id="scripture-dropcap-font-selector"
        className="p-2 m-2 text-xs table-cell border"
      >
        {Object.keys(fontOptions).map((fontName) => (
          <option value={fontOptions[fontName]}>{fontName}</option>
        ))}
      </select>
    </div>
  );
}

export default function Controls() {
  const {
    scriptureFont,
    setScriptureFont,
    scriptureDropcapFont,
    setScriptureDropcapFont,
    uiRedButtonFont,
    setUiRedButtonFont,
  } = useAppSettings();

  return (
    <>
      <SiteHead title="biblemunger: provocative text replacement in famous literature" />
      <SitePageHeader />

      <main className="py-20 overflow-hidden min-h-screen max-w-xl mx-auto">
        This is a secret. <InternalLink href="/">Return to safety</InternalLink>
        <div className="mt-4 table">
          <FontSelectorTableRow
            label="Scripture font"
            fontValue={scriptureFont}
            setFont={setScriptureFont}
            fontOptions={ScriptureFontOptions}
          />

          <FontSelectorTableRow
            label="Scripture dropcap font"
            fontValue={scriptureDropcapFont}
            setFont={setScriptureDropcapFont}
            fontOptions={ScriptureDropcapFontOptions}
          />

          <FontSelectorTableRow
            label="Red button font"
            fontValue={uiRedButtonFont}
            setFont={setUiRedButtonFont}
            fontOptions={UiRedButtonFontOptions}
          />
        </div>
      </main>
    </>
  );
}
