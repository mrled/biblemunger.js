import React, { FormEvent, useState } from "react";
import { useRouter } from "next/router";

import classNames from "classnames";

export default function MungePage() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [replace, setReplace] = useState<string>("");
  const validSearch = search !== "" && replace !== "";

  const submitButtonClasses = classNames(
    "block p-8 text-3xl text-center text-white px-6 py-4 font-eczar uppercase rounded-b-3xl bg-redletter tracking-widest mx-auto",
    {
      " hover:cursor-pointer": validSearch,
      " hover:cursor-not-allowed": !validSearch,
    }
  );

  const inputFieldClasses =
    "w-5/12 inline-block mx-1 px-2 py-2 border-redletter border-6 border-solid text-2xl font-eczar leading-4 text-center bg-transparent";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validSearch) {
      return;
    }
    const encodedSearch = encodeURIComponent(search);
    const encodedReplace = encodeURIComponent(replace);
    router.push({
      pathname: `/munge/${encodedSearch}/${encodedReplace}`,
    });
  };

  return (
    <form
      className="overflow-hidden mb-12 border-b-6 pb-20 border-double border-redletter"
      onSubmit={handleSubmit}
    >
      <div className="text-center">
        <input
          type="text"
          placeholder="Search for"
          autoCapitalize="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={inputFieldClasses}
        />
        <input
          type="text"
          placeholder="Replace with"
          autoCapitalize="off"
          value={replace}
          onChange={(e) => setReplace(e.target.value)}
          className={inputFieldClasses}
        />
      </div>
      <input type="submit" value="Munge" className={submitButtonClasses} />
    </form>
  );
}
