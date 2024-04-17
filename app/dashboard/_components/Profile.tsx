"use client";

import {Avatar, AvatarImage } from "@/components/ui/avatar";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { ChevronsLeftRight } from "lucide-react";
import Link from "next/link";

const Profile= ()=>{

    const {user}=useUser();
    return (
    <div className="flex">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div 
            role="button"
            className="flex items-center text-sm w-full hover:bg-primary/5 shadow-none "
        >
            <div className="gap-x-2 mr-3 flex items-center p-3 max-w-[150px]">
                <Avatar className="h-6 w-6">
                    <AvatarImage src={user?.imageUrl}/>
                </Avatar>
                <span className="text-start font-medium line-clamp-1">
                    {user?.firstName}'s workspace
                </span>
            </div>
            <ChevronsLeftRight className="rotate-90 mr-auto text-muted-foreground h-6 w-6"/>
        </div>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56" align="start" alignOffset={11} forceMount>
          <DropdownMenuLabel>My Profile</DropdownMenuLabel>
           <DropdownMenuSeparator />
            <DropdownMenuItem>
                <Avatar className="h-6 w-6">
                    <AvatarImage src={user?.imageUrl}/>
                </Avatar>
                <div className="flex flex-col space-y-4 p-2">
                <p className="text-xs font-medium leading-non text-muted-foreground">
                    {user?.emailAddresses[0].emailAddress}
                </p>
            </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Keyboard shortcuts
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <Link href="/">
          <DropdownMenuItem className="w-full cursor-pointer text-muted-foreground text-red-600 hover:bg-primary/5">
            
            <SignOutButton>
                Log Out
            </SignOutButton>
            
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
          </Link>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
    )
}

export default Profile;



    


