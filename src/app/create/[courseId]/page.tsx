/*

import { ConfirmChapters } from '@/components/ConfirmChapters'
import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { Info } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'

type Props={
    params:{
      courseId:string
    }
}

const page = async({params:{courseId}}:Props) => {
    const session=await getAuthSession()
    if(session?.user){
        return redirect("/gallery")
    }

    const course=await prisma.courses.findUnique({
        where:{
            id:courseId
        },include:{
            units:{
                include:{
                    chapters:true
                }
            }
        }
    })

    if(!course){
        return redirect("/create")
    }
  return (
    <div className='flex flex-col items-start max-w-xl mx-auto my-16 '>
      <h5 className='text-sm uppercase text-secondary-foreground/60'>
           Course Name
      </h5>
      <h1 className='text-5xl font-bold'>{course.name}</h1>
      
       <div className="flex p-4 mt-5 border-none bg-secondary">
        <Info className="w-12 h-12 mr-3 text-blue-400" />
        <div>
          We generated chapters for each of your units. Look over them and then
          click the Button to confirm and continue
        </div>
      </div>
      <ConfirmChapters course={course}></ConfirmChapters>
    </div>
  )
}

export default page
*/
import ConfirmChapters from "@/components/ConfirmChapters";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Info } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    courseId: string;
  };
};

const CreateChapters = async ({ params: { courseId } }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/gallery");
  }
  const course = await prisma.courses.findUnique({
    where: {
      id: courseId,
    },
    include: {
      units: {
        include: {
          chapters: true,
        },
      },
    },
  });
  if (!course) {
    return redirect("/create");
  }
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h5 className="text-sm uppercase text-gray-500 mb-2">Course Name</h5>
        <h1 className="text-4xl font-bold text-gray-800 mb-6">{course.name}</h1>

        <div className="flex items-start p-4 bg-blue-50 rounded-md mb-8">
          <Info className="w-6 h-6 mr-4 text-blue-500 flex-shrink-0 mt-1" />
         <p className="text-sm text-blue-700">
  We've generated chapters for each of your units. Please review them
  and click the button below to confirm and continue.
</p>

        </div>

        <ConfirmChapters course={course} />
      </div>
    </div>
  );
};

export default CreateChapters;