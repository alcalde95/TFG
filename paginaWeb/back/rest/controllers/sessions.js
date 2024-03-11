// import { validateSession } from '../schemas/class.js'

import { SessionsModel } from '../models/sessions.js'

export class SessionsController {
  static getSessions = async (req, res) => {
    try {
      const { classId } = req.params
      const sessions = await SessionsModel.getSessions({ classId })
      res.json(sessions)
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
/*
  static getClass = async (req, res) => {
    const { classId } = req.params
    try {
      const classData = await SessionsModel.getClass({ classId })
      res.json(classData)
    } catch (error) {
      res.status(500).send(error.message)
    }
  }

  static createClass = async (req, res) => {
    const input = req.body
    const validatedData = validateSession({ input })

    if (validatedData.error) return res.status(400).send(validatedData.error.message)

    try {
      await SessionsModel.create({ input })
      res.status(201).send('Created')
    } catch (e) {
      res.status(400).send('Bad request: ' + e.message)
    }
  } */
}
