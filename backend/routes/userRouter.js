const User = require('../models/userModel')
const express = require('express')
const data = require('../data')
const userRouter = express.Router();
// don't write try catch use expressAsyncHandler insted
const expressAsyncHandler = require('express-async-handler')


userRouter.get('/seed',expressAsyncHandler(async (req, res) => {
       
    })
);


userRouter.get('/', expressAsyncHandler(async (req, res) => {
    console.log("users")
    const users = await User.find()
    res.send(users)
}))

module.exports = userRouter

