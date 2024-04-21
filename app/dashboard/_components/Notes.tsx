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
        router.push(`/dashboard/documents/${documentId}`);
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
            {documents.map((note)=>(
                <div key={note._id}>
                    <Actions
                        id={note._id}
                        onClick={()=>onRedirect(note._id)}
                        label={note.title}
                        icon={StickyNoteIcon}
                        documentIcon={note.icon}
                        active={params.documentId===note._id}
                        level={level}
                        onExpand={()=>onExpand(note._id)}
                        expanded={expanded[note._id]}
                    />

                    {expanded[note._id] && (
                        <Notes
                            parentDocumentId={note._id}
                            level={level+1}
                        />
                    )}
                </div>
            ))}
        </>
    )
}