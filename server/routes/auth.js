const express=require('express')
const Auth = require('../models/auth')
const router= express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SECRET =  process.env.JWT_SECRET

router.post('/register', async(req,res)=>{
    const {username,password}=req.body

    const existing= await Auth.findOne({username})
    if(existing) return res.status(400).json({message: "user already exists"})

    const hashed= await bcrypt.hash(password,10)
    const user= new Auth({username,password: hashed})
    await user.save()

    const token = jwt.sign({userId: user._id, username: user.username}, SECRET, {expiresIn: '7d'})
    res.json({token, username})
})

router.post('/login', async(req,res)=>{
    const {username,password}= req.body

    const user= await Auth.findOne({username})
    if(!user) return res.status(400).json({message: "user not found"})

    const match = await bcrypt.compare(password,user.password)
    if(!match) return res.status(400).json({message: "wrong password"})

    const token = jwt.sign({userId: user._id, username: user.username}, SECRET, {expiresIn: '7d'})

    res.json({token, username: user.username})
})

module.exports = router 
