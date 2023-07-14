const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const dbConnect = require('./db')
const cors = require('cors')
require('dotenv').config()

//importation of routes
const authRoute = require('./routes/auth')
const userRoutes = require('./routes/userFileRoutes')
const adminRoute = require('./routes/adminFileRoutes')

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors())
app.set('view engine', 'ejs')

app.use('/user',authRoute)//authentication route
app.use('/upload', adminRoute) //admin route
app.use(userRoutes) //user routes

const uri = process.env.MONGO_URI
const port = process.env.PORT || 7000

const server = app.listen(port,() =>{
    console.log(`listening on port ${port}`)
    dbConnect(uri)
    .then(()=> {
        console.log('connected to database')
    })
    .catch(err => console.error(err))

    // //handling errors if not connected
    process.on('unhandledRejection',err =>{
        console.log(`An error Occured: ${err.messge}`)
        server.close(()=> process.exit(1));
    })
})