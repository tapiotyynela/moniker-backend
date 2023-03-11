import express, { Request, Response } from 'express'
import { verifyToken } from '../middlewares/verifyToken'
const router = express.Router()

import { createNewGame, getUsersGames, getGameByIdentifier } from '../services/game'

router.post('/newGame', verifyToken, async (req: Request, res: Response) => {
    const newGame = await createNewGame(req.body)
    res.send(newGame)
})

router.get('/:gameIdentifier', verifyToken, async (req: Request, res: Response) => {
    const game = await getGameByIdentifier(req.params.gameIdentifier)
    res.send(game)
})

router.get('/list/:userId', verifyToken, async (req: Request, res: Response) => {
    const userGames = await getUsersGames(parseInt(req.params.userId))
    res.send(userGames)
})

export default router