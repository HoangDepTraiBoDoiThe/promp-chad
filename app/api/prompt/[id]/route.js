import { connectToDatabase } from "@ultils/Database";
import Prompt from "@models/prompt";

// GET
export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompt data", { status: 500 });
  }
};

//PATCH
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDatabase();

    // Find the existing prompt by ID
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    // Update the prompt with new data
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response("Successfully updated the Prompts", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Prompt", { status: 500 });
  }
};

//DELETE
export const DELETE = async (req, { params }) => {
  try {
    await connectToDatabase();
    await Prompt.findByIdAndDelete(params.id);

    return new Response("Delete successfully.", { status: 200 });
  } catch (error) {
    return new Response(`Failed to Delete prompt: ${error}`, {
      status: 500,
    });
  }
};
