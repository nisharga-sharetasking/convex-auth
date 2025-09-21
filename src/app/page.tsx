"use client";

import { useAuthActions } from "@convex-dev/auth/react";

export default function Home() {
  const { signIn, signOut } = useAuthActions();

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
    </div>
  );
}
