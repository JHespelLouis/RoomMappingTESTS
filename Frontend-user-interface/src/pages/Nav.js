import "../styles/Nav.css"

import React, { useState } from 'react';
import { AppBar, Box, Toolbar, Button, IconButton } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import RadarIcon from '@mui/icons-material/Radar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {Link, Outlet} from "react-router-dom";

import { getAuth, onAuthStateChanged } from "firebase/auth";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
    },
});

export default function Nav() {

    const [user, setUser] = useState(null);

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("User is signed in");
            setUser(user);
        } else {
            console.log("User is signed out");
        }
    });

    const logout = () => {
        auth.signOut().then(() => {
            console.log("User signed out");
            setUser(null);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <Box>
                    <AppBar position="static">
                        <Toolbar style={{width:"auto", justifyContent:"space-between", alignItems:'center'}}>
                            <div>
                                <Link to="/">
                                    <IconButton>
                                        <RadarIcon/>
                                    </IconButton>
                                </Link>
                            </div>
                            { user ? (
                                <div>
                                    <Link to="/maplist" className="Button">
                                        <Button variant="outlined" endIcon={<MapIcon />}>
                                            Mes cartes
                                        </Button>
                                    </Link>
                                    <Link to="/login" className="Button">
                                        <Button variant="outlined" onClick={logout} endIcon={<LogoutIcon />}>
                                            Se déconnecter
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div>
                                    <Link to="/login" className="Button">
                                        <Button variant="outlined" endIcon={<LoginIcon />}>
                                            Se connecter
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </Toolbar>
                    </AppBar>
                </Box>
            </ThemeProvider>
            <Outlet/>
        </>
    );
}