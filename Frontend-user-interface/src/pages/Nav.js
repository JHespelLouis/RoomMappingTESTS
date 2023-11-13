import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MapIcon from '@mui/icons-material/Map';
import LoginIcon from '@mui/icons-material/Login';
import RadarIcon from '@mui/icons-material/Radar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {Link, Outlet} from "react-router-dom"

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
                <Box sx={{height:"10vh"}}>
                    <AppBar sx={{height:"10vh"}} position="static">
                        <Toolbar style={{width:"auto", justifyContent:"space-between", alignItems:'center'}}>
                            <div>
                                <Link to="/">
                                    <IconButton>
                                        <RadarIcon/>
                                    </IconButton>
                                </Link>
                            </div>
                            <div>
                                <Link to="/maplist">
                                    <Button variant="outlined" startIcon={<MapIcon />}>
                                        Mes cartes
                                    </Button>
                                </Link>
                                <Link to="/login">
                                    <Button sx={{mr:2}} variant="outlined" startIcon={<LoginIcon />}>
                                        Connexion
                                    </Button>
                                </Link>
                            </div>
                        </Toolbar>
                    </AppBar>
                </Box>
            </ThemeProvider>
            <Outlet/>
        </>
    );
}