exports.getMap = (req, res, next) => {
    pool.getConnection()
        .then(conn => {
            conn.query("CALL mapNames()")
                .then(rows => {
                    console.log("Getting map names");
                    res.status(200).json(rows[0]);
                })
                .catch(err => {
                        res.status(400).json({err});
                    }
                )
            conn.release()
        })
        .catch(err => {
            res.status(400).json({err});
        })
}