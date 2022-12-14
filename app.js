//.env,async-error-package
require('dotenv').config()
require('express-async-errors')

//express

const express = require('express')
const app =express()

//mongoDB
const connectDB=require('./db/connect')

//route
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')
const reviewRouter = require('./routes/reviewRoutes')
const orderRouter = require('./routes/orderRoutes')

//other


const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')


//body parser middleware
app.use(express.json())

app.use(morgan('tiny'))
app.use(cookieParser(process.env.JWT_SECRET_KEY))

app.use(express.static('./public'))
app.use(fileUpload()) 

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',userRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/reviews',reviewRouter)
app.use('/api/v1/orders',orderRouter)

app.get('/',(req,res)=>{
    res.send('E commerce API')
})

//dummy Test route
// app.get('/api/v1',(req,res)=>{
//       console.log(req.cookies)
//      console.log(req.signedCookies)
//     res.send('dummy route')
    
// })

//error middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port=process.env.PORT || 5000;





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