import express, { Request } from 'express'
import { Response } from 'express-serve-static-core';
import userRoutes from './routes/user'
import wordRoutes from './routes/word'
import gameRoutes from './routes/game'
import db, { initializeDb } from './db/db'
import cors from 'cors'
import Game from './models/game';
import Team from './models/team';
import User from './models/user';
import Word from './models/word';

const app = express()
const port = 3000;

app.listen(port, () => {
    console.log('App successfully running in port: ', port)
})

initializeDb([Game, Team, User, Word])
db.sync({ force: true })
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3001'  
}))

app.get('/api/health', (req: Request, res: Response) => {
    res.send('API up.')
})

app.use('/api/users', userRoutes)
app.use('/api/word', wordRoutes)
app.use('/api/game', gameRoutes)