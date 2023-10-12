const express = require("express")
const mongoose  = require('mongoose')
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
}).then(() => {
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`)
    })
}).catch((error) => {
    console.log(error)
}) 