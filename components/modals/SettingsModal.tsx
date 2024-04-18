"use client"

import { RedirectToUserProfile } from "@clerk/clerk-react";
import { useSettings } from "../hooks/use-settings";
import { Dialog, DialogContent,  DialogHeader } from "../ui/dialog";
import { Label } from "../ui/label";
import { ModeToggle } from "../mode-toggle";
import { ChevronRight, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

export const SettingsModal = () => {
    const settings = useSettings();
    const toggle= useSettings((store)=>store.toggle);


    const [reditectToUserProfileConfig, setRedirectToUserProfileConfig]=useState(false);
    const handleRedirect=()=>{
        return (
            setRedirectToUserProfileConfig(true)
        )
    }
    
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    }, []);

    useEffect(()=>{
        const down = (e: KeyboardEvent)=>{
            if (e.key==="s" && (e.metaKey || e.ctrlKey)){
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
        
        <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
            <DialogContent>
                <DialogHeader className="border-b pb-3 text-lg font-medium">
                    Settings
                </DialogHeader >
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col gap-y-1">
                            <Label className="flex items-center">
                                <ChevronRight className="w-6 h-6"/>Theme
                            </Label>
                            <span className="text-['0.8rem] text-muted-foreground ml-6">
                                Customize your theme
                            </span>
                        </div>
                        <ModeToggle/>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col gap-y-1">
                            <Label className="flex items-center">
                                <ChevronRight className="w-6 h-6"/>Profile
                            </Label>
                            <span className="text-['0.8rem] text-muted-foreground ml-6">
                                Profile settings
                            </span>
                        </div>
                        <Button variant="ghost" size="icon" onClick={handleRedirect}>
                            <Settings/>
                        </Button>
                    </div>
                    {reditectToUserProfileConfig && <RedirectToUserProfile />}
            </DialogContent>
        </Dialog>
    );
};

