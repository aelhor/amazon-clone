const User = require('../models/userModel')
const express = require('express')
const data = require('../data')
const userRouter = express.Router();
// don't write try catch use expressAsyncHandler insted
const expressAsyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils')


// dev route
userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    const user = await User.insertMany(data.users)
    res.send(user)
})
);

// GET 'all users' /api/users 
userRouter.get('/', expressAsyncHandler(async (req, res) => {
    const users = await User.find()
    res.send({count: users.length, users: users})
}))


// POST /api/user/signin 
userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email })

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

// POST /api/register 
userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    })
    const createdUser = await user.save()
    res.status(200).send({
        _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    })
})
);

module.exports = userRouter

