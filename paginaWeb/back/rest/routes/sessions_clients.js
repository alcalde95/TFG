import { Router } from 'express'
import { SessionsClientsController } from '../controllers/sessions_clients.js'

export const sessionsClientsRouter = Router()

sessionsClientsRouter.get('/:UUIDClass/:date', SessionsClientsController.getSessionClients)

// sessionsRouter.post('/', SessionsController.createSession)

sessionsClientsRouter.put('/:UUIDClass/:date', SessionsClientsController.updateSessionClients)

// sessionsRouter.delete('/', SessionsController.deleteSession)
