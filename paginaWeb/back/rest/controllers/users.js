import { UserModel } from '../models/users.js'
import { authorized } from '../../utilFunctions.js'
import jwt from 'jsonwebtoken'
import { SECRET } from '../../index.js'
export class UserController {
  static getAll = async (req, res) => {
    try {
      const { authorization } = req.headers
      const token = authorization.split(' ')[1]
      const userEmail = jwt.verify(token, SECRET).email
      if (authorized({ token })) {
        const users = await UserModel.getAll({ userEmail })
        res.json(users)
      } else {
        res.status(401).send('Unauthorized')
      }
    } catch (error) {
      res.status(500).send(error.message)
    }
  }

  static findById = async (req, res) => {
    const { id } = req.params
    const resp = await UserModel.findById({ id })
    res.send(resp)
  }

  static login = async (req, res) => {
    const { email, password } = req.body
    const resp = await UserModel.login({ email, password })
    if (resp === null) {
      res.status(401).send('Unauthorized')
    } else {
      res.json(resp)
    }
  }

  static register = async (req, res) => {
    // validar datos .....

    // const { email, password, role } = req.body

    const input = req.body
    const created = await UserModel.register({ input })
    created === 'created' ? res.status(201).send('Created') : res.status(400).send('Bad request: ' + created)
  }
}
