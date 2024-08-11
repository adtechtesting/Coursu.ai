"use client";

import { cn } from '@/lib/utils'
import { Chapter, Courses, Unit } from '@prisma/client'
import Link from 'next/link'
import React from 'react'
import { Separator } from './ui/separator'
import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'

type Props = {
  course: Courses & {
    units: (Unit & {
      chapters: Chapter[]
    })[]
  }
  currentChapterId: string
}

export const CourseSideBar = ({ course, currentChapterId }: Props) => {
  return (
    <motion.div 
      initial={{ x: -400 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-[400px] absolute  top-0 bottom-0 bg-white dark:bg-gray-900 p-6 overflow-y-auto shadow-lg"
    >
      <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
        {course.name}
      </h1>
      {course.units.map((unit, unitIndex) => (
        <motion.div 
          key={unit.id} 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: unitIndex * 0.1 }}
          className="mb-6"
        >
          <h2 className="text-sm uppercase text-gray-500 dark:text-gray-400 mb-2">
            Unit {unitIndex + 1}
          </h2>
          <h2 className="text-xl font-bold mb-3">{unit.name}</h2>
          {unit.chapters.map((chapter, chapterIndex) => (
            <motion.div 
              key={chapter.id}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href={`/course/${course.id}/${unitIndex}/${chapterIndex}`}
                className={cn(
                  "flex items-center py-2 px-4 rounded-lg transition-colors",
                  {
                    "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300": chapter.id === currentChapterId,
                    "hover:bg-gray-100 dark:hover:bg-gray-800": chapter.id !== currentChapterId,
                  }
                )}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                <span className={cn(
                  "text-gray-700 dark:text-gray-300",
                  { "font-semibold": chapter.id === currentChapterId }
                )}>
                  {chapter.name}
                </span>
              </Link>
            </motion.div>
          ))}
          <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />
        </motion.div>
      ))}
    </motion.div>
  )
}
  /*
 import { cn } from "@/lib/utils";
import { Chapter, Courses, Unit } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { Separator } from "./ui/separator";

type Props = {
  course: Courses & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
  currentChapterId: string;
};

const CourseSideBar = async ({ course, currentChapterId }: Props) => {
  return (
    <div className="w-[400px] absolute top-1/2 -translate-y-1/2 p-6 rounded-r-3xl bg-secondary">
      <h1 className="text-4xl font-bold">{course.name}</h1>
      {course.units.map((unit, unitIndex) => {
        return (
          <div key={unit.id} className="mt-4">
            <h2 className="text-sm uppercase text-secondary-foreground/60">
              Unit {unitIndex + 1}
            </h2>
            <h2 className="text-2xl font-bold">{unit.name}</h2>
            {unit.chapters.map((chapter, chapterIndex) => {
              return (
                <div key={chapter.id}>
                  <Link
                    href={`/course/${course.id}/${unitIndex}/${chapterIndex}`}
                    className={cn("text-secondary-foreground/60", {
                      "text-green-500 font-bold":
                        chapter.id === currentChapterId,
                    })}
                  >
                    {chapter.name}
                  </Link>
                </div>
              );
            })}
            <Separator className="mt-2 text-gray-500 bg-gray-500" />
          </div>
        );
      })}
    </div>
  );
};

export default CourseSideBar;*/