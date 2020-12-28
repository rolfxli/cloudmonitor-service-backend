// set up express.js requirements
const express = require('express')
const app = express()
const port = process.env.PORT || 4001
// import other requirements
const driver = require('./src/driver.js')

var Driver = new driver()

// listen to the provided port, no actions are taken
app.listen(port, () => {
    console.log('Listening on port ${port}')
})

// GET request as entry point for GCP cron workflow trigger
app.get('/', (req, res) => {
    Driver.pingAllTargets()
    res.send('A ping has been made to all the tracked URLs.')
})

Driver.handleProcess()
