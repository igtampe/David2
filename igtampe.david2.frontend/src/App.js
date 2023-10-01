import React, { useState } from 'react';
import { Route, Redirect } from 'react-router';
import { ThemeProvider } from '@mui/material/styles';
import Cookies from 'universal-cookie/es6';
import useWindowDimensions from './Components/Hooks/useWindowDimensions';
import NavMenu from './Components/Navbar/NavBar';

import { GetMe } from './API/User';
import { darkTheme } from './Themes';
import { /*CircularProgress, */ CssBaseline, Container } from '@mui/material';
import { Footer } from './Components/Footer';
import Auth from './Components/Auth';

//Cookies should only really be accessed here.
const cookies = new Cookies();

//function CenteredCircular() { return (<div style={{ textAlign: 'center' }}> <CircularProgress /> </div>) }

export default function App() {

  //Width of the window. Used to determine if we need to switch to a vertical arrangement
  const { width } = useWindowDimensions();
  const Vertical = width < 900;

  //Auth stuff. Session and User is passed down to the components.
  const [Session, setSession] = useState(undefined)
  const [User, setUser] = useState(undefined)

  //Loading usestate to make sure we don't start loading 50 times
  const [Loading, setLoading] = useState(false)

  //Warning to show a dialogbox to say ```y o    s i g n    o u t```
  const [InvalidSession, setInvalidSession] = useState(false);

  //Since this app is just for me, this will always be dark mode
  const darkMode=true

  //This is the set session that must be passed down
  const SetSession = (SessionID) => {

    //Set the cookie
    cookies.set("SessionID", SessionID)

    //set the usestates
    setSession(SessionID)
    setInvalidSession(false)
  }

  //Assuming there's a valid session, this will automatically trigger a refresh
  const RefreshUser = () => { setUser(undefined); }

  //This runs at legitiately *EVERY* time we load and render ANY page in the app
  //So here we can set the session and user

  //Check that session reflects the cookie's state
  if (Session !== cookies.get("SessionID")) { setSession(cookies.get("SessionID")) }

  //Check that the user is defined
  if (Session && !InvalidSession && !Loading && !User) {
    //If there is a session, and it's not invalid, and
    //we're not already loading a user, and the user is not set

    //Well, time to get the user
    GetMe(setLoading, Session, setUser, setInvalidSession)
  }

  // <Layout DarkMode={darkMode} ToggleDarkMode={ToggleDarkMode} Session={Session} InvalidSession={InvalidSession} setSession = {SetSession} RefreshUser = {RefreshUser} User={User} Vertical={Vertical}>
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Layout DarkMode={darkMode} Session={Session} InvalidSession={InvalidSession} setSession={SetSession} RefreshUser={RefreshUser} User={User} Vertical={Vertical}>
        <Route exact path='/'>
          {Session
            ? <> Dashboard of all comms (The Dash of the Sheet) </>
            : <Redirect to='/Login' />}
        </Route>
        <Route path='/Login'>
          {Session ? <Redirect to='/Trips' /> : <Auth DarkMode={darkMode} />}
        </Route>
        <Route path='/Data'>
          {Session
            ? <> Data of all commissions (Basically the Trello) </>
            : <Redirect to='/Login' />}
        </Route>
        <Footer />
      </Layout>
    </ThemeProvider>
  );
}

export function Layout(props) {
  return (
    <div>
      <NavMenu hidden={props.hidden} DarkMode={props.DarkMode} Session={props.Session} InvalidSession={props.InvalidSession}
        setSession={props.SetSession} RefreshUser={props.RefreshUser} User={props.User} />
      <Container maxWidth='xl'> {props.children} </Container>
    </div>
  );
}
