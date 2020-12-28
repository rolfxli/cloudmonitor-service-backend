const pg = require('pg')
const config = require('../config')
const queries = require('../queries')

class databaseService {
    // set up the connection to the database
    connectionString = config.connectionString
    client = new pg.Client({
        host: config.databaseInformation.server,
        port: config.databaseInformation.port,
        user: config.databaseInformation.username,
        password: config.databaseInformation.password,
        database: config.databaseInformation.database
    })

    // connect to the database instance
    connect() {
        this.client.connect(err => {
            if (err) {
                console.log('Connection Failed.')
            } else {
                console.log('Connection Success.')
            }
        })
    }

    // update status of a target following liveness check
    async updateStatus(resObj) {
        var values = [resObj.responseStart, resObj.responseTime, resObj.urlId]
        // console.log(values)
        // console.log(queries.post.responseTime)
        
        var query = this.client.query(queries.post.responseTime, values, (err, res) => {
            if (err) {
                console.log('Error occured.')
            } else {
                console.log('Finished query')
            }
        })
        
        // var query = this.client.query(queries.post.responseTime, values, (err, res) => {
        //     if (err) {
        //         console.log('Failed to update status in database.')
        //     } else {
        //         console.log('Sucessfully updated database.')
        //     }
        // })
    }

    async getAllUsers() {
        // must guarantee user list is retrieved before continuing
        var query = await this.client.query(queries.get.getAllUsers)
        console.log(query.rows)
    }

    async getAllProjects() {
        // must guarantee project list is retrieved before continuing
        var query = await this.client.query(queries.get.getAllProjects)
        console.log(query.rows)
    }

    async getAllUrls() {
        // must guarantee URL list is retrieved before continuing
        try {
            var query = await this.client.query(queries.get.getAllUrls)
            if (query) {
                if (query.rows) {
                    return query.rows
                }
            }
        } catch (err) {
            console.log('Error retrieving target URLs.')
        }
        return []
    }

    async getAllResponseTimes() {
        try {
            var query = await this.client.query(queries.get.getAllResponseTimes)
            if (query) {
                if (query.rows) {
                    console.log(query.rows)
                    return query.rows
                }
            } 
        } catch (err) {
            console.log('Error retrieving response times.')
        }
        return []
    }
}

module.exports = databaseService
