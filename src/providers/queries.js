var queries = {}

queries.get = {
    getAllUsers: 'SELECT * FROM "Users"',
    getAllUrls: 'SELECT * FROM "Targets"',
    getAllProjects: 'SELECT * FROM "Projects"',
    getAllResponseTimes: 'SELECT * FROM "ResponseTime"',
    getEmails: 'SELECT "t".*, "u"."Email" FROM "Targets" as "t" JOIN "Projects" as "p" ON "t"."ProjectId" = "p"."ProjectId" join "Users" as "u" on "p"."UserId" = "u"."Userid"'
}

queries.post = {
    responseTime: 'INSERT INTO "ResponseTime"("Timestamp", "ResponseTime", "UrlId") VALUES($1, $2, $3)',
    createResponseRecord: 'UPDATE "Targets" SET "MostRecentStatus"=($1), "NumSuccess"=($2), "NumFailure"=($3) WHERE "UrlId"=($4)'
}

module.exports = queries