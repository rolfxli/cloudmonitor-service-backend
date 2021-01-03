const apiService = require('../services/APIservice')
const databaseService = require('../services/databaseService')

class checkAPI {
    // information required for particular API calls
    targetInformation = [];
    DatabaseService = new databaseService();

    // execute all target APIs from database
    checkAPIs(targetInformation, emailMap) {
        this.targetInformation = targetInformation
        this.targetInformation.forEach((information) => {
            this.executeAPICall(information, emailMap);
        })
    }

    // execute a given API and return reqest information
    executeAPICall(information, emailMap) {
        apiService.makeRequest(information, emailMap, (resObj) => {
            console.log(resObj);
            this.DatabaseService.createResponseRecord(resObj);
        })
    }
}

module.exports = checkAPI
