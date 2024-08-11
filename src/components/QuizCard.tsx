/*"use client "

import { cn } from '@/lib/utils'
import { Chapter, Question } from '@prisma/client'
import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'

type Props={
    chapter:Chapter &{
        questions:Question[];
    }
}

 const QuizCard = ({chapter}:Props) => {
    const [answers,setAnswers]=React.useState<Record<string,string>>({});
    const [questionState,setquestionState]=React.useState<Record<string,boolean |null>>({})

    const answer=React.useCallback(()=>{
        const newquestionState={...questionState};
        chapter.questions.forEach((question)=>{
            const user_answer=answers[question.id]
            if(!user_answer ) return;
            if(user_answer===question.answer){
                newquestionState[question.id]=true
            }else{
                newquestionState[question.id]=false
            }
            setquestionState(newquestionState)
        })
    },[answers,questionState,chapter.questions])
  return (
    <div className='flex-[1] mt-16 ml-8'>
     <h1 className='font-bold text-xl'>Concept Check</h1> 
        <div className=''>
             {chapter.questions.map((question)=>{
                const options=JSON.parse(question.options) as string[];
                return (
                    <div key={question.id} className={cn("p-3 mt-4 border border-secondary rounded-lg", {
                "bg-green-700": questionState[question.id] === true,
                "bg-red-700": questionState[question.id] === false,
                "bg-secondary": questionState[question.id] === null,
              })}>
                <h1 className='font-semibold text-lg'>
                     {question.question}
                </h1>
                  <div className='mt-2'>
             <RadioGroup onValueChange={(e)=>{
                setAnswers((prev)=>{
                    return {
                        ...prev,
                        [question.id] :e
                    }
                })
             }}>
               {options.map((option, index) => {
                    return (
                      <div className="flex items-center space-x-2" key={index}>
                        <RadioGroupItem
                          value={option}
                          id={question.id + index.toString()}
                        />
                        <Label htmlFor={question.id + index.toString()}>
                          {option}
                        </Label>
                      </div>
                    );
                  })}
             </RadioGroup>
                  </div>
                    </div>
                )
             })}
            </div> 
    </div>
  )
}
export default QuizCard;
*/
"use client";
import { cn } from "@/lib/utils";
import { Chapter, Question } from "@prisma/client";
import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

type Props = {
  chapter: Chapter & {
    questions: Question[];
  };
};

const QuizCards = ({ chapter }: Props) => {
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [questionState, setQuestionState] = React.useState<
    Record<string, boolean | null>
  >({});
  const checkAnswer = React.useCallback(() => {
    const newQuestionState = { ...questionState };
    chapter.questions.forEach((question) => {
      const user_answer = answers[question.id];
      if (!user_answer) return;
      if (user_answer === question.answer) {
        newQuestionState[question.id] = true;
      } else {
        newQuestionState[question.id] = false;
      }
      setQuestionState(newQuestionState);
    });
  }, [answers, questionState, chapter.questions]);
  return (
   <div className="flex-[1] mt-16 ml-8 bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 rounded-lg shadow-xl p-6 overflow-y-auto">
    <h1 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Concept Check</h1>
    <div className="mt-2 text-gray-800 dark:text-gray-200">
      {chapter.questions.map((question) => {
        const options = JSON.parse(question.options) as string[];
        return (
          <div
            key={question.id}
            className={cn("p-3 mt-4 border border-gray-200 dark:border-gray-700 rounded-lg", {
              "bg-green-100 dark:bg-green-800": questionState[question.id] === true,
              "bg-red-100 dark:bg-red-800": questionState[question.id] === false,
              "bg-gray-100 dark:bg-gray-800": questionState[question.id] === null,
            })}
          >
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{question.question}</h1>
            <div className="mt-2 text-gray-700 dark:text-gray-300">
              <RadioGroup
                onValueChange={(e) => {
                  setAnswers((prev) => {
                    return {
                      ...prev,
                      [question.id]: e,
                    };
                  });
                }}
              >
                {options.map((option, index) => {
                  return (
                    <div className="flex items-center space-x-2" key={index}>
                      <RadioGroupItem
                        value={option}
                        id={question.id + index.toString()}
                      />
                      <Label htmlFor={question.id + index.toString()} className="text-gray-700 dark:text-gray-300">
                        {option}
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>
          </div>
        );
      })}
    </div>
    <Button className="w-full mt-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full px-8 py-4 font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg" size="lg" onClick={checkAnswer}>
      Check Answer
      <ChevronRight className="w-4 h-4 ml-1" />
    </Button>
  </div>
  );
};

export default QuizCards;