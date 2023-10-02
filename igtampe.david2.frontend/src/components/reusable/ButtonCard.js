import { Button, Card } from "@mui/material";
import React from "react";

export default function ButtonCard({ href, onClick, style, elevation, children }){

    return(
        <Button fullWidth style={{textTransform: 'none'}} href={href} onClick={onClick}>
            <Card style={style} 
                elevation={elevation}>
                {children}
            </Card>
        </Button>
    )
}