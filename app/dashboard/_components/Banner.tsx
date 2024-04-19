"use client"

import { ConfirmModal } from "@/components/modals/ConfirmModal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel"
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";

interface BannerProps{
    documentId: Id<"documents">;
}

export const Banner = ({documentId}: BannerProps)=>{
    
    const router= useRouter();
    const remove= useMutation(api.documents.deleteNote);
    const restore = useMutation(api.documents.restore);

    const onRemove=()=>{
        const promise = remove({id: documentId})
        router.push("/dashboard")
    }

    const onRestore=()=>{
        const promise = restore({id: documentId})
        
    }
    
    return (
        <div className="w-full bg-red-500 text-center text-sm p-2 text-black flex justify-center items-center gap-x-2">
            <p className="font-medium text-[1.1rem]">
                This Note is Recycle Bin, you want to restore it?
            </p>
            <Button onClick={onRestore} variant="destructive" className="border-black bg-gray-600 hover:bg-primary/20 text-white hover:text-white p-1 px-2 h-auto font-normal">
                Restore
            </Button>
            <ConfirmModal onConfirm={onRemove}>
                <Button variant="destructive" className="border-black  bg-black hover:bg-primary/20 text-red-600 hover:text-red-600 p-1 px-2 h-auto font-normal">
                    Delete
                </Button>
            </ConfirmModal>
        </div>
    )
}