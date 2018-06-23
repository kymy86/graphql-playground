const jwt = require('jsonwebtoken')
const APP_SECRET = 'GraphQL-secret'

function getUserId(context){
    const Authorization = context.request.get('Autorization')
    if(Authorization){
        const token = Authorization.replace('Bearer ', '')
        const {userId} = jwt.verify(token, APP_SECRET)
        return userId
    }
    throw new Error('Not Authenticated')
}

module.exports = {
    APP_SECRET,
    getUserId
}