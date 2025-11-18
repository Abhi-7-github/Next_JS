'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Navbar from "@/components/Navbar";
import CourseCard from "@/components/CourseCard";
import Footer from "@/components/Footer";
import MaterialButton from "@/components/MaterialButton";

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
    return (
      <div className="flex justify-center items-center min-h-screen 
      bg-gradient-to-br from-gray-900 via-black to-gray-950">
        <p className="text-gray-300 text-lg font-medium animate-pulse">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col 
    bg-gradient-to-br from-gray-900 via-black to-gray-950 text-gray-100">

      {/* Glass Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white/5 backdrop-blur-lg border-b border-white/10 shadow-lg">
        <Navbar />
      </div>

      <div className="flex-1 pt-24">
        
        {/* Welcome Section */}
        <div className="flex flex-col items-center justify-center text-center mt-8 px-6">
          <h1 className="text-4xl font-extrabold 
          bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400
          bg-clip-text text-transparent">
            Admin Dashboard
          </h1>

          <p className="text-gray-400 mt-3 mb-6 text-lg">
            Welcome, <span className="font-semibold text-cyan-300">{session?.user.name}</span>!  
            <br />
            You are logged in as an <span className="font-semibold text-purple-300">Administrator</span>.
          </p>

          <MaterialButton
            color="red"
            onClick={() => signOut({ redirect: true, callbackUrl: "/signin" })}
            className="shadow-lg hover:shadow-red-500/40 transition-all"
          >
            Logout
          </MaterialButton>
        </div>

        {/* Courses Section */}
        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          <CourseCard
            title="React Basics"
            description="Learn React fundamentals with UI projects."
            className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 transition-all shadow-lg hover:shadow-cyan-500/30"
          />

          <CourseCard
            title="Next.js Mastery"
            description="Master full-stack app development with Next.js."
            className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-400/40 transition-all shadow-lg hover:shadow-purple-500/30"
          />

          <CourseCard
            title="MongoDB & Mongoose"
            description="Build database-driven features using schemas."
            className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-pink-400/40 transition-all shadow-lg hover:shadow-pink-500/30"
          />

        </div>
      </div>

      {/* Glass Footer */}
      <div className="mt-10 bg-white/5 backdrop-blur-xl border-t border-white/10 shadow-inner">
        <Footer />
      </div>
    </div>
  );
}
