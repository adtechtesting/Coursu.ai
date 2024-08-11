 "use client"
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React from 'react'
import { Progress } from './ui/progress'
import { Button } from './ui/button'
import { Zap } from 'lucide-react'
  


export const SubscriptionActionCard = () => {
    const {data}=useSession()
    const [loading,setloading]=React.useState(false);
    const handleSubscribe=async()=>{
        setloading(true)
        try {
           const response=await axios.get("/api/stripe");
           window.location.href=response.data.url;

        } catch (error) {
           console.log("error",error)
        }finally{
            setloading(false)
        }
    }

  return (
    <div className='flex flex-col items-center w-1/2 mx-auto  p-4'>
       {data?.user.credits}/10 Free Trials
       <Progress className='mt-2' value={data?.user.credits ? (data.user.credits/10) *100:0} >
          <Button disabled={loading} onClick={handleSubscribe} className=' mt-3 font-bold text-white transition bg-gradient-to-tr from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600' >
           <Zap className='fill-white ml-2'></Zap>
          </Button>

       </Progress>
    </div>
  )
}


   