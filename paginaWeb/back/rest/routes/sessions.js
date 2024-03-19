import { Router } from 'express'
import { SessionsController } from '../controllers/sessions.js'

export const sessionsRouter = Router()

sessionsRouter.get('/:classId', SessionsController.getSessions)
// classesRouter.get('/:', SessionsController.getSession)

sessionsRouter.post('/', SessionsController.createSession)

sessionsRouter.delete('/', SessionsController.deleteSession)
