"use client";

import {Avatar, AvatarImage } from "@/components/ui/avatar";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { 
    DropdownMenu, DropdownMenuTrigger, 
    DropdownMenuContent, DropdownMenuLabel,
    DropdownMenuSeparator, DropdownMenuItem,
    DropdownMenuShortcut } 
from "@/components/ui/dropdown-menu";
import { ChevronsLeftRight, Command, Settings2 } from "lucide-react";
import Link from "next/link";
import { useSettings } from "@/components/hooks/use-settings";
import { Actions } from "./Actions";
import { useShortcuts } from "@/components/hooks/use-shortcuts";

const Profile= ()=>{

    const {user}=useUser();

    const Settings=useSettings();
    const Shortcuts= useShortcuts();


    return (
    <div className="flex">
    <DropdownMenu>
      <DropdownMenuTrigger >
        <div 
            role="button"
            className="flex items-center text-sm w-full hover:bg-primary/5 shadow-none "
        >
            <div className="gap-x-2 mr-3 flex items-center p-3 max-w-[150px]">
                <Avatar className="h-6 w-6">
                    <AvatarImage src={user?.imageUrl}/>
                </Avatar>
                <span className="text-start font-medium line-clamp-1 text-white">
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
               <Actions 
                onClick={Settings.onOpen}
                label="Settings"
                icon={Settings2}
               />
            <DropdownMenuShortcut className="text-xs"><span className="text-[0.7rem]">CTRL</span>S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Actions 
                onClick={Shortcuts.onOpen}
                label="Shortcuts"
                icon={Command}
               />
            <DropdownMenuShortcut className="text-xs"><span className="text-[0.7rem]">CTRL</span>H</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <Link href="/">
            <DropdownMenuItem className="w-full cursor-pointer text-muted-foreground text-red-600 hover:bg-primary/5">
            <SignOutButton asChild afterSignOut>
                Log Out
            </SignOutButton>
          </DropdownMenuItem>
          </Link>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
    )
}

export default Profile;



    


