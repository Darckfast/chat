import { Router } from 'express'
import AuthController from '@controllers/LoginController'

const router = Router()

router.use('/', AuthController)

export default router
