const apiService = require('./services/APIservice')

class checkAPI {
    // information required for particular API calls
    targetInformation = []
    responses = []

    checkAPIs(targetInformation) {
        this.targetInformation = targetInformation
        this.targetInformation.forEach((information) => {
            this.executeAPICall(information)
        })
        console.log(this.responses)
        return this.responses
    }

    executeAPICall(information) {
        apiService.makeRequest(information, (resObj) => {
            this.responses.push(resObj)
        })
    }
}

module.exports = checkAPI
