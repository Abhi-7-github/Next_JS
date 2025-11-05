'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "admin") {
      router.replace("/signin");
    }
  }, [session, status, router]);

  if (status === "loading" || !session || session.user.role !== "admin") {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl text-black font-bold mb-4">Admin Dashboard</h1>
        <p className="mb-6 text-black">
          Welcome, {session?.user.name}! You are logged in as an admin.
        </p>
        <button
          onClick={() => signOut({ redirect: true, callbackUrl: "/signin" })}
          className="text-red-600 hover:underline"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
