const apiService = require('./services/APIservice')
const databaseService = require('./services/databaseService')

class checkAPI {
    // information required for particular API calls
    targetInformation = []
    responses = []
    DatabaseService = new databaseService()

    checkAPIs(targetInformation) {
        this.targetInformation = targetInformation
        this.targetInformation.forEach((information) => {
            this.executeAPICall(information)
        })
    }

    executeAPICall(information) {
        apiService.makeRequest(information, (resObj) => {
            console.log(resObj)
            this.DatabaseService.updateStatus(resObj)
        })
    }
}

module.exports = checkAPI
