import http from 'http'
import Debug from 'debug'

const PORT = 3000
const debug = new Debug('example-app:root')

const app = http.createServer((req, res) => {
    debug('new request')
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.write('Hola Mundo')
    res.end()
})

app.listen(PORT, ()=> {
    debug(`Server running at port: ${PORT}`)
})