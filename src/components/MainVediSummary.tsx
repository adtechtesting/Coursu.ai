import { Chapter, Unit } from "@prisma/client";
import React from "react";
import { Play, BookOpen } from "lucide-react"; 

type Props = {
  chapter: Chapter;
  unit: Unit;
  unitIndex: number;
  chapterIndex: number;
};

export const MainVideoSummary = ({
  unit,
  unitIndex,
  chapter,
  chapterIndex,
}: Props) => {
  return (
    <div className="flex-[2] mt-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-xl p-6 text-white">
      <div className="flex items-center space-x-2 text-indigo-400">
        <BookOpen size={20} />
        <h4 className="text-sm uppercase">
          Unit {unitIndex + 1} &bull; Chapter {chapterIndex + 1}
        </h4>
      </div>
      <h1 className="text-4xl font-bold mt-2 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
        {chapter.name}
      </h1>
      <div className="relative rounded-lg overflow-hidden shadow-md">
        <iframe
          title="chapter video"
          className="w-full aspect-video"
          src={`https://www.youtube.com/embed/${chapter.videoId}`}
          allowFullScreen
        />
       
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-semibold flex items-center space-x-2">
          <span className="text-indigo-400">#</span>
          <span>Summary</span>
        </h3>
        <p className="mt-4 text-gray-300 leading-relaxed">
          {chapter.summary}
        </p>
      </div>
    </div>
  );
};