"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel"
import { updateNotes } from "@/convex/documents";
import { useMutation } from "convex/react";
import { useRef, useState } from "react";


interface TitleProps {
    initialData: Doc<"documents">;
};

export const Title=({initialData}: TitleProps)=>{

    const mutable= useMutation(api.documents.updateNotes)
    const [isEditing, setIsEditing]= useState(false);
    const [title, setTitle]=useState(initialData.title || "untitled");

    const inputRef= useRef<HTMLInputElement>(null);

    const enableInput=()=>{
        setTitle(initialData.title);
        setIsEditing(true);
        setTimeout(()=>{
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
        })
    }

    const disableInput=()=>{
        setIsEditing(false);
    }

    const onChange=(
        event: React.ChangeEvent<HTMLInputElement>
    )=>{
        setTitle(event.target.value);
        mutable({
            id: initialData._id,
            title: event.target.value || "Untitled"
        });
    };

    const down= (
        event: React.KeyboardEvent<HTMLInputElement>
    )=>{
        if(event.key==="Enter"){
            disableInput();
        }
    }
    return (
        <div className="flex items-center gap-x-1">
            {!!initialData.icon && <p>{initialData.icon}</p>}
            {isEditing? (
                <Input
                    ref={inputRef}
                    onClick={enableInput}
                    onBlur={disableInput}
                    onChange={onChange}
                    onKeyDown={down}
                    value={title}
                    className="h-7 px-2 focus-visible: ring-transparent"
                />
            ): (
                <Button
                    onClick={enableInput}
                    className="h-auto p-1 font-normal"
                    variant="ghost"
                    size="sm"
                >
                    {initialData?.title}
                </Button>
            )}
        </div>
    )
};

Title.Skeleton= function TitleSkeleton(){
    return (
        <Skeleton className="h-9 w-16 rounded-md"/>
    )
};