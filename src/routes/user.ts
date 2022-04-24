import express from 'express'
const router = express.Router()

import { registerUser, login } from '../services/user'

router.post('/register', registerUser)
router.post('/login', login)


export default router