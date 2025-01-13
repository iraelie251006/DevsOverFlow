import { model, models, Schema, Types, Document } from "mongoose";

export interface IAccount {
  userId: Types.ObjectId;
  name: string;
  password?: string;
  image?: string;
  provider: string; // e.g., 'github', 'google', 'credentials'
  providerAccountId: string;
}
export interface IAccountDoc extends IAccount, Document {}
export const AccountSchema = new Schema<IAccount>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    password: { type: String },
    image: { type: String },
    provider: { type: String, required: true },
    providerAccountId: { type: String, required: true },
  },
  { timestamps: true }
);

const Account = models?.Account || model<IAccount>("Account", AccountSchema);

export default Account;
