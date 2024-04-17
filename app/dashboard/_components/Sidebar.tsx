"use client"

import { cn } from "@/lib/utils";
import { ChevronFirst, MenuIcon, StickyNote,FilePlus, Search, PlusCircle, Trash2 } from "lucide-react"
import { usePathname } from "next/navigation"
import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import Profile from "./Profile";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Actions } from "./Actions";
import { Notes } from "./Notes";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RecycleBin } from "./RecycleBin";

export const Sidebar = () => {

    const pathname= usePathname();
    const isMobile = useMediaQuery("(max-width: 768px)");

    const create= useMutation(api.documents.create)

    const resizingRef= useRef(false);
    const sidebarRef= useRef<ElementRef<"aside">>(null);
    const navbarRef= useRef<ElementRef<"div">>(null);
    const [reset, setReset]=useState(false);
    const [isCollapsed, setIsCollapsed]=useState(isMobile);

    const handleMouseDown= (event: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        event.preventDefault();
        event.stopPropagation();

        resizingRef.current=true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    }

    const handleMouseMove=(event:MouseEvent)=>{
        if(!resizingRef.current) return;
        let newWidth=event.clientX;

        if(newWidth<240) newWidth=240;
        if(newWidth>480) newWidth=480;

        if(sidebarRef.current && navbarRef.current){
            sidebarRef.current.style.width= `${newWidth}px`;
            navbarRef.current.style.setProperty("left", `${newWidth}px`);
            navbarRef.current.style.setProperty("width", `calc(100%-${newWidth}px)`)
        }
    }

    const handleMouseUp=()=>{
        resizingRef.current=false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    }

    const resetSidebarSize = ()=>{
        if(sidebarRef.current && navbarRef.current){
            setIsCollapsed(false);
            setReset(true);

            sidebarRef.current.style.width = isMobile ? "100%": "240px";
            navbarRef.current.style.setProperty("width", isMobile ? "0": "calc(100%-240px)");

            navbarRef.current.style.setProperty(
                "left", isMobile ? "100%": "240px"
            );

            setTimeout(()=>setReset(false), 300);
        }
    }

    const collapse = ()=>{

        if(sidebarRef.current && navbarRef.current){
            setIsCollapsed(true);
            setReset(true);

            sidebarRef.current.style.width="0";
            navbarRef.current.style.setProperty("width", "100%");
            navbarRef.current.style.setProperty("left", "0");
            setTimeout(()=>setReset(false), 300);
        }
    }

    useEffect(()=>{
        if(isMobile){
            collapse();
        } else {
            resetSidebarSize();
        }
    }, [isMobile])

    useEffect(()=>{
        if(isMobile){
            collapse();
        }
    }, [pathname, isMobile]);

    const handleCreate= ()=>{
        const promise = create({ title: "new Note"});
    }

    return (
        <>
        <aside 
        ref={sidebarRef}
        className={cn(
            "group/sidebar overflow-y-auto relative flex w-60 flex-col z-[99999] border-r-2",
            reset && "transition-all ease-in-out duration-300",
            isMobile && "w-0"
        )}>
            
            <div
                role="button"
                onClick={collapse}
                className={cn(
                    "h-6 w-6 text-muted-foreground round-sm hover:bg-neutral-300 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
                    isMobile && "opacity-100"
                )}
            >
                <ChevronFirst/>
            </div>
            <div>
                <Profile/>
                <Actions onClick={()=>{}} label="Search" icon={Search} isSearch/> 
                <Actions onClick={handleCreate} label="New page" icon={FilePlus}/>
            </div>
            <div className="mt-3">
                <Notes/>
                <Actions 
                    onClick={handleCreate}
                    icon={PlusCircle}
                    label="Create Note"
                />
                <Popover>
                    <PopoverTrigger className="w-full mt-3">
                        <Actions label="Trash" icon={Trash2}/>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-72 p-0"
                        side={isMobile? "bottom": "right"}
                    >
                        <RecycleBin/>
                    </PopoverContent>
                </Popover>
            </div>
            <div
                onMouseDown={handleMouseDown}
                onClick={resetSidebarSize}
                className="opacity-0 group-hover/sidebar:opacity-100
                transition cursor-ew-resize absolute h-full w-1 bg-primary/10
                right-0 top-0"
            />
        </aside>
        
        <div
            ref={navbarRef}
            className={cn(
                "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
                reset && "transition-all ease-in-out duration-300",
                isMobile && "left-0 w-full"
            )}>

                <nav className="bg-transparent px-3 py-2 w-full">
                    {isCollapsed && <MenuIcon className="h-6 w-6 text-muted-foreground hover:bg-neutral-300" onClick={resetSidebarSize}/>}
                </nav>
        </div>
        </>
    )
}
