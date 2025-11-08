"use client";
import Link from "next/link";
import PowerButton from "./PowerButton";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-blue-600 text-white shadow-lg">
      <h1 className="text-xl font-bold">LMS Admin</h1>
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="hover:underline">Dashboard</Link>
        <PowerButton />
      </div>
    </nav>
  );
}
