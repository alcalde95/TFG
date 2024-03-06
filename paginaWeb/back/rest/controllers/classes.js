import { ClassesModel } from '../models/classes.js'
/* import { authorized } from '../../utilFunctions.js'
import jwt from 'jsonwebtoken'
import { SECRET } from '../../index.js'
import bcrypt from 'bcrypt'
import { partialValidateUser, validateUser } from '../schemas/user.js'
*/
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
}
