const request = require('request')

function makeRequest(information, callback) {
    let options = {
        url: information.url,
        method: information.method
    }
    request(options, (err, res, body) => {
        var status = 'Pending'
        if (err) {
            status = 'Failed'
        } else if ((res.statusCode == 200) || (res.statusCode == 201)) {
            status = 'Success'
        } else {
            status = 'Undetermined'
        }
        resObj = {
            url: information.url,
            status: status
        }
        callback(resObj)
    })
}

module.exports.makeRequest = makeRequest
