import { ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import AllAnswers from "@/components/answers/AllAnswers";
import TagCard from "@/components/cards/TagCard";
import Preview from "@/components/editor/Preview";
import AnswerForm from "@/components/form/AnswerForm";
import LoggedInUser from "@/components/LoggedInUser";
import Metric from "@/components/Metric";
import SaveQuestion from "@/components/questions/SaveQuestion";
import UserAvatar from "@/components/UserAvatar";
import Votes from "@/components/votes/Votes";
import ROUTES from "@/constants/routes";
import { getAnswers } from "@/lib/actions/answer.action";
import { hasSavedQuestion } from "@/lib/actions/collection.action";
import { getQuestion, incrementViews } from "@/lib/actions/question.action";
import { hasVoted } from "@/lib/actions/vote.action";
import { formatNumber, getTimeStamp } from "@/lib/utils";

const QuestionDetails = async ({ params }: RouteParams) => {
  const { id } = await params;

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [_, { success, data: question }] = await Promise.all([
    await incrementViews({ questionId: id }),
    await getQuestion({ questionId: id }),
  ]);

  if (!success || !question) redirect("/404");
  const { author, createdAt, views, answers, title, tags, content } = question;

  const {
    success: areAnswerLoaded,
    data: answersResult,
    error: answerError,
  } = await getAnswers({
    questionId: id,
    page: 1,
    pageSize: 10,
    filter: "latest",
  });

  const hasVotedPromise = hasVoted({
    targetId: question?._id,
    targetType: "question",
  });

  const hasSavedQuestionPromise = hasSavedQuestion({
    questionId: question?._id,
  });

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between">
          <div className="flex items-center justify-start gap-1">
            <UserAvatar
              id={author._id}
              name={author.name}
              className="size-[22px]"
              fallbackClassName="text-[10px]"
              imageUrl={author.image}
            />
            <Link href={ROUTES.PROFILE(author._id)}>
              <p className="paragraph-semibold text-dark300_light700">
                {author.name}
              </p>
            </Link>
          </div>
          <div className="flex items-center justify-end">
            <Suspense
              fallback={
                <div className="flex items-center justify-center gap-1">
                  <ReloadIcon className="mr-2 size-4 animate-spin" />
                  <p>Loading...</p>
                </div>
              }
            >
              <Votes
                upvotes={question.upvotes}
                targetId={question._id}
                targetType="question"
                downvotes={question.downvotes}
                hasVotedPromise={hasVotedPromise}
              />
            </Suspense>
            <Suspense
              fallback={
                <div className="flex items-center justify-center gap-1">
                  <ReloadIcon className="mr-2 size-4 animate-spin" />
                  <p>Loading...</p>
                </div>
              }
            >
              <SaveQuestion
                questionId={question._id}
                hasSavedQuestionPromise={hasSavedQuestionPromise}
              />
            </Suspense>
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full">
          {title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/icons/clock.svg"
          alt="clock icon"
          value={`asked ${getTimeStamp(new Date(createdAt))}`}
          title=""
          textStyles="small-regular text-dark400_light700"
        />
        <Metric
          imgUrl="/icons/message.svg"
          alt="message icon"
          value={answers}
          title="answers"
          textStyles="small-regular text-dark400_light700"
        />
        <Metric
          imgUrl="/icons/eye.svg"
          alt="eye icon"
          value={formatNumber(views)}
          title="views"
          textStyles="small-regular text-dark400_light700"
        />
      </div>
      <Preview content={content} />
      <div className="flex-between">
        <div className="mt-8 flex flex-wrap gap-2">
          {tags.map((tag: Tags) => (
            <TagCard
              key={tag._id}
              _id={tag._id as string}
              name={tag.name}
              compact
            />
          ))}
        </div>
        <div className="flex justify-end">
          <LoggedInUser
            href={`${ROUTES.QUESTION(question._id)}`}
            author={author._id}
          />
        </div>
      </div>

      <section className="my-5">
        <AllAnswers
          data={answersResult ? answersResult?.answers : []}
          success={areAnswerLoaded}
          error={answerError}
          totalAnswers={answersResult?.totalAnswers || 0}
        />
      </section>

      <section className="my-5">
        <AnswerForm
          questionId={question._id}
          questionTitle={question.title}
          questionContent={question.content}
        />
      </section>
    </>
  );
};

export default QuestionDetails;
