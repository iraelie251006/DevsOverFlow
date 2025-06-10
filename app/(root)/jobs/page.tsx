import JobCard from "@/components/cards/JobCard";
import JobsFilter from "@/components/filter/JobFilter";

import Pagination from "@/components/Pagination";
import {
  fetchLocation,
  fetchJobs,
  fetchCountries,
} from "@/lib/actions/job.action";

const Page = async ({ searchParams }: RouteParams) => {
  const { query, location, page } = await searchParams;
  const userLocation = await fetchLocation();

  const jobs = await fetchJobs({
    query: `${query}, ${location}` || `Software Engineer in ${userLocation}`,
    page: page ?? 1,
  });

  const countries = await fetchCountries();
  let safeCountries = Array.isArray(countries) ? countries : [];
  const parsedPage = parseInt(page ?? 1);

  console.log(jobs);

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Jobs</h1>

      <div className="flex">
        <JobsFilter countriesList={safeCountries} />
      </div>

      <section className="light-border mb-9 mt-11 flex flex-col gap-9 border-b pb-9">
        {jobs?.length > 0 ? (
          jobs
            ?.filter((job: Job) => job.job_title)
            .map((job: Job) => <JobCard key={job.id} job={job} />)
        ) : (
          <div className="paragraph-regular text-dark200_light800 w-full text-center">
            Oops! We couldn&apos;t find any jobs at the moment. Please try again
            later
          </div>
        )}
      </section>

      {jobs?.length > 0 && (
        <Pagination page={parsedPage} isNext={jobs?.length === 10} />
      )}
    </>
  );
};

export default Page;
