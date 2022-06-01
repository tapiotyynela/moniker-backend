import express from 'express'
import { verifyToken } from '../middlewares/verifyToken'
const router = express.Router()

import { addWord } from '../services/word'

router.post('/add', verifyToken, addWord)

export default router