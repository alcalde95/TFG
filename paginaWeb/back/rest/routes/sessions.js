import { Router } from 'express'
import { SessionsController } from '../controllers/sessions.js'

export const sessionsRouter = Router()

sessionsRouter.get('/:classId', SessionsController.getSessions)
sessionsRouter.get('/:classId/:date', SessionsController.getSession)

sessionsRouter.post('/', SessionsController.createSession)

sessionsRouter.put('/', SessionsController.updateSession)
sessionsRouter.delete('/', SessionsController.deleteSession)
