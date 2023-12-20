import React, {useEffect, useState} from 'react';
import '../styles/NewGame.css';
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import DeleteIcon from '@mui/icons-material/Delete';

const NewGame = (props) => {
        const apiUrl = process.env.REACT_APP_API_URL;
        const [gameName, setGameName] = useState('');
        const [gameDate, setGameDate] = useState('');
        const [gameTime, setGameTime] = useState('');
        const [teams, setTeams] = useState(['', '']);
        const [userId, setUserId] = useState('');

        useEffect(() => {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const uid = user.uid;
                    setUserId(uid);
                }
            });
        }, []);

        const resetForm = () => {
            setGameName('');
            setGameDate('');
            setGameTime('');
            setTeams(['', '']);
        };

        const addTeam = () => {
            setTeams([...teams, '']);
        };

        const removeTeam = (index) => {
            if (teams.length > 2) {
                const updatedTeams = [...teams];
                updatedTeams.splice(index, 1);
                setTeams(updatedTeams);
            }
        };

        const updateTeamName = (index, teamName) => {
            const updatedTeams = [...teams];
            updatedTeams[index] = teamName;
            setTeams(updatedTeams);
        };

        const generateRandomSessionId = () => {
            return Math.random().toString(36).substring(2, 8);
        };

        const dataVerificaiton = () => {
            const currentDate = new Date();
            const selectedDate = new Date(`${gameDate}T${gameTime}`);

            const emptyFields = [];
            if (!gameName) {
                emptyFields.push("Nom du match");
            }
            if (!gameDate) {
                emptyFields.push("Date");
            }
            if (!gameTime) {
                emptyFields.push("Heure");
            }
            if (!teams.every(team => team.trim() !== '')) {
                emptyFields.push("Équipes");
            }
            if (emptyFields.length > 0) {
                errorDisplay([`Veuillez compléter le(s) champ(s) : ${emptyFields.join(', ')}`]);
                return false;
            }
            if (selectedDate <= currentDate) {
                errorDisplay(["La date et l'heure ne peuvent pas être antérieures à la date actuelle"]);
                return false;
            }
            return true
        }
        const createSessions = async () => {
            const sessionData = teams.map((team) => ({
                sessId: generateRandomSessionId(),
                url: props.url,
            }));

            try {
                const response = await fetch(`${apiUrl}api/session`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({sessions: sessionData}),
                });

                const result = await response.json();

                if (response.status === 200) {
                    console.log("Sessions créées avec succès :", result);
                    // Vous pouvez traiter les données de résultat ici si nécessaire
                } else {
                    console.log("Erreur lors de la création des sessions :", result.errors);
                    // Vous pouvez également afficher les erreurs à l'utilisateur si nécessaire
                }
            } catch (error) {
                console.error('Erreur lors de la création des sessions :', error);
                // Traitez l'erreur selon vos besoins
            }
        };


        const submitForm = () => {
            const selectedDate = new Date(`${gameDate}T${gameTime}`);

            if (!dataVerificaiton()) {
                return;
            }
            createSessions();
            const formData = {
                userId: userId,
                mapId: props.mapId,
                name: gameName,
                date: selectedDate,
                teams: teams.map((team) => ({
                    name: team.trim(),
                    roomId: generateRandomSessionId()
                }))
            };
            fetch(`${apiUrl}api/game`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }).then(response => {
                return response.json();
            }).then(res => {
                if (res === 201) {
                    successDisplay();
                } else {
                    errorDisplay([res.errors]);
                }
            });
        }

        const successDisplay = () => {
            document.getElementById("success-message").innerText = "Le match \"" + gameName + "\" a été créé et ajouté à la base de données avec succès";
            document.getElementsByClassName("errors")[0].style.display = "none";
            document.getElementsByClassName("success")[0].style.display = "block";
            resetForm();
        };

        const errorDisplay = (errors) => {
            document.getElementsByClassName("success")[0].style.display = "none";
            let html = "";
            for (let i of errors) {
                html += "<li>" + i + "</li>";
            }
            document.getElementById("errors").innerHTML = html;
            document.getElementsByClassName("errors")[0].style.display = "block";
        }

        return (<div>
                <Button type="button" onClick={props.onCancel} className={"back-button"}>
                    Retour
                </Button>
                <div className="header">
                    <span>Créer un nouveau match :</span>
                </div>
                <div className="new-game-container">
                    <label htmlFor={"gameName"}>Nom du match:</label>
                    <input
                        id={"gameName"}
                        type="text"
                        value={gameName}
                        onChange={(e) => setGameName(e.target.value)}
                        placeholder="Entrez le nom du match"
                        required
                    />

                    <label htmlFor={"gameDate"}>Date:</label>
                    <input
                        id={"gameDate"}
                        type="date"
                        value={gameDate}
                        onChange={(e) => setGameDate(e.target.value)}
                        required
                    />

                    <label htmlFor={"gameTime"}>Heure:</label>
                    <input
                        id={"gameTime"}
                        type="time"
                        value={gameTime}
                        onChange={(e) => setGameTime(e.target.value)}
                        required
                    />

                    <label>Équipes:</label>
                    {teams.map((team, index) => (
                        <div key={index} className="team-container" data-testid="team-container">
                            <input
                                type="text"
                                value={team}
                                onChange={(e) => updateTeamName(index, e.target.value)}
                                placeholder={`Nom de l'équipe ${index + 1}`}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => removeTeam(index)}
                                className={`remove-button ${teams.length <= 2 ? 'disabled' : ''}`}
                                disabled={teams.length <= 2}
                            >
                                <DeleteIcon/>
                            </button>
                        </div>
                    ))}

                    <button type="button" onClick={addTeam} className={"addTeamButton"} name={"addTeamButton"}>
                        Ajouter une équipe
                    </button>
                    <div className={"errors"}>
                        <label>Erreur(s): </label>
                        <ul id={'errors'}></ul>
                    </div>
                    <div className={"success"}>
                        <label>Succès: </label>
                        <p id="success-message"></p>
                    </div>

                    <DialogActions>
                        <Button onClick={submitForm}>
                            Soumettre
                        </Button>
                    </DialogActions>
                </div>
            </div>
        );
    }
;

export default NewGame;
