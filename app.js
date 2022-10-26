//.env
require('dotenv').config()

//express

const express = require('express')
const app =express()

//mongoDB
const connectDB=require('./db/connect')

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