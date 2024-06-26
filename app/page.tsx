"use client"
import Typewriter from "typewriter-effect";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { useConvexAuth } from "convex/react";
import { SignInButton } from "@clerk/clerk-react";
import { Navbar } from "@/components/common/Navbar";


export default function Home() {

  const {isAuthenticated, isLoading}= useConvexAuth();
  return (
    <div className="min-h-screen grainy dark:bg-gradient-to-r dark:from-[#000000] dark:to-[#19436b] bg-gradient-to-r from-[#F5F5F5] to-[#F2EAD3]">
    <Navbar/>
    <div className=" grid grid-cols-2 gap-8 p-8 mt-10">
      <div className="col-span-1 flex flex-col justify-center">
        <h1 className="text-[#256C5D] dark:text-white font-semibold text-7xl text-center">
          Discover SecondMind
          <span className="font-bold text-[#3F2305] dark:text-[#F0EDCF]">
            <Typewriter
              options={{
                strings: ['create...', 'journal...', 'share...','live...'],
                autoStart: true,
                loop: true,
              }}
            /> 
          </span>{" "}
        </h1> 
        <div className="mt-6"></div>
        <h2 className="font-semibold text-3xl text-center text-[#0F1230] dark:text-[#40A2D8]"> 
          Exploit your full potential with AI by your side
        </h2>
        <div className="mt-8"></div>
        {isAuthenticated && !isLoading && (

          <div className="flex justify-center">
            <Link href="/dashboard">
              <Button className="bg-[#0F1230] dark:bg-[#F0EDCF] font-bold text-[#ffffff] dark:text-black">
                Go dashboard
                <ArrowRight className="ml-2 w-5 h-5" strokeWidth={3} />
              </Button>
            </Link>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center">
            <Button className="bg-[#0F1230] dark:bg-[#F0EDCF] font-bold">
              <Loader2/>
            </Button>
        </div>
        )}

        {!isAuthenticated && !isLoading && (
          <div className="flex justify-center">
              <SignInButton mode="modal">
                <Button className="bg-[#0F1230] dark:bg-[#F0EDCF] font-bold text-white dark:text-black">
                Try secondMind
                <ArrowRight className="ml-2 w-5 h-5" strokeWidth={3} />
              </Button>
              </SignInButton>
          </div>

        )}
      </div>

      {/* Columna de imagen */}
      <div className="col-span-1 mt-10">
        <img src="placeholder.png" alt="vendor" className="w-full" />
      </div>
    </div>
    <div className="text-center">
              [here goes pricing and stuff]
    </div>
    </div>
  );
}
