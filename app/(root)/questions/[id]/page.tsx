import Link from "next/link";
import { redirect } from "next/navigation";

import TagCard from "@/components/cards/TagCard";
import Preview from "@/components/editor/Preview";
import Metric from "@/components/Metric";
import UserAvatar from "@/components/UserAvatar";
import ROUTES from "@/constants/routes";
import { getQuestion } from "@/lib/actions/question.action";
import { formatNumber, getTimeStamp } from "@/lib/utils";

// const sampleQuestion = {
//   id: "q123",
//   title: "How to improve React app performance?",
//   content: `### Question
// I'm looking for tips and best practices to enhance the performance of a React application. I have a moderately complex app with multiple components, and I've noticed some performance bottlenecks. What should I focus on?
// #### What I've Tried:
// - Lazy loading components
// - Using React.memo on some components
// - Managing state with React Context API
// #### Issues:
// - The app still lags when rendering large lists.
// - Switching between pages feels sluggish.
// - Sometimes, re-renders happen unexpectedly.
// #### Key Areas I Need Help With:
// 1. Efficiently handling large datasets.
// 2. Reducing unnecessary re-renders.
// 3. Optimizing state management.
// Here is a snippet of my code that renders a large list. Maybe I'm doing something wrong here:
// \`\`\`js
// import React, { useState, useMemo } from "react";
// const LargeList = ({ items }) => {
//   const [filter, setFilter] = useState("");
//   // Filtering items dynamically
//   const filteredItems = useMemo(() => {
//     return items.filter((item) => item.includes(filter));
//   }, [items, filter]);
//   return (
//     <div>
//       <input
//         type="text"
//         value={filter}
//         onChange={(e) => setFilter(e.target.value)}
//         placeholder="Filter items"
//       />
//       <ul>
//         {filteredItems.map((item, index) => (
//           <li key={index}>{item}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };
// export default LargeList;
// \`\`\`
// #### Questions:
// 1. Is using \`useMemo\` the right approach here, or is there a better alternative?
// 2. Should I implement virtualization for the list? If yes, which library would you recommend?
// 3. Are there better ways to optimize state changes when dealing with user input and dynamic data?
// Looking forward to your suggestions and examples!
// **Tags:** React, Performance, State Management
//   `,
//   createdAt: "2025-01-15T12:34:56.789Z",
//   upvotes: 42,
//   downvotes: 3,
//   views: 1234,
//   answers: 5,
//   tags: [
//     { _id: "tag1", name: "React" },
//     { _id: "tag2", name: "Node" },
//     { _id: "tag3", name: "PostgreSQL" },
//   ],
//   author: {
//     _id: "u456",
//     name: "Jane Doe",
//     image: "/avatars/jane-doe.png",
//   },
// };

const QuestionDetails = async ({ params }: RouteParams) => {
  const { id } = await params;
  const { success, data: question } = await getQuestion({ questionId: id });

  if (!success || !question) redirect("/404");
  const {
    author,
    createdAt,
    views,
    answers,
    title,
    tags,
    content,
  } = question;
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
          <div className="flex justify-end">
            <p>Votes</p>
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
    </>
  );
};

export default QuestionDetails;
