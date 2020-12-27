var queries = {}

queries.get = {
    getAllUsers: 'SELECT * FROM "Users"',
    getAllUrls: 'SELECT * FROM "Targets"',
    getAllProjects: 'SELECT * FROM "Projects"'
}

queries.post = {
    responseTime: 'UPDATE ResponseTime SET Timestamp = ($1), ResponseTime = ($2)'
}

module.exports = queries