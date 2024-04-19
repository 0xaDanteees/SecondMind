"use client"

import { useEffect, useState } from "react"
import { SettingsModal } from "../modals/SettingsModal"
import { ShortcutsModal } from "../modals/ShortcutsModal"
import { ThumbnailModal } from "../modals/ThumbnailModal"

export const ModalProvider=()=>{

    const [isMounted, setIsMounted]= useState(false);

    useEffect(()=>{
        setIsMounted(true);
    }, []);

    if (!isMounted){
        return null;
    }

    return (
        <>
            <SettingsModal/>
            <ShortcutsModal/>
            <ThumbnailModal/>
        </>
    )
}