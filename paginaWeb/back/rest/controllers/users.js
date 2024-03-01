import { UserModel } from '../models/users.js'
import { authorized } from '../../utilFunctions.js'
import jwt from 'jsonwebtoken'
import { SECRET } from '../../index.js'
import bcrypt from 'bcrypt'
import { partialValidateUser, validateUser } from '../schemas/user.js'
export class UserController {
  static getUsers = async (req, res) => {
    try {
      const { authorization } = req.headers
      const token = authorization.split(' ')[1]
      const userEmail = jwt.verify(token, SECRET).email
      if (authorized({ token })) {
        const users = await UserModel.getUsers({ userEmail })
        res.json(users)
      } else {
        res.status(401).send('Unauthorized')
      }
    } catch (error) {
      res.status(500).send(error.message)
    }
  }

  static getAllUsers = async (req, res) => {
    const { authorization } = req.headers
    const token = authorization.split(' ')[1]
    const userEmail = jwt.verify(token, SECRET).email
    if (authorized({ token })) {
      const users = await UserModel.getAllUsers({ userEmail })
      res.json(users)
    } else {
      res.status(401).send('Unauthorized')
    }
  }

  static findById = async (req, res) => {
    const { id } = req.params
    const resp = await UserModel.findById({ id })
    res.send(resp)
  }

  static login = async (req, res) => {
    const input = req.body
    const result = partialValidateUser({ input })

    if (!result.success) return res.status(400).send(result.error.message)

    try {
      const resp = await UserModel.login({ input })
      res.json(resp)
    } catch (e) {
      res.status(401).send(e.message)
    }
  }

  static register = async (req, res) => {
    const input = req.body
    const result = validateUser({ input })

    if (result.error) return res.status(400).send(result.error.message)
    input.password = await bcrypt.hash(input.password, 10)
    try {
      await UserModel.register({ input })
      res.status(201).send('Created')
    } catch (e) {
      res.status(400).send('Bad request: ' + e.message)
    }
  }

  static updateUser = async (req, res) => {
    try {
      const { authorization } = req.headers
      const token = authorization.split(' ')[1]
      if (authorized({ token })) {
        await UserModel.updateUser({ input: req.body })
        res.send('Updated')
      } else {
        res.status(401).send('Unauthorized')
      }
    } catch (error) {
      res.status(500).send(error.message)
    }
  }

  static deleteUser = async (req, res) => {
    const { authorization } = req.headers
    const token = authorization.split(' ')[1]
    if (authorized({ token })) {
      try {
        const { email } = req.params
        await UserModel.deleteUser({ email })
        res.send('Deleted')
      } catch (e) {
        console.log(e)
        res.status(400).send(e.message)
      }
    } else {
      res.status(401).send('Unauthorized')
    }
  }
}
