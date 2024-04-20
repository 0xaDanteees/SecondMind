"use client";

import { useOrigin } from "@/components/hooks/use-origin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { Check, Copy, Globe2 } from "lucide-react";
import { useState } from "react";

interface PublishProps{
    initialData: Doc<"documents">
}

export const Publish=({initialData}: PublishProps)=>{
    
    const origin = useOrigin();
    const update= useMutation(api.documents.updateNotes);

    const [isCopied, setIsCopied]=useState(false);
    const [isSubmitting, setIsSubmitting]= useState(false);

    const url= `${origin}/published/${initialData._id}`;

    const onPublic=()=>{
        setIsSubmitting(true);

        const promise = update({
            id: initialData._id,
            isPublished: true,
        })
        .finally(()=>setIsSubmitting(false));
    }
    const onPrivate=()=>{
        setIsSubmitting(true);

        const promise = update({
            id: initialData._id,
            isPublished: false,
        })
        .finally(()=>setIsSubmitting(false));
    }

    const onCopy=()=>{
        navigator.clipboard.writeText(url);
        setIsCopied(true);

        setTimeout(()=>{
            setIsCopied(false);
        }, 1000);
    }

    return (
    <Popover>
      <PopoverTrigger>
        <Button size={"sm"} variant={"ghost"}>
            {initialData.isPublished ? (
                <>
                <p>Sharing</p>
                <Globe2 className="text-green-500 animate-pulse w-4 h-4 ml-2" />
                </>
            ) : (
                <>
                <p>Share</p>
                <Globe2 className="text-gray-500 h-4 w-4 ml-2" />
                </>
            )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {!initialData.isPublished ? (
          <div className="flex flex-col items-center justify-center">
            <Globe2 className="h-8 w-8 text-muted-foreground mb-2 text-green-500" />
            <p className="text-sm font-medium mb-2">Publish your Note</p>
            <span className="text-xs text-muted-foreground mb-4">
              Share your work with others.
            </span>
            <Button
              size={"sm"}
              className="w-full text-sm bg-green-500"
              onClick={onPublic}
              disabled={isSubmitting}
            >
              Share
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <Globe2 className="text-green-500 h-4 w-4" />
              <p className="text-xs font-medium text-gray-500">
                Note published, you can copy the link below to share it.
              </p>
            </div>

            <div className="flex items-center">
              <input
                disabled
                value={url}
                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
              />
              <Button
                disabled={isCopied}
                onClick={onCopy}
                className="h-8 rounded-l-none"
              >
                {isCopied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button
              size="sm"
              className="w-full text-sm bg-red-500 font-semibold"
              onClick={onPrivate}
              disabled={isSubmitting}
            >
              Stop sharing
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};