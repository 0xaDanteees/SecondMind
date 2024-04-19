"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel"
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { CircleEllipsis, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";


interface MenuProps {
    documentId: Id<"documents">;
};

export const Menu=({documentId}: MenuProps)=>{
    
    const router = useRouter();
    const {user}=useUser();

    const archive= useMutation(api.documents.archive)

    const onArchive=()=>{
        const promise = archive({id: documentId})

        router.push("/dashboard")
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                    <CircleEllipsis className="h-6 w-6"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-60"
                align="end"
                alignOffset={8}
                forceMount
            >
                <DropdownMenuItem>
                    <div className="text-xs text-muted-foreground">
                        Last edited: 
                    </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem className="text-red-500" onClick={onArchive}>
                    Delete
                    <Trash2 className="h-4 w-4 ml-auto"/>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

Menu.Skeleton = function MenuSkeleton(){
    return (
        <Skeleton className="h-9 w-9"/>
    )
}