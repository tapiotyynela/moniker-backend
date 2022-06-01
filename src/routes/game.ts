import express, { Request, Response } from 'express'
import { verifyToken } from '../middlewares/verifyToken'
const router = express.Router()

import { createNewGame } from '../services/game'

router.post('/newGame', verifyToken, async (req: Request, res: Response) => {
    const newGame = await createNewGame(req.body)
    res.send(newGame)
})

export default router