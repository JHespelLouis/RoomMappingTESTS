const express = require("express")
const app = express()

app.get("/api", (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
});

app.listen(5000, () => {console.log("server started on port 5000")})
