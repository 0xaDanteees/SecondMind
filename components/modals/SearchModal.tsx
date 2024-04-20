"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useSearch } from "../hooks/use-searchbar";
import { useEffect, useState } from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { File } from "lucide-react";


export const SearchModal=()=>{
    const {user}=useUser();
    const router= useRouter();
    const documents= useQuery(api.documents.getSearch);
    const isOpen= useSearch((store)=>store.isOpen);
    const onClose= useSearch((store)=>store.onClose);
    const toggle= useSearch((store)=>store.toggle);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    }, []);

    useEffect(()=>{
        const down = (e: KeyboardEvent)=>{
            if (e.key==="f" && (e.metaKey || e.ctrlKey)){
                e.preventDefault();
                toggle();
            }
        }

        document.addEventListener("keydown", down);
        return()=>document.removeEventListener("keydown", down);
    }, [toggle]);

    const onSelect = (documentId: string)=>{
        router.push(`/dashboard/documents/${documentId}`);
        onClose();
    };

    if(!isMounted){
        return null;
    }

    return(

        <CommandDialog open={isOpen} onOpenChange={onClose}>
            <CommandInput placeholder={`Hi ${user?.firstName} navegate using your keyboard`}/>
            <CommandList>
                <CommandEmpty>No Notes found</CommandEmpty>
                <CommandGroup heading="Notes">
                    {documents?.map((note)=>(
                        <CommandItem 
                            key={note._id}
                            value={`${note._id}-${note.title}`}
                            title={note.title}
                            onSelect={()=>onSelect(note._id)}
                        >
                            {note.icon? (
                                <p className="ml-2 text-[18px]">{note.icon}</p>
                            ): (
                                <File className="ml-2 h-4 w-4"/>
                            )}
                            <span>
                                {note.title}
                            </span>
                            
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}