const express = require("express")
const mongoose  = require('mongoose')
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const userRoutes = require('./routes/userRoute')
const cookieParser = require('cookie-parser')

const app = express()

//middlesware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookieParser())

const errorHandler = require('./Middlewares/errorMiddleware')
app.get("/", (req, res) => {
    res.send("route testing")
})

//route middleware

app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 5000

//errormiddleware
app.use(errorHandler)

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
}).then(() => {
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`)
    })
}).catch((error) => {
    console.log(error)
}) 