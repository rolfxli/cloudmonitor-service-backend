const Pool = require('pg').Pool;
const config = require('../providers/config');
const queries = require('../providers/queries');

class databaseService {
    // set up the connection to the database
    connectionString = config.connectionString;
    pool = new Pool({
        host: config.databaseInformation.server,
        port: config.databaseInformation.port,
        user: config.databaseInformation.username,
        password: config.databaseInformation.password,
        database: config.databaseInformation.database
    });

    // update row containing matching UrlID in ResponseTime table
    async createResponseRecord(resObj) {
        var values = [resObj.responseStart, resObj.responseTime, resObj.urlId]
        
        this.pool.query(queries.post.responseTime, values, (err, res) => {
            if (err) {
                console.log(err);
            }
        })

        var urlValues = [resObj.status, resObj.numSuccess, resObj.numFail, resObj.urlId]
        this.pool.query(queries.post.createResponseRecord, urlValues, (err, res) => {
            if (err) {
                console.log(err);
            }
        })

    }

    // retrieve all users in the database (data MUST be retrieved before return)
    async getAllUsers() {
        var query = await this.pool.query(queries.get.getAllUsers);
        console.log(query.rows);
    }

    // retrieve all projects in the database (data MUST be retrieved before return)
    async getAllProjects() {
        var query = await this.pool.query(queries.get.getAllProjects);
        console.log(query.rows);
    }

    // retrieve all URLs in the database (data MUST be retrieved before return)
    async getAllUrls() {
        try {
            var query = await this.pool.query(queries.get.getAllUrls);
            if (query) {
                if (query.rows) {
                    return query.rows;
                }
            }
        } catch (err) {
            console.log('Error retrieving target URLs.');
        }
        return []
    }

    // retrieve all response times in the database (data MUST be retrieved before return)
    async getAllResponseTimes() {
        try {
            var query = await this.pool.query(queries.get.getAllResponseTimes);
            if (query) {
                if (query.rows) {
                    console.log(query.rows);
                    return query.rows;
                }
            } 
        } catch (err) {
            console.log('Error retrieving response times.');
        }
        return [];
    }

    // return rows with TargetID and Emails
    async getEmails() {
        try {
            var query = await this.pool.query(queries.get.getEmails);
            if (query) {
                if (query.rows) {
                    return query.rows
                }
            }
        } catch (err) {
            console.log(err)
        }
        return []
    }
}

module.exports = databaseService;
