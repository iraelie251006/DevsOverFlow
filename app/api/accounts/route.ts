import { NextResponse } from "next/server";

import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { ForbiddenError} from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validations";

export const GET = async () => {
  try {
    await dbConnect();

    const account = await Account.find();
    return NextResponse.json({ success: true, data: account }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
};

export const POST = async (request: Request) => {
  try {
    await dbConnect();
    const body = await request.json();
    const validatedData = AccountSchema.parse(body);

    const existingAccount = await Account.findOne({
      provider: validatedData.provider,
      providerAccountId: validatedData.providerAccountId,
    });
    if (existingAccount)
      throw new ForbiddenError(
        "An account with the same provider already exists"
      );

    const newAccount = await Account.create(validatedData);

    return NextResponse.json(
      { success: true, data: newAccount },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
};
