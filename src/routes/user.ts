import express from 'express'
const router = express.Router()

import { getUser } from '../services/user'

router.get('/user', getUser)

export default router