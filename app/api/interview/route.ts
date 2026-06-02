import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const messages = body.messages || [];
    const mode = body.mode || "Technical";

    const completion = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",

      messages: [
        {
          role: "system",
          content: `
You are a highly realistic professional interviewer.

Interview Mode: ${mode}

Rules:
- Ask ONLY one question at a time.
- Be conversational and realistic.
- Ask follow-up questions based on previous answers.
- If answer is weak, challenge the candidate.
- If answer is strong, go deeper.
- Keep interviews professional.
- Do not give feedback.
- Do not explain.
- Behave like a real interviewer from a top company.
          `,
        },

        ...messages,
      ],
    });

    const question =
      completion.choices?.[0]?.message?.content ||
      "Tell me about yourself.";

    return Response.json({
      question,
    });
  } catch (error: any) {
    console.error("INTERVIEW API ERROR:", error);

    return Response.json({
      question: `ERROR: ${
        error?.message ||
        JSON.stringify(error) ||
        "Unknown error"
      }`,
    });
  }
}