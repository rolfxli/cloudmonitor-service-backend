const checkAPI = require('./checkAPI')
const databaseService = require('./services/databaseService')
const config = require('./config')

// driver class to handle retrieving target APIs, pinging targets, and recording results
class Driver {
    rawTargetInformation = []
    formattedTargetInformation = []
    responses = []
    testInformation = config.testInformation

    CheckAPI = new checkAPI()
    DatabaseService = new databaseService()

    // handler method to control entire process
    async handleProcess() {
        await this.retrieveAllResponseTimes()

        // set the API targets
        await this.retrieveAllUrls()
        this.formatRequest()
        console.log(this.formattedTargetInformation)

        // execute API requests and update corresponding status on database
        this.CheckAPI.checkAPIs(this.formattedTargetInformation)
    }

    // retrieve the list of users
    retrieveUsers() {
        this.DatabaseService.getAllUsers()
    }

    async retrieveAllUrls() {
        this.rawTargetInformation = await this.DatabaseService.getAllUrls()
    }

    retrieveAllProjects() {
        this.DatabaseService.getAllProjects()
    }

    async retrieveAllResponseTimes() {
        await this.DatabaseService.getAllResponseTimes()
    }

    // notify users on failure
    notifyUsers() {

    }

    // format raw target information
    formatRequest() {
        var len = this.rawTargetInformation.length
        for (var i = 0; i < len; ++i) {
            var info = this.rawTargetInformation[i]
            this.formattedTargetInformation.push({
                urlID: info.UrlId,
                url: info.Link,
                method: info.RequestType
            })
        }
    }
}

module.exports = Driver;
