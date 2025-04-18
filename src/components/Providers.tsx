"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import {QueryClient,QueryClientProvider}   from  "@tanstack/react-query"
import { SessionProvider } from "next-auth/react";


const queryclient=new QueryClient()
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
  <QueryClientProvider client={queryclient}>
    <NextThemesProvider {...props}>
       <SessionProvider>{children}</SessionProvider>
  
  </NextThemesProvider>
  </QueryClientProvider>
  )
}
