" use client "
import SubscriptionButton from "@/components/SubscriptionButton";
import { checkSubscription } from "@/lib/subscription";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import React from "react";

type Props = {};

const SettingsPage = async (props: Props) => {
  const isPro = await checkSubscription();
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 transition-colors duration-300 p-20">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl md:text-7xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 drop-shadow-lg mb-8">Settings</h1>
        <div className="flex justify-center items-center mb-8">
          <h2 className="text-xl md:text-3xl font-light text-center text-gray-700 dark:text-gray-300">
            {isPro ? "You are a Pro user" : "You are a Free user"}
          </h2>
        </div>
        <SubscriptionButton isPro={isPro} />
        
        <div className="mt-8">
          <h2 className="text-2xl mb-4 text-center">Quick Actions</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <Link href="/">
              <Button className="">
                Home Page <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Link href="/create">
              <Button>
                New Chat  <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
