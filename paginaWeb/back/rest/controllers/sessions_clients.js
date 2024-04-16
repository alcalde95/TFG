import jwt from 'jsonwebtoken'
import { SECRET } from '../../index.js'
import { authorized } from '../../utilFunctions.js'
import { SessionsClientsModel } from '../models/sessions_clients.js'
import { partialValidateSessionClassesSchema, validateSessionClassesSchema } from '../schemas/session_clients.js'

export class SessionsClientsController {
  static getSessionClients = async (req, res) => {
    try {
      const { authorization } = req.headers
      const token = authorization.split(' ')[1]
      if (!authorized({ token })) res.status(401).send('Unauthorized')
      const { UUIDClass, date } = req.params
      const { sessionsClients } = await SessionsClientsModel.getSessionClients({ UUIDClass, date })
      res.json(sessionsClients)
    } catch (error) {
      res.status(500).send(error.message)
    }
  }

  static enrollClientToSession = async (req, res) => {
    try {
      const { authorization } = req.headers
      if (!authorization) return res.status(401).send('Unauthorized')
      const token = authorization.split(' ')[1]
      if (!authorized({ token })) return res.status(401).send('Unauthorized')
      const { date, UUIDClass } = req.params
      const input = { uuidClass: UUIDClass, dataTime: new Date(date), clientEmail: req.body.clientEmail }
      const validatedData = partialValidateSessionClassesSchema({ input })

      if (validatedData.error) return res.status(400).send(validatedData.error.message)

      await SessionsClientsModel.enrollClientToSession({ input })
      res.status(201).send('Enrolled')
    } catch (e) {
      if (e.message === 'Unauthorized') return res.status(401).send('Unauthorized')
      res.status(400).send('Bad request: ' + e.message)
    }
  }

  static isEnrolled = async (req, res) => {
    try {
      const { authorization } = req.headers
      if (!authorization) return res.status(401).send('Unauthorized')
      const token = authorization.split(' ')[1]
      if (!authorized({ token })) return res.status(401).send('Unauthorized')
      const { date, UUIDClass } = req.params
      const input = { uuidClass: UUIDClass, dataTime: new Date(date), clientEmail: req.body.clientEmail }
      const validatedData = partialValidateSessionClassesSchema({ input })

      if (validatedData.error) return res.status(400).send(validatedData.error.message)

      const isEnrolled = await SessionsClientsModel.isEnrolled({ input })
      res.status(200).send(isEnrolled)
    } catch (e) {
      res.status(400).send('Bad request: ' + e.message)
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

  static unenrollClientToSession = async (req, res) => {
    try {
      const { authorization } = req.headers
      if (!authorization) return res.status(401).send('Unauthorized')
      const token = authorization.split(' ')[1]
      if (!authorized({ token })) return res.status(401).send('Unauthorized')
      const { date, UUIDClass } = req.params
      const input = { uuidClass: UUIDClass, dataTime: new Date(date), clientEmail: req.body.clientEmail }
      const validatedData = partialValidateSessionClassesSchema({ input })

      if (validatedData.error) return res.status(400).send(validatedData.error.message)

      await SessionsClientsModel.unenrollClientToSession({ input })
      res.send('Deleted')
    } catch (e) {
      res.status(400).send('Bad request: ' + e.message)
    }
  }
}
