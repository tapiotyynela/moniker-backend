import express from 'express'
const router = express.Router()

import { registerUser } from '../services/user'

router.post('/register', registerUser)

export default router