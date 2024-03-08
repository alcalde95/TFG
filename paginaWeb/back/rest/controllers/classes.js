import { ClassesModel } from '../models/classes.js'
import { validateClass } from '../schemas/class.js'
import { authorized } from '../../utilFunctions.js'
import jwt from 'jsonwebtoken'
import { SECRET } from '../../index.js'

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
