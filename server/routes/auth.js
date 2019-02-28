import express from 'express'
import Debug from 'debug'
import jwt from 'jsonwebtoken'
import { secret } from '../config'
import { User } from '../model'

const app = express.Router()
const debug = new Debug('platzi-overflow:auth')

function comparePasswords(providedPassword, userPassword) {
    let compare = false
    if (providedPassword === userPassword) {
        compare = true
    }
    // console.log(`compare ${compare}`)
    return compare
} 

function handleLoginFailed(res, message) {
    return res.status(401).json({
        message: 'Login failed',
        error: message || 'Email and password dont match'
    })
}

app.post('/signin', async (req,res,next) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    let myMessageToken = {}

    if (!user) {
        debug(`user with email ${email} not found`)
        return handleLoginFailed(res)
    }

    if(!comparePasswords(password, user.password)) {
        debug(`password do not match: ${password} !== ${user.password}`)
        return handleLoginFailed(res, 'El correo y la contraseña no coinciden')
    }

    const token = createToken(user)
    
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

const createToken = (user) => jwt.sign({ user }, secret, { expiresIn: 86400 })


app.post('/signup', async (req, res)=> {
    const { firstName, lastName, email, password } = req.body
    const u = new User({
        firstName,
        lastName,
        email,
        password
    })

    debug(`Creating new user ${user}`)

    const user = await u.save()

    const token = createToken(user)
    res.status(201).json( {
        message: 'User saved',
        token,
        userId: user._id,
        firstName,
        lastName,
        email
    })

})



export default app
