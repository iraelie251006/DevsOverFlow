import { NextRequest, NextResponse } from "next/server";

import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import { AIAnswerSchema } from "@/lib/validations";

const MISTRAL = process.env.LLAMA_MISTRAL;
export const runtime = "edge";

export const POST = async (req: NextRequest) => {
  const { question, content } = await req.json();
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  try {
    const validatedData = AIAnswerSchema.safeParse({ question, content });

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const response = await fetch(`${MISTRAL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistral",
        prompt: `Generate a markdown-formatted response to the following question: ${validatedData.data.question}. Base it on the following content: ${validatedData.data.content}.`,
        stream: false,
      }),
    });

    const reader = response.body?.getReader();

    if (!reader) {
      return new Response("❌ No readable stream from Ollama", { status: 500 });
    }

    const stream = new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split("\n").filter(Boolean);

            for (const line of lines) {
              const json = JSON.parse(line);
              const token = json.response;

              controller.enqueue(encoder.encode(token));
            }
          }
        } catch (error) {
          controller.enqueue(
            encoder.encode(`⚠️ Stream error occurred: ${error}.`)
          );
        } finally {
          controller.close();
        }
      },
    });

    return NextResponse.json({ success: true, data: stream }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
};
