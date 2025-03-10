"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { formUrlQuery, removeKeysFromQuery } from "@/lib/url";

import { Input } from "../ui/input";

interface Props {
  route: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
  iconPostion?: 'left' | 'right';
}

const LocalSearch = ({ route, imgSrc, placeholder, iconPostion = "left", otherClasses }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "query",
        value: searchQuery,
      });
      router.push(newUrl, {scroll: false});
    } else {
      if (pathname === route) {
        const newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keyToRemove: ["query"]
        });
        router.push(newUrl, {scroll: false})
      }
    }
    }, 1000)
    
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, router, searchParams, route, pathname]);

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center  rounded-[10px] px-4 shadow-2xl ${otherClasses}`}
    >
      {iconPostion === 'left' && <Image
        src={imgSrc}
        width={24}
        height={24}
        alt="search icon"
        className="cursor-pointer"
      />}
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(event) => {
          setSearchQuery(event.target.value);
        }}
        className="paragraph-regular placeholder no-focus text-dark400_light700 border-none shadow-none outline-none"
      />
      {iconPostion === 'right' && <Image
        src={imgSrc}
        width={24}
        height={24}
        alt="search icon"
        className="cursor-pointer"
      />}
    </div>
  );
};

export default LocalSearch;
