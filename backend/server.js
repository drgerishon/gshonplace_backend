const express = require("express")
const mongoose  = require('mongoose')
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

//middlesware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("route testing")
})

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