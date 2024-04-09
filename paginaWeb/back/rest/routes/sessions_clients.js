import { Router } from 'express'
import { SessionsClientsController } from '../controllers/sessions_clients.js'

export const sessionsClientsRouter = Router()

sessionsClientsRouter.get('/:UUIDClass/:date', SessionsClientsController.getSessionClients)

sessionsClientsRouter.post('/:UUIDClass/:date', SessionsClientsController.enrollClientToSession)
sessionsClientsRouter.post('/:UUIDClass/:date/isEnrolled', SessionsClientsController.isEnrolled)

sessionsClientsRouter.put('/:UUIDClass/:date', SessionsClientsController.updateSessionClients)

sessionsClientsRouter.delete('/:UUIDClass/:date', SessionsClientsController.unenrollClientToSession)
