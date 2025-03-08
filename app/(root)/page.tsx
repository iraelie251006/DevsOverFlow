import Link from "next/link";

import QuestionCard from "@/components/cards/QuestionCard";
import DataRenderer from "@/components/DataRenderer";
import HomeFilter from "@/components/filter/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { EMPTY_QUESTION } from "@/constants/states";
import { getQuestions } from "@/lib/actions/question.action";
// const questions = [
//   {
//     _id: "1",
//     title: "How to learn React?",
//     description: "I want to learn React, can anyone help me?",
//     tags: [
//       { _id: "1", name: "React" },
//       { _id: "2", name: "JavaScript" },
//     ],
//     author: {
//       _id: "1",
//       name: "John Doe",
//       imgUrl:
//         "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg",
//     },
//     upvotes: 10,
//     answers: 5,
//     views: 100,
//     createdAt: new Date(),
//   },
//   {
//     _id: "2",
//     title: "How to learn JavaScript?",
//     description: "I want to learn JavaScript, can anyone help me?",
//     tags: [
//       { _id: "1", name: "JavaScript" },
//       { _id: "2", name: "JavaScript" },
//     ],
//     author: {
//       _id: "1",
//       name: "Jane Doe",
//       imgUrl:
//         "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg",
//     },
//     upvotes: 10,
//     answers: 5,
//     views: 100,
//     createdAt: new Date(),
//   },
// ];

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}
const Home = async ({ searchParams }: SearchParams) => {
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query: query || "",
    filter: filter || "",
  });

  const { questions } = data || {};

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Button
          className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask Question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="Search questions..."
          otherClasses="flex-1"
        />
      </section>
      <HomeFilter />
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
    </>
  );
};

export default Home;
