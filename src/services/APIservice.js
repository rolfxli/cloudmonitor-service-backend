const request = require('request')

function makeRequest(information, callback) {
    console.log(information)
    let options = {
        url: information.url,
        method: information.method
    }
    console.log(options)
    request(options, (err, res, body) => {
        var status = 'Pending'
        var responseCode = null
        if (err) {
            status = 'Failed'
        } else if ((res.statusCode == 200) || (res.statusCode == 201)) {
            status = 'Success'
            responseCode = res.statusCode
        } else {
            status = 'Undetermined'
            responseCode = res.statusCode
        }
        resObj = {
            url: information.url,
            status: status,
            statusCode: responseCode
        }
        console.log(resObj)
        callback(resObj)
    })
}

module.exports.makeRequest = makeRequest
