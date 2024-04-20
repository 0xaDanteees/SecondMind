"use client"

import { DropdownMenu,DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { ChevronDown, ChevronRight, LucideIcon, MoreHorizontal, PlusCircle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface ActionsProps {
    id?:Id<"documents">;
    label: string;
    level?: number;
    expanded?: boolean;
    active?: boolean;
    documentIcon?: string;
    isSearch?: boolean;
    onClick?: ()=>void;
    onExpand?: ()=>void;
    icon: LucideIcon;
}

export const Actions=({
    id, label,
    onClick, icon: Icon,
    active, documentIcon,
    isSearch, level=0,
    onExpand, expanded,
}: ActionsProps)=>{

    const router= useRouter();
    const create= useMutation(api.documents.create);
    const archive= useMutation(api.documents.archive);


    const handleExpand=(
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    )=>{
        event.stopPropagation();
        onExpand?.();
    }

    const onCreate=(
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    )=>{
        event.stopPropagation();
        if (!id) return;
        const promise = create({title: "New Note", parentDocument: id})
        .then((documentId)=>{
            if(!expanded){
                onExpand?.();
            }
            router.push(`/dashboard/documents/${documentId}`);
        });

    }

    const onArchive=(
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    )=>{
        event.stopPropagation();
        if (!id) return;
        const promise = archive({id})
        .then(()=>router.push("/dashboard/"))
    }

    const ChevronIcon = expanded? ChevronDown : ChevronRight;

    return(
        <div
            onClick={onClick}
            role="button"
            style={{paddingLeft: level ? `${(level * 12)+12}px`: "12px"}}
            className={cn(
                "group min-h[27px] py-1 pr-3 w-full flex items-center text-muted-foreground text-sm font-medium hover:bg-primary/5 ",
                active && "bg-primary/5 text-primary"
            )}
        >
            {!!id && (
                <div
                    role="button"
                    onClick={handleExpand}
                    className="h-full rounded-sm hover:bg-primary/30"
                >
                    <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/80"/>
                </div>
            )}

            {documentIcon? (
                <div className="shrink-0 mr-2 text-[18px]">
                    {documentIcon}
                </div>
            ): (
                <Icon className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground"/>
            )}
            
            <span className="truncate">
                {label}
            </span>

            {isSearch && (
                <kbd className="ml-auto pointer-events-none inline-flex select-none items-center rounded border bg-muted h-5 gap-1 px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-sm">CTRL F</span>
                </kbd>
            )}

            {!!id && (
                <div className="ml-auto flex items-center gap-x-2">
                    
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            onClick={(e)=>e.stopPropagation()}
                            asChild
                        >
                            <div
                                role="button"
                                className="h-full ml-auto rounded-sm opacity-0 group-hover:opacity-80 hover: bg-primary/20"
                            >
                                <MoreHorizontal className="h-4 w-4 text-muted-foreground"/>
                            </div>  
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-60"
                            align="start"
                            side="right"
                            forceMount
                        >
                            <DropdownMenuItem onClick={onArchive} className="text-red-500">
                                Delete
                                <Trash2 className="h-4 w-4 ml-auto"/>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <div className="text-xs text-muted-foreground p-2">
                                Last edited: 
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    
                    <div 
                        role="button"
                        onClick={onCreate}
                        className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-primary/30"
                    >
                        <PlusCircle className="h-4 w-4 text-muted-foreground"/>
                    </div>
                </div>
            )}
    </div>
    )
}

Actions.Skeleton = function ActionsSkeleton({level}: {level?:number}){
    return (
        <div
            className="flex gap-x-2 py-[3px]"
            style={{
                paddingLeft: level ? `${(level*12)+25}px`: "12px"
            }}
        >
            <Skeleton className="h-6 w-6"/>
            <Skeleton className="h-4 w-[30%]"/>

        </div>
    )
}