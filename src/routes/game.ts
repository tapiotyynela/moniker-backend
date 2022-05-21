import express, { Request, Response } from 'express'
const router = express.Router()

import { createNewGame } from '../services/game'

router.post('/newGame', async (req: Request, res: Response) => {
    const newGame = await createNewGame(req.body)
    res.send(newGame)
})

export default router