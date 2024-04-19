"use client";

import React from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

interface ConfirmModalProps{
    children: React.ReactNode;
    onConfirm: ()=>void;
};

export const ConfirmModal=({
    children, onConfirm
}: ConfirmModalProps)=>{

    const handleConfirm=(
        event: React.MouseEvent<HTMLButtonElement,MouseEvent>
    )=>{
        event.stopPropagation();
        onConfirm();
    }

    return(
        <AlertDialog>
            <AlertDialogTrigger onClick={(e)=>e.stopPropagation()} asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-red-600">
                        Are you sure you want to delete this Note?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Once you delete you can restore the note.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={e=>e.stopPropagation()}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm} className="bg-red-600 text-black">
                        Nuke note
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}