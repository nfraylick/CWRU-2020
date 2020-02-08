'use strict'

const Hapi = require('hapi')
const mongoose = require('mongoose')

const server = new Hapi.Server({
    host: "localhost",
    port: process.env.PORT || 5001,
    routes: {
        cors: true
    }
})

server.app.db = mongoose.connect(
    'mongodb+srv://neil:n8ai81Dj6T154a3V@cwru-2020-dev1r.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlPasrser: true }
)

const init = async() => {
    await server.register(
        {plugin: require('./routes/Users')},
        {
            routes: {
                prefix: '/users'
            }
        }
    )
    .catch(err => {
        console.log(err)
    })
    await server.start()
    console.log(`Server running at: ${server.info.uri}`)
}

init()