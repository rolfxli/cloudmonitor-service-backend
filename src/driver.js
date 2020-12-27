// driver class to handle retrieving target APIs, pinging targets, and recording results
class Driver {
    urls = ['https://www.youtube.com/', 'https://www.google.com/', 'https://www.facebook.com/']

    // handler method to control entire process
    async pingAllTargets() {
        // ensure all users are retrieved from database
        await this.retrieveUsers()
    }

    // retrieve the list of users
    retrieveUsers() {
        // for each user ping the URLs in their projects
    }

    // retrieve all the URLs that will be pinged
    retrieveURLs() {
        // get all the URLS
    }

    // 
    pingURLs() {
        // ping the URLs
    }

    // record data
}

module.exports = Driver;
