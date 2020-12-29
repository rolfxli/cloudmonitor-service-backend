var queries = {}

queries.get = {
    getAllUsers: 'SELECT * FROM "Users"',
    getAllUrls: 'SELECT * FROM "Targets"',
    getAllProjects: 'SELECT * FROM "Projects"',
    getAllResponseTimes: 'SELECT * FROM "ResponseTime"'
}

queries.post = {
    responseTime: 'INSERT INTO "ResponseTime"("Timestamp", "ResponseTime", "UrlId") VALUES($1, $2, $3)',
    createResponseRecord: 'UPDATE "Targets" SET "MostRecentStatus"=($1), "NumSuccess"=($2), "NumFailure"=($3) WHERE "UrlId"=($4)'
}

module.exports = queries