import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, Divider, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import EditorButtons from "../reusable/EditorButtons";
import { ArtistCreate, ArtistDelete, ArtistUpdate } from "../../../API/Artist";
import ArtistDefImage from "../../reusable/defaultImage/ArtistDefImage";
import PicturePicker from "../../reusable/PicturePicker";

export default function ArtistEditor({
    Vertical = false, open = false, setOpen,
    Session, refreshItems, item = {
        "name": "",
        "url": "",
        "imageURL": "",
        "color": "",
        "id": undefined,
    }
}) {

    const [name, setName] = useState(item.name)
    const [color, setColor] = useState(item.color)
    const [imageURL, setImageURL] = useState(item.imageURL)
    const [url, setUrl] = useState(item.url)

    const [loading, setLoading] = useState(false);
    const [pickerOpen, setPickerOpen] = useState(false)

    const resetEditor = () => {
        setName(item.name)
        setColor(item.color)
        setImageURL(item.imageURL)
        setUrl(item.url)
    }

    const createArtistRequest = () => {
        return ({
            "name": name,
            "url": url,
            "imageURL": imageURL,
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
                    <div style={{ textAlign: "center" }}> <Button onClick={() => { setPickerOpen(true) }}><ArtistDefImage src={imageURL} height="200px" /></Button> </div>
                    <Divider style={{ marginTop: "10px", marginBottom: "20px" }} />
                    <Grid container spacing={2}>
                        <Grid item xs={12}><TextField label="URL" disabled={loading} value={url} onChange={(event) => setUrl(event.target.value)}
                            fullWidth style={{ marginTop: "5px", marginBottom: "5px" }} /></Grid>
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
                    {!loading ? <EditorButtons Session={Session} itemCreate={ArtistCreate} itemDelete={ArtistDelete} itemUpdate={ArtistUpdate}
                        key={Vertical} setLoading={setLoading} createItemRequest={createArtistRequest} cancelClick={cancelClick} refreshItems={refreshItems}
                        resetEditor={resetEditor} setOpen={setOpen} item={item} />
                        : <CircularProgress />}
                </DialogActions>
            </div>
            <PicturePicker open={pickerOpen} setOpen={setPickerOpen} imageURL={imageURL} setImageURL={setImageURL} defaultImage={"/icons/question.png"}/>
        </Dialog>
    )
}