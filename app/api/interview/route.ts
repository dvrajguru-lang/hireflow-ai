import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    console.log("OPENROUTER KEY EXISTS:", !!process.env.OPENROUTER_API_KEY);

    const body = await req.json();

    const client = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
    });

    const completion = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",

      messages: [
        {
          role: "system",
          content:
            "You are a professional interviewer. Ask one interview question.",
        },
      ],
    });

    return Response.json({
      question:
        completion.choices?.[0]?.message?.content ||
        "Tell me about yourself.",
    });
  } catch (error: any) {
    console.error("FULL ERROR:", error);

    return Response.json({
      error: error?.message,
      details: error,
    });
  }
}