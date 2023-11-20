const { upload } = require('../s3.js');
const { db } = require('../db.js');
const express = require('express');
const {FieldValue} = require("firebase-admin/firestore");
const router = express.Router();

router.post('/', upload.single('file'), async function (req, res, next) {

    let response = req.file.location
    res.send('Successfully uploaded ' + req.file.location + ' location!')
    const userId = "ujjdY34Ui8S7ivFwoZy3rZrTLWp2";
    const usersCollection = db.collection('users');
    const userDoc = usersCollection.doc(userId)
    await userDoc.update({
        maps: FieldValue.arrayUnion(response)
    })
        .then(() => {
            console.log('Élément ajouté avec succès dans le tableau "maps" pour le user ' + userId);
        })
        .catch((error) => {
            console.error('Erreur lors de l\'ajout du document :', error);
        });
})

module.exports = router;