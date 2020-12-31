const request = require('request');

function makeRequest(information, callback) {
    // have a separate method to format the options based on info stored in db?
    let options = {
        url: information.url,
        method: information.method,
        time: true
    };
    
    /* executes API request given options (url, type, headers, auth)
       returns custom object {urlId, url, status, responseCode, responseStart, responseTime}
    */
    request(options, (err, res, body) => {
        var status = 'Pending';
        var responseCode = 400;
        var responseTime = 0;
        var responseStart = new Date();

        var success = information.numSuccess;
        var failure = information.numFail;

        if (err) {
            status = 'FAIL';
            failure++;
        } else if ((res.statusCode == 200) || (res.statusCode == 201)) {
            status = 'SUCCESS';
            success++;
        } else {
            status = 'FAIL';
            failure++;
        }

        if (res) {
            responseCode = res.statusCode;
            responseTime = res.timings.end;
            responseStart = new Date(res.timingStart);
        }

        if (responseTime) {
            responseTime = Math.round(responseTime)
        }

        resObj = {
            urlId: information.urlID,
            url: information.url,
            status: status,
            responseCode: responseCode,
            responseStart: responseStart,
            responseTime: responseTime,
            numFail: failure,
            numSuccess: success
        };

        callback(resObj);
    })
}

module.exports.makeRequest = makeRequest;
