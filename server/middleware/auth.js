const jwt = require('jsonwebtoken')
const SECRET= process.env.JWT_SECRET

if(!SECRET){
    throw new Error('JWT_SECRET is not defined. Check your .env file and dotenv configuration.')
}

const verifyToken=(req,res,next)=>{
    const authHeader= req.headers.authorization
    if(!authHeader)return res.status(401).json({message: 'No token, access denied'})

    const token = authHeader.split(' ')[1]

    try{
        const decoded= jwt.verify(token,SECRET)
        req.userId=decoded.userId
        req.username = decoded.username 
        next()
    } catch (err){
        res.status(401).json({message: 'Invalid token'})
    }

}

module.exports= verifyToken