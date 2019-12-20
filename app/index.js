const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// require('./db/mongodb')
require('./db/mongoose')

const mongo = require('./mongo/router')

const port = process.NODE_PORT || 31415

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use('/mongo', mongo)
app.get('/', (req, res, next) => res.send('Hello World!'))

app.use((error, req, res, next) => {
    if (error.status) {
        res.send(error)
    } else {
        let answer = new Error()
        answer.message = 'Uncaught exeption!'
        res.status(500).send(answer)
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
