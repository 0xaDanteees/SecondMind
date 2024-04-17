"use client"

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Actions } from "./Actions";
import { cn } from "@/lib/utils";
import { StickyNoteIcon } from "lucide-react";


interface NotesProps{
    parentDocumentId?: Id<"documents">;
    level?:number;
    data?: Doc<"documents">;
}


export const Notes=({
    parentDocumentId, level=0
}: NotesProps)=>{

    const params = useParams();
    const router= useRouter();
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const onExpand = (documentId: string)=>{
        setExpanded(prevExpanded=>({
            ...prevExpanded,
            [documentId]: !prevExpanded[documentId]
        }));
    }

    const documents = useQuery(api.documents.getSidebar, {
        parentDocument: parentDocumentId
    });

    const onRedirect= (documentId: string)=>{
        router.push(`/documents/${documentId}`);
    }

    if (documents===undefined){
        return(
            <>
                <Actions.Skeleton level={level}/>
                {level===0 && (
                    <>
                        <Actions.Skeleton level={level}/>
                        <Actions.Skeleton level={level}/>
                    </>
                )}
            </>
        )
    }
    return (
        <>
            <p
                className={cn(
                    "hidden text-sm font-medium text-muted-foreground/80",
                    expanded && "last:block",
                    level===0 && "hidden"
                )}
                style={{
                    paddingLeft: level ? `${(level*12)+25}px`: undefined
                }}
            >
                No pages found
            </p>
            {documents.map((document)=>(
                <div>
                    <Actions
                        id={document._id}
                        onClick={()=>onRedirect(document._id)}
                        label={document.title}
                        icon={StickyNoteIcon}
                        documentIcon={document.icon}
                        active={params.documentId===document._id}
                        level={level}
                        onExpand={()=>onExpand(document._id)}
                        expanded={expanded[document._id]}
                    />

                    {expanded[document._id] && (
                        <Notes
                            parentDocumentId={document._id}
                            level={level+1}
                        />
                    )}
                </div>
            ))}
        </>
    )
}