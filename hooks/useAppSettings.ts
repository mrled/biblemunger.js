import { useEffect } from "react";

import { useLocalStorage } from "hooks/useLocalStorage";

export const ScriptureFontOptions = {
  Eczar: "font-eczar",
  KJV1611: "font-kjv1611",
};
export const ScriptureDropcapFontOptions = {
  "Dearest Outline": "font-dearest-outline-dropcap",
  KJV1611: "font-kjv1611-dropcap",
};
export const UiRedButtonFontOptions = {
  Eczar: "font-eczar",
};

const ScriptureFontDefault = "font-eczar";
const ScriptureDropcapFontDefault = "font-dearest-outline-dropcap";
const UiRedButtonFontDefault = "font-eczar";

// export const ScriptureFontOptions = [
//   { label: "Eczar", value: "font-eczar" },
//   { label: "KJV1611", value: "font-kjv1611" },
// ];
// export const ScriptureDropcapFontOptions = [
//   { label: "Dearest Outline", value: "font-dearest-outline-dropcap" },
//   { label: "KJV1611", value: "font-kjv1611-dropcap" },
// ];

export function useAppSettings() {
  const [scriptureFont, setScriptureFont] = useLocalStorage(
    "ScriptureFont'",
    ScriptureFontDefault
  );
  const [scriptureDropcapFont, setScriptureDropcapFont] = useLocalStorage(
    "ScriptureDropcapFont",
    ScriptureDropcapFontDefault
  );
  const [uiRedButtonFont, setUiRedButtonFont] = useLocalStorage(
    "UiRedButtonFont",
    UiRedButtonFontDefault
  );

  return {
    scriptureFont,
    setScriptureFont,
    scriptureDropcapFont,
    setScriptureDropcapFont,
    uiRedButtonFont,
    setUiRedButtonFont,
  };
}
