import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js'
import { sendMessage, showMessages, showUsers } from '../controllers/message.controller.js'
const router = express.Router()

router.get('/users', protectRoute, showUsers)
router.get('/chat/:id', protectRoute, showMessages)

router.post('/chat/:id', protectRoute, sendMessage)

export default router