"use client"

import { Doc } from "@/convex/_generated/dataModel"
import { Emojis } from "./Emojis";
import { Button } from "@/components/ui/button";
import { ImagePlus, SmilePlus, X } from "lucide-react";
import React, { ElementRef, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import TextareaAutosize from "react-textarea-autosize";

interface ToolbarProps{
    initialData: Doc<"documents">;
    preview?: boolean;
}

export const Toolbar= ({initialData, preview}: ToolbarProps)=>{
   
    const [isEditing, setIsEditing]=useState(false);
    const [value, setValue]=useState(initialData.title);
    const inputRef= useRef<ElementRef<"textarea">>(null);

    const mutable = useMutation(api.documents.updateNotes);
    const removeEmoji = useMutation(api.documents.removeIcon);

    const enableInput=()=>{
        if (preview) return;

        setIsEditing(true);
        setTimeout(()=>{
            setValue(initialData.title);
            inputRef.current?.focus();
        },0);
    };

    const disableInput=()=>{
        setIsEditing(false);
    }

    const onInput = (value: string)=>{
        setValue(value);
        mutable({
            id: initialData._id,
            title: value || "untitled"
        });
    }

    const down= (
        event: React.KeyboardEvent<HTMLTextAreaElement>
    )=>{
        if(event.key==="Enter"){
            event.preventDefault();
            disableInput();
        }
    }

    const onEmojiSelect= (icon: string)=>{
        mutable({
            id: initialData._id,
            icon,
        });
    }

    const onRemoveEmoji =()=>{
        removeEmoji({
            id: initialData._id,
        })
    }

    return (
        <div className="pl-[54px] group relative">
            {!!initialData.icon && !preview && (
                <div className="flex items-center gap-x-2 group/icon pt-6">
                    <Emojis onChange={onEmojiSelect}>
                        <p className="text-6xl hover:opacity-80 transition">
                            {initialData.icon}
                        </p>
                    </Emojis>
                    <Button 
                        variant="outline"
                        size="icon"
                        className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
                        onClick={onRemoveEmoji}
                    >
                        <X className="h-4 w-4"/>
                    </Button>
                </div>
            )}
            {!!initialData.icon && preview && (
                <p className="text-6xl pt-6">
                    {initialData.icon}
                </p>
            )}
            <div className="flex itemes-center gap-x-1 py-4 opacity-100 group-hover:opacity-100">
                {!initialData.icon && !preview && (
                    <Emojis asChild onChange={onEmojiSelect}>
                        <Button
                            className="text-muted-foreground text-xs"
                            variant="outline"
                            size="sm"
                        >   
                            Emojis
                            <SmilePlus className="h-4 w-4 ml-2"/>
                        </Button>
                    </Emojis>
                )}
                {!initialData.thumbnail && !preview && (

                    <Button
                        className="text-muted-foreground text-xs"
                        variant="outline"
                        size="sm"
                        onClick={()=>{}}
                    >
                        Thumbnail
                        <ImagePlus className="h-4 w-4 ml-2"/>
                    </Button>
                )}
            </div>
            {isEditing && !preview ? (
                <TextareaAutosize
                    ref={inputRef}
                    onBlur={disableInput}
                    onKeyDown={down}
                    onChange={(event)=>onInput(event.target.value)}
                    value={value}
                    className="text-5xl bg-transparent font-extrabold break-words outline-none resize-none"
                />
            ): (
                <div
                    onClick={enableInput}
                    className="text-5xl bg-transparent font-extrabold break-words outline-none resize-none pb-[9px]"
                >
                    {initialData.title}
                </div>
            )}
        </div>
    )
}