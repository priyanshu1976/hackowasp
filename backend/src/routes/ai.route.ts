import express from 'express'
import { Request, Response } from 'express'
import { metadata } from '../controller/ai.controller'

const router = express.Router()

router.get('/metadata', metadata)

export default router
