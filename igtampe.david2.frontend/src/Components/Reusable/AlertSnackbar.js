import { Snackbar, Alert } from "@mui/material"
import React from "react";

export default function AlertSnackbar({
    open=false,
    setOpen,
    result={
        "severity":"error",
        "text":"Something happened!"
    }
}) {   

    const handleClose = (event) =>{ setOpen(false) }

    var Severity = result.severity
    if(Severity.toLowerCase()==="danger") {Severity = 'error'} 

    return(
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={Severity} sx={{ width: '100%' }}>
                {result.text}
            </Alert>
        </Snackbar>
    )
    
}