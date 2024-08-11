import React from "react";
import { getAuthSession } from "@/lib/auth"
import { redirect } from "next/navigation";
import { InfoIcon } from "lucide-react";
import { Card, CardBody } from "@nextui-org/react";
import CreateCourseForm from "@/components/CreateCourseForm";
import { checkSubscription } from "@/lib/subscription";


const Createpage = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
   const isPro=await checkSubscription()

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 transition-colors duration-300 py-16 px-4 sm:px-6 lg:px-8 p-2">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full">
          <CardBody className="flex items-start">
            <InfoIcon className="w-6 h-6 text-blue-500 dark:text-blue-400 mr-4 flex-shrink-0 mt-1" />
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Enter a course title or what you want to learn about. Then enter a
              list of units, which are the specifics you want to learn. Our AI
              will generate a course for you!
            </p>
          </CardBody>
        </Card>
        
        <CreateCourseForm isPro={isPro} />
      </div>
    </div>
  )
}

export default Createpage;