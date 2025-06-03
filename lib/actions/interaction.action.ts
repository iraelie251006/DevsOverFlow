"use server";

import Interaction, { IInteractionDoc } from "@/database/interaction.model";
import action from "../handlers/action";
import { CreateInteractionSchema } from "../validations";
import handleError from "../handlers/error";
import mongoose from "mongoose";

export const createInteraction = async (
  params: CreateInteractionParams
): Promise<ActionResponse<IInteractionDoc>> => {
  const validationResult = await action({
    params,
    schema: CreateInteractionSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const {
    action: actionType,
    actionId,
    actionTarget,
    authorId,
  } = validationResult?.params!;

  const userId = validationResult?.session?.user?.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const [interaction] = await Interaction.create(
      [
        {
          user: userId,
          action: actionType,
          actionId,
          actionType: actionTarget,
        },
      ],
      { session }
    );

    // Todo: Update reputation for both the performer and the content author
    
    await session.commitTransaction();

    return {success: true, data: JSON.parse(JSON.stringify(interaction))}
  } catch (error) {
    await session.abortTransaction()
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
};
