'use client';

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-200 via-blue-100 to-indigo-200 text-gray-800">
      <motion.div
        className="text-center p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1
          className="text-4xl font-extrabold mb-4 text-blue-700"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          Welcome to the App 🌟
        </motion.h1>
        <p className="text-gray-600 mb-8 text-lg">
          Your gateway to seamless experience. Please log in to continue.
        </p>
        <Link
          href="/signin"
          className="inline-block px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          Login
        </Link>
      </motion.div>
    </div>
  );
}
