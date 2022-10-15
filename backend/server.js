const express = require('express')
const data = require('./data')
const app = express()

app.get('/', (req, res)=>{
    res.send("Hello")
})

app.get('/api/products', (req, res)=>{
    res.send(data.products)
})


const port = process.env.PORT || 5000 
app.listen(port, ()=>console.log(`server on ${port}`))