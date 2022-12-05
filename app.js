//! basic librey Import
const express = require('express')
// const router = require("./src/routes/api")
const router = require("./src/routes/api")
const color = require('colors')
const app = new express()

const bodyParser = require('body-parser');

//! Security librey MiddleWare Import  
const reteLimit = require("express-rate-limit")
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const hpp = require('hpp')
const cors = require('cors')

//! dataBase librey Import
const mongoose = require('mongoose')

//! Security middleware Implement
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

//! Body Parser ImpleMent
app.use(bodyParser.json())

//! Request Rate Limit
const limiter= reteLimit({ windowMs: 15 * 60 * 1000, max: 3000 })
app.use(limiter)


//! mongo DB Database Connection
const url = "mongodb://127.0.0.1:27017/ToDo"
const option= { user: "", pass: "",autoIndex:true}

mongoose.connect(url, option, (err) => {
    if (err) {
        console.log("!!!MongoDB Database Connection Fail".red)
    } else {
    console.log("MogoDB DataBase Connection Success ".bgBlue)
    }
})


//! Routing Implement
app.use("/api/v1", router)
 
//! Undifind (404 page) rouing
app.use('*', (req, res) => {
    res.status(404).json({Status:"Page Noge Found"})
})



/// Export for index.js

module.exports = app