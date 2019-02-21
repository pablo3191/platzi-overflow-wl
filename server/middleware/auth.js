import Debug from 'debug'
import { secret } from '../config'
import jwt from 'jsonwebtoken'

const debug = new Debug('platzi-overflow:auth-middleware')

export const users = [
    {
        email: 'test@test',
        password: '1234',
        firstName: 'Sacha',
        lastName: 'Lifszyc',
        _id: 123
    }
]

export const findUserByEmail = e => users.find(({ email }) => email === e);

export const required = (req, res, next) => {
    jwt.verify(req.query.token, secret, (err, token)=> {
        if (err) {
            debug('JWT wat not encrypted with our secret')
            return res.status(401).json({
                message: 'Unauthorized',
                error: err
            })
        }

        debug(`Token verified ${token}`)
        req.user = token.user
        next()
    })
}