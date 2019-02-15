import express from 'express'
import Debug from 'debug'
import jwt from 'jsonwebtoken'

const app = express.Router()
const debug = new Debug('platzi-overflow:auth')

const secret = 'miclavesecreta'

const users = [
    {
        email: 'test@test',
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
    let compare = false
    if (providedPassword === userPassword) {
        compare = true
    }
    // console.log(`compare ${compare}`)
    return compare
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
    let myMessageToken = {}

    if (!user) {
        debug(`user with email ${email} not found`)
        return handleLoginFailed(res)
    }

    if(!comparePasswords(password, user.password)) {
        debug(`password do not match: ${password} !== ${user.password}`)
        return handleLoginFailed(res)
    }

    const token = jwt.sign({ user }, secret, { expiresIn: 86400 })
    
    myMessageToken = {
        message: 'Login succeded',
        token,
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    }
    console.log(myMessageToken)
    res.status(200).json(myMessageToken)
})



export default app
