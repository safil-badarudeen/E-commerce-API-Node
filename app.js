//express

const express = require('express')
const app =express()

const port=process.env.PORT || 5000;



app.get('/',(req,res)=>{
    res.send('E commerce API')
})

const start=async()=>{
    try {
    //connectDB
    app.listen(port,()=>{
        console.log(`Server started to listen port ${port}...`)
    })
    } catch (error) {
     console.log(error)
    }

}

start()