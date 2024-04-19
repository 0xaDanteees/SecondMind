"use client"

import EmojiPicker, {Theme} from "emoji-picker-react";
import { useTheme } from "next-themes";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";


interface EmojisProps{
    onChange: (icon: string)=>void;
    children: React.ReactNode;
    asChild?: boolean;
};

export const Emojis=({onChange, children, asChild}: EmojisProps)=>{

    const {resolvedTheme}= useTheme();
    const currentTheme= (resolvedTheme || "dark") as keyof typeof themes

    const themes= {
        "dark": Theme.DARK,
        "light": Theme.LIGHT,
    }

    const theme = themes[currentTheme]

    return(
        <Popover>
            <PopoverTrigger asChild={asChild}>
                {children}
            </PopoverTrigger>
            <PopoverContent className="p-0 w-full border-none">
                <EmojiPicker
                
                    height={350}
                    theme={theme}
                    onEmojiClick={(data)=>onChange(data.emoji)}
                />
            </PopoverContent>
        </Popover>
    )
}