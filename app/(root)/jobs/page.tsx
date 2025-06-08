import CommonFilter from "@/components/filter/CommonFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { UserFilters } from "@/constants/filters";
import ROUTES from "@/constants/routes";
import JobCard from "@/components/cards/JobCard";

const FindJobs = () => {
  return (
    <section>
      <h1 className="h1-bold text-dark100_light900">Jobs</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route={ROUTES.COMMUNITY}
          iconPostion="left"
          imgSrc="/icons/search.svg"
          placeholder="Job Title, Company, or Keywords"
          otherClasses="flex-1"
        />
        <CommonFilter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
        <Button className="min-h-[56px] primary-gradient !text-light-900 font-semibold">
          Find Jobs
        </Button>
      </div>
      <section className="mt-10">
        <JobCard />
      </section>
      
    </section>
  );
};

export default FindJobs;
