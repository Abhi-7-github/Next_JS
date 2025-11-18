"use client";
import Link from "next/link";
import PowerButton from "./PowerButton";

export default function Navbar() {
  return (
    <nav className="w-full 
      bg-white/5 backdrop-blur-xl 
      border-b border-white/10 
      shadow-lg">
      
      <div className="mx-auto max-w-6xl px-6 py-3 
        flex justify-between items-center">
        
        {/* Brand */}
        <h1 className="text-xl font-extrabold tracking-wide 
          bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 
          bg-clip-text text-transparent">
          LMS Admin
        </h1>

        {/* Links + Power Button */}
        <div className="flex items-center gap-6 text-gray-200">

          <Link
            href="/admin-dashboard"
            className="hover:text-cyan-300 transition-colors duration-200"
          >
            Dashboard
          </Link>

          <PowerButton />
        </div>
      </div>
    </nav>
  );
}
