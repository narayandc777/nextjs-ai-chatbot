import { createTextStreamResponse, streamText, toTextStream } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Request body must include a 'messages' array" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const result = streamText({
      model: openai("gpt-5-nano"),
      messages,
    });

     // ✅ current API (result.toTextStreamResponse() is deprecated as of AI SDK v7)
    return createTextStreamResponse({
      stream: toTextStream({ stream: result.stream }),
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate a response" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}