import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Lexend_Deca({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learning App",
  description: "Learning App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "antialiased min-h-screen")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          
        >
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
             {children}
           
            </main>
            <Toaster></Toaster>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}