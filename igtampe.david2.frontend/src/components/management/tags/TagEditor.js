import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { TagCreate, TagDelete, TagUpdate } from "../../../API/Tag";
import EditorButtons from "../reusable/EditorButtons";

export default function TagEditor({
    Vertical = false, open = false, setOpen,
    Session, refreshItems, tag = {
        "name": "",
        "color": "",
        "id": undefined,
    }
}) {

    const [name, setName] = useState(tag.name)
    const [color, setColor] = useState(tag.color)

    const [loading, setLoading] = useState(false);

    const resetEditor = () => {
        setName(tag.name)
        setColor(tag.color)
    }

    const createTagRequest = () => {
        return ({
            "name": name,
            "color": color,
        })
    }

    const cancelClick = () => {
        setOpen(false)
        resetEditor()
    }

    return (
        <Dialog fullWidth maxWidth="xs" open={open} onClose={() => cancelClick()} >
            <div style={{ padding: "20px" }}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}><TextField label="Name" disabled={loading} value={name} onChange={(event) => setName(event.target.value)}
                            fullWidth style={{ marginTop: "5px", marginBottom: "5px" }} /></Grid>
                        <Grid item xs={1}>
                            <Box style={{ width: "100%", height: "100%", backgroundColor: color, outline: "solid 1px #555555" }} />
                        </Grid>
                        <Grid item xs={11}><TextField label="Color" disabled={loading} value={color} onChange={(event) => setColor(event.target.value)}
                            fullWidth style={{ marginTop: "5px", marginBottom: "5px" }} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    {!loading ? <EditorButtons Session={Session} itemCreate={TagCreate} itemDelete={TagDelete} itemUpdate={TagUpdate} 
                        key={Vertical} setLoading={setLoading} createItemRequest={createTagRequest} cancelClick={cancelClick} refreshItems={refreshItems}
                        resetEditor={resetEditor} setOpen={setOpen} item={tag}/> 
                    : <CircularProgress />}
                </DialogActions>
            </div>
        </Dialog>
    )
}