const Pool = require('pg').Pool
const config = require('../providers/config')
const queries = require('../providers/queries')

class databaseService {
    // set up the connection to the database
    connectionString = config.connectionString
    pool = new Pool({
        host: config.databaseInformation.server,
        port: config.databaseInformation.port,
        user: config.databaseInformation.username,
        password: config.databaseInformation.password,
        database: config.databaseInformation.database
    })

    // update status of a target following liveness check
    async updateStatus(resObj) {
        var values = [resObj.responseStart, resObj.responseTime, resObj.urlId]
        
        this.pool.query(queries.post.responseTime, values, (err, res) => {
            if (err) {
                console.log(err)
            }
        })
    }

    async getAllUsers() {
        // must guarantee user list is retrieved before continuing
        var query = await this.pool.query(queries.get.getAllUsers)
        console.log(query.rows)
    }

    async getAllProjects() {
        // must guarantee project list is retrieved before continuing
        var query = await this.pool.query(queries.get.getAllProjects)
        console.log(query.rows)
    }

    async getAllUrls() {
        // must guarantee URL list is retrieved before continuing
        try {
            var query = await this.pool.query(queries.get.getAllUrls)
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
            var query = await this.pool.query(queries.get.getAllResponseTimes)
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
