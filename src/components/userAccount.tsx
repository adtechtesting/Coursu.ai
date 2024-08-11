"use client"

import { User } from "next-auth"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Useravatar } from "./useravatar"
import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"

type UserProps={
    user:User
}
export const UserAccount = ({user}:UserProps) => {
  return (
 <DropdownMenu>
    <DropdownMenuTrigger>
        <Useravatar user={user}></Useravatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
            {user?.name && <p className="font-medium">{user.name}</p>}
            {user?.email && (
              <p className="w-[200px] truncate text-sm text-secondary-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator></DropdownMenuSeparator>
        <DropdownMenuItem onSelect={()=>{
            signOut();
        }} className="text-red-600 cursor-pointer">
            Sign Out <LogOut className="w-4 h-4 ml-2"></LogOut>
        </DropdownMenuItem>
    </DropdownMenuContent>
 </DropdownMenu>
  )
}
