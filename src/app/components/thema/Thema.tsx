"use client";
import { useState, useEffect } from "react";

export default function Thema() {
    const [thema, setThema] = useState<string>("DARK");

    useEffect(() => {
        document.documentElement.setAttribute("data-thema", thema);

    }, [thema])

    return (
        <button onClick={() => setThema(thema === "LIGHT"?"DARK":"LIGHT")}>{thema}</button>
    );
}