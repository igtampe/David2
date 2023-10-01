import React, { useState } from "react";
import {
  Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, AppBar, CircularProgress, Toolbar, Button, Typography
} from "@mui/material";
import { useHistory } from "react-router-dom";

import UserButton from "./NavBarComponents/UserButton";
import Hamburger from "./NavBarComponents/Hamburger";
import LogoutButton from "./NavBarComponents/LogoutButton";

export default function ButtonAppBar(props) {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);

  const sendToLogin = (event) => {
    history.push("/Login")
    setMenuOpen(false);
  }

  return (
    <React.Fragment>
      {
        props.hidden ? <></>
        : <>
      <AppBar color={"primary"} enableColorOnDark>
        <Toolbar>
          <table width={'100%'}>
            <tr>
              <td width={'20px'}><a href="/"><img src="/media/david.png" alt="Logo" height="40" style={{ marginTop: '7px' }} /></a></td>
              <td><Typography style={{fontSize:"30px", fontFamily:"oswald"}}>David</Typography></td>
              <td><div style={{ marginLeft:'20px', marginRight:'auto'}}></div></td>
              {
                props.Session ? <> {props.User ? <>
                      <td width={'20px'}><UserButton Session={props.Session} User={props.User} RefreshUser={props.RefreshUser}/></td>
                      <td width={'20px'}><LogoutButton /></td>
                    </>: <td><CircularProgress color="secondary" /></td>}</>
                  : <> <td width={'20px'}><Button color="inherit" onClick={sendToLogin}> Log In </Button></td> </>}
            </tr>
          </table>
        </Toolbar>
      </AppBar>
      <Toolbar style={{ marginBottom: "20px" }} />        
        </>
      }

      <Dialog open={props.InvalidSession} >
        <DialogTitle> Session Expired </DialogTitle>
        <DialogContent><DialogContentText>Your session was not found on the server, and has most likely expired. Please log in again.</DialogContentText> </DialogContent>
        <DialogActions> <LogoutButton /> </DialogActions>
      </Dialog>

      <Hamburger DarkMode={props.DarkMode} ToggleDarkMode={props.ToggleDarkMode} Session={props.Session}
        menuOpen={menuOpen} setMenuOpen={setMenuOpen} sendToLogin={sendToLogin} history={history} User={props.User} />

    </React.Fragment>
  );
}
