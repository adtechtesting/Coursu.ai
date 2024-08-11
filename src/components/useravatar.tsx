import { User } from "next-auth"
import { Avatar, AvatarFallback } from "./ui/avatar"
import Image from "next/image"


type UserProps={
    user:User
}

export const Useravatar = ({user}:UserProps) => {
  return (
   <Avatar>
     {user.image ? (
        <div className="relative w-full h-full aspect-square">
          <Image fill src={user.image} alt="user prefer" referrerPolicy="no-referrer"/>
        </div>
     ):(
        <AvatarFallback>
              <span className="sr-only">{user?.name}</span>
        </AvatarFallback>
     )}

   </Avatar>
  )
}


