import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

export default async function GenerateMenu() {
  try {
    const response = await client.responses.create({
      model: "gpt-5-nano",
      input: "Generate a monthly menu schedule for me.",
    });

    console.log(response.output_text);
  } catch (err) {
    console.log("The Error: ", err);
  }
}

GenerateMenu();
