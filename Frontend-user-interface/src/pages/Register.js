import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, CssBaseline, TextField, Box, Typography, Container } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";

//Animation d'inscription
import { useSpring, animated } from 'react-spring';

const defaultTheme = createTheme();

export default function Register() {

const navigate = useNavigate();

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [accountExistsError, setAccountExistsError] = React.useState('');
  const [showConfirmation, setShowConfirmation] = React.useState(false);

  function isValidEmail(email) {
    // Format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function isValidPassword(password) {
    // Format du mot de passe
    // Au moins 8 caractères avec au moins une lettre majuscule, une lettre minuscule et un chiffre
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  }

  const confirmationAnimation = useSpring({
    //Animation d'inscription
    opacity: showConfirmation ? 1 : 0,
    transform: showConfirmation ? 'translateY(0)' : 'translateY(-100%)',
  });

  const handleSubmit = (event) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    if (!isValidEmail(email)) {
      setEmailError('Le format de l\'email est incorrect');
      return;
    }

    // Vérification du format du mot de passe
    if (!isValidPassword(password)) {
      setPasswordError('Le format du mot de passe est incorrect. Au moins 8 caractères, une lettre majuscule, une lettre minuscule et un chiffre.');
      return;
    }

    createUserWithEmailAndPassword(auth, data.get('email'), data.get('password'))
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        setShowConfirmation(true); // Déclenche l'animation de confirmation
        setTimeout(() => {
          navigate('/login');
        }, 2000);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/email-already-in-use') {
          setAccountExistsError('Un compte existe déjà avec cet email');
        } else {
          console.log(errorCode);
          console.log(errorMessage);
        }
      });

  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#3F72AF' }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Inscrivez-vous
          </Typography>
          <animated.div style={confirmationAnimation}>
            <Typography variant="body1">Le compte a été créé avec succès !</Typography>
          </animated.div>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstname"
              label="First name"
              name="firstname"
              autoComplete="firstname"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastname"
              label="Last name"
              name="lastname"
              autoComplete="lastname"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adress email"
              name="email"
              autoComplete="email"
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!passwordError}
              helperText={passwordError}
            />
            <Typography color="error">{accountExistsError}</Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              S'inscrire
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}