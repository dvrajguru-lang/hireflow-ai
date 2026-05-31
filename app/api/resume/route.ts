import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const completion = await client.chat.completions.create({

      model: "baidu/cobuddy:free",

      messages: [

        {
          role: "system",
          content: `
You are an expert AI resume evaluator.

Analyze:
- ATS score
- strengths
- weaknesses
- missing keywords
- formatting
- job match quality
- improvement tips

Give professional feedback.
          `,
        },

        {
          role: "user",
          content: `
Target Role:
${body.jobRole}

Resume:
${body.resume}
          `,
        },

      ],

    });

    const feedback =
      completion.choices?.[0]?.message?.content ||
      "No feedback generated.";

    return Response.json({
      feedback,
    });

  } catch (error) {

    console.error(error);

    return Response.json({
      feedback: "Resume analysis failed.",
    });

  }

}