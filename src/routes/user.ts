import express, { Response } from 'express'
import { verifyToken } from '../middlewares/verifyToken'
const router = express.Router()

import { registerUser, login, getUsersBySearchWord } from '../services/user'
import { RequestWithUser } from '../types/request'

router.post('/register', registerUser)
router.post('/login', login)
router.get('/verify', verifyToken, (req: RequestWithUser, res: Response) => res.send(req.user))
router.post('/search', verifyToken, getUsersBySearchWord)


export default router