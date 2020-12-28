const apiService = require('../services/APIservice')
const databaseService = require('../services/databaseService')

class checkAPI {
    // information required for particular API calls
    targetInformation = [];
    DatabaseService = new databaseService();

    // execute all target APIs from database
    checkAPIs(targetInformation) {
        this.targetInformation = targetInformation
        this.targetInformation.forEach((information) => {
            this.executeAPICall(information);
        })
    }

    // execute a given API and return reqest information
    executeAPICall(information) {
        apiService.makeRequest(information, (resObj) => {
            console.log(resObj);
            this.DatabaseService.updateStatus(resObj);
        })
    }
}

module.exports = checkAPI
