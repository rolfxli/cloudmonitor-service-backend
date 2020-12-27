const express = require('express')
const app = express()

// GET request as entry point for GCP cron workflow trigger
app.get('/', (req, res) => {
    // insantiate a 'driver' object to handle actual pings
    res.send('A ping has been made to all the tracked URLs.')
})