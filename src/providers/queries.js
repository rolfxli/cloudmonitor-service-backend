var queries = {}

queries.get = {
    getAllUsers: 'SELECT * FROM "Users"',
    getAllUrls: 'SELECT * FROM "Targets"',
    getAllProjects: 'SELECT * FROM "Projects"',
    getAllResponseTimes: 'SELECT * FROM "ResponseTime"'
}

queries.post = {
    responseTime: 'INSERT INTO "ResponseTime"("Timestamp", "ResponseTime", "UrlId") VALUES($1, $2, $3)'
}

module.exports = queries