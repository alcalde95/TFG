import { partialValidateSession, validateSession } from '../schemas/session.js'
import { authorized } from '../../utilFunctions.js'
import { SessionsModel } from '../models/sessions.js'
import { SECRET } from '../../index.js'
import jwt from 'jsonwebtoken'
export class SessionsController {
  static getSessions = async (req, res) => {
    try {
      const { authorization } = req.headers
      if (!authorization) return res.status(401).send('Unauthorized')
      const token = authorization.split(' ')[1]
      const userEmail = jwt.verify(token, SECRET).email
      if (!authorized({ token })) return res.status(401).send('Unauthorized')
      const { classId } = req.params
      const sessions = await SessionsModel.getSessions({ classId, userEmail })
      res.json(sessions)
    } catch (error) {
      if (error.message === 'Unauthorized') return res.status(401).send(error.message)
      res.status(500).send(error.message)
    }
  }

  static createSession = async (req, res) => {
    try {
      const { authorization } = req.headers
      if (!authorization) return res.status(401).send('Unauthorized')
      const token = authorization.split(' ')[1]
      const userEmail = jwt.verify(token, SECRET).email
      if (!authorized({ token })) return res.status(401).send('Unauthorized')
      const body = req.body
      const input = {
        dataTime: new Date(body.dataTime),
        uuidClass: body.uuidClass,
        instructorEmail: body.instructorEmail
      }
      const validatedData = validateSession({ input })

      if (validatedData.error) return res.status(400).send(validatedData.error.message)

      await SessionsModel.createSession({ input, userEmail })
      res.status(201).send('Created')
    } catch (e) {
      res.status(400).send('Bad request: ' + e.message)
    }
  }

  static deleteSession = async (req, res) => {
    try {
      const { authorization } = req.headers
      const token = authorization.split(' ')[1]
      const userEmail = jwt.verify(token, SECRET).email
      if (!authorized({ token })) res.status(401).send('Unauthorized')
      const body = req.body

      const input = {
        dataTime: new Date(body.dataTime),
        uuidClass: body.uuidClass
      }

      const validatedData = partialValidateSession({ input })

      if (validatedData.error) return res.status(400).send(validatedData.error.message)
      await SessionsModel.deleteSession({ input, userEmail })
      res.send('Deleted')
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
}
