import { create } from "zustand";

type ThumbnailStore={
    isOpen: boolean;
    onOpen: ()=>void;
    onClose: ()=>void;
    url?: string;
    onReplace: (url:string)=>void;
};

export const useThumbnail = create<ThumbnailStore>((set)=>({
    isOpen: false,
    onOpen: ()=>set({isOpen:true, url:undefined}),
    onClose: ()=>set({isOpen: false, url:undefined}),
    url: undefined,
    onReplace: (url: string)=>set({isOpen: true, url})
}))