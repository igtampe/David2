import React, { useState } from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField} from "@mui/material";

export default function PicturePicker(props) {

  const [tempImageURL, setTempImageURL] = useState('')
  

  const handleOK = (event) => {
    props.setImageURL(tempImageURL)
    handleClose();
  }

  const clearForm = (event) => {
    setTempImageURL('')
  }

  const handleClose = (event) => {
    props.setOpen(false)
    clearForm();
  }

  const updateTempURL = (event) => {setTempImageURL(event.target.value)}
  const getImage = () => { return(tempImageURL === '' ? props.defaultImage : tempImageURL) }

  return (
    <React.Fragment>
      <Dialog fullWidth maxWidth="xs" open={props.open} onClose={handleClose}>
        <DialogTitle>Select a Photo</DialogTitle>
        <DialogContent>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <img src={getImage()} alt="Picked" height="150px" />
          </div>
          <TextField label='Image URL ' value={tempImageURL} onChange={updateTempURL} fullWidth />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleOK}>Set</Button>
            <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );

}
