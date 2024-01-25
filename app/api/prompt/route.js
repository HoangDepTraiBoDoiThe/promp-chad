import { connectToDatabase } from "@ultils/Database";
import Prompt from "@models/prompt";

export const GET = async (req) => {
  try {
    await connectToDatabase();
    const prompts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts data", { status: 500 });
  }
};
