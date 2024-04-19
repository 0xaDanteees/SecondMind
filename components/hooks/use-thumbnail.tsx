import { create } from "zustand";

type ThumbnailStore={
    isOpen: boolean;
    onOpen: ()=>void;
    onClose: ()=>void;
};

export const useThumbnail = create<ThumbnailStore>((set)=>({
    isOpen: false,
    onOpen: ()=>set({isOpen:true}),
    onClose: ()=>set({isOpen: false})
}))