import express from 'express'
import Debug from 'debug'

const app = express.Router()
const debug = new Debug('platzi-overflow:auth')

const users = [
    {
        email: 'aaaa@aaa.com',
        password: '1234',
        firstName: 'Sacha',
        lastName: 'Lifszyc',
        _id: 123
    }
]

const findUserByEmail = e => users.find(({ email }) => email === e);
// otra forma de escribir la funcion:
// function findUserByEmail(email) {
//     return users.find(user => user.email === email)
// }

function comparePasswords(providedPassword, userPassword) {
    return providedPassword === userPassword
} 

function handleLoginFailed(res) {
    return res.status(401).json({
        message: 'Login failed',
        error: 'Email and password dont match'
    })
}

app.post('/signin', (req,res,next) => {
    const { email, password } = req.body
    const user = findUserByEmail(email)

    if (!user) {
        debug(`user with email ${email} not found`)
        return handleLoginFailed(res)
    }

    if(!comparePasswords(password, user.password)) {
        debug(`password do not match: ${password} !== ${user.password}`)
        return handleLoginFailed(res)
    }

})



export default app
