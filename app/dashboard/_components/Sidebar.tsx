"use client"

import { ChevronFirst } from "lucide-react"

export const Sidebar = () => {
    return (
        <aside className="group/sidebar overflow-y-auto relative flex w-60 flex-col z-[99999] border-r-2">
            
            <div
                role="button"
                className="h-6 w-6 text-muted-foreground round-sm hover:bg-neutral-300 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition"
            >
                <ChevronFirst/>
            </div>
            <div>
                <p>Sidebar!</p>
            </div>
            <div className="mt-3">
                <p>sticks</p>
            </div>
            <div
                className="opacity-0 group-hover/sidebar:opacity-100
                transition cursor-ew-resize absolute h-full w-1 bg-primary/10
                right-0 top-0
                "
            />
        </aside>
    )
}
