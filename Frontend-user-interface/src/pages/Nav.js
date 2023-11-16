import "../styles/Nav.css"

import * as React from 'react';
import { AppBar, Box, Toolbar, Button, IconButton } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import LoginIcon from '@mui/icons-material/Login';
import RadarIcon from '@mui/icons-material/Radar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {Link, Outlet} from "react-router-dom";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
    },
});

export default function Nav() {
    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <Link to="/">
                                <IconButton>
                                    <RadarIcon/>
                                </IconButton>
                            </Link>
                            <Link to="/maplist" className="Button">
                                <Button variant="outlined" endIcon={<MapIcon />}>
                                    Mes cartes
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button variant="outlined" endIcon={<LoginIcon />}>
                                    Connexion
                                </Button>
                            </Link>
                        </Toolbar>
                    </AppBar>
                </Box>
            </ThemeProvider>
            <Outlet/>
        </>
    );
}