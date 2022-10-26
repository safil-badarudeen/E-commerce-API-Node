//.env,async-error-package
require('dotenv').config()
require('express-async-errors')

//express

const express = require('express')
const app =express()

//mongoDB
const connectDB=require('./db/connect')

//other

const morgan=require('morgan')

const notFoundMiddleware=require('./middleware/not-found')
const errorHandlerMiddleware=require('./middleware/error-handler')

//body parser middleware
app.use(express.json())

app.use(morgan('tiny'))

//error middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port=process.env.PORT || 5000;



app.get('/',(req,res)=>{
    res.send('E commerce API')
})

const start=async()=>{
    try {
    await connectDB(process.env.MONGO_URI),
    app.listen(port,()=>{
        console.log(`Server started to listen port ${port}...`)
    })
    } catch (error) {
     console.log(error)
    }

}

start()