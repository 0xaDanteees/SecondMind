"use client"

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Thumbnail } from "@/components/Thumbnail";
import { Skeleton } from "@/components/ui/skeleton";
import Editor from "@/components/Editor";
import { Toolbar } from "@/app/dashboard/_components/Toolbar";
import { Navbar } from "@/components/common/Navbar";


interface NotePage {
    params: {
        documentId: Id<"documents">;
    }
}

const NotePage=({params}: NotePage)=>{
    
    const document = useQuery(api.documents.getById, {
        documentId: params.documentId
    });
    
    const update = useMutation(api.documents.updateNotes);

    const onChange = (content) => {
        update({
        id: params.documentId,
        content,
        });
    };

    if(document===undefined){
        return(
            
            <div>
            <Thumbnail.Skeleton/>
            <div className="mx-auto mt-10 md:max-3xl lg:max-w-4xl">
                <div className="pt-4 pl-8 space-y-4">
                    <Skeleton className="h-16 w-[50%]"/>
                </div>
            </div>
            </div>
        )
    }

    if(document === null){
        return <div>Not pages found</div>
    }
    return (
        <div className="pb-40 dark:bg-[#1F1F1F]">
            <Navbar/>
            <div className="py-15">
                <Thumbnail preview url={document.thumbnail}/>
            <div className="h-[9vh]"/>
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <Toolbar preview initialData= {document}/>
                <Editor editable={false} onChange={onChange} initialContent={document.content} />
            </div>
            </div>
        </div>   
    )
}

export default NotePage;