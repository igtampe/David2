import { CircularProgress } from "@mui/material";
import React from "react";

export default function CenteredCircular({children}){

    return(<div style={{textAlign:"center", paddingTop:"25px", paddingBottom:"25px"}}>
        <CircularProgress/> <br/>
        {children}
    </div>)

}