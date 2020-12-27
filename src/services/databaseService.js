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
    updateStatus() {
        var values = []
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
        var query = await this.client.query(queries.get.getAllUrls)
        //console.log(query.rows)
        return query.rows
    }
}

module.exports = databaseService
