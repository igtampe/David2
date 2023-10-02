import React from "react";

export default function DefaultImage({
    src="", defaultsrc="",
    style, width, height
}){

    return(<img src={src==="" ? defaultsrc : src} width={width} height={height} style={style}/>)

}