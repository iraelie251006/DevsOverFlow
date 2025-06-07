import Link from "next/link";

import ROUTES from "@/constants/routes";
import { getTimeStamp } from "@/lib/utils";

import TagCard from "./TagCard";
import Metric from "../Metric";
import EditDeleteAction from "../user/EditDeleteAction";

const JobCard = () => {
  return (
    <div className="card-wrapper dark:light-border rounded-[10px] border p-9 shadow-2xl sm:px-11">
      <div className="flex flex-col-reverse items-center justify-between gap-5 sm:flex-row">
        <div className="flex-1">
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            ...
          </span>
          <Link href={'/'} className="flex gap-2">
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              ...
            </h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
