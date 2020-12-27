const checkAPI = require('./checkAPI')
const databaseService = require('./services/databaseService')

// driver class to handle retrieving target APIs, pinging targets, and recording results
class Driver {
    targetInformation = [{url: 'http://www.google.com', method: 'GET'}, {url: 'https://cloudmonitortestget.free.beeceptor.com', method: 'GET'}]
    responses = []
    CheckAPI = new checkAPI()
    DatabaseService = new databaseService()

    // handler method to control entire process
    handleProcess() {
        this.DatabaseService.connect()
        //this.DatabaseService.getUrls()
        this.DatabaseService.getUsers()
        this.CheckAPI.checkAPIs(this.targetInformation)
    }

    // retrieve the list of users
    retrieveUsers() {
        // for each user ping the URLs in their projects
    }

    retrieveUrls() {

    }

    // notify users on failure
    notifyUsers() {

    }

    // record data
}

module.exports = Driver;
