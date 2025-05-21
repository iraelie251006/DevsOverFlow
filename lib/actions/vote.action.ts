"use server";

import mongoose from "mongoose";

import { Vote } from "@/database";

import action from "../handlers/action";
import handleError from "../handlers/error";
import { CreateVoteSchema } from "../validations";

export const createVote = async (
  params: CreateVoteParams
): Promise<ActionResponse> => {
  const validationResult = await action({
    params,
    schema: CreateVoteSchema,
    authorize: true,
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  const { targetId, targetType, voteType } = validationResult.params!;

  const userId = validationResult.session?.user?.id;

  if (!userId) handleError(new Error("Unauthorized")) as ErrorResponse;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existingVote = await Vote.findOne({
      author: userId,
      actionId: targetId,
      actionType: targetType,
    }).session(session);

    if (existingVote) {
        if (existingVote.voteType === voteType) {
            await Vote.deleteOne({_id: existingVote._id}).session(session)
        }
    }
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    session.endSession();
  }
};
