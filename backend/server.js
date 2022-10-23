const express = require('express')
const data = require('./data')
const app = express()
const mongoose = require('mongoose')
const userRouter = require('./routes/userRouter')
const productRouter = require('./routes/productRouter')
const dotenv =require('dotenv');

dotenv.config();

// db connection 
const connectionString = process.env.MONGODB_URI
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
}, (err) => {
    if (err) console.log(err)
    else console.log("mongdb is connected");
})
// middelewares
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send("Hello")
})
app.use('/api/users', userRouter);
app.use('/api/products', productRouter)

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});


const port = process.env.PORT || 5000
app.listen(port, () => console.log(`server on ${port}`))