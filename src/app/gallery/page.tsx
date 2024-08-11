import React from "react";
import { prisma } from "@/lib/db";
import GalleryCourseCard from "@/components/Gallerycard";

type Props = {};

const GalleryPage = async (props: Props) => {
  const courses = await prisma.courses.findMany({
    include: {
      units: {
        include: { chapters: true },
      },
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 transition-colors duration-300">
      <div className="py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <h1 className="text-2xl md:text-7xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 drop-shadow-lg">Courses</h1>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.map((course, index) => (
            <GalleryCourseCard key={index} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
