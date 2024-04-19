"use client"

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { HomeIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { Title } from "./Title";
import { Banner } from "./Banner";
import { Menu } from "./menu";

interface NavbarProps {
            isCollapsed: boolean;
            onResetWidth: ()=>void;
};

export const Navbar = ({isCollapsed, onResetWidth}: NavbarProps)=>{
    
    const params=useParams();
    const document= useQuery(api.documents.getById, {

        documentId: params.documentId as Id<"documents">,
    });

    if(document===undefined){
        return (
            <nav className="bg-background px-3 py-2 w-full  justify-between flex items-center">
                <Title.Skeleton/>
                <div className="flex items-center gap-x-2">
                    <Menu.Skeleton/>
                </div>
            </nav>
        )
    }
    if (document===null){
        return null;
    }

    return (    
       <>
        <nav className="bg-background px-3 py-2 w-full flex items-center gap-x-4">
            {isCollapsed && (
                <HomeIcon
                    role="button"
                    onClick={onResetWidth}
                    className="h-6 w-6 text-muted-foreground"
                />
            )} 
            <div className="flex items-center justify-between w-full">
                <Title initialData={document}/>
                <div className="flex items-center gap-x-3">
                    <Menu documentId={document._id}/>
                </div>
            </div>
        </nav>

        {document.isArchived && (
            <Banner documentId={document._id}/>
        )}
       </>
    )
}