import express from 'express'
import { question, auth } from './routes'
import bodyParser from 'body-parser'
import path from 'path'

const app = express()
const etapa = process.env.NODE_ENV.toString()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

function servidor(deploy) {
    let devServer = false
    if (deploy==='development') {
        devServer = true
    }
    return devServer
}

if (servidor(etapa)) {
    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept')
      res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS')
      next()
    })
} else {
    app.use('/', express.static(path.join(process.cwd(), 'dist/platzi-overflow')))
}



app.use('/api/questions', question)
app.use('/api/auth', auth)

export default app
