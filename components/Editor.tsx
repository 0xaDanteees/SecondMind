"use client"

import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/react";
import "@blocknote/react/style.css";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

async function saveToStorage(jsonBlocks: Block[]) {
  localStorage.setItem("editorContent", JSON.stringify(jsonBlocks));
}

async function loadFromStorage() {
  const storageString = localStorage.getItem("editorContent");
  return storageString
    ? (JSON.parse(storageString) as PartialBlock[])
    : undefined;
}

interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
}

const Editor = ({
    onChange, initialContent: initialContentProp
}: EditorProps) => {
    
    const {resolvedTheme} = useTheme();
    const [initialContent, setInitialContent] = useState<
        PartialBlock[] | undefined | "loading"
    >("loading");
 
    useEffect(() => {
        loadFromStorage().then((content) => {
            setInitialContent(content);
        });
    }, []);
 
    const editor = useMemo(() => {
        if (initialContent === "loading") {
            return undefined;
        }
        return BlockNoteEditor.create({ initialContent });
    }, [initialContent]);
 
    if (editor === undefined) {
        return "Loading content...";
    }
 
    return (
        <BlockNoteView
            editor={editor}
            onChange={() => {
                saveToStorage(editor.document);
            }}
            theme={resolvedTheme === "dark" ? "dark" : "light"}
        />
    );
}

export default Editor;

