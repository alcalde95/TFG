import { partialValidateSession, updateValidateSession, validateSession } from '../schemas/session.js'
import { authorized } from '../../utilFunctions.js'
import { SessionsModel } from '../models/sessions.js'
export class SessionsController {
  static getSessions = async (req, res) => {
    try {
      const { authorization } = req.headers
      const { decoded, valid } = authorized({ authorization })

      if (!valid) return res.status(401).send('Unauthorized')
      const userEmail = decoded.email
      const { classId } = req.params
      const sessions = await SessionsModel.getSessions({ classId, userEmail })
      res.json(sessions)
    } catch (error) {
      if (error.message === 'Unauthorized') return res.status(401).send(error.message)
      res.status(500).send(error.message)
    }
  }

  static getSession = async (req, res) => {
    try {
      const { authorization } = req.headers
      const { decoded, valid } = authorized({ authorization })

      if (!valid) return res.status(401).send('Unauthorized')
      const userEmail = decoded.email
      const { classId } = req.params
      const { date } = req.params
      const session = await SessionsModel.getSession({ classId, date, userEmail })
      res.json(session)
    } catch (error) {
      if (error.message === 'Unauthorized') return res.status(401).send(error.message)
      res.status(500).send(error.message)
    }
  }

  static createSession = async (req, res) => {
    try {
      const { authorization } = req.headers
      const { decoded, valid } = authorized({ authorization })

      if (!valid) return res.status(401).send('Unauthorized')
      const userEmail = decoded.email
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

  static updateSession = async (req, res) => {
    try {
      const { authorization } = req.headers
      const { decoded, valid } = authorized({ authorization })

      if (!valid) return res.status(401).send('Unauthorized')
      const userEmail = decoded.email
      const body = req.body
      const input = {
        dataTime: new Date(body.dataTime),
        uuidClass: body.uuidClass,
        instructorEmail: body.instructorEmail
      }
      const validatedData = updateValidateSession({ input })

      if (validatedData.error) return res.status(400).send(validatedData.error.message)

      await SessionsModel.updateSession({ input, userEmail })
      res.status(201).send('Updated')
    } catch (e) {
      res.status(400).send('Bad request: ' + e.message)
    }
  }

  static deleteSession = async (req, res) => {
    try {
      const { authorization } = req.headers
      const { decoded, valid } = authorized({ authorization })

      if (!valid) return res.status(401).send('Unauthorized')
      const userEmail = decoded.email
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
