import express, { Request } from 'express'
import { Response } from 'express-serve-static-core';
import userRoutes from './routes/user'
import db from './db/db'

const app = express()
const port = 3000;

app.listen(port, () => {
    console.log('App successfully running in port: ', port)
})

app.use(express.json())
db.sync()

app.get('/api/health', (req: Request, res: Response) => {
    res.send('API up.')
})

app.use('/api/users', userRoutes)