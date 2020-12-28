var queries = {}

queries.get = {
    getAllUsers: 'SELECT * FROM "Users"',
    getAllUrls: 'SELECT * FROM "Targets"',
    getAllProjects: 'SELECT * FROM "Projects"',
    getAllResponseTimes: 'SELECT * FROM "ResponseTime"'
}

queries.post = {
    responseTime: 'UPDATE ResponseTime SET Timestamp=($1), ResponseTime=($2) WHERE UrlId=($3)'
}

module.exports = queries