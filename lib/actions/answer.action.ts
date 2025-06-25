"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

import ROUTES from "@/constants/routes";
import { Question, Vote } from "@/database";
import Answer, { IAnswerDoc } from "@/database/answer.model";

import action from "../handlers/action";
import handleError from "../handlers/error";
import {
  AnswerServerSchema,
  DeleteAnswerSchema,
  GetAnswersSchema,
} from "../validations";
import { CreateAnswerParams, DeleteAnswerParams } from "@/types/action";
import { unstable_after as after } from "next/server";
import { createInteraction } from "./interaction.action";

export const createAnswer = async (
  params: CreateAnswerParams
): Promise<ActionResponse<IAnswerDoc>> => {
  const validarionResult = await action({
    params,
    schema: AnswerServerSchema,
    authorize: true,
  });

  if (validarionResult instanceof Error) {
    return handleError(validarionResult) as ErrorResponse;
  }

  const { questionId, content } = validarionResult.params!;
  const userId = validarionResult?.session?.user?.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const question = await Question.findById(questionId);

    if (!question) throw new Error("Question not found");

    const [newAnswer] = await Answer.create(
      [
        {
          author: userId,
          question: questionId,
          content,
        },
      ],
      { session }
    );

    if (!newAnswer) throw new Error("Failed to create answer");

    question.answers += 1;
    await question.save({ session });

    after(async () => {
      await createInteraction({
        action: "post",
        actionTarget: "answer",
        actionId: newAnswer._id.toString(),
        authorId: userId as string,
      });
    });

    await session.commitTransaction();

    revalidatePath(ROUTES.QUESTION(questionId));

    return { success: true, data: JSON.parse(JSON.stringify(newAnswer)) };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
};

export const getAnswers = async (
  params: GetAnswersParams
): Promise<
  ActionResponse<{ answers: Answer[]; isNext: boolean; totalAnswers: number }>
> => {
  const validationResult = await action({
    params,
    schema: GetAnswersSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { questionId, page = 1, pageSize = 10, filter } = params;
  const skip = (Number(page) - 1) * Number(pageSize);
  const limit = Number(pageSize);

  let sortCriteria = {};

  switch (filter) {
    case "latest":
      sortCriteria = {
        createdAt: -1,
      };
      break;
    case "oldest":
      sortCriteria = {
        createdAt: 1,
      };
      break;
    case "popular":
      sortCriteria = {
        upvotes: -1,
      };
      break;
    default:
      sortCriteria = {
        createdAt: -1,
      };
      break;
  }

  try {
    const totalAnswers = await Answer.countDocuments({ question: questionId });

    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id name image")
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    const isNext = totalAnswers > skip + answers.length;

    return {
      success: true,
      data: {
        answers: JSON.parse(JSON.stringify(answers)),
        isNext,
        totalAnswers,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const deleteAnswer = async (
  params: DeleteAnswerParams
): Promise<ActionResponse> => {
  const validationResult = await action({
    params,
    schema: DeleteAnswerSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { answerId } = validationResult.params!;
  const { user } = validationResult.session!;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const answer = await Answer.findById(answerId).session(session);
    if (!answer) throw new Error("Answer is not found");

    if (answer.author.toString() !== user?.id)
      throw new Error("You are not allowed to delete this answer");
    // reduce question answer count
    await Question.findByIdAndUpdate(
      answer.question,
      { $inc: { answer: -1 } },
      { new: true }
    ).session(session);
    // Delete votes associated with the answer
    await Vote.deleteMany({ actionId: answerId, actionType: "answer" }).session(
      session
    );
    // Delete an answer
    await Answer.findByIdAndDelete(answerId).session(session);
    await session.commitTransaction();

    revalidatePath(`profile/${user?.id}`);

    return { success: true };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
};
