/* A preview for generating screenshots from the API
 */

import React from "react";
import { GetServerSideProps } from "next";

import { parseVid } from "@mrled/biblemungerjs-kjv/verse";
import { lookupVid } from "@mrled/biblemungerjs-kjv";

import { VerseSingle } from "components/VerseSingle";
import { ThisMunge } from "components/ThisMunge";

/* This is just a _single verse_, so we do a server side query for it
 */

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { search, replace, fromVid } = context.params;

  const vidTable = parseVid(fromVid as string);

  const verse = await lookupVid(vidTable);

  return {
    props: {
      search,
      replace,
      verse,
    },
  };
};

export default function PreviewSingleVerse({ search, replace, verse }) {
  return (
    <div className="m-8">
      <div className="pb-8">
        <ThisMunge search={search} replace={replace} />
      </div>
      <VerseSingle verse={verse} search={search} replace={replace} />
    </div>
  );
}
