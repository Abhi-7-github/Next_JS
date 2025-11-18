'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import MaterialButton from "@/components/MaterialButton";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col 
    bg-gradient-to-br from-gray-900 via-black to-gray-950 text-gray-100">

      {/* Hero Section */}
      <div className="flex flex-1 items-center justify-center p-6">

        <motion.div
          className="text-center p-10 bg-white/5 backdrop-blur-xl 
          rounded-2xl shadow-2xl max-w-md border border-white/10
          hover:border-cyan-400/30 hover:shadow-cyan-500/20
          transition-all duration-300"
          
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Title */}
          <motion.h1
            className="text-4xl font-extrabold mb-4
            bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400
            bg-clip-text text-transparent"
            
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            Welcome to the Lunaverse 🚀
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-gray-300 mb-8 text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Your gateway to a seamless experience.  
            Log in to explore your personalized dashboard.
          </motion.p>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <Link href="/signin">
              <MaterialButton
                className="text-lg px-7 py-3 shadow-lg hover:shadow-indigo-500/40 transition-all"
                color="indigo"
              >
                Login
              </MaterialButton>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
