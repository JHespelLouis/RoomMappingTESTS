const express = require("express")
require('dotenv').config()
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

const uploadRouter = require('./routes/uploadFile');
const deleteRouter = require('./routes/deleteFile');

const app = express()

app.use("/api/upload", uploadRouter);

app.use("/api/delete", deleteRouter);

app.listen(5000, () => {console.log("server started on port 5000")});

module.exports = app;