import express from 'express'
import { signup, login } from '../controller/auth.controller'
const router = express.Router()
// @ts-ignore
router.post('/signup', signup)
// @ts-ignore
router.post('/login', login)

export default router
