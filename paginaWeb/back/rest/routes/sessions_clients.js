import { Router } from 'express'
import { SessionsClientsController } from '../controllers/sessions_clients.js'

export const sessionsClientsRouter = Router()

sessionsClientsRouter.get('/:UUIDClass/:date', SessionsClientsController.getSessionClients)
// classesRouter.get('/:', SessionsController.getSession)

// sessionsRouter.post('/', SessionsController.createSession)

// sessionsRouter.delete('/', SessionsController.deleteSession)
