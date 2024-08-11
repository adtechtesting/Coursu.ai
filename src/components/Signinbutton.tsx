"use client"

import { signIn } from "next-auth/react"
import { Button } from "./ui/button"

 export const Signinbutton = () => {
  return (
   <Button variant="default" onClick={()=>{
    signIn("google")
   }}>
     Sign In
   </Button>
  )
}


