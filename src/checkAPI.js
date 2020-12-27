const apiService = require('./services/APIservice')

class checkAPI {
    // information required for particular API calls
    targetInformation = []
    responses = []

    checkAPIs() {
        for (let information in this.targetInformation) {
            this.executeAPICall(information)
        }
    }

    executeAPICall(information) {
        apiService.makeRequest(information, (resObj) => {
            this.responses.push(resObj)
        })
    }
}

module.exports = checkAPI
