import { authorized } from '../../utilFunctions.js'
import { ClassesModel } from '../models/classes.js'
import { validateClass } from '../schemas/class.js'
export class ClassesController {
  static getClasses = async (req, res) => {
    try {
      let { name, maxCapacity, minDuration, maxDuration } = req.query
      if (name === '') name = undefined
      if (maxCapacity === '') maxCapacity = undefined
      if (minDuration === '') minDuration = undefined
      if (maxDuration === '') maxDuration = undefined

      if (maxCapacity) maxCapacity = parseInt(maxCapacity)
      if (minDuration) minDuration = parseInt(minDuration)
      if (maxDuration) maxDuration = parseInt(maxDuration)

      const classes = await ClassesModel.getClasses({ name, maxCapacity, minDuration, maxDuration })
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
      const { decoded, valid } = authorized({ authorization })
      if (valid) {
        const instructorEmail = decoded.email
        const classes = await ClassesModel.getClassesInstructor({ instructorEmail })
        res.json(classes)
      } else {
        res.status(401).send('Unauthorized')
      }
    } catch (error) {
      res.status(500).send(error.message)
    }
  }

  static getManagedClassesInstructor = async (req, res) => {
    try {
      const { authorization } = req.headers
      const { decoded, valid } = authorized({ authorization })
      const instructorEmail = decoded.email
      if (!valid) res.status(401).send('Unauthorized')
      const classes = await ClassesModel.getManagedClassesInstructor({ instructorEmail })
      res.json(classes)
    } catch (error) {
      res.status(500).send(error.message)
    }
  }

  static getClassesEnrolledClient = async (req, res) => {
    try {
      const { authorization } = req.headers
      const { decoded, valid } = authorized({ authorization })
      const clientEmail = decoded.email
      if (!valid) res.status(401).send('Unauthorized')
      const classes = await ClassesModel.getClassesEnrolledClient({ clientEmail })
      res.json(classes)
    } catch (error) {
      res.status(500).send(error.message)
    }
  }

  static createClass = async (req, res) => {
    const { authorization } = req.headers
    const { decoded, valid } = authorized({ authorization })

    if (!valid) res.status(401).send('Unauthorized')
    const input = req.body
    const userEmail = decoded.email
    const validatedData = validateClass({ input })

    if (validatedData.error) return res.status(400).send(validatedData.error)

    try {
      await ClassesModel.create({ input, userEmail })
      res.status(201).send('Created')
    } catch (e) {
      res.status(400).send('Bad request: ' + e.message)
    }
  }

  static updateClass = async (req, res) => {
    try {
      const input = req.body
      const { authorization } = req.headers
      const { decoded, valid } = authorized({ authorization })

      if (!valid) res.status(401).send('Unauthorized')
      const userEmail = decoded.email
      const validatedData = validateClass({ input })
      if (validatedData.error) return res.status(400).send(validatedData.error)

      await ClassesModel.updateClass({ input, userEmail })

      res.send('Updated')
    } catch (error) {
      res.status(500).send(error.message)
    }
  }

  static deleteClass = async (req, res) => {
    try {
      const { authorization } = req.headers
      const { decoded, valid } = authorized({ authorization })
      if (!valid) res.status(401).send('Unauthorized')
      const instructorEmail = decoded.email
      await ClassesModel.deleteClass({ uuidClass: req.params.class_id, instructorEmail })
      res.send('Deleted')
    } catch (error) {
      res.status(404).send(error.message)
    }
  }
}
