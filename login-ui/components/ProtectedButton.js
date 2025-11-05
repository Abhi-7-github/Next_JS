"use client";

import { useSession } from "next-auth/react";

export default function ProtectedButton() {
  const { data: session } = useSession();

  if (session?.user?.role !== "admin") {
    return null;
  }

  return (
    <button className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition">
      🔒 Admin Only Button
    </button>
  );
}
