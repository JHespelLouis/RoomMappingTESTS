import "../styles/MyAccount.css";
import React, { useState } from 'react'
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const MyAccount = () => {

    const navigate = useNavigate();

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
            navigate('/login');
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div>
            <h1 className="account-title">Mon compte</h1>
            <p className="account-text">Vous êtes connecté en tant que {user ? user.email : "No user"}</p>
            <Link to="/login" className="button-container">
                <Button className="Button" onClick={logout} variant="outlined" endIcon={<LogoutIcon />}>
                    Se déconnecter
                </Button>
            </Link>
        </div>
        
    )
}

export default MyAccount
