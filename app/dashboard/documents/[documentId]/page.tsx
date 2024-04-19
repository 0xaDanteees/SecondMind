"use client"

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Toolbar } from "../../_components/Toolbar";
import { Thumbnail } from "@/components/Thumbnail";


interface NotePage {
    params: {
        documentId: Id<"documents">;
    }
}

const NotePage=({params}: NotePage)=>{
    
    const document = useQuery(api.documents.getById, {
        documentId: params.documentId
    });
    
    if(document===undefined){
        return(
            <div>
            Loading...
        </div>
        )
    }

    if(document === null){
        return <div>Not pages found</div>
    }
    return (
        <div className="pb-40">
            <Thumbnail url={document.thumbnail}/>
            <div className="h-[9vh]"/>
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <Toolbar initialData= {document}/>
            </div>
        </div>   
    )
}

export default NotePage;