class Ping {
    // URLs to be pinged
    targetURLs = []
    // 
    ping(url, callback) {
        var status = 'Pending'
        var callback = callback
        var url = url
        var startTime = null
        var endTime = null
        var responseTime = null
        
        // manipulate the Image object type to 'load' the desired target
        // as an image to test if URL is live
        var image = new Image()
        image.onload = () => {
            status = 'Success'
            if (startTime && endTime) {
                responseTime = Math.abs(endTime - startTime)
            }

            cbObj = {
                status: status,
                time: responseTime
            }
            callback(cbObj)
        }
        image.onerror = () => {
            status = 'Error'
            
            cbObj = {
                status: status,
                time: responseTime
            }
            callback(cbObj)
        }

        setTimeout(() => {
            cbObj = {
                status: 'Timeout',
                time: responseTime
            }
            callback(cbObj)
        }, 5000)
    }
}

module.exports = Ping
