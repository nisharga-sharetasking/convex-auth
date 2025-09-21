"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useAction } from "convex/react";
import { useState } from "react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const { signIn, signOut } = useAuthActions();

  const [recipeName, setRecipeName] = useState("");
  const [steps, setSteps] = useState<string[]>([]);

  const generateRecipe = useAction(api.recipes.generateRecipeSteps);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSteps([]);

    try {
      const result = await generateRecipe({ recipeName: recipeName.trim() });

      if (result.success && result.steps) {
        setSteps(result.steps);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h2>Auth</h2>

      <button
        onClick={() => signIn("google")}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Sign in with Google
      </button>

      <button
        onClick={() => signOut()}
        className="px-4 py-2 bg-gray-500 text-white rounded mt-4"
      >
        Sign out
      </button>

      <hr />

      <h1>Recipe Generator</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          placeholder="Enter recipe name (e.g., Chocolate Cake)"
        />

        <button type="submit">Submit</button>
      </form>

      <hr />

      {steps.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h2>Recipe Steps:</h2>
          <ol>
            {steps.map((step, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
