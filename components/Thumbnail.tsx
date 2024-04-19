"use client"

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { useThumbnail } from "./hooks/use-thumbnail";
import { ImageIcon, SquareX } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";

interface ThumbnailProps {
    url?: string;
    preview?: boolean;
}

export const Thumbnail = ({url, preview}: ThumbnailProps)=>{
    
    const asThumbnail= useThumbnail();
    const removeThumbnail= useMutation(api.documents.removeThumbnail);
    const params= useParams();

    const {edgestore}=useEdgeStore();

    const onRemove= async ()=>{
        if(url){
            await edgestore.publicFiles.delete({url: url})
        }
        
        removeThumbnail({
            id: params.documentId as Id<"documents">
        });
    }

    return(
        <div className={cn(
            "relative w-full h-[42vh] group",
            !url && "h-[15vh]",
            url && "bg-muted"
        )}>
            {!!url && (
                <Image
                    src={url}
                    fill
                    alt="Thumbnail"
                    className="object-cover"
                />
            )}
            {url && !preview &&(
                <div className="items-center absolute gap-x-2 flex right-5 bottom-5 group-hover:opacity-100 opacity-0">
                    <Button
                        onClick={()=>asThumbnail.onReplace(url)}
                        variant="outline"
                        size="sm"
                        className="text-xs text-muted-foreground"
                    >
                        Edit
                        <ImageIcon className="h-4 w-4 ml-2"/>
                    </Button>
                    <Button
                        onClick={onRemove}
                        variant="outline"
                        size="sm"
                        className="text-xs text-muted-foreground"
                    >
                        Remove
                        <SquareX className="h-4 w-4 ml-2"/>
                    </Button>
                </div>
            )}
        </div>
    )
}