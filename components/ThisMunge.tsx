/* Munge notation
 */

import React from "react";

import { InternalLink } from "components/Links";

type TThisMungeProps = {
  search: string;
  replace: string;
};

export function ThisMunge({ search, replace }: TThisMungeProps) {
  return (
    <span className="block mb-4 italic inline pr-8">
      <span className="font-thin">This Munge:</span> <span>{search}</span>{" "}
      <span className="text-redletter">»</span> <span>{replace}</span>{" "}
    </span>
  );
}

export function ThisMungeExpand({ search, replace }: TThisMungeProps) {
  const href = `/munge/${search}/${replace}`;
  return (
    <InternalLink href={href}>
      <button className="text-redletter border border-black rounded px-2">
        Expand munge
      </button>
    </InternalLink>
  );
}

export function ThisMungeWithExpandLink({ search, replace }: TThisMungeProps) {
  return (
    <div className="py-4">
      <div className="inline pr-8">
        <ThisMunge search={search} replace={replace} />
      </div>
      <div className="inline pl-auto pr-0">
        <ThisMungeExpand search={search} replace={replace} />
      </div>
    </div>
  );
}
