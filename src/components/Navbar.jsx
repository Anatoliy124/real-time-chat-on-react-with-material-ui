import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Button, Grid } from "@mui/material";
import { NavLink } from 'react-router-dom';
import {  LOGIN_ROUTE } from "../utils/constants";
import { Context } from "../index";
import { useAuthState } from "react-firebase-hooks/auth";


const Navbar = () => {
    const { auth } = useContext(Context)
    const { user } = useAuthState(auth)

    return (
      <AppBar color={"secondary"}position="static">
        <Toolbar variant={"dense"}>
            <Grid container justifyContent={"flex-end"}>
                {user?
                    <Button onClick={() => auth.signOut()} variant={"outlined"}>Логин</Button>
                    :
                    <NavLink to={LOGIN_ROUTE}>
                      <button variant={"outlined"}>Выйти</button>
                    </NavLink>
                    
                }
            </Grid>
        </Toolbar>
      </AppBar>
  );
}


export default Navbar;