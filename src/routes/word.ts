import express from 'express'
const router = express.Router()

import { addWord } from '../services/word'

router.post('/add', addWord)

export default router