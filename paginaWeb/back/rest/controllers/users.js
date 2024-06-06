import bcrypt from 'bcrypt'
import { UserModel } from '../models/users.js'
import { partialValidateUser, validateUser } from '../schemas/user.js'
import { authorized } from '../../utilFunctions.js'
export class UserController {
  static getUsers = async (req, res) => {
    try {
      const { authorization } = req.headers
      const { decoded, valid } = authorized({ authorization })
      if (valid) {
        const userEmail = decoded.email
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
    const { decoded, valid } = authorized({ authorization })
    if (valid) {
      const userEmail = decoded.email
      const users = await UserModel.getAllUsers({ userEmail })
      res.json(users)
    } else {
      res.status(401).send('Unauthorized')
    }
  }

  static getClients = async (req, res) => {
    const { authorization } = req.headers
    const { decoded, valid } = authorized({ authorization })
    if (valid) {
      const userEmail = decoded.email
      const { clients } = await UserModel.getClients({ userEmail })
      res.json(clients)
    } else {
      res.status(401).send('Unauthorized')
    }
  }

  static isValidatedClient = async (req, res) => {
    const { authorization } = req.headers
    const { decoded, valid } = authorized({ authorization })
    if (valid) {
      const userEmail = decoded.email
      const { validated } = await UserModel.isValidatedClient({ userEmail })
      res.json(validated)
    } else {
      res.status(401).send('Unauthorized')
    }
  }

  static getAllInstructors = async (req, res) => {
    const { authorization } = req.headers
    const { decoded, valid } = authorized({ authorization })
    if (valid) {
      const userEmail = decoded.email
      try {
        const instructors = await UserModel.getAllInstructors({ userEmail })
        res.json(instructors)
      } catch (e) {
        res.status(401).send(e.message)
      }
    } else {
      res.status(401).send('Unauthorized')
    }
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
      const { decoded, valid } = authorized({ authorization })
      if (valid) {
        const userEmail = decoded.email
        await UserModel.updateUser({ input: req.body, userEmail })
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
    const { valid } = authorized({ authorization })
    if (valid) {
      try {
        console.log(req.params)
        const { email } = req.params
        await UserModel.deleteUser({ email })
        res.send('Deleted')
      } catch (e) {
        res.status(400).send(e.message)
      }
    } else {
      res.status(401).send('Unauthorized')
    }
  }

  static updateClient = async (req, res) => {
    try {
      const { authorization } = req.headers
      const token = authorization.split(' ')[1]
      if (authorized({ token })) {
        await UserModel.updateClient({ input: req.body })
        res.send('Updated')
      } else {
        res.status(401).send('Unauthorized')
      }
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
}
