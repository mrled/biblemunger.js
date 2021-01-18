/* A "Munge Your Own Verse" button
 */

import Link from "next/link";
import React from "react";

export default function MungeYourOwn() {
  return (
    <Link href="/munge">
      <a>
        <button className="text-white bg-redletter font-eczar text-lg uppercase px-8 py-1 tracking-widest rounded-br-2xl">
          Munge your own verse
        </button>
      </a>
    </Link>
  );
}
