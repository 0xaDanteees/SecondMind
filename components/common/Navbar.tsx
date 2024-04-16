"use client";

import React from "react";
import { Logo } from "./logo";
import { ModeToggle } from "../mode-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useScrollTop } from "../hooks/use-scroll-top";
import { useConvexAuth } from "convex/react";

export const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "z-50 bg-background fixed top-0 flex items-center w-full p-6 justify-between",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Link href="/">
        <Logo/>
      </Link>
      <div className="flex items-center gap-x-2 ml-auto">
        {isLoading && <Loader2 />}

        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal" afterSignInUrl="/dashboard">
              <Button size={"sm"}  className="bg-[#40A2D8] font-extrabold text-white">
                Login
              </Button>
            </SignInButton>
            <SignInButton mode="modal" afterSignUpUrl="/dashboard">
              <Button size={"sm"} className="bg-[#F0EDCF] font-extrabold" >Sign Up</Button>
            </SignInButton>
          </>
        )}

        {isAuthenticated && !isLoading && (
          <>
            
            <UserButton afterSignOutUrl="/" />
            <ModeToggle />
          </>
        )}
      </div>
    </div>
  );
};