import express, { Request, Response } from 'express'
import { verifyToken } from '../middlewares/verifyToken'
const router = express.Router()

import { registerUser, login, getAllUsers } from '../services/user'
import { RequestWithUser } from '../types/request'

router.post('/register', registerUser)
router.post('/login', login)
router.get('/verify', verifyToken, (req: RequestWithUser, res: Response) => res.send(req.user))
router.get('/users', verifyToken, async (req: Request, res: Response) => {
    const users = await getAllUsers(req, res)
    res.send(users)
})


export default router