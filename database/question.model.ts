import { model, models, Schema, Types, Document } from "mongoose";

export interface IQuestion {
  title: string;
  content: string;
  views: number;
  answers: number;
  upvotes: number;
  downvotes: number;
  author: Types.ObjectId;
  createdAt: Date;
  tags: Types.ObjectId[];
}
export interface IQuestionDoc extends IQuestion, Document {}
const questionSchema = new Schema<IQuestion>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    views: { type: Number, default: 0 },
    answers: { type: Number, default: 0 },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Question =
  models?.Question || model<IQuestion>("Question", questionSchema);

export default Question;
