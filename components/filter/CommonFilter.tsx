"use client";

import { useSearchParams, useRouter } from "next/navigation";

import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
} from "@/components/ui/select";
import { formUrlQuery } from "@/lib/url";
import { cn } from "@/lib/utils";

type Filters = {
  name: string;
  value: string;
};
interface Props {
  filters: Filters[];
  otherClasses?: string;
  containerClasses?: string;
}
const CommonFilter = ({
  filters,
  otherClasses = "",
  containerClasses = "",
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const paramsFilter = searchParams.get("filter");

  const handleUpdateParams = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "filter",
      value,
    });
    router.push(newUrl, { scroll: false });
  };
  return (
    <div className={cn("relative", containerClasses)}>
      <Select
        onValueChange={handleUpdateParams}
        defaultValue={paramsFilter || undefined}
      >
        <SelectTrigger
          className={cn(
            "body-regular no-focus light-border background-light800_dark300 text-dark500_light_700 border px-5 py-2.5",
            otherClasses
          )}
        >
          <div className="line-clamp-1 flex text-left">
            <SelectValue placeholder="Select a filter" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filters.map((item) => (
              <SelectItem key={item.name} value={item.value}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CommonFilter;
