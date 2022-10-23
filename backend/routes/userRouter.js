const User = require('../models/userModel')
const express = require('express')
const data = require('../data')
const userRouter = express.Router();
// don't write try catch use expressAsyncHandler insted
const expressAsyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils')

userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    const user = await User.insertMany(data.users)
    res.send(user)
})
);

// GET /api/users 
userRouter.get('/', expressAsyncHandler(async (req, res) => {
    const users = await User.find()
    res.send(users)
}))


// POST /api/user/signin 
userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email })

    console.log(user)
    if (user) {
        const match = await bcrypt.compare(req.body.password, user.password);
        console.log('match: ', match)
        if (match) {
            return res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user),
            });
        }
    }
    res.status(401).send({ message: 'Invalid email or password' })
})
);

module.exports = userRouter

