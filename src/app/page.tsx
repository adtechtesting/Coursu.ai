"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 transition-colors duration-300 p-2">
     
      
      <div className="flex items-center justify-center min-h-screen w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.4,
            duration: 0.9,
            ease: "easeInOut",
          }}
          className="relative flex flex-col  items-center justify-center text-gray-800 dark:text-gray-200 max-w-4xl"
        >
          <h1 className="text-2xl md:text-7xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 drop-shadow-lg">
            AI-Powered Course Generator
          </h1>
          <p className="font-light text-xl md:text-3xl py-4 text-center text-gray-700 dark:text-gray-300">
            Transform your learning experience with Coursu: AI-generated courses tailored just for you.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/create")}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full px-8 py-4 font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg"
          >
            Start Learning Now
          </motion.button>
          <div className="mt-12 flex gap-6 hidden">
            <FeatureCard icon="🚀" title="Personalized Learning" description="Courses tailored to your pace and style" />
            <FeatureCard icon="🧠" title="AI-Powered" description="Cutting-edge AI generates unique content" />
            <FeatureCard icon="📊" title="Track Progress" description="Monitor your growth with detailed analytics" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }:any) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
    </div>
  );
}