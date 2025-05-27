import TagCard from "@/components/cards/TagCard";
import DataRenderer from "@/components/DataRenderer";
import CommonFilter from "@/components/filter/CommonFilter";
import Pagination from "@/components/Pagination";
import LocalSearch from "@/components/search/LocalSearch";
import { TagFilters } from "@/constants/filters";
import ROUTES from "@/constants/routes";
import { EMPTY_TAGS } from "@/constants/states";
import { getTags } from "@/lib/actions/tag.action";

const Tags = async ({ searchParams }: RouteParams) => {
  const { page, pageSize, query, filter } = await searchParams;
  const { success, data, error } = await getTags({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query,
    filter,
  });

  const { tags, isNext } = data || {};

  return (
    <>
      <h1 className="h2-bold text-dark100_light900 text-3xl">Tags</h1>
      <section className="mt-11">
        <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
          <LocalSearch
            route={ROUTES.TAGS}
            imgSrc="icons/search.svg"
            placeholder="Search by tag name..."
            otherClasses="flex-1"
          />
          <CommonFilter
            filters={TagFilters}
            otherClasses="min-h-[56px] sm:min-w-[170px]"
          />
        </div>

        <DataRenderer
          success={success}
          error={error}
          data={tags}
          empty={EMPTY_TAGS}
          render={(tags) => (
            <div className="mt-10 flex w-full flex-wrap justify-around gap-4">
              {tags.map((tag) => (
                <TagCard key={tag._id} {...tag} />
              ))}
            </div>
          )}
        />
        <Pagination page={page} isNext={isNext || false} />
      </section>
    </>
  );
};

export default Tags;
