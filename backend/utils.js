const jwt = require('jsonwebtoken');



const generateToken = (user)=> { 
    return jwt.sign(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET || 'somethingsecret',
        {
          expiresIn: '30d',
        }
      );
}

const isAuth = (req, res, next)=> { 
  const authorization = req.headers.authorization
  if(authorization){
    token = authorization.split(' ')[1]
    const decoded =  jwt.verify(token, process.env.JWT_SECRET)
    if (decoded){
      req.user = decoded 
      console.log('req.user: ', req.user)

      // user 'll be based in req.user to the next middleware 
      next()
    }
    else {
      res.status(401).send('invalid token')
    }
  }
  else{
    res.status(401).send('authorization not founded')
  }
  
}

module.exports = {generateToken,isAuth}