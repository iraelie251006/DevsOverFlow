import { model, models, Schema, Types, Document } from "mongoose";

export interface IInteraction {
  user: Types.ObjectId;
  action: string;
  actionId: Types.ObjectId;
  actionType: "question" | "answer";
}

export interface IInteractionDoc extends IInteraction, Document {}
const InteractionSchema = new Schema<IInteraction>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    action: { type: String, required: true }, // 'upvote', 'downvote', 'view', 'ask_question',
    actionId: { type: Schema.Types.ObjectId, required: true }, // 'questionId', 'answerId',
    actionType: { type: String, enum: ["question", "answer"], required: true },
  },
  { timestamps: true }
);

const Interaction =
  models?.Interaction || model<IInteraction>("Interaction", InteractionSchema);

export default Interaction;
