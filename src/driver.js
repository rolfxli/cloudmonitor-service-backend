const checkAPI = require('./checkAPI')
const databaseService = require('./services/databaseService')

// driver class to handle retrieving target APIs, pinging targets, and recording results
class Driver {
    rawTargetInformation = []
    formattedTargetInformation = []
    responses = []
    testInformation = [{url: 'http://www.google.com', method: 'GET'}, {url: 'https://cloudmonitortestget.free.beeceptor.com', method: 'GET'}]

    CheckAPI = new checkAPI()
    DatabaseService = new databaseService()

    // handler method to control entire process
    async handleProcess() {
        this.DatabaseService.connect()

        //this.retrieveAllProjects()
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
        // this.rawTargetInformation.forEach((information) => {
        //     this.formattedTargetInformation.push({
        //         urlID: information.UrlId,
        //         url: information.Link,
        //         method: information.RequestType
        //     })
        // })
    }
}

module.exports = Driver;
