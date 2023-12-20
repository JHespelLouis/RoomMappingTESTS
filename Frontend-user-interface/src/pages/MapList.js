import * as React from 'react';
import { ImageList, ImageListItem, ImageListItemBar, ListSubheader, IconButton, Menu, MenuItem, Box, Alert, Snackbar,
    DialogActions, DialogContent, DialogTitle, Button, Dialog, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from "react-router-dom";
import {grey} from '@mui/material/colors';
import GameList from "./GameList";
import {redirect} from "react-router-dom";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useEffect, useState} from "react";
import { jsPDF } from "jspdf";

const apiUrl = process.env.REACT_APP_API_URL;

function MapOptions(...props) {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [publishOpen, setPublishOpen] = React.useState(false);
    const [downloadDialogOpen, setDownloadDialogOpen] = React.useState(false);
    const open = Boolean(anchorEl);
    const [matchPopupOpen, setMatchPopupOpen] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handlePublish = () => {
        setPublishOpen(true);
        handleClose();
    };
    const handlePublishClose = () => {
        setPublishOpen(false);
    }
    const handleCloseDownloadDialog = () => {
        setDownloadDialogOpen(false);
    };
    const handleOpenDownloadDialog = () => {
        setDownloadDialogOpen(true);
    };
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };
    const handleMapDeletion = async () => {
        const auth = getAuth();
        const uid = auth.currentUser.uid;
        const mapName = props[0]['name'];

        try {
            const response = await fetch(`${apiUrl}api/map/${uid}/${mapName}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setSnackbarMessage('Map Deleted Successfully');
                setSnackbarSeverity('success');
                setTimeout(() => {
                    window.location.reload();
                }, 2500);
            } else {
                setSnackbarMessage('Failed to delete map');
                setSnackbarSeverity('error');
            }
        } catch (error) {
            console.error('Failed to fetch:', error);
            setSnackbarMessage('Failed to delete map');
            setSnackbarSeverity('error');
        }

        setSnackbarOpen(true);
    };
    const handleMatchPopup = () => {
        setMatchPopupOpen(true);
        handleClose();
    };
    const toMapEditor = () => {
        navigate('/mapEditor', {
            state: props[0]['mapId']
        })
    }
    return (
        <div>
            <Box>
                <IconButton
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <MoreVertIcon sx={{color: grey[50]}}/>
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={toMapEditor}>Modifier</MenuItem>
                    <MenuItem onClick={handlePublish}>Publier</MenuItem>
                    <MenuItem onClick={handleMatchPopup}>Matchs</MenuItem>
                    <MenuItem onClick={() => { handleClose(); window.open(props[0]['img'], '_blank') }}>Agrandir</MenuItem>
                    <MenuItem onClick={handleOpenDownloadDialog}>Télécharger</MenuItem>
                    <MenuItem onClick={handleMapDeletion}>Supprimer</MenuItem>
                </Menu>
                <Popup publishOpen={publishOpen} publishClose={handlePublishClose} mapId={props[0]['id']}/>
                <MatchPopup open={matchPopupOpen} onClose={() => setMatchPopupOpen(false)} mapId={props[0]['id']} url={props[0]['img']}/>
                <DownloadDialog mapId={props[0]['id']} downloadDialogOpen={downloadDialogOpen} handleCloseDownloadDialog={handleCloseDownloadDialog}/>
            </Box>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}

function Popup(props) {
    const [popupContent, setPopupContent] = React.useState('statique')

    const handleRadioChange = (event) => {
        setPopupContent(event.target.value);
    };
    const handlePlaceHolder = () => {
        console.log('placeholder function for publishing static map')
    }
    const handleValidate = () => {
        console.log('validate function for publishing static map')

        return (
            <Dialog open={props.publishOpen} onClose={props.publishClose}>
                <DialogContent>
                    <FormControl>
                        <FormLabel>Type de map</FormLabel>
                        <RadioGroup
                            row
                            value={popupContent}
                            onChange={handleRadioChange}
                        >
                            <FormControlLabel value="statique" control={<Radio/>} label="statique"/>
                            <FormControlLabel value="dynamique" control={<Radio/>} label="dynamique"/>
                        </RadioGroup>
                    </FormControl>
                    {popupContent === 'statique' && <div>
                        <p>this will publish a static map</p>
                        <Button onClick={handlePlaceHolder}>Placeholder</Button>
                    </div>}
                    {popupContent === 'dynamique' && <div>
                        <p>dynamique</p>
                    </div>}
                </DialogContent>
                {popupContent !== 'group' && (
                    <DialogActions>
                        <Button onClick={handleValidate}>
                            Valider
                        </Button>
                    </DialogActions>
                )}
            </Dialog>
        )
    }
}

function MatchPopup(props) {
    const handleValidate = () => {
        console.log('validate function for match popup');
    };

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <GameList mapId={props.mapId} url={props.url}/>
        </Dialog>
    );
}

function DownloadDialog (props) {
    const [downloadFormat, setDownloadFormat] = React.useState('png');
    const handleDownloadFormatChange = (event) => {
        setDownloadFormat(event.target.value);
    };
    const handleDownload = () => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = document.getElementById(props.mapId).src;
        console.log(img.src)
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = this.naturalWidth;
            canvas.height = this.naturalHeight;
            ctx.drawImage(this, 0, 0);

            switch (downloadFormat) {
                case 'png':
                case 'jpg':
                    const format = downloadFormat === 'png' ? 'image/png' : 'image/jpeg';
                    const link = document.createElement('a');
                    link.download = `my-map.${downloadFormat}`;
                    link.href = canvas.toDataURL(format);
                    link.click();
                    break;
                case 'pdf':
                    canvas.toBlob((blob) => {
                        const reader = new FileReader();
                        reader.onloadend = function() {
                            const base64data = reader.result;                
                            const pdf = new jsPDF({
                                orientation: canvas.width > canvas.height ? 'l' : 'p',
                                unit: 'px',
                                format: [canvas.width, canvas.height]
                            });
                            pdf.addImage(base64data, 'JPEG', 0, 0, canvas.width, canvas.height);
                            pdf.save("my-map.pdf");
                        }
                        reader.readAsDataURL(blob);
                    }, 'image/jpeg');
                    break;
                default:
                    break;
            }
        };
        img.onerror = function() {
            console.error('Could not load image');
        };
        props.handleCloseDownloadDialog();
    };
    return (
        <Dialog open={props.downloadDialogOpen} onClose={props.handleCloseDownloadDialog}>
            <DialogTitle style={{ color: 'black' }}>Choisir le format de téléchargement</DialogTitle>
            <DialogContent>
                <RadioGroup value={downloadFormat} onChange={handleDownloadFormatChange}>
                    <FormControlLabel value="png" control={<Radio />} label="PNG" />
                    <FormControlLabel value="jpg" control={<Radio />} label="JPG" />
                    <FormControlLabel value="pdf" control={<Radio />} label="PDF" />
                </RadioGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleCloseDownloadDialog}>Annuler</Button>
                <Button onClick={handleDownload}>Enregistrer</Button>
            </DialogActions>
        </Dialog>
    )
}

export default function MapList() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [itemData, setItemData] = useState([]);

    const fetchMaps = (uid) => {
        fetch(`${apiUrl}api/map/${uid}`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error("There has been a problem with your fetch operation")
            })
            .then(data => {
                setItemData(convertToImageListData(data));
                setIsLoaded(true)
            }).catch((error) => {
            console.log('error: ' + error);
        });
    };

    function convertToImageListData(data) {
        return data.map(item => {
            let filename = item.url.split('/').pop();
            return {
                id: item.mapId,
                img: item.url,
                filename: filename,
                rows: 2,
                cols: 2,
                featured: true,
            };
        });
    }

    useEffect(() => {
        setIsLoaded(true)
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                fetchMaps(uid);
            } else {
                redirect('/login');
            }
        });
    }, []);
    if (!isLoaded) {
        return <div>Loading...</div>
    } else {
        return (
            <Box style={{justifyContent: 'center', display: 'flex', height: '90vh'}} sx={{width: 1}}>
                <ImageList sx={{width: 700, height: 1000}}>
                    <ImageListItem key="Subheader" cols={2}>
                        <ListSubheader component="div">Nombre de scans : {itemData.length}</ListSubheader>
                    </ImageListItem>
                    {itemData.map((item) => (
                        <ImageListItem key={item.img}>
                            <img
                                id={item.id}
                                src={item.img}
                                srcSet={item.img}
                                alt={item.filename}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={item.filename}
                                subtitle={item.author}
                                actionIcon={
                                    <MapOptions img={item.img} id={item.id} name={item.filename} mapId={item.id}/>
                                }
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>
        );
    }
}