const express = require("express")
require('dotenv').config()
var admin = require("firebase-admin");
const {getFirestore} = require("firebase-admin/firestore")
console.log(process.env.SERVICE_ACCOUNT)
var serviceAccount = require(process.env.SERVICE_ACCOUNT);
const AWS = require('aws-sdk');
require('aws-sdk/lib/maintenance_mode_message').suppress = true;
const {generateUploadURL, getObject, getKeys, upload, getAllObjectsFromS3Bucket, getObjectsFromS3Bucket} = require("./s3");
//*/ get reference to S3 client
var s3 = new AWS.S3();


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://roommapping-airsoft-default-rtdb.europe-west1.firebasedatabase.app"
});

const db = getFirestore()

async function fetch(){
    console.log(await db.collection("data").doc("maps").get())
}

async function readData() {
    const snapshot = await db.collection("data").doc("maps").collection("user2").get();
    const maps = [];
    snapshot.forEach(doc => {
        maps.push({ mapId: doc.id, ...doc.data() })
    })
    let name = maps.map((item) => item.nom)
    console.log(name)
    return name;
}

myBucket = 'roommappingbucket'

async function readBucket() {
    s3.listObjectsV2({Bucket: myBucket })
        .promise()
        .then(data => {
            console.log(data);
            const baseURL = 'https://s3.amazonaws.com/${myBucket}/';
            let urlArr = data.Contents.map(e => baseURL + e.key);
            console.log(urlArr)
        })
        .catch(err => console.log(err))
}

const app = express()

app.listen(5000, () => {console.log("server started on port 5000"); getObjectsFromS3Bucket()})
