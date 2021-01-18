/* A "Munge Your Own Verse" button
 */

import { useAppSettings } from "hooks/useAppSettings";
import Link from "next/link";
import React from "react";

export default function MungeYourOwn() {
  const { uiRedButtonFont } = useAppSettings();
  return (
    <Link href="/munge">
      <a>
        <button
          className={`${uiRedButtonFont} text-white bg-redletter text-lg uppercase px-8 py-1 tracking-widest rounded-br-2xl`}
        >
          Munge your own verse
        </button>
      </a>
    </Link>
  );
}
