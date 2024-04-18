"use client"

import { useShortcuts } from "../hooks/use-shortcuts";
import { Dialog, DialogContent,  DialogHeader } from "../ui/dialog";
import { Label } from "../ui/label";
import { ChevronRight, Command, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Separator } from "@radix-ui/react-dropdown-menu";

export const ShortcutsModal = () => {
    const shortcuts = useShortcuts();
    const toggle= useShortcuts((store)=>store.toggle);
    
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    }, []);

    useEffect(()=>{
        const down = (e: KeyboardEvent)=>{
            if (e.key==="h" && (e.metaKey || e.ctrlKey)){
                e.preventDefault();
                toggle();
            }
        }

        document.addEventListener("keydown", down);
        return()=>document.removeEventListener("keydown", down);
    }, [toggle]);


    if(!isMounted){
        return null;
    }


    return (
        
        <Dialog open={shortcuts.isOpen} onOpenChange={shortcuts.onClose}>
            <DialogContent>
                <DialogHeader className="border-b pb-3 text-lg font-medium">
                    Shortcuts
                </DialogHeader >
                <DialogDescription className="text-[1rem]">
                    Experience high performance using <span className="font-bold">SecondMind</span> shortcuts
                </DialogDescription>
                <Separator/>
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col gap-y-1">
                            <Label className="flex items-center">
                                <ChevronRight className="w-6 h-6"/>
                                <Command className="w-3 h-3"/>
                                <span className="text-xs"><span className="text-[0.7rem]"> /CTRL</span> H</span>
                            </Label>
                            <span className="text-[0.8rem] text-muted-foreground ml-6">
                                Shortcut list
                            </span>
                        </div>
                        
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col gap-y-1">
                            <Label className="flex items-center">
                                <ChevronRight className="w-6 h-6"/>
                                <Command className="w-3 h-3"/>
                                <span className="text-xs"><span className="text-[0.7rem]"> /CTRL</span> S</span>
                            </Label>
                            <span className="text-[0.8rem] text-muted-foreground ml-6">
                                Settings
                            </span>
                        </div>
                        
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col gap-y-1">
                            <Label className="flex items-center">
                                <ChevronRight className="w-6 h-6"/>
                                <Command className="w-3 h-3"/>
                                <span className="text-xs"><span className="text-[0.7rem]"> /CTRL</span> F</span>
                            </Label>
                            <span className="text-[0.8rem] text-muted-foreground ml-6">
                                Search
                            </span>
                        </div>
                        
                    </div>
                    
            </DialogContent>
        </Dialog>
    );
};

