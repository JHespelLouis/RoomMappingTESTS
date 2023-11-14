const dotenv = require('dotenv')
const aws = require('aws-sdk')
const crypto = require ('crypto')
const { promisify } = require("util")
const randomBytes = promisify(crypto.randomBytes)
require('dotenv').config({path :'.env'});
const {ListObjectsV2Command, S3Client} = require("@aws-sdk/client-s3");

dotenv.config()

const region = "eu-north-1"
const bucketName = "roommappingbucket"
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

async function generateUploadURL() {
   const rawBytes = await randomBytes(16)
   const imageName = rawBytes.toString('hex')

    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    })

    const uploadURL = await s3.getSignedUrlPromise('getObject', params)
    console.log(uploadURL)
    return uploadURL
}

async function getObject(){
    const params = ({
        Bucket: 'roommappingbucket',
        Key: 'Cat.png'
    })
    s3.getObject(params, function(err, data){
        if (err){console.log(err, err.stack)}
        else console.log(data)
    })
}

const client = new S3Client({});

async function getKeys(){
    const command = new ListObjectsV2Command({
        Bucket: "roommappingBucket",
        region: "eu-north-1"
    });

    try {
        let isTruncated = true;

        console.log("Your bucket contains the following objects:\n");
        let contents = "";

        while (isTruncated) {
            const { Contents, IsTruncated, NextContinuationToken } =
                await client.send(command);
            const contentsList = Contents.map((c) => ` • ${c.Key}`).join("\n");
            contents += contentsList + "\n";
            isTruncated = IsTruncated;
            command.input.ContinuationToken = NextContinuationToken;
        }
        console.log(contents);
    } catch (err) {
        console.error(err);
    }
}

async function getObjectsFromS3Bucket() {
    let isTruncated = true;
    let marker;
    while(isTruncated) {
        let params = {Bucket: "roommappingbucket"};
        if (marker) params.Marker = marker;
        const response = await s3.listObjects(params).promise();
        response.Contents.forEach(item => {
            console.log(item.Key);
            getObject(item.key)
        });
        isTruncated = response.IsTruncated
        if (isTruncated) {
            marker = response.Contents.slice(-1)[0].Key;
        }
    }
}

module.exports = {generateUploadURL, getObject, getKeys, getObjectsFromS3Bucket};