import express from 'express'
import {PORT} from './config/variables'
import cors from 'cors'
import http from 'http'
import './config/db'
import orderRouter from './controllers/order'

import {Server} from 'socket.io'
const app = express()
const app_serveur = http.createServer(app)
const io =new  Server(app_serveur, {
  transports:['polling'],
  cors:{
    cors: {
      origin: "http://localhost:3000"
    }
  }
})

io.on('connection', (socket) => {
  console.log('A user is connected');

  socket.on('message', (message) => {
    console.log(`message from ${socket.id} : ${message}`);
  })

  socket.on('disconnect', () => {
    console.log(`socket ${socket.id} disconnected`);
  })
})

export {io};


app.use(express.json())
app.use(cors())
app.use('/orders', orderRouter)

app.get('/', (req,res) => {
  res.send('Hello')
})


app_serveur.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
})