import { IMungePair } from "lib/MungePair";
import React from "react";
import { InternalLink } from "./Links";

export function MungeLink({ search, replace }: IMungePair) {
  return (
    <InternalLink href={`/munge/${search}/${replace}`}>
      {search} ⇒ {replace}
    </InternalLink>
  );
}

type MungeLinkListProps = {
  pairs: IMungePair[];
};
export function MungeLinkList({ pairs }: MungeLinkListProps) {
  const links = pairs.map((pair) => (
    <ul className="list-disc px-4">
      <li>
        <MungeLink search={pair.search} replace={pair.replace} />
      </li>
    </ul>
  ));
  return <div>{links}</div>;
}
