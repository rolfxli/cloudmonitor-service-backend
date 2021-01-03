const checkAPI = require('./checkAPI')
const databaseService = require('../services/databaseService');
const config = require('../providers/config');

// driver class to handle retrieving target APIs, pinging targets, and recording results
class Driver {
    rawTargetInformation = [];
    formattedTargetInformation = [];
    responses = [];
    emails = []
    targetEmailPairs = {};
    testInformation = config.testInformation;

    CheckAPI = new checkAPI();
    DatabaseService = new databaseService();

    // handler method to control entire process
    async handleProcess() {
        // set the API targets
        await this.retrieveAllUrls();
        this.formatRequest();

        await this.getEmails();
        this.mapEmails();

        // execute API requests and update corresponding status on database
        this.CheckAPI.checkAPIs(this.formattedTargetInformation, this.targetEmailPairs);
    }

    async getEmails() {
        this.emails = await this.DatabaseService.getEmails();
    }

    // map emails to their targetIDs
    mapEmails() {
        var len = this.emails.length;
        for (let i = 0; i < len; ++i) {
            var email = this.emails[i]['Email'];
            var urlid = this.emails[i]['UrlId'];
            this.targetEmailPairs[urlid] = email
        }
    }

    // retrieve all users in the database (data MUST be retrieved before return)
    retrieveUsers() {
        this.DatabaseService.getAllUsers();
    }

    // retrieve all URLs in the database (data MUST be retrieved before return)
    async retrieveAllUrls() {
        this.rawTargetInformation = await this.DatabaseService.getAllUrls();
    }

    // retrieve all projects in the database (data MUST be retrieved before return)
    retrieveAllProjects() {
        this.DatabaseService.getAllProjects();
    }

    // retrieve all response times in the database (data MUST be retrieved before return)
    async retrieveAllResponseTimes() {
        await this.DatabaseService.getAllResponseTimes();
    }

    // format raw target information
    formatRequest() {
        var len = this.rawTargetInformation.length;
        for (var i = 0; i < len; ++i) {
            var info = this.rawTargetInformation[i];
            this.formattedTargetInformation.push({
                urlID: info.UrlId,
                url: info.Link,
                method: info.RequestType,
                numSuccess: info.NumSuccess,
                numFail: info.NumFailure,
                requestheader: info.RequestHeader,
                requestbody: info.RequestBody
            });
        }
    }
}

module.exports = Driver;
