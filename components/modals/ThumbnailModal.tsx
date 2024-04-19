"use client"

import { useEdgeStore } from "@/lib/edgestore";
import { useThumbnail } from "../hooks/use-thumbnail"
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { SingleImageDropzone } from "@/components/ImageDropzone"; //this wouldnt work with ../ for some reason lol

export const ThumbnailModal= ()=>{

    const thumbnail= useThumbnail();
    const { edgestore }= useEdgeStore();
    const [file, setFile]=useState<File>();
    const [isSubmitting, setIsSubmitting]=useState(false);

    const update = useMutation(api.documents.updateNotes)
    const params = useParams();

    const onChange= async (file?: File)=>{
        if(file){
            setIsSubmitting(true);
            setFile(file);

            
            const response= await edgestore.publicFiles.upload({
                    file,
                    options: {
                        replaceTargetUrl: thumbnail.url,
                    }
                });
                
            await update({
                id: params.documentId as Id<"documents">,
                thumbnail: response.url
            })
            onClose();
        }
    }

    const onClose=()=>{
        setFile(undefined);
        setIsSubmitting(false);
        thumbnail.onClose();
    }

    return(
        <Dialog open={thumbnail.isOpen} onOpenChange={thumbnail.onClose}>
            <DialogContent>
                <DialogHeader>
                    <h2 className="text-center text-lg font-semibold">
                        Thumbnail
                    </h2>
                </DialogHeader>
                <div>
                    <SingleImageDropzone
                        onChange={onChange}
                        value={file}
                        disabled={isSubmitting}
                        className="w-full outline-none"
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}