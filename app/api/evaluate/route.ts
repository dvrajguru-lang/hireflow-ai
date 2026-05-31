import OpenAI from "openai";

import { createClient } from "@supabase/supabase-js";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const completion = await client.chat.completions.create({

      model: "baidu/cobuddy:free",

      messages: [
        {
          role: "system",
          content: `
You are an AI interview evaluator.

Evaluate the candidate answer professionally.

Return:
- score out of 10
- strengths
- weaknesses
- improvement tips
          `,
        },

        {
          role: "user",
          content: `
Question:
${body.question}

Answer:
${body.answer}
          `,
        },
      ],

    });

    const feedback =
      completion.choices?.[0]?.message?.content ||
      "No feedback generated.";

    const scoreMatch = feedback.match(/\b([0-9]|10)\/10\b/);

    const score = scoreMatch
      ? parseInt(scoreMatch[1])
      : 7;

    await supabase
      .from("interviews")
      .insert([
        {
          user_email: body.user_email || "unknown",
          mode: body.mode || "Technical",
          question: body.question,
          answer: body.answer,
          feedback,
          score,
        },
      ]);

    return Response.json({
      feedback,
      score,
    });

  } catch (error) {

    console.error(error);

    return Response.json({
      feedback: "Evaluation failed.",
      score: 0,
    });

  }

}