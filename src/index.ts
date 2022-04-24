import express, { Request } from 'express'
import { Response } from 'express-serve-static-core';
import userRoutes from './routes/user'
import db from './db/db'
import Word from './models/word'
import cors from 'cors'

const app = express()
const port = 3000;

app.listen(port, () => {
    console.log('App successfully running in port: ', port)
})

db.sync()
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3001'  
}))

app.get('/api/health', (req: Request, res: Response) => {
    res.send('API up.')
})

app.use('/api/users', userRoutes)