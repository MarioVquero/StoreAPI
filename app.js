require('dotenv').config()

// async errors

const express = require('express');
const app = express();

const conectDB = require('./db/connect')
const productsRouter = require('./routes/products')

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler');
const { connect } = require('mongoose');
const connectDB = require('./db/connect');

// middleware

app.use(express.json())

// routes

app.get('/', (rec, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
})

app.use('/api/v1/products', productsRouter)

// products route

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const PORT = process.env.PORT || 3000


const start = async () => {
    try {
        // connect to DB
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, console.log(`Server is listening on port: ${PORT}...`))
    } catch (error) {

    }
}

start()