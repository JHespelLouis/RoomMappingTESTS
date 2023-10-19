import { generateUploadURL } from '../s3.js'
const express = require('express');
const router = express.Router();

router.get('/', userCtrl.getMap);

router.get('/s3Url', async (req, res) => {
    const url = await generateUploadURL()
    res.send({url})
})


module.exports = router;