const request = require('request')

function makeRequest(information, callback) {
    //console.log(information)
    //  have a separate method to format the options based on info stored in db?
    let options = {
        url: information.url,
        method: information.method,
        time: true
    }
    //console.log(options)
    request(options, (err, res, body) => {
        var status = 'Pending'
        var responseCode = null
        var responseTime = null
        var responseStart = null

        if (err) {
            status = 'Failed'
        } else if ((res.statusCode == 200) || (res.statusCode == 201)) {
            status = 'Success'
        } else {
            status = 'Undetermined'
        }

        if (res) {
            responseCode = res.statusCode
            responseTime = res.timings.end
            responseStart = new Date(res.timingStart)
        }

        resObj = {
            urlId: information.urlID,
            url: information.url,
            status: status,
            responseCode: responseCode,
            responseStart: responseStart,
            responseTime: responseTime
        }

        console.log(resObj)
        callback(resObj)
    })
}

module.exports.makeRequest = makeRequest
