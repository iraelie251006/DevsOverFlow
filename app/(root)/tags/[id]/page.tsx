import React from "react";

import QuestionCard from "@/components/cards/QuestionCard";
import DataRenderer from "@/components/DataRenderer";
import LocalSearch from "@/components/search/LocalSearch";
import ROUTES from "@/constants/routes";
import { EMPTY_QUESTION } from "@/constants/states";
import { getTagQuestions } from "@/lib/actions/tag.action";
import Pagination from "@/components/Pagination";

export const generateMetadata = async ({ params, searchParams }: RouteParams) => {
  const { id } = await params;
  const { page, pageSize, query } = await searchParams;

  const { success, data, error } = await getTagQuestions({
    tagId: id,
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query,
  });
  if (!success || !data || !data.tag) {
    return {
      title: "Tag not found",
      description: "The tag you are looking for does not exist.",
    };
  }

  return {
    title: data.tag.name.charAt(0).toUpperCase().concat(data.tag.name.slice(1)),
    description: `Questions tagged with ${data.tag.name}`,
    twitter: {
      card: "summary_large_image",
      title: data.tag.name.charAt(0).toUpperCase().concat(data.tag.name.slice(1)),
      description: `Questions tagged with ${data.tag.name}`,
    },
  }
};

const page = async ({ params, searchParams }: RouteParams) => {
  const { id } = await params;
  const { page, pageSize, query } = await searchParams;

  const { success, data, error } = await getTagQuestions({
    tagId: id,
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query,
  });

  const { tag, questions, isNext } = data || {};

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">
          {tag?.name.charAt(0).toUpperCase().concat(tag?.name.slice(1))}
        </h1>
      </section>
      <section className="mt-11">
        <LocalSearch
          route={ROUTES.TAG(id)}
          imgSrc="/icons/search.svg"
          placeholder="Search questions..."
          otherClasses="flex-1"
        />
      </section>
      <DataRenderer
        success={success}
        error={error}
        data={questions}
        empty={EMPTY_QUESTION}
        render={(question) =>
          question.map((question) => (
            <QuestionCard key={question._id} question={question} />
          ))
        }
      />
      <Pagination page={page} isNext={isNext || false} />
    </>
  );
};

export default page;
