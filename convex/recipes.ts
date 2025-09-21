import { action } from "./_generated/server";
import { v } from "convex/values";
import OpenAI from "openai";

export const generateRecipeSteps = action({
  args: {
    recipeName: v.string(),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error("OpenAI API key is not configured");
    }

    const openai = new OpenAI({
      apiKey: apiKey,
    });

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful cooking assistant. Provide exactly 5 concise steps to make a recipe. Each step should be short and clear, maximum 1-2 sentences.",
          },
          {
            role: "user",
            content: `Give me 5 simple steps to make ${args.recipeName}. Format as numbered list (1. 2. 3. 4. 5.)`,
          },
        ],
        temperature: 0.7,
        max_tokens: 300,
      });

      const response = completion.choices[0].message.content;
      console.log("🚀 ~ response:", response)

      if (!response) {
        throw new Error("No response from OpenAI");
      }

      // Parse the response to extract steps
      const steps = response
        .split(/\d+\.\s/)
        .filter(step => step.trim())
        .slice(0, 5)
        .map(step => step.trim());

        console.log('steps', steps);

      return {
        success: true,
        steps: steps,
      };
    } catch (error) {
      console.error("Error generating recipe:", error);
      return {
        success: false,
        error: "Failed to generate recipe steps",
      };
    }
  },
});