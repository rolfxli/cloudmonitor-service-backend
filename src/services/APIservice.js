const axios = require('axios');

function makeRequest(information, emailMap, callback) {
    // variables to execute in the callback
    var status = 'PENDING';
    var responseCode = 400;
    var responseTime = 0;
    var responseStart = new Date();
    var success = information.numSuccess;
    var failure = information.numFail;

    // set up options for request
    var includeHeader = false;
    var includeData = false;
    var options = {
        url: information.url,
        method: information.method
    };

    // get the request body and headers
    var requestBody = "";
    var requestHeader = "";
    try {
        requestBody = JSON.parse(JSON.parse(information.requestbody));
        includeData = true;
    } catch (err) {
        console.log('Cannot parse body.');
        requestBody = "";
    }
    try {
        requestHeader = JSON.parse(JSON.parse(information.requestheader));
        includeHeader = true;
    } catch (err) {
        console.log('Cannot parse header.');
        requestHeader = "";
    }

    // if Header exists, add to options
    if (includeHeader) {
        options['headers'] = requestHeader;
    }
    // if Data exists, add to options
    if (includeData) {
        options['data'] = requestBody;
    }
    
    /* executes API request given options (url, type, headers, auth)
       returns custom object {urlId, url, status, responseCode, responseStart, responseTime}
    */
    axios(options)
        .then((res) => {
            // calculate the elapsed time for the request
            responseEnd = new Date();
            responseTime = responseEnd - responseStart;
            responseCode = res.status;

            if ((res.status == 200) || (res.status == 201)) {
                // successful API request made
                status = 'SUCCESS'; 
                success++;
            } else {
                // uncuessful API request made
                status = 'FAIL';
                failure++;
                // notify the user through email
                sendFailEmail(information.urlID, emailMap)
            }
            
            // execute the callback with necessary information
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
        .catch((err) => {
            console.log(err.message)
            status = 'FAIL';
            failure++;

            // calculate the elapsed time for the request
            responseEnd = new Date();
            responseTime = responseEnd - responseStart;
            responseCode = res.status;

            // execute the callback with necessary information
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
            // notify the user through email
            sendFailEmail(information.urlID, emailMap)
            // execute callback
            callback(resObj);
        })
}

// find the Email assosiated with the target ID, and trigger email sendout 
function sendFailEmail(urlid, emailMap) {
    var email = [];
    try {
        email.push(emailMap[urlid])
    } catch (error) {
        console.log(error)
    }

    // set up payload for the email sendout
    var requestData = {
        emails: email
    }
    var requestBody = requestData;

    var options = {
        url: 'https://valid-actor-299903.ue.r.appspot.com/sendemail',
        method: 'POST',
        data: requestBody
    }

    axios(options)
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err.message)
        })
}

module.exports.makeRequest = makeRequest;
module.exports.sendFailEmail = sendFailEmail;
