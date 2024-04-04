import jwt from 'jsonwebtoken'
import { SECRET } from '../../index.js'
import { authorized } from '../../utilFunctions.js'
import { SessionsClientsModel } from '../models/sessions_clients.js'
import { validateSessionClassesSchema } from '../schemas/session_clients.js'

export class SessionsClientsController {
  static getSessionClients = async (req, res) => {
    try {
      const { authorization } = req.headers
      const token = authorization.split(' ')[1]
      const instructorEmail = jwt.verify(token, SECRET).email
      if (!authorized({ token })) res.status(401).send('Unauthorized')
      const { UUIDClass, date } = req.params
      const { sessionsClients } = await SessionsClientsModel.getSessionClients({ UUIDClass, date })
      res.json(sessionsClients)
    } catch (error) {
      res.status(500).send(error.message)
    }
  }

  static updateSessionClients = async (req, res) => {
    try {
      const { authorization } = req.headers
      if (!authorization) return res.status(401).send('Unauthorized')
      const token = authorization.split(' ')[1]
      const userEmail = jwt.verify(token, SECRET).email
      if (!authorized({ token })) return res.status(401).send('Unauthorized')
      const body = req.body
      const input = { ...body, dataTime: new Date(body.dataTime) }
      const validatedData = validateSessionClassesSchema({ input })

      if (validatedData.error) return res.status(400).send(validatedData.error.message)

      await SessionsClientsModel.updateSessionClients({ input, userEmail })
      res.status(201).send('Updated')
    } catch (e) {
      res.status(400).send('Bad request: ' + e.message)
    }
  }
}
