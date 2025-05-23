"use server";

import { revalidatePath } from "next/cache";

import ROUTES from "@/constants/routes";
import { Collection, Question } from "@/database";

import action from "../handlers/action";
import handleError from "../handlers/error";
import { CollectionBaseSchema } from "../validations";

export const toggleSaveQuestion = async (
  params: CollectionBaseParams
): Promise<ActionResponse<{ saved: boolean }>> => {
  const validationResult = await action({
    params,
    schema: CollectionBaseSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { questionId } = validationResult.params!;
  const userId = validationResult.session?.user?.id;

  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return handleError(new Error("Question not found")) as ErrorResponse;
    }

    const collection = await Collection.findOne({
      question: questionId,
      author: userId,
    });

    if (collection) {
      await Collection.findByIdAndDelete(collection._id);
      revalidatePath(ROUTES.QUESTION(questionId));
      return { success: true, data: { saved: false } };
    }

    await Collection.create({ question: questionId, author: userId });
    revalidatePath(ROUTES.QUESTION(questionId));

    return { success: true, data: { saved: true } };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const hasSavedQuestion = async (
  params: CollectionBaseParams
): Promise<ActionResponse<{ saved: boolean }>> => {
  const validationResult = await action({
    params,
    schema: CollectionBaseSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { questionId } = validationResult.params!;
  const userId = validationResult.session?.user?.id;

  try {
    const collection = await Collection.findOne({
      question: questionId,
      author: userId,
    });

    return { success: true, data: { saved: !!collection } };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};
