import express from 'express'
const router = express.Router()

import { registerUser, login, getUsersBySearchWord } from '../services/user'

router.post('/register', registerUser)
router.post('/login', login)
router.post('/search', getUsersBySearchWord)


export default router