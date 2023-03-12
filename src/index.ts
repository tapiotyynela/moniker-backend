import express, { Request } from 'express'
import { Response } from 'express-serve-static-core';
import dotenv from 'dotenv'
import userRoutes from './routes/user'
import wordRoutes from './routes/word'
import gameRoutes from './routes/game'
import db, { initializeDb } from './db/db'
import cors from 'cors'
import Game from './models/game';
import Team from './models/team';
import User from './models/user';
import Word from './models/word';
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config()
const app = express()
// WS connection
const port = 3000

db.sync({ alter: true, logging: false })
initializeDb([Game, Team, User, Word])
app.use(express.json())
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:3002']
}))

app.get('/api/health', (req: Request, res: Response) => {
    res.send('API up.')
})

app.use('/api/users', userRoutes)
app.use('/api/word', wordRoutes)
app.use('/api/game', gameRoutes)

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3001", "http://localhost:3002"]
  }
})

io.on("connection", (socket) => {
  console.log("Websocket initialized.", socket.id)
  socket.on("USER CONNECTED", (arg) => {
    console.log(arg)
  })
})

httpServer.listen(port, () => {
  console.log('App successfully running in port: ', port)
})
