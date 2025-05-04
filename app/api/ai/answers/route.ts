import { NextRequest, NextResponse } from "next/server";

import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import { AIAnswerSchema } from "@/lib/validations";


export const POST = async (req: NextRequest) => {
  const { question, content, userAnswer } = await req.json();

  try {
    const validatedData = AIAnswerSchema.safeParse({ question, content });

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const prompt = `Generate a markdown-formatted response to the following question: "${question}".

    Consider the provided context:
    **Context:** ${content}
    
    Also, prioritize and incorporate the user's answer when formulating your response:
    **User's Answer:** ${userAnswer}
    
    Prioritize the user's answer only if it's correct. If it's incomplete or incorrect, improve or correct it while keeping the response concise and to the point.
    Provide the final answer in markdown format.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
            {
                role: "user",
                parts: [
                    {text: prompt}
                ]
            }
        ]
      }),
    });

    const data = await response.json();
    const result = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "❌ No response";
    // console.log(result);
    
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
};
