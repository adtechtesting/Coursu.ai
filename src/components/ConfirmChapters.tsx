/*import { Chapter, Courses, Unit } from "@prisma/client"
import React from "react";
import { ChapterCard, ChapterCardHandler } from "./ChapterCard";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";


type Props={
    course:Courses &{
        units:(Unit &{
            chapters:Chapter[]
        })[];
    };
};

export const ConfirmChapters = ({course}:Props) => {
    const [loading,setLoading]=React.useState(false)
    const chapterRefs:Record<string,React.RefObject<ChapterCardHandler>>={}

    course.units.forEach((unit)=>{
      unit.chapters.forEach((chapter)=>{
            // eslint-disable-next-line react-hooks/rules-of-hooks
        chapterRefs[chapter.id]=React.useRef(null);
      })
    })

    const [completedChapters,setCompletedChapters]=React.useState<Set<String>>(new Set());

    const totalChapterCount=React.useMemo(()=>{
      return course.units.reduce((acc,unit)=>{
        return acc +unit.chapters.length;
      },0)
    },[course.units]);
            //@ts-ignore
    console.log(totalChapterCount,setCompletedChapters.size);

  return (
    <div className="w-full mt-4">
       {course.units.map((unit,unitIndex)=>{
        return (
          <div key={unit.id} className="mt-5">
               <h2 className="text-sm uppercase text-secondary-foreground/60">
                   Units {unitIndex+1}
               </h2>
               <h3 className="text-2xl font-bold ">{unit.name}</h3>
               <div className="mt-3  ">
                   {unit.chapters.map((chapter,chapterIndex)=>{
                    return (
                      <ChapterCard completedChapters={completedChapters} setCompletedChapters={setCompletedChapters } ref={chapterRefs[chapter.id]} key={chapter.id } chapter={chapter} chapterIndex={chapterIndex}>

                      </ChapterCard>
                    )
                   })}
               </div>
          </div>
        )
       })}
       <div className="flex flex-col justify-center mt-4 "> 
        <Separator className="flex-[1]"/>
         <div className="flex items-center mx-4   ">
           <Link href="/create" className={buttonVariants({
              variant: "secondary",
            })}>
            <ChevronLeft className="w-4 h-4 mr-2 " />
               Back
           </Link>
           {totalChapterCount===completedChapters.size ?(
            <Link  className={buttonVariants({
                className: "ml-4 font-semibold",
              })}
              href={`/course/${course.id}/0/0`}>
                Save & Continue
                   <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
           ):<Button type="button" className="ml-4 font-semibold" disabled={loading} onClick={()=>{
            setLoading(true);
            Object.values(chapterRefs).forEach((ref)=>{
              ref.current?.triggerLoad();
            })
           }}>

            Generate
            </Button>}
           
         </div>
         <Separator className="flex-[1]" />
       </div>
    </div>
  )
}
  */

"use client";
import { Chapter, Courses, Unit } from "@prisma/client";
import React from "react";
import ChapterCard, { ChapterCardHandler } from "./ChapterCard";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  course: Courses & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
};

const ConfirmChapters = ({ course }: Props) => {
  const [loading, setLoading] = React.useState(false);
  const chapterRefs: Record<string, React.RefObject<ChapterCardHandler>> = {};
  course.units.forEach((unit) => {
    unit.chapters.forEach((chapter) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      chapterRefs[chapter.id] = React.useRef(null);
    });
  });
  const [completedChapters, setCompletedChapters] = React.useState<Set<String>>(
    new Set()
  );
  const totalChaptersCount = React.useMemo(() => {
    return course.units.reduce((acc, unit) => {
      return acc + unit.chapters.length;
    }, 0);
  }, [course.units]);
  console.log(totalChaptersCount, completedChapters.size);
  return (
    <div className="w-full mt-4 bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 transition-colors duration-300 py-16 px-4 sm:px-6 lg:px-8">
      {course.units.map((unit, unitIndex) => {
        return (
          <div key={unit.id} className="mt-5">
            <h2 className="text-sm uppercase text-secondary-foreground/60">
              Unit {unitIndex + 1}
            </h2>
            <h3 className="text-2xl font-bold">{unit.name}</h3>
            <div className="mt-3">
              {unit.chapters.map((chapter, chapterIndex) => {
                return (
                  <ChapterCard
                    completedChapters={completedChapters}
                    setCompletedChapters={setCompletedChapters}
                    ref={chapterRefs[chapter.id]}
                    key={chapter.id}
                    chapter={chapter}
                    chapterIndex={chapterIndex}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
      <div className="flex items-center justify-center mt-4">
        <Separator className="flex-[1]" />
        <div className="flex items-center mx-4">
          <Link
            href="/create"
            className={buttonVariants({
              variant: "secondary",
            })}
          >
            <ChevronLeft className="w-4 h-4 mr-2" strokeWidth={4} />
            Back
          </Link>
          {totalChaptersCount === completedChapters.size ? (
            <Link
              className={buttonVariants({
                className: "ml-4 font-semibold",
              })}
              href={`/course/${course.id}/0/0`}
            >
              Save & Continue
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          ) : (
            <Button
              type="button"
              className="ml-4  bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full py-3 font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg"
              disabled={loading}
              onClick={() => {
                setLoading(true);
                Object.values(chapterRefs).forEach((ref) => {
                  ref.current?.triggerLoad();
                });
              }}
            >
              Generate
              <ChevronRight className="w-4 h-4 ml-2" strokeWidth={4} />
            </Button>
          )}
        </div>
        <Separator className="flex-[1]" />
      </div>
    </div>
  );
};

export default ConfirmChapters;

