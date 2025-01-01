import { NextResponse } from "next/server";

import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validations";

export const GET = async (
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  if (!id) throw new NotFoundError("User");
  try {
    await dbConnect();

    const user = await User.findById(id);
    if (!user) throw new NotFoundError("User");

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    handleError(error, "api") as APIErrorResponse;
  }
};

export const DELETE = async (
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  if (!id) throw new NotFoundError("User");

  try {
    await dbConnect();

    const user = await User.findByIdAndDelete(id);
    if (!user) throw new NotFoundError("User");

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    handleError(error, "api") as APIErrorResponse;
  }
};

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  if (!id) throw new NotFoundError("User");

  try {
    await dbConnect();

    const body = await request.json();

    const validatedData = UserSchema.partial().parse(body);
    if (!validatedData) throw new Error("Invalid data");

    const updatedUser = await User.findByIdAndUpdate(id, validatedData, {
      new: true,
    });
    if (!updatedUser) throw new NotFoundError("User");

    return NextResponse.json(
      { success: true, data: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    handleError(error, "api") as APIErrorResponse;
  }
};
