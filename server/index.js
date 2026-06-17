const dns=require('dns')
dns.setServers(['1.1.1.1','8.8.8.8'])

require('dotenv').config()
const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const http=require('http')
const {Server} = require('socket.io')

const app=express()
app.use(express.json())
app.use(cors({
  origin: ['https://dropqueue.netlify.app',
  'http://localhost:5173'
  ],
  credentials: true
}))

const server = http.createServer(app)
const io = new Server(server,{          
  cors: {
    origin: ['https://dropqueue.netlify.app','http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }})


io.on('connection',(socket)=>{
  console.log("User connected",socket.id)

  socket.on('disconnect',()=>{
    console.log('User disconnected', socket.id)
  })
})

app.set('io',io)

console.log("Connecting to URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("✅Mongo atlas connected successfully!"))
.catch(err=>console.log('❌ MongoDB failed:', err.message))

const songRoutes = require('./routes/songs')
app.use('/song',songRoutes)

const authRoutes = require('./routes/auth')
app.use('/auth',authRoutes)

server.listen(process.env.PORT,()=>console.log(`🚀 Server running on port ${process.env.PORT}`))
