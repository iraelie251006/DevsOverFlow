"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

import ROUTES from "@/constants/routes";
import { Question } from "@/database";
import Answer, { IAnswerDoc } from "@/database/answer.model";

import action from "../handlers/action";
import handleError from "../handlers/error";
import { AnswerServerSchema } from "../validations";

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

    await session.commitTransaction();

    revalidatePath(ROUTES.QUESTION(questionId));

    return {success: true, data: JSON.parse(JSON.stringify(newAnswer))}
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
};
