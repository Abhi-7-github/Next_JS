'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Navbar from "@/components/Navbar";
import CourseCard from "@/components/CourseCard";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect non-admin users or unauthenticated users
  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "admin") {
      router.replace("/signin");
    }
  }, [session, status, router]);

  // Handle loading or unauthorized state
  if (status === "loading" || !session || session.user.role !== "admin") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-lg font-medium">Loading dashboard...</p>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex flex-col items-center justify-center text-center mt-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 mb-6">
          Welcome, <span className="font-semibold">{session?.user.name}</span>!  
          You are logged in as an <span className="font-semibold">Admin</span>.
        </p>
        <button
          onClick={() => signOut({ redirect: true, callbackUrl: "/signin" })}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <CourseCard
          title="React Basics"
          description="Learn the fundamentals of React.js with hands-on projects."
        />
        <CourseCard
          title="Next.js Mastery"
          description="Build full-stack apps using Next.js and modern APIs."
        />
        <CourseCard
          title="MongoDB & Mongoose"
          description="Understand schema design and build database-backed features."
        />
      </div>
    </div>
  );
}
