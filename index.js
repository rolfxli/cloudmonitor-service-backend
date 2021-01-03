// set up express.js requirements
const express = require('express')
const app = express()
const port = process.env.PORT || 4001
// import other requirements
const driver = require('./src/core/driver')
const notification = require('./src/core/notification')

var Driver = new driver()
var Notification = new notification()

// listen to the provided port, no actions are taken
app.listen(port, () => {
    console.log('Listening on port ${port}')
})

// test 
app.get('/', (req, res) => {
    res.send('Application running')
})

// GET request as entry point for GCP cron workflow trigger
app.get('/alltargets', (req, res) => {
    Driver.handleProcess()
    res.send('A ping has been made to all the targets.')
})

