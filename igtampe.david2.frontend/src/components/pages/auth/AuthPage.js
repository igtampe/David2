import React from "react";
import Grid from "@mui/material/Grid"
import LoginForm from '../../reusable/LoginForm'

export default function AuthPage(props) {
    return (
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh'}}>    
            <Grid item xs={12}>
                <LoginForm setSession={props.setSession} />
            </Grid>
        </Grid>
    );

}
