import { getAuthSession } from "@/lib/auth"
import Image from "next/image"
import Link from "next/link";
import { UserAccount } from "./userAccount";
import { Signinbutton } from "./Signinbutton";
import { ModeToggle } from "./theme-provider";

export const Navbar = async() => {
  const session = await getAuthSession();
  return (
    <nav className="bg-gradient-to-r from-blue-50 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 text-gray-800 dark:text-gray-200 top-0 inset-x-0 h-fit fixed border-b border-gray-300 dark:border-gray-700 z-10 shadow-md transition-colors duration-300">
      <div className="flex items-center justify-between h-14 px-8 mx-auto max-w-7xl">
        <Link href="/" className="items-center gap-3 hidden sm:flex">
          <Image
            src="/icon.png"
            width="45"
            height="45"
            alt="logo"
            className="rounded-full"
          />
          <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">AI Course Gen</span>
        </Link>
        <div className="flex items-center space-x-8">
          <Link href="/gallery" className="font-semibold text-lg hover:text-blue-600 dark:hover:text-purple-400 transition-colors">
           My Courses
          </Link>
          {session?.user && (
            <>
              <Link href="/create" className="font-semibold text-lg hover:text-blue-600 dark:hover:text-purple-400 transition-colors">
                Create Course
              </Link>
               <Link href="/settings" className="font-semibold text-lg hover:text-blue-600 dark:hover:text-purple-400 transition-colors">
                Settings
              </Link>
            
            </>
          )}
          <ModeToggle />
          <div className="flex items-center ml-4">
            {session?.user ? (
              <UserAccount user={session.user} />
            ) : (
              <Signinbutton />
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}