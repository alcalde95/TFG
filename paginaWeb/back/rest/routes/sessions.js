import { Router } from 'express'
import { SessionsController } from '../controllers/sessions.js'

export const sessionsRouter = Router()

sessionsRouter.get('/:classId', SessionsController.getSessions)
// classesRouter.get('/:', SessionsController.getSession)

// classesRouter.post('/', SessionsController.createSession)

// classesRouter.delete('/:class_id', ClassesController.deleteClass)
