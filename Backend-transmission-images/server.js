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
    console.log(await db.collection("maps").doc("JoCeQlYFT3Mg7hJFone6").get())
}

const app = express()

app.listen(5000, () => {console.log("server started on port 5000"); fetch()})
