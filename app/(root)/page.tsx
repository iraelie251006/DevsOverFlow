import Link from "next/link";

import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

const Home = async () => {
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
      <section className="mt-11">LocalSearch</section>
      Home Filter
      <div className="mt-10 flex w-full flex-col gap-6">
        <p>Question 1</p>
        <p>Question 2</p>
        <p>Question 3</p>
        <p>Question 4</p>
      </div>
    </>
  );
};

export default Home;
