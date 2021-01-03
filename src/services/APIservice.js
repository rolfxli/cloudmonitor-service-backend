const request = require('request');

function makeRequest(information, emailMap, callback) {
    // have a separate method to format the options based on info stored in db?
    var requestBody = ""
    var requestHeader = ""
    try {
        requestBody = JSON.parse(information.requestbody);
    } catch (err) {
        requestBody = ""
    }
    try {
        requestHeader = JSON.parse(information.requestheader);
    } catch (err) {
        requestHeader = ""
    }
    let options = {
        url: information.url,
        method: information.method,
        headers: requestHeader,
        body: requestBody,
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
            sendFailEmail(information.urlID, emailMap);
        } else if ((res.statusCode == 200) || (res.statusCode == 201)) {
            status = 'SUCCESS';
            success++;
        } else {
            status = 'FAIL';
            failure++;
            sendFailEmail(information.urlID, emailMap);
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

// find the Email assosiated with the target ID, and trigger email sendout 
function sendFailEmail(urlid, emailMap) {
    var email = emailMap[urlid]; //https://valid-actor-299903.ue.r.appspot.com/sendemail
    let requestBody = JSON.stringify({email});
    let options = {
        url: 'https://valid-actor-299903.ue.r.appspot.com/sendemail',
        body: requestBody
    }
    request(options, (res, err, body) => {
        if (res) {

        }
        if (err) {
            console.log(err);
        }
    });
}

module.exports.makeRequest = makeRequest;
module.exports.sendFailEmail = sendFailEmail;
