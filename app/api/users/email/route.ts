import { NextResponse } from "next/server";

import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validations";

export const POST = async (request: Request) => {
  const { email } = await request.json();

  try {
    await dbConnect();
    const validatedData = UserSchema.partial().safeParse({ email });
    if (!validatedData.success)
      throw new ValidationError(validatedData.error.flatten().fieldErrors);

    const user = await User.findOne({ email });
    if (!user) throw new NotFoundError("User");

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
};
