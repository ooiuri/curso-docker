const express = require('express')
const { mongo } = require('mongoose')
const restful = require('node-restful')
const server = express()
const mongoose = restful.mongoose
const bodyParser = require('body-parser')
const cors = require('cors')
// Database
mongoose.Promise = global.Promise
mongoose.connect('mongodb://db/mydb')

// Middlewares
server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())
server.use(cors())

// ODM
const Client = restful.model('Client', {
    name: { type: String, required: true},
    nota: { type: Number, required: true},
    sugestao: {type: String, required: true}
})

// Rest API
Client.methods(['get', 'post', 'put', 'delete'])
Client.updateOptions({new: true, runValidators: true})

// Routes
Client.register(server, '/clients')

// Start Server
server.listen(3000)