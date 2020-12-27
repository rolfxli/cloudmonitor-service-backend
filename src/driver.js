const checkAPI = require('./checkAPI')

// driver class to handle retrieving target APIs, pinging targets, and recording results
class Driver {
    targets = []
    responses = []
    CheckAPI = new checkAPI()

    // handler method to control entire process
    pingAllTargets() {
        //
        for(let target in this.targets) {
            this.checkTarget(target)
        }
    }

    // retrieve the list of users
    retrieveUsers() {
        // for each user ping the URLs in their projects
    }

    // retrieve all the URLs that will be pinged
    retrieveURLs() {
        // get all the URLS
    }

    // ping an API
    checkTarget(target) {
        this(target, (res) => {
            this.responses.push(res)
        })
    }

    // record data
}

module.exports = Driver;
