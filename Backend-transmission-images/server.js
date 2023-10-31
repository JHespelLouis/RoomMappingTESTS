const express = require("express")
require('dotenv').config()
var admin = require("firebase-admin");
const {getFirestore} = require("firebase-admin/firestore")
console.log(process.env.SERVICE_ACCOUNT)
var serviceAccount = require(process.env.SERVICE_ACCOUNT);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://roommapping-airsoft-default-rtdb.europe-west1.firebasedatabase.app"
});

const db = getFirestore()

async function fetch(){
    console.log(await db.collection("data").doc("maps").get())
}

async function readData() {
    const snapshot = await db.collection("data").get();
    const maps = [];
    snapshot.forEach(doc => {
        maps.push({ mapId: doc.id, ...doc.data() })
    })
    console.log(maps)
    return maps;
}

const app = express()

app.get("/", async (req, res) => {
    const data = await readData("data");
    console.log(data)
})

app.listen(5000, () => {console.log("server started on port 5000"); readData()})
