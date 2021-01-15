import React, { FormEvent, useState } from "react";
import { useRouter } from "next/router";

export default function Munge() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [replace, setReplace] = useState<string>("");

  const validSearch = search !== "" && replace !== "";
  // console.log(`Munge: s/${search}/${replace}/g is valid: ${validSearch}`);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    console.log("asdf");
    event.preventDefault();
    if (!validSearch) {
      console.log(
        `Ignoring form submission, empty search/replace (${search}/${replace}`
      );
      return;
    }
    router.push({
      pathname: `/munge/${search}/${replace}`,
    });
  };

  const submitButtonClasses =
    "m-4 p-4 align-center border rounded" + validSearch
      ? `border-blue-500 bg-blue-100`
      : `border-black bg-gray-200 text-gray-500`;

  return (
    <form
      style={{
        display: "grid",
        gridTemplateColumns: "6rem auto",
      }}
      className="m-8"
      onSubmit={handleSubmit}
    >
      <label htmlFor="searchInput" className="text-md">
        Search
      </label>
      <input
        id="searchInput"
        className="border p-1 m-1 text-lg"
        autoCapitalize="off"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <label htmlFor="replaceInput" className="text-md">
        Replace
      </label>
      <input
        id="replaceInput"
        className="border p-1 m-1 text-lg"
        autoCapitalize="off"
        value={replace}
        onChange={(e) => setReplace(e.target.value)}
      />

      <div />
      <input className={submitButtonClasses} type="submit" value="Munge" />
    </form>
  );
}
