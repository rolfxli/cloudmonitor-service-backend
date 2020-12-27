const pg = require('pg')
const config = require('../config')

class databaseService {
    connectionString = config.connectionString
    client = new pg.Client({
        host: config.databaseInformation.server,
        port: config.databaseInformation.port,
        user: config.databaseInformation.username,
        password: config.databaseInformation.password,
        database: config.databaseInformation.database
    })

    // connect to the Postgres instance
    connect() {
        this.client.connect(err => {
            if (err) {
                console.log('Connection Failed.')
            } else {
                console.log('Connection Success.')
            }
        })
    }

    updateStatus() {

    }

    async getUsers() {
        var query = await this.client.query('SELECT * FROM "Users"')
        console.log(query.rows)
    }

    getProjects() {

    }

    async getUrls() {
        var query = await this.client.query('SELECT * FROM "Url"')
        console.log(query.rows)
    }


}

module.exports = databaseService
