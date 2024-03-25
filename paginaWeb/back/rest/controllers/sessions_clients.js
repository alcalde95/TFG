import jwt from 'jsonwebtoken'
import { SECRET } from '../../index.js'
import { authorized } from '../../utilFunctions.js'
import { SessionsClientsModel } from '../models/sessions_clients.js'

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
}
