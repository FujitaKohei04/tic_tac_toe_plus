"use client";
import { useState } from "react";
import { LEN_OF_SQ } from "@/app/constants/constants";

export default function Square({
    content, 
    squareClicked,
}: {
    content: string,
    squareClicked: () => boolean,
}) {
    const [isLight, setIsLight] = useState<boolean>(false);

    const handleClick = () => {
        if(squareClicked()) {
            setIsLight(true);
            setTimeout(() => setIsLight(false), 2000);
        }
        
    }


    return (
        <button 
            onClick={handleClick} 
            className={`border w-full aspect-square text-[6cqw] flex items-center justify-center transition-colors
            ${isLight&&"bg-[var(--foreground-hlf)]"}`
        }>
            {content}
        </button>
    );
}