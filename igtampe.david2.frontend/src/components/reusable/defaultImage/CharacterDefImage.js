import React from "react";
import DefaultImage from "./DefaultImage";

export default function CharacterDefImage({ src="", style, width, height}){ 
    return(<DefaultImage height={height} style={style} width={width} src={src} defaultsrc="/icons/question.png"/>) 
}