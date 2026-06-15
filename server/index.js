const dns=require('dns')
dns.setServers(['1.1.1.1','8.8.8.8'])

require('dotenv').config()
const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')

const app=express()
app.use(express.json())
app.use(cors({
  origin: 'https://dropqueue.netlify.app',
  credentials: true
}))

console.log("Connecting to URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("✅Mongo atlas connected successfully!"))
.catch(err=>console.log('❌ MongoDB failed:', err.message))

const songRoutes = require('./routes/songs')
app.use('/song',songRoutes)

const authRoutes = require('./routes/auth')
app.use('/auth',authRoutes)

app.listen(process.env.PORT,()=>console.log(`🚀 Server running on port ${process.env.PORT}`))





























