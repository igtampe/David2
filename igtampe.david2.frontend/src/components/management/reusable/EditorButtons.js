import { Button, IconButton } from "@mui/material";
import React, { useState } from "react";
import AlertSnackbar from "../../reusable/AlertSnackbar";
import DeleteIcon from "@mui/icons-material/Delete"

export default function EditorButtons({
    Session, Vertical=false,
    itemUpdate,itemCreate,itemDelete,
    setLoading, createItemRequest, cancelClick,
    refreshItems, setOpen, resetEditor, item
}) {

    const [alert, setAlert] = useState(false);
    const [alertResult, setAlertResult] = useState(undefined)

    const okClick = () => {
        if (item.id) { itemUpdate(setLoading, Session, item.id, createItemRequest(), onSuccess, onError) }
        else { itemCreate(setLoading, Session, createItemRequest(), onSuccess, onError) }
    }

    const delClick=()=>{
        if(!item.id){ return; }
        itemDelete(setLoading,Session,item.id,onSuccess,onError);
    }

    const onSuccess=()=>{
        setOpen(false);
        resetEditor();
        refreshItems();
    }

    const onError = (error) => {
        setAlertResult({
            "severity": "error",
            "text": error.Reason
        })
        setAlert(true)
    }

    return (<>
        <table style={{ width: "100%" }}>
            <tbody>
                <tr>
                    <td style={{ width: "20px" }}>
                        {
                            item.id ? <IconButton onClick={delClick}><DeleteIcon /></IconButton>
                                : <></>
                        }
                    </td>
                    <td style={{ textAlign: "right" }}>
                        <Button variant="contained" onClick={okClick} style={{ marginRight: "20px" }}>OK</Button>
                        <Button variant="outlined" onClick={cancelClick}>Cancel</Button>
                    </td>
                </tr>
            </tbody>
        </table>
        <AlertSnackbar setOpen={setAlert} open={alert} result={alertResult} />
    </>)
}