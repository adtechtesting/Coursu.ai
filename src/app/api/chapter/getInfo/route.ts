import { prisma } from "@/lib/db";
import { strict_output } from "@/lib/gpt";
import { getTranscript, getTranscriptQuestions, youtube_api } from "@/lib/youtube";

import { NextResponse } from "next/server";
import { z } from "zod";



const bodyParser = z.object({
  chapterId: z.string(),
});


export async function POST(req:Request,res:Response){
    try {
        const body=await req.json();
        const {chapterId}=bodyParser.parse(body)

        const chapter=await prisma.chapter.findUnique({
            where:{
                id:chapterId
            }
        })

        if(!chapter){
            return NextResponse.json({
                success:false,
                error:"chapter not found",
            },{
               status:404
            })
        }

     const vedioId=await youtube_api(chapter.youtubeSearchquery);
     let transcript=await getTranscript(vedioId);
     let maxLenght=500;
     transcript=transcript.split(" ").slice(0,maxLenght).join(" ");

     const {summary}:{summary:string}=await strict_output(
        "You are an AI capable of summarising a youtube transcript",
      "summarise in 250 words or less and do not talk of the sponsors or anything unrelated to the main topic, also do not introduce what the summary is about.\n" +
        transcript,
      { summary: "summary of the transcript" })
     
      const questions=await getTranscriptQuestions(
        transcript,
        chapter.name)
         
   await prisma.question.createMany({
      data: questions.map((question) => {
        let options = [
          question.answer,
          question.option1,
          question.option2,
          question.option3,
        ];
        options = options.sort(() => Math.random() - 0.5);
        return {
          question: question.question,
          answer: question.answer,
          options: JSON.stringify(options),
          chapterId: chapterId,
        };
      }),
    });
        await prisma.chapter.update({
      where: { id: chapterId },
      data: {
        videoId: vedioId,
        summary: summary,
      },
    });

    return NextResponse.json({ success: true });
    } catch (error) {
        if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid body",
        },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "unknown",
        },
        { status: 500 }
      );
    }
    }
}