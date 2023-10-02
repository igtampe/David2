import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, IconButton, AppBar, CircularProgress, Toolbar, Typography
} from "@mui/material";
import { useHistory } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import UserButton from "./navComponents/UserButton";
import Hamburger from "./navComponents/Hamburger";
import LogoutButton from "./navComponents/LogoutButton";

// react.school/material-ui

const useStyles = makeStyles((theme) => ({
  menuButton: { marginRight: theme.spacing(2) },
  title: { flexGrow: 1 },
  customHeight: { minHeight: 200 },
  offset: theme.mixins.toolbar
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);

  const sendToLogin = (event) => {
    history.push("/Login")
    setMenuOpen(false);
  }

  if(!props.Session){return(<></>)}

  return (
    <React.Fragment>
      {
        props.hidden ? <></>
        : <>
      <AppBar color={"primary"} enableColorOnDark>
        <Toolbar>
          <table width={'100%'}>
            <tr>
              {
                props.Session 
                ? <td width={'20px'}><IconButton onClick={() => { setMenuOpen(true) }} style={{ marginRight: "15px" }}><MenuIcon /></IconButton></td> 
                : <></>
              }
              
              <td width={'20px'}><a href="/"><img src="/media/david.png" alt="Logo" height="40" style={{ marginTop: '7px' }} /></a></td>
              <td><Typography style={{fontSize:"30px", fontFamily:"oswald"}}>David</Typography></td>
              <td><div style={{ marginLeft:'20px', marginRight:'auto'}}></div></td>{
                props.Session
                  ? <> {props.User
                    ? <>
                      <td width={'20px'}><UserButton Session={props.Session} User={props.User} RefreshUser={props.RefreshUser}/></td>
                      <td width={'20px'}><LogoutButton /></td>
                    </>: <td><CircularProgress color="secondary" /></td>}</>

                  : <>
                  </>}

            </tr>
          </table>
          <Typography variant="h6" className={classes.title} style={{ marginLeft: "10px", fontFamily: 'DM Serif Display' }}> </Typography>
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