import jwt from 'jsonwebtoken'
import { SECRET } from '../../index.js'
import { authorized } from '../../utilFunctions.js'
import { ClassesModel } from '../models/classes.js'
import { validateClass } from '../schemas/class.js'
export class ClassesController {
  static getClasses = async (_, res) => {
    try {
      // preguntar si esto debería ser privado
      const classes = await ClassesModel.getClasses()
      res.json(classes)
    } catch (error) {
      res.status(500).send(error.message)
    }
  }

  static getClass = async (req, res) => {
    const { classId } = req.params
    try {
      const classData = await ClassesModel.getClass({ classId })
      res.json(classData)
    } catch (error) {
      res.status(500).send(error.message)
    }
  }

  static getClassesInstructor = async (req, res) => {
    try {
      const { authorization } = req.headers
      const token = authorization.split(' ')[1]
      const instructorEmail = jwt.verify(token, SECRET).email
      if (authorized({ token })) {
        const classes = await ClassesModel.getClassesInstructor({ instructorEmail })
        res.json(classes)
      } else {
        res.status(401).send('Unauthorized')
      }
    } catch (error) {
      res.status(500).send(error.message)
    }
  }

  static createClass = async (req, res) => {
    const input = req.body
    const validatedData = validateClass({ input })

    if (validatedData.error) return res.status(400).send(validatedData.error.message)

    try {
      await ClassesModel.create({ input })
      res.status(201).send('Created')
    } catch (e) {
      res.status(400).send('Bad request: ' + e.message)
    }
  }
}
