import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'
import { Server, Socket } from 'socket.io'
import { createServer } from 'http'
const app = express()

app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, 'web')))
app.use(cors({ origin: '*' }))

const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: true,
    methods: ['GET', 'POST'],
    credentials: true
  }
})

io.on('connection', (socket: Socket) => {
  console.log('user connected')
  socket.on('sendMessage', (messagePayload: {message: string, userId: string}) => {
    console.log(messagePayload)
    io.emit('message', { message: messagePayload.message, owner: messagePayload.userId })
  })
})

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'web', 'index.html'))
})

// app.use('/**', Api)

server.listen(3000, () => console.log('websocket started'))
app.listen(3333, () => console.log('http server started'))
