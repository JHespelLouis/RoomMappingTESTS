const {db} = require('../db.js');

exports.getMaps = async (req, res, next) => {
    console.log('getMaps');
    try {
        const mapCollection = db.collection(`users/${req.params.uid}/maps`);
        const snapshot = await mapCollection.get();
        console.log(snapshot)
        const mapsList = [];
        snapshot.forEach((doc) => {
            const gameData = doc.data();

            mapsList.push({
                mapId: doc.id,
                ...gameData
            });
        });
        console.log(mapsList);

        res.status(200).json(mapsList);
    } catch (error) {
        console.error('Erreur lors de la récupération des parties :', error);
        res.status(500).send('Internal Server Error');
    }
};