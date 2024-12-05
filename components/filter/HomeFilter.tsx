"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { formUrlQuery, removeKeysFromQuery } from "@/lib/url";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

const filters = [
    { name: "React", value: "react" },
    { name: "JavaScript", value: "javascript" },
//   { name: "Newest", value: "newest" },
//   { name: "Popular", value: "popular" },
//   { name: "Unanswered", value: "unanswered" },
//   { name: "Recommended", value: "recommended" },
];
const HomeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParams = searchParams.get("filter") || "";
  const [active, SetActive] = useState(filterParams);

  const handleTypeClick = (filter: string) => {
    let newUrl = "";

    if (filter === active) {
      SetActive("");
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keyToRemove: ["filter"],
      });
      router.push(newUrl, { scroll: false });
    } else {
      SetActive(filter);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: filter.toLocaleLowerCase(),
      });
      router.push(newUrl, { scroll: false });
    }
  };
  return (
    <div className="mt-10 hidden flex-wrap gap-3 sm:flex">
      {filters.map(({ name }) => (
        <Button
          key={name}
          className={cn(
            `body-medium rounded-lg px-6 py-3 capitalize shadow-none`,
            active === name
              ? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500"
              : "bg-light-800 text-light-500 hover:bg-light-900 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-500"
          )}
          onClick={() => handleTypeClick(name)}
        >
          {name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilter;
